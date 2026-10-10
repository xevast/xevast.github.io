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
 `<div class="svc-card reveal d${i%4}" data-cat="${s[1]}"><div class="svc-ic">${s[0]}</div><span class="svc-cat">${s[1]}</span><h3>${s[2]}</h3><p>${s[3]}</p></div>`).join('');
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
if(fine&&!calm)document.querySelectorAll('.svc-card,.price-card,.work-card,.why-card,.g-card').forEach(el=>{
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
const host=document.querySelector('.hero-logo-wrap');if(!window.THREE||!host)return;
const cv=document.createElement('canvas');cv.id='h3d';host.prepend(cv);
const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.75));
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,50);cam.position.z=9.5;
const red=0xE10600,g=new THREE.Group();sc.add(g);
const ico=new THREE.Mesh(new THREE.IcosahedronGeometry(2.3,1),new THREE.MeshBasicMaterial({color:red,wireframe:true,transparent:true,opacity:.35}));g.add(ico);
const mk=(r,rx,ry)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,.012,8,120),new THREE.MeshBasicMaterial({color:0xff4a3a,transparent:true,opacity:.7}));m.rotation.set(rx,ry,0);g.add(m);return m};
const r1=mk(3,1.2,.3),r2=mk(2.7,.4,1.1);
const N=innerWidth<700?90:200,pos=new Float32Array(N*3);
for(let i=0;i<N;i++){const v=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(2.6+Math.random()*1.6);pos.set([v.x,v.y,v.z],i*3)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xff6a5a,size:.045,transparent:true,opacity:.7}));g.add(pts);
function size(){const w=host.clientWidth*1.28,h=host.clientHeight*1.28;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
size();addEventListener('resize',size);
let mx=0,my=0,on=true;const wrap=document.querySelector('.hero-logo-wrap');
if(fine)addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
new IntersectionObserver(e=>{on=e[0].isIntersecting;if(on&&!calm)loop()}).observe(host);
function frame(t){ico.rotation.y=t*.00018;ico.rotation.x=t*.00009;r1.rotation.z=t*.0003;r2.rotation.z=-t*.00025;pts.rotation.y=-t*.00007;
 g.rotation.y+=(mx*.9-g.rotation.y)*.05;g.rotation.x+=(my*.6-g.rotation.x)*.05;
 wrap.style.transform=`perspective(900px) rotateY(${mx*14}deg) rotateX(${-my*12}deg)`;R.render(sc,cam)}
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
b.onclick=()=>{p.classList.toggle('open');if(!m.children.length)say('Hi! I can point you to the right page. What do you need?')};
p.querySelector('#bot-f').onsubmit=e=>{e.preventDefault();if(ip.value.trim()){ask(ip.value.trim());ip.value=''}};
})()}catch(e){}
try{const q=new URLSearchParams(location.search).get('service'),s=document.getElementById('fsvc');if(q&&s)s.value=q}catch(e){}
try{if('serviceWorker' in navigator&&location.protocol.indexOf('http')==0)navigator.serviceWorker.register('sw.js')}catch(e){}

try{const f=document.getElementById('cform');if(f)f.addEventListener('submit',()=>{let s=document.querySelector('.fstat');if(!s){s=document.createElement('p');s.className='fstat';f.appendChild(s)}
 s.textContent='Opening WhatsApp with your message… If nothing opened, message us directly: ';const a=document.createElement('a');a.href='https://wa.me/918340161172';a.textContent='wa.me/918340161172';a.target='_blank';a.rel='noopener';s.appendChild(a)})}catch(e){}

try{const r=document.documentElement,b=document.getElementById('theme');if(b){const set=(t,save)=>{r.setAttribute('data-theme',t);if(save)try{localStorage.setItem('xv-theme',t)}catch(e){}b.textContent=t==='light'?'🌙':'☀️';b.setAttribute('aria-label','Switch to '+(t==='light'?'dark':'light')+' mode');const m=document.querySelector('meta[name=theme-color]');if(m)m.content=t==='light'?'#f6f6f9':'#050507'};
set(r.getAttribute('data-theme')||'dark',0);b.onclick=()=>set(r.getAttribute('data-theme')==='light'?'dark':'light',1)}}catch(e){}
try{const s=document.querySelector('.hero h1 .grad');if(s&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const w=['digital foundation','secure systems','smart products','growth engine'];let i=0;s.style.display='inline-block';s.style.transition='opacity .4s,transform .4s';setInterval(()=>{s.style.opacity=0;s.style.transform='translateY(8px)';setTimeout(()=>{i=(i+1)%w.length;s.textContent=w[i];s.style.opacity=1;s.style.transform='none'},400)},3200)}}catch(e){}
try{if(/blog-/.test(location.pathname)){const c=document.querySelector('.prose');if(c){const d=document.createElement('p');d.style.marginTop='18px';const a=document.createElement('a');a.href='https://wa.me/?text='+encodeURIComponent(document.title+' '+location.href);a.target='_blank';a.rel='noopener';a.textContent='Share on WhatsApp';a.style.color='var(--red2)';const k=document.createElement('button');k.type='button';k.textContent='Copy link';k.style.cssText='margin-left:16px;background:none;border:0;color:var(--red2);cursor:pointer;font:inherit';k.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(location.href);k.textContent='Copied!'};d.append(a,k);c.appendChild(d)}}}catch(e){}

