/* Xevast single source of truth. Nav, breadcrumbs, stats read from here. */
window.XVDATA={
company:{name:"Xevast",portal:"login.html",whatsapp:"918340161172",phone:"+918340161172",email:"contactxevast@gmail.com",instagram:"xevast.official"},
divisions:[
{slug:"dbs",desc:"Complete digital identity and systems: launch a new business, digitize a running one, or set up your online identity.",name:"Digital Business Setup",href:"digital-business-setup.html"},
{slug:"web",desc:"Websites, apps, UI/UX, data and SEO.",name:"Web & Software",href:"web.html"},
{slug:"cloud",desc:"Cloud infrastructure, DevOps and delivery pipelines.",name:"Cloud & IT",href:"cloud.html"},
{slug:"security",desc:"Cybersecurity, network security, compliance, research lab and forensics.",name:"Security",href:"security.html"},
{slug:"ai",desc:"Chatbots, workflow automation and custom AI tools.",name:"AI Solutions",href:"ai.html"},
{slug:"management",desc:"Managed IT, WAMS and support after launch.",name:"Management IT & Support",href:"management.html"},
{slug:"custom",desc:"System design and custom software built around your workflow.",name:"System Design & Custom Solutions",href:"custom.html"},
{slug:"lab",desc:"Practice labs, project work, research and our own software launches.",name:"Xevast Lab",href:"lab.html"}],
services:[
{slug:"new-business-launchpad",division:"dbs",name:"New Business Launchpad",href:"new-business-launchpad.html",short:"Launch a new business with brand, website, payments, tools and marketing ready from day one.",kw:"new business|startup|start a business|launch|launchpad|business setup|digital setup"},
{slug:"business-digitization",division:"dbs",name:"Business Digitization",href:"business-digitization.html",short:"Move a running business from paper and chats to connected digital systems, dashboards and automation.",kw:"digitization|digitisation|digitize|digitise|go digital|paperless|old business|running business|records"},
{slug:"digital-identity-setup",division:"dbs",name:"Digital Identity Setup",href:"digital-identity-setup.html",short:"A professional online identity: logo, website, Google profile, social pages, business email and WhatsApp Business.",kw:"digital identity|identity|brand|branding|logo|google business|visiting card|business email"},
{slug:"web-development",division:"web",name:"Web Development",href:"web-development.html"},
{slug:"mobile-apps",division:"web",name:"Mobile Apps",href:"mobile-apps.html"},
{slug:"ui-ux-design",division:"web",name:"UI/UX Design",href:"ui-ux-design.html"},
{slug:"system-design",division:"custom",name:"System Design",href:"system-design.html"},
{slug:"wams",division:"management",name:"WAMS — Web & App Management",href:"wams.html"},
{slug:"custom-solutions",division:"custom",name:"Custom Solutions",href:"custom-solutions.html"},
{slug:"data-analytics",division:"web",name:"Data & Analytics",href:"data-analytics.html"},
{slug:"seo-marketing",division:"web",name:"SEO & Marketing",href:"seo-marketing.html"},
{slug:"cloud-devops",division:"cloud",name:"Cloud & DevOps",href:"cloud-devops.html"},
{slug:"managed-it",division:"management",name:"Managed IT",href:"managed-it.html"},
{slug:"cybersecurity",division:"security",name:"Cybersecurity",href:"cybersecurity.html"},
{slug:"network-security",division:"security",name:"Network Security",href:"network-security.html"},
{slug:"compliance-grc",division:"security",name:"Compliance & GRC",href:"compliance-grc.html"},
{slug:"security-research-lab",division:"security",name:"Research Lab",href:"security-research-lab.html"},
{slug:"forensics-ir",division:"security",name:"Forensics & IR",href:"forensics-ir.html"},
{slug:"ai-solutions",division:"ai",name:"AI Solutions",href:"ai-solutions.html"},
{slug:"xevast-lab",division:"lab",name:"Xevast Lab",href:"lab.html"},
{slug:"web-app-hosting",division:"web",name:"Web & App Hosting",href:"web-app-hosting.html"},
{slug:"research-development",division:"lab",name:"Research & Development",href:"lab.html#research"},
{slug:"lab-projects",division:"lab",name:"Projects",href:"lab.html#projects"}],
pages:{"work.html":"Work","pricing.html":"Pricing","about.html":"About","contact.html":"Contact","blog.html":"Blog","privacy.html":"Privacy","support.html":"Support","status.html":"Status","services.html":"Services"}
};
XVDATA.services.sort(function(a,b){var o=XVDATA.divisions.map(function(d){return d.slug});return o.indexOf(a.division)-o.indexOf(b.division)});
XVDATA.live=XVDATA.services.filter(s=>s.live!==false);
XVDATA.stats={services:XVDATA.live.length,divisions:XVDATA.divisions.length};

