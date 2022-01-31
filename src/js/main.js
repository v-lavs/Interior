/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js
//= include ../lib/bg-check.js
//= include ../lib/masonry.pkgd.min.js
//= include ../lib/waypoints/index.js


// CUSTOM SCRIPTS

$.fn.isInViewport = function () {
    const elementTop = $(this).offset().top;
    const elementBottom = elementTop + $(this).outerHeight();

    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};


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

                var self = this, $self = $(this), loopCount = 0, value = settings.from,
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
        jQuery('.backdrop').fadeIn();
        $('body').addClass('modal_open');
    });

    $('.menu__link, .btn-close').on('click', function (e) {
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });

    // POPUP
    $('.popup-trigger').on('click', function (e) {
        e.preventDefault();
        $('#popup').addClass('open_modal');
        jQuery('.backdrop').fadeIn();
        $('body').addClass('modal_open');
    })

    $('#closePopup,  .backdrop').on('click', function () {
        $('#popup').removeClass('open_modal');
        jQuery('.backdrop').fadeOut();
        $('body').removeClass('modal_open');
    });


    //BG CHECK

    if ($('.ui').length > 0) {
        BackgroundCheck.init({
            targets: '.ui',
        });
    }


    // BANNER SLIDER
    const slideSpeed =3000;
    if ($('.banner-slider').length > 0) {
        const homeBanner = new Swiper('.banner-slider', {
            loop: true,
            speed: slideSpeed,
            autoplay: {
                delay: 4500,
            }, pagination: {
                el: ".swiper-pagination",
            },
            on: {
                afterInit: function () {
                    const currSlide = this.slides[this.activeIndex];
                    $(currSlide).addClass('animated');

                },
                slideChange: function () {
                    const currSlide = this.slides[this.activeIndex];
                    console.log(currSlide)
                    $(currSlide).addClass('animated');

                    setTimeout(() => {
                        $('.banner-slider__slide:not(.swiper-slide-active)').removeClass('animated');
                    },slideSpeed);
                }
            }
        });

    }

    // SLIDER SOLUTION
    if ($('.slider-solutions').length > 0) {
        const sliderSolution = new Swiper(".slider-solutions", {
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 2000,
            pagination: {
                el: ".swiper-pagination", clickable: true, // dynamicBullets: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                slideChange: function (frame) {
                    $(frame.slides).each(function () {
                        let youtubePlayer = $(this).find('iframe').get(0);
                        if (youtubePlayer) {
                            youtubePlayer.contentWindow.postMessage(JSON.stringify({
                                "event": "command", "func": "pauseVideo", "args": ""
                            }), '*');
                        }
                    });

                    let youtubePlayer = $(frame.slides[frame.activeIndex]).find('iframe').get(0);
                    if (youtubePlayer) {
                        youtubePlayer.contentWindow.postMessage(JSON.stringify({
                            "event": "command", "func": "playVideo", "args": ""
                        }), '*');
                    }
                },
            }
        });

        function findActiveSlide(action) {
            let youtubePlayer = $('.slider-solutions .swiper-slide-active').find('iframe').get(0);
            if (youtubePlayer) {
                youtubePlayer.contentWindow.postMessage(JSON.stringify({
                    "event": "command", "func": action, "args": ""
                }), '*');
            }
        }

        let isPlaying = false;

        function autoplaySlide() {
            if ($('#Something').isInViewport() && !isPlaying) {
                isPlaying = true;
                findActiveSlide("playVideo");
            } else {
                if (isPlaying) {
                    isPlaying = false;
                    findActiveSlide("pauseVideo");
                }
            }
        }

        $(window).on('resize scroll', function () {
            if ($('.slider-solutions').isInViewport()) {
                findActiveSlide("playVideo");
            } else {
                findActiveSlide("pauseVideo");
            }
        });
    }

    function destroySwiper(sliderInstance) {
        if (sliderInstance instanceof Swiper && sliderInstance.initialized) {
            console.log(sliderInstance.initialized)
            sliderInstance.destroy(true, true);
            console.log('destroy')
        }
    }

    let sliderRealization;
    let sliderProject;

    function initSlider() {
        //SLIDER-REALIZATION
        if ($(window).width() <= 768) {
            sliderRealization = new Swiper("#sliderRealization", {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: ".swiper-pagination", clickable: true,
                }, breakpoints: {
                    640: {
                        slidesPerView: 2,
                    }
                }
            });
        } else {
            destroySwiper(sliderRealization);
        }

        //  SLIDER PROJECTS
        if ($(window).outerWidth() > 991 && $('.slider-project').length > 0) {
            sliderProject = new Swiper("#sliderProject", {
                allowTouchMove: false, spaceBetween: 15, autoplay: {
                    delay: 2000,
                }, loop: true, speed: 2000,
            });
        } else {
            destroySwiper(sliderProject);
        }
    }

    //  SINGLE PROJECT
    // project-masonry-block
    $('.project-masonry-block__inner').each(function (index, element) {
        let msnry = new Masonry(element, {
            itemSelector: '.project-masonry-block__card',
        });
    });

    //SLIDER TESTIMONIALS
    if ($('.testimonials').length > 0) {
        const sliderTestimonials = new Swiper(".testimonials", {
            slidesPerView: 'auto', spaceBetween: 30, slidesOffsetAfter: 80, speed: 1500, pagination: {
                el: ".wrap-pagination .swiper-pagination", clickable: true,
            }, breakpoints: {
                991: {
                    spaceBetween: 80,
                }
            },
        });
    }

    //STICKY BTN
    const stickyEl = $('#triggerBtnSticky');

    if (stickyEl.length > 0) {
        const sticky = $('#triggerBtnSticky').waypoint(function (direction) {
            if (direction === 'down') {
                $('.contact-btn').addClass('sticky');
            } else if (direction === 'up') {
                $('.contact-btn').removeClass('sticky');
            }
        }, {
            offset: '45%',
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
            slidesPerView: 1, loop: true, autoplay: true, effect: 'fade', spaceBetween: 10, pagination: {
                el: '.swiper-pagination', clickable: true,
            }, breakpoints: {
                992: {
                    loop: false, autoplay: false, allowTouchMove: false,
                }
            }
        });

        $memberItems.hover(function () {
            $memberItems.removeClass('active');
            $(this).addClass('active');
            const index = $(this).index();
            sliderMembers.slideTo(index);
        });
    }

