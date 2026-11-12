const XVS={"Web & Software": "web-development.html", "Mobile Apps": "mobile-apps.html", "UI/UX Design": "ui-ux-design.html", "System Design": "system-design.html", "Data & Analytics": "data-analytics.html", "SEO & Marketing": "seo-marketing.html", "Cloud & DevOps": "cloud-devops.html", "Managed IT": "managed-it.html", "Cybersecurity": "cybersecurity.html", "Network Security": "network-security.html", "Compliance & GRC": "compliance-grc.html", "Security Research Lab": "security-research-lab.html", "Forensics & IR": "forensics-ir.html", "AI Solutions": "ai-solutions.html", "Xevast Academy": "academy.html"};
const XVP={"globe": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18\"/>", "mobile": "<rect x=\"7\" y=\"2.5\" width=\"10\" height=\"19\" rx=\"2\"/><path d=\"M11 18h2\"/>", "layers": "<path d=\"M12 3l9 5-9 5-9-5zM3 13l9 5 9-5\"/>", "pen": "<path d=\"M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z\"/>", "cloud": "<path d=\"M7 18a4 4 0 01-.5-8 6 6 0 0111.5 1.5A3.5 3.5 0 0117.5 18z\"/>", "shield": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"/><path d=\"M9 12l2 2 4-4\"/>", "lock": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V8a4 4 0 018 0v3\"/>", "clipboard": "<rect x=\"6\" y=\"4\" width=\"12\" height=\"17\" rx=\"2\"/><path d=\"M9 4h6v3H9zM9 12h6M9 16h4\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-5-5\"/>", "alert": "<path d=\"M12 3l10 18H2zM12 10v5M12 18h.01\"/>", "chip": "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4\"/>", "chart": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"/>", "trend": "<path d=\"M3 17l6-6 4 4 8-8M15 7h6v6\"/>", "wrench": "<path d=\"M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z\"/>", "cap": "<path d=\"M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5\"/>", "cart": "<circle cx=\"9\" cy=\"20\" r=\"1.5\"/><circle cx=\"18\" cy=\"20\" r=\"1.5\"/><path d=\"M2 3h3l3 12h10l3-8H6\"/>", "mail": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 7l9 6 9-6\"/>", "phone": "<path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>", "insta": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M17.5 6.5h.01\"/>", "chat": "<path d=\"M21 12a9 9 0 01-13.4 7.8L3 21l1.3-4.4A9 9 0 1121 12z\"/>", "doc": "<path d=\"M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5M9 13h6M9 17h4\"/>", "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/>", "moon": "<path d=\"M21 13A9 9 0 1111 3a7 7 0 0010 10z\"/>", "speaker": "<path d=\"M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 010 6\"/>", "speakerx": "<path d=\"M4 9v6h4l5 4V5L8 9zM17 9l5 6M22 9l-5 6\"/>", "bot": "<rect x=\"4\" y=\"8\" width=\"16\" height=\"12\" rx=\"3\"/><path d=\"M12 8V5M9 13h.01M15 13h.01M9 17h6\"/><circle cx=\"12\" cy=\"3.5\" r=\"1\"/>"},XVE={"🌐": "globe", "📱": "mobile", "🏗": "layers", "🎨": "pen", "☁": "cloud", "🛡": "shield", "🔐": "lock", "📋": "clipboard", "🔬": "search", "🚨": "alert", "🤖": "chip", "📊": "chart", "📈": "trend", "🔧": "wrench", "🎓": "cap", "🛒": "cart", "📧": "mail", "⚡": "clock"};const XV=n=>'<svg class="i" viewBox="0 0 24 24" aria-hidden="true">'+(XVP[n]||'')+'</svg>';
const SERVICES=[
 ['🌐','Development','Web & Software','Modern, fast and scalable websites, e-commerce, SaaS products and APIs built around your business.'],
 ['📱','Development','Mobile Apps','Android, iOS and cross-platform apps that are smooth, reliable and easy to maintain.'],
 ['🎨','Design','UI/UX Design','Clean, intuitive interfaces — wireframes approved by you before development begins.'],
 ['☁️','Cloud','Cloud & DevOps','Secure, scalable cloud infrastructure with automated CI/CD pipelines.'],
 ['🛡️','Security','Cybersecurity','Ethical hacking, VAPT, red teaming, SOC monitoring and defence software.'],
 ['🔐','Security','Network Security','Firewall, VPN, office & server network security with continuous monitoring.'],
 ['📋','Security','Compliance & GRC','Security audits, ISO 27001 support, policy drafting and risk assessment.'],
 ['🔬','Security','Security Research Lab','Bug bounty, malware analysis and practical threat intelligence reports.'],
 ['🤖','AI','AI Solutions','AI agents, chatbots, RPA automation and AI security — built in from day one.'],
 ['🚨','Security','Forensics & IR','Investigation, evidence handling, data recovery and post-breach response.'],
 ['📊','Data','Data & Analytics','Live dashboards, reporting and business intelligence for better decisions.'],
 ['📈','Marketing','SEO & Marketing','Search ranking, social media and paid campaigns for the right audience.'],
 ['🏗️','Development','System Design','Architecture and custom solutions off-the-shelf products can\'t meet.'],
 ['🔧','Support','Managed IT','Monthly maintenance, server monitoring and a responsive technical helpdesk.'],
 ['🎓','Training','Xevast Academy','Courses, internships, cybersecurity workshops and awareness training.']
];
if(window.XVDATA){const em={};SERVICES.forEach(s=>{em[XVS[s[2]]]=s[0]});const fb={'wams.html':'managed-it.html','custom-solutions.html':'system-design.html'},ds={};XVDATA.divisions.forEach(x=>ds[x.slug]=x.name);SERVICES.length=0;XVDATA.live.forEach(s=>{XVS[s.name]=s.href;SERVICES.push([em[s.href]||em[fb[s.href]]||'🌐',ds[s.division],s.name,s.short||''])})}
try{document.getElementById('svcGrid').innerHTML=SERVICES.map((s,i)=>
 `<a class="svc-card reveal d${i%4}" data-cat="${s[1]}" href="${XVS[s[2]]||'academy.html'}"><div class="svc-ic">${XV(XVE[s[0]]||XVE[s[0].replace(/\uFE0F/g,'')]||'globe')}</div><span class="svc-cat">${s[1]}</span><h3>${s[2]}</h3><p>${s[3]}</p><span class="svc-more">Learn more →</span></a>`).join('');
}catch(e){}
try{const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});
const mmenu=document.getElementById('mmenu');
document.getElementById('ham').onclick=()=>mmenu.classList.toggle('open');
mmenu.querySelectorAll('a').forEach(a=>a.onclick=()=>mmenu.classList.remove('open'));
}catch(e){}
try{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}catch(e){}
try{const cio=new IntersectionObserver(es=>es.forEach(e=>{
 if(!e.isIntersecting)return;cio.unobserve(e.target);
 const el=e.target,end=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now();
 (function tick(t){const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+(p==1?suf:'');if(p<1)requestAnimationFrame(tick)})(t0);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));
}catch(e){}
try{const slides=document.querySelectorAll('.testi-slide'),dots=document.getElementById('tDots');
let cur=0,timer;
slides.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Testimonial '+(i+1));b.onclick=()=>goT(i);dots.appendChild(b)});
function goT(i){cur=i;slides.forEach((s,j)=>s.classList.toggle('active',j==i));
 [...dots.children].forEach((d,j)=>d.classList.toggle('on',j==i));resetT()}
function resetT(){clearInterval(timer);timer=setInterval(()=>goT((cur+1)%slides.length),5500)}
goT(0);
}catch(e){}
try{const mq=document.getElementById('marquee');mq.innerHTML+=mq.innerHTML;
}catch(e){}
try{document.querySelectorAll('.faq summary').forEach(s=>s.addEventListener('click',()=>{
 document.querySelectorAll('.faq details').forEach(d=>{if(d!==s.parentElement)d.removeAttribute('open')});
}));
}catch(e){}
(function(){
const $=id=>document.getElementById(id),fine=matchMedia('(hover:hover)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
try{// loader
$('ldimg').src=document.querySelector('.logo img').src;
const hideL=()=>$('loader').classList.add('hide');addEventListener('load',()=>setTimeout(hideL,350));setTimeout(hideL,2500);

}catch(e){}
try{// progress, back-to-top, active nav, glow
const ids=['home','services','estimate','work','pricing','about','faq','contact'],links=[...document.querySelectorAll('.nav-links a')];
addEventListener('scroll',()=>{
 const h=document.documentElement.scrollHeight-innerHeight;$('prog').style.width=(scrollY/h*100)+'%';
 $('top').classList.toggle('show',scrollY>700);
},{passive:true});
$('top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
if(fine)addEventListener('mousemove',e=>{$('glow').style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true});

}catch(e){}
try{// mobile menu icon
const ham=$('ham');ham.addEventListener('click',()=>{ham.textContent=$('mmenu').classList.contains('open')?'✕':'☰'});
$('mmenu').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>ham.textContent='☰'));

}catch(e){}
try{// service filter
const cats=['All',...new Set(SERVICES.map(x=>x[1]))],ft=$('ftabs');
cats.forEach((c,i)=>{const b=document.createElement('button');b.textContent=c;if(!i)b.className='on';
 b.onclick=()=>{[...ft.children].forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('#svcGrid .svc-card').forEach(k=>k.hidden=c!=='All'&&k.dataset.cat!==c)};ft.appendChild(b)});

}catch(e){}
try{// 3D tilt cards
if(false)document.querySelectorAll('.svc-card').forEach(el=>{
 el.addEventListener('mousemove',e=>{if(!el.classList.contains('visible')||document.documentElement.dataset.fx==='off')return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  el.style.transition='transform .1s';el.style.transform=`perspective(800px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateY(-4px)`});
 el.addEventListener('mouseleave',()=>{el.style.transition='';el.style.transform=''})});

}catch(e){}
try{// calculator
const fmt=n=>'₹'+n.toLocaleString('en-IN');
function calc(){let t=+$('cType').value;document.querySelectorAll('#cOpts input:checked').forEach(i=>t+=+i.value);
 const hi=Math.round(t*1.3/1000)*1000;$('cRes').textContent=fmt(t)+' – '+fmt(hi);
 const m=`Hi Xevast, I used the estimator: ${$('cType').selectedOptions[0].text}, estimate ${fmt(t)} – ${fmt(hi)}. I'd like to discuss.`;
 $('cBtn').href='https://wa.me/918340161172?text='+encodeURIComponent(m)}
$('cType').onchange=calc;document.querySelectorAll('#cOpts input').forEach(i=>i.onchange=calc);calc();

}catch(e){}
try{// 3D hero
const host=document.querySelector('.hero-visual');if(!window.THREE||!host)return;
const cv=document.createElement('canvas');cv.id='h3d';host.prepend(cv);
const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.75));
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,50);cam.position.z=9.5;
const red=0xE10600,g=new THREE.Group();sc.add(g);
const ico=new THREE.Mesh(new THREE.IcosahedronGeometry(2.3,1),new THREE.MeshBasicMaterial({color:red,wireframe:true,transparent:true,opacity:.2}));g.add(ico);
const mk=(r,rx,ry)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,.012,8,120),new THREE.MeshBasicMaterial({color:0xff4a3a,transparent:true,opacity:.4}));m.rotation.set(rx,ry,0);g.add(m);return m};
const r1=mk(3,1.2,.3),r2=mk(2.7,.4,1.1);
const N=innerWidth<700?90:200,pos=new Float32Array(N*3);
for(let i=0;i<N;i++){const v=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(2.6+Math.random()*1.6);pos.set([v.x,v.y,v.z],i*3)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xff6a5a,size:.045,transparent:true,opacity:.4}));g.add(pts);
function size(){const w=host.clientWidth*1.28,h=host.clientHeight*1.28;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
size();addEventListener('resize',size);
let mx=0,my=0,on=true;const wrap=document.querySelector('.hero-logo-wrap');
if(fine)addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
new IntersectionObserver(e=>{on=e[0].isIntersecting;if(on&&!calm)loop()}).observe(host);
function frame(t){ico.rotation.y=t*.00018;ico.rotation.x=t*.00009;r1.rotation.z=t*.0003;r2.rotation.z=-t*.00025;pts.rotation.y=-t*.00007;
 g.rotation.y+=(mx*.9-g.rotation.y)*.05;g.rotation.x+=(my*.6-g.rotation.x)*.05;
 R.render(sc,cam)}
function loop(t){if(!on||document.documentElement.dataset.fx==='off')return;frame(t||0);requestAnimationFrame(loop)}
calm?frame(2000):loop();addEventListener('xv-fx',()=>{if(document.documentElement.dataset.fx!=='off'&&on&&!calm)loop()});

}catch(e){}
})();
try{(function(){
const pre=document.getElementById('termBody');if(!pre)return;
const L=[['c','xevast scan --target client-site.com'],['','[*] Mapping attack surface...'],['','[+] 443/tcp  open  https'],['w','[!] 3 vulnerabilities found'],['e','    CVE check: SQLi, XSS, weak headers'],['','[*] Applying fixes...'],['o','[✓] Patched. Site secure.']];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,cur=document.createElement('span');cur.className='cur';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function row(c,t){const d=document.createElement('div');if(c)d.className=c;d.textContent=t;return d}
if(calm){L.forEach(l=>pre.appendChild(row(l[0],l[1])));return}
(async function run(){for(;;){pre.textContent='';
 for(const [c,t] of L){const d=row(c,'');pre.appendChild(d);d.appendChild(cur);
  for(const ch of t){cur.before(ch);await sleep(c==='c'?55:18)}
  await sleep(c==='c'?600:380)}
 await sleep(3200)}})();
})();

}catch(e){}
try{(function(){
const X=window.XVDATA,WA='918340161172';
const OLD=[[/\b(price|pricing|cost|budget|rate|quote|kitna|kharcha)\b/,'Starting prices are on the Pricing page, and the estimator gives an indicative range. Final quotes follow a free consultation.',[{l:'Open pricing',h:'pricing.html'},{l:'Get a quote',a:'form'}]],
[/\b(security|secure|cyber|hack|hacking|vapt|forensics|compliance)\b/,'Our Security division covers cybersecurity, network security, compliance, a research lab and incident response.',[{l:'Security services',h:'security.html'}]],
[/\b(cloud|devops|hosting|managed|it support)\b/,'We handle cloud, DevOps and managed IT support.',[{l:'Cloud & IT',h:'cloud.html'}]],
[/\b(ai|chatbot|automation)\b/,'We build chatbots, automation and custom AI tools.',[{l:'AI solutions',h:'ai.html'}]],
[/\b(academy|course|courses|internship|learn|training)\b/,'Xevast Academy offers courses, internships, workshops and awareness training.',[{l:'Academy',h:'academy.html'}]],
[/\b(web|website|app|apps|design|seo|data)\b/,'Our Web & Software division covers websites, mobile apps, UI/UX, data and SEO.',[{l:'Web & Software',h:'web.html'},{l:'Fill requirement form',a:'form'}]],
[/\b(contact|call|whatsapp|email|reach|talk)\b/,'Message us on WhatsApp or email contactxevast@gmail.com, or use the contact form.',[{l:'Chat on WhatsApp',h:'https://wa.me/'+WA,x:1},{l:'Contact page',h:'contact.html'}]],
[/\b(founder|anshu|ceo|who)\b/,'Xevast was founded by Anshu Kumar, who speaks with clients directly.',[{l:'About us',h:'about.html'},{l:'WhatsApp the CEO',h:'https://wa.me/'+WA,x:1}]],
[/\b(hi|hello|hey|namaste|hii)\b/,'Hello! Ask me about services, pricing, the Academy or how to contact us.',[]]];
const NEW=[[/\b(requirement|requirements|form|order|portal|book|booking|consultation|start|project)\b/,'Fill the short requirement form. Pick a service and it asks only the questions for that service, then creates a PDF you can send to us on WhatsApp.',[{l:'Open requirement form',a:'form'},{l:'Order online portal',h:(X&&X.company.portal)||'services.html'}]],
[/\b(support|ticket|problem|issue|help)\b/,'Raise a support request on the Support page, or check the Status page.',[{l:'Support',h:'support.html'},{l:'Status',h:'status.html'}]]];
const KB=(X?X.kb().map(k=>[k[0],k[1],[{l:k[3]||'Open',h:k[2]}].concat((X.live.find(v=>v.href===k[2])||{}).name?[{l:'Fill requirement form',a:'form',s:X.live.find(v=>v.href===k[2]).name}]:[])]):[]).concat(NEW,OLD);
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e};
const HS='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.7-2 2.5-5 2.5"/></svg>';
const b=el('button','');b.id='bot-b';b.innerHTML=HS;b.setAttribute('aria-label','Chat with Xevast assistant');
const p=el('div');p.id='bot-p';p.setAttribute('role','dialog');p.setAttribute('aria-label','Xevast assistant');
p.innerHTML='<div id="bot-h"><div class="bh"><span class="av">'+HS+'</span><span class="bt"><b>Xevast Assistant</b><small>Online · replies instantly</small></span></div><button type="button" id="bot-x" title="Clear chat" aria-label="Clear chat">↺</button></div><div id="bot-m" aria-live="polite"></div><div id="bot-c"></div><form id="bot-f"><input placeholder="Ask about services, pricing..." aria-label="Message" autocomplete="off"><button type="button" id="bot-mic" hidden aria-label="Speak your question"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg></button><button>Send</button></form>';
document.body.append(b,p);const m=p.querySelector('#bot-m'),ip=p.querySelector('input');
const KEY='xv-chat';let H=[];try{H=JSON.parse(sessionStorage.getItem(KEY)||'[]')}catch(e){}
const save=()=>{try{sessionStorage.setItem(KEY,JSON.stringify(H.slice(-40)))}catch(e){}};
function act(a){if(a.a==='form'){p.classList.remove('open');if(window.xevastOpenForm)window.xevastOpenForm(a.s||'')}}
function draw(t,u,acts){const d=el('div','bm'+(u?' u':''),t);if(acts&&acts.length){const w=el('div','bm-acts');acts.forEach(a=>{let n;if(a.h){n=el('a','',a.l);n.href=a.h;if(a.x){n.target='_blank';n.rel='noopener'}}else{n=el('button','',a.l);n.type='button';n.onclick=()=>act(a)}w.appendChild(n)});d.appendChild(w)}m.appendChild(d);m.scrollTop=m.scrollHeight}
function say(t,u,acts,quiet){draw(t,u,acts);if(!quiet){H.push([t,u?1:0,acts||[]]);save()}}
function typing(){const d=el('div','bm t');d.append(el('i'),el('i'),el('i'));m.appendChild(d);m.scrollTop=m.scrollHeight;return d}
function ask(q){say(q,1);const t=q.toLowerCase(),k=KB.find(x=>x[0].test(t)),w=typing();
 setTimeout(()=>{w.remove();if(k)say(k[1],0,k[2]);else say('I am a simple assistant and may not know this. The team can answer on WhatsApp.',0,[{l:'Chat on WhatsApp',h:'https://wa.me/'+WA+'?text='+encodeURIComponent('Hi Xevast, '+q),x:1},{l:'Fill requirement form',a:'form'}])},450)}
['Services','Pricing','WAMS','System Design','Academy','Requirement form','Contact'].forEach(x=>{const c=el('button','',x);c.type='button';c.onclick=()=>ask(x);p.querySelector('#bot-c').appendChild(c)});
const greet=()=>say('Welcome to Xevast! I can point you to the right page, open the requirement form for a service, or connect you with the team. What do you need?',0,[{l:'Open requirement form',a:'form'},{l:'WhatsApp the team',h:'https://wa.me/'+WA,x:1}]);
let init=false;function start(){if(init)return;init=true;if(H.length)H.forEach(h=>draw(h[0],h[1],h[2]));else greet()}
b.onclick=()=>{p.classList.toggle('open');if(p.classList.contains('open')){start();setTimeout(()=>{try{ip.focus({preventScroll:true})}catch(e){}},60)}};
p.querySelector('#bot-x').onclick=()=>{H=[];save();m.textContent='';init=true;greet()};
p.querySelector('#bot-f').onsubmit=e=>{e.preventDefault();if(ip.value.trim()){ask(ip.value.trim());ip.value=''}};
addEventListener('keydown',e=>{if(e.key==='Escape'&&p.classList.contains('open')){p.classList.remove('open');b.focus()}});
const SR=window.SpeechRecognition||window.webkitSpeechRecognition,mic=p.querySelector('#bot-mic');
if(SR){mic.hidden=false;let rc=null;mic.onclick=()=>{if(rc){rc.stop();return}try{rc=new SR();rc.lang='en-IN';rc.interimResults=false;rc.onresult=ev=>{ip.value=ev.results[0][0].transcript;p.querySelector('#bot-f').requestSubmit?p.querySelector('#bot-f').requestSubmit():0};rc.onend=()=>{rc=null;mic.classList.remove('on')};rc.onerror=()=>{rc=null;mic.classList.remove('on')};mic.classList.add('on');rc.start()}catch(e){rc=null;mic.classList.remove('on')}}}
})()}catch(e){}
try{const q=new URLSearchParams(location.search).get('service'),s=document.getElementById('fsvc');if(q&&s)s.value=q}catch(e){}
try{if('serviceWorker' in navigator&&location.protocol.indexOf('http')==0)navigator.serviceWorker.register('sw.js')}catch(e){}