/* ---- Phase 1b: per-service info + helpers used by search, assistant, drawer, form ---- */
XVDATA.info={
"web-development":["We build business websites, portfolios, e-commerce stores and web apps.","website|websites|web development|ecommerce|e-commerce|banwani|banwana|portfolio"],
"mobile-apps":["We build Android, iOS and cross-platform mobile apps and help publish them.","mobile app|mobile apps|android|ios|flutter|react native|app development"],
"ui-ux-design":["UI/UX design: research, wireframes, prototypes and design systems.","ui|ux|figma|wireframe|wireframes|prototype|ui/ux"],
"system-design":["System design: architecture, database, API and security design with full documentation.","system design|architecture|database design|api design|srs"],
"custom-solutions":["Custom portals, internal tools, automation and integrations built around your workflow.","custom software|custom solution|custom solutions|portal|crm|erp|inventory|billing software"],
"wams":["WAMS manages your website or app after launch: monitoring, backups, security, updates and store releases.","wams|web management|app management|maintenance|website maintenance|amc|backup|monitoring"],
"data-analytics":["Dashboards, reporting and data analytics for better decisions.","analytics|dashboard|dashboards|data analysis|power bi|reporting"],
"seo-marketing":["SEO and digital marketing: technical SEO, content, local SEO and ads.","seo|marketing|digital marketing|ranking|google ads"],
"cloud-devops":["Cloud setup, CI/CD, containers and cost optimisation.","devops|cloud|aws|docker|hosting|cloud migration"],
"managed-it":["Managed IT: helpdesk, devices, backups and email support under clear SLAs.","managed it|helpdesk|it support|it management"],
"cybersecurity":["Cybersecurity: VAPT, security audits and hardening.","cybersecurity|vapt|pentest|penetration|security audit|hack|hacking"],
"network-security":["Network security: firewalls, VPN and network assessments.","network security|firewall|vpn"],
"compliance-grc":["Compliance and GRC support for standards such as ISO 27001 and the DPDP Act.","compliance|grc|iso 27001|dpdp|audit"],
"security-research-lab":["Our security research lab for testing and research work.","research lab|security research"],
"forensics-ir":["Digital forensics and incident response when something goes wrong.","forensics|incident response|breach|hacked"],
"ai-solutions":["AI chatbots, workflow automation and custom AI tools.","chatbot|chatbots|ai|automation|artificial intelligence"],
"web-app-hosting":["Web and app hosting: domain, hosting setup, SSL, backups and management, with plans you can order online.","hosting|web hosting|app hosting|domain|ssl|server|vps|dns"],
"xevast-lab":["Xevast Lab is our hands-on space for practice labs, project work and research. Programmes are announced soon.","lab|labs|xevast lab|practice lab|project lab"],
"academy-programs":["Xevast Academy is our separate learning portal: courses with batches and progress tracking, internships with automatic offer letters and certificates, skill tests, training and certificate verification. Open academy/index.html.","academy|course|courses|internship|training|fees|batch|syllabus|enrol|enroll|learn|seekhna"]};
XVDATA.services.forEach(function(s){var i=XVDATA.info[s.slug];if(i){s.short=i[0];s.kw=i[1]}});
XVDATA.kb=function(){var r=(XVDATA.tracks||[]).map(function(t){return [new RegExp('\\b('+t.kw+')\\b'),t.short+' Level: '+t.level+', planned '+t.dur+'. Register, buy a batch and track progress in Xevast Academy.',t.href,t.name]});
 XVDATA.live.forEach(function(s){if(!s.kw)return;r.push([new RegExp('\\b('+s.kw+')\\b'),s.short,s.href,s.name])});
 r.push([/\b(ticket|support request|raise a request|status|uptime)\b/,'Raise a support request on the Support page, or check the Status page.','support.html','Support']);
 r.push([/\b(services|service|divisions|offer|kya karte)\b/,'We work in '+XVDATA.divisions.length+' divisions: '+XVDATA.divisions.map(function(d){return d.name}).join(', ')+'.','services.html','All services']);
 return r};
