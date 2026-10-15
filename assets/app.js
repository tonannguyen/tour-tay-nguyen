(function () {
  "use strict";

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.7-7-11a7 7 0 1 1 14 0c0 5.3-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var ROUTE = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.2 17.3 15.8 6.7"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.5V12l3 1.8"/></svg>';

  var days = window.TOUR_DAYS || [];
  var heroRoute = window.HERO_ROUTE || [];

  function dirURL(q) { return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q); }
  function mapURL(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }

  var routeEl = document.getElementById("route");
  if (routeEl && heroRoute.length) {
    heroRoute.forEach(function (p, i, a) {
      var s = document.createElement("span");
      s.className = "route__item";
      s.textContent = p;
      routeEl.appendChild(s);
      if (i < a.length - 1) {
        var ic = document.createElement("i");
        ic.className = "route__sep";
        ic.textContent = "\u2726";
        routeEl.appendChild(ic);
      }
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".step"), function (el) {
    if (el.dataset.map) el.href = mapURL(el.dataset.map);
  });

  var host = document.getElementById("days");
  if (host) {
    days.forEach(function (day) {
      var sec = document.createElement("section");
      sec.className = "day";
      sec.id = day.id;
      sec.innerHTML =
        '<div class="day-head reveal">' +
          '<div class="day-num">' + day.n + '</div>' +
          '<div class="day-meta">' +
            '<span class="k">' + day.k + '</span>' +
            '<h2>' + day.t + '</h2>' +
            '<p>' + day.s + ' \u00b7 ' + day.stops.length + ' \u0111i\u1ec3m d\u1eebng</p>' +
          '</div>' +
        '</div>' +
        '<div class="stops-wrap"><span class="rail" aria-hidden="true"></span><ol class="stops"></ol></div>';

      var ol = sec.querySelector(".stops");
      day.stops.forEach(function (st, i) {
        var side = i % 2 === 0 ? "left" : "right";
        var li = document.createElement("li");
        li.className = "stop reveal";
        li.setAttribute("data-side", side);
        li.style.transitionDelay = (Math.min(i, 4) * 70) + "ms";
        li.innerHTML =
          '<span class="node" aria-hidden="true"></span>' +
          '<article class="card">' +
            '<div class="card__media">' +
              '<span class="badge">' + CLOCK + st.time + '</span>' +
              '<span class="media__zoom"><img src="images/' + st.img + '" alt="' + st.title + '" loading="lazy" decoding="async" onerror="this.closest(\'.card__media\').style.background=\'linear-gradient(135deg,#2FA36B,#5FC0DE)\';this.style.display=\'none\'"></span>' +
            '</div>' +
            '<div class="card__body">' +
              '<h3>' + st.title + '</h3>' +
              '<p>' + st.d + '</p>' +
              '<div class="actions">' +
                '<a class="btn btn--go" href="' + dirURL(st.q) + '" target="_blank" rel="noopener">' + ROUTE + 'Ch\u1ec9 \u0111\u01b0\u1eddng</a>' +
                '<a class="btn btn--map" href="' + mapURL(st.q) + '" target="_blank" rel="noopener">' + ARROW + 'B\u1ea3n \u0111\u1ed3</a>' +
              '</div>' +
              '<div class="stop__place">' + ARROW + st.q + '</div>' +
            '</div>' +
          '</article>';
        ol.appendChild(li);
      });

      host.appendChild(sec);
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hoverFine = window.matchMedia("(hover: hover) and (min-width:861px)").matches;
  var hasGSAP = !reduce && !!window.gsap && !!window.ScrollTrigger;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  function onImagesReady(fn) {
    var imgs = Array.prototype.slice.call(document.images);
    var pending = imgs.filter(function (im) { return !im.complete; });
    if (!pending.length) { fn(); return; }
    var n = pending.length;
    pending.forEach(function (im) {
      var done = function () { if (--n === 0) fn(); };
      im.addEventListener("load", done);
      im.addEventListener("error", done);
    });
    setTimeout(fn, 4000);
  }

  if (hasGSAP) {
    ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      onEnter: function (batch) {
        batch.forEach(function (el, i) {
          setTimeout(function () { el.classList.add("in"); }, i * 80);
        });
      }
    });

    var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .fromTo(".hero .eyebrow", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo(".hero__title .l__in", { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: 0.12 }, "-=0.35")
      .fromTo("#route .route__item", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, "-=0.6")
      .fromTo("#route .route__sep", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12 }, "-=0.8")
      .fromTo(".hero__lead", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.55")
      .fromTo(".hero__meta .chip", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.55")
      .fromTo(".scrollcue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
      .add(function () {
        gsap.set(".hero__meta .chip, .hero .eyebrow, .hero__lead, #route .route__item, #route .route__sep, .hero__title .l__in", { clearProps: "all" });
      });

    gsap.to(".hero__bg", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__in", { yPercent: -8, opacity: 0.3, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".scrollcue", { opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "25% top", scrub: true } });

    gsap.utils.toArray(".leaf").forEach(function (lf, i) {
      gsap.to(lf, {
        y: gsap.utils.random(-22, 22),
        x: gsap.utils.random(-16, 16),
        rotation: gsap.utils.random(-25, 25),
        duration: gsap.utils.random(3.5, 6.5),
        repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3
      });
    });

    var heroEl = document.querySelector(".hero");
    if (heroEl && window.matchMedia("(hover: hover)").matches) {
      var bgEl = document.querySelector(".hero__bg");
      var glowEl = document.querySelector(".hero__glow");
      if (bgEl && glowEl) {
        var qbgx = gsap.quickTo(bgEl, "x", { duration: 0.9, ease: "power2.out" });
        var qbgy = gsap.quickTo(bgEl, "y", { duration: 0.9, ease: "power2.out" });
        var qgx = gsap.quickTo(glowEl, "x", { duration: 1.3, ease: "power2.out" });
        var qgy = gsap.quickTo(glowEl, "y", { duration: 1.3, ease: "power2.out" });
        heroEl.addEventListener("pointermove", function (e) {
          var cx = e.clientX / window.innerWidth - 0.5;
          var cy = e.clientY / window.innerHeight - 0.5;
          qbgx(cx * -26); qbgy(cy * -20);
          qgx(cx * 44); qgy(cy * 44);
        });
      }
    }

    gsap.fromTo(".step__dot", { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)", stagger: 0.1, clearProps: "transform",
      scrollTrigger: { trigger: ".stepper", start: "top 82%", once: true }
    });

    gsap.utils.toArray(".stops-wrap").forEach(function (w) {
      var rail = w.querySelector(".rail");
      if (rail) {
        gsap.fromTo(rail, { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: w, start: "top 80%", end: "bottom 72%", scrub: 0.6 }
        });
      }
    });

    gsap.utils.toArray(".stop .node").forEach(function (n) {
      gsap.fromTo(n, { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: n.closest(".stop"), start: "top 85%", once: true } });
    });

    gsap.utils.toArray(".card__media img").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: img.closest(".stop"), start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.set(img, { scale: 1.18 });
    });

    gsap.utils.toArray(".stat b").forEach(function (el) {
      var raw = el.textContent;
      var m = raw.match(/^([^\d]*)(\d[\d.,]*)(.*)$/);
      if (!m) return;
      var pre = m[1], numStr = m[2], suf = m[3];
      var hasDot = numStr.indexOf(".") !== -1;
      var target = parseInt(numStr.replace(/\./g, ""), 10);
      if (isNaN(target)) return;
      var obj = { v: 0 };
      el.textContent = pre + (hasDot ? "0" : "0") + suf;
      gsap.to(obj, {
        v: target, duration: 1.4, ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: function () {
          var val = hasDot ? Math.round(obj.v).toLocaleString("de-DE") : Math.round(obj.v);
          el.textContent = pre + val + suf;
        }
      });
    });

    if (hoverFine) {
      gsap.utils.toArray(".card").forEach(function (card) {
        var rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power2.out" });
        var ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power2.out" });
        var ty = gsap.quickTo(card, "y", { duration: 0.5, ease: "power2.out" });
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 8); rx(-py * 8); ty(-5);
        });
        card.addEventListener("pointerleave", function () { rx(0); ry(0); ty(0); });
      });
    }

    gsap.fromTo(".foot-list li", { y: 14, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.06,
      scrollTrigger: { trigger: "footer", start: "top 82%", once: true }
    });
    gsap.fromTo("footer h3, footer h4, footer .wrap > div > p", { y: 16, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.05,
      scrollTrigger: { trigger: "footer", start: "top 85%", once: true }
    });

    onImagesReady(function () { ScrollTrigger.refresh(); });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { io.observe(el); });
  }

  var nav = document.getElementById("nav");
  var prog = document.getElementById("progress");
  var hero = document.querySelector(".hero");
  var tabbar = document.getElementById("tabbar");
  var tabs = tabbar ? Array.prototype.slice.call(tabbar.querySelectorAll("a")) : [];
  var tabTargets = tabs.map(function (t) { return document.getElementById(t.dataset.target); });

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (y / h * 100) : 0) + "%";
    var past = hero ? y > hero.offsetHeight - 120 : y > 200;
    nav.classList.toggle("show", past);
    if (tabbar) tabbar.classList.toggle("show", past);
    var mark = y + window.innerHeight * 0.4;
    var idx = 0;
    tabTargets.forEach(function (el, i) { if (el && (el.getBoundingClientRect().top + y) <= mark) idx = i; });
    tabs.forEach(function (t, i) { t.classList.toggle("active", i === idx); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