try{const f=document.getElementById('cform');if(f)f.addEventListener('submit',()=>{let s=document.querySelector('.fstat');if(!s){s=document.createElement('p');s.className='fstat';f.appendChild(s)}
 s.textContent='Opening WhatsApp with your message… If nothing opened, message us directly: ';const a=document.createElement('a');a.href='https://wa.me/918340161172';a.textContent='wa.me/918340161172';a.target='_blank';a.rel='noopener';s.appendChild(a)})}catch(e){}

try{const r=document.documentElement,b=document.getElementById('theme');if(b){const set=(t,save)=>{r.setAttribute('data-theme',t);if(save)try{localStorage.setItem('xv-theme',t)}catch(e){}b.innerHTML=XV(t==='light'?'moon':'sun');b.setAttribute('aria-label','Switch to '+(t==='light'?'dark':'light')+' mode');const m=document.querySelector('meta[name=theme-color]');if(m)m.content=t==='light'?'#f6f6f9':'#050507'};
set(r.getAttribute('data-theme')||'dark',0);b.onclick=()=>set(r.getAttribute('data-theme')==='light'?'dark':'light',1)}}catch(e){}
try{const s=document.querySelector('.hero h1 .grad');if(s&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const w=['digital foundation','secure systems','smart products','growth engine'];let i=0;s.style.display='block';s.style.transition='opacity .4s,transform .4s';setInterval(()=>{s.style.opacity=0;s.style.transform='translateY(8px)';setTimeout(()=>{i=(i+1)%w.length;s.textContent=w[i];s.style.opacity=1;s.style.transform='none'},400)},3200)}}catch(e){}
try{if(/blog-/.test(location.pathname)){const c=document.querySelector('.prose');if(c){const d=document.createElement('p');d.style.marginTop='18px';const a=document.createElement('a');a.href='https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href);a.target='_blank';a.rel='noopener';a.textContent='Share on WhatsApp';a.style.color='var(--red2)';const k=document.createElement('button');k.type='button';k.textContent='Copy link';k.style.cssText='margin-left:16px;background:none;border:0;color:var(--red2);cursor:pointer;font:inherit';k.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(location.href);k.textContent='Copied!'};d.append(a,k);c.appendChild(d)}}}catch(e){}

/* ---- settings drawer + search ---- */
try{(function(){
const R=document.documentElement,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],LS='xv-set',mq=matchMedia('(prefers-color-scheme:light)');
const DEF={mode:'dark',fs:100,fx:1,rm:0,hc:0};let S=Object.assign({},DEF);try{Object.assign(S,JSON.parse(localStorage.getItem(LS)||'{}'))}catch(e){}
function apply(){const t=S.mode==='auto'?(mq.matches?'light':'dark'):S.mode;R.setAttribute('data-theme',t);
 try{localStorage.setItem('xv-theme',t);localStorage.setItem(LS,JSON.stringify(S))}catch(e){}
 const b=$('#theme');if(b){b.innerHTML=XV(t==='light'?'moon':'sun');b.setAttribute('aria-label','Switch to '+(t==='light'?'dark':'light')+' mode')}
 const m=$('meta[name=theme-color]');if(m)m.content=t==='light'?'#f6f6f9':'#050507';
 R.style.fontSize=S.fs+'%';R.dataset.fx=S.fx?'on':'off';R.dataset.rm=S.rm?'on':'off';R.dataset.hc=S.hc?'on':'off';
 $$('#drw [data-m]').forEach(x=>x.classList.toggle('on',x.dataset.m===S.mode));$$('#drw [data-f]').forEach(x=>x.classList.toggle('on',+x.dataset.f===S.fs));
 $$('#drw .sw').forEach(x=>x.setAttribute('aria-checked',S[x.dataset.k]?'true':'false'))}
const L=(h,t,c)=>'<a href="'+h+'"'+(c?' class="'+c+'"':'')+'>'+t+'</a>',hr=s=>{const e=$(s);return e?e.href:'#'};
const E_=s=>s.replace(/&/g,'&amp;');const acc=(lab,inner,open)=>'<div class="acc'+(open?' open':'')+'"><button type="button" aria-expanded="'+(open?'true':'false')+'">'+lab+'<i>›</i></button><div class="ac">'+inner+'</div></div>';
const FILE0=(location.pathname.split('/').pop()||'index.html');
const SVMENU=(function(){const X=window.XVDATA;if(!X)return L('services.html','Individual Services');
 const subs=dv=>dv.slug==='academy'?(X.tracks||[]):X.live.filter(s=>s.division===dv.slug&&s.href!==dv.href);
 const here=dv=>dv.href===FILE0||subs(dv).some(s=>s.href===FILE0)||(dv.slug==='academy'&&FILE0.indexOf('academy')===0);
 const B=X.divisions.find(d=>d.slug==='dbs'),DV=X.divisions.filter(d=>d.slug!=='dbs');
 const bs=B?acc('Digital Business Setup',L(B.href,'Complete setup overview →','all')+subs(B).map(s=>L(s.href,E_(s.name))).join(''),here(B)):'';
 return bs+acc('Individual Services',L('services.html','All services →','all')+DV.map(dv=>acc(E_(dv.name),L(dv.href,'Overview →','all')+subs(dv).map(s=>L(s.href,E_(s.name))).join(''),here(dv))).join(''),FILE0==='services.html'||DV.some(here))})();
const MENU=L('index.html','Home')+SVMENU+[['pricing.html','Pricing'],['contact.html','Contact'],['about.html','About'],['company-profile.html','Company Profile'],['academy/index.html','Academy'],['work.html','Work'],['blog.html','Blog'],['support.html','Support'],['login.html','Sign in / Register']].map(x=>L(x[0],x[1])).join('');
const d=document.createElement('aside'),scr=document.createElement('div');d.id='drw';scr.id='scr';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Menu and settings');
const sw=(k,t)=>'<div class="row"><span>'+t+'</span><button type="button" class="sw" role="switch" data-k="'+k+'" aria-label="'+t+'"></button></div>';
d.innerHTML='<div class="dh"><b>Menu &amp; Settings</b><button id="dx" type="button" aria-label="Close menu">✕</button></div>'
+'<button class="dsr" id="dsr" type="button">Search the site <kbd>Ctrl K</kbd></button>'
+'<div class="dl">'+MENU+'</div>'+'<div class="dq"><button type="button" class="p" id="dqf">Requirement form</button>'+L('login.html','Sign in / Order online')+'</div>'
+'<h4>Appearance</h4><div class="seg"><button type="button" data-m="dark">Dark</button><button type="button" data-m="light">Light</button><button type="button" data-m="auto">Auto</button></div>'
+'<h4>Text size</h4><div class="seg"><button type="button" data-f="90">A−</button><button type="button" data-f="100">A</button><button type="button" data-f="112">A+</button></div>'
+'<h4>Experience</h4>'+sw('fx','3D &amp; visual effects')+sw('rm','Reduce motion')+sw('hc','High contrast')
+'<h4>Contact us</h4><div class="seg q">'+L('https://wa.me/918340161172','WhatsApp')+L(hr('a[aria-label=Call]'),'Call')+L('mailto:contactxevast@gmail.com','Email')+L(hr('a[aria-label=Instagram]'),'Instagram')+'</div>'
+'<h4>App</h4><div class="seg"><button type="button" id="inst">Install app</button><button type="button" id="shr">Share site</button></div><p class="hint" id="ihint"></p>'
+'<button type="button" class="reset" id="rst">Reset settings</button>';
document.body.append(scr,d);
let prev,dp;const ham0=document.getElementById('ham'),ham=ham0.cloneNode(true);ham0.replaceWith(ham);ham.textContent='☰';ham.setAttribute('aria-controls','drw');ham.setAttribute('aria-expanded','false');
const open=()=>{prev=document.activeElement;d.classList.add('open');scr.classList.add('open');R.style.overflow='hidden';ham.setAttribute('aria-expanded','true');$('#dx').focus()};
const close=()=>{d.classList.remove('open');scr.classList.remove('open');R.style.overflow='';ham.setAttribute('aria-expanded','false');prev&&prev.focus&&prev.focus()};
ham.onclick=open;scr.onclick=close;$('#dx').onclick=close;d.querySelectorAll('.dl a,.q a').forEach(a=>a.addEventListener('click',close));
d.addEventListener('click',e=>{const t=e.target;const ab=t.closest&&t.closest('.acc>button');if(ab){const a=ab.parentElement;a.classList.toggle('open');ab.setAttribute('aria-expanded',a.classList.contains('open')?'true':'false');return}if(t.id==='dqf'){close();window.xevastOpenForm&&window.xevastOpenForm();return}if(t.dataset.m){S.mode=t.dataset.m;apply()}if(t.dataset.f){S.fs=+t.dataset.f;apply()}if(t.classList.contains('sw')){S[t.dataset.k]=S[t.dataset.k]?0:1;apply();if(t.dataset.k==='fx')dispatchEvent(new Event('xv-fx'))}});
$('#rst').onclick=()=>{S=Object.assign({},DEF);apply();dispatchEvent(new Event('xv-fx'))};
const tb=$('#theme');if(tb)tb.onclick=()=>{S.mode=R.getAttribute('data-theme')==='light'?'dark':'light';apply()};
mq.addEventListener&&mq.addEventListener('change',()=>{if(S.mode==='auto')apply()});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
$('#inst').onclick=()=>{if(dp){dp.prompt();dp=null}else $('#ihint').textContent='iPhone: Share → Add to Home Screen. Android/Chrome: browser menu → Install app.'};
$('#shr').onclick=()=>{const u={title:document.title,url:location.href};if(navigator.share)navigator.share(u).catch(()=>{});else{navigator.clipboard&&navigator.clipboard.writeText(u.url);$('#shr').textContent='✓ Link copied'}};
// search palette
const IT=[['Home','index.html','start'],['Services','services.html','all services'],['Web & Software','web.html','website app ui ux design seo data analytics'],['Cloud & IT','cloud.html','cloud devops hosting managed it support'],['Security','security.html','cybersecurity vapt network compliance forensics'],['AI Solutions','ai.html','ai chatbot automation'],['Xevast Academy','academy/index.html','courses internship training learn'],['Work','work.html','projects portfolio testimonials'],['Pricing','pricing.html','price cost plans estimate calculator faq'],['About','about.html','founder anshu'],['Blog','blog.html','articles insights'],['Website security basics','blog-website-security-basics.html','article'],['Plan a website budget','blog-plan-website-budget.html','article'],['What is VAPT?','blog-what-is-vapt.html','article'],['Web & Software — service','web-development.html','service development'],['Mobile Apps — service','mobile-apps.html','service development'],['UI/UX Design — service','ui-ux-design.html','service design'],['System Design — service','system-design.html','service development'],['Data & Analytics — service','data-analytics.html','service data'],['SEO & Marketing — service','seo-marketing.html','service marketing'],['Cloud & DevOps — service','cloud-devops.html','service cloud'],['Managed IT — service','managed-it.html','service support'],['Cybersecurity — service','cybersecurity.html','service security'],['Network Security — service','network-security.html','service security'],['Compliance & GRC — service','compliance-grc.html','service security'],['Security Research Lab — service','security-research-lab.html','service security'],['Forensics & IR — service','forensics-ir.html','service security'],['AI Solutions — service','ai-solutions.html','service ai'],['Contact','contact.html','quote whatsapp email call'],['Privacy policy','privacy.html','data']];
if(window.XVDATA)XVDATA.searchItems().forEach(x=>{const i=IT.findIndex(y=>y[1]===x[1]);if(i<0)IT.push(x);else IT[i][2]+=' '+x[2]});
const c=document.createElement('div');c.id='cmd';c.innerHTML='<div class="cbox" role="dialog" aria-modal="true" aria-label="Search"><input id="cin" placeholder="Search pages, services, articles…" aria-label="Search"><ul id="cls"></ul></div>';document.body.appendChild(c);
const cin=$('#cin'),cls=$('#cls');let ix=0,res=[];
function draw(){const q=cin.value.trim().toLowerCase();res=IT.filter(x=>!q||(x[0]+' '+x[2]).toLowerCase().includes(q));ix=0;cls.textContent='';
 res.forEach((x,i)=>{const l=document.createElement('li'),a=document.createElement('a');a.href=x[1];a.textContent=x[0];if(!i)l.className='on';l.appendChild(a);cls.appendChild(l)});if(!res.length){const l=document.createElement('li');l.textContent='No results';cls.appendChild(l)}}
const copen=()=>{close();c.classList.add('open');cin.value='';draw();cin.focus()},cclose=()=>c.classList.remove('open');
$('#dsr').onclick=copen;cin.oninput=draw;c.onclick=e=>{if(e.target===c)cclose()};
addEventListener('keydown',e=>{const k=e.key;
 if((e.ctrlKey||e.metaKey)&&k.toLowerCase()==='k'){e.preventDefault();copen();return}
 if(k==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();copen();return}
 if(k==='Escape'){cclose();close();return}
 if(c.classList.contains('open')){if(k==='ArrowDown'||k==='ArrowUp'){e.preventDefault();ix=(ix+(k==='ArrowDown'?1:-1)+res.length)%Math.max(res.length,1);[...cls.children].forEach((l,i)=>l.classList.toggle('on',i===ix))}
  else if(k==='Enter'&&res[ix])location.href=res[ix][1]}
 else if(k==='Tab'&&d.classList.contains('open')){const f=[...d.querySelectorAll('a,button')].filter(x=>x.offsetParent);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
apply();
})()}catch(e){}

/* ---- right dock, requirement form, PDF ---- */
try{(function(){
const $=s=>document.querySelector(s),el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const WA='918340161172',TEL='+918340161172',MAIL='contactxevast@gmail.com';
const dock=el('div');dock.id='dock';const bot=$('#bot-b');
const IC={cart:'<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
wa:'<path d="M12.04 2a9.9 9.9 0 00-8.4 15.1L2 22l5-1.6A9.9 9.9 0 1012.04 2zm5.8 14.1c-.25.7-1.45 1.35-2 1.4-.5.05-1.1.2-3.7-.8-3.1-1.2-5-4.4-5.2-4.6-.15-.2-1.2-1.6-1.2-3s.75-2.1 1-2.4c.25-.3.55-.35.75-.35h.55c.18 0 .42-.07.65.5.25.6.85 2.1.92 2.25.07.15.12.32.02.5-.1.2-.15.32-.3.5-.15.17-.3.38-.45.5-.15.15-.3.3-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.1 1.3 2.4 1.45.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.75.82 2.05.97.3.15.5.22.57.35.07.12.07.72-.18 1.4z"/>',
call:'<path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>',
mail:'<path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
form:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h5.2l.9-.9V19H6V4h7v5h5v3.2l2-2V8l-6-6zm7.7 11.3l-1-1a1 1 0 00-1.4 0L13 18.6V21h2.4l6.3-6.3a1 1 0 000-1.4z"/>',
cal:'<path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z"/>',
sup:'<path d="M12 1a9 9 0 00-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 0114 0v2h-4v8h4v1h-7v2h7a2 2 0 002-2V10a9 9 0 00-9-9z"/>',
dl:'<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>',
share:'<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 1015 5c0 .24.04.47.09.7L8.04 9.81A3 3 0 106 15c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65a2.92 2.92 0 102.92-2.92z"/>'};
const ico=(k,c)=>'<svg viewBox="0 0 24 24" class="'+c+'" aria-hidden="true">'+IC[k]+'</svg>';
const PORTAL=(window.XVDATA&&XVDATA.company.portal)||'services.html';
if(bot){bot.innerHTML='<svg class="hs" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.7-2 2.5-5 2.5"/></svg>';bot.title='Xevast Assistant';bot.setAttribute('aria-label','Open Xevast Assistant')}
const plus=el('button','');plus.id='dk-plus';plus.type='button';plus.title='Quick Actions Menu';plus.setAttribute('aria-label','Quick actions menu');plus.setAttribute('aria-haspopup','true');plus.setAttribute('aria-expanded','false');
plus.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span class="dk-spark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10 2c.6 5.4 2.6 7.4 8 8-5.4.6-7.4 2.6-8 8-.6-5.4-2.6-7.4-8-8 5.4-.6 7.4-2.6 8-8z"/><path d="M19 14c.3 2.2 1 2.9 3.2 3.2-2.2.3-2.9 1-3.2 3.2-.3-2.2-1-2.9-3.2-3.2 2.2-.3 2.9-1 3.2-3.2z"/></svg></span>';
const items=el('div','dk-items');items.setAttribute('role','menu');items.setAttribute('aria-label','Quick actions');
const A=(k,c,t,h,x)=>{const a=el('a','dk-i');a.href=h;a.setAttribute('role','menuitem');a.innerHTML=ico(k,c)+'<span>'+t+'</span>';if(x){a.target='_blank';a.rel='noopener'}return a};
const BT=(k,c,t)=>{const b=el('button','dk-i');b.type='button';b.setAttribute('role','menuitem');b.innerHTML=ico(k,c)+'<span>'+t+'</span>';return b};
const fb=BT('form','r','Requirement Form'),sh=BT('share','g','Share Website'),inst=BT('dl','g','Install App'),prof=A('dl','y','Company Profile (PDF)','files/Xevast-Company-Profile.pdf');prof.setAttribute('download','Xevast-Company-Profile.pdf');inst.hidden=true;
items.append(A('cart','o','Order Online Portal',PORTAL),A('wa','g','WhatsApp CEO Direct','https://wa.me/'+WA+'?text='+encodeURIComponent('Hi Xevast, I would like to talk to the CEO directly about a project.'),1),A('call','o','Call ('+TEL.replace('+91','+91 ')+')','tel:'+TEL),A('mail','b','Email Contact','mailto:'+MAIL),fb,el('div','dk-sep'),A('cal','y','Book Free Consultation','contact.html'),A('sup','b','Raise Support Ticket','support.html'),prof,inst,sh);
items.querySelector('.dk-sep').setAttribute('role','separator');
dock.append(items,plus);if(bot)dock.appendChild(bot);document.body.appendChild(dock);
const setO=o=>{dock.classList.toggle('open',o);plus.setAttribute('aria-expanded',o)};
plus.onclick=()=>{const o=!dock.classList.contains('open');setO(o);if(o){const p=$('#bot-p');p&&p.classList.remove('open')}};
sh.onclick=()=>{setO(false);const u={title:document.title,url:location.href};if(navigator.share)navigator.share(u).catch(()=>{});else{try{navigator.clipboard.writeText(u.url)}catch(e){}const t=sh.querySelector('span');t.textContent='Link copied';setTimeout(()=>t.textContent='Share Website',2000)}};
items.addEventListener('keydown',e=>{if(e.key!=='ArrowDown'&&e.key!=='ArrowUp')return;e.preventDefault();const l=[...items.querySelectorAll('.dk-i')],i=l.indexOf(document.activeElement);l[(i+(e.key==='ArrowDown'?1:-1)+l.length)%l.length].focus()});
plus.addEventListener('keydown',e=>{if(e.key==='ArrowUp'&&dock.classList.contains('open')){e.preventDefault();const l=items.querySelectorAll('.dk-i');l[l.length-1].focus()}});
let ip=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ip=e;inst.hidden=false});addEventListener('appinstalled',()=>{inst.hidden=true;ip=null});
inst.onclick=()=>{setO(false);if(!ip)return;ip.prompt();ip.userChoice.then(()=>{ip=null;inst.hidden=true}).catch(()=>{})};
if(bot)bot.addEventListener('click',()=>setO(false),true);
document.addEventListener('click',e=>{if(!dock.contains(e.target))setO(false)});
// ---- form definition
let F=[['1. Basic information',[['bn','Business / Brand name','t',1],['cp','Contact person name','t',1],['ph','Phone / WhatsApp number','tel',1],['em','Email address','email'],['bd','What does your business do? (brief description)','ta']]],
['2. Website purpose',[['wp','Why do you want a website? (showcase business, sell products, get inquiries, build credibility)','ta'],['ew','Do you have an existing website? If yes, share the link','t']]],
['3. Pages & content',[['pg','Which pages do you need?','cb',['Home','About','Services','Products','Gallery','Contact','Blog']],['pgo','Other pages (optional)','t'],['ct','Do you already have content ready (text, images, logo)?','sel',['Yes, everything is ready','Some of it is ready','No, I need help creating it']]]],
['4. Design preferences',[['lg','Do you have a logo and brand colors?','sel',['Yes, both','Logo only','Brand colors only','No, I need help'],'You can send the logo on WhatsApp after submitting.'],['rf','Websites you like the look of (share 1-2 links)','ta'],['st','Preferred style','sel',['Modern','Minimal','Bold','Corporate','Colorful','Other']]]],
['5. Functionality needed',[['fn','Do you need any of these?','cb',['Contact form','Online payment','Product catalog','Booking system','Blog','Login system']],['fno','Other features (optional)','t']]],
['6. Budget & timeline',[['bg','What is your budget range for this project?','sel',['Under ₹10,000','₹10,000 - ₹25,000','₹25,000 - ₹50,000','₹50,000 - ₹1,00,000','Above ₹1,00,000','Not sure yet']],['dl','By when do you need this ready?','t']]],
['7. Additional notes',[['nt','Anything else we should know?','ta']]]];
if(window.XVDATA)F[0][1].unshift(['svc','Service needed','sel',XVDATA.formOptions()]);
const F_BASIC=F[0],F_WEB=F.slice(1,5),F_BOT=F.slice(5);
function compose(sv){const p=window.XVDATA?XVDATA.formProfile(sv):'web',mid=p==='web'?F_WEB:(XVDATA.formSections(p)||F_WEB);let basic=[F_BASIC[0],F_BASIC[1].map(f=>f.slice())];
 if(p==='academy'){basic[1].forEach(f=>{if(f[0]==='bn'){f[1]='College / organisation (optional)';f[3]=0}if(f[0]==='bd')f[1]='Tell us a little about yourself (optional)'})}
 const bot=p==='academy'?F_BOT.slice(1):F_BOT;F=[basic].concat(mid,bot).map((s,i)=>[(i+1)+'. '+s[0].replace(/^\d+\.\s*/,''),s[1]])}
const rq=el('div');rq.id='rq';rq.setAttribute('role','dialog');rq.setAttribute('aria-modal','true');rq.setAttribute('aria-label','Requirement form');
const box=el('div','rqb');rq.appendChild(box);document.body.appendChild(rq);
let MODE='consult';const KEY='xv-rq';let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
try{const q=window.XVDATA&&XVDATA.matchService(new URLSearchParams(location.search).get('service'));if(q)saved.svc=q}catch(e){}
const FILE=(location.pathname.split('/').pop()||'index.html');
function curSvc(){const X=window.XVDATA;if(!X)return '';const v=X.services.find(x=>x.href===FILE);if(v)return v.name;if(/^academy/.test(FILE))return 'Academy Programs';return ''}
function chooser(){box.textContent='';const h=el('div','rqh'),t=el('div');t.append(el('h2','','Project Requirement Form'),el('p','','Choose the service you need. The form will then ask only the questions that matter for that service.'));const x=el('button','rqx','✕');x.type='button';x.setAttribute('aria-label','Close');x.onclick=closeF;h.append(t,x);box.appendChild(h);
 const X=window.XVDATA,wrap=el('div','rqch'),pick=n=>{saved.svc=n;try{localStorage.setItem(KEY,JSON.stringify(saved))}catch(e){}build();rq.scrollTop=0};
 if(X){X.divisions.forEach(d=>{const sv=X.live.filter(s=>s.division===d.slug);if(!sv.length)return;wrap.appendChild(el('h4','',d.name));const g=el('div','g');sv.forEach(s=>{const b=el('button','',s.name);b.type='button';b.onclick=()=>pick(s.name);g.appendChild(b)});wrap.appendChild(g)})}
 const ns=el('button','ns','Not sure yet — I need guidance');ns.type='button';ns.onclick=()=>pick('Not sure yet');wrap.appendChild(ns);box.appendChild(wrap)}
function build(){if(!saved.svc){chooser();return}compose(saved.svc);box.textContent='';const h=el('div','rqh'),t=el('div');t.append(el('h2','',(MODE==='order'?'Online order: ':'')+(saved.svc&&saved.svc!=='Not sure yet'?saved.svc+(MODE==='order'?'':' — requirement form'):'Project Requirement Form')),el('p','',MODE==='order'?'Place your order here. You can track it any time from your client portal.':'Free consultation request. No account needed. Our team will contact you within 24-48 hours.'));const x=el('button','rqx','✕');x.type='button';x.setAttribute('aria-label','Close');x.onclick=closeF;h.append(t,x);box.appendChild(h);
 const swb=el('div','rqsw');swb.append(document.createTextNode('Questions for: '),el('b','',saved.svc));const cb2=el('button','','Change service');cb2.type='button';cb2.onclick=()=>{persist();saved.svc='';try{localStorage.setItem(KEY,JSON.stringify(saved))}catch(e){}build();rq.scrollTop=0};swb.appendChild(cb2);box.appendChild(swb);
 F.forEach(s=>{box.appendChild(el('div','rqs',s[0]));s[1].forEach(f=>{const [id,lab,ty,opt,note]=[f[0],f[1],f[2],f[3],f[4]],req=f[3]===1,w=el('div');const lb=el('label','q',lab);if(req){const i=el('i','',' *');lb.appendChild(i)}lb.htmlFor='rq_'+id;w.appendChild(lb);
  if(ty==='cb'){const g=el('div','rqcb');opt.forEach(o=>{const l=el('label'),c=document.createElement('input');c.type='checkbox';c.value=o;c.dataset.g=id;c.checked=(saved[id]||'').split(', ').includes(o);l.append(c,document.createTextNode(o));g.appendChild(l)});w.appendChild(g)}
  else if(ty==='sel'){const s2=document.createElement('select');s2.id='rq_'+id;s2.appendChild(new Option('Select…',''));opt.forEach(o=>s2.appendChild(new Option(o,o)));s2.value=saved[id]||'';w.appendChild(s2)}
  else if(ty==='ta'){const a=document.createElement('textarea');a.id='rq_'+id;a.value=saved[id]||'';w.appendChild(a)}
  else{const i=document.createElement('input');i.id='rq_'+id;i.type=ty==='t'?'text':ty;i.value=saved[id]||'';if(ty==='tel')i.inputMode='tel';w.appendChild(i)}
  if(note)w.appendChild(el('div','rqn',note));w.appendChild(el('div','rqe')).id='e_'+id;box.appendChild(w)})});
 const sv=document.getElementById('rq_svc');if(sv)sv.onchange=()=>{persist();build()};
 const hp=document.createElement('input');hp.id='rq_hp';hp.tabIndex=-1;hp.autocomplete='off';hp.setAttribute('aria-hidden','true');hp.style.cssText='position:absolute;left:-9999px;opacity:0;height:0';box.appendChild(hp);
 box.appendChild(el('div','rqerr')).id='rq_err';
 const ac=el('div','rqact'),sb=el('button','btn',MODE==='order'?'Place order':'Submit request');sb.type='button';sb.onclick=submit;ac.appendChild(sb);box.append(ac);
 if(MODE==='order'&&window.XVB&&XVB.state.user){const u=XVB.state.user,pf=XVB.state.profile||{};const fill=(id,val)=>{const e=document.getElementById('rq_'+id);if(e){e.value=val||'';e.readOnly=true;e.title='From your account'}};fill('cp',pf.name);fill('ph',pf.phone);fill('em',u.email);const bn=document.getElementById('rq_bn');if(bn&&!bn.value&&pf.company)bn.value=pf.company}}
function vals(){const v={};F.forEach(s=>s[1].forEach(f=>{const id=f[0];if(f[2]==='cb')v[id]=[...box.querySelectorAll('input[data-g="'+id+'"]:checked')].map(c=>c.value).join(', ');else{const e=document.getElementById('rq_'+id);v[id]=e?e.value.trim():''}}));return v}
function persist(){try{saved=Object.assign(saved,vals());localStorage.setItem(KEY,JSON.stringify(saved))}catch(e){}}
box.addEventListener('input',persist);box.addEventListener('change',persist);
const merge=(a,b)=>[a,b].filter(Boolean).join(', ');
function sections(v){return F.map(s=>[s[0],s[1].filter(f=>!['pgo','fno'].includes(f[0])).map(f=>{let a=v[f[0]];if(f[0]==='pg')a=merge(v.pg,v.pgo);if(f[0]==='fn')a=merge(v.fn,v.fno);return[f[1].replace(/\s*\(.*?\)/,''),a]})])}
function loadJS(u){return new Promise((r,j)=>{if(document.querySelector('script[src="'+u+'"]'))return r();const s=document.createElement('script');s.src=u;s.onload=r;s.onerror=j;document.head.appendChild(s)})}
async function pdf(v){await loadJS('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');const p=new window.jspdf.jsPDF({unit:'pt',format:'a4'}),W=595,M=44,L=s=>String(s==null?'':s).replace(/₹/g,'Rs. ').replace(/[—–]/g,'-').replace(/[^\u0000-\u00ff]/g,'?');
 p.setFillColor(225,6,0);p.rect(0,0,W,84,'F');p.setTextColor(255,255,255);p.setFont('helvetica','bold');p.setFontSize(26);p.text('XEVAST',M,46);p.setFont('helvetica','normal');p.setFontSize(10);p.text('Technology - Innovation - Excellence',M,64);
 p.setTextColor(20,20,28);p.setFont('helvetica','bold');p.setFontSize(17);p.text(L(v.svc&&v.svc!=='Not sure yet'?v.svc+' - Requirement Form':'Project Requirement Form'),M,118);p.setFont('helvetica','normal');p.setFontSize(9);p.setTextColor(110,110,120);p.text('Submitted: '+new Date().toLocaleString('en-IN'),M,134);let y=160;
 const chk=n=>{if(y+n>790){p.addPage();y=50}};
 sections(v).forEach(s=>{chk(40);p.setFont('helvetica','bold');p.setFontSize(11);p.setTextColor(225,6,0);p.text(L(s[0]).toUpperCase(),M,y);y+=6;p.setDrawColor(225,6,0);p.line(M,y,W-M,y);y+=16;
  s[1].forEach(q=>{const a=p.splitTextToSize(L(q[1])||'-',W-2*M);chk(18+a.length*13);p.setFont('helvetica','bold');p.setFontSize(9);p.setTextColor(110,110,120);p.text(L(q[0]),M,y);y+=13;p.setFont('helvetica','normal');p.setFontSize(11);p.setTextColor(20,20,28);p.text(a,M,y);y+=a.length*14+8});y+=6});
 const n=p.getNumberOfPages();for(let i=1;i<=n;i++){p.setPage(i);p.setFontSize(8);p.setTextColor(130,130,140);p.text('Xevast  |  xevast.official  |  contactxevast@gmail.com',M,820);p.text('Page '+i+' of '+n,W-M-40,820)}
 return p.output('blob')}
function qaList(v){const qa=[];sections(v).forEach(s=>s[1].forEach(q=>{if(q[1])qa.push([q[0],String(q[1])])}));return qa}
function showErr(err){const m=(err&&err.message)||'',box2=document.getElementById('rq_err');if(!box2)return;box2.textContent='';
 const msg={'not-configured':'Online submission is not available right now. Please contact us directly and we will help you straight away.','rate-limit':'You have sent several requests in the last hour. Please wait a little, or contact us directly.','auth-required':'Please sign in to your client portal to place an order.','verify-email':'Please verify your email address in the client portal before placing an order.'}[m]||'We could not submit your request. Please check your connection and try again.';
 box2.appendChild(el('p','',msg));if(m==='not-configured'||m==='rate-limit'){const a=el('div','rqact'),w=el('a','btn btn-ghost','WhatsApp');w.href='https://wa.me/'+WA;w.target='_blank';w.rel='noopener';const c=el('a','btn btn-ghost','Call');c.href='tel:'+TEL;const e2=el('a','btn btn-ghost','Email');e2.href='mailto:'+MAIL;a.append(w,c,e2);box2.appendChild(a)}
 if(m==='auth-required'||m==='verify-email'){const a=el('a','btn','Open client portal');a.href='portal.html';box2.appendChild(a)}box2.scrollIntoView({block:'center',behavior:'smooth'})}
function done(v,res){box.textContent='';const ok=el('div','rqok'),ord=MODE==='order';
 ok.append(el('div','rqok-i','✓'),el('h3','',ord?'Order placed':'Request received'),el('p','',ord?'Thank you, '+v.cp.split(' ')[0]+'. Our team will review your order and contact you. You can follow every step in your client portal.':'Thank you, '+v.cp.split(' ')[0]+'. Our team will contact you on '+v.ph+(v.em?' or '+v.em:'')+' within 24-48 hours.'));
 const r=el('div','rqref');r.append(el('span','','Reference'),el('b','',res.ref));ok.appendChild(r);
 if(res.status==='queued')ok.appendChild(el('p','rqn','Saved on this device. It will be sent automatically as soon as you are back online.'));
 const ac=el('div','rqact');
 if(ord){const t=el('a','btn','Track this order');t.href='portal.html#/order/'+res.ref;t.onclick=ev=>{ev.preventDefault();closeF();setTimeout(()=>{location.href='portal.html#/order/'+res.ref;if(/portal\.html$/.test(location.pathname))location.reload()},250)};ac.appendChild(t)}else{const o=el('a','btn','Place an online order');o.href='portal.html';ac.appendChild(o)}
 const d=el('button','rqg','Download a copy (PDF)');d.type='button';d.onclick=async()=>{d.disabled=true;d.textContent='Preparing…';try{const blob=await pdf(v),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='Xevast-'+res.ref+'.pdf';document.body.appendChild(a);a.click();a.remove();d.textContent='Download again'}catch(x){d.textContent='PDF not available'}d.disabled=false};
 ac.appendChild(d);ok.appendChild(ac);box.appendChild(ok);rq.scrollTop=0}
async function submit(e){const v=vals();let bad=0;const E=(id,m)=>{const n=document.getElementById('e_'+id);if(n)n.textContent=m||'';if(m)bad++};
 ['bn','cp','ph'].filter(id=>F[0][1].some(f=>f[0]===id&&f[3]===1)).forEach(id=>E(id,v[id]?'':'This field is required'));
 if(v.ph&&v.ph.replace(/\D/g,'').length<8)E('ph','Enter a valid phone number');
 E('em',MODE==='order'&&!v.em?'Email is required':(v.em&&!/^\S+@\S+\.\S+$/.test(v.em)?'Enter a valid email':''));
 if(bad){const f=box.querySelector('.rqe:not(:empty)');f&&f.scrollIntoView({block:'center',behavior:'smooth'});return}
 const b=e.target,lab=b.textContent;b.disabled=true;b.textContent='Submitting…';const er=document.getElementById('rq_err');if(er)er.textContent='';
 try{await loadJS('js/xv-backend.js');const hp=(document.getElementById('rq_hp')||{}).value,qa=qaList(v);const res=await(MODE==='order'?XVB.createOrder(v,qa):XVB.submitConsult(v,qa,{hp:hp}));
  try{localStorage.removeItem(KEY)}catch(x){}done(v,res)}catch(err){b.disabled=false;b.textContent=lab;showErr(err)}}
async function openF(sv,opt){setO(false);MODE=(opt&&opt.mode==='order')?'order':'consult';const cs=curSvc();if(typeof sv==='string'&&sv)saved.svc=sv;else if(cs&&saved._pg!==FILE)saved.svc=cs;saved._pg=FILE;if(opt&&opt.plan)saved.ho_p=opt.plan;
 if(MODE==='order'){try{await loadJS('js/xv-backend.js');await new Promise(r=>{XVB.onAuth(()=>r());setTimeout(r,6000)})}catch(e){}if(!window.XVB||!XVB.state.user||!XVB.state.profile){location.href='portal.html?order='+encodeURIComponent(saved.svc||'');return}}
 build();rq.classList.add('open');document.documentElement.style.overflow='hidden';rq.scrollTop=0}
function closeF(){rq.classList.remove('open');document.documentElement.style.overflow=''}
fb.onclick=openF;rq.addEventListener('click',e=>{if(e.target===rq)closeF()});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(rq.classList.contains('open'))closeF();setO(false)}});
if(location.hash==='#requirement')openF();
addEventListener('hashchange',()=>{if(location.hash==='#requirement')openF()});document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href$="#requirement"]');if(a){e.preventDefault();openF()}});
window.xevastOpenForm=openF;
})()}catch(e){}

