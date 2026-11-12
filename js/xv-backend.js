/* Xevast backend (Firebase). Shared by the public site and the client portal.
   Nothing is sent anywhere until js/firebase-config.js has your real Firebase config.
   Collections used here: consults, orders, users, labRegs (create), hostingPlans / labItems / settings (read). */
(function(){
'use strict';
var FBV='10.12.0',BASE='https://www.gstatic.com/firebasejs/'+FBV+'/',QK='xv-q2',SK='xv-sub';
var state={user:null,profile:null,ready:false},P=null,subs=[];
function cfg(){var C=window.XEVAST_FIREBASE;return C&&String(C.apiKey).indexOf('PASTE')!==0?C:null}
function load(src){return new Promise(function(ok,no){if(document.querySelector('script[src="'+src+'"]'))return ok();var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=function(){no(new Error('load-failed'))};document.head.appendChild(s)})}
function loadCfg(){return window.XEVAST_FIREBASE?Promise.resolve():load('js/firebase-config.js').catch(function(){})}
function ensure(){return loadCfg().then(function(){if(!cfg())throw new Error('not-configured')})}
function init(){if(P)return P;
 P=loadCfg().then(function(){var C=cfg();if(!C)throw new Error('not-configured');return load(BASE+'firebase-app-compat.js')})
 .then(function(){return Promise.all([load(BASE+'firebase-auth-compat.js'),load(BASE+'firebase-firestore-compat.js')])})
 .then(function(){if(!firebase.apps.length)firebase.initializeApp(cfg());var a=firebase.auth(),d=firebase.firestore();
   a.onAuthStateChanged(function(u){state.user=u;state.profile=null;if(!u){state.ready=true;fire();return}
    d.collection('users').doc(u.uid).get().then(function(s){state.profile=s.exists?s.data():null}).catch(function(){}).then(function(){state.ready=true;fire()})});
   return{auth:a,db:d}})
 .catch(function(e){if(e&&e.message==='load-failed')P=null;throw e});return P}
function fire(){subs.forEach(function(f){try{f(state.user,state.profile)}catch(e){}})}
function onAuth(f){subs.push(f);if(state.ready)f(state.user,state.profile);init().catch(function(){if(!state.ready){state.ready=true;f(null,null)}})}
function ts(){return firebase.firestore.FieldValue.serverTimestamp()}
var AL='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function ref(prefix){var a=new Uint8Array(8);(window.crypto||window.msCrypto).getRandomValues(a);var s='';for(var i=0;i<8;i++){s+=AL[a[i]%AL.length];if(i===3)s+='-'}return prefix+'-'+s}
function clean(o){var r={};Object.keys(o).forEach(function(k){if(o[k]!==undefined)r[k]=o[k]});return r}
function str(v,n){return String(v==null?'':v).trim().slice(0,n)}
/* anti-spam: 5 public submissions per hour per browser */
function throttle(){var now=Date.now(),a;try{a=JSON.parse(localStorage.getItem(SK)||'[]')}catch(e){a=[]}a=a.filter(function(t){return now-t<3600000});if(a.length>=5)return false;a.push(now);try{localStorage.setItem(SK,JSON.stringify(a))}catch(e){}return true}
/* offline queue: a write that does not finish in 10s is stored here and retried */
function q(){try{return JSON.parse(localStorage.getItem(QK)||'[]')}catch(e){return[]}}
function sq(a){try{localStorage.setItem(QK,JSON.stringify(a))}catch(e){}}
function write(path,data){return init().then(function(x){var d=Object.assign({},data,{createdAt:ts()});var t=new Promise(function(_,no){setTimeout(function(){no(new Error('timeout'))},10000)});
 return Promise.race([x.db.doc(path).set(d),t])})}
function safeWrite(path,data){return write(path,data).then(function(){return'saved'}).catch(function(e){
 if(e&&e.message==='not-configured')throw e;if(e&&(e.code==='permission-denied'))throw e;
 var a=q();a.push({p:path,d:data});sq(a);return'queued'})}
function flush(){var a=q();if(!a.length||!cfg()||!navigator.onLine)return;sq([]);a.forEach(function(x){write(x.p,x.d).catch(function(e){if(!(e&&e.code==='permission-denied')){var b=q();b.push(x);sq(b)}})})}
addEventListener('online',flush);setTimeout(flush,4000);

function consultDoc(v,qa,meta){var u=state.user;return clean({ref:meta.ref,source:meta.source||'requirement-form',service:str(v.svc,80),name:str(v.cp,80),business:str(v.bn,120),phone:str(v.ph,20),email:str(v.em,120),
 budget:str(v.bg,60),timeline:str(v.dl,120),notes:str(v.nt,1500),qa:qa.slice(0,80).map(function(r){return[str(r[0],160),str(r[1],700)]}),
 status:'new',assignedTo:null,assignedName:'',log:[],nextFollowUp:'',uid:u?u.uid:null,page:str(location.pathname,80)})}
function submitConsult(v,qa,meta){meta=meta||{};
 if(meta.hp)return Promise.resolve({ref:ref('CR'),status:'saved'});   /* bot: pretend it worked */
 return ensure().then(function(){if(!throttle())throw new Error('rate-limit');
 var r=ref('CR'),doc=consultDoc(v,qa,{ref:r,source:meta.source});return safeWrite('consults/'+r,doc).then(function(s){return{ref:r,status:s}})})}
function createOrder(v,qa){return ensure().then(function(){return createOrder2(v,qa)})}
function createOrder2(v,qa){
 var u=state.user,p=state.profile;if(!u||!p)return Promise.reject(new Error('auth-required'));if(!u.emailVerified)return Promise.reject(new Error('verify-email'));
 if(!throttle())return Promise.reject(new Error('rate-limit'));
 var r=ref('XV');
 var doc=clean({ref:r,uid:u.uid,clientName:str(p.name,80),clientEmail:str(u.email,120),clientPhone:str(p.phone,20),business:str(v.bn,120),service:str(v.svc,80),plan:str(v.ho_p,80),budget:str(v.bg,60),timeline:str(v.dl,120),notes:str(v.nt,1500),
  qa:qa.slice(0,80).map(function(x){return[str(x[0],160),str(x[1],700)]}),status:'placed',quoteStatus:'none',assignedTo:[],assignedNames:[],deliveryApproved:false,updatedAt:null});
 doc.createdAt=null;return init().then(function(x){doc.createdAt=ts();doc.updatedAt=ts();return Promise.race([x.db.doc('orders/'+r).set(doc),new Promise(function(_,no){setTimeout(function(){no(new Error('timeout'))},12000)})])}).then(function(){return{ref:r,status:'saved'}})}
/* ---- accounts ---- */
function signUp(o){return init().then(function(x){return x.auth.createUserWithEmailAndPassword(o.email,o.password).then(function(c){
 return x.db.collection('users').doc(c.user.uid).set({name:str(o.name,80),email:c.user.email,phone:str(o.phone,20),company:str(o.company,120),role:'client',active:true,createdAt:ts()})
  .then(function(){state.profile={name:o.name,email:c.user.email,phone:o.phone,company:o.company||'',role:'client',active:true};return c.user.sendEmailVerification().catch(function(){})}).then(function(){fire();return c.user})})})}
function signIn(e,p){return init().then(function(x){return x.auth.signInWithEmailAndPassword(e,p)})}
function google(){return init().then(function(x){return x.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())})}
function signOut(){return init().then(function(x){return x.auth.signOut()})}
function reset(e){return init().then(function(x){return x.auth.sendPasswordResetEmail(e)})}
function resend(){return init().then(function(x){return x.auth.currentUser.sendEmailVerification()})}
function reloadUser(){return init().then(function(x){var was=x.auth.currentUser&&x.auth.currentUser.emailVerified;return x.auth.currentUser?x.auth.currentUser.reload().then(function(){return x.auth.currentUser.getIdToken(true)}).then(function(){state.user=x.auth.currentUser;if(state.user.emailVerified!==was)fire();return state.user}):null})}
function saveProfile(o){return init().then(function(x){var u=state.user;if(!u)throw new Error('auth-required');var ref=x.db.collection('users').doc(u.uid);
 if(state.profile){var up={name:str(o.name,80),phone:str(o.phone,20),company:str(o.company,120)};return ref.update(up).then(function(){Object.assign(state.profile,up);fire()})}
 var d={name:str(o.name,80),email:u.email,phone:str(o.phone,20),company:str(o.company,120),role:'client',active:true,createdAt:ts()};return ref.set(d).then(function(){state.profile=d;fire()})})}
/* ---- public content (cached 5 min) ---- */
function pub(coll){var k='xvc:'+coll,now=Date.now();try{var c=JSON.parse(sessionStorage.getItem(k)||'null');if(c&&now-c.t<300000)return Promise.resolve(c.v)}catch(e){}
 return init().then(function(x){return x.db.collection(coll).get()}).then(function(s){var v=s.docs.map(function(d){return Object.assign({id:d.id},d.data())});try{sessionStorage.setItem(k,JSON.stringify({t:now,v:v}))}catch(e){}return v})}
function settings(){return init().then(function(x){return x.db.doc('settings/public').get()}).then(function(s){return s.exists?s.data():{}}).catch(function(){return{}})}
function addLabReg(o){if(o.hp)return Promise.resolve({status:'saved'});return ensure().then(function(){if(!throttle())throw new Error('rate-limit');return addLab2(o)})}
function addLab2(o){var r=ref('LR');return safeWrite('labRegs/'+r,clean({ref:r,item:str(o.item,60),itemTitle:str(o.itemTitle,120),name:str(o.name,80),phone:str(o.phone,20),email:str(o.email,120),message:str(o.message,600),status:'new'})).then(function(s){return{ref:r,status:s}})}
window.XVB={state:state,configured:function(){return!!cfg()},init:init,onAuth:onAuth,ref:ref,submitConsult:submitConsult,createOrder:createOrder,signUp:signUp,signIn:signIn,google:google,signOut:signOut,reset:reset,resend:resend,reloadUser:reloadUser,saveProfile:saveProfile,pub:pub,settings:settings,addLabReg:addLabReg,flush:flush};
})();
