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
try{document.getElementById('cform').addEventListener('submit',e=>{
 e.preventDefault();
 const v=id=>document.getElementById(id).value;
 const msg=`Hi Xevast, I'm ${v('fname')||'a new client'}. Service: ${v('fsvc')}. Budget: ${v('fbudget')}. Details: ${v('fmsg')}`;
 open('https://wa.me/918340161172?text='+encodeURIComponent(msg),'_blank');
});
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
const KB=[[/\b(price|pricing|cost|budget|rate|quote|kitna)\b/,'Starting prices are on the Pricing page, and the estimator gives an indicative range. Final quotes follow a free consultation.','pricing.html','Open pricing'],
[/\b(security|secure|cyber|hack|hacking|vapt|forensics|compliance)\b/,'Our Security division covers cybersecurity, network security, compliance, a research lab and incident response.','security.html','Security services'],
[/\b(cloud|devops|hosting|managed|it support)\b/,'We handle cloud, DevOps and managed IT support.','cloud.html','Cloud & IT'],
[/\b(ai|chatbot|automation)\b/,'We build chatbots, automation and custom AI tools.','ai.html','AI solutions'],
[/\b(academy|course|courses|internship|learn|training)\b/,'Xevast Academy offers courses, internships, workshops and awareness training.','academy.html','Academy'],
[/\b(web|website|app|apps|design|seo|data)\b/,'Our Web & Software division covers websites, mobile apps, UI/UX, system design, data and SEO.','web.html','Web & Software'],
[/\b(contact|call|whatsapp|email|reach|talk)\b/,'Message us on WhatsApp or email contactxevast@gmail.com, or use the contact form.','contact.html','Contact page'],
[/\b(founder|anshu|who)\b/,'Xevast was founded by Anshu Kumar, who speaks with clients directly.','about.html','About us'],
[/\b(hi|hello|hey|namaste)\b/,'Hello! Ask me about services, pricing, the Academy or how to contact us.']];
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e};
const b=el('button','','🤖');b.id='bot-b';b.setAttribute('aria-label','Chat with Xevast assistant');
const p=el('div');p.id='bot-p';p.innerHTML='<div id="bot-h">Xevast assistant</div><div id="bot-m"></div><div id="bot-c"></div><form id="bot-f"><input placeholder="Ask about services, pricing..." aria-label="Message"><button>Send</button></form>';
document.body.append(b,p);const m=p.querySelector('#bot-m'),ip=p.querySelector('input');
function say(t,u,h,l){const d=el('div','bm'+(u?' u':''),t);if(h){const a=el('a','',l||'Open');a.href=h;d.appendChild(a)}m.appendChild(d);m.scrollTop=m.scrollHeight}
function ask(q){say(q,1);const t=q.toLowerCase(),k=KB.find(x=>x[0].test(t));
 if(k)say(k[1],0,k[2],k[3]);else say('I am a simple assistant and may not know this. The team can answer on WhatsApp.',0,'https://wa.me/918340161172','Chat on WhatsApp')}
