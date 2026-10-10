(function(){const C=window.XEVAST_FIREBASE,f=document.getElementById('cform');
if(!f||!C||String(C.apiKey).startsWith('PASTE')||!window.firebase)return;
firebase.initializeApp(C);const db=firebase.firestore(),v=id=>document.getElementById(id).value;
f.addEventListener('submit',()=>{db.collection('leads').add({name:v('fname'),budget:v('fbudget'),service:v('fsvc'),message:v('fmsg'),page:location.pathname,at:firebase.firestore.FieldValue.serverTimestamp()}).catch(()=>{})});})();