/* ---- assistant voice greeting ---- */
try{(function(){
const b=document.getElementById('bot-b'),p=document.getElementById('bot-p');if(!b||!p)return;
const h=p.querySelector('#bot-h'),v=document.createElement('button');v.id='bot-v';v.type='button';
let on=true;try{on=localStorage.getItem('xv-voice')!=='0'}catch(e){}
const paint=()=>{v.innerHTML=XV(on?'speaker':'speakerx');v.setAttribute('aria-label',on?'Turn assistant voice off':'Turn assistant voice on');v.title=on?'Voice on':'Voice off'};paint();
v.onclick=()=>{on=!on;try{localStorage.setItem('xv-voice',on?'1':'0')}catch(e){}if(!on&&window.speechSynthesis)speechSynthesis.cancel();paint()};
if(h)h.appendChild(v);
b.addEventListener('click',()=>{if(!p.classList.contains('open')||!on||!window.speechSynthesis)return;
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance('Welcome to Zee vast');u.lang='en-IN';u.rate=.95;
  const vs=speechSynthesis.getVoices(),pick=vs.find(x=>/en[-_]IN/i.test(x.lang))||vs.find(x=>/^en/i.test(x.lang));if(pick)u.voice=pick;speechSynthesis.speak(u)}catch(e){}});
})()}catch(e){}

