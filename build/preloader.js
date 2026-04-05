(function () {
  var wrapper = document.querySelector('.preloader');
  var slides = document.querySelectorAll('.slide');
  var tags = document.querySelectorAll('.slide-tag');
  var total = slides.length;
  var current = 0;

  // Mobile detection (matches original: max-width 600px)
  var isMobile = window.matchMedia('(max-width: 600px)').matches;
  window.addEventListener('resize', function () {
    isMobile = window.matchMedia('(max-width: 600px)').matches;
  });

  // Image load → hide loader
  slides.forEach(function (slide) {
    var imgs = slide.querySelectorAll('.slide-img');
    imgs.forEach(function (img) {
      function hideLoader() {
        var loader = slide.querySelector('.loader');
        if (loader) loader.classList.add('loaded');
      }
      if (img.complete) hideLoader();
      else img.addEventListener('load', hideLoader);
    });
  });

  // Set initial active tag
  function updateTag(index) {
    tags.forEach(function (tag, i) {
      tag.classList.remove('active');
      tag.style.animation = 'none';
      // Force reflow to restart animation
      void tag.offsetHeight;
      tag.style.animation = '';
      if (i === index) {
        tag.classList.add('active');
      }
    });
  }
  updateTag(0);

  // Apply transform to all slides
  function goTo(index) {
    slides.forEach(function (slide) {
      slide.style.transform = 'translateY(-' + (100 * index) + '%) translateZ(0)';
    });
    updateTag(index);
  }

  // Block scroll/touch (original behavior)
  wrapper.addEventListener('wheel', function (e) { e.preventDefault(); }, { passive: false });
  wrapper.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

  // Click → go to commissions
  wrapper.addEventListener('click', function () {
    window.location.href = '/commissions';
  });

  // Auto-advance every 5 seconds
  var timer = setInterval(function () {
    if (current < total - 1) {
      current++;
      goTo(current);
    } else {
      clearInterval(timer);
      window.location.href = '/commissions';
    }
  }, 5000);
})();
