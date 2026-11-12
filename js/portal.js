/* Xevast client portal: sign in, place online orders, track them (status, quote, payments, messages). */
(function(){
'use strict';
var root=document.getElementById('portal');if(!root)return;
var STEPS=['placed','reviewing','quoted','accepted','advance_paid','in_progress','testing','delivered','completed'];
var LABEL={placed:'Order placed',reviewing:'Under review',quoted:'Quote sent',accepted:'Quote accepted',advance_paid:'Advance received',in_progress:'In progress',testing:'Testing',delivered:'Delivered',completed:'Completed',on_hold:'On hold',cancelled:'Cancelled'};
var HINT={placed:'We have your order and will review it shortly.',reviewing:'Our team is reviewing your requirements.',quoted:'Your quote is ready. Please review and accept it.',accepted:'Thank you. Please pay the advance so we can start.',advance_paid:'Advance received. Work starts soon.',in_progress:'Your project is being built.',testing:'We are testing everything before delivery.',delivered:'Your project is delivered. Please review and approve it.',completed:'All done. Thank you for choosing Xevast.',on_hold:'This order is on hold. We will contact you.',cancelled:'This order was cancelled.'};
var S={user:null,profile:null,ready:false},un=[];
function h(tag,p){var e=document.createElement(tag);if(p)for(var k in p){var v=p[k];if(k==='class')e.className=v;else if(k==='on'){for(var ev in v)e.addEventListener(ev,v[ev])}else if(v===true)e.setAttribute(k,'');else if(v!==false&&v!=null)e.setAttribute(k,v)}
 for(var i=2;i<arguments.length;i++)add(e,arguments[i]);return e}
function add(e,c){if(c==null||c===false)return;if(Array.isArray(c))return c.forEach(function(x){add(e,x)});e.appendChild(c.nodeType?c:document.createTextNode(String(c)))}
function $(s,r){return(r||document).querySelector(s)}
function money(n){return'₹'+Number(n||0).toLocaleString('en-IN')}
function dt(t){if(!t)return'just now';var d=t.toDate?t.toDate():new Date(t);return d.toLocaleString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}
function ms(t){return t?(t.toDate?t.toDate().getTime():new Date(t).getTime()):Date.now()}
function ts(){return firebase.firestore.FieldValue.serverTimestamp()}
function clear(){un.forEach(function(f){try{f()}catch(e){}});un=[];root.textContent=''}
function badge(st){return h('span',{class:'pt-badge st-'+st},LABEL[st]||st)}
function msg(el,text,ok){el.textContent=text;el.className='pt-msg'+(ok?' ok':' err')}
function db(){return XVB.init().then(function(x){return x.db})}
function err(e){var c=e&&e.code||'';return({'auth/email-already-in-use':'This email is already registered. Please sign in.','auth/invalid-email':'Enter a valid email address.','auth/weak-password':'Use a password with at least 8 characters.','auth/wrong-password':'Incorrect email or password.','auth/invalid-credential':'Incorrect email or password.','auth/user-not-found':'Incorrect email or password.','auth/too-many-requests':'Too many attempts. Please wait a few minutes.','auth/popup-closed-by-user':'Sign-in was cancelled.','auth/network-request-failed':'Network problem. Please check your connection.','permission-denied':'You do not have permission to do that.'})[c]||(e&&e.message)||'Something went wrong. Please try again.'}

/* ---------------- views ---------------- */
function shell(title,sub){clear();var w=h('div',{class:'pt-wrap'});w.appendChild(h('div',{class:'pt-head'},h('div',null,h('div',{class:'kicker'},'Client portal'),h('h1',{class:'sec-title'},title),sub?h('p',{class:'sec-sub',style:'margin-left:0'},sub):null)));root.appendChild(w);return w}
function notReady(){var w=shell('Client portal','Online orders and tracking.');w.appendChild(h('div',{class:'pt-card'},h('h3',null,'The portal is not available yet'),h('p',null,'Online ordering is being set up. You can still request a free consultation, no account needed.'),h('div',{class:'rqact'},h('button',{class:'btn',type:'button',on:{click:function(){window.xevastOpenForm&&window.xevastOpenForm()}}},'Free consultation request'),h('a',{class:'btn btn-ghost',href:'contact.html'},'Contact us'))))}
function authView(){
 var w=shell('Sign in to place and track orders','You only need an account for online orders. A free consultation never needs one.');var mode='in';
 var card=h('div',{class:'pt-card pt-auth'}),tabs=h('div',{class:'pt-tabs'}),out=h('div',{class:'pt-msg',role:'status'}),form=h('div',{class:'pt-form'});
 var f={name:h('input',{id:'a_name',autocomplete:'name',maxlength:80}),phone:h('input',{id:'a_phone',type:'tel',autocomplete:'tel',maxlength:20,inputmode:'tel'}),company:h('input',{id:'a_co',autocomplete:'organization',maxlength:120}),email:h('input',{id:'a_em',type:'email',autocomplete:'email',maxlength:120}),pass:h('input',{id:'a_pw',type:'password',autocomplete:'current-password',maxlength:100})};
 function row(l,i,x){return h('label',{class:'pt-f'+(x?' '+x:'')},l,i)}
 var go=h('button',{class:'btn',type:'button'},'Sign in');
 function draw(){form.textContent='';tabs.textContent='';
  [['in','Sign in'],['up','Create account']].forEach(function(t){tabs.appendChild(h('button',{type:'button',class:mode===t[0]?'on':'',on:{click:function(){mode=t[0];f.pass.autocomplete=mode==='up'?'new-password':'current-password';draw()}}},t[1]))});
  if(mode==='up')form.append(row('Full name *',f.name),row('Phone number *',f.phone),row('Company (optional)',f.company));
  form.append(row('Email *',f.email),row(mode==='up'?'Password * (at least 8 characters)':'Password *',f.pass));
  go.textContent=mode==='up'?'Create account':'Sign in';
  if(mode==='in')form.appendChild(h('button',{type:'button',class:'pt-link',on:{click:forgot}},'Forgot password?'))}
 function forgot(){var e=f.email.value.trim();if(!e){msg(out,'Enter your email above first.');return}XVB.reset(e).then(function(){msg(out,'Password reset email sent. Please check your inbox.',1)}).catch(function(x){msg(out,err(x))})}
 go.onclick=function(){var e=f.email.value.trim(),p=f.pass.value;out.textContent='';
  if(!/^\S+@\S+\.\S+$/.test(e)){msg(out,'Enter a valid email address.');return}if(p.length<8&&mode==='up'||!p){msg(out,mode==='up'?'Use a password with at least 8 characters.':'Enter your password.');return}
  if(mode==='up'){var n=f.name.value.trim(),ph=f.phone.value.trim();if(!n){msg(out,'Please enter your name.');return}if(ph.replace(/\D/g,'').length<8){msg(out,'Please enter a valid phone number.');return}
   go.disabled=true;XVB.signUp({name:n,phone:ph,company:f.company.value.trim(),email:e,password:p}).catch(function(x){msg(out,err(x))}).then(function(){go.disabled=false})}
  else{go.disabled=true;XVB.signIn(e,p).catch(function(x){msg(out,err(x))}).then(function(){go.disabled=false})}};
 var g=h('button',{class:'btn btn-ghost pt-google',type:'button',on:{click:function(){XVB.google().catch(function(x){msg(out,err(x))})}}},'Continue with Google');
 card.append(tabs,form,out,h('div',{class:'rqact'},go),h('div',{class:'pt-or'},h('span',null,'or')),g);
 w.appendChild(h('div',{class:'pt-grid2'},card,h('div',{class:'pt-card pt-side'},h('h3',null,'What you get'),h('ul',{class:'pt-ul'},h('li',null,'Place an online order for any service'),h('li',null,'See every step: review, quote, payment, build, delivery'),h('li',null,'Accept quotes and approve delivery with one tap'),h('li',null,'Message our team about your order'),h('li',null,'Keep all your orders in one place')),h('p',{class:'pt-note'},'Just want advice? ',h('a',{href:'index.html#requirement'},'Request a free consultation'),'. No account needed.'))));draw()}
function verifyView(){var w=shell('Verify your email','We sent a verification link to '+S.user.email+'. Open it, then come back here.');var out=h('div',{class:'pt-msg',role:'status'});
 w.appendChild(h('div',{class:'pt-card'},h('p',null,'You need a verified email to place orders. Check your spam folder if you cannot find the email.'),out,h('div',{class:'rqact'},
  h('button',{class:'btn',type:'button',on:{click:function(){XVB.reloadUser().then(function(u){if(u&&u.emailVerified)route();else msg(out,'Not verified yet. Please open the link in the email.')}).catch(function(x){msg(out,err(x))})}}},'I have verified'),
  h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){XVB.resend().then(function(){msg(out,'Verification email sent again.',1)}).catch(function(x){msg(out,err(x))})}}},'Resend email'),
  h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){XVB.signOut()}}},'Sign out'))))}
