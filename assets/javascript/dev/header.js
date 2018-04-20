$(function () {
    var navIsOpen = false
        , mobileNav = $('#nav ul')
        , hamburgerElem = $('.hamburger')
        , viewPortOffset = $(window).scrollTop();

    $('#nav li a').on('click', function(e){
        e.preventDefault();
        var navLink = $(this).attr('href');
        if(navLink.indexOf('.') !== -1) {
            window.location.href = navLink;
        } else if ($(this).hasClass('loc')){
            eraseCookie('lang');
            setCookie('lang',navLink,7);
            window.location.reload();
        } else if(navLink.indexOf('#') !== -1) {
            var linkPos = $(navLink).offset().top;
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