//   CATEGORY FILTER
    function onFileterClick(e) {
        $(this).parents('.category-filter').toggleClass('opened');
        $('.category-filter__list-wrap').slideToggle(700);
    }

    function onFilterLinkClick(e) {

        $('.category-filter__link').removeClass('active');
        const activeText = $(this).text();
        $(this).addClass('active');

        $('.category-filter__current').text(activeText);

        $(this).parents('.category-filter').removeClass('opened');
        $('.category-filter__list-wrap').slideToggle(700);
    }

    function initCatFilter() {
        if (($(window).outerWidth() <= 1200) && ($('.category-filter').length > 0)) {
            $(".category-filter__current").bind("click", onFileterClick);
            $(".category-filter__link").bind("click", onFilterLinkClick);
        } else {
            $(".category-filter__current").unbind("click", onFileterClick);
            $(".category-filter__link").unbind("click", onFilterLinkClick);

            $('.category-filter').removeClass('opened');
            $('.category-filter__list-wrap').css({display: ''});
        }
    }

    initCatFilter();

//ANIMATIOON

    setTimeout(function () {
        var waypoints = $('.section_anim').waypoint(function (direction) {
            $(this.element).addClass('section_in-view')
        }, {
            offset: '75%'
        });
    }, 300);

// COUNTER
    if ($('.achievements').length > 0) {
        $('.achievements').waypoint(function (direction) {
            jQuery(function ($) {
                $('.count-number').data('countToOptions', {
                    formatter: function (value, options) {
                        return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                    }
                });

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
    }

    $(window).on('resize', function () {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function () {
            initCatFilter();
            initSlider();
        }, 250);
    });

});
