(function ($) {
  $(document).ready(function () {
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

      // Hide nested
      $(".overlay-menu__item").removeClass("active");

      // if (!$($menu).hasClass("active")) {
      //   $($menu).addClass("active");
      //   $(".overlay-menu-col--1")
      //     .addClass("show")
      //     .find(".overlay-menu")
      //     .addClass("show");
      // } else {
      //   $($menu).removeClass("active");
      // }
    });
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

    $(".overlay-menu__link.toggle-nested").on("click", function () {
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
    $(".overlay-menu__close-btn").on("click", function () {
      const $menus = $(`[data-c-nested-menu-id].active`);
      $menus.each(function () {
        $(this).removeClass("active");
      });
    });
  });
})(jQuery);
