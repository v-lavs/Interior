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

    //BG CHECK
    if ($('.ui').length > 0) {
        BackgroundCheck.init({
            targets: '.ui',
        });
    }


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
    if ($('.slider-solutions').length > 0) {
        const sliderSolution = new Swiper(".slider-solutions", {
            slidesPerView: 1,
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            observer: true,
            observeParents: true,
            on: {
                slideChange: function (frame) {
                    $('.swiper-slide').each(function () {
                        let youtubePlayer = $(this).find('iframe').get(0);
                        if (youtubePlayer) {
                            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                        }
                    });
                },
            }
        });
    }

    // const video = document.querySelector('.slider-solutions__thumb');
    //
    //   if (video) {
    //       const partnerSectionAnim = new Waypoint({
    //           element: video,
    //           handler: function (direction) {
    //               this.element.play();
    //           },
    //           offset: '50%'
    //       });
    //   }


    //  SLIDER PROJECTS
    if ($('.slider-project').length > 0) {
        const sliderProject = new Swiper("#sliderProject", {
            allowTouchMove: false,
            autoplay: {
                delay: 2000,
            },
            loop: true,
            speed: 2000,
        });
    }

    //  Single PROJECT

    // project-masonry-block
    $('.project-masonry-block').each(function (index, element) {
        let msnry = new Masonry(element, {
            // options
            itemSelector: '.project-masonry-block__card',
        });

    });

    let grid = document.querySelector('.grid');
    if (grid) {
        let msnry = new Masonry(grid, {
            // options
            itemSelector: '.gallery__item',
        });
    }

    //SLIDER TESTIMONIALS
    if ($('.testimonials').length > 0) {
        const sliderTestimonials = new Swiper(".testimonials", {
            slidesPerView: 1,
            spaceBetween: 80,
            slidesOffsetAfter: 80,
            speed: 1500,
            pagination: {
                el: ".wrap-pagination .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                581: {
                    slidesPerView: 'auto',
                },
            },
        });
    }

    //STICKY BTN
    const stickyEl = document.getElementById('triggerBtnSticky');

    if (stickyEl) {
        const sticky = new Waypoint({
            element: stickyEl,
            offset: '75%',
            handler: function (direction) {
                if (direction === 'down') {
                    $('.contact-btn').addClass('sticky');
                } else if (direction === 'up') {
                    $('.contact-btn').removeClass('sticky');
                }
            },
        });
    }

    //HIDE TEXT

    $(' .open-up').on('click', function (e) {
        e.preventDefault();
        $('.description').removeClass('text-hide');
        $(this).hide();
    });


    // HOVER BLOCK
    if (document.getElementById('sliderMembers')) {
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
    }

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




    // $(window).resize(function(){
    //     mySwiper.reInit() // or mySwiper.resizeFix()
    // });
});