['Services','Pricing','Academy','Contact'].forEach(x=>{const c=el('button','',x);c.type='button';c.onclick=()=>ask(x);p.querySelector('#bot-c').appendChild(c)});
b.onclick=()=>{p.classList.toggle('open');if(!m.children.length)say('Welcome to Xevast! I can point you to the right page. What do you need?')};
p.querySelector('#bot-f').onsubmit=e=>{e.preventDefault();if(ip.value.trim()){ask(ip.value.trim());ip.value=''}};
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
const PG=[['index.html','Home'],['services.html','Services'],['web.html','Web &amp; Software',1],['cloud.html','Cloud &amp; IT',1],['security.html','Security',1],['ai.html','AI Solutions',1],['academy.html','Academy',1],['work.html','Work'],['pricing.html','Pricing'],['about.html','About'],['blog.html','Blog'],['contact.html','Contact']];
const d=document.createElement('aside'),scr=document.createElement('div');d.id='drw';scr.id='scr';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Menu and settings');
const sw=(k,t)=>'<div class="row"><span>'+t+'</span><button type="button" class="sw" role="switch" data-k="'+k+'" aria-label="'+t+'"></button></div>';
d.innerHTML='<div class="dh"><b>Menu &amp; Settings</b><button id="dx" type="button" aria-label="Close menu">✕</button></div>'
+'<button class="dsr" id="dsr" type="button">Search the site <kbd>Ctrl K</kbd></button>'
+'<div class="dl">'+PG.map(p=>L(p[0],p[1],p[2]?'sub':'')).join('')+'</div>'
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
d.addEventListener('click',e=>{const t=e.target;if(t.dataset.m){S.mode=t.dataset.m;apply()}if(t.dataset.f){S.fs=+t.dataset.f;apply()}if(t.classList.contains('sw')){S[t.dataset.k]=S[t.dataset.k]?0:1;apply();if(t.dataset.k==='fx')dispatchEvent(new Event('xv-fx'))}});
$('#rst').onclick=()=>{S=Object.assign({},DEF);apply();dispatchEvent(new Event('xv-fx'))};
const tb=$('#theme');if(tb)tb.onclick=()=>{S.mode=R.getAttribute('data-theme')==='light'?'dark':'light';apply()};
mq.addEventListener&&mq.addEventListener('change',()=>{if(S.mode==='auto')apply()});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
$('#inst').onclick=()=>{if(dp){dp.prompt();dp=null}else $('#ihint').textContent='iPhone: Share → Add to Home Screen. Android/Chrome: browser menu → Install app.'};
$('#shr').onclick=()=>{const u={title:document.title,url:location.href};if(navigator.share)navigator.share(u).catch(()=>{});else{navigator.clipboard&&navigator.clipboard.writeText(u.url);$('#shr').textContent='✓ Link copied'}};
// search palette
const IT=[['Home','index.html','start'],['Services','services.html','all services'],['Web & Software','web.html','website app ui ux design seo data analytics'],['Cloud & IT','cloud.html','cloud devops hosting managed it support'],['Security','security.html','cybersecurity vapt network compliance forensics'],['AI Solutions','ai.html','ai chatbot automation'],['Xevast Academy','academy.html','courses internship training learn'],['Work','work.html','projects portfolio testimonials'],['Pricing','pricing.html','price cost plans estimate calculator faq'],['About','about.html','founder anshu'],['Blog','blog.html','articles insights'],['Website security basics','blog-website-security-basics.html','article'],['Plan a website budget','blog-plan-website-budget.html','article'],['What is VAPT?','blog-what-is-vapt.html','article'],['Web & Software — service','web-development.html','service development'],['Mobile Apps — service','mobile-apps.html','service development'],['UI/UX Design — service','ui-ux-design.html','service design'],['System Design — service','system-design.html','service development'],['Data & Analytics — service','data-analytics.html','service data'],['SEO & Marketing — service','seo-marketing.html','service marketing'],['Cloud & DevOps — service','cloud-devops.html','service cloud'],['Managed IT — service','managed-it.html','service support'],['Cybersecurity — service','cybersecurity.html','service security'],['Network Security — service','network-security.html','service security'],['Compliance & GRC — service','compliance-grc.html','service security'],['Security Research Lab — service','security-research-lab.html','service security'],['Forensics & IR — service','forensics-ir.html','service security'],['AI Solutions — service','ai-solutions.html','service ai'],['Contact','contact.html','quote whatsapp email call'],['Privacy policy','privacy.html','data']];
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
if(bot){bot.innerHTML='<span>'+XV('bot')+'</span>';bot.title='Xevast Assistant';bot.setAttribute('aria-label','Open Xevast Assistant');dock.appendChild(bot)}
const plus=el('button','','+');plus.id='dk-plus';plus.type='button';plus.setAttribute('aria-label','Quick actions');plus.setAttribute('aria-expanded','false');dock.appendChild(plus);
const items=el('div','dk-items');
const A=(c,h,t,x)=>{const a=el('a','dk-i '+c);a.href=h;a.innerHTML=t;if(x){a.target='_blank';a.rel='noopener'}return a};
const fb=el('button','dk-i');fb.innerHTML=XV('doc')+' Requirement form';fb.type='button';
items.append(A('wa','https://wa.me/'+WA+'?text='+encodeURIComponent('Hi Xevast, I would like to discuss a project.'),XV('chat')+' WhatsApp',1),A('','tel:'+TEL,XV('phone')+' Call us'),A('','mailto:'+MAIL,XV('mail')+' Email'),fb);
dock.appendChild(items);document.body.appendChild(dock);
const setO=o=>{dock.classList.toggle('open',o);plus.setAttribute('aria-expanded',o)};
plus.onclick=()=>{const o=!dock.classList.contains('open');setO(o);if(o){const p=$('#bot-p');p&&p.classList.remove('open')}};
if(bot)bot.addEventListener('click',()=>setO(false),true);
document.addEventListener('click',e=>{if(!dock.contains(e.target))setO(false)});
// ---- form definition
const F=[['1. Basic information',[['bn','Business / Brand name','t',1],['cp','Contact person name','t',1],['ph','Phone / WhatsApp number','tel',1],['em','Email address','email'],['bd','What does your business do? (brief description)','ta']]],
['2. Website purpose',[['wp','Why do you want a website? (showcase business, sell products, get inquiries, build credibility)','ta'],['ew','Do you have an existing website? If yes, share the link','t']]],
['3. Pages & content',[['pg','Which pages do you need?','cb',['Home','About','Services','Products','Gallery','Contact','Blog']],['pgo','Other pages (optional)','t'],['ct','Do you already have content ready (text, images, logo)?','sel',['Yes, everything is ready','Some of it is ready','No, I need help creating it']]]],
['4. Design preferences',[['lg','Do you have a logo and brand colors?','sel',['Yes, both','Logo only','Brand colors only','No, I need help'],'You can send the logo on WhatsApp after submitting.'],['rf','Websites you like the look of (share 1-2 links)','ta'],['st','Preferred style','sel',['Modern','Minimal','Bold','Corporate','Colorful','Other']]]],
['5. Functionality needed',[['fn','Do you need any of these?','cb',['Contact form','Online payment','Product catalog','Booking system','Blog','Login system']],['fno','Other features (optional)','t']]],
['6. Budget & timeline',[['bg','What is your budget range for this project?','sel',['Under ₹10,000','₹10,000 - ₹25,000','₹25,000 - ₹50,000','₹50,000 - ₹1,00,000','Above ₹1,00,000','Not sure yet']],['dl','By when do you need the website ready?','t']]],
['7. Additional notes',[['nt','Anything else we should know?','ta']]]];
const rq=el('div');rq.id='rq';rq.setAttribute('role','dialog');rq.setAttribute('aria-modal','true');rq.setAttribute('aria-label','Website requirement form');
const box=el('div','rqb');rq.appendChild(box);document.body.appendChild(rq);
const KEY='xv-rq';let saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
function build(){box.textContent='';const h=el('div','rqh'),t=el('div');t.append(el('h2','','Website Requirement Form'),el('p','','Tell us about your project. We will review it and get back to you within 24-48 hours.'));const x=el('button','rqx','✕');x.type='button';x.setAttribute('aria-label','Close');x.onclick=closeF;h.append(t,x);box.appendChild(h);
 F.forEach(s=>{box.appendChild(el('div','rqs',s[0]));s[1].forEach(f=>{const [id,lab,ty,opt,note]=[f[0],f[1],f[2],f[3],f[4]],req=f[3]===1,w=el('div');const lb=el('label','q',lab);if(req){const i=el('i','',' *');lb.appendChild(i)}lb.htmlFor='rq_'+id;w.appendChild(lb);
  if(ty==='cb'){const g=el('div','rqcb');opt.forEach(o=>{const l=el('label'),c=document.createElement('input');c.type='checkbox';c.value=o;c.dataset.g=id;c.checked=(saved[id]||'').split(', ').includes(o);l.append(c,document.createTextNode(o));g.appendChild(l)});w.appendChild(g)}
  else if(ty==='sel'){const s2=document.createElement('select');s2.id='rq_'+id;s2.appendChild(new Option('Select…',''));opt.forEach(o=>s2.appendChild(new Option(o,o)));s2.value=saved[id]||'';w.appendChild(s2)}
  else if(ty==='ta'){const a=document.createElement('textarea');a.id='rq_'+id;a.value=saved[id]||'';w.appendChild(a)}
  else{const i=document.createElement('input');i.id='rq_'+id;i.type=ty==='t'?'text':ty;i.value=saved[id]||'';if(ty==='tel')i.inputMode='tel';w.appendChild(i)}
  if(note)w.appendChild(el('div','rqn',note));w.appendChild(el('div','rqe')).id='e_'+id;box.appendChild(w)})});
 const ac=el('div','rqact'),sb=el('button','btn','Submit & create PDF');sb.type='button';sb.onclick=submit;ac.appendChild(sb);box.append(ac)}
