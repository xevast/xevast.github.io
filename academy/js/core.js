/* Xevast Academy core: data, IDs, progress, certificates. Browser + Node (tests). */
(function(root){
'use strict';
var KEY='xva-db',MGR_CODE='xevast-manager'; /* change MGR_CODE; for real security use Firebase roles */
var mem={};var ls=(typeof localStorage!=='undefined')?localStorage:{getItem:function(k){return mem[k]||null},setItem:function(k,v){mem[k]=v},removeItem:function(k){delete mem[k]}};
function use(s){ls=s}
function db(){try{return JSON.parse(ls.getItem(KEY))||fresh()}catch(e){return fresh()}}
function fresh(){return{users:[],enroll:[],certs:[],apps:[],offers:[],jobs:[],train:[],courses:[],domains:[],programs:[],seq:{reg:0,cert:0,offer:0},sess:null,jobsSeeded:false,coursesSeeded:false}}
function save(d){ls.setItem(KEY,JSON.stringify(d))}
function pad(n,l){n=String(n);while(n.length<l)n='0'+n;return n}
function nextId(d,k,pre,len){d.seq[k]=(d.seq[k]||0)+1;return pre+'-'+new Date().getFullYear()+'-'+pad(d.seq[k],len)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function today(){return new Date().toISOString().slice(0,10)}
function fmt(s){if(!s)return'';var d=new Date(s+(s.length===10?'T00:00:00':''));return d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function mk(id,name,level,dur,price,mods,quiz){return{id:id,name:name,level:level,dur:dur,price:price,desc:'',domain:'',published:true,order:0,batches:null,
 modules:mods.map(function(m,i){return{id:'m'+(i+1),title:m[0],lessons:m[1].map(function(l,j){return{id:'m'+(i+1)+'l'+(j+1),title:l}})}}),quiz:quiz}}
var COURSES=[
mk('cyber-fundamentals','Cybersecurity Fundamentals','Beginner','8 weeks',4999,[['Security basics',['CIA triad','Threats and attackers','Risk basics']],['Network and web',['TCP/IP essentials','HTTP and TLS','Common web attacks']],['Defence',['Passwords and MFA','Logging and monitoring','Incident response basics']]],
 [['Which protects data from unauthorised viewing?',['Confidentiality','Availability','Latency'],0],['MFA adds…',['A second proof of identity','A faster login','A bigger password'],0],['HTTPS uses…',['TLS','FTP','SMTP'],0]]),
mk('ethical-hacking','Ethical Hacking','Intermediate','10 weeks',7999,[['Recon',['OSINT','Scanning with Nmap']],['Exploitation',['Web vulnerabilities','Privilege escalation']],['Reporting',['Writing a VAPT report','Responsible disclosure']]],
 [['Nmap is used for…',['Port scanning','Video editing','Billing'],0],['A VAPT report should include…',['Findings and fixes','Only screenshots','Passwords'],0],['Testing needs…',['Written permission','Nothing','Anonymity'],0]]),
mk('web-development','Web Development','Beginner','10 weeks',5999,[['Frontend',['HTML structure','CSS layout','JavaScript basics']],['Backend',['APIs and JSON','Databases']],['Ship it',['Git and GitHub','Deploying a site']]],
 [['Which language styles a page?',['CSS','SQL','Bash'],0],['JSON is…',['A data format','A browser','A database'],0],['Git is used for…',['Version control','Hosting','Design'],0]]),
mk('cloud-devops','Cloud & DevOps','Intermediate','8 weeks',6999,[['Cloud basics',['IaaS, PaaS, SaaS','Networking in cloud']],['DevOps',['CI/CD pipelines','Docker basics']],['Operate',['Monitoring','Cost control']]],
 [['CI/CD automates…',['Build and deploy','Hiring','Invoices'],0],['Docker packages…',['Apps with dependencies','Emails','Photos'],0],['SaaS means…',['Software as a Service','Server as a Site','Safe as a Service'],0]]),
mk('ui-ux-basics','UI/UX Basics','Beginner','6 weeks',3999,[['Principles',['User research','Layout and hierarchy']],['Practice',['Wireframes','Prototyping']],['Handoff',['Design systems','Usability testing']]],
 [['A wireframe is…',['A low-detail layout','A final photo','A database'],0],['Usability testing observes…',['Real users','Servers','Competitors only'],0],['Hierarchy guides…',['Attention','Bandwidth','Pricing'],0]]),
mk('ai-automation','AI & Automation','Beginner','6 weeks',4999,[['AI basics',['What LLMs do','Prompting well']],['Automate',['Workflow automation','Chatbots']],['Responsible AI',['Privacy and bias','Evaluating output']]],
 [['A good prompt is…',['Clear and specific','As short as possible','Random'],0],['Automation saves…',['Repetitive work','Electricity only','Nothing'],0],['AI output should be…',['Checked','Trusted blindly','Hidden'],0]]),
mk('digital-marketing-seo','Digital Marketing & SEO','Beginner','6 weeks',3999,[['SEO',['Keywords','On-page SEO']],['Channels',['Social media','Email marketing']],['Measure',['Analytics','Reporting']]],
 [['SEO improves…',['Search visibility','Battery life','Typing speed'],0],['Analytics measures…',['Visitor behaviour','Rainfall','Salaries'],0],['A keyword is…',['A search term','A password','A server'],0]])];
var DEF_DOMAINS=['Web Development','Cybersecurity','UI/UX Design','Digital Marketing','Cloud & DevOps','AI & Automation'];
var DEF_META={'cyber-fundamentals':['Cybersecurity','Learn how attacks work and how to defend a small business.'],'ethical-hacking':['Cybersecurity','Hands-on recon, exploitation and report writing.'],'web-development':['Web Development','Build and ship a real website from scratch.'],'cloud-devops':['Cloud & DevOps','Cloud basics, CI/CD pipelines and Docker.'],'ui-ux-basics':['UI/UX Design','Research, wireframes and prototypes.'],'ai-automation':['AI & Automation','Use AI tools and automate repetitive work.'],'digital-marketing-seo':['Digital Marketing','SEO, social media and analytics.']};
COURSES.forEach(function(c){var m=DEF_META[c.id];c.domain=m[0];c.desc=m[1]});
function clone(x){return JSON.parse(JSON.stringify(x))}
function course(id){return db().courses.filter(function(c){return c.id===id})[0]}
function courses(onlyPub){return db().courses.filter(function(c){return!onlyPub||c.published!==false}).sort(function(a,b){return(a.order||0)-(b.order||0)||a.name.localeCompare(b.name)})}
function lessons(c){var a=[];c.modules.forEach(function(m){m.lessons.forEach(function(l){a.push(l.id)})});return a}
/* ---- lesson proof: a lesson can only be completed after real time spent (shared with the server) ---- */
var LINK_MIN_SEC=120,WATCH_PCT=0.9,WATCH_PING_MAX=30,clock=function(){return Date.now()};
function lessonOf(c,lid){var f=null;c.modules.forEach(function(m){m.lessons.forEach(function(l){if(l.id===lid)f=l})});return f}
function need(l){return Math.ceil(WATCH_PCT*Math.max(1,l.vsec||1))}
function lessonReady(l,pr,now){pr=pr||{};if(l.video)return(pr.watched||0)>=need(l);return!!pr.opened&&now-pr.opened>=LINK_MIN_SEC*1000}
function lessonWhy(l,pr,now){pr=pr||{};if(l.video)return'Watch at least '+Math.round(WATCH_PCT*100)+'% of the video first ('+Math.floor(pr.watched||0)+' of '+need(l)+' seconds so far)';
 if(!pr.opened)return'Start the lesson first';return'Spend a little more time on this lesson. You can complete it in '+Math.max(1,Math.ceil((LINK_MIN_SEC*1000-(now-pr.opened))/1000))+' seconds'}
function autoBatches(c){var d=new Date(),a=[];for(var i=1;i<=3;i++){var x=new Date(Date.UTC(d.getFullYear(),d.getMonth()+i,1));a.push({id:c.id+'-'+x.toISOString().slice(0,7),start:x.toISOString().slice(0,10),seats:30})}return a}
/* batches with seats left. Cloud mode keeps a server-side 'taken' counter; local mode counts enrolments. */
function batches(c){var d=db(),src=c.batches&&c.batches.length?c.batches:autoBatches(c);return src.map(function(b){var id=b.id||c.id+'-'+b.start,t=b.taken!=null?b.taken:d.enroll.filter(function(e){return e.batchId===id}).length;return{id:id,start:b.start,seats:b.seats,taken:t,left:Math.max(0,b.seats-t)}})}
var SEED_JOBS=[['Web Development Intern','Web Development','Remote','1 month'],['Cybersecurity Intern','Cybersecurity','Remote','2 months'],['UI/UX Design Intern','UI/UX Design','Remote','1 month'],['Digital Marketing Intern','Digital Marketing','Remote','1 month']];
function seed(d){if(!d.coursesSeeded){d.courses=clone(COURSES);d.domains=DEF_DOMAINS.slice();d.coursesSeeded=true}
 if(!d.jobsSeeded){SEED_JOBS.forEach(function(j,i){d.jobs.push({id:'job'+(i+1),title:j[0],domain:j[1],mode:j[2],dur:j[3],stipend:'Unpaid',open:true})});d.jobsSeeded=true}}
function hash(s){var b=new TextEncoder().encode('xva|'+s);return crypto.subtle.digest('SHA-256',b).then(function(h){return Array.prototype.map.call(new Uint8Array(h),function(x){return pad(x.toString(16),2)}).join('')})}
function me(){var d=db();return d.sess?d.users.filter(function(u){return u.id===d.sess})[0]||null:null}
function register(o){return hash(o.pass||'').then(function(h){var d=db();seed(d);var email=String(o.email||'').trim().toLowerCase();
 if(!o.name||!String(o.name).trim()||!/^\S+@\S+\.\S+$/.test(email))throw new Error('Enter a valid name and email');
 if(!o.pass||o.pass.length<6)throw new Error('Password must be at least 6 characters');
 if(d.users.some(function(u){return u.email===email}))throw new Error('This email is already registered');
 var mgr=!!o.code&&o.code===MGR_CODE;if(o.code&&!mgr)throw new Error('Wrong manager code');
 var u={id:'u'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),name:String(o.name).trim(),email:email,ph:h,role:mgr?'manager':'student',regId:nextId(d,'reg','XVA',4),at:today()};
 d.users.push(u);d.sess=u.id;save(d);return u})}
function login(email,pass){return hash(pass||'').then(function(h){var d=db();seed(d);email=String(email||'').trim().toLowerCase();
 var u=d.users.filter(function(x){return x.email===email&&x.ph===h})[0];if(!u)throw new Error('Wrong email or password');d.sess=u.id;save(d);return u})}
function logout(){var d=db();d.sess=null;save(d)}
/* enrolment = batch purchase; payment is a placeholder until a gateway (Razorpay) is wired */
function enroll(userId,courseId,batchId){var d=db(),c=course(courseId);if(!c)throw new Error('Unknown course');
 var bt=batches(c).filter(function(b){return b.id===batchId})[0];if(!bt)throw new Error('Unknown batch');if(c.published===false)throw new Error('This course is not open for enrolment');if(bt.left<1)throw new Error('This batch is full');
 if(d.enroll.some(function(e){return e.userId===userId&&e.courseId===courseId}))throw new Error('Already enrolled');
 var e={id:'e'+Date.now().toString(36)+d.enroll.length,userId:userId,courseId:courseId,batchId:batchId,amount:c.price,paid:true,at:today(),done:{},prog:{},skill:null};d.enroll.push(e);var cc=d.courses.filter(function(x){return x.id===courseId})[0];if(cc&&cc.batches)cc.batches.forEach(function(b){if((b.id||cc.id+'-'+b.start)===batchId)b.taken=(b.taken||0)+1});save(d);return e}
function myEnroll(userId){return db().enroll.filter(function(e){return e.userId===userId})}
function progress(e){var c=course(e.courseId);if(!c)return{done:0,total:0,pct:0};var a=lessons(c),n=a.filter(function(l){return e.done[l]}).length;return{done:n,total:a.length,pct:Math.round(n/a.length*100)}}
function findEnroll(d,userId,eid){var e=d.enroll.filter(function(x){return x.id===eid&&x.userId===userId})[0];if(!e)throw new Error('Not enrolled');return e}
function openLesson(userId,eid,lid){var d=db(),e=findEnroll(d,userId,eid);if(e.paid===false)throw new Error('Payment is pending. Lessons unlock after payment is confirmed.');var l=lessonOf(course(e.courseId),lid);if(!l)throw new Error('Unknown lesson');
 e.prog=e.prog||{};var p=e.prog[lid]=e.prog[lid]||{};if(!p.opened)p.opened=clock();save(d);return{lesson:l.id,url:l.url||'',video:null,vsec:l.vsec||0,minSec:l.video?0:LINK_MIN_SEC,opened:p.opened,watched:p.watched||0}}
function watchLesson(userId,eid,lid,playing){var d=db(),e=findEnroll(d,userId,eid),l=lessonOf(course(e.courseId),lid);if(!l||!l.video)throw new Error('This lesson has no hosted video');
 e.prog=e.prog||{};var p=e.prog[lid]=e.prog[lid]||{},now=clock(),gain=p.playing&&p.last?Math.min((now-p.last)/1000,WATCH_PING_MAX):0;p.watched=Math.min(Math.max(1,l.vsec||1),(p.watched||0)+gain);p.last=now;p.playing=!!playing;if(!p.opened)p.opened=now;save(d);return{watched:Math.floor(p.watched),need:need(l)}}
/* ticking a lesson is checked, not trusted. Certificates are NOT issued here: only the manager issues them. */
function markLesson(userId,eid,lid,val){var d=db(),e=findEnroll(d,userId,eid);if(e.paid===false)throw new Error('Payment is pending. Lessons unlock after payment is confirmed.');
 var l=lessonOf(course(e.courseId),lid);if(!l)throw new Error('Unknown lesson');
 if(val===false)delete e.done[lid];else{if(!lessonReady(l,(e.prog||{})[lid],clock()))throw new Error(lessonWhy(l,(e.prog||{})[lid],clock()));e.done[lid]=today()}save(d);return{progress:progress(e)}}
function submitQuiz(userId,eid,answers){var d=db(),e=findEnroll(d,userId,eid),c=course(e.courseId);if(!c||!c.quiz.length)throw new Error('This course has no skill test');
 var ok=c.quiz.filter(function(q,i){return answers[i]===q[2]}).length,score=Math.round(ok/c.quiz.length*100);
 e.skill={score:score,at:today()};save(d);return{score:score,pass:score>=70}}
function issueRaw(o){var d=db(),u=d.users.filter(function(x){return x.id===o.userId})[0];if(!u)throw new Error('Unknown user');
 var c=o.courseId?course(o.courseId):null,ref=o.courseId||o.jobId||'';
 var ex=d.certs.filter(function(x){return x.type===o.type&&x.userId===o.userId&&x.ref===ref&&!x.revoked})[0];if(ex)return ex;
 var rec={certNo:nextId(d,'cert','XVC',5),type:o.type,userId:u.id,name:u.name,regId:u.regId,ref:ref,title:o.title||(c?c.name:''),score:o.score||null,start:o.start||null,end:o.end||today(),issued:today(),revoked:false};
 d.certs.push(rec);save(d);return rec}
function issue(o){mgr();return issueRaw(o)}
function enrollById(d,eid){var e=d.enroll.filter(function(x){return x.id===eid})[0];if(!e)throw new Error('Enrolment not found');return e}
function issueCourseCert(eid){mgr();var d=db(),e=enrollById(d,eid);if(progress(e).pct<100)throw new Error('Course is not complete yet');return issueRaw({type:'course',userId:e.userId,courseId:e.courseId})}
function issueSkillCert(eid){mgr();var d=db(),e=enrollById(d,eid);if(!e.skill||e.skill.score<70)throw new Error('The student has not passed the skill test (70% needed)');return issueRaw({type:'skill',userId:e.userId,courseId:e.courseId,score:e.skill.score})}
function markPaid(eid){mgr();var d=db(),e=enrollById(d,eid);e.paid=true;save(d);return e}
function verify(no){no=String(no||'').trim().toUpperCase();var r=db().certs.filter(function(c){return c.certNo===no})[0];
 if(!r)return{ok:false,reason:'No certificate found with this number'};if(r.revoked)return{ok:false,reason:'This certificate has been revoked',cert:r};return{ok:true,cert:r}}
function revoke(no){var d=db(),r=d.certs.filter(function(c){return c.certNo===no})[0];if(!r)throw new Error('Not found');r.revoked=true;save(d)}
function mgr(){var u=me();if(!u||u.role!=='manager')throw new Error('Manager access only')}
function addJob(o){mgr();return saveJob(o)}
function normJob(o,id){var t=String(o.title||'').trim(),dm=String(o.domain||'').trim();if(t.length<3||!dm)throw new Error('Title and domain required');return{id:id,title:t.slice(0,100),domain:dm.slice(0,60),mode:String(o.mode||'Remote').slice(0,30),dur:String(o.dur||'1 month').slice(0,30),stipend:String(o.stipend||'Unpaid').slice(0,60),open:o.open!==false}}
function saveJob(o){mgr();var d=db(),j=o.id&&d.jobs.filter(function(x){return x.id===o.id})[0],n=normJob(o,j?j.id:'job'+Date.now().toString(36));if(j)d.jobs[d.jobs.indexOf(j)]=n;else d.jobs.push(n);save(d);return n}
function setJobOpen(id,v){mgr();var d=db(),j=d.jobs.filter(function(x){return x.id===id})[0];if(!j)throw new Error('Opening not found');j.open=!!v;save(d);return j}
function deleteJob(id){mgr();var d=db();if(d.apps.some(function(a){return a.jobId===id}))throw new Error('This opening has applications. Close it instead.');d.jobs=d.jobs.filter(function(x){return x.id!==id});save(d)}
function addDomain(name){mgr();var d=db(),n=String(name||'').trim();if(n.length<2||n.length>40)throw new Error('Domain name must be 2 to 40 characters');if(d.domains.some(function(x){return x.toLowerCase()===n.toLowerCase()}))throw new Error('This domain already exists');d.domains.push(n);save(d);return n}
function removeDomain(name){mgr();var d=db();d.domains=d.domains.filter(function(x){return x!==name});save(d)}
function domains(){return db().domains.slice()}
function programs(onlyOpen){return db().programs.filter(function(p){return!onlyOpen||p.open!==false})}
function normProgram(o,id){var t=String(o.title||'').trim();if(t.length<3||t.length>100)throw new Error('Programme title must be 3 to 100 characters');var fee=Number(o.fee||0);if(!isFinite(fee)||fee<0)throw new Error('Enter a valid fee (0 or more)');
 return{id:id,title:t,domain:String(o.domain||'').trim().slice(0,40),mode:['Online','On-site','Hybrid'].indexOf(o.mode)>=0?o.mode:'Online',dur:String(o.dur||'').trim().slice(0,30),fee:Math.round(fee),desc:String(o.desc||'').trim().slice(0,500),open:o.open!==false}}
function saveProgram(o){mgr();var d=db(),p=o.id&&d.programs.filter(function(x){return x.id===o.id})[0],n=normProgram(o,p?p.id:'p'+Date.now().toString(36));if(p)d.programs[d.programs.indexOf(p)]=n;else d.programs.push(n);save(d);return n}
function removeProgram(id){mgr();var d=db();d.programs=d.programs.filter(function(x){return x.id!==id});save(d)}
/* ---- courses: text editors <-> structures ---- */
var VIDRE=/^acVideos\/[a-z0-9_-]{2,60}\/[\w.-]{1,120}$/i,URLRE=/^https?:\/\/\S+$/i,DATERE=/^\d{4}-\d{2}-\d{2}$/,IDRE=/^[a-z0-9_-]{2,60}$/i;
function okDate(x){return DATERE.test(x||'')&&!isNaN(new Date(x+'T00:00:00'))}
function slug(t){return String(t).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'course'}
function rid(p){return p+Math.random().toString(36).slice(2,8)}
function parseSyllabus(t){var mods=[],cur=null;String(t||'').split(/\r?\n/).forEach(function(l){l=l.trim();if(!l)return;if(l[0]==='#'){cur={title:l.replace(/^#+\s*/,''),lessons:[]};mods.push(cur)}else{if(!cur){cur={title:'Module 1',lessons:[]};mods.push(cur)}var p=l.split('|'),u=(p[1]||'').trim();cur.lessons.push(/^video:/i.test(u)?{title:p[0].trim(),url:'',video:u.replace(/^video:/i,'').trim(),vsec:Number((p[2]||'').trim())||0}:{title:p[0].trim(),url:u})}});return mods}
function syllabusText(m){return(m||[]).map(function(x){return'# '+x.title+'\n'+x.lessons.map(function(l){return l.title+(l.video?' | video:'+l.video+' | '+(l.vsec||0):l.url?' | '+l.url:'')}).join('\n')}).join('\n\n')}
function parseQuiz(t){return String(t||'').split(/\r?\n/).map(function(l){return l.trim()}).filter(Boolean).map(function(l,i){var p=l.split('|').map(function(x){return x.trim()}),q=p.shift(),a=-1,op=p.map(function(x,j){if(/\*$/.test(x)){a=j;return x.replace(/\*+$/,'').trim()}return x});if(a<0)throw new Error('Quiz line '+(i+1)+': put * after the correct option');return[q,op,a]})}
function quizText(q){return(q||[]).map(function(x){return x[0]+' | '+x[1].map(function(o,j){return o+(j===x[2]?'*':'')}).join(' | ')}).join('\n')}
function parseBatches(t){return String(t||'').split(/\r?\n/).map(function(l){return l.trim()}).filter(Boolean).map(function(l){var p=l.split('|');return{start:p[0].trim(),seats:Number((p[1]||'30').trim())}})}
function batchesText(b){return(b||[]).map(function(x){return x.start+' | '+x.seats}).join('\n')}
/* validate + normalise a course; keeps ids of lessons/modules whose titles did not change so students' progress survives edits */
function normCourse(o,old,usedIds){var name=String(o.name||'').trim();if(name.length<3||name.length>80)throw new Error('Course name must be 3 to 80 characters');
 var price=Number(o.price);if(o.price===''||o.price==null||!isFinite(price)||price<0||price>1000000)throw new Error('Enter a valid price (0 or more)');
 var oldL={},oldM={};((old&&old.modules)||[]).forEach(function(m){oldM[m.title]=m.id;m.lessons.forEach(function(l){oldL[m.title+'\u0001'+l.title]=l.id})});
 var seen={},mods=(o.modules||[]).map(function(m,i){var t=String(m.title||'').trim();if(!t)throw new Error('Module '+(i+1)+' needs a title');
  var ls=(m.lessons||[]).map(function(l,j){var lt=String(l.title||'').trim();if(!lt)throw new Error('A lesson in "'+t+'" has no title');var u=String(l.url||'').trim();if(u&&!URLRE.test(u))throw new Error('Lesson link must start with http:// or https:// ('+lt+')');var vd=String(l.video||'').trim(),vs=Math.round(Number(l.vsec)||0);if(vd&&!VIDRE.test(vd))throw new Error('Invalid video file for lesson "'+lt+'". Upload it again.');if(vd&&!(vs>=5&&vs<=14400))throw new Error('Video length is missing for "'+lt+'". Upload the video again.');if(vd)u='';
   var id=IDRE.test(l.id||'')?l.id:(oldL[t+'\u0001'+lt]||rid('l'));if(seen[id])id=rid('l');seen[id]=1;return{id:id,title:lt.slice(0,120),url:u,video:vd,vsec:vd?vs:0}});
  if(!ls.length)throw new Error('Module "'+t+'" needs at least one lesson');return{id:IDRE.test(m.id||'')?m.id:(oldM[t]||rid('m')),title:t.slice(0,100),lessons:ls}});
 if(!mods.length)throw new Error('Add at least one module with a lesson');
 var quiz=(o.quiz||[]).map(function(q,i){var qt=String(q[0]||'').trim(),op=(q[1]||[]).map(function(x){return String(x).trim()}).filter(Boolean),a=Number(q[2]);if(!qt||op.length<2||op.length>5||!(a>=0&&a<op.length&&a%1===0))throw new Error('Quiz question '+(i+1)+' needs a question, 2 to 5 options and one correct option');return[qt.slice(0,200),op.map(function(x){return x.slice(0,120)}),a]});
 if(quiz.length>20)throw new Error('At most 20 quiz questions');
 var id=old?old.id:(IDRE.test(o.id||'')?o.id:slug(name));if(!old){var base=id,n=2;while((usedIds||[]).indexOf(id)>=0)id=base+'-'+n++}
 var oldT={};((old&&old.batches)||[]).forEach(function(b){oldT[b.id||id+'-'+b.start]=b.taken||0});var sd={};
 var bs=(o.batches||[]).map(function(b){if(!okDate(b.start))throw new Error('Batch date must look like 2026-12-01');var st=Number(b.seats);if(!(st>=1&&st<=1000&&st%1===0))throw new Error('Batch seats must be a whole number from 1 to 1000');if(sd[b.start])throw new Error('Two batches have the same start date');sd[b.start]=1;var bid=id+'-'+b.start;return{id:bid,start:b.start,seats:st,taken:oldT[bid]||0}});
 var pub=o.published!==false;if(pub&&!bs.length)throw new Error('Add at least one batch, or untick Published');
 return{id:id,name:name,level:['Beginner','Intermediate','Advanced'].indexOf(o.level)>=0?o.level:'Beginner',dur:String(o.dur||'').trim().slice(0,30)||'Self-paced',price:Math.round(price),desc:String(o.desc||'').trim().slice(0,600),domain:String(o.domain||'').trim().slice(0,40),published:pub,order:Number(o.order)||0,modules:mods,quiz:quiz,batches:bs}}
function saveCourse(o){mgr();var d=db(),old=o.id&&d.courses.filter(function(c){return c.id===o.id})[0],c=normCourse(o,old,d.courses.map(function(x){return x.id}));
 if(old)d.courses[d.courses.indexOf(old)]=c;else d.courses.push(c);save(d);return c}
function deleteCourse(id){mgr();var d=db();if(d.enroll.some(function(e){return e.courseId===id}))throw new Error('Students are enrolled in this course. Untick Published instead of deleting.');d.courses=d.courses.filter(function(c){return c.id!==id});save(d)}
function apply(userId,jobId,note){var d=db(),j=d.jobs.filter(function(x){return x.id===jobId&&x.open})[0];if(!j)throw new Error('Opening closed');
 if(d.apps.some(function(a){return a.userId===userId&&a.jobId===jobId}))throw new Error('You already applied');
 var a={id:'a'+Date.now().toString(36)+d.apps.length,userId:userId,jobId:jobId,note:String(note||'').slice(0,500),status:'applied',at:today()};d.apps.push(a);save(d);return a}
function offer(appId,o){mgr();var d=db(),a=d.apps.filter(function(x){return x.id===appId})[0];if(!a)throw new Error('Application not found');
 function okd(x){return/^\d{4}-\d{2}-\d{2}$/.test(x||'')&&!isNaN(new Date(x+'T00:00:00'))}
 if(!okd(o.start)||!okd(o.end)||o.end<o.start)throw new Error('Check start and end dates (YYYY-MM-DD)');
 var ex=d.offers.filter(function(x){return x.appId===appId})[0];if(ex)return ex;
 var j=d.jobs.filter(function(x){return x.id===a.jobId})[0],u=d.users.filter(function(x){return x.id===a.userId})[0];
 var r={ref:nextId(d,'offer','XVO',4),appId:appId,userId:u.id,name:u.name,email:u.email,role:j.title,domain:j.domain,start:o.start,end:o.end,mode:o.mode||j.mode,stipend:o.stipend||'Unpaid',date:today(),accepted:false};
 d.offers.push(r);a.status='offered';save(d);return r}
function acceptOffer(userId,ref){var d=db(),r=d.offers.filter(function(x){return x.ref===ref&&x.userId===userId})[0];if(!r)throw new Error('Offer not found');
 r.accepted=true;r.acceptedAt=today();d.apps.filter(function(a){return a.id===r.appId})[0].status='accepted';save(d);return r}
function completeInternship(appId){mgr();var d=db(),a=d.apps.filter(function(x){return x.id===appId})[0];if(!a)throw new Error('Application not found');
 var r=d.offers.filter(function(x){return x.appId===appId})[0];if(!r||!r.accepted)throw new Error('Offer must be accepted first');
 a.status='completed';save(d);return issueRaw({type:'internship',userId:a.userId,jobId:a.jobId,title:r.role,start:r.start,end:r.end})}
function addTraining(o){var d=db(),n=String(o.name||'').trim(),tp=String(o.topic||'').trim();if(!n||!tp)throw new Error('Name and topic required');var t={id:'t'+Date.now().toString(36)+d.train.length,name:n.slice(0,80),org:String(o.org||'').slice(0,120),topic:tp.slice(0,80),programme:String(o.programme||'').slice(0,100),mode:String(o.mode||'Online').slice(0,20),phone:String(o.phone||'').slice(0,20),email:String(o.email||'').slice(0,120),at:today()};d.train.push(t);save(d);return t}
function stats(){var d=db();return d.users.filter(function(u){return u.role==='student'}).map(function(u){var es=d.enroll.filter(function(e){return e.userId===u.id&&course(e.courseId)});
 function has(e,t){return d.certs.some(function(c){return c.userId===u.id&&c.type===t&&c.ref===e.courseId&&!c.revoked})}
 return{user:u,courses:es.map(function(e){return{eid:e.id,course:course(e.courseId).name,pct:progress(e).pct,skill:e.skill,paid:e.paid!==false,courseCert:has(e,'course'),skillCert:has(e,'skill')}}),certs:d.certs.filter(function(c){return c.userId===u.id}).length}})}
var API={LINK_MIN_SEC:LINK_MIN_SEC,WATCH_PCT:WATCH_PCT,WATCH_PING_MAX:WATCH_PING_MAX,setClock:function(f){clock=f||function(){return Date.now()}},lessonOf:lessonOf,lessonReady:lessonReady,lessonWhy:lessonWhy,openLesson:openLesson,watchLesson:watchLesson,issueCourseCert:issueCourseCert,issueSkillCert:issueSkillCert,markPaid:markPaid,normJob:normJob,normProgram:normProgram,courses:courses,domains:domains,programs:programs,saveCourse:saveCourse,deleteCourse:deleteCourse,addDomain:addDomain,removeDomain:removeDomain,saveProgram:saveProgram,removeProgram:removeProgram,saveJob:saveJob,setJobOpen:setJobOpen,deleteJob:deleteJob,normCourse:normCourse,parseSyllabus:parseSyllabus,syllabusText:syllabusText,parseQuiz:parseQuiz,quizText:quizText,parseBatches:parseBatches,batchesText:batchesText,autoBatches:autoBatches,slug:slug,DEF_DOMAINS:DEF_DOMAINS,ready:Promise.resolve(),verifyAsync:function(n){return Promise.resolve(verify(n))},use:use,db:db,save:save,esc:esc,fmt:fmt,today:today,COURSES:COURSES,course:course,lessons:lessons,batches:batches,me:me,register:register,login:login,logout:logout,
 enroll:enroll,buy:function(u,c,b){return enroll(u,c,b)},myEnroll:myEnroll,progress:progress,markLesson:markLesson,submitQuiz:submitQuiz,issue:issue,verify:verify,revoke:revoke,addJob:addJob,apply:apply,offer:offer,acceptOffer:acceptOffer,completeInternship:completeInternship,addTraining:addTraining,stats:stats,seed:function(){var d=db();seed(d);save(d)}};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.XVA=API;
})(typeof window!=='undefined'?window:globalThis);