function profileView(){var w=shell('Complete your profile','We need your name and phone number so our team can reach you about your orders.');var out=h('div',{class:'pt-msg'});
 var n=h('input',{maxlength:80,autocomplete:'name'}),p=h('input',{type:'tel',maxlength:20,autocomplete:'tel'}),c=h('input',{maxlength:120});
 w.appendChild(h('div',{class:'pt-card pt-form'},h('label',{class:'pt-f'},'Full name *',n),h('label',{class:'pt-f'},'Phone number *',p),h('label',{class:'pt-f'},'Company (optional)',c),out,h('div',{class:'rqact'},h('button',{class:'btn',type:'button',on:{click:function(){if(!n.value.trim()){msg(out,'Please enter your name.');return}if(p.value.replace(/\D/g,'').length<8){msg(out,'Please enter a valid phone number.');return}XVB.saveProfile({name:n.value,phone:p.value,company:c.value}).then(route).catch(function(x){msg(out,err(x))})}}},'Save and continue'),h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){XVB.signOut()}}},'Sign out'))));if(S.user&&S.user.displayName)n.value=S.user.displayName}
function staffView(){var w=shell('Staff account','This is the client portal. Please use the Xevast Team or Admin console to manage orders.');w.appendChild(h('div',{class:'pt-card'},h('div',{class:'rqact'},h('a',{class:'btn',href:(window.XV_PORTALS&&XV_PORTALS.split?(S.profile&&(S.profile.role==='admin'||S.profile.role==='superadmin')?XV_PORTALS.admin:XV_PORTALS.team):'#')},'Open '+(S.profile&&(S.profile.role==='admin'||S.profile.role==='superadmin')?'Admin':'Team')+' console'),' ',h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){XVB.signOut()}}},'Sign out'))))}
function disabledView(){var w=shell('Account disabled','Please contact us if you think this is a mistake.');w.appendChild(h('div',{class:'pt-card'},h('div',{class:'rqact'},h('a',{class:'btn',href:'contact.html'},'Contact us'),h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){XVB.signOut()}}},'Sign out'))))}