function vals(){const v={};F.forEach(s=>s[1].forEach(f=>{const id=f[0];if(f[2]==='cb')v[id]=[...box.querySelectorAll('input[data-g="'+id+'"]:checked')].map(c=>c.value).join(', ');else{const e=document.getElementById('rq_'+id);v[id]=e?e.value.trim():''}}));return v}
box.addEventListener('input',()=>{try{localStorage.setItem(KEY,JSON.stringify(vals()))}catch(e){}});box.addEventListener('change',()=>{try{localStorage.setItem(KEY,JSON.stringify(vals()))}catch(e){}});
const merge=(a,b)=>[a,b].filter(Boolean).join(', ');
function sections(v){return F.map(s=>[s[0],s[1].filter(f=>!['pgo','fno'].includes(f[0])).map(f=>{let a=v[f[0]];if(f[0]==='pg')a=merge(v.pg,v.pgo);if(f[0]==='fn')a=merge(v.fn,v.fno);return[f[1].replace(/\s*\(.*?\)/,''),a]})])}
function loadJS(u){return new Promise((r,j)=>{if(document.querySelector('script[src="'+u+'"]'))return r();const s=document.createElement('script');s.src=u;s.onload=r;s.onerror=j;document.head.appendChild(s)})}
async function pdf(v){await loadJS('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');const p=new window.jspdf.jsPDF({unit:'pt',format:'a4'}),W=595,M=44,L=s=>String(s==null?'':s).replace(/₹/g,'Rs. ').replace(/[^\u0000-\u00ff]/g,'?');
 p.setFillColor(225,6,0);p.rect(0,0,W,84,'F');p.setTextColor(255,255,255);p.setFont('helvetica','bold');p.setFontSize(26);p.text('XEVAST',M,46);p.setFont('helvetica','normal');p.setFontSize(10);p.text('Technology - Innovation - Excellence',M,64);
 p.setTextColor(20,20,28);p.setFont('helvetica','bold');p.setFontSize(17);p.text('Website Requirement Form',M,118);p.setFont('helvetica','normal');p.setFontSize(9);p.setTextColor(110,110,120);p.text('Submitted: '+new Date().toLocaleString('en-IN'),M,134);let y=160;
 const chk=n=>{if(y+n>790){p.addPage();y=50}};
 sections(v).forEach(s=>{chk(40);p.setFont('helvetica','bold');p.setFontSize(11);p.setTextColor(225,6,0);p.text(L(s[0]).toUpperCase(),M,y);y+=6;p.setDrawColor(225,6,0);p.line(M,y,W-M,y);y+=16;
  s[1].forEach(q=>{const a=p.splitTextToSize(L(q[1])||'-',W-2*M);chk(18+a.length*13);p.setFont('helvetica','bold');p.setFontSize(9);p.setTextColor(110,110,120);p.text(L(q[0]),M,y);y+=13;p.setFont('helvetica','normal');p.setFontSize(11);p.setTextColor(20,20,28);p.text(a,M,y);y+=a.length*14+8});y+=6});
 const n=p.getNumberOfPages();for(let i=1;i<=n;i++){p.setPage(i);p.setFontSize(8);p.setTextColor(130,130,140);p.text('Xevast  |  xevast.official  |  contactxevast@gmail.com',M,820);p.text('Page '+i+' of '+n,W-M-40,820)}
 return p.output('blob')}
