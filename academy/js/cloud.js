/* Cloud mode: Firebase Auth + Firestore + callable Functions. Without a real config it does nothing and the Academy stays in local mode. */
(function(g){'use strict';var X=g.XVA,C=g.XEVAST_FIREBASE,V='10.12.0',B='https://www.gstatic.com/firebasejs/'+V+'/';
X.cloud=!!(C&&String(C.apiKey).indexOf('PASTE')!==0);
if(!X.cloud){X.ready=Promise.resolve();return}
function load(s){if(!g.document)return Promise.resolve();return new Promise(function(ok,no){var t=g.document.createElement('script');t.src=B+s;t.onload=ok;t.onerror=function(){no(new Error('Could not load Firebase. Check your internet connection.'))};g.document.head.appendChild(t)})}
var mem={},auth,fs,fns,FV;
var EM={'auth/email-already-in-use':'This email is already registered. Please login.','auth/invalid-credential':'Wrong email or password','auth/wrong-password':'Wrong email or password','auth/user-not-found':'Wrong email or password','auth/weak-password':'Password must be at least 6 characters','auth/invalid-email':'Enter a valid email','auth/too-many-requests':'Too many attempts. Try again later.','permission-denied':'You are not allowed to do this'};
function fix(e){var c=e&&e.code,m=e&&e.message;if(c==='permission-denied'&&m&&!/insufficient permissions/i.test(m))throw new Error(m);throw new Error(EM[c]||m||'Something went wrong')}
function call(n,d){return fns.httpsCallable(n)(d).then(function(r){return r.data})}
function rows(q){return q.get().then(function(s){return s.docs.map(function(d){var o=d.data();o._id=d.id;return o})})}
function usr(id,p){return{id:id,name:p.name||'',email:p.email||'',role:['superadmin','academyadmin','academymanager'].indexOf(p.role)>=0?'manager':'student',regId:p.regId||'',at:''}}
function toCourse(x){return{id:x._id,name:x.name,level:x.level,dur:x.dur,price:x.price,desc:x.desc||'',domain:x.domain||'',published:x.published!==false,order:x.order||0,modules:x.modules||[],quiz:(x.quiz||[]).map(function(q){return[q.q,q.opts,undefined]}),batches:x.batches||[]}}
function pull(){var cu=auth.currentUser,d={users:[],enroll:[],certs:[],apps:[],offers:[],jobs:[],train:[],courses:[],domains:[],programs:[],seq:{},sess:null,jobsSeeded:true,coursesSeeded:true};
 return(cu?fs.doc('users/'+cu.uid).get().then(function(s){return s.exists?s.data():null}):Promise.resolve(null)).then(function(p){var mgr=!!p&&['superadmin','academyadmin','academymanager'].indexOf(p.role)>=0,cq=fs.collection('acCourses'),pq=fs.collection('acPrograms');
  return Promise.all([rows(fs.collection('acJobs')),rows(mgr?cq:cq.where('published','==',true)),rows(fs.collection('acDomains')),rows(mgr?pq:pq.where('open','==',true))]).then(function(r){
   d.jobs=r[0].map(function(x){return{id:x._id,title:x.title,domain:x.domain,mode:x.mode,dur:x.dur,stipend:x.stipend||'Unpaid',open:x.open!==false}});d.courses=r[1].map(toCourse);
   d.domains=r[2].filter(function(x){return x.active!==false}).map(function(x){return x.name}).sort();d.programs=r[3].map(function(x){x.id=x._id;return x});
   return(mgr?Promise.all(d.courses.map(function(c){return fs.doc('acCourses/'+c.id+'/secret/quiz').get().then(function(s){if(s.exists){var a=s.data().answers||[];c.quiz.forEach(function(q,i){q[2]=a[i]})}})})):Promise.resolve()).then(function(){
    if(!cu||!p)return;d.sess=cu.uid;var f=function(col){var c=fs.collection(col);return rows(mgr?c:c.where('userId','==',cu.uid))};
    return Promise.all([f('acEnroll'),f('acCerts'),f('acApps'),f('acOffers'),mgr?rows(fs.collection('acTrain')):[],mgr?rows(fs.collection('users').where('role','==','student')):[]]).then(function(r){
     d.enroll=r[0].map(function(x){return{id:x._id,userId:x.userId,courseId:x.courseId,batchId:x.batchId,amount:x.amount,at:x.at,done:x.done||{},prog:x.prog||{},paid:x.paid===true,skill:x.skill||null}});
     d.certs=r[1].map(function(x){x.certNo=x._id;return x});d.apps=r[2].map(function(x){x.id=x._id;return x});d.offers=r[3].map(function(x){x.ref=x._id;return x});d.train=r[4].map(function(x){x.id=x._id;return x});
     d.users=mgr?r[5].map(function(x){return usr(x._id,x)}):[usr(cu.uid,p)];if(!d.users.some(function(x){return x.id===cu.uid}))d.users.push(usr(cu.uid,p))})})})}).then(function(){X.save(d)})}
function me(){return pull().then(function(){var u=X.me(),P=g.XV_PORTALS||{},mg=!!u&&u.role==='manager';
 if(u&&g.XV_AC_SITE==='admin'&&!mg)return auth.signOut().then(function(){throw new Error('This is the Academy Admin Panel. Students log in on the Academy site.')});
 if(u&&g.XV_AC_SITE!=='admin'&&mg&&P.split)return auth.signOut().then(function(){throw new Error('Academy Admin and Manager accounts sign in on the Academy Admin Panel'+(P.academyAdmin?': '+P.academyAdmin:'.'))});
 return u})}
function after(v){return pull().then(function(){return v})}
function rej(m){return Promise.reject(new Error(m))}
X.register=function(o){var n=String(o.name||'').trim();if(!n)return rej('Enter your name');if(!o.pass||o.pass.length<6)return rej('Password must be at least 6 characters');
 return auth.createUserWithEmailAndPassword(String(o.email||'').trim(),o.pass).then(function(){return call('acRegister',{name:n})}).then(me).catch(fix)};
X.login=function(email,pass){return auth.signInWithEmailAndPassword(String(email||'').trim(),pass||'').then(function(r){return call('acRegister',{name:r.user.displayName||String(email).split('@')[0]})}).then(me).catch(fix)};
X.logout=function(){return auth.signOut().then(function(){mem={}})};
X.verifyAsync=function(no){no=String(no||'').trim().toUpperCase();if(!/^XVC-\d{4}-\d{5}$/.test(no))return Promise.resolve({ok:false,reason:'No certificate found with this number'});
 return fs.doc('acCerts/'+no).get().then(function(s){if(!s.exists)return{ok:false,reason:'No certificate found with this number'};var c=s.data();c.certNo=s.id;return c.revoked?{ok:false,reason:'This certificate has been revoked',cert:c}:{ok:true,cert:c}}).catch(fix)};
X.enroll=function(uid,cid,bid){return call('acEnroll',{courseId:cid,batchId:bid}).then(function(r){return after(r)}).catch(fix)};
X.markLesson=function(uid,eid,lid,val){return call('acMarkLesson',{enrollId:eid,lessonId:lid,done:val!==false}).then(pull).then(function(){return{progress:X.progress(X.db().enroll.filter(function(x){return x.id===eid})[0])}}).catch(fix)};
X.openLesson=function(uid,eid,lid){return call('acLessonOpen',{enrollId:eid,lessonId:lid}).then(function(r){return pull().then(function(){return r})}).catch(fix)};
X.watchLesson=function(uid,eid,lid,playing){return call('acLessonWatch',{enrollId:eid,lessonId:lid,playing:!!playing}).catch(fix)};
X.issueCourseCert=function(eid){return call('acIssueCourseCert',{enrollId:eid}).then(after).catch(fix)};
X.issueSkillCert=function(eid){return call('acIssueSkillCert',{enrollId:eid}).then(after).catch(fix)};
X.markPaid=function(eid){var m=mustMgr();if(m)return m;return fs.doc('acEnroll/'+eid).update({paid:true}).then(after).catch(fix)};
/* Razorpay: the server creates the order and checks the payment signature, so the price cannot be changed in the browser */
function loadRzp(){if(g.Razorpay)return Promise.resolve();return load2('https://checkout.razorpay.com/v1/checkout.js')}
function load2(src){return new Promise(function(ok,no){var t=g.document.createElement('script');t.src=src;t.onload=ok;t.onerror=function(){no(new Error('Could not load the payment window. Check your internet connection.'))};g.document.head.appendChild(t)})}
X.buy=function(uid,cid,bid){var c=X.course(cid);if(!c)return rej('Unknown course');if(!(c.price>0))return X.enroll(uid,cid,bid);
 return call('acCreateOrder',{courseId:cid,batchId:bid}).then(function(o){return loadRzp().then(function(){return new Promise(function(ok,no){var u=X.me(),done=false;
  var rz=new g.Razorpay({key:o.keyId,order_id:o.orderId,amount:o.amount,currency:o.currency,name:'Xevast Academy',description:o.name,prefill:{name:u&&u.name,email:u&&u.email},theme:{color:'#6d28d9'},
   handler:function(r){done=true;call('acVerifyPayment',{orderId:r.razorpay_order_id,paymentId:r.razorpay_payment_id,signature:r.razorpay_signature}).then(ok,no)},
   modal:{ondismiss:function(){if(!done)no(new Error('Payment cancelled. You were not charged.'))}}});rz.on&&rz.on('payment.failed',function(r){no(new Error((r.error&&r.error.description)||'Payment failed'))});rz.open()})})}).then(after).catch(fix)};
/* password reset and Google sign-in */
X.forgot=function(email){email=String(email||'').trim();if(!/^\S+@\S+\.\S+$/.test(email))return rej('Enter a valid email');
 return auth.sendPasswordResetEmail(email).catch(function(e){if(e&&(e.code==='auth/user-not-found'||e.code==='auth/invalid-credential'))return;throw e}).then(function(){return'If this email is registered, a password reset link has been sent. Check your inbox and spam folder.'}).catch(fix)};
X.google=function(){var P=new g.firebase.auth.GoogleAuthProvider();return auth.signInWithPopup(P).then(function(r){return call('acRegister',{name:r.user.displayName||String(r.user.email||'').split('@')[0]})}).then(me).catch(function(e){if(e&&(e.code==='auth/popup-closed-by-user'||e.code==='auth/cancelled-popup-request'))throw new Error('Google sign-in was cancelled');fix(e)})};
X.submitQuiz=function(uid,eid,a){return call('acSubmitQuiz',{enrollId:eid,answers:a}).then(function(r){return pull().then(function(){return r})}).catch(fix)};
X.apply=function(uid,jid,note){var id=uid+'_'+jid;return fs.doc('acApps/'+id).get().then(function(s){if(s.exists)throw new Error('You already applied');return fs.doc('acApps/'+id).set({userId:uid,jobId:jid,note:String(note||'').slice(0,500),status:'applied',at:X.today()})}).then(function(){return after({id:id})}).catch(fix)};
X.offer=function(appId,o){return call('acCreateOffer',{appId:appId,start:o.start,end:o.end,mode:o.mode||'',stipend:o.stipend||'Unpaid'}).then(after).catch(fix)};
X.acceptOffer=function(uid,ref){var o=X.db().offers.filter(function(x){return x.ref===ref&&x.userId===uid})[0];if(!o)return rej('Offer not found');
 return fs.doc('acOffers/'+ref).update({accepted:true,acceptedAt:X.today()}).then(function(){return fs.doc('acApps/'+o.appId).update({status:'accepted'})}).then(function(){return after(o)}).catch(fix)};
X.completeInternship=function(appId){return call('acCompleteInternship',{appId:appId}).then(after).catch(fix)};
function mustMgr(){var u=X.me();return u&&u.role==='manager'?null:rej('Manager access only')}
function writeCourse(c,b){b=b||fs.batch();b.set(fs.doc('acCourses/'+c.id),{name:c.name,level:c.level,dur:c.dur,price:c.price,desc:c.desc,domain:c.domain,published:c.published,order:c.order,modules:c.modules,quiz:c.quiz.map(function(q){return{q:q[0],opts:q[1]}}),batches:c.batches,updatedAt:FV.serverTimestamp()});
 b.set(fs.doc('acCourses/'+c.id+'/secret/quiz'),{answers:c.quiz.map(function(q){return q[2]})});return b}
X.saveCourse=function(o){var m=mustMgr();if(m)return m;var used=X.db().courses.map(function(x){return x.id});
 return(o.id?fs.doc('acCourses/'+o.id).get().then(function(sn){return sn.exists?toCourse(Object.assign(sn.data(),{_id:sn.id})):null}):Promise.resolve(null)).then(function(old){var c=X.normCourse(o,old,used);return writeCourse(c).commit().then(function(){return after(c)})}).catch(fix)};
X.deleteCourse=function(id){var m=mustMgr();if(m)return m;return fs.collection('acEnroll').where('courseId','==',id).limit(1).get().then(function(r){if(!r.empty)throw new Error('Students are enrolled in this course. Untick Published instead of deleting.');var b=fs.batch();b.delete(fs.doc('acCourses/'+id+'/secret/quiz'));b.delete(fs.doc('acCourses/'+id));return b.commit()}).then(after).catch(fix)};
/* one-click import of the 7 built-in courses and the default domains (skips what already exists) */
X.importDefaults=function(){var m=mustMgr();if(m)return m;var have=X.db().courses.map(function(c){return c.id}),n=0,b=fs.batch();
 try{X.COURSES.forEach(function(c){if(have.indexOf(c.id)>=0)return;var o=JSON.parse(JSON.stringify(c));o.batches=X.autoBatches(c).map(function(x){return{start:x.start,seats:x.seats}});writeCourse(X.normCourse(o,null,have),b);n++});
  X.DEF_DOMAINS.forEach(function(x){if(X.db().domains.indexOf(x)<0)b.set(fs.doc('acDomains/'+X.slug(x)),{name:x,active:true})})}catch(e){return Promise.reject(e)}
 return b.commit().then(function(){return after(n)}).catch(fix)};
X.addDomain=function(name){var m=mustMgr();if(m)return m;var n=String(name||'').trim();if(n.length<2||n.length>40)return rej('Domain name must be 2 to 40 characters');if(X.db().domains.some(function(x){return x.toLowerCase()===n.toLowerCase()}))return rej('This domain already exists');
 return fs.doc('acDomains/'+X.slug(n)).set({name:n,active:true}).then(function(){return after(n)}).catch(fix)};
X.removeDomain=function(name){var m=mustMgr();if(m)return m;return fs.doc('acDomains/'+X.slug(name)).delete().then(after).catch(fix)};
X.saveProgram=function(o){var m=mustMgr();if(m)return m;var id=o.id||'p'+Date.now().toString(36),n;try{n=X.normProgram(o,id)}catch(e){return Promise.reject(e)}delete n.id;return fs.doc('acPrograms/'+id).set(n).then(function(){return after(n)}).catch(fix)};
X.removeProgram=function(id){var m=mustMgr();if(m)return m;return fs.doc('acPrograms/'+id).delete().then(after).catch(fix)};
X.saveJob=function(o){var m=mustMgr();if(m)return m;var id=o.id||'job'+Date.now().toString(36),n;try{n=X.normJob(o,id)}catch(e){return Promise.reject(e)}delete n.id;return fs.doc('acJobs/'+id).set(n).then(function(){return after(n)}).catch(fix)};
X.addJob=X.saveJob;
X.setJobOpen=function(id,v){var m=mustMgr();if(m)return m;return fs.doc('acJobs/'+id).update({open:!!v}).then(after).catch(fix)};
X.deleteJob=function(id){var m=mustMgr();if(m)return m;return fs.collection('acApps').where('jobId','==',id).limit(1).get().then(function(r){if(!r.empty)throw new Error('This opening has applications. Close it instead.');return fs.doc('acJobs/'+id).delete()}).then(after).catch(fix)};
X.addTraining=function(o){var n=String(o.name||'').trim(),tp=String(o.topic||'').trim();if(!n||!tp)return rej('Name and topic required');return fs.collection('acTrain').add({name:n.slice(0,80),org:String(o.org||'').slice(0,120),topic:tp.slice(0,80),programme:String(o.programme||'').slice(0,100),mode:String(o.mode||'Online').slice(0,20),phone:String(o.phone||'').slice(0,20),email:String(o.email||'').slice(0,120),at:X.today()}).catch(fix)};
X.revoke=function(no){return fs.doc('acCerts/'+no).update({revoked:true}).then(after).catch(fix)};

/* admin: upload a lesson video to Firebase Storage (students get a short-lived signed link from the server) */
function videoSeconds(file){return new Promise(function(ok,no){var v=g.document.createElement('video');v.preload='metadata';v.onloadedmetadata=function(){var d=Math.round(v.duration);URL.revokeObjectURL(v.src);d>0&&isFinite(d)?ok(d):no(new Error('Could not read the video length'))};v.onerror=function(){no(new Error('Could not read this video. Use an MP4 (H.264) file.'))};v.src=URL.createObjectURL(file)})}
X.uploadVideo=function(cid,file,onProgress){var m=mustMgr();if(m)return m;if(!cid)return rej('Save the course first, then upload videos');
 if(!file||!/^video\//.test(file.type))return rej('Choose a video file (MP4 recommended)');if(file.size>2*1024*1024*1024)return rej('The video must be under 2 GB');
 return videoSeconds(file).then(function(sec){var path='acVideos/'+cid+'/'+Date.now().toString(36)+'-'+file.name.replace(/[^\w.-]+/g,'_').slice(-60);
  return(g.firebase.storage?Promise.resolve():load('firebase-storage-compat.js')).then(function(){return new Promise(function(ok,no){var t=g.firebase.storage().ref(path).put(file,{contentType:file.type});t.on('state_changed',function(s){onProgress&&onProgress(Math.round(s.bytesTransferred/s.totalBytes*100))},no,function(){ok({path:path,sec:sec})})})})}).catch(fix)};
X.ready=(g.firebase?Promise.resolve():load('firebase-app-compat.js').then(function(){return Promise.all([load('firebase-auth-compat.js'),load('firebase-firestore-compat.js'),load('firebase-functions-compat.js')])})).then(function(){
 var fb=g.firebase;if(!fb.apps.length)fb.initializeApp(C);auth=fb.auth();fs=fb.firestore();fns=fb.app().functions(C.region||'asia-south1');FV=fb.firestore.FieldValue;
 X.use({getItem:function(k){return mem[k]||null},setItem:function(k,v){mem[k]=v},removeItem:function(k){delete mem[k]}});
 return new Promise(function(ok){var once=0;auth.onAuthStateChanged(function(){if(once++)return;pull().then(ok,ok)})})}).catch(function(e){X.cloudError=e.message});
})(typeof window!=='undefined'?window:globalThis);