/* ---- hero billboard: one slide per division, plays by itself and never waits on hover/touch ---- */
try{(function(){
const bb=document.getElementById('bb');if(!bb)return;
const IMG=/\.(jpe?g|png|webp|gif|avif)$/i,fp=f=>/^https?:|\//.test(f)?f:'ads/images/'+f,pad=n=>String(n).padStart(2,'0');
const mine=(window.XEVAST_ADS_FILES||[]).map(x=>typeof x==='string'?{file:x}:x).filter(x=>x&&x.file&&IMG.test(x.file)).map(x=>Object.assign({},x,{type:'image',src:fp(x.file)}));
const base=(window.XEVAST_ADS||[]),pics=base.filter(a=>a.type==='image'),intro=base.filter(a=>a.type==='brand').slice(0,1),D=window.XVDATA;
const auto=[];if(D&&window.XEVAST_ADS_SERVICES!==false)D.divisions.forEach((d,i)=>{const subs=d.slug==='academy'?(D.tracks||[]):D.live.filter(v=>v.division===d.slug&&v.href!==d.href&&v.name!==d.name),num=pad(i+1);
 auto.push({type:'brand',n:num,g:i,kicker:'Division '+num+' of '+pad(D.divisions.length),title:d.name,text:d.desc||'',list:subs.map(v=>v.name),cta:'Explore '+d.name,href:d.href,ms:6000});
 subs.forEach((v,k)=>auto.push({type:'brand',n:num,g:i,sub:1,kicker:d.name+' · '+(k+1)+' of '+subs.length,title:v.name,text:(v.short||'')+(v.level?' '+v.level+' · '+v.dur+' (planned).':''),cta:'Learn more',href:v.href}))});
const cfg=mine.concat(pics).concat(window.XEVAST_ADS_BRAND===false&&(mine.length||pics.length)?[]:intro.concat(auto)),st=document.getElementById('bbs'),dots=document.getElementById('bbd'),R=document.documentElement;
if(!cfg.length||!st||!dots){bb.style.display='none';return}
const slow=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||R.dataset.rm==='on';
const dur=i=>cfg[i].ms||(slow()?7500:5000);
const els=[];
cfg.forEach((a,i)=>{const s=document.createElement(a.href?'a':'div');s.className='bb-s '+a.type+(a.sub?' sub':'')+(a.list?' dv':'');if(a.n)s.dataset.n=a.n;if(a.href){s.href=a.href;if(/^https?:/.test(a.href)){s.target='_blank';s.rel='noopener'}}
 if(a.type==='image'){const im=new Image();im.src=a.src;im.alt=a.alt||'Xevast';im.loading=i?'lazy':'eager';im.decoding='async';s.appendChild(im)}
 else{const k=document.createElement('span');k.className='bb-k';k.textContent=a.kicker||'';const t=document.createElement('b');t.textContent=a.title||'';const p=document.createElement('p');p.textContent=a.text||'';s.append(k,t,p);if(a.list&&a.list.length){const l=document.createElement('div');l.className='bb-l';a.list.slice(0,5).forEach(x=>{const c=document.createElement('span');c.textContent=x;l.appendChild(c)});if(a.list.length>5){const c=document.createElement('span');c.textContent='+'+(a.list.length-5)+' more';l.appendChild(c)}s.appendChild(l)}if(a.cta){const c=document.createElement('em');c.textContent=a.cta+' →';s.appendChild(c)}}
 st.appendChild(s);els.push(s)});
dots.textContent='';
const pr=document.createElement('i');pr.className='bb-p';const nm=document.createElement('span');nm.className='bb-nm';const ct=document.createElement('span');ct.className='bb-c';
const rt=document.createElement('span');rt.className='bb-r';const pp=document.createElement('button');pp.type='button';pp.className='bb-pp';
const ICP='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z"/></svg>',ICL='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z"/></svg>';
rt.append(ct,pp);dots.append(nm,rt,pr);
const tabs=[];if(D&&cfg.some(c=>c.g!=null)){const tb=document.createElement('div');tb.className='bb-tabs';tb.setAttribute('aria-label','Jump to a division');D.divisions.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.innerHTML='<b>'+pad(i+1)+'</b><span>'+d.name.replace(/ &.*$/,'').replace(/ IT$/,'')+'</span>';b.title=d.name;b.onclick=()=>show(cfg.findIndex(c=>c.g===i));tb.appendChild(b);tabs.push(b)});dots.parentNode.insertBefore(tb,dots)}
let cur=0,spent=0,last=performance.now(),paused=false,inView=true;
function paint(){pp.innerHTML=paused?ICL:ICP;pp.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');pp.title=paused?'Play':'Pause'}
function show(n){cur=(n+els.length)%els.length;els.forEach((e,i)=>{e.classList.toggle('on',i===cur);e.setAttribute('aria-hidden',i===cur?'false':'true')});const a=cfg[cur];nm.textContent=a.title||a.alt||'';ct.innerHTML='<b>'+pad(cur+1)+'</b> / '+pad(els.length);tabs.forEach((t,i)=>t.classList.toggle('on',i===a.g));spent=0;pr.style.width='0'}
/* one steady ticker: it only counts time while the slide is on screen, so nothing can leave it stuck */
setInterval(function(){const now=performance.now(),dt=Math.min(now-last,400);last=now;if(els.length<2||paused||!inView||document.hidden)return;spent+=dt;pr.style.width=Math.min(100,spent/dur(cur)*100)+'%';if(spent>=dur(cur))show(cur+1)},100);
pp.onclick=()=>{paused=!paused;paint()};
document.getElementById('bbp').onclick=()=>show(cur-1);document.getElementById('bbx').onclick=()=>show(cur+1);
let x0=null;bb.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});bb.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1));x0=null},{passive:true});
bb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
if('IntersectionObserver' in window)new IntersectionObserver(e=>{inView=e[e.length-1].isIntersecting}).observe(bb);
paint();show(0);
})()}catch(e){}

