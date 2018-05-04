
var testimonial = $('#google-reviews');

$(function() {
        var url = './assets/json/content.json';
        $.getJSON(url, function (data) {
            var loc = getCookie('lang');
            var projectDetail = data[loc].pages.projects;

            for (i = 0; i < projectDetail.length; i++) {
                var review = projectDetail[i].review;
                var author = review.author || '';
                var reviewDate = review.date || '';
                var identifier = author.replace(/\s+/g, '-').toLowerCase();
                var starCount = review.stars || '';



                if(review) {

                    testimonial.addClass('hidden');

                    if(testimonial.length > 0){
                        testimonial.append('<div class="review" id="'+identifier+'">\n' +
                            '               <div class="review-author">'+author+'</div>\n' +
                            '               <div class="review-date">'+reviewDate+'</div>\n' +
                            '               <div class="review-stars"></div>\n' +
                            '               <div class="review-text">'+review.description+'</div>\n' +
                            '            </div>');

                            for (x = 0; x < starCount; x++) {
                                $('#'+identifier+'.review > .review-stars').append('<i class="icon-star-full"></i>')
                            }
                    }


                    setTimeout(function(){
                        reviewSlider();
                    },1000);


                }
            };


        });

});


function reviewSlider(){
    testimonial.removeClass('hidden');
    testimonial.not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        autoplaySpeed: 8000,
        arrows: true
    });



}
