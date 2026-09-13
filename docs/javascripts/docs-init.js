(function () {
  function initIslands() {
    if (typeof window.NERV !== 'object' || !window.NERV) return;

    var islands = document.querySelectorAll('.nerv-docs-island[data-nerv-init]');
    for (var i = 0; i < islands.length; i++) {
      var island = islands[i];
      var kind = island.getAttribute('data-nerv-init');
      if (kind === 'bar-meters') {
        window.NERV.initBarMeters(island);
      }
    }
  }

  function whenDom(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  whenDom(function () {
    if (typeof window.NERV === 'object' && window.NERV) {
      initIslands();
      return;
    }
    document.addEventListener('nerv-docs:ready', initIslands);
  });
})();
