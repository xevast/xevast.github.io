/* Where each portal lives. Edit ONLY this file (scripts/prepare.js copies it into every portal).
   Replace the web.app addresses with your own domains after you connect them in Firebase Hosting. */
(function(g){'use strict';var P=g.XV_PORTALS={main:'https://xevast-main.web.app/',academy:'https://xevast-academy.web.app/',team:'https://xevast-team.web.app/',admin:'https://xevast-admin.web.app/',academyAdmin:'https://xevast-academyadmin.web.app/'};
 P.client=P.main+'portal.html'; /* client portal lives in the main site (portal.html): same design, same login, same Firebase */
 var h=(g.location&&g.location.hostname)||'';
 /* split = portals are on separate hosting sites. On localhost and GitHub Pages everything stays relative (academy/...). */
 P.split=!!h&&h!=='localhost'&&h!=='127.0.0.1'&&!/github\.io$/.test(h);
 if(g.document)g.document.addEventListener('click',function(ev){var a=ev.target&&ev.target.closest&&ev.target.closest('a[href]');if(!a||!P.split)return;
  var u=a.getAttribute('href')||'';if(/^academy\//.test(u)){ev.preventDefault();g.location.href=P.academy+u.slice(8)}},true);
})(typeof window!=='undefined'?window:globalThis);