/* ---- settings drawer + search ---- */
try{(function(){
const R=document.documentElement,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],LS='xv-set',mq=matchMedia('(prefers-color-scheme:light)');
const DEF={mode:'dark',fs:100,fx:1,rm:0,hc:0};let S=Object.assign({},DEF);try{Object.assign(S,JSON.parse(localStorage.getItem(LS)||'{}'))}catch(e){}
function apply(){const t=S.mode==='auto'?(mq.matches?'light':'dark'):S.mode;R.setAttribute('data-theme',t);
 try{localStorage.setItem('xv-theme',t);localStorage.setItem(LS,JSON.stringify(S))}catch(e){}
 const b=$('#theme');if(b){b.textContent=t==='light'?'🌙':'☀️';b.setAttribute('aria-label','Switch to '+(t==='light'?'dark':'light')+' mode')}
 const m=$('meta[name=theme-color]');if(m)m.content=t==='light'?'#f6f6f9':'#050507';
 R.style.fontSize=S.fs+'%';R.dataset.fx=S.fx?'on':'off';R.dataset.rm=S.rm?'on':'off';R.dataset.hc=S.hc?'on':'off';
 $$('#drw [data-m]').forEach(x=>x.classList.toggle('on',x.dataset.m===S.mode));$$('#drw [data-f]').forEach(x=>x.classList.toggle('on',+x.dataset.f===S.fs));
 $$('#drw .sw').forEach(x=>x.setAttribute('aria-checked',S[x.dataset.k]?'true':'false'))}
const L=(h,t,c)=>'<a href="'+h+'"'+(c?' class="'+c+'"':'')+'>'+t+'</a>',hr=s=>{const e=$(s);return e?e.href:'#'};
const PG=[['index.html','Home'],['services.html','Services'],['web.html','Web &amp; Software',1],['cloud.html','Cloud &amp; IT',1],['security.html','Security',1],['ai.html','AI Solutions',1],['academy.html','Academy',1],['work.html','Work'],['pricing.html','Pricing'],['about.html','About'],['blog.html','Blog'],['contact.html','Contact']];
const d=document.createElement('aside'),scr=document.createElement('div');d.id='drw';scr.id='scr';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Menu and settings');
const sw=(k,t)=>'<div class="row"><span>'+t+'</span><button type="button" class="sw" role="switch" data-k="'+k+'" aria-label="'+t+'"></button></div>';
d.innerHTML='<div class="dh"><b>Menu &amp; Settings</b><button id="dx" type="button" aria-label="Close menu">✕</button></div>'
+'<button class="dsr" id="dsr" type="button">🔍 Search the site <kbd>Ctrl K</kbd></button>'
+'<div class="dl">'+PG.map(p=>L(p[0],p[1],p[2]?'sub':'')).join('')+'</div>'
+'<h4>Appearance</h4><div class="seg"><button type="button" data-m="dark">🌙 Dark</button><button type="button" data-m="light">☀️ Light</button><button type="button" data-m="auto">Auto</button></div>'
+'<h4>Text size</h4><div class="seg"><button type="button" data-f="90">A−</button><button type="button" data-f="100">A</button><button type="button" data-f="112">A+</button></div>'
+'<h4>Experience</h4>'+sw('fx','3D &amp; visual effects')+sw('rm','Reduce motion')+sw('hc','High contrast')
+'<h4>Contact us</h4><div class="seg q">'+L('https://wa.me/918340161172','💬 WhatsApp')+L(hr('a[aria-label=Call]'),'📞 Call')+L('mailto:contactxevast@gmail.com','✉️ Email')+L(hr('a[aria-label=Instagram]'),'📷 Instagram')+'</div>'
+'<h4>App</h4><div class="seg"><button type="button" id="inst">⬇ Install app</button><button type="button" id="shr">↗ Share site</button></div><p class="hint" id="ihint"></p>'
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
const IT=[['Home','index.html','start'],['Services','services.html','all services'],['Web & Software','web.html','website app ui ux design seo data analytics'],['Cloud & IT','cloud.html','cloud devops hosting managed it support'],['Security','security.html','cybersecurity vapt network compliance forensics'],['AI Solutions','ai.html','ai chatbot automation'],['Xevast Academy','academy.html','courses internship training learn'],['Work','work.html','projects portfolio testimonials'],['Pricing','pricing.html','price cost plans estimate calculator faq'],['About','about.html','founder anshu'],['Blog','blog.html','articles insights'],['Website security basics','blog-website-security-basics.html','article'],['Plan a website budget','blog-plan-website-budget.html','article'],['What is VAPT?','blog-what-is-vapt.html','article'],['Contact','contact.html','quote whatsapp email call'],['Privacy policy','privacy.html','data']];
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