XVDATA.searchItems=function(){var o=[['About — Founder & CEO','about.html','founder ceo anshu kumar leadership']].concat((XVDATA.tracks||[]).map(function(t){return [t.name+' — course',t.href,'academy course learn '+t.kw.replace(/\|/g,' ')]}).concat([['Verify certificate','academy/verify.html','certificate verify id'],['Internships','academy/internship.html','internship apply']]));o=o.concat([['Support — raise a ticket','support.html','ticket help issue problem wams'],['System status','status.html','uptime status online']]);
 XVDATA.divisions.forEach(function(d){o.push([d.name,d.href,'division '+XVDATA.live.filter(function(s){return s.division===d.slug}).map(function(s){return s.name}).join(' ')])});
 XVDATA.live.forEach(function(s){o.push([s.name+' — service',s.href,'service '+(s.kw||'').replace(/\|/g,' ')])});return o};
XVDATA.formOptions=function(){return XVDATA.live.map(function(s){return s.name}).concat(['Academy enquiry','Not sure yet'])};
XVDATA.matchService=function(q){q=(q||'').toLowerCase();var s=XVDATA.live.find(function(x){return x.slug===q||x.name.toLowerCase()===q});return s?s.name:''};

XVDATA.tracks=[{"slug": "cyber-fundamentals", "name": "Cybersecurity Fundamentals", "href": "academy/courses.html?c=cyber-fundamentals", "level": "Beginner", "dur": "8 weeks", "short": "Learn how attacks work and how to protect accounts, devices and networks.", "kw": "cybersecurity course|cyber course|security fundamentals|cyber fundamentals"}, {"slug": "ethical-hacking", "name": "Ethical Hacking & VAPT", "href": "academy/courses.html?c=ethical-hacking", "level": "Intermediate", "dur": "12 weeks", "short": "Authorised testing of web apps and networks in safe labs, ending with a real report.", "kw": "ethical hacking|hacking course|vapt course|pentesting course|penetration testing course"}, {"slug": "web-development", "name": "Web Development", "href": "academy/courses.html?c=web-development", "level": "Beginner to job-ready", "dur": "12 weeks", "short": "Build and deploy real websites and a small full-stack app from scratch.", "kw": "web development course|web course|html course|learn web|coding course"}, {"slug": "cloud-devops", "name": "Cloud & DevOps", "href": "academy/courses.html?c=cloud-devops", "level": "Intermediate", "dur": "10 weeks", "short": "Deploy applications with pipelines, containers and monitoring on the cloud.", "kw": "cloud course|devops course|aws course|cloud devops course"}, {"slug": "ai-automation", "name": "AI & Automation", "href": "academy/courses.html?c=ai-automation", "level": "Beginner", "dur": "8 weeks", "short": "Use AI tools and simple code to automate real work and build a chatbot.", "kw": "ai course|automation course|ai automation|chatbot course|learn ai"}, {"slug": "ui-ux-basics", "name": "UI/UX Basics", "href": "academy/courses.html?c=ui-ux-basics", "level": "Beginner", "dur": "6 weeks", "short": "Learn design thinking, wireframes and prototypes, and finish with a case study.", "kw": "ui ux course|figma course|design course|ux course"}, {"slug": "digital-marketing-seo", "name": "Digital Marketing & SEO", "href": "academy/courses.html?c=digital-marketing-seo", "level": "Beginner", "dur": "8 weeks", "short": "Get found online with SEO, content, social media and basic ads.", "kw": "digital marketing course|seo course|marketing course|learn seo"}];
XVDATA.academyExtra={'academy/verify.html':'Verify certificate','academy/internship.html':'Internships'};

