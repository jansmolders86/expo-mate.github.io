$(function () {
    var navIsOpen = false
        , mobileNav = $('#nav ul')
        , hamburgerElem = $('.hamburger')
        , viewPortOffset = $(window).scrollTop();

    $('#nav li a').on('click', function(e){
        e.preventDefault();
        var link = $(this).attr('href');

        if(link === '#footer' ){
            var linkPos = $(link).offset().top;
            $("html, body").animate({ scrollTop: linkPos });
        } else {
            window.location.href = '/'+link;
        }

        if (navIsOpen) {
            hamburgerElem.removeClass("is-active");
            mobileNav.removeClass("open");
        }
    });

    $('#nav li a').on('click', function(e){
        e.preventDefault();
        var link = $(this).attr('href');
        if(link.indexOf('.') !== -1) {
            window.location.href = link;
        } else if ($(this).hasClass('loc')){
            var link = $(this).attr('href');
            eraseCookie('lang');
            setCookie('lang',link,7);
            window.location.reload();
        } else {
            var linkPos = $(link).offset().top;
            $("html, body").animate({ scrollTop: linkPos });
        }

        if (navIsOpen) {
            hamburgerElem.removeClass("is-active");
            mobileNav.removeClass("open");
            navIsOpen = false;
        }
    });

    hamburgerElem.click(function(){
        $(this).toggleClass("is-active");
        mobileNav.toggleClass("open");
        navIsOpen = true;
    });

    $(window).on('scroll', function(){
        var scroll = ~~$(this).scrollTop();
        fixNav(scroll);
    });

    $('.contact-btn').on('click', function(){
        var footerOffset = $('footer').offset().top;
        $("html, body").animate({ scrollTop: footerOffset });
    });

    fixNav(viewPortOffset);
});


function fixNav(scroll){
    var nav = $("#nav");
    if (scroll >= 500) {
        nav.addClass("fixed");
    } else {
        nav.removeClass("fixed");
    }
}