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

  /* ---------- datos de ejemplo ----------
     own: true  = evento propio de Tibisay (sede, salón y foto reales; programa, precio y aforo de ejemplo). Son los que ve el panel.
     src        = evento REAL de otra ticketera, mostrado solo como ejemplo de catálogo (datos leídos el 10 oct 2026).
     poster     = la imagen es un flyer con texto: se muestra completa, sin recorte. */
  const A = (g, v, a, left, names) => [
    { id: "gen", name: (names || [])[0] || "General", note: "De pie, cerca del escenario. Entras y te mueves libre.", usd: g, left: left[0] },
    { id: "vip", name: (names || [])[1] || "VIP", note: "Zona frontal con mesa alta y barra propia.", usd: v, left: left[1] },
    { id: "alta", name: (names || [])[2] || "Terraza alta", note: "Nivel superior con vista completa. Con asiento.", usd: a, left: left[2] },
  ];
  // zonas tal como las publica la ticketera de origen: [nombre, USD, disponibles (ejemplo), nota]
  const Z = (rows) => rows.map(([name, usd, left, note], i) => ({ id: "z" + i, name, usd, left: left == null ? 240 : left, note: note || "" }));
  const TB = {
    mgta: { city: "Margarita", addr: "Av. Aldonza Manrique con calle El Camarón, Playa Moreno, Nueva Esparta" },
    mcbo: { city: "Maracaibo", addr: "Av. El Milagro, sector Don Bosco, Maracaibo, Zulia" },
    mat: { city: "Maturín", addr: "Av. Bella Vista, km 3, vía La Cruz, Maturín, Monagas" },
    mer: { city: "Mérida", addr: "Av. Universidad, sector Milla, Mérida" },
    can: { city: "Canaima", addr: "Parque Nacional Canaima, Bolívar (acceso en avioneta desde Maiquetía)" },
    mrr: { city: "Morrocoy", addr: "Av. Principal Morón-Coro, recta de Tucacas, Falcón" },
  };
  const tb = (k, venue, rest) => Object.assign({ id: k, city: TB[k].city, venue: "Tibisay " + TB[k].city + " · " + venue, addr: TB[k].addr }, rest);
  const EVENTS = [
    {
      id: "gala", own: true, pos: "50% 82%", cat: "Fiestas y galas", title: "Gran Gala de Fin de Año",
      tag: "Tres hoteles, una noche", age: "Todo público", refund: "full",
      desc: "Despide el año en un hotel Tibisay: cena de varios tiempos, orquesta en vivo, brindis a medianoche y pista hasta tarde. Elige Margarita frente al mar, Maracaibo en el Salón Bolívar o Maturín en el Gran Salón Morichal Largo. Menú y artistas de ejemplo.",
      sessions: [
        tb("mgta", "Salón Nueva Esparta y Terraza Downtown Beach", { date: "2026-12-31", day: "jue 31 dic", doors: "8:00 pm", start: "9:00 pm", hotel: 162, areas: A(85, 160, 120, [118, 9, 34], ["Salón general", "Mesa VIP", "Terraza frente al mar"]) }),
        tb("mcbo", "Salón Bolívar", { date: "2026-12-31", day: "jue 31 dic", doors: "8:00 pm", start: "9:00 pm", hotel: 95, areas: A(70, 140, 95, [420, 31, 60], ["Salón general", "Mesa VIP", "Mesa preferencial"]) }),
        tb("mat", "Gran Salón Morichal Largo", { date: "2026-12-31", day: "jue 31 dic", doors: "8:00 pm", start: "9:00 pm", hotel: 80, areas: A(60, 120, 80, [260, 14, 48], ["Salón general", "Mesa VIP", "Mesa preferencial"]) }),
      ].map((s) => Object.assign(s, { areas: s.areas.map((a, i) => Object.assign(a, { note: ["Cena, orquesta y brindis. Mesa compartida.", "Mesa cercana a la pista y botella de espumante por mesa (ejemplo).", "Mesa con mejor vista, cena incluida (ejemplo)."][i] })) })),
    },
    {
      id: "salsa", own: true, cat: "Música en vivo", title: "Salsa al Atardecer en Downtown Beach",
      tag: "Frente al mar", age: "+18", refund: "weather",
      desc: "Orquesta de salsa en vivo en la Terraza Downtown Beach, el club de playa del Tibisay Margarita. Empieza con el sol cayendo sobre Playa Moreno y sigue con DJ hasta la medianoche. Orquesta por anunciar (ejemplo).",
      sessions: [
        tb("mgta", "Terraza Downtown Beach", { date: "2026-10-17", day: "sáb 17 oct", doors: "4:00 pm", start: "5:30 pm", hotel: 162, areas: [
          { id: "gen", name: "Arena", note: "General sobre la arena, de pie o con tu toalla.", usd: 12, left: 380 },
          { id: "vip", name: "Palapa", note: "Palapa con tumbonas y mesa baja frente a la tarima (hasta 4 personas).", usd: 45, left: 6 },
          { id: "alta", name: "Terraza", note: "Nivel alto con sombra y asiento.", usd: 22, left: 52 },
        ] }),
      ],
    },
    {
      id: "bolero", own: true, cat: "Música en vivo", title: "Noches de Bolero",
      tag: "Ciclo en los salones Tibisay", age: "+18", refund: "full",
      desc: "Un trío de boleros y una voz invitada recorren los salones Tibisay: cena ligera, coctelería y dos sets de clásicos. Mismo show en tres ciudades, aforo pequeño. Artistas por anunciar (ejemplo).",
      sessions: [
        tb("mer", "Salón Sierra Nevada", { date: "2026-10-24", day: "sáb 24 oct", doors: "7:30 pm", start: "8:30 pm", hotel: 85, areas: A(25, 55, 35, [96, 8, 30], ["General", "Mesa frontal", "Barra alta"]) }),
        tb("mcbo", "Salón Urdaneta", { date: "2026-11-13", day: "vie 13 nov", doors: "7:30 pm", start: "8:30 pm", hotel: 95, areas: A(25, 55, 35, [64, 11, 20], ["General", "Mesa frontal", "Barra alta"]) }),
        tb("mat", "Salón Monagas", { date: "2026-11-21", day: "sáb 21 nov", doors: "7:30 pm", start: "8:30 pm", hotel: 80, soldOut: true, areas: A(25, 55, 35, [0, 0, 0], ["General", "Mesa frontal", "Barra alta"]) }),
      ].map((s) => Object.assign(s, { areas: s.areas.map((a, i) => Object.assign(a, { note: ["Sillas sin numerar, primero en llegar, primero en elegir.", "Mesa para dos o cuatro frente a la tarima, con una botella por mesa (ejemplo).", "Taburetes junto a la barra, con vista a la tarima."][i] })) })),
    },
    {
      id: "fullday", own: true, cat: "Experiencias", title: "Full Day en el Lago",
      tag: "Piscina, playa y gastronomía", age: "Todo público", refund: "weather",
      desc: "Un día completo en el Tibisay Hotel del Lago: piscina, playa del lago con palapas, almuerzo zuliano y coctelería. Llegas en la mañana y te vas al atardecer, sin hospedarte. Precios y menú de ejemplo.",
      sessions: [
        tb("mcbo", "Piscina y playa del lago", { date: "2026-11-08", day: "dom 8 nov", doors: "9:00 am", start: "9:00 am", hotel: 95, areas: A(35, 120, 55, [140, 7, 60], ["Full Day", "Palapa privada", "Full Day con almuerzo"]) }),
      ].map((s) => Object.assign(s, { areas: s.areas.map((a, i) => Object.assign(a, { note: ["Piscina, playa del lago y tumbona por orden de llegada.", "Palapa para hasta 6 personas, con servicio de mesonero.", "Incluye almuerzo zuliano y una bebida."][i] })) })),
    },
    {
      id: "canaima", own: true, cat: "Experiencias", title: "Retiro de Bienestar en Canaima",
      tag: "Fin de semana frente a los tepuyes", age: "+18", refund: "full",
      desc: "Tres días en el campamento Tibisay Canaima: yoga al amanecer frente a los tepuyes, meditación al atardecer, cocina de la zona y excursión a Salto Sapo, Hacha y Golondrina. Facilitadores, programa y precios de ejemplo.",
      sessions: [
        tb("can", "Campamento y Salón Tepuy", { date: "2026-11-13", day: "vie 13 a dom 15 nov", doors: "10:00 am", start: "11:00 am", areas: A(180, 690, 520, [12, 3, 4], ["Pase del retiro", "Retiro con suite y boleto aéreo", "Retiro con habitación doble"]) }),
      ].map((s) => Object.assign(s, { areas: s.areas.map((a, i) => Object.assign(a, { note: ["Todas las actividades y comidas del retiro. Hospedaje y vuelo por tu cuenta.", "Suite matrimonial deluxe, pensión completa y boleto Maiquetía–Canaima–Maiquetía.", "Habitación doble compartida y pensión completa. Vuelo por tu cuenta."][i] })) })),
    },
    {
      id: "manglar", own: true, cat: "Música en vivo", title: "Atardecer en el Manglar",
      tag: "Sunset frente al mar", age: "+18", refund: "weather",
      desc: "DJ y saxofón en vivo en la terraza del Tibisay Morrocoy mientras cae el sol sobre la playa de Tucacas, con coctelería y parrilla. Artistas por anunciar (ejemplo).",
      sessions: [
        tb("mrr", "Terraza y piscina frente a la playa", { date: "2026-11-07", day: "sáb 7 nov", doors: "4:00 pm", start: "5:00 pm", hotel: 120, areas: A(15, 60, 30, [140, 6, 30], ["General", "Toldo frente al mar", "Terraza con asiento"]) }),
      ].map((s) => Object.assign(s, { areas: s.areas.map((a, i) => Object.assign(a, { note: ["De pie en la terraza y la orilla de la piscina.", "Toldo con tumbonas y servicio de mesa (hasta 4 personas).", "Mesa en la terraza con vista al mar."][i] })) })),
    },
    {
      id: "akapellah", poster: true, cat: "Conciertos", title: "Akapellah: La Cruz Tour",
      tag: "Gira nacional", age: "Todo público", refund: "ext", src: { name: "Ticketmundo", url: "https://akapellah.ticketmundo.com.ve/" },
      desc: "Akapellah, uno de los raperos más respetados del país, lleva su gira La Cruz a tres ciudades. Menores de 18 entran con representante y no se admiten menores de 3 años.",
      sessions: [
        { id: "mcy", city: "Maracay", venue: "Concha Acústica de Maracay", addr: "Maracay, Aragua", date: "2026-11-28", day: "sáb 28 nov", doors: "", start: "9:00 pm", areas: Z([["General B", 15.02], ["General A", 20.29], ["VIP", 29.76], ["Palco A", 70.35], ["Palco B", 70.35]]) },
        { id: "bqto", city: "Barquisimeto", venue: "Hotel Jirahara", addr: "Barquisimeto, Lara", date: "2026-12-03", day: "jue 3 dic", doors: "", start: "9:00 pm", areas: Z([["General", 17.86, null, "Precio de ejemplo: la zona de Barquisimeto no se pudo leer en la fuente."], ["VIP", 29.76], ["Palco", 70.35]]) },
        { id: "mcbo", city: "Maracaibo", venue: "Mi Ternerita", addr: "Maracaibo, Zulia", date: "2026-12-05", day: "sáb 5 dic", doors: "", start: "9:00 pm", hotel: 95, areas: Z([["General", 17.86], ["VIP", 29.76], ["Palco A", 70.35], ["Palco B", 70.35]]) },
      ],
    },
    {
      id: "silvestre", poster: true, cat: "Conciertos", title: "Silvestre Dangond: El Baile de Todos",
      tag: "Vallenato en el estadio", age: "Por confirmar", refund: "ext", src: { name: "Tiquemax", url: "https://www.tiquemax.com/evento/silvestre-dangond-merida" },
      desc: "Silvestre Dangond trae su gira El Baile de Todos al Estadio Metropolitano de Mérida: una noche de vallenato masivo con once zonas, desde la norte alta hasta invitados especiales.",
      sessions: [
        { id: "mer", city: "Mérida", venue: "Estadio Metropolitano de Mérida", addr: "Mérida", date: "2026-11-21", day: "sáb 21 nov", doors: "5:00 pm", start: "9:00 pm", hotel: 85, areas: Z([["Norte Alta", 25], ["Norte Baja", 30], ["Tribuna Alta", 35.01], ["Tribuna Baja", 45], ["Bronce", 65], ["Plata", 94.99], ["Oro", 115], ["Diamante", 159.99], ["Alfombra Roja", 175], ["Primera Clase", 305], ["Invitados Especiales", 1000, 12]]) },
      ],
    },
    {
      id: "carluis", poster: true, cat: "Comedia", title: "Carluis Medina: Oxitocina",
      tag: "Gira de stand-up", age: "+16", refund: "ext", src: { name: "Ticketmundo", url: "https://ticketsve.ticketmundo.com.ve/event/3248" },
      desc: "Carluis Medina presenta Oxitocina, su show de stand-up, en los teatros clásicos de Maracaibo y Valencia. Precios publicados en bolívares, aquí convertidos a dólares.",
      sessions: [
        { id: "mcbo", city: "Maracaibo", venue: "Teatro Baralt · Gran Sala", addr: "Centro de Maracaibo, Zulia", date: "2026-12-08", day: "mar 8 dic", doors: "8:30 pm", start: "9:30 pm", hotel: 95, areas: Z([["Palco II", 10], ["Palco I", 20], ["Platea General", 25], ["Platea VIP", 30]]) },
        { id: "vlc", city: "Valencia", venue: "Teatro Municipal de Valencia", addr: "Centro de Valencia, Carabobo", date: "2026-12-09", day: "mié 9 dic", doors: "7:00 pm", start: "8:00 pm", areas: Z([["Balcón Promo", 10], ["Segundo Balcón", 20], ["Primer Balcón", 25], ["Luneta", 30], ["Patio", 30]]) },
      ],
    },
    {
      id: "caibo", poster: true, cat: "Conciertos", title: "Caibo: La Del Sol Amada",
      tag: "El regreso", age: "Todo público", refund: "ext", src: { name: "Ticketmundo", url: "https://ticketsve.ticketmundo.com.ve/event/3240" },
      desc: "El dúo Caibo vuelve a un escenario después de ocho años separados, con sus clásicos y el sencillo nuevo, Tambora. Menores entran con representante.",
      sessions: [
        { id: "ccs", city: "Caracas", venue: "Anfiteatro El Hatillo", addr: "El Hatillo, Miranda", date: "2026-10-15", day: "jue 15 oct", doors: "7:00 pm", start: "8:00 pm", areas: Z([["General Lateral", 34.4], ["General Central", 49], ["Preferencial Lateral", 56.7], ["Preferencial Central", 60.9], ["VIP", 77], ["SVIP", 97.3]]) },
      ],
    },
    {
      id: "yordano", poster: true, cat: "Conciertos", title: "Yordano: Ida y Vuelta",
      tag: "Gira", age: "Por confirmar", refund: "ext", src: { name: "goliiive", url: "https://www.goliiive.com/barquisimeto-yordano-tour-ida-y-vuelta" },
      desc: "Yordano vuelve a Barquisimeto con su banda dentro de la gira Ida y Vuelta. Precios publicados en bolívares, aquí convertidos a dólares.",
      sessions: [
        { id: "bqto", city: "Barquisimeto", venue: "Trinitarias Suites · Sala Ríos Reyna", addr: "Barquisimeto, Lara", date: "2026-10-15", day: "jue 15 oct", doors: "7:00 pm", start: "hora por confirmar", areas: Z([["General", 65.01], ["VIP", 86.68]]) },
      ],
    },
    {
      id: "caramelos", poster: true, cat: "Conciertos", title: "Caramelos de Cianuro",
      tag: "Nueva fecha", age: "+16", refund: "ext", src: { name: "goliiive", url: "https://www.goliiive.com/caramelos-de-cianuro-maracaibo-nueva-fecha" },
      desc: "Caramelos de Cianuro reprograma su concierto en el Palacio de Eventos de Maracaibo. Menores de 16 con representante. Precios publicados en bolívares, aquí convertidos a dólares.",
      sessions: [
        { id: "mcbo", city: "Maracaibo", venue: "Palacio de Eventos de Venezuela", addr: "Maracaibo, Zulia", date: "2026-11-20", day: "vie 20 nov", doors: "7:00 pm", start: "hora por confirmar", hotel: 95, areas: Z([["Palco General", 27.09], ["Zona General", 48.76], ["Zona Fans", 70.43], ["Platea", 86.68], ["VIP", 102.93]]) },
      ],
    },
    {
      id: "gemelos", poster: true, cat: "Comedia", title: "Gemelos",
      tag: "Stand-up e improvisación", age: "+16", refund: "ext", src: { name: "goliiive", url: "https://www.goliiive.com/gemelos-caracas" },
      desc: "Samuel Rodríguez y Manuel Silva mezclan stand-up, improvisación y personajes en hora y media de show con el público.",
      sessions: [
        { id: "ccs", city: "Caracas", venue: "Centro Cultural Chacao", addr: "Chacao, Caracas", date: "2026-12-03", day: "jue 3 dic", doors: "", start: "8:00 pm", areas: Z([["Balcón Lateral 8", 18], ["Balcón Lateral 9", 22], ["Balcón Central", 25], ["Platea Lateral 4", 30], ["Platea Superior Central", 32], ["Platea Lateral 1 y 3", 35], ["Platea Central", 40]]) },
      ],
    },
    {
      id: "cusica", poster: true, cat: "Festivales", title: "Cusica Fest 2026",
      tag: "Dos días en la USB", age: "Por confirmar", refund: "ext", src: { name: "Ticketmundo", url: "https://cusicafest2026.ticketmundo.com.ve/" },
      desc: "Dos días de música, arte y gastronomía en la Universidad Simón Bolívar, con Diplo, Sebastián Yatra, Lasso, Cultura Profética, Los Amigos Invisibles y más. Entrada por día.",
      sessions: [
        { id: "d1", city: "Caracas", venue: "Universidad Simón Bolívar", addr: "Sartenejas, Baruta, Miranda", date: "2026-12-04", day: "vie 4 dic", doors: "", start: "12:00 pm", areas: Z([["General", 65], ["VIP", 110]]) },
        { id: "d2", city: "Caracas", venue: "Universidad Simón Bolívar", addr: "Sartenejas, Baruta, Miranda", date: "2026-12-05", day: "sáb 5 dic", doors: "", start: "12:00 pm", areas: Z([["General", 65], ["VIP", 110]]) },
      ],
    },
    {
      id: "morat", poster: true, cat: "Conciertos", title: "Morat: Ya Es Mañana",
      tag: "World Tour", age: "Por confirmar", refund: "ext", src: { name: "Ticketmundo", url: "https://moratenvenezuela.ticketmundo.com.ve/" },
      desc: "Morat llega a Caracas con dos noches de su gira Ya Es Mañana. General y VIP están agotadas en las dos fechas.",
      sessions: [
        { id: "d1", city: "Caracas", venue: "Universidad Simón Bolívar", addr: "Sartenejas, Baruta, Miranda", date: "2026-12-12", day: "sáb 12 dic", doors: "", start: "hora por confirmar", soldOut: true, areas: Z([["General", 50, 0], ["VIP", 100, 0]]) },
        { id: "d2", city: "Caracas", venue: "Universidad Simón Bolívar", addr: "Sartenejas, Baruta, Miranda", date: "2026-12-13", day: "dom 13 dic", doors: "", start: "hora por confirmar", soldOut: true, areas: Z([["General", 50, 0], ["VIP", 100, 0]]) },
      ],
    },
  ];
  const REFUND = {
    full: "Si el evento se cancela, te devolvemos el 100% en la misma moneda y a la misma tasa de tu compra. Si cambia de fecha, puedes pedir reembolso o conservar tu entrada. Plazo: 5 días hábiles desde que lo pides. (Política de ejemplo: la definitiva está por definir.)",
    ext: "Evento real de otro organizador, mostrado aquí solo como ejemplo de catálogo. La política de reembolso que vale es la de su ticketera oficial.",
    weather: "Si el evento se cancela o se suspende por lluvia, te devolvemos el 100% en la misma moneda y a la misma tasa de tu compra. Si no puedes asistir, no hay devolución, pero puedes transferir tu entrada. (Política de ejemplo: la definitiva está por definir.)",
  };
  const minPrice = (s) => { const a = s.areas.filter((x) => x.left > 0).map((x) => x.usd); return a.length ? Math.min(...a) : null; };
  const evMin = (e) => { const p = e.sessions.filter((s) => !s.soldOut).map(minPrice).filter((x) => x != null); return p.length ? Math.min(...p) : null; };
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
    const ev = getEvent(o.eventId);
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
    // img/eventos/<id>.jpg. Flyer (poster): se ve entero sobre una copia desenfocada que llena el marco; foto: recorte cover.
    const src = `img/eventos/${e.id}.jpg`;
    const bg = e.poster ? `<img class="bg" src="${src}" alt="" loading="lazy" decoding="async">` : "";
    return `<div class="ph ${e.poster ? "poster " : ""}${cls || ""}" aria-hidden="true">${bg}<img src="${src}" alt=""${e.pos ? ` style="object-position:${e.pos}"` : ""} loading="lazy" decoding="async" onerror="this.parentNode.classList.add('nofoto');this.remove()"><span class="ph-l">Foto del evento</span>${inner || ""}</div>`;
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

  window.GT = { TAXLINE, countTo, waitlistForm, bindWaitlist, RATE, P2P_REF, fmt, usd, bs, toBs, EVENTS, REFUND, minPrice, evMin, evFirst, getEvent, store, currentOrder, $, $$, esc, motion, toast, artHTML, startTimer, qrSVG, LOGO };
  document.addEventListener("DOMContentLoaded", chrome);
})();
