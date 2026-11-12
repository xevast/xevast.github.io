/* Shared form sender: auto-save to Firebase, offline queue, then WhatsApp. Used by Support, Academy enrol. */
(function(){
var QK='xv-queue',FB='https://www.gstatic.com/firebasejs/10.12.0/';
function cfg(){var C=window.XEVAST_FIREBASE;return C&&String(C.apiKey).indexOf('PASTE')!==0?C:null}
function load(src){return new Promise(function(ok,no){var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function fb(){var C=cfg();if(!C)return Promise.reject('nocfg');
 var p=window.firebase?Promise.resolve():load(FB+'firebase-app-compat.js');
 return p.then(function(){return firebase.firestore?0:load(FB+'firebase-firestore-compat.js')}).then(function(){if(!firebase.apps.length)firebase.initializeApp(C);return firebase}).then(function(f){if(!C.appCheckKey||window.__xvAC)return f;window.__xvAC=1;return load(FB+'firebase-app-check-compat.js').then(function(){try{f.appCheck().activate(new f.appCheck.ReCaptchaV3Provider(C.appCheckKey),true)}catch(e){}return f}).catch(function(){return f})})}
function q(){try{return JSON.parse(localStorage.getItem(QK)||'[]')}catch(e){return[]}}
function sq(a){try{localStorage.setItem(QK,JSON.stringify(a))}catch(e){}}
function push(col,doc){return fb().then(function(f){return f.firestore().collection(col).add(Object.assign({},doc,{at:f.firestore.FieldValue.serverTimestamp()}))})}
function send(col,doc){doc.created=new Date().toISOString();
 var t=new Promise(function(_,no){setTimeout(function(){no('timeout')},6000)});
 return Promise.race([push(col,doc),t]).then(function(){return 'saved'}).catch(function(){var a=q();a.push({c:col,d:doc});sq(a);return 'queued'})}
function flush(){var a=q();if(!a.length||!cfg()||!navigator.onLine)return;sq([]);a.forEach(function(x){push(x.c,x.d).catch(function(){var b=q();b.push(x);sq(b)})})}
addEventListener('online',flush);setTimeout(flush,3000);
function pdf(title,lines,file){return(window.jspdf?Promise.resolve():load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')).then(function(){
 var d=new jspdf.jsPDF(),y=20;d.setFontSize(18);d.text(title,15,y);y+=10;d.setFontSize(11);
 lines.forEach(function(l){d.splitTextToSize(l,180).forEach(function(s){if(y>280){d.addPage();y=20}d.text(s,15,y);y+=6.5})});d.save(file)})}
function bindEnrol(){var f=document.getElementById('ef');if(!f)return;var r=document.getElementById('e-r'),g=function(i){return document.getElementById(i).value.trim()};
 var tq=new URLSearchParams(location.search).get('track');if(tq){var s=document.getElementById('e-t');for(var i=0;i<s.options.length;i++)if(s.options[i].value===tq)s.selectedIndex=i}
 f.onsubmit=function(e){e.preventDefault();if(!g('e-n')||!g('e-p')){r.textContent='Please add your name and phone.';return}
  var doc={name:g('e-n'),phone:g('e-p'),track:g('e-t'),mode:g('e-m'),message:g('e-d'),page:location.pathname};r.textContent='Saving…';
  send('enrolments',doc).then(function(st){r.textContent=st==='saved'?'Thank you! Your enquiry is saved. Our team will contact you soon.':'Saved on this device; it will sync when you are online.';f.reset()})}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindEnrol);else bindEnrol();
window.XVForms={send:send,flush:flush,pdf:pdf,cfg:cfg,fb:fb};
})();
