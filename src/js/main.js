(function ($) {
  $(document).ready(function () {
    // Ajax form submit / Аякс форма настраивается тут
    $(".ajax-form").on("submit", function (e) {
      e.preventDefault();
      const url = $(this).attr("action");
      const method = $(this).attr("method");
      const dataType = $(this).data("type") || null;
      const serialized = $(this).serialize();
      const self = $(this);

      $.ajax({
        url,
        type: method,
        dataType: dataType,
        data: {
          action: "ajaxForm",
          serialized,
        },
        success: function (data) {
          // Clear inputs
          self.find("input, textarea").val("");

          // Open thanks popup
          $(".overlay-cdk").removeClass("active");
          $("body").addClass("overflow-hidden");
          $("#thanksPopup").addClass("active");
        },
        error: function (data) {
          // Basic error handling
          alert("Ошибка, повторите позднее");
          console.error(data);
        },
      });
    });

    if ($(".hero-swiper").length) {
      new Swiper(".hero-swiper", {
        // effect: "cube",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        autoplay: {
          delay: 50000,
          disableOnInteraction: false,
        },
        loop: true,
        allowTouchMove: false,
        on: {
          slideChange: function (e) {
            let index = e.activeIndex;
            // Pagination number

            let leadingZeros = String(index).padStart(2, "0");
            e.$el
              .find(".hero-swiper__pagination-number-val")
              .html(leadingZeros);
            if (e.isEnd) {
              e.$el.find(".hero-swiper__pagination-number-val").html("01");
            }

            // Overlay
            let $overlayEl = e.$el
              .closest(".hero-swiper-wrap")
              .find(".hero-swiper__overlay");

            let $itemsArray = e.$el
              .closest(".hero-swiper-wrap")
              .find(".hero-swiper__overlay-item");

            while (
              $($itemsArray[0])
                .children(".hero-swiper__overlay-item-link")
                .data("slide") !== index
            ) {
              let first = $itemsArray.shift();
              $itemsArray.push(first);
            }
            // Shift again to put second slide item into the first position
            let first = $itemsArray.shift();
            $itemsArray.push(first);

            e.$el
              .closest(".hero-swiper-wrap")
              .find(".hero-swiper__overlay-item")
              .remove();
            $overlayEl.append($itemsArray);

            e.$el
              .closest(".hero-swiper-wrap")
              .find(".hero-swiper__overlay-item:not(.contented)")
              .each(function () {
                $(this).detach();
                $(this).appendTo($overlayEl);
              });
          },
        },
      });

      $(".hero-swiper__overlay-item").each(function (index) {
        setTimeout(() => {
          $(this).addClass("entred");
        }, 500 * index);
      });
    }
    $(".hero-swiper__overlay-item-link").on("click", function (e) {
      e.preventDefault();
      let index = $(this).data("slide");

      let swiper = $(".hero-swiper")[0].swiper;

      swiper.slideTo(index);
    });

    if ($(".news-swiper").length) {
      $(".news-swiper").each(function () {
        const arrowPrev = $(this)
          .closest(".news-swiper-wrap")
          .find(".swiper-button-prev")[0];

        const arrowNext = $(this)
          .closest(".news-swiper-wrap")
          .find(".swiper-button-next")[0];

        new Swiper($(this)[0], {
          navigation: {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          },
          slidesPerView: 1,
          spaceBetween: 30,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          },
        });
      });
    }

    if ($(".products-swiper").length) {
      $(".products-swiper").each(function () {
        const arrowPrev = $(this)
          .closest(".products-swiper-wrap")
          .find(".swiper-button-prev")[0];

        const arrowNext = $(this)
          .closest(".products-swiper-wrap")
          .find(".swiper-button-next")[0];

        new Swiper($(this)[0], {
          navigation: {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          },
          slidesPerView: 1,
          spaceBetween: 30,
          breakpoints: {
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 5,
            },
          },
        });
      });
    }

    $(".open-thanks-popup").on("click", function (e) {
      e.preventDefault();
      $(".overlay-cdk").removeClass("active");

      $("body").addClass("overflow-hidden");
      $("#thanksPopup").addClass("active");
    });

    $(".open-contact-form-popup").on("click", function (e) {
      e.preventDefault();
      $(".overlay-cdk").removeClass("active");

      $("body").addClass("overflow-hidden");
      $("#contactFormPopup").addClass("active");
    });

    $(".open-how-to-order-popup").on("click", function (e) {
      e.preventDefault();
      $(".overlay-cdk").removeClass("active");

      $("body").addClass("overflow-hidden");
      $("#howToOrderPopup").addClass("active");
    });

    $(".open-contact-us-popup").on("click", function (e) {
      e.preventDefault();
      $(".overlay-cdk").removeClass("active");

      $("body").addClass("overflow-hidden");
      $("#contactUsPopup").addClass("active");
    });

    $(".open-delivery-popup").on("click", function (e) {
      e.preventDefault();
      $(".overlay-cdk").removeClass("active");

      $("body").addClass("overflow-hidden");
      $("#deliveryPopup").addClass("active");
    });

    // Close overlay on outside click
    $(".overlay-cdk").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      $(this).removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Close overlay on button click
    $(".overlay-cdk__close-btn").on("click", function (e) {
      $(".overlay-cdk").removeClass("active");
      $("body").removeClass("overflow-hidden");
    });
  });
})(jQuery);
