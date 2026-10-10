---
name: Global Ticket
description: Ticketera web móvil venezolana. Estándar de la categoría ejecutado a nivel DICE.
colors:
  ink: "#0B0B0D"
  surface: "#16161A"
  surface-raised: "#1F1F25"
  line: "#2A2A31"
  text: "#F5F5F7"
  text-muted: "#A6A6B0"
  accent: "#3B5BFF"
  accent-deep: "#2A45E0"
  on-accent: "#FFFFFF"
  ok: "#2BD576"
  pending: "#FFB020"
  danger: "#FF5A5F"
  panel-bg: "#F6F6F8"
  panel-surface: "#FFFFFF"
  panel-line: "#E3E3E8"
  panel-text: "#121216"
  panel-muted: "#5E5E69"
  text-soft: "#D6D6DC"
  text-faint: "#7C7C86"
  field-line: "#6E6E78"
  panel-field-line: "#8E8E99"
  panel-ok: "#0B7A3E"
  panel-pending: "#8A5A00"
  panel-danger: "#C4252B"
  panel-text-faint: "#6B6B76"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 9vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  price:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.1
  section:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  caption:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  big:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    height: "56px"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "48px"
  card-event:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
---

# Design System: Global Ticket

## Overview
Es el estándar de la categoría, sin ironía, con DICE como vara de acabado. La foto del evento es la protagonista; la interfaz se aparta y deja pasar contenido, precio y acción. Escena física: alguien con el teléfono en la mano, de noche o en la playa a pleno sol, que llega desde Instagram o WhatsApp y compra con el pulgar. Por eso la compra va en oscuro y con contraste alto, y el panel del organizador va en claro, porque se usa en una oficina de día. Hay un solo acento (azul Global) y se usa solo para la acción y para la selección. Movimiento con GSAP: una sola entrada orquestada por pantalla, transiciones de estado y un momento firmado (la revelación del QR). Nada decorativo en bucle; con `prefers-reduced-motion` todo queda en su estado final.

## Colors
Estrategia contenida: neutros más un acento.

### Primary
Azul Global (`accent`): el botón principal, el área o la fecha seleccionada, el foco. Nunca aparece como decoración y nunca como texto sobre fondo oscuro (3,9:1); sobre oscuro solo va como relleno con texto blanco (5,1:1).

### Neutral
Tinta (`ink`) es el fondo de la compra. `surface` y `surface-raised` dan profundidad por luminancia. `text-muted` es para datos secundarios: sede, hora, contravalor en Bs. `text-soft` es el texto largo sobre fotos y descripciones; `text-faint` es placeholder y deshabilitado; `field-line` es el borde de campos (3:1 contra la superficie).

### Panel claro
El panel redefine los tokens del mismo sistema (`panel-*`). Ok, pending y danger se oscurecen a `panel-ok`, `panel-pending` y `panel-danger` para pasar 4,5:1 como texto sobre blanco; sus fondos son mezclas suaves con `color-mix`. El borde de campos pasa a `panel-field-line`.

### Named Rules
**La regla del estado.** Verde = confirmado, ámbar = en verificación (o con discrepancia por revisar), rojo = rechazado o agotado. Esos tres colores no se usan para nada más: ni el contador de la cola, ni los medidores de aforo, ni los avisos de tiempo.
**La regla del precio doble.** El USD va en `text` y el Bs en `text-muted`, siempre juntos y con la tasa BCV nombrada. BCV y P2P son números distintos y nunca se promedian.
**La regla del contenido de ejemplo.** Todo precio, plazo, política o amenidad que no esté decidido lleva la marca «(ejemplo)» donde aparece, no solo en el pie. Los impuestos (IVA/IGTF) muestran «por definir» en la ficha, el resumen y el total.

## Typography
Una sola familia, Archivo, porque su eje de ancho da carácter de afiche a los títulos (peso 800, ancho 118) y es neutra en la interfaz. Se usan cifras tabulares en precios, contadores y timer.

### Hierarchy
- **Display:** el nombre del evento (ficha, destacado) y los titulares de estado o de pantalla de la compra («Casi listo», «Entrada confirmada», «Mis entradas»). Es el único lugar donde el tipo llega a `display`.
- **Section (h2):** 1,5 rem / 800. Títulos de sección y de bloque.
- **Title:** nombre del evento en tarjetas, entradas y carruseles (peso 800, ancho 118); títulos de bloque menores.
- **Body, Lead, Small, Caption:** descripciones, formularios, datos secundarios y rótulos.
- **Price:** montos. **Big:** el total en el resumen.

