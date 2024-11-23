$(window).on("load", function () {
  function fade() {
    var animation_height = $(window).innerHeight() * 0.25;
    var ratio = Math.round((1 / animation_height) * 10000) / 10000;

    $(".fade").each(function () {
      const $this = $(this);
      const rect = this.getBoundingClientRect(); // Get element's position relative to viewport
      const objectTop = rect.top;
      const objectBottom = rect.bottom;
      const windowHeight = $(window).innerHeight();

      // Skip updates if element has hover state
      if ($this.hasClass("hover")) {
        return;
      }

      if (objectTop < windowHeight && objectBottom > 0) {
        if (objectTop < windowHeight - animation_height) {
          // Fully visible
          $this.css({
            transition: "opacity 0.7s linear, transform 0.7s linear",
            opacity: 1,
            transform: "translateY(0)",
          });
          $this.addClass("visible");
        } else {
          // Partially visible
          const opacity = Math.min((windowHeight - objectTop) * ratio, 1);
          const translateY = (1 - opacity) * 20; // Adjust based on opacity
          $this.css({
            transition: "opacity 0.25s linear, transform 0.25s linear",
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
          });
        }
      } else {
        // Not visible
        $this.css({
          opacity: 0,
          transform: "translateY(20px)",
        });
      }
    });
  }

  // Initial setup for all fade elements
  $(".fade").css({
    opacity: 0,
    transform: "translateY(20px)",
  });

  // Add hover tracking
  $(".fade").on("mouseenter", function () {
    $(this).addClass("hover");
  });

  $(".fade").on("mouseleave", function () {
    $(this).removeClass("hover");
  });

  // Initial fade call and on-scroll handling
  fade();
  $(window).scroll(function () {
    fade();
  });
});
