(function () {
  var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  var cursorsNormal = [
    'cursor/Vector 11.svg',
    'cursor/Vector 12.svg',
    'cursor/Vector 13.svg',
    'cursor/Vector 14.svg',
    'cursor/Vector 17.svg',
    'cursor/Vector 18.svg',
    'cursor/Vector 19.svg',
    'cursor/Vector 20.svg',
  ];

  var cursorsHover = [
    'cursor/Vector 15.svg',
    'cursor/Vector 16.svg',
  ];

  var style = document.createElement('style');
  style.textContent = '* { cursor: none !important; }';
  document.head.appendChild(style);

  var el = null;
  var idxNormal = 0;
  var idxHover  = 0;
  var lastX = 0, lastY = 0;
  var DIST = 80;
  var isHovering = false;

  function init() {
    el = document.createElement('img');
    el.id = 'cursor-svg';
    el.src = cursorsNormal[0];
    el.style.cssText = [
      'position:fixed',
      'top:0',
      'left:0',
      'width:36px',
      'height:36px',
      'pointer-events:none',
      'z-index:999998',
      'display:none',
      'object-fit:contain',
    ].join(';');
    document.body.appendChild(el);

    var dot = document.getElementById('cursor-dot');
    if (dot) dot.style.display = 'none';
  }

  var CLICKABLE = 'a, button, input, select, textarea, label, [role="button"], [onclick]';

  function onMove(e) {
    if (!el) return;
    el.style.display = 'block';
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';

    var overClickable = !!(e.target && e.target.closest && e.target.closest(CLICKABLE));

    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;
    var movedEnough = dx * dx + dy * dy >= DIST * DIST;

    if (overClickable !== isHovering) {
      // troca de modo: actualiza imagem imediatamente
      isHovering = overClickable;
      if (isHovering) {
        el.src = cursorsHover[idxHover % cursorsHover.length];
      } else {
        el.src = cursorsNormal[idxNormal % cursorsNormal.length];
      }
      lastX = e.clientX;
      lastY = e.clientY;
    } else if (movedEnough) {
      // mesmo modo, percorreu distância suficiente: avança
      if (isHovering) {
        idxHover++;
        el.src = cursorsHover[idxHover % cursorsHover.length];
      } else {
        idxNormal++;
        el.src = cursorsNormal[idxNormal % cursorsNormal.length];
      }
      lastX = e.clientX;
      lastY = e.clientY;
    }
  }

  function onLeave() { if (el) el.style.display = 'none'; }
  function onEnter() { if (el) el.style.display = 'block'; }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);
  document.addEventListener('mouseenter', onEnter);
})();
