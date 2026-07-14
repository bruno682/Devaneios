(function () {
  // Corrige o overlay de transição (#page-transition / .cobrir) ficando preso
  // no estado "cobrir" quando a página é restaurada do bfcache pelo botão
  // voltar do browser. Sem isto, a página volta com o ecrã todo preto e só
  // se resolve com reload manual.
  function revealOverlay(overlay) {
    overlay.style.transition = 'none';
    overlay.classList.add('cobrir');
    overlay.offsetHeight;
    overlay.style.transition = '';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.remove('cobrir');
      });
    });
  }

  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;

    sessionStorage.removeItem('pageTransition');

    var overlay = document.getElementById('page-transition');
    if (!overlay) return;

    // Reexecuta a mesma animação de entrada usada num load normal, para a
    // página não aparecer "seca" (sem transição) ao voltar do bfcache.
    revealOverlay(overlay);
  });
})();