/* ---------------- signed-in area ---------------- */
function nav(active){return h('nav',{class:'pt-nav','aria-label':'Portal'},[['/','Overview'],['/orders','My orders'],['/new','New order'],['/profile','Profile']].map(function(t){return h('a',{href:'#'+t[0],class:active===t[0]?'on':''},t[1])}),h('button',{type:'button',class:'pt-out',on:{click:function(){XVB.signOut()}}},'Sign out'))}
function area(active,title,sub){var w=shell(title,sub);w.insertBefore(nav(active),w.firstChild.nextSibling);return w}
function watchOrders(cb){db().then(function(d){un.push(d.collection('orders').where('uid','==',S.user.uid).onSnapshot(function(s){var a=s.docs.map(function(x){return Object.assign({id:x.id},x.data())});a.sort(function(x,y){return ms(y.createdAt)-ms(x.createdAt)});cb(a)},function(e){cb(null,e)}))})}
function needs(o){return o.quoteStatus==='sent'?'Review your quote':(o.status==='delivered'&&!o.deliveryApproved?'Approve delivery':(o.status==='accepted'?'Pay the advance':''))}
function orderRow(o){return h('a',{class:'pt-order',href:'#/order/'+o.id},h('div',null,h('b',null,o.service||'Order'),h('span',{class:'pt-ref'},o.ref||o.id)),h('div',{class:'pt-os'},badge(o.status),needs(o)?h('span',{class:'pt-act'},needs(o)):null),h('span',{class:'pt-when'},dt(o.updatedAt||o.createdAt)))}
function overview(){var w=area('/','Welcome, '+(S.profile.name||'').split(' ')[0],'Everything about your orders in one place.');var stats=h('div',{class:'pt-stats'}),list=h('div',{class:'pt-orders'},h('p',{class:'smp-load'},'Loading…'));
 w.append(stats,h('div',{class:'pt-sec-h'},h('h3',null,'Recent orders'),h('a',{href:'#/new',class:'btn'},'+ New order')),list);
 watchOrders(function(a,e){if(!a){list.textContent='';list.appendChild(h('p',{class:'pt-msg err'},err(e)));return}
  var act=a.filter(function(o){return['completed','cancelled'].indexOf(o.status)<0}),need=a.filter(function(o){return needs(o)}),done=a.filter(function(o){return o.status==='completed'});
  stats.textContent='';[[act.length,'Active orders'],[need.length,'Need your action'],[done.length,'Completed']].forEach(function(s){stats.appendChild(h('div',{class:'pt-stat'},h('b',null,s[0]),h('span',null,s[1])))});
  list.textContent='';if(!a.length){list.appendChild(h('div',{class:'pt-empty'},h('h3',null,'No orders yet'),h('p',null,'Place your first order and follow it here.'),h('a',{href:'#/new',class:'btn'},'Place an order')));return}a.slice(0,5).forEach(function(o){list.appendChild(orderRow(o))});if(a.length>5)list.appendChild(h('a',{class:'pt-link',href:'#/orders'},'See all '+a.length+' orders'))})}