function wtext(v){let t='Hi Xevast, I have filled the website requirement form.\n\n';sections(v).forEach(s=>s[1].forEach(q=>{if(q[1])t+=q[0]+': '+q[1]+'\n'}));t+='\n(PDF copy attached)';return t.length>1500?t.slice(0,1480)+'…\n(Full details in the PDF)':t}
async function saveFB(v){try{await loadJS('js/firebase-config.js');const C=window.XEVAST_FIREBASE;if(!C||String(C.apiKey).startsWith('PASTE'))return;await loadJS('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');await loadJS('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js');if(!firebase.apps.length)firebase.initializeApp(C);await firebase.firestore().collection('requirements').add(Object.assign({},v,{at:firebase.firestore.FieldValue.serverTimestamp()}))}catch(e){}}
async function submit(e){const v=vals();let bad=0;const E=(id,m)=>{document.getElementById('e_'+id).textContent=m||'';if(m)bad++};
 ['bn','cp','ph'].forEach(id=>E(id,v[id]?'':'This field is required'));
 if(v.ph&&v.ph.replace(/\D/g,'').length<8)E('ph','Enter a valid phone number');E('em',v.em&&!/^\S+@\S+\.\S+$/.test(v.em)?'Enter a valid email':'');
 if(bad){const f=box.querySelector('.rqe:not(:empty)');f&&f.scrollIntoView({block:'center',behavior:'smooth'});return}
 const b=e.target;b.disabled=true;b.textContent='Creating PDF…';
 let blob;try{blob=await pdf(v)}catch(x){b.disabled=false;b.textContent='Submit & create PDF';alert('Could not create the PDF. Please check your internet connection and try again.');return}
 saveFB(v);try{localStorage.removeItem(KEY)}catch(x){}
 const name='Xevast-Requirement-'+(v.bn||'form').replace(/[^\w]+/g,'-').slice(0,30)+'.pdf',file=new File([blob],name,{type:'application/pdf'}),url=URL.createObjectURL(blob);
 const dl=()=>{const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove()};
 box.textContent='';const ok=el('div','rqok');ok.append(el('div','rqok-i','✓'),el('h3','','Thank you, '+v.cp.split(' ')[0]+'!'),el('p','','Your requirement PDF is ready. Send it to us on WhatsApp so our team can start reviewing it (reply within 24-48 hours).'));
 const ac=el('div','rqact'),w=el('a','btn','Send on WhatsApp');w.href='https://wa.me/'+WA+'?text='+encodeURIComponent(wtext(v));w.target='_blank';w.rel='noopener';w.addEventListener('click',dl);
 const d=el('button','rqg','Download PDF');d.type='button';d.onclick=dl;ac.append(w,d);
 if(navigator.canShare&&navigator.canShare({files:[file]})){const s=el('button','rqg','Share PDF');s.type='button';s.onclick=()=>navigator.share({files:[file],title:'Xevast requirement form',text:'Website requirement form for Xevast'}).catch(()=>{});ac.appendChild(s)}
 ok.append(ac,el('p','rqn','Tip: when WhatsApp opens, tap the attach (paperclip) button and choose the downloaded PDF.'));box.appendChild(ok)}
