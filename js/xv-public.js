/* Public content that the admin controls from the console: hosting plans, Lab programmes, announcement bar, Lab registration. */
(function(){
'use strict';
function $(s){return document.querySelector(s)}
function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function load(src){return new Promise(function(ok,no){if(document.querySelector('script[src="'+src+'"]'))return ok();var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
var plansEl=$('#planGrid'),labEl=$('#labGrid'),labForm=$('#lf_go'),isHome=/(^|\/)(index\.html)?$/.test(location.pathname);
if(!plansEl&&!labEl&&!labForm&&!isHome&&!$('[data-pk]'))return;
var ready=load('js/xv-backend.js').then(function(){return XVB.init().then(function(){return true},function(){return false})}).catch(function(){return false});
function wa(msg){return'https://wa.me/918340161172?text='+encodeURIComponent(msg)}
/* ---- hosting plans ---- */
function plans(){if(!plansEl)return;ready.then(function(ok){if(!ok)return fallback();return XVB.pub('hostingPlans').then(function(a){a=a.filter(function(p){return p.active!==false}).sort(function(x,y){return(x.order||0)-(y.order||0)});if(!a.length)return fallback();plansEl.textContent='';
  a.forEach(function(p){var c=h('div','plan-card');c.appendChild(h('h3','',p.name));c.appendChild(h('div','plan-price',p.priceText||'Price on request'));if(p.billing)c.appendChild(h('div','plan-bill',p.billing));var ul=h('ul');(p.features||[]).forEach(function(f){ul.appendChild(h('li','',f))});c.appendChild(ul);
   var b=h('a','btn','Order this plan');b.href='portal.html?order='+encodeURIComponent('Web & App Hosting')+'&plan='+encodeURIComponent(p.name);c.appendChild(b);plansEl.appendChild(c)})}).catch(fallback)});
 function fallback(){plansEl.textContent='';var c=h('div','pt-empty');c.appendChild(h('h3','','Plans are being published'));c.appendChild(h('p','','Tell us what you want to host and we will recommend the right plan and price.'));var a=h('div','rqact');a.style.justifyContent='center';var o=h('a','btn','Order hosting online');o.href='portal.html?order='+encodeURIComponent('Web & App Hosting');var w=h('a','btn btn-ghost','Ask on WhatsApp');w.href=wa('Hi Xevast, I need web hosting.');w.target='_blank';w.rel='noopener';a.append(o,w);c.appendChild(a);plansEl.appendChild(c)}}
/* ---- lab programmes + registration ---- */
var items=[];
function lab(){if(!labEl)return;ready.then(function(ok){if(!ok)return empty();return XVB.pub('labItems').then(function(a){items=a.filter(function(p){return p.active!==false}).sort(function(x,y){return(x.order||0)-(y.order||0)});if(!items.length)return empty();labEl.textContent='';
  var sel=$('#lf_item');items.forEach(function(p){var c=h('div','lab-card');c.appendChild(h('h3','',p.title));var m=h('div','lab-meta');if(p.type)m.appendChild(h('span','',p.type));var st=p.status||'open';m.appendChild(h('span',st==='open'?'open':'',st==='open'?'Registration open':(st==='upcoming'?'Coming soon':'Closed')));if(p.startDate)m.appendChild(h('span','','Starts '+p.startDate));if(p.seats)m.appendChild(h('span','',p.seats+' seats'));c.appendChild(m);if(p.desc)c.appendChild(h('p','',p.desc));
   var b=h('button','btn btn-ghost','Register interest');b.type='button';b.onclick=function(){if(sel)sel.value=p.id;var f=$('#lab-register');if(f)f.scrollIntoView({behavior:'smooth'})};c.appendChild(b);labEl.appendChild(c);if(sel){var o=document.createElement('option');o.value=p.id;o.textContent=p.title;sel.appendChild(o)}})}).catch(empty)});
 function empty(){labEl.textContent='';var c=h('div','pt-empty');c.appendChild(h('h3','','Programmes will be announced soon'));c.appendChild(h('p','','Register your interest below and we will contact you first when a programme opens.'));labEl.appendChild(c)}}
function labReg(){if(!labForm)return;var out=$('#lf_out');labForm.onclick=function(){var v=function(i){return($('#'+i)||{value:''}).value.trim()},name=v('lf_name'),phone=v('lf_phone');out.className='lf-msg';
  if(!name||phone.replace(/\D/g,'').length<8){out.textContent='Please enter your name and a valid phone number.';out.className='lf-msg err';return}
  var id=v('lf_item'),it=items.find(function(x){return x.id===id});labForm.disabled=true;out.textContent='Sending…';
  ready.then(function(ok){if(!ok)throw new Error('not-configured');return XVB.addLabReg({item:id,itemTitle:it?it.title:'General interest',name:name,phone:phone,email:v('lf_email'),message:v('lf_msg'),hp:v('lf_hp')})})
  .then(function(r){out.textContent='Thank you! We have your interest (ref '+r.ref+'). We will contact you soon.';out.className='lf-msg ok';['lf_name','lf_phone','lf_email','lf_msg'].forEach(function(i){$('#'+i).value=''})})
  .catch(function(e){out.textContent=e&&e.message==='rate-limit'?'Please wait a little before sending again.':(e&&e.message==='not-configured'?'Registration is not available right now. Please contact us directly.':'We could not send this. Please try again.');out.className='lf-msg err'})
  .then(function(){labForm.disabled=false})}}
/* ---- announcement bar (home page) ---- */
function announce(){if(!isHome||sessionStorage.getItem('xv-ann-x'))return;
 var idle=window.requestIdleCallback||function(f){setTimeout(f,1500)};idle(function(){ready.then(function(ok){if(!ok)return;var k='xv-ann',c;try{c=JSON.parse(sessionStorage.getItem(k)||'null')}catch(e){}
  var p=c&&Date.now()-c.t<600000?Promise.resolve(c.v):XVB.settings().then(function(s){try{sessionStorage.setItem(k,JSON.stringify({t:Date.now(),v:s}))}catch(e){}return s});
  p.then(function(s){var a=s&&s.announcement;if(!a||!a.active||!a.text)return;var bar=h('div','xv-announce');bar.setAttribute('role','status');bar.appendChild(h('span','',a.text));if(a.link){var l=h('a','',a.linkText||'Learn more');l.href=a.link;bar.appendChild(l)}var x=h('button','','✕');x.type='button';x.setAttribute('aria-label','Dismiss');x.onclick=function(){bar.remove();try{sessionStorage.setItem('xv-ann-x','1')}catch(e){}};bar.appendChild(x);document.body.insertBefore(bar,document.body.firstChild)})})})}
function prices(){var els=document.querySelectorAll('[data-pk]');if(!els.length)return;ready.then(function(ok){if(!ok)return;XVB.settings().then(function(st){var p=st&&st.prices;if(!p)return;els.forEach(function(el){var v=p[el.getAttribute('data-pk')];if(v&&el.firstChild)el.firstChild.nodeValue=String(v)+' '})}).catch(function(){})})}
plans();lab();labReg();announce();prices();
})();
