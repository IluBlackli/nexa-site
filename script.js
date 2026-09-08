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

  /* ---------- Marquee: preenche a linha toda + loop infinito ---------- */
  $$('[data-marquee]').forEach(function (track) {
    var base = track.innerHTML;
    var vw = (track.parentElement && track.parentElement.offsetWidth) || window.innerWidth;
    var guard = 0;
    // repete a sequência até uma "metade" cobrir a largura do ecrã
    while (track.scrollWidth < vw && guard < 40) { track.innerHTML += base; guard++; }
    var halfWidth = track.scrollWidth;
    track.innerHTML += track.innerHTML;          // duplica -> translateX(-50%) sem salto
    track.style.animationDuration = Math.max(16, Math.round(halfWidth / 55)) + 's'; // ~55 px/s
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

  /* ---------- Ano no rodapé (dinâmico) ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