function openF(){setO(false);build();rq.classList.add('open');document.documentElement.style.overflow='hidden';rq.scrollTop=0}
function closeF(){rq.classList.remove('open');document.documentElement.style.overflow=''}
fb.onclick=openF;rq.addEventListener('click',e=>{if(e.target===rq)closeF()});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(rq.classList.contains('open'))closeF();setO(false)}});
if(location.hash==='#requirement')openF();
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

/* ---- hero billboard (photos + muted videos, no controls, no timer) ---- */
try{(function(){
const bb=document.getElementById('bb');if(!bb)return;
const VID=/\.(mp4|webm|mov|m4v|ogv)$/i,IMG=/\.(jpe?g|png|webp|gif|avif|svg)$/i,fp=(f,t)=>/^https?:|\//.test(f)?f:'ads/'+(t==='video'?'videos/':'images/')+f;
const mine=(window.XEVAST_ADS_FILES||[]).map(x=>typeof x==='string'?{file:x}:x).filter(x=>x&&x.file).map(x=>{const t=VID.test(x.file)?'video':IMG.test(x.file)?'image':null;return t&&Object.assign({},x,{type:t,src:fp(x.file,t),poster:x.poster?fp(x.poster,'image'):undefined})}).filter(Boolean);
const base=window.XEVAST_ADS||[],cfg=mine.concat(window.XEVAST_ADS_BRAND===false&&mine.length?[]:base),st=document.getElementById('bbs'),dots=document.getElementById('bbd'),R=document.documentElement;
const calm=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||R.dataset.fx==='off'||R.dataset.rm==='on';
let cur=0,tm,vis=true,els=[];
if(!cfg.length){bb.style.display='none';return}
cfg.forEach((a,i)=>{const s=document.createElement(a.href?'a':'div');s.className='bb-s '+a.type;if(a.href){s.href=a.href;if(/^https?:/.test(a.href)){s.target='_blank';s.rel='noopener'}}
 if(a.type==='image'){const im=new Image();im.src=a.src;im.alt=a.alt||'Xevast';im.loading=i?'lazy':'eager';im.decoding='async';s.appendChild(im)}
 else if(a.type==='video'){const v=document.createElement('video');v.src=a.src;if(a.poster)v.poster=a.poster;v.muted=true;v.defaultMuted=true;v.playsInline=true;v.preload=i?'none':'metadata';v.controls=false;v.removeAttribute('controls');v.disablePictureInPicture=true;v.setAttribute('controlsList','nodownload noplaybackrate nofullscreen');v.setAttribute('aria-label',a.alt||'Xevast video');v.tabIndex=-1;v.loop=cfg.length===1;v.addEventListener('ended',()=>go(cur+1));s.appendChild(v)}
 else{const k=document.createElement('span');k.className='bb-k';k.textContent=a.kicker||'';const t=document.createElement('b');t.textContent=a.title||'';const p=document.createElement('p');p.textContent=a.text||'';s.append(k,t,p);if(a.cta){const c=document.createElement('em');c.textContent=a.cta+' →';s.appendChild(c)}}
 st.appendChild(s);els.push(s);const d=document.createElement('button');d.type='button';d.setAttribute('aria-label','Go to slide '+(i+1));d.onclick=()=>go(i);dots.appendChild(d)});
function arm(){clearTimeout(tm);if(els.length<2||calm()||!vis)return;const a=cfg[cur];tm=setTimeout(()=>go(cur+1),a.type==='video'?(a.max||45000):(a.ms||5500))}
function go(n){cur=(n+els.length)%els.length;els.forEach((e,i)=>{e.classList.toggle('on',i===cur);const v=e.querySelector('video');if(v){if(i===cur&&vis){v.currentTime=0;if(!calm())v.play().catch(()=>{})}else v.pause()}});[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===cur));arm()}
document.getElementById('bbp').onclick=()=>go(cur-1);document.getElementById('bbx').onclick=()=>go(cur+1);
bb.addEventListener('mouseenter',()=>clearTimeout(tm));bb.addEventListener('mouseleave',arm);
let x0=null;bb.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});bb.addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1));x0=null});
bb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(cur-1);if(e.key==='ArrowRight')go(cur+1)});
const pv=()=>{vis=!document.hidden&&bb._in!==false;go(cur)};document.addEventListener('visibilitychange',pv);
new IntersectionObserver(e=>{bb._in=e[0].isIntersecting;pv()}).observe(bb);addEventListener('xv-fx',()=>go(cur));go(0);
})()}catch(e){}
/* ---- safety net: reveal anything already scrolled past (fast scrolling) ---- */
try{let t;const fix=()=>document.querySelectorAll('.reveal:not(.visible)').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add('visible')});
addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(fix,120)},{passive:true});addEventListener('load',fix);setTimeout(fix,700)}catch(e){}
