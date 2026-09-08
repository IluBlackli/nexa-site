/* =============================================================
   Nova Grotesk — interações (JavaScript puro)
   Marquee · header inteligente · menu mobile · reveal on scroll
   · count-up · barras de progresso · tilt 3D · smooth scroll
   · tabs de votos · copiar HEX · cursor custom · cookie bar
   ============================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- i18n: PT / ES / EN ---------- */
  var I18N = {
    pt: {
      'mq.sites': 'Sites', 'mq.ia': 'IA', 'mq.auto': 'Automação', 'mq.soft': 'Software', 'mq.inov': 'Inovação',
      'nav.sobre': 'Sobre', 'nav.servicos': 'Serviços', 'nav.trabalhos': 'Trabalhos', 'nav.faq': 'FAQ', 'nav.contacto': 'Contacto',
      'search.ph': 'Pesquisar', 'aria.menu': 'Abrir menu',
      'btn.verTrabalhos': 'Ver trabalhos', 'btn.falar': 'Falar connosco', 'btn.verServicos': 'Ver serviços',
      'hero.eyebrow': 'Estúdio digital',
      'hero.lead': 'Sites, IA, automação e software feitos à medida.',
      'shot.inicio': 'Início', 'shot.h': 'Estúdio<br>digital', 'shot.visitar': 'Visitar site',
      'about.label': 'Sobre nós', 'about.title': 'Quem está por trás da nexa.', 'about.photoPh': 'A tua foto aqui',
      'about.h1': 'Sobre mim',
      'about.p1': 'Sou o Andrés. Formado em Gestão e Programação de Sistemas Informáticos, foi nessa área que comecei a desenvolver a minha experiência em tecnologia e programação.',
      'about.h2': 'A empresa',
      'about.p2': 'Foi a partir daí que nasceu a <span class="brand-em">NEXA</span> — uma empresa focada em tecnologia: desenvolvimento de software, soluções web e inteligência artificial. Do primeiro esboço ao lançamento, cada projeto é acompanhado de perto.',
      'about.p3': 'Combinamos design, desenvolvimento de software, inteligência artificial e automação para criar soluções digitais que fazem a diferença no dia a dia dos negócios.',
      'about.p4': 'Desde um website profissional até uma plataforma completa ou um sistema de atendimento com IA, analisamos cada desafio e procuramos a solução mais eficiente.',
      'about.highlight': 'A sua ideia é o ponto de partida. A tecnologia é o que a transforma em realidade.',
      'serv.label': 'Serviços', 'serv.title': 'O que a nexa faz.', 'serv.tag': 'Serviço',
      'serv.1.title': 'Sites & Web', 'serv.1.desc': 'Websites, lojas online e landing pages — design e desenvolvimento à medida, rápidos e fáceis de gerir.',
      'serv.2.title': 'IA', 'serv.2.desc': 'Chatbots, assistentes e integrações com modelos de IA aplicados aos produtos e ao atendimento.',
      'serv.3.title': 'Automação', 'serv.3.desc': 'Automação de tarefas e fluxos de trabalho, integrações entre ferramentas — menos trabalho manual, menos erros.',
      'serv.4.title': 'Software', 'serv.4.desc': 'Aplicações web, plataformas e dashboards feitos de raiz, à medida de cada negócio.',
      'work.label': 'Trabalhos', 'work.title': 'Alguns projetos que criámos.',
      'work.tag.website': 'Website', 'work.tag.ia': 'IA & Automação',
      'work.1.desc': 'Site institucional para uma empresa de mudanças nacionais e internacionais — serviços, áreas de atuação, portfólio e pedido de orçamento.',
      'work.2.desc': 'Site institucional de um escritório de advocacia — serviços, áreas de atuação, equipa e marcação de consulta, em três idiomas.',
      'work.3.title': 'Assistente virtual', 'work.3.desc': 'Chatbot que responde a clientes 24/7 e encaminha os pedidos para a equipa certa.',
      'work.verSite': 'Ver site →', 'work.verProjeto': 'Ver projeto →',
      'faq.label': 'FAQ', 'faq.title': 'Perguntas frequentes.',
      'faq.q1': 'A nexa trabalha com empresas de qualquer área?',
      'faq.a1': 'Sim. Desenvolvemos soluções personalizadas para diferentes tipos de negócios, adaptando a tecnologia às necessidades de cada empresa.',
      'faq.q2': 'Quanto custa criar um website?',
      'faq.a2': 'O investimento depende da dimensão, funcionalidades e necessidades do projeto. Depois de conhecermos o seu negócio, podemos apresentar uma solução adequada.',
      'faq.q3': 'É possível adicionar inteligência artificial ao meu negócio?',
      'faq.a3': 'Sim. Podemos analisar os seus processos e identificar oportunidades onde a inteligência artificial e a automação podem melhorar a eficiência.',
      'faq.q4': 'Quanto tempo demora um projeto?',
      'faq.a4': 'Cada projeto é diferente. O prazo depende da sua complexidade, funcionalidades e objetivos. Após a primeira análise, apresentamos uma estimativa.',
      'faq.q5': 'Posso pedir apenas um chatbot?',
      'faq.a5': 'Claro. Podemos desenvolver apenas uma solução de IA ou combiná-la com um website, software ou outras automações.',
      'faq.q6': 'Fazem manutenção depois de entregar o projeto?',
      'faq.a6': 'Sim. Podemos continuar a acompanhar o projeto após o lançamento, realizando atualizações, melhorias e suporte.',
      'foot.cta.k': 'Tem um projeto?', 'foot.cta.link': 'Vamos conversar',
      'foot.col.explorar': 'Explorar', 'foot.col.contacto': 'Contacto', 'foot.col.legal': 'Legal', 'foot.marcar': 'Marcar reunião',
      'foot.legal.cookies': 'Política de cookies', 'foot.legal.terms': 'Termos legais', 'foot.legal.privacy': 'Privacidade',
      'modal.title': 'Falar connosco', 'modal.sub': 'Escolhe a forma mais fácil para ti.', 'modal.marcar': 'Marcar reunião', 'modal.email': 'Email', 'modal.close': 'Fechar',
      'cookie.text': 'Usamos cookies para melhorar a sua experiência. <a href="legal.html#cookies">Política de cookies</a>.',
      'cookie.reject': 'Rejeitar tudo', 'cookie.accept': 'Aceitar tudo',
      '_meta.desc': 'A nexa é um estúdio de tecnologia: sites, software à medida, inteligência artificial e automação para empresas.'
    },
    es: {
      'mq.sites': 'Webs', 'mq.ia': 'IA', 'mq.auto': 'Automatización', 'mq.soft': 'Software', 'mq.inov': 'Innovación',
      'nav.sobre': 'Nosotros', 'nav.servicos': 'Servicios', 'nav.trabalhos': 'Proyectos', 'nav.faq': 'FAQ', 'nav.contacto': 'Contacto',
      'search.ph': 'Buscar', 'aria.menu': 'Abrir menú',
      'btn.verTrabalhos': 'Ver proyectos', 'btn.falar': 'Hablemos', 'btn.verServicos': 'Ver servicios',
      'hero.eyebrow': 'Estudio digital',
      'hero.lead': 'Webs, IA, automatización y software a medida.',
      'shot.inicio': 'Inicio', 'shot.h': 'Estudio<br>digital', 'shot.visitar': 'Visitar sitio',
      'about.label': 'Sobre nosotros', 'about.title': 'Quién está detrás de nexa.', 'about.photoPh': 'Tu foto aquí',
      'about.h1': 'Sobre mí',
      'about.p1': 'Soy Andrés. Formado en Gestión y Programación de Sistemas Informáticos, fue en esa área donde empecé a desarrollar mi experiencia en tecnología y programación.',
      'about.h2': 'La empresa',
      'about.p2': 'De ahí nació <span class="brand-em">NEXA</span> — una empresa centrada en tecnología: desarrollo de software, soluciones web e inteligencia artificial. Del primer boceto al lanzamiento, cada proyecto se acompaña de cerca.',
      'about.p3': 'Combinamos diseño, desarrollo de software, inteligencia artificial y automatización para crear soluciones digitales que marcan la diferencia en el día a día de los negocios.',
      'about.p4': 'Desde una web profesional hasta una plataforma completa o un sistema de atención con IA, analizamos cada reto y buscamos la solución más eficiente.',
      'about.highlight': 'Tu idea es el punto de partida. La tecnología es lo que la convierte en realidad.',
      'serv.label': 'Servicios', 'serv.title': 'Lo que hace nexa.', 'serv.tag': 'Servicio',
      'serv.1.title': 'Sitios web', 'serv.1.desc': 'Webs, tiendas online y landing pages — diseño y desarrollo a medida, rápidos y fáciles de gestionar.',
      'serv.2.title': 'IA', 'serv.2.desc': 'Chatbots, asistentes e integraciones con modelos de IA aplicados a los productos y a la atención al cliente.',
      'serv.3.title': 'Automatización', 'serv.3.desc': 'Automatización de tareas y flujos de trabajo, integraciones entre herramientas — menos trabajo manual, menos errores.',
      'serv.4.title': 'Software', 'serv.4.desc': 'Aplicaciones web, plataformas y dashboards hechos desde cero, a medida de cada negocio.',
      'work.label': 'Proyectos', 'work.title': 'Algunos proyectos que hemos creado.',
      'work.tag.website': 'Web', 'work.tag.ia': 'IA & Automatización',
      'work.1.desc': 'Web corporativa para una empresa de mudanzas nacionales e internacionales — servicios, áreas de actuación, portafolio y solicitud de presupuesto.',
      'work.2.desc': 'Web corporativa de un despacho de abogados — servicios, áreas de práctica, equipo y reserva de cita, en tres idiomas.',
      'work.3.title': 'Asistente virtual', 'work.3.desc': 'Chatbot que responde a los clientes 24/7 y deriva las solicitudes al equipo adecuado.',
      'work.verSite': 'Ver sitio →', 'work.verProjeto': 'Ver proyecto →',
      'faq.label': 'FAQ', 'faq.title': 'Preguntas frecuentes.',
      'faq.q1': '¿nexa trabaja con empresas de cualquier sector?',
      'faq.a1': 'Sí. Desarrollamos soluciones personalizadas para distintos tipos de negocio, adaptando la tecnología a las necesidades de cada empresa.',
      'faq.q2': '¿Cuánto cuesta crear una web?',
      'faq.a2': 'La inversión depende del tamaño, las funcionalidades y las necesidades del proyecto. Después de conocer tu negocio, podemos presentarte una solución adecuada.',
      'faq.q3': '¿Es posible añadir inteligencia artificial a mi negocio?',
      'faq.a3': 'Sí. Podemos analizar tus procesos e identificar oportunidades donde la inteligencia artificial y la automatización pueden mejorar la eficiencia.',
      'faq.q4': '¿Cuánto dura un proyecto?',
      'faq.a4': 'Cada proyecto es diferente. El plazo depende de su complejidad, funcionalidades y objetivos. Tras el primer análisis, presentamos una estimación.',
      'faq.q5': '¿Puedo pedir solo un chatbot?',
      'faq.a5': 'Claro. Podemos desarrollar solo una solución de IA o combinarla con una web, software u otras automatizaciones.',
      'faq.q6': '¿Hacéis mantenimiento después de entregar el proyecto?',
      'faq.a6': 'Sí. Podemos seguir acompañando el proyecto tras el lanzamiento, con actualizaciones, mejoras y soporte.',
      'foot.cta.k': '¿Tienes un proyecto?', 'foot.cta.link': 'Hablemos',
      'foot.col.explorar': 'Explorar', 'foot.col.contacto': 'Contacto', 'foot.col.legal': 'Legal', 'foot.marcar': 'Agendar reunión',
      'foot.legal.cookies': 'Política de cookies', 'foot.legal.terms': 'Términos legales', 'foot.legal.privacy': 'Privacidad',
      'modal.title': 'Hablemos', 'modal.sub': 'Elige la forma más fácil para ti.', 'modal.marcar': 'Agendar reunión', 'modal.email': 'Email', 'modal.close': 'Cerrar',
      'cookie.text': 'Usamos cookies para mejorar tu experiencia. <a href="legal.html#cookies">Política de cookies</a>.',
      'cookie.reject': 'Rechazar todo', 'cookie.accept': 'Aceptar todo',
      '_meta.desc': 'nexa es un estudio de tecnología: webs, software a medida, inteligencia artificial y automatización para empresas.'
    },
    en: {
      'mq.sites': 'Websites', 'mq.ia': 'AI', 'mq.auto': 'Automation', 'mq.soft': 'Software', 'mq.inov': 'Innovation',
      'nav.sobre': 'About', 'nav.servicos': 'Services', 'nav.trabalhos': 'Work', 'nav.faq': 'FAQ', 'nav.contacto': 'Contact',
      'search.ph': 'Search', 'aria.menu': 'Open menu',
      'btn.verTrabalhos': 'See work', 'btn.falar': 'Get in touch', 'btn.verServicos': 'See services',
      'hero.eyebrow': 'Digital studio',
      'hero.lead': 'Websites, AI, automation and software, built to measure.',
      'shot.inicio': 'Home', 'shot.h': 'Digital<br>studio', 'shot.visitar': 'Visit site',
      'about.label': 'About us', 'about.title': 'Who’s behind nexa.', 'about.photoPh': 'Your photo here',
      'about.h1': 'About me',
      'about.p1': 'I’m Andrés. With a degree in IT Systems Management and Programming, that’s where I began building my experience in technology and programming.',
      'about.h2': 'The company',
      'about.p2': 'That’s how <span class="brand-em">NEXA</span> was born — a company focused on technology: software development, web solutions and artificial intelligence. From the first sketch to launch, every project is followed closely.',
      'about.p3': 'We combine design, software development, artificial intelligence and automation to build digital solutions that make a real difference to everyday business.',
      'about.p4': 'From a professional website to a full platform or an AI-powered support system, we look at each challenge and find the most efficient solution.',
      'about.highlight': 'Your idea is the starting point. Technology is what turns it into reality.',
      'serv.label': 'Services', 'serv.title': 'What nexa does.', 'serv.tag': 'Service',
      'serv.1.title': 'Websites & Web', 'serv.1.desc': 'Websites, online stores and landing pages — custom design and development, fast and easy to manage.',
      'serv.2.title': 'AI', 'serv.2.desc': 'Chatbots, assistants and integrations with AI models applied to products and customer support.',
      'serv.3.title': 'Automation', 'serv.3.desc': 'Task and workflow automation, integrations between tools — less manual work, fewer errors.',
      'serv.4.title': 'Software', 'serv.4.desc': 'Web apps, platforms and dashboards built from scratch, tailored to each business.',
      'work.label': 'Work', 'work.title': 'A few projects we’ve built.',
      'work.tag.website': 'Website', 'work.tag.ia': 'AI & Automation',
      'work.1.desc': 'Corporate website for a national and international moving company — services, coverage areas, portfolio and quote requests.',
      'work.2.desc': 'Corporate website for a law firm — services, practice areas, team and appointment booking, in three languages.',
      'work.3.title': 'Virtual assistant', 'work.3.desc': 'A chatbot that answers customers 24/7 and routes requests to the right team.',
      'work.verSite': 'View site →', 'work.verProjeto': 'View project →',
      'faq.label': 'FAQ', 'faq.title': 'Frequently asked questions.',
      'faq.q1': 'Does nexa work with companies from any industry?',
      'faq.a1': 'Yes. We build tailored solutions for different kinds of business, adapting the technology to each company’s needs.',
      'faq.q2': 'How much does a website cost?',
      'faq.a2': 'It depends on the size, features and needs of the project. Once we understand your business, we can put together a suitable solution.',
      'faq.q3': 'Can I add artificial intelligence to my business?',
      'faq.a3': 'Yes. We can review your processes and spot opportunities where AI and automation can improve efficiency.',
      'faq.q4': 'How long does a project take?',
      'faq.a4': 'Every project is different. The timeline depends on its complexity, features and goals. After an initial review, we give you an estimate.',
      'faq.q5': 'Can I ask for just a chatbot?',
      'faq.a5': 'Of course. We can build an AI solution on its own or combine it with a website, software or other automations.',
      'faq.q6': 'Do you provide maintenance after delivery?',
      'faq.a6': 'Yes. We can keep supporting the project after launch with updates, improvements and support.',
      'foot.cta.k': 'Have a project?', 'foot.cta.link': 'Let’s talk',
      'foot.col.explorar': 'Explore', 'foot.col.contacto': 'Contact', 'foot.col.legal': 'Legal', 'foot.marcar': 'Book a meeting',
      'foot.legal.cookies': 'Cookie policy', 'foot.legal.terms': 'Legal terms', 'foot.legal.privacy': 'Privacy',
      'modal.title': 'Get in touch', 'modal.sub': 'Pick whatever works best for you.', 'modal.marcar': 'Book a meeting', 'modal.email': 'Email', 'modal.close': 'Close',
      'cookie.text': 'We use cookies to improve your experience. <a href="legal.html#cookies">Cookie policy</a>.',
      'cookie.reject': 'Reject all', 'cookie.accept': 'Accept all',
      '_meta.desc': 'nexa is a technology studio: websites, custom software, artificial intelligence and automation for businesses.'
    }
  };
  var LANGS = ['pt', 'es', 'en'];
  function getLang() {
    var s;
    try { s = localStorage.getItem('lang'); } catch (e) {}
    if (LANGS.indexOf(s) > -1) return s;
    var n = (navigator.language || 'pt').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) > -1 ? n : 'pt';
  }
  function applyLang(lang) {
    if (LANGS.indexOf(lang) < 0) lang = 'pt';
    var d = I18N[lang];
    $$('[data-i18n]').forEach(function (el) {
      var v = d[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    $$('[data-i18n-html]').forEach(function (el) {
      var v = d[el.getAttribute('data-i18n-html')];
      if (v != null) el.innerHTML = v;
    });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split(':');
        var v = d[(p[1] || '').trim()];
        if (v != null) el.setAttribute(p[0].trim(), v);
      });
    });
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : lang;
    var md = document.querySelector('meta[name="description"]');
    if (md && d['_meta.desc']) md.setAttribute('content', d['_meta.desc']);
    try { localStorage.setItem('lang', lang); } catch (e) {}
    $$('[data-langswitch]').forEach(function (s) { s.value = lang; });
    var lf = document.querySelector('.footer-bottom .lang');
    if (lf) lf.textContent = lang.toUpperCase();
  }
  applyLang(getLang());
  $$('[data-langswitch]').forEach(function (s) {
    s.addEventListener('change', function () { applyLang(s.value); });
  });

  /* ---------- Marquee: preenche a linha toda + loop infinito ---------- */
  $$('[data-marquee]').forEach(function (track) {
    var base = track.innerHTML;
    var vw = (track.parentElement && track.parentElement.offsetWidth) || window.innerWidth;
    var guard = 0;
    // repete a sequência até uma "metade" cobrir a largura do ecrã
    while (track.scrollWidth < vw && guard < 40) { track.innerHTML += base; guard++; }
    var halfWidth = track.scrollWidth;
    track.innerHTML += track.innerHTML;          // duplica -> translateX(-50%) sem salto
    track.style.animationDuration = Math.max(30, Math.round(halfWidth / 28)) + 's'; // ~28 px/s (lento)
  });

  /* ---------- Header: fixo; só marca sombra ao rolar ---------- */
  var header = $('[data-header]');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.pageYOffset > 10);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  var burger = $('[data-burger]');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    $$('[data-mobilenav] a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Dropdown "Explore" ---------- */
  $$('[data-dropdown]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Count-up dos números ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var arrow = el.textContent.indexOf('→') > -1 ? '→ ' : '';
    if (reduce) { el.textContent = arrow + target.toFixed(dec); return; }
    var start = performance.now();
    var dur = 1200;
    (function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = arrow + (target * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = arrow + target.toFixed(dec);
    })(start);
  }

  /* ---------- Barras de progresso ---------- */
  function fillBar(el) { el.style.setProperty('--w', el.getAttribute('data-bar') + '%'); }

  var counters = $$('[data-count]');
  var bars = $$('[data-bar]');
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (e.target.hasAttribute('data-count')) animateCount(e.target);
        if (e.target.hasAttribute('data-bar')) fillBar(e.target);
        io2.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { io2.observe(el); });
    bars.forEach(function (el) { io2.observe(el); });
  } else {
    counters.forEach(animateCount);
    bars.forEach(fillBar);
  }

  /* ---------- Preview: tilt 3D ligado ao scroll ---------- */
  var tilt = $('[data-tilt]');
  if (tilt && !reduce) {
    var raf = null;
    var update = function () {
      raf = null;
      var r = tilt.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var progress = Math.min(1, Math.max(0, 1 - r.top / vh));
      var rot = (1 - progress) * 9;   // 9deg -> 0
      var ty = (1 - progress) * 22;   // parallax leve
      tilt.style.transform = 'perspective(1400px) rotateX(' + rot.toFixed(2) + 'deg) translateY(' + ty.toFixed(1) + 'px)';
    };
    window.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Smooth scroll (pill flutuante + âncoras) ---------- */
  function smoothTo(sel) {
    var el = sel && sel.length > 1 ? document.querySelector(sel) : null;
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - 124;
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('[data-scroll]').forEach(function (b) {
    b.addEventListener('click', function () { smoothTo(b.getAttribute('data-scroll')); });
  });
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) { ev.preventDefault(); smoothTo(id); }
    });
  });

  /* ---------- Tabs de votos ---------- */
  $$('[data-tabs]').forEach(function (tabs) {
    var scope = tabs.closest('.votes');
    if (!scope) return;
    tabs.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabs.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        var key = btn.getAttribute('data-tab');
        $$('[data-panel]', scope).forEach(function (p) {
          p.hidden = p.getAttribute('data-panel') !== key;
        });
      });
    });
  });

  /* ---------- Copiar HEX da paleta ---------- */
  var toast;
  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('is-on'); }, 1400);
  }
  $$('[data-hex]').forEach(function (sw) {
    sw.addEventListener('click', function () {
      var hex = sw.getAttribute('data-hex');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hex).then(function () { showToast(hex + ' copiado'); })
          .catch(function () { showToast(hex); });
      } else {
        showToast(hex);
      }
    });
  });

  /* ---------- Cursor custom ---------- */
  if (fine && !reduce) {
    document.body.classList.add('has-cursor');
    var dot = $('.cursor');
    var ring = $('.cursor-ring');
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    var hoverSel = 'a, button, input, .swatch, [data-cursor]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) ring.classList.remove('is-hover');
    });
  }

  /* ---------- Cookie bar ---------- */
  var cookie = $('[data-cookie]');
  if (cookie) {
    var stored = null;
    try { stored = localStorage.getItem('cookie-choice'); } catch (e) {}
    if (!stored) cookie.hidden = false;
    var choose = function (v) {
      try { localStorage.setItem('cookie-choice', v); } catch (e) {}
      cookie.hidden = true;
    };
    var rej = $('[data-cookie-reject]', cookie);
    var acc = $('[data-cookie-accept]', cookie);
    if (rej) rej.addEventListener('click', function () { choose('reject'); });
    if (acc) acc.addEventListener('click', function () { choose('accept'); });
  }

  /* ---------- Modal "Falar connosco" ---------- */
  var cmodal = $('[data-cmodal]');
  if (cmodal) {
    var lastFocus = null;
    var openModal = function (trigger) {
      lastFocus = trigger || document.activeElement;
      cmodal.hidden = false;
      document.body.classList.add('cmodal-open');
      var first = cmodal.querySelector('.cmodal__opt');
      if (first) first.focus();
    };
    var closeModal = function () {
      cmodal.hidden = true;
      document.body.classList.remove('cmodal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    $$('[data-contact]').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        openModal(btn);
        document.body.classList.remove('nav-open');
      });
    });
    $$('[data-cmodal-close]', cmodal).forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !cmodal.hidden) closeModal();
    });
    // fechar ao escolher uma opção
    $$('.cmodal__opt', cmodal).forEach(function (a) {
      a.addEventListener('click', function () { setTimeout(closeModal, 60); });
    });
  }

  /* ---------- Ano no rodapé (dinâmico) ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
