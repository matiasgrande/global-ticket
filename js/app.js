/* Global Ticket — prototipo. Datos de EJEMPLO, tasa de EJEMPLO. Pagos simulados. */
(function () {
  "use strict";
  const RATE = 875.65;            // Tasa BCV de ejemplo (Bs por USD). En produccion: tasa del dia, congelada en la orden.
  const P2P_REF = 912.4;         // Solo referencia en el panel. Nunca se promedia ni se usa para cobrar.

  /* ---------- formato ---------- */
  function fmt(n, d) {
    const s = Math.abs(n).toFixed(d);
    const [i, f] = s.split(".");
    const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (n < 0 ? "-" : "") + g + (f ? "," + f : "");
  }
  const usd = (n) => "USD " + (Number.isInteger(n) ? fmt(n, 0) : fmt(n, 2));
  const bs = (n) => "Bs " + fmt(n, 2);
  const toBs = (u) => Math.round(u * RATE * 100) / 100;

  /* ---------- datos de ejemplo ---------- */
  const A = (g, v, a, left) => [
    { id: "gen", name: "General", note: "De pie, cerca del escenario. Entras y te mueves libre.", usd: g, left: left[0] },
    { id: "vip", name: "VIP", note: "Zona frontal con mesa alta y barra propia.", usd: v, left: left[1] },
    { id: "alta", name: "Terraza alta", note: "Nivel superior con vista completa. Con asiento.", usd: a, left: left[2] },
  ];
  const EVENTS = [
    {
      id: "cacho", cat: "Comedia", art: "cacho", artText: "Ya casi llego", title: "Cacho Zapata: Ya Casi Llego",
      tag: "Gira de comedia", age: "+16", refund: "full",
      desc: "Cacho Zapata (artista de ejemplo) vuelve con su show nuevo: la cola del banco, el cuñado con el WhatsApp y el apagón en pleno cumpleaños. Dos horas, sin intermedios largos.",
      sessions: [
        { id: "mgta", city: "Margarita", venue: "Tibisay Margarita · Sala Costa Azul", addr: "Av. Costa Azul, Pampatar (dirección de ejemplo)", date: "2026-11-13", day: "vie 13 nov", doors: "7:00 pm", start: "8:30 pm", areas: A(15, 35, 25, [212, 18, 0]), hotel: 68 },
        { id: "ccs", city: "Caracas", venue: "Tibisay Caracas · Salón Ávila", addr: "Av. Francisco de Miranda, Chacao (dirección de ejemplo)", date: "2026-11-21", day: "sáb 21 nov", doors: "6:30 pm", start: "8:00 pm", areas: A(18, 40, 28, [301, 9, 110]), hotel: 74 },
        { id: "vlc", city: "Valencia", venue: "Tibisay Valencia · Sala Los Samanes", addr: "Av. Bolívar Norte (dirección de ejemplo)", date: "2026-12-04", day: "vie 4 dic", doors: "7:00 pm", start: "8:30 pm", areas: A(15, 35, 25, [0, 0, 0]), hotel: 62, soldOut: true },
      ],
    },
    {
      id: "gala", cat: "Fiestas y galas", art: "gala", artText: "31 dic", title: "Gran Gala de Fin de Año",
      tag: "Evento Tibisay", age: "+18", refund: "full",
      desc: "Cena de cuatro tiempos, orquesta en vivo, brindis a medianoche y fuegos sobre la bahía (programa de ejemplo, por confirmar). Código de vestimenta: elegante. Las mesas se asignan por área al llegar.",
      sessions: [
        { id: "mgta", city: "Margarita", venue: "Tibisay Margarita · Salón Caribe", addr: "Av. Costa Azul, Pampatar (dirección de ejemplo)", date: "2026-12-31", day: "jue 31 dic", doors: "8:00 pm", start: "9:00 pm", areas: [
          { id: "gen", name: "Salón general", note: "Cena, orquesta y brindis. Mesa compartida.", usd: 85, left: 140 },
          { id: "vip", name: "Mesa VIP", note: "Mesa cercana a la pista y botella de espumante por mesa (ejemplo).", usd: 160, left: 22 },
          { id: "alta", name: "Terraza de la bahía", note: "Mesa en terraza con vista a los fuegos (ejemplo).", usd: 120, left: 41 },
        ], hotel: 140 },
      ],
    },
    {
      id: "brisa", cat: "Música en vivo", art: "brisa", artText: "Salsa en la playa", title: "Brisa Mayor: Salsa en la Playa",
      tag: "Al aire libre", age: "Todo público", refund: "weather",
      desc: "La Orquesta Brisa Mayor (agrupación de ejemplo) toca en la arena al atardecer. Trae protector solar y agua; hay barra y comida en el lugar.",
      sessions: [
        { id: "mgta", city: "Margarita", venue: "Tibisay Margarita · Playa del Hotel", addr: "Playa El Agua (dirección de ejemplo)", date: "2026-10-10", day: "sáb 10 oct", doors: "4:00 pm", start: "5:30 pm", areas: [
          { id: "gen", name: "Arena", note: "General sobre la arena, de pie o con tu toalla.", usd: 12, left: 380 },
          { id: "vip", name: "Palco de playa", note: "Sombrilla, silla y mesa baja frente a la tarima.", usd: 45, left: 6 },
          { id: "alta", name: "Terraza", note: "Nivel alto con sombra y asiento.", usd: 22, left: 52 },
        ], hotel: 68 },
      ],
    },
    {
      id: "fuego", cat: "Conciertos", art: "fuego", artText: "Fuego Alto", title: "Fuego Alto en Concierto",
      tag: "Concierto", age: "+14", refund: "full",
      desc: "La banda de rock Fuego Alto (de ejemplo) presenta su disco «Cielo Bajo» con luces, pantalla gigante y todas las canciones que te sabes.",
      sessions: [
        { id: "vlc", city: "Valencia", venue: "Anfiteatro Tibisay Valencia", addr: "Av. Bolívar Norte (dirección de ejemplo)", date: "2026-11-28", day: "sáb 28 nov", doors: "5:00 pm", start: "7:30 pm", areas: [
          { id: "gen", name: "General", note: "De pie frente al escenario.", usd: 20, left: 1250 },
          { id: "vip", name: "VIP", note: "Zona cercana con acceso rápido y baño exclusivo.", usd: 55, left: 140 },
          { id: "alta", name: "Gradas altas", note: "Niveles superiores con asiento numerado por fila libre.", usd: 30, left: 420 },
        ], hotel: 62 },
      ],
    },
    {
      id: "mic", cat: "Comedia", art: "mic", artText: "Micrófono abierto", title: "Noche de Micrófono Abierto",
      tag: "Cada mes", age: "+18", refund: "full",
      desc: "Ocho cómicos nuevos, cinco minutos cada uno y un público que decide quién vuelve. Cupo pequeño, ambiente cercano.",
      sessions: [
        { id: "ccs", city: "Caracas", venue: "Tibisay Caracas · Sótano Ávila", addr: "Av. Francisco de Miranda, Chacao (dirección de ejemplo)", date: "2026-10-15", day: "jue 15 oct", doors: "7:30 pm", start: "8:30 pm", areas: [
          { id: "gen", name: "General", note: "Sillas sin numerar, primero en llegar, primero en elegir.", usd: 8, left: 70 },
          { id: "vip", name: "Mesa frontal", note: "Mesa para dos o cuatro, frente al escenario.", usd: 14, left: 12 },
          { id: "alta", name: "Barra alta", note: "Taburetes con vista al escenario.", usd: 10, left: 20 },
        ], hotel: 74 },
        { id: "vlc", city: "Valencia", venue: "Tibisay Valencia · Sala Los Samanes", addr: "Av. Bolívar Norte (dirección de ejemplo)", date: "2026-11-19", day: "jue 19 nov", doors: "7:30 pm", start: "8:30 pm", areas: [
          { id: "gen", name: "General", note: "Sillas sin numerar.", usd: 8, left: 54 },
          { id: "vip", name: "Mesa frontal", note: "Mesa para dos o cuatro.", usd: 14, left: 10 },
          { id: "alta", name: "Barra alta", note: "Taburetes con vista al escenario.", usd: 10, left: 16 },
        ], hotel: 62 },
      ],
    },
  ];
  const REFUND = {
    full: "Si el evento se cancela, te devolvemos el 100% en la misma moneda y a la misma tasa de tu compra. Si cambia de fecha, puedes pedir reembolso o conservar tu entrada. Plazo: 5 días hábiles desde que lo pides. (Política de ejemplo: la definitiva está por definir.)",
    weather: "Si el evento se cancela o se suspende por lluvia, te devolvemos el 100% en la misma moneda y a la misma tasa de tu compra. Si no puedes asistir, no hay devolución, pero puedes transferir tu entrada. (Política de ejemplo: la definitiva está por definir.)",
  };
  const MONTHS = { 11: "noviembre", 12: "diciembre" };
  const minPrice = (s) => { const a = s.areas.filter((x) => x.left > 0).map((x) => x.usd); return a.length ? Math.min(...a) : null; };
  const evMin = (e) => Math.min(...e.sessions.filter((s) => !s.soldOut).map(minPrice));
  const evFirst = (e) => e.sessions.slice().sort((a, b) => a.date.localeCompare(b.date))[0];
  const getEvent = (id) => EVENTS.find((e) => e.id === id) || EVENTS[0];

  /* ---------- estado de la orden (sessionStorage) ---------- */
  const KEY = "gt-orden";
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    set(o) { try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { /* sin storage: el prototipo sigue con valores por defecto */ } },
    patch(p) { const o = Object.assign(store.get(), p); store.set(o); return o; },
    clear() { try { sessionStorage.removeItem(KEY); } catch (e) {} },
  };
  function currentOrder() {
    const o = store.get();
    const ev = getEvent(o.eventId || "cacho");
    const ses = ev.sessions.find((s) => s.id === o.sessionId) || ev.sessions.find((s) => !s.soldOut);
    const qty = o.qty || {};
    const lines = ses.areas.filter((a) => qty[a.id] > 0).map((a) => ({ id: a.id, name: a.name, n: qty[a.id], unit: a.usd, sub: a.usd * qty[a.id] }));
    if (o.hotel) lines.push({ id: "hotel", name: "Una noche en Tibisay " + ses.city, n: 1, unit: ses.hotel, sub: ses.hotel });
    const total = lines.reduce((t, l) => t + l.sub, 0);
    const count = lines.filter((l) => l.id !== "hotel").reduce((t, l) => t + l.n, 0);
    return { o, ev, ses, lines, total, count, totalBs: toBs(total) };
  }

  /* ---------- UI helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function motion(fn) {
    if (!window.gsap) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => { fn(gsap); });
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    const done = () => t.remove();
    if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(t, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(t, { autoAlpha: 0, duration: 0.25, delay: 3.2, ease: "power2.in", onComplete: done });
    } else setTimeout(done, 3600);
  }

  function artHTML(e, cls, inner) {
    // FOTO REAL: img/eventos/<id>.jpg (4:5, 1080x1350). Si no existe, queda la superficie y el rotulo "Foto del evento".
    return `<div class="ph ${cls || ""}" aria-hidden="true"><img src="img/eventos/${e.id}.jpg" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('nofoto');this.remove()"><span class="ph-l">Foto del evento</span>${inner || ""}</div>`;
  }

  const LOGO = `<svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M6 6h16a3 3 0 0 1 3 3v2.2a2.8 2.8 0 0 0 0 5.6V19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.8a2.8 2.8 0 0 0 0-5.6V9a3 3 0 0 1 3-3zm9 4v2h2v-2h-2zm0 4v3h2v-3h-2z"/></svg>`;

  const SCREENS = [
    ["Compra", [["index.html", "Inicio"], ["evento.html", "Ficha de evento"], ["areas.html", "Selección de áreas"], ["checkout.html", "Pago"], ["confirmacion.html", "Confirmación"], ["mis-entradas.html", "Mis entradas"]]],
    ["Panel del organizador", [["panel-resumen.html", "Resumen"], ["panel-verificacion.html", "Verificación de pagos"], ["panel-evento.html", "Crear / editar evento"]]],
  ];

  function chrome() {
    const b = document.body;
    const nav = b.dataset.nav || "";
    if (b.classList.contains("panel")) {
      const link = (h, t, extra) => `<a href="${h}"${nav === h ? ' aria-current="page"' : ""}>${t}${extra || ""}</a>`;
      b.insertAdjacentHTML("afterbegin", `<a class="skip" href="#main">Saltar al contenido</a><aside class="pn-side"><a class="logo" href="panel-resumen.html">${LOGO}<span>Global Ticket</span></a><nav aria-label="Panel del organizador">${link("panel-resumen.html", "Resumen")}${link("panel-verificacion.html", "Verificación", ' <span class="badge" id="qbadge">6</span>')}${link("panel-evento.html", "Crear evento")}<a href="index.html">Ver tienda</a></nav><p class="who">Taquilla Tibisay · rol admin<br>Datos de ejemplo</p></aside>`);
      return;
    }
    b.insertAdjacentHTML("afterbegin", `<a class="skip" href="#main">Saltar al contenido</a><div class="rate-bar" role="note">Tasa BCV del día: <b>${fmt(RATE, 2)} Bs/USD</b> · tasa de ejemplo</div><header class="site-header"><a class="logo" href="index.html" aria-label="Global Ticket, inicio">${LOGO}<span>Global Ticket</span></a><a class="hdr-link" href="mis-entradas.html">Mis entradas</a></header>`);
    const li = (arr) => arr.map((x) => `<li><a href="${x[0]}">${x[1]}</a></li>`).join("");
    b.insertAdjacentHTML("beforeend", `<footer class="site-footer"><div class="wrap"><div><h4>Global Ticket</h4><p class="fine">Prototipo de diseño. Eventos, precios, sedes y tasa son contenido de ejemplo. Los pagos se simulan.</p><p class="fine" style="margin-top:10px">Soporte por WhatsApp del organizador (número por definir).</p></div><div><h4>Pantallas · compra</h4><ul>${li(SCREENS[0][1])}</ul></div><div><h4>Pantallas · panel</h4><ul>${li(SCREENS[1][1])}</ul></div></div></footer>`);
  }

  /* ---------- temporizador de reserva (10 min) ---------- */
  function startTimer(el, onExpire) {
    const o = store.get();
    let dl = o.deadline;
    if (!dl || dl < Date.now() - 1) { dl = Date.now() + 10 * 60 * 1000; store.patch({ deadline: dl }); }
    const t = $(".t", el), bar = $(".bar2", el);
    let said2 = false;
    const live = $(".tlive", el);
    function tick() {
      const left = Math.max(0, dl - Date.now());
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      t.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
      bar.style.transform = "scaleX(" + left / 600000 + ")";
      el.classList.toggle("low", left < 120000);
      if (left < 120000 && !said2 && live) { said2 = true; live.textContent = "Quedan menos de 2 minutos de tu reserva."; }
      if (left === 0) { clearInterval(iv); if (live) live.textContent = "Tu reserva venció."; onExpire && onExpire(); }
    }
    const iv = setInterval(tick, 1000); tick();
    return { reset() { dl = Date.now() + 600000; store.patch({ deadline: dl }); said2 = false; } };
  }

  /* ---------- QR de EJEMPLO (no escaneable) ---------- */
  function qrSVG(seed) {
    const N = 29; let h = 2166136261;
    for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1000) / 1000; };
    const g = Array.from({ length: N }, () => Array.from({ length: N }, () => rnd() > 0.52));
    const finder = (x, y) => { for (let i = -1; i <= 7; i++) for (let j = -1; j <= 7; j++) { const xx = x + i, yy = y + j; if (xx < 0 || yy < 0 || xx >= N || yy >= N) continue; const edge = i === 0 || i === 6 || j === 0 || j === 6; const core = i >= 2 && i <= 4 && j >= 2 && j <= 4; g[yy][xx] = i >= 0 && i <= 6 && j >= 0 && j <= 6 && (edge || core); } };
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
    let d = ""; g.forEach((r, y) => r.forEach((v, x) => { if (v) d += `M${x} ${y}h1v1h-1z`; }));
    return `<svg viewBox="0 0 ${N} ${N}" role="img" aria-label="Código QR de ejemplo, no escaneable"><rect width="${N}" height="${N}" fill="#fff"/><path d="${d}" fill="#0B0B0D"/></svg>`;
  }

  const TAXLINE = "Impuestos (IVA/IGTF): por definir";
  /* total vivo: cuenta hasta el nuevo valor (GSAP); con reduced-motion salta directo */
  function countTo(el, to, f) {
    const from = parseFloat(el.dataset.v || "0");
    el.dataset.v = to;
    if (el._t) el._t.kill();
    if (!window.gsap || from === to || matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = f(to); return; }
    const o = { v: from };
    el._t = gsap.to(o, { v: to, duration: 0.5, ease: "power3.out", onUpdate: () => { el.textContent = f(o.v); }, onComplete: () => { el.textContent = f(to); } });
  }
  /* lista de espera ("Avisame si se liberan entradas") */
  function waitlistForm(label, id) {
    const o = store.get(), b = o.buyer || {};
    const pre = o.waitlist || b.correo || b.tel || "";
    return `<form class="wl" data-wl novalidate><h3>${esc(label)}</h3><p class="small muted">Si alguien devuelve su entrada, te escribimos primero.</p><div class="field" style="margin:12px 0"><label for="${id}">Correo o WhatsApp</label><input id="${id}" value="${esc(pre)}" autocomplete="email" inputmode="email" aria-describedby="${id}-e"><span class="err" id="${id}-e" role="alert">Escribe un correo o un número de WhatsApp válido.</span></div><button class="btn sec block" type="submit">Avísame si se liberan entradas</button><p class="small" data-wl-ok aria-live="polite" style="margin-top:10px"></p></form>`;
  }
  function bindWaitlist(root) {
    $$("[data-wl]", root).forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      const i = $("input", f), v = i.value.trim();
      const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || v.replace(/\D/g, "").length >= 10;
      i.setAttribute("aria-invalid", !ok); $(".err", f).classList.toggle("on", !ok);
      if (!ok) { i.focus(); return; }
      store.patch({ waitlist: v });
      $("[data-wl-ok]", f).textContent = "Listo. Te avisamos a " + v + " si se liberan entradas.";
      const b = $("button", f); b.textContent = "Aviso activado"; b.disabled = true;
    }));
  }

  window.GT = { TAXLINE, countTo, waitlistForm, bindWaitlist, RATE, P2P_REF, fmt, usd, bs, toBs, EVENTS, REFUND, MONTHS, minPrice, evMin, evFirst, getEvent, store, currentOrder, $, $$, esc, motion, toast, artHTML, startTimer, qrSVG, LOGO };
  document.addEventListener("DOMContentLoaded", chrome);
})();
