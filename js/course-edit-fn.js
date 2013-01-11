var clicker = '<div class="clicker"></div>';

function resizeWorkArea(){
    var area = $('#work-area'),
        sw = $('#hide-pages').attr('class') == 'active' ? true : false,
        body = $('body'),
        front = $('#empty-front'),
        h_body = body.height()-47;

    if (!sw) $('#pages-panel').css('left', '-176px');

    area.height(h_body);

    front.height(h_body-17*2).css('margin-left', (sw ? 176 : 0) + 'px');

}


function togglePagesPanel() {
    var sw = $('#hide-pages'),
        speed = 750;

    sw.toggleClass('active');
    $('#pages-panel').animate({left: sw.attr('class') == 'active' ? 0 : -176}, speed);
    $('#empty-front').animate({'margin-left': sw.attr('class') == 'active' ? 176 : 0}, speed);
}

function choiceUploadFile(){
    var up = $('#pages-panel .upload');
    up.find('.choice').addClass('active');
    up.find('ul').slideToggle(200);
    $('body').append(clicker);
    return false;
}

function hideChoiceUpload(){
    var up = $('#pages-panel .upload');
    up.find('.choice').removeClass('active');
    up.find('ul').slideToggle(200);
    $('.clicker').remove();
    return false
}


$(function(){
    resizeWorkArea();
    $(window).resize(resizeWorkArea);

    $('#hide-pages').click(togglePagesPanel);

    $('#pages-panel .upload .choice>a').click(choiceUploadFile);

    $('.clicker').live('click',function(){
        hideChoiceUpload();
    });

    $('#pages-panel .upload li a').click(hideChoiceUpload);

});