/* ---- home: service finder ---- */
try{(function(){
const out=document.getElementById('finderOut'),X=window.XVDATA;if(!out||!X)return;
const btns=[...document.querySelectorAll('.fnd-btns button')];
const why={'web-development':'A professional website or store, built for every screen and ready for search engines.','mobile-apps':'An Android, iOS or cross-platform app, with help to publish it.','seo-marketing':'Technical SEO, content, local SEO and ads to bring the right visitors.','cybersecurity':'Authorised testing and hardening to find weak spots before attackers do.','forensics-ir':'Investigation and incident response. Avoid deleting anything until we speak.','ai-solutions':'Chatbots and workflow automation that take repetitive work off your team.','wams':'Monitoring, backups, security patches and updates after your site or app goes live.','cloud-devops':'Cloud setup, CI/CD pipelines and containers for faster, safer releases.','system-design':'Architecture, database and API design, documented before any code is written.','academy-programs':'Project-based tracks, internships and workshops. Dates and fees are announced soon.'};
btns.forEach(b=>b.onclick=()=>{const v=X.live.find(x=>x.slug===b.dataset.s);if(!v)return;btns.forEach(x=>x.classList.toggle('on',x===b));
 out.textContent='';const k=document.createElement('span');k.className='fk';k.textContent='Recommended service';const h=document.createElement('h3');h.textContent=v.name;const p=document.createElement('p');p.textContent=why[v.slug]||v.short||'';
 const a=document.createElement('div');a.className='acts';const l=document.createElement('a');l.className='btn btn-ghost';l.href=v.href;l.textContent='View service';const f=document.createElement('button');f.type='button';f.className='btn';f.textContent='Fill the '+v.name+' form';f.onclick=()=>window.xevastOpenForm&&window.xevastOpenForm(v.name);a.append(f,l);out.append(k,h,p,a)});
})()}catch(e){}