function ordersView(){var w=area('/orders','My orders','Tap an order to see its status, quote, payments and messages.');var list=h('div',{class:'pt-orders'},h('p',{class:'smp-load'},'Loading…'));w.appendChild(list);
 watchOrders(function(a,e){list.textContent='';if(!a){list.appendChild(h('p',{class:'pt-msg err'},err(e)));return}if(!a.length){list.appendChild(h('div',{class:'pt-empty'},h('h3',null,'No orders yet'),h('a',{href:'#/new',class:'btn'},'Place an order')));return}a.forEach(function(o){list.appendChild(orderRow(o))})})}
function newView(){var w=area('/new','New order','Choose a service. We will ask only the questions that matter for it.');var grid=h('div',{class:'pt-svcs'}),X=window.XVDATA;
 if(X)X.divisions.forEach(function(d){var sv=X.live.filter(function(s){return s.division===d.slug&&s.slug!=='xevast-lab'});if(!sv.length)return;grid.appendChild(h('h4',null,d.name));var g=h('div',{class:'pt-sg'});sv.forEach(function(s){g.appendChild(h('button',{type:'button',class:'pt-svc',on:{click:function(){pick(s.name)}}},h('b',null,s.name),h('span',null,(s.short||'').slice(0,90))))});grid.appendChild(g)});
 w.append(grid,h('p',{class:'pt-note'},'Academy and Lab enquiries do not need an order. Use their pages to register.'))}
function pick(name){if(name==='Web & App Hosting'){plans(name);return}open(name)}
function open(name,plan){if(window.xevastOpenForm)window.xevastOpenForm(name,{mode:'order',plan:plan||''})}
function plans(name){XVB.pub('hostingPlans').then(function(a){a=a.filter(function(p){return p.active!==false}).sort(function(x,y){return(x.order||0)-(y.order||0)});if(!a.length){open(name);return}
  var w=area('/new','Choose a hosting plan','Pick a plan, then fill in a short form. You can change plans later.');var g=h('div',{class:'plan-grid'});
  a.forEach(function(p){g.appendChild(h('div',{class:'plan-card'},h('h3',null,p.name),h('div',{class:'plan-price'},p.priceText||'Price on request'),p.billing?h('div',{class:'plan-bill'},p.billing):null,h('ul',null,(p.features||[]).map(function(f){return h('li',null,f)})),h('button',{class:'btn',type:'button',on:{click:function(){open(name,p.name)}}},'Choose '+p.name)))});
  w.append(g,h('div',{class:'rqact'},h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){open(name)}}},'I am not sure, help me choose')))}).catch(function(){open(name)})}
