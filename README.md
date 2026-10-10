# Global Ticket — prototipo 1

Prototipo navegable de una ticketera web móvil venezolana: compra con precio en USD y su equivalente en Bs a tasa BCV, pagos con Pago Móvil, tarjeta, Zelle y USDT, entrada con QR y panel del organizador.

**Todo el contenido es de ejemplo.** Eventos, artistas, precios, sedes, tasa BCV y políticas son ficticios. Los pagos se simulan y el QR no es escaneable.

- Sitio: HTML/CSS/JS estático, sin build. Fuente Archivo (Google Fonts), animación con GSAP 3.13.
- Sistema visual: [`DESIGN.md`](DESIGN.md). Notas de ejecución: [`DIRECCION.md`](DIRECCION.md).
- Estados de confirmación: `confirmacion.html?estado=confirmada|verificacion|rechazada`.

Para verlo en local: `python3 -m http.server` en esta carpeta.
