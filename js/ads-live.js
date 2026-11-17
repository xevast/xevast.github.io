(function(){var K='xv-ads',FB='https://www.gstatic.com/firebasejs/10.12.0/';
try{window.XEVAST_ADS_LIVE=JSON.parse(localStorage.getItem(K)||'[]')}catch(e){window.XEVAST_ADS_LIVE=[]}
function load(s){return new Promise(function(a,b){var e=document.createElement('script');e.src=s;e.onload=a;e.onerror=b;document.head.appendChild(e)})}
load('js/firebase-config.js').then(function(){var C=window.XEVAST_FIREBASE;if(!C||/PASTE/.test(C.apiKey))throw 0;return window.firebase?0:load(FB+'firebase-app-compat.js')}).then(function(){return firebase.firestore?0:load(FB+'firebase-firestore-compat.js')}).then(function(){if(!firebase.apps.length)firebase.initializeApp(window.XEVAST_FIREBASE);
return firebase.firestore().collection('ads').where('active','==',true).get()}).then(function(s){var a=[];s.forEach(function(d){a.push(d.data())});a.sort(function(x,y){return(x.order||99)-(y.order||99)});
var out=a.filter(function(x){return x.kind==='image'?/^data:image\//.test(x.img||''):x.title}).map(function(x){return x.kind==='image'?{type:'image',src:x.img,alt:x.title||'Xevast',href:x.href||''}:{type:'brand',kicker:x.kicker||'',title:x.title,text:x.text||'',cta:x.cta||'',href:x.href||''}});
try{localStorage.setItem(K,JSON.stringify(out))}catch(e){}}).catch(function(){})})();