function profileTab(){var w=area('/profile','Your profile','Your phone and company help our team reach you.');var out=h('div',{class:'pt-msg'});var n=h('input',{value:S.profile.name||'',maxlength:80}),p=h('input',{type:'tel',value:S.profile.phone||'',maxlength:20}),c=h('input',{value:S.profile.company||'',maxlength:120});
 w.appendChild(h('div',{class:'pt-card pt-form'},h('label',{class:'pt-f'},'Email',h('input',{value:S.user.email,readonly:true})),h('label',{class:'pt-f'},'Full name',n),h('label',{class:'pt-f'},'Phone',p),h('label',{class:'pt-f'},'Company',c),out,h('div',{class:'rqact'},h('button',{class:'btn',type:'button',on:{click:function(){if(!n.value.trim()||p.value.replace(/\D/g,'').length<8){msg(out,'Name and a valid phone number are required.');return}XVB.saveProfile({name:n.value,phone:p.value,company:c.value}).then(function(){msg(out,'Saved.',1)}).catch(function(x){msg(out,err(x))})}}},'Save changes'))))}

/* ---------------- one order ---------------- */
function orderView(id){var w=area('/orders','Order '+id,'Live status. This page updates by itself.');var body=h('div',{class:'pt-od'},h('p',{class:'smp-load'},'Loading…'));w.appendChild(body);
 var st={o:null,fin:null,ups:[],msgs:[],claims:[],sett:{},draft:'',cl:{a:'',t:''},dirty:false};
 function draw(){if(!st.o){return}var ae=document.activeElement;if(ae&&body.contains(ae)&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)){st.dirty=true;return}st.dirty=false;var o=st.o;body.textContent='';
  body.appendChild(h('div',{class:'pt-ohead'},h('div',null,h('h2',null,o.service),h('span',{class:'pt-ref'},o.ref),' · placed '+dt(o.createdAt)),badge(o.status)));
  /* stepper */
  var idx=STEPS.indexOf(o.status),st2=h('ol',{class:'pt-steps'});STEPS.forEach(function(s,i){st2.appendChild(h('li',{class:i<idx?'done':(i===idx?'now':'')},h('i',null,i<idx?'✓':(i+1)),h('span',null,LABEL[s])))});
  if(o.status==='cancelled'||o.status==='on_hold')body.appendChild(h('div',{class:'pt-banner'},HINT[o.status]));else body.append(st2,h('p',{class:'pt-hint'},HINT[o.status]||''));
  /* action cards */
  var fin=st.fin||{},total=Number(fin.quoteAmount||0),paid=Number(fin.paid||0);
  if(o.quoteStatus==='sent'){body.appendChild(h('div',{class:'pt-card pt-action'},h('h3',null,'Your quote'),h('div',{class:'pt-big'},money(total)),fin.quoteNote?h('p',null,fin.quoteNote):null,fin.validTill?h('p',{class:'pt-note'},'Valid till '+fin.validTill):null,h('p',{class:'pt-note'},'A partial advance (typically 30–50%) is needed before work begins. The balance is due on completion.'),
   h('div',{class:'rqact'},h('button',{class:'btn',type:'button',on:{click:function(){upd({quoteStatus:'accepted',status:'accepted'},'I accept the quote.')}}},'Accept quote'),h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){var r=prompt('Tell us what you would like to change (optional):');if(r===null)return;upd({quoteStatus:'declined'},'I would like to discuss the quote. '+(r||''))}}},'Ask for changes'))))}
  if(o.status==='delivered'&&!o.deliveryApproved)body.appendChild(h('div',{class:'pt-card pt-action'},h('h3',null,'Your project is delivered'),h('p',null,'Please check everything. If you are happy, approve the delivery. Otherwise send us a message below.'),h('div',{class:'rqact'},h('button',{class:'btn',type:'button',on:{click:function(){upd({deliveryApproved:true},'I approve the delivery.')}}},'Approve delivery'))));
  if(o.deliveryApproved&&o.status==='delivered')body.appendChild(h('div',{class:'pt-banner ok'},'You approved the delivery. We will complete the final steps.'));
  /* payments */
  if(total>0)body.appendChild(payCard(o,fin,total,paid));
  /* timeline */
  var tl=h('div',{class:'pt-card'},h('h3',null,'Progress updates'));var u=st.ups.slice().sort(function(a,b){return ms(b.at)-ms(a.at)});
  u.forEach(function(x){tl.appendChild(h('div',{class:'pt-tl'},h('i'),h('div',null,h('b',null,x.text),h('span',null,dt(x.at)+' · '+(x.byName||'Xevast')))))});
  tl.appendChild(h('div',{class:'pt-tl'},h('i'),h('div',null,h('b',null,'Order placed'),h('span',null,dt(o.createdAt)))));body.appendChild(tl);
  /* chat */
  body.appendChild(chat(o));
  /* details */
  var det=h('div',{class:'pt-card'},h('h3',null,'Your requirements'));var dl=h('dl',{class:'pt-dl'});(o.qa||[]).forEach(function(r){dl.append(h('dt',null,r[0]),h('dd',null,r[1]))});det.appendChild(dl);body.appendChild(det);
  if(['placed','reviewing','quoted'].indexOf(o.status)>=0)body.appendChild(h('div',{class:'rqact'},h('button',{class:'btn btn-ghost',type:'button',on:{click:function(){if(confirm('Cancel this order?'))upd({status:'cancelled'},'Order cancelled by client.')}}},'Cancel order')))}
 function payCard(o,fin,total,paid){var c=h('div',{class:'pt-card'},h('h3',null,'Payments'));
  c.appendChild(h('div',{class:'pt-pay'},h('div',null,h('span',null,'Quote'),h('b',null,money(total))),h('div',null,h('span',null,'Paid'),h('b',null,money(paid))),h('div',null,h('span',null,'Balance'),h('b',null,money(Math.max(0,total-paid))))));
  (fin.payments||[]).forEach(function(p){c.appendChild(h('div',{class:'pt-pl'},h('b',null,money(p.amount)+' · '+(p.kind==='advance'?'Advance':(p.kind==='balance'?'Balance':'Payment'))),h('span',null,(p.method||'')+(p.txnId?' · '+p.txnId:'')+' · '+(p.at&&p.at.toDate?dt(p.at):(p.at||'')))))});
  st.claims.forEach(function(k){c.appendChild(h('div',{class:'pt-pl'},h('b',null,money(k.amount)+' · reported by you'),h('span',null,(k.txnId||'')+' · '+(k.status==='pending'?'waiting for our team to confirm':k.status))))});
  if(['accepted','advance_paid','in_progress','testing','delivered'].indexOf(o.status)>=0&&total-paid>0){
   c.appendChild(h('div',{class:'pt-howto'},h('b',null,'How to pay'),h('p',null,st.sett.paymentInfo||'Payments are accepted by UPI and bank transfer. Our team will share the payment details with you.')));
   var a=h('input',{type:'number',min:'1',placeholder:'Amount (₹)'}),t=h('input',{placeholder:'UPI reference / transaction ID',maxlength:60}),m=h('select',null,h('option',null,'UPI'),h('option',null,'Bank transfer')),out=h('div',{class:'pt-msg'});a.value=st.cl.a;t.value=st.cl.t;a.addEventListener('input',function(){st.cl.a=a.value});t.addEventListener('input',function(){st.cl.t=t.value});
   c.appendChild(h('div',{class:'pt-form pt-claim'},h('b',null,'Already paid? Tell us'),h('div',{class:'pt-row3'},a,t,m),out,h('button',{class:'btn',type:'button',on:{click:function(){var amt=Number(a.value);if(!(amt>0)||!t.value.trim()){msg(out,'Enter the amount and the transaction reference.');return}
    db().then(function(d){return d.collection('orders/'+id+'/claims').add({at:ts(),uid:S.user.uid,amount:amt,txnId:t.value.trim(),method:m.value,note:'',status:'pending'}).then(function(){return d.doc('orders/'+id).update({payClaim:true,updatedAt:ts()})})}).then(function(){msg(out,'Thank you. We will confirm your payment shortly.',1);a.value='';t.value='';st.cl={a:'',t:''}}).catch(function(x){msg(out,err(x))})}}},'I have paid')))}
  return c}
 function chat(o){var c=h('div',{class:'pt-card'},h('h3',null,'Messages'));var box=h('div',{class:'pt-chat'});var m=st.msgs.slice().sort(function(a,b){return ms(a.at)-ms(b.at)});
  if(!m.length)box.appendChild(h('p',{class:'pt-note'},'No messages yet. Write to our team any time.'));
  m.forEach(function(x){box.appendChild(h('div',{class:'pt-m'+(x.uid===S.user.uid?' me':'')},h('b',null,x.uid===S.user.uid?'You':(x.name||'Xevast')),h('p',null,x.text),h('span',null,dt(x.at))))});
  var t=h('textarea',{rows:2,maxlength:2000,placeholder:'Write a message…'}),out=h('div',{class:'pt-msg'});t.value=st.draft;t.addEventListener('input',function(){st.draft=t.value});
  c.append(box,t,out,h('div',{class:'rqact'},h('button',{class:'btn',type:'button',on:{click:function(){var v=t.value.trim();if(!v)return;send(v).then(function(){t.value='';st.draft=''}).catch(function(x){msg(out,err(x))})}}},'Send')));setTimeout(function(){box.scrollTop=box.scrollHeight},0);return c}
 function send(text){return db().then(function(d){return d.collection('orders/'+id+'/messages').add({at:ts(),uid:S.user.uid,name:S.profile.name,role:'client',text:text})})}
 function upd(patch,note){patch.updatedAt=ts();db().then(function(d){return d.doc('orders/'+id).update(patch)}).then(function(){return send(note).catch(function(){})}).catch(function(x){alert(err(x))})}
 body.addEventListener('focusout',function(){if(st.dirty)setTimeout(function(){var ae=document.activeElement;if(!(ae&&body.contains(ae)&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)))draw()},350)});
 db().then(function(d){
  un.push(d.doc('orders/'+id).onSnapshot(function(s){if(!s.exists){body.textContent='';body.appendChild(h('div',{class:'pt-empty'},h('h3',null,'Order not found'),h('a',{class:'btn',href:'#/orders'},'Back to my orders')));return}st.o=Object.assign({id:s.id},s.data());draw()},function(e){body.textContent='';body.appendChild(h('p',{class:'pt-msg err'},err(e)))}));
  un.push(d.doc('orders/'+id+'/finance/main').onSnapshot(function(s){st.fin=s.exists?s.data():null;draw()},function(){}));
  un.push(d.collection('orders/'+id+'/updates').where('visible','==',true).onSnapshot(function(s){st.ups=s.docs.map(function(x){return x.data()});draw()},function(){}));
  un.push(d.collection('orders/'+id+'/messages').onSnapshot(function(s){st.msgs=s.docs.map(function(x){return x.data()});draw()},function(){}));
  un.push(d.collection('orders/'+id+'/claims').onSnapshot(function(s){st.claims=s.docs.map(function(x){return x.data()});draw()},function(){}));
  d.doc('settings/payment').get().then(function(s){st.sett=s.exists?{paymentInfo:s.data().text}:{};draw()}).catch(function(){})})}