## Layout
Mobile-first a 390px, con un margen de 16px. La acción principal va en una barra fija abajo, al alcance del pulgar, y muestra el total vivo (cuenta hasta el nuevo valor con GSAP). En escritorio el contenido se centra (máximo 1200px) y en la ficha la columna de compra queda fija a la derecha. Ritmo de 8px, con más espacio arriba de un título que abajo.

## Elevation & Depth
La profundidad sale de la luminancia de las superficies, no de sombras. Sombra solo en hojas flotantes (sheet inferior, timer), con desplazamiento y desenfoque suaves. Nada de halos ni brillos de color.

## Shapes
Esquinas medianas: 12px en botones y campos, 20px en las tarjetas de evento, entradas y fotos. Ningún botón es píldora. Las fotos de evento van en 4:5 en las tarjetas y 16:10 en la entrada; a sangre en el destacado y la ficha.

## Components
- **Barra de tasa BCV:** franja fina arriba de toda pantalla de compra: «Tasa BCV del día: 875,65 Bs/USD · tasa de ejemplo». Fondo `surface`, texto muted con el valor en `text`.
- **Chips:** filtros de ciudad en una sola fila con scroll; 48px, 12px de radio. Seleccionado = `accent`. La categoría y la fecha van en selectores.
- **Tag (`.tag`):** etiqueta de 28px, 6px de radio. `.solid` (tinta) sobre fotos; `.ok`, `.pending` y `.danger` solo para estados de pago o agotado.
- **Velo de foto (`--scrim`):** degradado de `ink` de transparente a ~88% en el tercio inferior. Todo texto sobre foto va sobre el velo. Contraste medido sobre la peor foto (brisa): 5,5:1 en etiquetas, 9,7:1 en títulos.
- **Foto:** contenedor de proporción fija con `surface-raised` de respaldo y el rótulo «Foto del evento» si falta el archivo (`img/eventos/<id>.jpg`).
- **Tile de fecha (`.dtb`):** cuadrado de 56–60px con día y mes; en el destacado, la ficha y la fecha elegida (selección en `accent`). Es el diferencial de la gira multisede.
- **Fila de fecha (`.drow`, `.opt`):** tile + sede y hora + precio doble. Una fecha agotada no se oculta: muestra «Agotado» y ofrece la lista de espera.
- **Tarjeta de evento:** 20px de radio, foto 4:5, título, fecha y sede, precio USD y Bs con «tasa BCV». Las alturas se igualan; la última tarjeta se ensancha para no quedar huérfana.
- **Barra de acción fija (`.bar`):** total vivo USD + Bs y la acción principal; en escritorio la acción pasa a la columna lateral.
- **Timer de reserva:** hoja flotante de 10 min con barra fina. Bajo 2 min se invierte (fondo `text`, texto `ink`) en vez de cambiar de color.
- **Entrada (`.pass`):** foto 16:10 con velo, título en ancho 118, datos, y el QR sobre blanco puro debajo. Se revela con `clip-path` en la confirmación y en pantalla completa para la puerta.
- **Lista de espera (`.wl`):** «Avísame si se liberan entradas»; correo o WhatsApp prellenado y confirmación inline.
- **KPIs del panel (`.kpis`):** franja de 4 cifras separadas por línea fina, sin tarjetas individuales; tablas densas con medidor de aforo en `accent` (≥85% en tinta, nunca rojo) y cola con avance de plazo.

## Do's and Don'ts
### Do:
- Mostrar el precio por entrada (USD + Bs BCV) desde la primera tarjeta y marcar los impuestos como «por definir».
- Dar un estado visible y un próximo paso a cada pago.
- Usar objetivos táctiles de 48px como mínimo.
- Ofrecer una salida (lista de espera) donde algo está agotado.
### Don't:
- Fondo crema u off-white en la compra.
- Itálicas de acento en titulares, etiquetas numeradas, etiquetas en monospace, botones píldora.
- Gradiente en el texto, glass decorativo, borde de color a un lado de una tarjeta.
- Prometer «sin cargos» mientras los impuestos estén sin decidir.
