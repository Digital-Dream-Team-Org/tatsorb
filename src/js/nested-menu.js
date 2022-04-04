(function ($) {
  $(document).ready(function () {
    // Open overlay menu
    $("[data-c-nested-menu]").on("click", function (e) {
      e.preventDefault();

      const id = $(this).data("cNestedMenu");
      const $menus = $(`[data-c-nested-menu-id="${id}"]`);
      if (!$menus.length) {
        console.error(
          "No available menu found, please check according data attribute",
        );
        return;
      }
      const menu = $menus.get(0);
      $(menu)
        .toggleClass("active")
        .css({ top: $(".main-header").outerHeight(true) });
      if ($(menu).hasClass("active")) {
        $(menu).animate({ height: "hide" }, 0);
        setTimeout(() => {
          $(menu).animate({ height: "show" }, 350);
        }, 0);
      }

      // Fold nested menu inside overlay
      $(".overlay-menu__item").removeClass("active");
    });
    // Close overlay menu on outside click
    $("body").on("click", function (e) {
      if ($(e.target).data("cNestedMenu")) {
        return;
      }
      const $menus = $(`[data-c-nested-menu-id].active`);
      if ($menus.length) {
        const $target = $(e.target);
        if ($target.length) {
          const parent = $target.closest(".overlay-menu__container");
          if (!parent.length || $target.hasClass("overlay-menu__container")) {
            $menus.each(function () {
              $(this).removeClass("active");
            });
          }
        }
      }
    });
    // Fix to close overlay menu on bootstrap dropdown click
    $(`[data-toggle="dropdown"]`).on("click", function () {
      const $menus = $(`[data-c-nested-menu-id].active`);
      if ($menus.length) {
        $menus.removeClass("active");
      }
    });
    // Close overlay menu on window resize
    $(window).on("resize", function () {
      const $menus = $(`[data-c-nested-menu-id]`);
      if ($menus.length) {
        $menus.removeClass("active");
      }
    });

    // Open nested menu (hover version)
    $(".overlay-menu-hover .overlay-menu__link.toggle-nested").on(
      "mouseover",
      function () {
        const self = $(this);
        const wWidth = $(window).outerWidth(true);
        const zIndex = wWidth >= 576 ? "-1" : "1";
        $(".overlay-menu__item").removeClass("active");
        const $parents = $(this).parents(".overlay-menu__item");
        $parents.each(function (index) {
          $(this).addClass("active");
          const nested = self
            .closest(".overlay-menu__item")
            .find(".overlay-menu--nested");

          $(nested).css({
            "z-index": zIndex,
            transform: "translateX(-100%)",
            transition: "350ms",
          });
          setTimeout(() => {
            $(nested).css({
              transform: "translateX(0%)",
            });
            setTimeout(() => {
              $(nested).css({
                "z-index": "",
                transform: "",
                transition: "",
              });
            }, 450);
          }, 0);
        });

        // Hide close btn inside nested
        $(".overlay-menu__close-btn").addClass("d-none");
        // Show back btn
        $(".overlay-menu__back-btn").removeClass("d-none");
      },
    );
    // Open nested menu (default)
    $(".overlay-menu")
      .not(".overlay-menu-hover")
      .find(".overlay-menu__link.toggle-nested")
      .on("click", function () {
        const self = $(this);
        const wWidth = $(window).outerWidth(true);
        const zIndex = wWidth >= 576 ? "-1" : "1";
        $(".overlay-menu__item").removeClass("active");
        const $parents = $(this).parents(".overlay-menu__item");
        $parents.each(function (index) {
          $(this).addClass("active");
          const nested = self
            .closest(".overlay-menu__item")
            .find(".overlay-menu--nested");

          $(nested).css({
            "z-index": zIndex,
            transform: "translateX(-100%)",
            transition: "350ms",
          });
          setTimeout(() => {
            $(nested).css({
              transform: "translateX(0%)",
            });
            setTimeout(() => {
              $(nested).css({
                "z-index": "",
                transform: "",
                transition: "",
              });
            }, 450);
          }, 0);
        });

        // Hide close btn inside nested
        $(".overlay-menu__close-btn").addClass("d-none");
        // Show back btn
        $(".overlay-menu__back-btn").removeClass("d-none");
      });
    // Close inner nested menu on mobile on button click
    $(".overlay-menu__back-btn").on("click", function () {
      const $items = $(this)
        .closest(".overlay-menu-wrap")
        .find(".overlay-menu__item.active");

      $(".overlay-menu__item").removeClass("active");
      $items.each(function (index) {
        if (index < $items.length - 1) {
          $(this).addClass("active");
        }
      });

      if (
        $(this).closest(".overlay-menu-wrap").find(".overlay-menu__item.active")
          .length === 0
      ) {
        // Hide close btn inside nested
        $(".overlay-menu__close-btn").removeClass("d-none");
        // Show back btn
        $(".overlay-menu__back-btn").addClass("d-none");
      }
    });
    // Close menu overlay on mobile on button click
    $(".overlay-menu__close-btn").on("click", function () {
      const $menus = $(`[data-c-nested-menu-id].active`);
      $menus.each(function () {
        $(this).removeClass("active");
      });
    });
  });
})(jQuery);
