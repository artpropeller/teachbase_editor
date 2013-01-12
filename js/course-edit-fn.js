var clicker = '<div class="clicker"></div>';


function nod(a,b) {
    var c = a;
    for (c = a; c>0; c--){
        if (a%c == 0 && b%c == 0) return c;
    }
    return c
}

function resizeWorkArea(anim) {
    var area = $('#work-area'),
        sw = $('#hide-pages').attr('class') == 'active' ? true : false,
        body = $('body'),
        front = $('#empty-front'),
        panel = $('#pages-panel'),
        page = $('#page'),
        h_body = body.height() - 47;

    if (!sw) panel.css('left', '-176px');

    area.height(h_body);

    front.height(h_body - 17 * 2).css('margin-left', (sw ? 176 : 0) + 'px');

    panel.find('.scroll').height(panel.height() - 60);

//    параметры рабочего листа
    var ratioX = 10, //соотношение сторон листа изначально 10x7
        ratioY = 7,
        animate = anim ? true : false,
        margin = 17, //минимальный отступ от краев
        p = (sw ? 176 : 0) + margin,
        scale = $('#zoom').slider('value'),
        empty = (body.width() - p - 45 - margin / 2), //доступное пространство
        orientation = page.hasClass('vertical') ? 'vertical' : 'gorizontal';

    function pageWidth(h) {
        return (h / (orientation == 'gorizontal' ? ratioY : ratioX)) * (orientation == 'gorizontal' ? ratioX : ratioY);
    }

//соотношение сторон в зависимости от разрешения экрана
//    var w_wind = screen.width,
//        h_wind = screen.height,
//        nods = nod(w_wind, h_wind);
//    console.log(w_wind, h_wind, nods);
//    ratioX = w_wind / nods;
//    ratioY = h_wind / nods;

    //вычисляем максимально возможную высоту и ширину

    var h_page = h_body - margin * 2,
        w_page = pageWidth(h_page);

    while (w_page > empty) {
        h_page--;
        w_page = pageWidth(h_page);
    }

    h_page = h_page * scale;
    w_page = w_page * scale;


    //добавляем свойства к странице и ставим ее посередине
    var options = {
        'margin-right':(45 + margin / 2) + 'px',
        'width':w_page + 'px',
        'height':h_page + 'px',
        'margin-left':(((body.width() - p - w_page - margin / 2 - 45) / 2) + p) + 'px',
        'margin-top':((h_body - margin * 2 - h_page) / 2 + margin) + 'px'
    };

    animate ? page.animate(options, 500) : page.css(options);

}


function togglePagesPanel() {
    var sw = $('#hide-pages'),
        speed = 750;

    sw.toggleClass('active');
    $('#pages-panel').animate({left:sw.attr('class') == 'active' ? 0 : -176}, speed);
    $('#empty-front').animate({'margin-left':sw.attr('class') == 'active' ? 176 : 0}, speed);
    var ml = parseInt($('#page').css('margin-left').split('px')[0]);
    $('#page').animate({'margin-left':sw.attr('class') == 'active' ? ml + 176 / 2 : ml - 176 / 2}, speed);
}

function choiceUploadFile() {
    var up = $('#pages-panel .upload');
    up.find('.choice').addClass('active');
    up.find('ul').slideToggle(200);
    $('body').append(clicker);
    return false;
}

function hideChoiceUpload() {
    var up = $('#pages-panel .upload');
    up.find('.choice').removeClass('active');
    up.find('ul').slideToggle(200);
    $('.clicker').remove();
    return false
}

function reCountPages() {
    $('#listing li .num').each(function (i, e) {
        $(this).text(i + 1);
    });
}

function removePage() {
    $(this).parents('li').remove();
    reCountPages();
}

function selectPage() {
    var th = $(this);
    if (!th.is('.active')) {
        $('#listing li').removeClass('active');
        th.addClass('active');
        $('#page img').attr('src', th.attr('rel'));
        if (th.hasClass('vertical')) {
            $('#page').addClass('vertical');
        }
        else {
            $('#page').removeClass('vertical');
        }
        resizeWorkArea(false);
    }
}

function zoomSetValue(val) {
    var zoom = $('#zoom');
    zoom.slider('value', zoom.slider('value') + val);
}


$(function () {

    $('#zoom').slider({
        orientation:'vertical',
        range:'min',
        min:0.1,
        step:0.05,
        max:1,
        value:0.55,
        change:function () {
            resizeWorkArea(true)
        }
    });

    $('#zoom-add').click(function () {
        zoomSetValue(0.1)
    });
    $('#zoom-minus').click(function () {
        zoomSetValue(-0.1)
    });

    resizeWorkArea(false);
    $(window).resize(function () {
        resizeWorkArea(false)
    });

    $('#hide-pages').click(togglePagesPanel);

    $('#pages-panel .upload .choice>a').click(choiceUploadFile);

    $('.clicker').live('click', function () {
        hideChoiceUpload();
    });

    $('#pages-panel .upload li a').click(hideChoiceUpload);


    $('ul#listing li .page img').bind('dragstart', function (event) {
        event.preventDefault();
    });

    var listing = $('#listing');

    listing.sortable({
        axis:"y",
        stop:reCountPages
    });
    listing.disableSelection();

    listing.find('.remove').click(removePage);

    $('#pages-panel .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:10
    });

    $('#listing li').click(selectPage);


});