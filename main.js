// navbar behaviour

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

gsap.registerPlugin(ScrollTrigger);

const links = gsap.utils.toArray(".nav__link:not(.w--current)");
const btn = document.querySelector("#contact-btn");
const logo = document.querySelector("#main-logo");

ScrollTrigger.create({
  trigger: '[data-color="black"]',
  start: "top top",
  end: "bottom center",
  onEnter: () => setColor("white"),
  onLeaveBack: () => setColor("black")
});

function setColor(color) {
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (windowWidth > 992) {
    links.forEach((link) => gsap.to(link, { color: color, duration: 0.1 }));
  }
  if (color === "white") {
    gsap.to("#contact-btn path", { stroke: "white", duration: 0.1 }); // target SVG path
    gsap.to(logo, { filter: "invert(100%)", duration: 0.1 });
  } else {
    gsap.to("#contact-btn path", { stroke: "#07070A", duration: 0.1 }); // reset SVG path to initial
    gsap.to(logo, { filter: "invert(0%)", duration: 0.1 });
  }
}

// slick for a visux slider

$(document).ready(function () {
  $(".testimonials__slider").slick({
    dots: false,
    speed: 1000,
    infinite: true,
    // slidesToShow: 2,
    variableWidth: true,
    // slidesToScroll: 2,
    swipeToSlide: true,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
    touchThreshold: 300,
    responsive: [
      {
        // tablet
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        // mobile portrait
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".slider-prev").click(function () {
    $(this)
      .closest(".section")
      .find(".testimonials__slider")
      .slick("slickPrev");
  });

  $(".slider-next").click(function () {
    $(this)
      .closest(".section")
      .find(".testimonials__slider")
      .slick("slickNext");
  });

  $(".slick-prev, .slick-next").css("display", "none");
});

$(document).ready(function () {
  // Function to run on load and resize
  function checkWidth() {
    var windowSize = $(window).width();

    if (windowSize > 991) {
      $(".w-background-video").hover(
        function () {
          $(this).find("video")[0].play();
        },
        function () {
          $(this).find("video")[0].pause();
        }
      );
    } else {
      $(".w-background-video").off("mouseenter mouseleave"); // Remove hover effect for small screens
      $(".w-background-video")
        .find("video")
        .each(function () {
          $(this).prop("autoplay", true); // Set autoplay for small screens
          $(this)[0].play();
        });
    }
  }

  // Execute on load
  checkWidth();

  // Bind the event listener
  $(window).resize(checkWidth);
});

$(document).ready(function () {
  $("[fs-accordion-element='accordion']")
    .find("[fs-accordion-element='trigger']")
    .first()
    .trigger("click");
});

// team hovers

$(document).ready(function () {
  var typingTimers = {};

  $(".career__item").each(function (index) {
    var $thisItem = $(this);
    var $image = $thisItem.find("#image");
    var $name = $thisItem.find("#name");
    var $quote = $thisItem.find("#quote");
    var $position = $thisItem.find("#position");
    var originalImageHeight = "3em";
    var originalImageSource = $image.attr("src"); // store the original image source
    var originalNameText = $name.text();
    var timerKey = "timer" + index;

    $thisItem.hover(
      function () {
        $image.stop().animate({ height: "1px" }, 300, function () {
          // this callback function will be executed after the animation completes
          $image.attr(
            "src",
            "https://uploads-ssl.webflow.com/636a2643830f4dc3b9935614/6522a033cb2aec6e4ed9f518_line-v.webp"
          ); // change the source to a solid color image
        });
        $name.addClass("text-color-accent");
        $position.fadeOut(300);
        typeWriter($quote.text(), $name, timerKey);
      },
      function () {
        $image
          .stop()
          .animate({ height: originalImageHeight }, 300, function () {
            // this callback function will be executed after the animation completes
            $image.attr("src", originalImageSource); // restore the original source
          })
          .attr("src", originalImageSource);
        $name.removeClass("text-color-accent");
        typeWriter(originalNameText, $name, timerKey).then(function () {
          $position.fadeIn(300);
        });
      }
    );
  });

  // typewriter effect for team slider

  function typeWriter(txt, element, timerKey) {
    return new Promise((resolve) => {
      element.text("");
      let i = 0;

      // Clear the previous timer if it exists
      if (typingTimers[timerKey]) {
        clearInterval(typingTimers[timerKey]);
      }

      typingTimers[timerKey] = setInterval(() => {
        if (i < txt.length) {
          element.append(txt.charAt(i));
          i++;
        } else {
          clearInterval(typingTimers[timerKey]);
          delete typingTimers[timerKey];
          resolve();
        }
      }, 30); // adjust the speed of typing here
    });
  }
});

// team slider
$(document).ready(function () {
  $(".careers__slider").slick({
    dots: false,
    speed: 1000,
    infinite: true,
    variableWidth: true,
    // slidesToScroll: 2,
    swipeToSlide: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
    touchThreshold: 100,

    responsive: [
      {
        // tablet
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        // mobile portrait
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".slider-prev").click(function () {
    $(this).closest(".section").find(".careers__slider").slick("slickPrev");
  });

  $(".slider-next").click(function () {
    $(this).closest(".section").find(".careers__slider").slick("slickNext");
  });

  $(".slick-prev, .slick-next").css("display", "none");
});

// fixed fonts sizes

$(window).on("load resize", function () {
  var windowWidth = $(window).width();
  if (windowWidth >= 991 && windowWidth <= 1440) {
    $("*:visible").each(function () {
      var $this = $(this);
      var fontSize = parseFloat($this.css("font-size"));

      // If font size is less than 13px, apply the fix.
      if (fontSize < 13) {
        $this.addClass("min-font-size-fix");
      }
    });
  } else {
    // Remove the class which fixes the font size when outside the viewport range.
    $(".min-font-size-fix").removeClass("min-font-size-fix");
  }
});

$(document).ready(function () {
  $('a[data-item="Coming Soon"]').attr("href", "#");
});
