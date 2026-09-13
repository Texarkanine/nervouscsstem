(function () {
  function initIslands() {
    if (typeof window.NERV !== 'object' || !window.NERV) return;

    var nerv = window.NERV;
    var islands = document.querySelectorAll('.nerv-docs-island[data-nerv-init]');
    for (var i = 0; i < islands.length; i++) {
      var island = islands[i];
      var kind = island.getAttribute('data-nerv-init');
      if (kind === 'bar-meters') {
        nerv.initBarMeters(island);
      } else if (kind === 'cartouches') {
        nerv.initCartouches(island);
      } else if (kind === 'hex') {
        nerv.initHexFlicker(island);
      } else if (kind === 'magi') {
        nerv.initMagiPanels(island);
      } else if (kind === 'radar') {
        var radars = island.querySelectorAll('.nerv-radar');
        for (var r = 0; r < radars.length; r++) {
          var radar = radars[r];
          if (radar.hasAttribute('data-nerv-radar-auto-blips')) {
            nerv.initRadarBlipAutoLayout(radar);
          }
          nerv.initRadarSweepSync(radar);
        }
      } else if (kind === 'label-box') {
        nerv.initLabelBoxGroups(island);
      } else if (kind === 'data-bg') {
        nerv.initDataBackgrounds(island);
      } else if (kind === 'ghost-segments') {
        nerv.initGhostSegments(island);
      } else if (kind === 'grid-labels') {
        var grids = island.querySelectorAll('.nerv-grid-marks');
        for (var g = 0; g < grids.length; g++) {
          nerv.initGridLabels(grids[g]);
        }
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
