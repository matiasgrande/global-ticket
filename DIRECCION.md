# Notas de ejecución — propuesta Sonnet

La dirección visual, los tokens y los componentes viven en [`DESIGN.md`](DESIGN.md). Este archivo solo guarda notas de ejecución del prototipo.

- Servir por HTTP (p. ej. `node` o `python3 -m http.server`); no abre bien por `file://`.
- Estado de la compra: `sessionStorage` (`gt-orden`). Los pagos y el QR son simulados.
- Fecha del prototipo: vie 9 oct 2026 (para «Esta semana»). Tasa BCV de ejemplo: 875,65. P2P de referencia solo en el panel: 912,40 (ejemplo).
- Fotos: `img/eventos/<id>.jpg`. Eventos propios: fotos reales de tibisayhoteles.com. Eventos de otras ticketeras: su flyer oficial, en modo `poster` (entero sobre fondo desenfocado).
- Scripts: GSAP 3.13.0 y Flip (jsdelivr, con SRI). Flip anima el reacomodo al filtrar el home.
- Prototipo de estados de confirmación: `confirmacion.html?estado=confirmada|verificacion|rechazada`.
