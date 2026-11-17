/* Sample gallery: shows 1 to 5 files from samples/<page-name>/ (no list to maintain). */
(function(){
 var sec=document.getElementById('samples');if(!sec)return;
 var slug=sec.getAttribute('data-slug'),name=sec.getAttribute('data-name')||'this service',wa=sec.getAttribute('data-wa')||'918340161172',grid=document.getElementById('smpGrid');if(!grid||!slug)return;
 var MAX=5,EXT=['jpg','jpeg','png','webp'],cfg=(window.XEVAST_SAMPLES||{})[slug]||[];
 function img(u){return new Promise(function(r){var i=new Image();i.onload=function(){r(u)};i.onerror=function(){r(null)};i.src=u})}
 function pdf(u){if(!/^https?:$/.test(location.protocol))return Promise.resolve(null);return fetch(u,{method:'HEAD'}).then(function(r){return r.ok&&/pdf/i.test(r.headers.get('content-type')||'')?u:null}).catch(function(){return null})}
 function find(n){var c=cfg[n-1]||{},base='samples/'+slug+'/';
  if(c.file){var u=/^https?:|^\//.test(c.file)?c.file:base+c.file;return(/\.pdf$/i.test(u)?pdf(u):img(u)).then(function(v){return v?{u:v,t:/\.pdf$/i.test(v)?'pdf':'img'}:null})}
  return Promise.all(EXT.map(function(e){return img(base+n+'.'+e)}).concat([pdf(base+n+'.pdf')])).then(function(a){for(var i=0;i<EXT.length;i++)if(a[i])return{u:a[i],t:'img'};return a[EXT.length]?{u:a[EXT.length],t:'pdf'}:null})}
 function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
 var all=[],imgs=[],lb=null,cur=0;
 function empty(){grid.textContent='';var b=el('div','smp-empty'),ph=el('div','smp-ph');ph.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4 4 3 3-2 4 3"/></svg>';
  b.appendChild(ph);b.appendChild(el('h3','','Samples are being added'));b.appendChild(el('p','','We are building our client portfolio. Ask us for relevant examples of '+name+' during a free consultation.'));
  var a=el('div','rqact');a.style.justifyContent='center';var w=el('a','btn','Ask for examples');w.href='https://wa.me/'+wa+'?text='+encodeURIComponent('Hi Xevast, could you share samples of '+name+'?');w.target='_blank';w.rel='noopener';var p=el('a','btn btn-ghost','Company profile (PDF)');p.href='files/Xevast-Company-Profile.pdf';p.setAttribute('download','');a.appendChild(w);a.appendChild(p);b.appendChild(a);grid.appendChild(b)}
 function open(i){if(!imgs.length)return;if(!lb)mk();cur=(i+imgs.length)%imgs.length;var it=imgs[cur];lb.querySelector('img').src=it.u;lb.querySelector('img').alt=it.title;lb.querySelector('.lb-c').textContent=it.title+(it.text?' · '+it.text:'')+'  ('+(cur+1)+'/'+imgs.length+')';lb.classList.add('open');document.documentElement.style.overflow='hidden'}
 function close(){if(lb){lb.classList.remove('open');document.documentElement.style.overflow=''}}
 function mk(){lb=el('div','lb');lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Sample viewer');lb.innerHTML='<button class="lb-x" aria-label="Close">✕</button><button class="lb-p" aria-label="Previous">‹</button><figure><img alt=""><figcaption class="lb-c"></figcaption></figure><button class="lb-n" aria-label="Next">›</button>';
  document.body.appendChild(lb);lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-x'))close()});lb.querySelector('.lb-p').onclick=function(){open(cur-1)};lb.querySelector('.lb-n').onclick=function(){open(cur+1)};
  addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open(cur-1);if(e.key==='ArrowRight')open(cur+1)});
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(x0==null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)open(cur+(d<0?1:-1));x0=null},{passive:true})}
 function render(){grid.textContent='';if(!all.length){empty();return}
  all.forEach(function(it){var c=el('figure','smp-card');
   if(it.t==='img'){var b=el('button','smp-img');b.type='button';b.setAttribute('aria-label','Open '+it.title);var im=new Image();im.src=it.u;im.alt=it.title;im.loading='lazy';im.decoding='async';b.appendChild(im);b.onclick=function(){open(imgs.indexOf(it))};c.appendChild(b)}
   else{var a=el('a','smp-img smp-pdf');a.href=it.u;a.target='_blank';a.rel='noopener';a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l5 5v15H6zM15 2v5h5"/></svg><span>Open PDF</span>';c.appendChild(a)}
   var f=el('figcaption');f.appendChild(el('b','',it.title));if(it.text)f.appendChild(el('span','',it.text));c.appendChild(f);grid.appendChild(c)})}
 var started=false;
 function start(){if(started)return;started=true;var ps=[];for(var n=1;n<=MAX;n++)ps.push(find(n));
  Promise.all(ps).then(function(r){all=[];r.forEach(function(x,i){if(!x)return;var c=cfg[i]||{};all.push({u:x.u,t:x.t,title:c.title||('Sample '+(i+1)),text:c.text||''})});imgs=all.filter(function(x){return x.t==='img'});render()})}
 grid.textContent='';grid.appendChild(el('p','smp-load','Loading samples…'));
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();start()}},{rootMargin:'400px'});io.observe(sec)}else start();
})();