/* ---------------- router ---------------- */
function route(){
 if(!XVB.configured()){notReady();return}
 if(!S.ready){return}
 if(!S.user){if(/[?&]inline\b/.test(location.search)){authView();return}location.replace('login.html?next='+encodeURIComponent('portal.html'+(location.hash||'')));return}
 if(!S.profile){profileView();return}
 if(S.profile.role!=='client'){staffView();return}
 if(S.profile.active===false){disabledView();return}
 if(!S.user.emailVerified){verifyView();return}
 var qs=new URLSearchParams(location.search),q=qs.get('order'),qp=qs.get('plan');
 if(q!==null&&q!==undefined){history.replaceState(null,'',location.pathname+location.hash);if(q&&qp)open(q,qp);else if(q)pick(q);else location.hash='#/new'}
 var r=(location.hash||'#/').slice(1),m=r.match(/^\/order\/(.+)$/);
 if(m)return orderView(decodeURIComponent(m[1]));
 if(r==='/orders')return ordersView();if(r==='/new')return newView();if(r==='/profile')return profileTab();
 overview()}
window.addEventListener('hashchange',function(){if(S.ready&&S.user&&S.profile)route()});
if(!window.XVB){notReady();return}
if(!XVB.configured()){notReady();return}
XVB.onAuth(function(u,p){var first=!S.ready;S.user=u;S.profile=p;S.ready=true;route()});
})();
