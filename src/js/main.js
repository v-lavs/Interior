/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../lib/waypoints/index.js
//= include ../lib/bg-check.js


// CUSTOM SCRIPTS

$(document).ready(function () {
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
        const homeBanner = new Swiper('.banner-slider',  {
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

    //ANIMATIOON

    setTimeout(function () {
        var waypoints = $('.section_anim').waypoint(function (direction) {
            $(this.element).addClass('section_in-view')
        }, {
            offset: '75%'
        });
    }, 300);

});
