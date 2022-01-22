/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js
//= include ../lib/waypoints/index.js
//= include ../lib/bg-check.js


// CUSTOM SCRIPTS

$(document).ready(function () {
    //COUNTER UP
    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof (settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof (settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,
            to: 0,
            speed: 1000,
            refreshInterval: 100,
            decimals: 0,
            formatter: formatter,
            onUpdate: null,
            onComplete: null
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    // MOBILE MENU
    const nav = $('.header-nav');

    $('.btn-burger').on('click', function (e) {
        e.preventDefault();
        nav.toggleClass('open');
        $(this).toggleClass('open');
        $('body').toggleClass('modal-open');
    });

    $('.menu__link, .btn-close').on('click', function (e) {
        nav.removeClass('open');
        $('body').removeClass('modal-open');
    });

    // SMOOTH SCROLL TO ANCHOR

    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            var anchor = $.attr(this, 'href');

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 100
                }, 1500);
            }
        });
    }

    smoothScrollToAnchor('.scroll-down');
    smoothScrollToAnchor('.menu .menu__item');

    //BG CHECK
    BackgroundCheck.init({
        targets: '.ui',
    });


    // BANNER SLIDER
    if ($('.banner-slider').length > 0) {
        const homeBanner = new Swiper('.banner-slider', {
            loop: true,
            speed: 2000,
            autoplay: {
                delay: 4500,
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
    }

    // SLIDER SOLUTION
    if ($('.slider-solution').length > 0) {
        const sliderSolution = new Swiper("#sliderSolution", {
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    //  SLIDER PROJECTS
    if ($('.slider-project').length > 0) {
        const sliderProject = new Swiper("#sliderProject", {
            autoplay: {
                delay: 2000,
            },
            loop: true,
            speed: 2000,
        });
    }

    //SLIDER TESTIMONIALS
    if ($('.testimonials').length > 0){
       const sliderTestimonials = new Swiper(".testimonials", {
           slidesPerView: 1,
           spaceBetween: 80,
           slidesOffsetAfter: 80,
           speed: 1500,
           pagination: {
               el: ".wrap-pagination .swiper-pagination",
           },
           breakpoints: {
               581: {
                   slidesPerView: 'auto',
               },
           },
        });
}
    //STICKY BTN
    var sticky = new Waypoint({
        element: $('#triggerBtnSticky')[0],
        offset: '50%',
        handler: function (direction) {
            if (direction === 'down') {
                $('.contact-btn').addClass('sticky');
            } else if (direction === 'up') {
                $('.contact-btn').removeClass('sticky');
            }
        },
    });


    //HIDE TEXT

    $('.text-hide .open-up').on('click', function (e) {
        e.preventDefault();
        $('.text-hide .mob-hide').removeClass('mob-hide');
        $(this).hide();
    });


    // HOVER BLOCK
    const $memberItems = $('#membersTeams .members-team__item');
    const sliderMembers = new Swiper('#sliderMembers', {
        slidesPerView: 1,
        loop: false,
        effect: 'fade',
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    $memberItems.hover(function () {
        $memberItems.removeClass('active');
        $(this).addClass('active');
        const index = $(this).index();
        sliderMembers.slideTo(index);
    });

    //ANIMATIOON

    setTimeout(function () {
        var waypoints = $('.section_anim').waypoint(function (direction) {
            $(this.element).addClass('section_in-view')
        }, {
            offset: '75%'
        });
    }, 300);

    // COUNTER

    $('.achievements').waypoint(function (direction) {
        jQuery(function ($) {
            // custom formatting example
            $('.count-number').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });

            // start all the timers
            $('.timer').each(count);

            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                $this.countTo(options);
            }
        });
    }, {
        offset: '100%'
    });


    let elem = document.querySelector('.grid');
  let msnry = new Masonry( elem, {
        // options
        itemSelector: 'gallery__item',
    });
});
