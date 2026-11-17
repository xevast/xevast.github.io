/* Phase 1: mega-menu, breadcrumbs, computed stats — all from XV (site-data.js) */
(function(){var X=window.XVDATA;if(!X)return;
var file=(location.pathname.split('/').pop()||'index.html');
function esc(s){return s.replace(/&/g,'&amp;')}
function init(){
 var rb=document.querySelector('.nav-inner .btn');if(rb&&!rb.getAttribute('aria-label')){rb.setAttribute('aria-label','Requirement Form');rb.title='Requirement Form'}
 /* services menu: divisions on the left, their sub-services open on the right */
 var DV=X.divisions.filter(function(d){return d.slug!=='dbs'});
 var m=document.querySelector('.dd-m:not(.dd-dbs):not(.dd-more)');
 if(m){m.classList.add('mega');
  var subs=function(d){var sv=X.live.filter(function(s){return s.division===d.slug&&s.href!==d.href});if(d.slug==='academy')sv=sv.concat(X.tracks||[]);if(d.slug==='lab'&&X.labMenu)sv=X.labMenu.reduce(function(a,g){return a.concat(g.items)},[]);return sv};
  var link=function(s){return '<a href="'+s.href+'"'+(s.href===file?' class="act"':'')+'>'+esc(s.name)+(s.lock?' <i class="mg-lk" title="Needs a 6-digit access code" aria-label="Needs a 6-digit access code">\uD83D\uDD12</i>':'')+'</a>'},
   links=function(d,sv){return d.slug==='lab'&&X.labMenu?X.labMenu.map(function(g){return '<b class="mg-g">'+esc(g.group)+'</b>'+g.items.map(link).join('')}).join(''):sv.map(link).join('')};
  var cur=DV.find(function(d){return d.href===file||subs(d).some(function(s){return s.href===file})});
  m.innerHTML='<div class="mg-l" role="tablist">'+DV.map(function(d,i){return '<a class="mg-d'+(i===0?' on':'')+'" data-i="'+i+'" href="'+d.href+'">'+esc(d.name)+'<i>›</i></a>'}).join('')+'</div>'+
   '<div class="mg-r">'+DV.map(function(d,i){var sv=subs(d);return '<div class="mg-p'+(i===0?' on':'')+'" data-i="'+i+'"><a class="mg-h" href="'+d.href+'">'+esc(d.name)+' →</a><p>'+esc(d.desc||'')+'</p><div class="mg-s">'+links(d,sv)+'</div></div>'}).join('')+'</div>'+
   '<div class="mg-all"><a href="index.html#all-services">All 14 services →</a><a href="company-profile.html">Company profile</a><a href="services.html">Services</a><a href="pricing.html">Pricing</a><a href="about.html">About</a></div>';
  var show=function(i){m.querySelectorAll('.mg-d,.mg-p').forEach(function(e){e.classList.toggle('on',e.dataset.i===String(i))})};
  m.querySelectorAll('.mg-d').forEach(function(a){a.addEventListener('mouseenter',function(){show(a.dataset.i)});a.addEventListener('focus',function(){show(a.dataset.i)})});
  if(cur)show(DV.indexOf(cur))}

 /* Digital Business Setup dropdown + More dropdown */
 var dm=document.querySelector('.dd-dbs');
 if(dm){var D=X.divisions.find(function(d){return d.slug==='dbs'});if(D){var ds=X.services.filter(function(s){return s.division==='dbs'});
  dm.innerHTML='<a class="dbs-h" href="'+D.href+'"><b>Complete Digital Business Setup →</b><small>'+esc(D.desc||'')+'</small></a>'+ds.map(function(s){return '<a href="'+s.href+'"'+(s.href===file?' class="act"':'')+'><b>'+esc(s.name)+'</b><small>'+esc(s.short||'')+'</small></a>'}).join('')}}
 var mo=document.querySelector('.dd-more');
 if(mo){mo.innerHTML=[['work.html','Work'],['blog.html','Blog'],['support.html','Support'],['status.html','Status'],['lab.html','Xevast Lab']].map(function(x){return '<a href="'+x[0]+'"'+(x[0]===file?' class="act"':'')+'>'+x[1]+'</a>'}).join('')}
 /* mobile menu */
 var mm=document.getElementById('mmenu');if(mm){mm.querySelectorAll('a[style*="padding-left:26px"]').forEach(function(a){a.remove()});var ab=mm.querySelector('a[href="about.html"]');if(ab&&!mm.querySelector('a[href="company-profile.html"]')){var cp=document.createElement('a');cp.href='company-profile.html';cp.textContent='Company Profile';ab.insertAdjacentElement('afterend',cp)}var sa=mm.querySelector('a[href="services.html"]');if(sa)X.divisions.slice().reverse().forEach(function(d){var a=document.createElement('a');a.href=d.href;a.textContent=d.name;a.style.cssText='padding-left:26px;font-size:1.05rem;color:var(--mu)';sa.insertAdjacentElement('afterend',a)})}
 /* stats */
 document.querySelectorAll('[data-count]').forEach(function(b){
  var l=(b.nextElementSibling||{}).textContent||'';l=l.trim().toLowerCase();
  if(X.stats[l])b.setAttribute('data-count',X.stats[l])});
 /* breadcrumbs */
 if(file==='index.html'||file==='')return;
 document.querySelectorAll('main div.crumbs').forEach(function(c){c.remove()});
 var nav=document.getElementById('nav');if(!nav)return;
 var t=[['Home','index.html']],svc=X.services.find(function(s){return s.href===file}),
  div=X.divisions.find(function(d){return d.href===file}),tr=(X.tracks||[]).find(function(x){return x.href===file}),ex=(X.academyExtra||{})[file];
 if(tr||ex){t.push(['Services','services.html']);t.push(['Academy','academy.html']);t.push([tr?tr.name:ex,null])}else if(svc||div){t.push(['Services','services.html']);
  var d=div||X.divisions.find(function(x){return x.slug===svc.division});
  if(svc&&svc.href!==d.href){t.push([d.name,d.href]);t.push([svc.name,null])}else t.push([d.name,null])}
 else if(X.pages[file])t.push([X.pages[file],null]);
 else if(file.indexOf('blog-')===0){t.push(['Blog','blog.html']);t.push(['Article',null])}
 else return;
 var el=document.createElement('nav');el.className='crumbs container';el.setAttribute('aria-label','Breadcrumb');
 el.innerHTML='<ol>'+t.map(function(c,i){return '<li>'+(c[1]?'<a href="'+c[1]+'">'+esc(c[0])+'</a>':'<span aria-current="page">'+esc(c[0])+'</span>')+'</li>'}).join('')+'</ol>';
 nav.insertAdjacentElement('afterend',el);
 var ld=document.createElement('script');ld.type='application/ld+json';
 ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:t.map(function(c,i){var o={"@type":"ListItem",position:i+1,name:c[0]};if(c[1])o.item=location.origin+location.pathname.replace(/[^\/]*$/,'')+c[1];return o})});
 document.head.appendChild(ld)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();

/* active nav + mobile tab bar */
(function(){var X=window.XVDATA;var file=(location.pathname.split('/').pop()||'index.html');
function act(){var f=file,h=null;
 if(f==='contact.html')h='contact.html';else if(f==='pricing.html')h='pricing.html';else if(f==='about.html')h='about.html';
 else if(f==='company-profile.html'||f.indexOf('profile-')===0)h='company-profile.html';
 else if(f==='digital-business-setup.html'||f==='new-business-launchpad.html'||f==='business-digitization.html'||f==='digital-identity-setup.html')h='digital-business-setup.html';
 
 else if(/^(work|blog|support|status|xevast-lab)/.test(f))h='more';
 else if(X&&(f==='services.html'||f.indexOf('service-')===0||f==='wams.html'||f==='system-design.html'||f.indexOf('academy')===0||X.divisions.some(function(d){return d.href===f})||X.services.some(function(s){return s.href===f})))h='services.html';
 if(h){var a=document.querySelector(h==='more'?'.nav-links>li.more>a':'.nav-links>li>a[href="'+h+'"]');if(a)a.classList.add('act')}}
function tab(){if(document.querySelector('.tabbar')||/^(admin|offline)/.test(file))return;
 var I={h:'<path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',s:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',a:'<path d="M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',p:'<path d="M4 14v-2a8 8 0 0116 0v2M4 14h3v5H4zM17 14h3v5h-3z"/>',m:'<path d="M4 7h16M4 12h16M4 17h16"/>'};
 var cur=file==='index.html'?'h':file.indexOf('academy')===0?'a':/^(support|status)/.test(file)?'p':'s';
 var el=document.createElement('div');el.className='tabbar';el.setAttribute('role','navigation');el.setAttribute('aria-label','App navigation');
 [['h','Home','index.html'],['s','Services','services.html'],['a','Academy','academy/index.html'],['p','Support','support.html']].forEach(function(x){var a=document.createElement('a');a.href=x[2];if(x[0]===cur)a.className='act';a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+I[x[0]]+'</svg>'+x[1];el.appendChild(a)});
 var b=document.createElement('button');b.type='button';b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+I.m+'</svg>More';b.onclick=function(){var h=document.getElementById('ham');if(h)h.click()};el.appendChild(b);document.body.appendChild(el)}
function go(){act();tab()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go()})();
