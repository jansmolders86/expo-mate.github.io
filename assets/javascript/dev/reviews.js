
var testimonial = $('#google-reviews');

$(function() {
    var url = './assets/json/content.json';
    $.getJSON(url, function (data) {
        var loc = getCookie('lang');
        var projectDetail = data[loc].pages.projects;

        $.each(projectDetail, function (index, item) {
            var review = item.review
            , author = review.author || ''
            , desc = review.description || ''
            , reviewDate = review.date || ''
            , identifier = author.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
            , starCount = review.stars || '';

            if (review && review !== undefined && desc !== '' && desc !== undefined){
                testimonial.addClass('hidden');
                if(testimonial.length > 0){
                    testimonial.append('<div class="review" id="'+identifier+'">\n' +
                        '               <div class="review-author">'+author+'</div>\n' +
                        '               <div class="review-date">'+reviewDate+'</div>\n' +
                        '               <div class="review-stars"><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full fifth"></i></div>\n' +
                        '               <div class="review-text">'+review.description+'</div>\n' +
                        '            </div>');

                    if (starCount === 4) {
                        $('.review-stars').find('.fifth').remove();
                    }
                }
            }
        });

        setTimeout(function(){
            reviewSlider();
        },1000);
    });
});


function reviewSlider(){
    testimonial.removeClass('hidden');
    testimonial.not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        infinite: false,
        autoplaySpeed: 8000,
        arrows: true
    });
}
