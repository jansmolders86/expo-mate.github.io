$(function(){
    // Load projects
    if ($('body').hasClass('projects')){
        var url = './assets/json/content.json';
        var hash = window.location.hash;
        $.getJSON(url, function(data) {
            var loc = getCookie('lang')
            , homeproject = data[loc].pages.homepage.content.projects
            , reviewLink = homeproject.reviewLink || ''
            , projectDetail = data[loc].pages.projects
            , section = $('#projects .projects-wrapper');

            $.each(projectDetail, function (index, item) {
                var imageArray = []
                    , imageContent = item.images
                    , count = parseInt(index) + 1
                    , review = item.review
                    , author = review.author || ''
                    , reviewDate = review.date || ''
                    , identifier = author.replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
                    , starCount = review.stars || '';

                if (imageContent && imageContent.length > 0) {
                    $.each(imageContent, function (index, item) {
                        if(item){
                            imageArray.push('<div class="project-image" style="background-image: url('+item.src+')"></div>')
                        }
                    });
                }

                section.append('<div class="project" id="project'+count+'">\n' +
                                '	<div class="project-close"></div>\n' +
                                '	<div class="project-wrapper">\n' +
                                '		<div class="project-images">\n' +
                                '			<div class="slider">'+imageArray.join("")+'</div>\n' +
                                '		</div>\n' +
                                '		<div class="project-desc-wrapper">\n' +
                                '			<div class="project-desc-content">\n' +
                                '				<div class="project-header">\n' +
                                '					<h2 class="project-title">'+item.title+'</h2>\n' +
                                '					<div class="project-sub-title">'+item.subTitle+'</div>\n' +
                                '				</div>\n' +
                                '				<div class="project-desc"> \n' +
                                '				   <span>'+item.description+'</span> \n' +
                                '				   <a class="read-review" data-count="'+count+'">'+reviewLink+'</a> \n' +
                                '			   </div>\n' +
                                '			</div>\n' +
                                '		</div> \n' +
                                '	</div>\n' +
                                '	<div class="project-review">\n' +
                                '		<div class="review-close"></div> \n' +
                                '		<div class="review" id="'+identifier+'">\n' +
                                '			<div class="review-author">'+author+'</div>\n' +
                                '			<div class="review-date">'+reviewDate+'</div>\n' +
                                '           <div class="review-stars"><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full fifth"></i></div>\n' +
                                '			<div class="review-text">'+review.description+'</div>\n' +
                                '		</div>\n' +
                                '	</div>\n' +
                                '</div>');

                if (starCount === 4) {
                    $('.review-stars').find('.fifth').remove();
                }


                $('.project-images').on('click', function(){
                    if(!$('body').hasClass('open')) {
                        $(this).parent('.project').addClass('open');
                        var parentID = $(this).parent('.project').attr('id');
                        document.location.href = "#" + parentID;
                        $('body').addClass('open');
                        sliderInit(parentID);
                    }
                });

                $('.project-title').on('click', function(){
                    if(!$('body').hasClass('open')){
                        var parentElem = $(this).parent().parent().parent().parent();
                        parentElem.addClass('open');
                        var parentID = parentElem.attr('id');
                        document.location.href="#"+parentID;
                        $('body').addClass('open');
                        sliderInit(parentID);
                    }
                });

                $('.project-close').on('click', function() {
                    $('body').removeClass('open');
                    $(this).parent('.project').removeClass('open');
                    var parentID = $(this).parent('.project').attr('id');
                    $('#'+parentID+' .slider').slick("unslick");
                    window.location.hash="";
                    document.getElementById(parentID).scrollIntoView(true);
                });

                $('.read-review').on('click', function(e){
                    e.preventDefault();
                    var count = $(this).attr('data-count');
                    $("#project"+count).addClass('show-review').find('.project-review').addClass('show');
                });

                $('.review-close').on('click', function(){
                    $(this).parent().removeClass('show').parent('.project').removeClass('show-review');
                });

                if(hash && hash !== undefined){
                    hash = window.location.hash.substring(1);
                    var projectID = "project"+count;
                    if (projectID === hash) {
                        $('#'+hash).addClass('open');
                        $('body').addClass('open');
                        sliderInit(projectID);
                    }
                }
            });
        });
    }
});


function sliderInit(projectElem){
    if(typeof projectElem === 'string'){
        $('#'+projectElem+' .slider').not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 8000,
            arrows: true
        });
    }
}

