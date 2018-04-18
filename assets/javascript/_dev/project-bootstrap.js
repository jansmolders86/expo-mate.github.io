$(function(){
    // Load projects
    if ($('body').hasClass('projects')){
        var url = './assets/json/content.json';
        var hash = window.location.hash;
        $.getJSON(url, function(data) {
            var loc = getCookie('lang');
            var projectDetail = data[loc].pages.projects;
            var section = $('#projects .projects-wrapper');

            $.each(projectDetail, function (index, item) {
                var imageArray = [];
                var imageContent = item.images;
                var count = parseInt(index) + 1;
                if (imageContent && imageContent.length > 0) {
                    $.each(imageContent, function (index, item) {
                        if(item){
                            imageArray.push('<img src="'+item.src+'" alt="'+item.alt+'" />')
                        }
                    });
                }

                section.append('<div class="project" id="project'+count+'">\n' +
                    '               <div class="project-close"></div>\n' +
                    '               <div class="project-images">\n' +
                    '                  <div class="slider">'+imageArray.join("")+'</div>\n' +
                    '               </div>\n' +
                    '               <div class="project-desc-wrapper">\n' +
                    '                  <div class="project-desc-content">\n' +
                    '                      <div class="project-header">\n' +
                    '                          <h2 class="project-title">'+item.title+'</h2>\n' +
                    '                          <div class="project-sub-title">'+item.subTitle+'</div>\n' +
                    '                      </div>\n' +
                    '                      <div class="project-desc">'+item.description+'</div>\n' +
                    '                  </div>' +
                    '               </div>' +
                    '            </div>');


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
            arrows: true,
            variableWidth: true
        });
    }
}

