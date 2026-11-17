/* Xevast Lab sub-pages.
   client-rd / client-project : public cards read from Firestore 'labPages' (published only).
   company-rd / company-project : PRIVATE. The 6-digit code is checked by the Cloud Function 'labAccess';
   the content is only sent after the code is right, so it is not in this page or in any public collection. */
(function(){'use strict';
var root=document.getElementById('labPage');if(!root||!window.XVB)return;
var SEC=root.getAttribute('data-section'),PRIV=root.getAttribute('data-private')==='1',TK='xv-lab-tk',FB='https://www.gstatic.com/firebasejs/10.12.0/',timer=null;
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function $(id){return document.getElementById(id)}
function url(u){return/^https?:\/\//i.test(u||'')?u:''}
function card(it){var a=el('article','lab-item');
 if(it.status)a.appendChild(el('span','lab-st',String(it.status).replace(/[-_]/g,' ')));
 a.appendChild(el('h3','',it.title||''));
 if(it.summary)a.appendChild(el('p','',it.summary));
 if(it.tags&&it.tags.length){var t=el('div','lab-tags');it.tags.slice(0,8).forEach(function(x){t.appendChild(el('i','',x))});a.appendChild(t)}
 String(it.details||'').split(/\n{2,}/).forEach(function(s){s=s.trim();if(s)a.appendChild(el('p','det',s))});
 var u=url(it.link);if(u){var l=el('a','btn btn-ghost',it.linkText||'Open');l.href=u;l.target='_blank';l.rel='noopener noreferrer';a.appendChild(l);}
 if(it.updated)a.appendChild(el('div','lab-upd','Updated '+it.updated));
 return a}
function fill(box,items,empty){box.textContent='';if(!items.length){box.appendChild(el('p','smp-load',empty));return}items.forEach(function(i){box.appendChild(card(i))})}
/* ---------- public client pages ---------- */
function loadPublic(){var box=$('labList');
 XVB.init().then(function(x){return x.db.collection('labPages').where('section','==',SEC).where('published','==',true).get()})
 .then(function(s){var a=s.docs.map(function(d){return d.data()}).sort(function(p,q){return(p.order||0)-(q.order||0)});fill(box,a,'Nothing is published here yet. Tell us what you need and we will review it with the Lab team.')})
 .catch(function(){fill(box,[],'This list could not be loaded right now. Please try again later or contact us.')})}
/* ---------- private company pages ---------- */
function ld(src){return new Promise(function(ok,no){if(document.querySelector('script[src="'+src+'"]'))return ok();var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=function(){no(new Error('load'))};document.head.appendChild(s)})}
function fns(){return XVB.init().then(function(){return firebase.functions?0:ld(FB+'firebase-functions-compat.js')}).then(function(){return firebase.app().functions((window.XEVAST_FIREBASE&&window.XEVAST_FIREBASE.region)||'asia-south1')})}
function call(d){d.section=SEC;return fns().then(function(f){return f.httpsCallable('labAccess')(d)}).then(function(r){return r.data})}
function msg(t,ok){var m=$('labMsg');m.textContent=t||'';m.className='lab-msg'+(ok?' ok':'')}
function lock(t){try{sessionStorage.removeItem(TK)}catch(e){}clearTimeout(timer);$('labBody').hidden=true;$('labGate').hidden=false;$('labCode').value='';$('labGo').disabled=false;msg(t||'')}
function show(d){$('labGate').hidden=true;$('labBody').hidden=false;fill($('labList'),d.items||[],'Nothing is published on this page yet.');
 var left=Math.max(0,d.exp-Date.now());$('labExp').textContent='Unlocked for about '+Math.max(1,Math.round(left/60000))+' minutes. It locks again automatically.';
 clearTimeout(timer);timer=setTimeout(function(){lock('Time is up. Enter the code again to continue.')},left)}
function err(e){var c=String(e&&e.code||'').replace('functions/','');return(c==='permission-denied'||c==='resource-exhausted'||c==='invalid-argument')?e.message:'Could not check the code right now. Please try again.'}
function privateInit(){var tk=null;try{tk=sessionStorage.getItem(TK)}catch(e){}
 $('labGo').onclick=function(){var c=$('labCode').value.replace(/\D/g,'');if(c.length!==6)return msg('Enter all 6 digits');
  $('labGo').disabled=true;msg('Checking…',1);
  call({code:c}).then(function(d){try{sessionStorage.setItem(TK,d.token)}catch(e){}msg('');show(d)}).catch(function(e){$('labGo').disabled=false;$('labCode').value='';msg(err(e))})};
 $('labCode').onkeydown=function(e){if(e.key==='Enter')$('labGo').click()};
 $('labCode').oninput=function(){this.value=this.value.replace(/\D/g,'').slice(0,6)};
 $('labLock').onclick=function(){lock('Locked.')};
 if(tk)call({token:tk}).then(show).catch(function(){lock('')})}
if(PRIV)privateInit();else loadPublic();
})();