/* ---- Requirement form: questions change with the selected service ---- */
(function(X){
var t=function(i,l){return[i,l,'t']},a=function(i,l){return[i,l,'ta']},c=function(i,l,o){return[i,l,'cb',o]},s=function(i,l,o,n){return[i,l,'sel',o,n]};
var P={
hosting:[['Hosting needs',[c('ho_w','What do you want to host?',['Business website','E-commerce store','Web app','Mobile app backend / API','Email only']),t('ho_d','Domain name (or the name you want)'),s('ho_b','Do you already own the domain?',['Yes','No, please register it','Not sure']),t('ho_c','Current host or provider (if any)'),s('ho_m','Do you need us to move an existing site?',['Yes','No','Not sure']),t('ho_t','Technology (e.g. WordPress, React, Node.js, PHP)'),s('ho_v','Expected monthly visitors',['Under 1,000','1,000 - 10,000','10,000 - 100,000','Above 100,000','Not sure']),c('ho_e','Also needed',['SSL certificate','Business email','Daily backups','Uptime monitoring','Security updates','CDN']),t('ho_p','Hosting plan you are interested in (optional)')]]],
lab:[['Lab interest',[s('lb_t','What are you interested in?',['Practice labs','Project lab','Research and experiments','Not sure']),s('lb_l','Your level',['Beginner','Some experience','Working professional']),s('lb_g','Your goal',['Learn by doing','Build a project','Prepare for a career','For my team or institution']),a('lb_n','Anything you would like to work on? (optional)')]]],
design:[['Design scope',[c('ds_w','What do you need designed?',['Website','Mobile app','Dashboard','Logo / brand','Design system','Redesign of an existing product']),t('ds_l','Link to the existing product (if any)'),a('ds_u','Who will use it? Describe your audience'),s('ds_h','Do you have wireframes or brand guidelines?',['Both','Wireframes only','Brand guidelines only','Neither']),a('ds_r','Products or sites whose look you like (1-2 links)')]]],
app:[['App details',[c('ap_p','Which platform?',['Android','iOS','Both','Not sure']),a('ap_g','What should the app do? (main purpose)'),c('ap_f','Features you need',['User login','Payments','Push notifications','Maps / location','Chat','Admin panel','Offline mode','Booking']),s('ap_b','Do you already have a website or backend?',['Yes','No','Not sure']),s('ap_s','Store publishing help',['Both stores','Play Store only','App Store only','Not now'])]]],
data:[['Data and reporting',[a('da_g','What decisions do you want data to help with?'),c('da_s','Where is your data today?',['Excel / Google Sheets','Database','Website / app analytics','CRM / ERP','Other']),c('da_d','What do you need?',['Dashboard','Automated reports','KPI setup','Data cleanup']),s('da_u','How many people will use it?',['Just me','2-10','More than 10']),t('da_t','Tools you already use (optional)')]]],
seo:[['Marketing goals',[t('se_u','Website link'),c('se_g','Main goal',['More traffic','More enquiries','Local visibility','Online sales','Brand awareness']),c('se_s','Services needed',['Technical SEO','Content','Local SEO','Social media','Paid ads']),t('se_a','Target city / audience'),s('se_b','Monthly ad budget (if ads)',['Not needed','Under ₹10,000','₹10,000 - ₹50,000','Above ₹50,000'])]]],
cloud:[['Cloud and infrastructure',[t('cl_h','Current hosting or cloud (if any)'),c('cl_n','What do you need?',['Cloud setup','Migration','CI/CD pipeline','Containers','Monitoring and backups','Cost optimisation']),s('cl_p','Preferred provider',['AWS','Azure','Google Cloud','Not sure','Other']),t('cl_t','Technology your app uses'),s('cl_u','Expected users',['Under 1,000','1,000 - 50,000','Above 50,000','Not sure'])]]],
itsupport:[['Your IT environment',[s('it_e','Number of employees',['1-10','11-50','51-200','More than 200']),t('it_d','Approximate number of computers / devices'),c('it_n','Support needed',['Helpdesk','Device management','Backups','Email / workspace','Network','Security basics']),s('it_m','Support mode',['Remote','On-site','Both']),s('it_c','Do you have an IT provider today?',['Yes','No'])]]],
wams:[['Your website or app',[t('wm_u','Website or app link'),c('wm_t','What is it?',['Website','Mobile app','Web app','E-commerce store']),s('wm_b','Built with',['WordPress','Custom code','React / Node','Shopify / Wix','Flutter / React Native','Not sure']),s('wm_w','Who built it?',['Xevast','Another company','Myself','Not sure']),c('wm_n','What do you need us to handle?',['Uptime monitoring','Backups','Security patches','Updates and content changes','Bug fixing','App store releases','SEO / analytics reports','Performance tuning']),a('wm_p','Current problems (optional)'),t('wm_h','Hosting provider (optional)')]]],
security:[['Security scope',[c('sc_w','What should be tested or reviewed?',['Website','Mobile app','API','Network','Cloud','Office computers']),a('sc_l','Links or systems in scope'),s('sc_r','Reason',['Routine check','Customer / compliance requirement','After an incident','Before launch']),s('sc_a','Testing on live systems?',['Yes','Only on staging','Not sure']),s('sc_o','I own these systems or am authorised to have them tested',['Yes'],'We test only with written authorisation.')]]],
compliance:[['Compliance needs',[c('co_s','Standard or law',['ISO 27001','DPDP Act','NIST','SOC 2','GDPR','Not sure']),s('co_z','Company size',['1-10','11-50','51-200','More than 200']),s('co_p','Do you have security policies?',['None','Some','Yes']),s('co_g','What do you need?',['First-time preparation','Gap assessment','Audit support']),t('co_d','Audit or deadline date (if any)')]]],
incident:[['Incident details',[a('ic_w','What happened?'),t('ic_t','When did you notice it?'),c('ic_s','What is affected?',['Website','Server','Email','Computers','Mobile devices','Cloud account']),s('ic_o','Is it still going on?',['Yes','No','Not sure']),s('ic_c','Have you deleted or changed anything?',['No','Yes','Not sure'],'Please avoid deleting anything until we speak.')]]],
ai:[['AI use case',[a('ai_g','What do you want to automate or build?'),c('ai_t','Type',['Chatbot','Workflow automation','Document / data tools','Custom AI tool']),c('ai_c','Where will it be used?',['Website','WhatsApp','Email','Internal tool']),s('ai_d','Data you have',['Documents','Database','Spreadsheets','None yet']),s('ai_s','How sensitive is the data?',['Public','Internal','Personal / sensitive'])]]],
sysdesign:[['System details',[a('sd_w','What system do you want designed?'),t('sd_r','Users and roles (e.g. admin, staff, customer)'),c('sd_n','What do you need?',['Architecture','Database design','API design','Security design','Integrations','Scalability plan','Cost estimate']),s('sd_s','Situation',['New system','Redesign of an existing one','Review of an existing one']),s('sd_u','Expected users',['Under 100','100 - 1,000','1,000 - 10,000','More than 10,000'])]]],
custom:[['Custom solution',[a('cu_p','Which process do you want to digitise?'),t('cu_u','Who will use it?'),c('cu_t','Type',['Portal','Internal tool','Automation','Integration','Dashboard','Admin panel']),t('cu_o','Tool or spreadsheet it will replace (if any)'),s('cu_m','Do you need existing data moved in?',['Yes','No','Not sure'])]]],
academy:[['Academy enquiry',[s('ac_t','Which track?',(X.tracks||[]).map(function(x){return x.name}).concat(['Internship','Workshop','Corporate training','College program','Not sure'])),s('ac_l','Your level',['Beginner','Some experience','Working professional']),s('ac_m','Preferred mode',['Online','Offline','Either']),s('ac_g','Your goal',['Learn a skill','Get a job','Internship','For my team or institution']),t('ac_w','Preferred timing (optional)')]]],
general:[['Project details',[a('gn_g','What is your goal?'),t('gn_l','Existing website or links (optional)'),a('gn_h','What help do you need?')]]]};
var M={'web-app-hosting':'hosting','xevast-lab':'lab','web-development':'web','ui-ux-design':'design','mobile-apps':'app','data-analytics':'data','seo-marketing':'seo','cloud-devops':'cloud','managed-it':'itsupport','wams':'wams','cybersecurity':'security','network-security':'security','security-research-lab':'security','compliance-grc':'compliance','forensics-ir':'incident','ai-solutions':'ai','system-design':'sysdesign','custom-solutions':'custom','academy-programs':'academy'};
X.formProfile=function(n){var v=X.live.find(function(x){return x.name===n});if(v)return M[v.slug]||'general';return n==='Academy enquiry'?'academy':'general'};
X.formSections=function(p){return P[p]?JSON.parse(JSON.stringify(P[p])):null};
})(XVDATA);
XVDATA.info["research-development"]=["Xevast Lab research and development: applied work in AI and automation, security, web and app engineering and developer tools.","research|r&d|lab|development"];
XVDATA.info["lab-projects"]=["Xevast Lab projects: internal tools and software that may become Xevast products.","projects|launch|lab|products"];
XVDATA.info["new-business-launchpad"]=["Launch a new business with brand, website, payments, tools and marketing ready from day one.","new business|startup|launch|launchpad"];
XVDATA.info["business-digitization"]=["Move a running business from paper and chats to connected digital systems, dashboards and automation.","digitization|digitize|paperless|go digital"];
XVDATA.info["digital-identity-setup"]=["A professional online identity: logo, website, Google profile, social pages, business email and WhatsApp Business.","digital identity|branding|logo|google business"];

/* Xevast Lab menu: two groups, each with a Client page (open) and a Company page (6-digit code). Used by the Services dropdown in nav.js. */
XVDATA.labMenu=[{group:"Research & Development",items:[{name:"Client Research & Development",href:"lab-client-rd.html"},{name:"Company Research & Development",href:"lab-company-rd.html",lock:true}]},{group:"Project",items:[{name:"Client Project",href:"lab-client-project.html"},{name:"Company Project",href:"lab-company-project.html",lock:true}]}];
