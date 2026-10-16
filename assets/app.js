(function () {
  "use strict";

  if ("scrollRestoration" in history) { try { history.scrollRestoration = "manual"; } catch (e) {} }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.7-7-11a7 7 0 1 1 14 0c0 5.3-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';
  var ROUTE = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.2 17.3 15.8 6.7"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.5V12l3 1.8"/></svg>';
  var PLANE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round"/><path d="M22 2 15 22l-4-9-9-4z" fill="#D9481F" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>';

  var ICO = {
    plane:'<svg viewBox="0 0 24 24"><path d="M21 15.5 3 12l18-3.5"/><path d="M21 15.5 15 21l-1.6-5.6"/><path d="M21 8.5 15 3l-1.6 5.6"/></svg>',
    lake:'<svg viewBox="0 0 24 24"><path d="M12 4v6"/><path d="M9.5 6.5 12 4l2.5 2.5"/><path d="M4 14c1.6 0 2.4-1.2 4-1.2S10.4 14 12 14s2.4-1.2 4-1.2S18.4 14 20 14"/><path d="M4 18c1.6 0 2.4-1.2 4-1.2S10.4 18 12 18s2.4-1.2 4-1.2S18.4 18 20 18"/></svg>',
    waterfall:'<svg viewBox="0 0 24 24"><path d="M6 4h12"/><path d="M8 4v6M12 4v9M16 4v6"/><path d="M4 16c1.6 0 2.4-1.4 4-1.4S10.4 16 12 16s2.4-1.4 4-1.4S18.4 16 20 16"/><path d="M4 20c1.6 0 2.4-1.4 4-1.4S10.4 20 12 20s2.4-1.4 4-1.4S18.4 20 20 20"/></svg>',
    mountain:'<svg viewBox="0 0 24 24"><path d="M3 20l6-11 4 7 2.5-4L21 20z"/><circle cx="8.5" cy="6" r="2"/></svg>',
    coffee:'<svg viewBox="0 0 24 24"><path d="M4 8h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 9h2.5a2.5 2.5 0 0 1 0 5H16"/><path d="M7 3v2M10.5 3v2M14 3v2"/></svg>',
    food:'<svg viewBox="0 0 24 24"><path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M7.5 9c0-2.5 2-4.5 4.5-4.5S16.5 6.5 16.5 9"/><path d="M6 20h12"/></svg>',
    temple:'<svg viewBox="0 0 24 24"><path d="M12 3l8 5H4z"/><path d="M5 8v12M19 8v12"/><path d="M4 20h16"/><path d="M9.5 20v-5h5v5"/></svg>',
    market:'<svg viewBox="0 0 24 24"><path d="M4 9l2-5h12l2 5"/><path d="M4 9a2.6 2.6 0 0 0 5.3 0 2.6 2.6 0 0 0 5.4 0 2.6 2.6 0 0 0 5.3 0"/><path d="M6 12v8h12v-8"/></svg>',
    tree:'<svg viewBox="0 0 24 24"><path d="M12 3l5 8h-3l4 5H6l4-5H7z"/><path d="M12 16v5"/></svg>',
    tent:'<svg viewBox="0 0 24 24"><path d="M12 4 3 20h18z"/><path d="M12 20V9l-3 4M12 9l3 4"/></svg>',
    camera:'<svg viewBox="0 0 24 24"><path d="M4 8h3l1.5-3h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.3"/></svg>',
    church:'<svg viewBox="0 0 24 24"><path d="M12 2v5M9.5 4.5h5"/><path d="M5 21V11l7-4 7 4v10"/><path d="M10 21v-5h4v5"/></svg>',
    hotel:'<svg viewBox="0 0 24 24"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18"/><path d="M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>',
    home:'<svg viewBox="0 0 24 24"><path d="M4 10 12 4l8 6"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></svg>',
    bridge:'<svg viewBox="0 0 24 24"><path d="M2 16h20"/><path d="M4 16V7M20 16V7"/><path d="M4 13c3-2.6 13-2.6 16 0"/><path d="M8 16v-2.6M12 16v-3.4M16 16v-2.6"/></svg>',
    flower:'<svg viewBox="0 0 24 24"><circle cx="12" cy="11" r="2.4"/><path d="M12 8.6V6M12 13.4V16M9.6 11H7M14.4 11H17M10.4 9.4 8.7 7.7M13.6 12.6l1.7 1.7M13.6 9.4l1.7-1.7M10.4 12.6l-1.7 1.7"/></svg>',
    pin:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-5.7-7-11a7 7 0 1 1 14 0c0 5.3-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>'
  };

  var KEYS = [
    ["plane", /s\u00e2n bay|m\u00e1y bay|\u0111\u01b0\u1eddng bay|h\u1ea1 c\u00e1nh|kh\u1edfi h\u00e0nh|chia tay|v\u1ec1 tp/],
    ["waterfall", /th\u00e1c/],
    ["coffee", /c\u00e0 ph\u00ea|caf|coffee/],
    ["church", /ch\u00f9a|nh\u00e0 th\u1edd|th\u00e1nh|\u0111\u1ee9c m\u1eb9|\u0111\u1ec1n |t\u01b0\u1ee3ng ph\u1eadt|la h\u00e1n|linh \u1ee9ng/],
    ["hotel", /kh\u00e1ch s\u1ea1n|nh\u1eadn ph\u00f2ng|tr\u1ea3 ph\u00f2ng|homestay|resort/],
    ["home", /nh\u00e0 r\u00f4ng|nh\u00e0 s\u00e0n|nh\u00e0 g\u1ed7|nh\u00e0 c\u1ed5/],
    ["market", /ch\u1ee3|ph\u1ed1 \u0111\u00eam/],
    ["food", /\u0111i\u1ec3m t\u00e2m|\u0103n (tr\u01b0a|s\u00e1ng|t\u1ed1i|v\u1eb7t|u\u1ed1ng)|m\u00f3n \u0103n|g\u00e0|c\u01a1m|ph\u1edf|l\u1ea9u|b\u00e1nh|b\u00fan|n\u01b0\u1edbng|\u1ea9m th\u1ef1c|\u0111\u1eb7c s\u1ea3n|qu\u00e1n/],
    ["lake", /h\u1ed3|su\u1ed1i|\u0111\u1ea7m|bi\u1ec3n/],
    ["tree", /r\u1eebng|th\u00f4ng|ch\u00e8|v\u01b0\u1eddn|hoa|tr\u00e0|\u0111\u1ed3i/],
    ["mountain", /n\u00fai|\u0111\u00e8o|\u0111\u1ec9nh/],
    ["bridge", /c\u1ea7u/],
    ["tent", /c\u1eafm tr\u1ea1i|glamping|tr\u1ea1i|qua \u0111\u00eam/],
    ["camera", /s\u0103n m\u00e2y|ng\u1eafm|ch\u1ee5p|view|\u1ea3nh/]
  ];

  function pickIcon(t) {
    t = (t || "").toLowerCase();
    var best = "", pos = Infinity;
    KEYS.forEach(function (k) {
      var m = t.search(k[1]);
      if (m >= 0 && m < pos) { pos = m; best = k[0]; }
    });
    return best || "pin";
  }

  var days = window.TOUR_DAYS || [];
  var heroRoute = window.HERO_ROUTE || [];

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hoverFine = window.matchMedia("(hover: hover) and (min-width:861px)").matches;
  var hasGSAP = !reduce && !!window.gsap && !!window.ScrollTrigger;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  function dirURL(q) { return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q); }
  function mapURL(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function r1(v) { return Math.round(v * 10) / 10; }

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

  var flights = [];
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
        '<div class="stops-wrap">' +
          '<svg class="flight" aria-hidden="true" preserveAspectRatio="none"></svg>' +
          '<div class="plane" aria-hidden="true">' + PLANE + '</div>' +
          '<ol class="stops"></ol>' +
        '</div>';

      var ol = sec.querySelector(".stops");
      day.stops.forEach(function (st, i) {
        var side = i % 2 === 0 ? "left" : "right";
        var key = pickIcon(st.title);
        var icon = ICO[key] || ICO.pin;
        var li = document.createElement("li");
        li.className = "stop reveal";
        li.setAttribute("data-side", side);
        li.setAttribute("data-ic", key);
        li.style.transitionDelay = (Math.min(i, 4) * 60) + "ms";
        li.innerHTML =
          '<span class="node" aria-hidden="true">' +
            '<span class="node__ring"></span>' +
            '<span class="node__ico">' + icon + '</span>' +
          '</span>' +
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

      var wrap = sec.querySelector(".stops-wrap");
      wrap.id = "fw-" + day.id;
      host.appendChild(sec);
      flights.push(wrap);
    });
  }

  var uidSeed = 0;

  function flightNodes(wrap) {
    var out = [];
    Array.prototype.forEach.call(wrap.querySelectorAll(".stop"), function (stop) {
      var nd = stop.querySelector(".node");
      if (!nd) return;
      out.push({
        el: nd,
        x: stop.offsetLeft + nd.offsetLeft + nd.offsetWidth / 2,
        y: stop.offsetTop + nd.offsetTop + nd.offsetHeight / 2
      });
    });
    return out;
  }

  function crPath(p) {
    if (p.length < 2) return "";
    var d = "M" + r1(p[0].x) + " " + r1(p[0].y);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p[i + 1];
      var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += " C" + r1(c1x) + " " + r1(c1y) + " " + r1(c2x) + " " + r1(c2y) + " " + r1(p2.x) + " " + r1(p2.y);
    }
    return d;
  }

  function buildFlight(wrap) {
    var nodes = flightNodes(wrap);
    if (nodes.length < 2) return null;
    var svg = wrap.querySelector(".flight");
    var plane = wrap.querySelector(".plane");
    if (!svg || !plane) return null;

    var W = wrap.clientWidth, H = wrap.clientHeight;
    var A = W < 700 ? 10 : Math.min(58, W * 0.052);
    var uid = "fp" + (++uidSeed);

    var pts = [];
    nodes.forEach(function (n, i) {
      pts.push({ x: n.x, y: n.y });
      var nx = nodes[i + 1];
      if (!nx) return;
      var gap = nx.y - n.y;
      var s = (i % 2 ? 1 : -1);
      if ((i + 1) % 3 === 0) {
        pts.push({ x: n.x + s * A * 0.68, y: n.y + gap * 0.14 });
        pts.push({ x: n.x + s * A * 0.96, y: n.y + gap * 0.38 });
        pts.push({ x: n.x + s * A * 0.52, y: n.y + gap * 0.60 });
        pts.push({ x: n.x, y: n.y + gap * 0.73 });
      } else {
        pts.push({ x: n.x - s * A * 0.76, y: n.y + gap * 0.34 });
        pts.push({ x: n.x + s * A * 0.76, y: n.y + gap * 0.66 });
      }
    });
    var d = crPath(pts);

    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="' + uid + 'g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#2FA36B"/>' +
          '<stop offset="0.42" stop-color="#5FC0DE"/>' +
          '<stop offset="0.74" stop-color="#F2A93B"/>' +
          '<stop offset="1" stop-color="#D9481F"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<path class="flight__glow" d="' + d + '"/>' +
      '<path class="flight__base" d="' + d + '"/>' +
      '<path class="flight__prog" d="' + d + '" stroke="url(#' + uid + 'g)"/>' +
      '<path class="flight__tail2" d="' + d + '"/>' +
      '<path class="flight__tail" d="' + d + '"/>';

    var base = svg.querySelector(".flight__base");
    var prog = svg.querySelector(".flight__prog");
    var glow = svg.querySelector(".flight__glow");
    var tail = svg.querySelector(".flight__tail");
    var tail2 = svg.querySelector(".flight__tail2");
    var L = base.getTotalLength();
    prog.style.strokeDasharray = L;
    glow.style.strokeDasharray = L;
    prog.style.strokeDashoffset = L;
    glow.style.strokeDashoffset = L;

    var step = Math.max(2, L / 1400);
    var samples = [];
    for (var s2 = 0; s2 <= L; s2 += step) samples.push(base.getPointAtLength(s2));
    nodes.forEach(function (n) {
      var best = Infinity, bl = 0;
      for (var k = 0; k < samples.length; k++) {
        var dx = samples[k].x - n.x, dy = samples[k].y - n.y, dd = dx * dx + dy * dy;
        if (dd < best) { best = dd; bl = k * step; }
      }
      n.len = bl; n.hit = false;
    });

    var tailLen = Math.min(200, L * 0.16);
    var tailLen2 = Math.min(460, L * 0.32);
    tail.style.strokeDasharray = tailLen + " " + (L + 20);
    tail2.style.strokeDasharray = tailLen2 + " " + (L + 20);
    tail.style.strokeDashoffset = tailLen;
    tail2.style.strokeDashoffset = tailLen2;

    var f = {
      wrap: wrap, svg: svg, plane: plane, base: base, prog: prog, glow: glow,
      tail: tail, tail2: tail2, nodes: nodes, L: L, uid: uid,
      fixed: false, tailLen: tailLen, tailLen2: tailLen2, lastPuff: 0
    };
    wrap.__flight = f;
    return f;
  }

  function staticFlight(f) {
    f.fixed = true;
    f.prog.style.strokeDashoffset = 0;
    f.glow.style.strokeDashoffset = 0;
    f.tail.style.display = "none";
    f.tail2.style.display = "none";
    f.plane.style.display = "none";
    f.nodes.forEach(function (n) { n.el.classList.add("on"); });
  }

  function renderFlight(f, p) {
    if (f.fixed) return;
    var dist = p * f.L;
    var pt = f.base.getPointAtLength(dist);
    var pt2 = f.base.getPointAtLength(Math.min(f.L, dist + 3));
    var ang = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
    f.plane.style.transform = "translate(" + r1(pt.x) + "px," + r1(pt.y) + "px) rotate(" + r1(ang + 45) + "deg)";
    f.prog.style.strokeDashoffset = (f.L - dist);
    f.glow.style.strokeDashoffset = (f.L - dist);
    f.tail.style.strokeDashoffset = (f.tailLen - dist);
    f.tail2.style.strokeDashoffset = (f.tailLen2 - dist);

    if (dist - f.lastPuff > 120 && dist > 40) {
      f.lastPuff = dist;
      spawnPuff(f, pt.x, pt.y);
    }

    f.nodes.forEach(function (n) {
      if (!n.hit && dist >= n.len - 0.5) { n.hit = true; touchNode(n); }
      else if (n.hit && dist < n.len - 10) { n.hit = false; n.el.classList.remove("on"); }
    });
  }

  function spawnPuff(f, x, y) {
    if (document.querySelectorAll(".puff").length > 40) return;
    var el = document.createElement("span");
    el.className = "puff";
    el.style.left = x + "px";
    el.style.top = y + "px";
    f.wrap.appendChild(el);
    if (hasGSAP) {
      gsap.fromTo(el, { scale: 0.55, opacity: 0.5 }, {
        scale: gsap.utils.random(1.8, 3.1), opacity: 0,
        x: gsap.utils.random(-18, 18), y: gsap.utils.random(-8, 18),
        duration: gsap.utils.random(0.9, 1.4), ease: "power1.out",
        onComplete: function () { el.remove(); }
      });
    } else {
      requestAnimationFrame(function () { el.classList.add("puff--go"); });
      setTimeout(function () { el.remove(); }, 1300);
    }
  }

  function touchNode(n) {
    n.el.classList.add("on");
    if (!hasGSAP) return;
    var ring = n.el.querySelector(".node__ring");
    var ico = n.el.querySelector(".node__ico");
    gsap.killTweensOf([n.el, ring, ico]);
    gsap.fromTo(n.el, { scale: 1 }, { scale: 1.3, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 });
    if (ico) gsap.fromTo(ico, { rotateY: -180, scale: 0.5, opacity: 0 }, { rotateY: 0, scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)" });
    if (ring) {
      gsap.fromTo(ring, { scale: 0.4, opacity: 0.95 }, { scale: 3.4, opacity: 0, duration: 0.9, ease: "power3.out" });
      var ring2 = document.createElement("span");
      ring2.className = "node__ring node__ring--2";
      n.el.appendChild(ring2);
      gsap.fromTo(ring2, { scale: 0.4, opacity: 0.75 }, { scale: 2.5, opacity: 0, duration: 0.75, delay: 0.12, ease: "power3.out", onComplete: function () { ring2.remove(); } });
    }
    for (var i = 0; i < 7; i++) {
      var s = document.createElement("span");
      s.className = "spark";
      n.el.appendChild(s);
      var a = (Math.PI * 2 * i) / 7 + Math.random() * 0.6;
      var rr = gsap.utils.random(24, 46);
      gsap.fromTo(s, { x: 0, y: 0, opacity: 1, scale: 1 }, {
        x: Math.cos(a) * rr, y: Math.sin(a) * rr, opacity: 0, scale: 0.2,
        duration: gsap.utils.random(0.55, 0.95), ease: "power2.out",
        onComplete: (function (el) { return function () { el.remove(); }; })(s)
      });
    }
  }

  function buildFlights() {
    flights.forEach(function (wrap) {
      var f = buildFlight(wrap);
      if (!f) return;
      if (reduce) { staticFlight(f); renderFlight(f, 0); return; }
      if (!hasGSAP) return;
      var o = { p: 0 };
      wrap.__o = o;
      gsap.to(o, {
        p: 1, ease: "none",
        scrollTrigger: { trigger: wrap, start: "top 74%", end: "bottom 62%", scrub: 0.5 },
        onUpdate: function () { var ff = wrap.__flight; if (ff) renderFlight(ff, o.p); }
      });
      renderFlight(f, 0);
    });
  }

  var rT;
  function refreshFlights() {
    clearTimeout(rT);
    rT = setTimeout(function () {
      flights.forEach(function (wrap) {
        var p = wrap.__o ? wrap.__o.p : (wrap.__p || 0);
        var f = buildFlight(wrap);
        if (!f) return;
        if (reduce) { staticFlight(f); renderFlight(f, 0); return; }
        if (!hasGSAP) { renderFlight(f, wrap.__p || 0); return; }
        renderFlight(f, p);
      });
      if (hasGSAP) ScrollTrigger.refresh();
    }, 160);
  }

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
      start: "top 92%",
      onEnter: function (batch) {
        batch.forEach(function (el) { el.classList.add("in"); });
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

    if (hoverFine) {
      gsap.utils.toArray(".card__media img").forEach(function (img) {
        gsap.fromTo(img, { yPercent: -6 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: img.closest(".stop"), start: "top bottom", end: "bottom top", scrub: true }
        });
        gsap.set(img, { scale: 1.18 });
      });
    }

    gsap.utils.toArray(".stat b").forEach(function (el) {
      var raw = el.textContent;
      var m = raw.match(/^([^\d]*)(\d[\d.,]*)(.*)$/);
      if (!m) return;
      var pre = m[1], numStr = m[2], suf = m[3];
      var hasDot = numStr.indexOf(".") !== -1;
      var target = parseInt(numStr.replace(/\./g, ""), 10);
      if (isNaN(target)) return;
      var obj = { v: 0 };
      el.textContent = pre + "0" + suf;
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

    buildFlights();

    onImagesReady(function () { ScrollTrigger.refresh(); refreshFlights(); });
    window.addEventListener("load", function () { ScrollTrigger.refresh(); refreshFlights(); setTimeout(function () { ScrollTrigger.refresh(); }, 350); });
    window.addEventListener("resize", refreshFlights);
    window.addEventListener("orientationchange", refreshFlights);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { refreshFlights(); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { io.observe(el); });

    buildFlights();

    if (!reduce) {
      var rafF = 0;
      var runFlights = function () {
        var vh = window.innerHeight;
        var sy = window.scrollY || document.documentElement.scrollTop;
        flights.forEach(function (wrap) {
          var f = wrap.__flight;
          if (!f || f.fixed) return;
          var rect = wrap.getBoundingClientRect();
          var top = rect.top + sy;
          var start = top - vh * 0.74;
          var end = top + wrap.offsetHeight - vh * 0.62;
          var p = end > start ? Math.min(1, Math.max(0, (sy - start) / (end - start))) : 1;
          wrap.__p = p;
          renderFlight(f, p);
        });
      };
      var onFly = function () { if (rafF) return; rafF = requestAnimationFrame(function () { rafF = 0; runFlights(); }); };
      window.addEventListener("scroll", onFly, { passive: true });
      window.addEventListener("resize", onFly);
      window.addEventListener("load", onFly);
      runFlights();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(onFly);
    }

    window.addEventListener("resize", refreshFlights);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { refreshFlights(); });
  }

  var prog = document.getElementById("progress");
  if (prog) {
    var pp = document.createElement("span");
    pp.className = "progress__plane";
    pp.innerHTML = PLANE;
    prog.appendChild(pp);
  }

  var nav = document.getElementById("nav");
  var hero = document.querySelector(".hero");
  var tabbar = document.getElementById("tabbar");
  var tabs = tabbar ? Array.prototype.slice.call(tabbar.querySelectorAll("a")) : [];
  var tabTargets = tabs.map(function (t) { return document.getElementById(t.dataset.target); });

  var hud = null, stopList = [];
  if (document.querySelector(".day")) {
    hud = document.createElement("div");
    hud.className = "hud";
    hud.id = "hud";
    hud.innerHTML = '<span class="hud__ico">' + PLANE + '</span><span class="hud__txt"><b></b><i></i></span>';
    document.body.appendChild(hud);
    Array.prototype.forEach.call(document.querySelectorAll(".day"), function (day, di) {
      var stops = day.querySelectorAll(".stop");
      var dnum = day.querySelector(".day-num") ? day.querySelector(".day-num").textContent : (di + 1);
      Array.prototype.forEach.call(stops, function (st, si) {
        var h3 = st.querySelector(".card__body h3");
        stopList.push({ el: st, di: di, si: si, total: stops.length, dnum: dnum, name: h3 ? h3.textContent : "" });
      });
    });
  }
  function measureStops() {
    var sy = window.scrollY || document.documentElement.scrollTop;
    stopList.forEach(function (s) { s.top = s.el.getBoundingClientRect().top + sy; });
  }

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (h > 0 ? (y / h * 100) : 0) + "%";
    var past = hero ? y > hero.offsetHeight - 120 : y > 200;
    nav.classList.toggle("show", past);
    if (tabbar) tabbar.classList.toggle("show", past);
    var mark = y + window.innerHeight * 0.4;
    var idx = 0;
    tabTargets.forEach(function (el, i) { if (el && (el.getBoundingClientRect().top + y) <= mark) idx = i; });
    tabs.forEach(function (t, i) { t.classList.toggle("active", i === idx); });

    if (hud) {
      var cur = null;
      var cmark = y + window.innerHeight * 0.42;
      for (var i = 0; i < stopList.length; i++) {
        if (stopList[i].top <= cmark) cur = stopList[i]; else break;
      }
      var inTimeline = cur && y > (hero ? hero.offsetHeight - 200 : 150);
      hud.classList.toggle("show", !!inTimeline);
      if (inTimeline) {
        hud.querySelector("b").textContent = "Ng\u00e0y " + cur.dnum + " \u00b7 " + (cur.si + 1) + "/" + cur.total;
        hud.querySelector("i").textContent = cur.name;
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { measureStops(); onScroll(); });
  measureStops();
  onScroll();
})();