/* ---- Android Back button / browser Back closes the open panel instead of leaving the page ---- */
try{(function(){
const SEL='#drw,#cmd,#rq,#bot-p,.lb',stack=[],st=new WeakMap();let skip=0;
const closeEl=t=>{if(t.id==='drw'){const x=document.getElementById('dx');x?x.click():t.classList.remove('open')}else if(t.id==='rq'){const x=t.querySelector('.rqx');x?x.click():t.classList.remove('open');document.documentElement.style.overflow=''}else{t.classList.remove('open');if(t.classList.contains('lb'))document.documentElement.style.overflow=''}};
new MutationObserver(ms=>{const fin=new Map();ms.forEach(m=>{const t=m.target;if(t.matches&&t.matches(SEL))fin.set(t,t.classList.contains('open'))});
 let opened=0,closed=0;fin.forEach((o,t)=>{if(o===!!st.get(t))return;st.set(t,o);if(o){stack.push(t);opened++}else{const i=stack.lastIndexOf(t);if(i>-1){stack.splice(i,1);closed++}}});
 const d=opened-closed;if(d>0){for(let i=0;i<d;i++)history.pushState({xvOv:1},'')}else if(d<0){setTimeout(()=>{if(history.state&&history.state.xvOv){skip++;history.go(d)}},80)}
}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['class']});
addEventListener('popstate',()=>{if(skip>0){skip--;return}const t=stack.pop();if(!t)return;st.set(t,false);closeEl(t)});
})()}catch(e){}
/* ---- safety net: reveal anything already scrolled past (fast scrolling) ---- */
try{let t;const fix=()=>document.querySelectorAll('.reveal:not(.visible)').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add('visible')});
addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(fix,120)},{passive:true});addEventListener('load',fix);setTimeout(fix,700)}catch(e){}
