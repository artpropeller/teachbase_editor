var clicker = '<div class="clicker"></div>';


function nod(a, b) {
    var c = a;
    for (c = a; c > 0; c--) {
        if (a % c == 0 && b % c == 0) return c;
    }
    return c
}

function resizeWorkArea(anim, width) {
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

    panel.find('.scroll').height(panel.height() - 63);

//    параметры рабочего листа
    var ratioX = 10, //соотношение сторон листа изначально 10x7
        ratioY = 7,
        animate = anim ? true : false,
        margin = 12, //минимальный отступ от краев
        p = (sw ? 176 : 0) + margin,
        scale = $('#zoom').slider('value'),
        empty = (body.width() - p - 45 - margin / 2), //доступное пространство
        orientation = page.hasClass('vertical') ? 'vertical' : 'gorizontal',
        wrapper = $('#wrapper-page');

    if (width && width==1) {
        scale = 1;
    }




    wrapper.css({
        'height':h_body - margin * 2,
        'margin-left':p,
        'margin-top':margin,
        'margin-right':45 + margin
//        'width': (body.width() - p - 45 - margin*3)+'px',
    });


    wrapper.find('.scroll').jScrollPane({
        autoReinitialise:false,
        verticalGutter:0,
        horizontalGutter:0,
        hideFocus:true,
        autoReinitialiseDelay:1
    });

    empty = wrapper.width();

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

    var h_page = wrapper.height() - 17,
        w_page = pageWidth(h_page);

    while (w_page > empty) {
        h_page--;
        w_page = pageWidth(h_page);
    }

    h_page = h_page * scale;

    var base = (w_page - 10);

    w_page = (w_page - 10) * scale;

    if (width && width==2) {
        w_page = empty - 10;
        h_page = (w_page / (orientation == 'gorizontal' ? ratioX : ratioY)) * (orientation == 'gorizontal' ? ratioY : ratioX);
        $('#zoom').slider('value',w_page/base);
        page.addClass('wide');
    }
    else {
        page.removeClass('wide');
    }


    //добавляем свойства к странице и ставим ее посередине
    var options = {
//        'margin-right':(45 + margin / 2) + 'px',
        'margin-right':'auto',
        'width':w_page + 'px',
        'height':h_page + 'px',
//        'margin-left':(((body.width() - p - w_page - margin / 2 - 45) / 2) + p) + 'px',
        'margin-left':'auto',
        'margin-bottom':'7px',
        'margin-top':h_page < wrapper.height() ? ((wrapper.height() - h_page) / 2 ) + 'px' : 0
    };



    if (h_page + 17 < wrapper.find('.scroll').height()) {
        wrapper.find('.jspPane').css('left', 0);
    }
    else {
        $.extend(options, {
                'margin-top':'7px'}
        );
    }



    $.extend(options,{'left': w_page > wrapper.width() ? '7px' : '0'});


    animate ? page.animate(options, 500, function () {
        wrapper.find('.scroll').data('jsp').reinitialise();
        if (width && width==1) {
            $('#zoom').slider('value',1);
        }

    }) : page.css(options);



}


function togglePagesPanel() {
    var sw = $('#hide-pages'),
        speed = 750;
    sw.toggleClass('active');
    $('#pages-panel').animate({left:sw.attr('class') == 'active' ? 0 : -176}, speed);
    $('#empty-front').animate({'margin-left':sw.attr('class') == 'active' ? 176 : 0}, speed);
    var ml = parseInt($('#wrapper-page').css('margin-left').split('px')[0]);
    var deli = $('#page').width() + 176 < $('#wrapper-page').width() ? 2 : 1;
    $('#wrapper-page').animate({'margin-left':sw.attr('class') == 'active' ? ml + 176 / deli : ml - 176 / deli}, speed,
        function () {
            if ($('#page').width() + 176 > $('#wrapper-page').width()) {
                $('#wrapper-page').find('.scroll').data('jsp').reinitialise()
            }
            if ($('#page').hasClass('wide')) {
                resizeWorkArea(true,2);
            }
        });
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

function removePage(event) {
    $(this).parents('li').slideUp(500, function(){$(this).remove(); reCountPages();});

}

function selectPage(event) {
    var th = $(this);
    if (!th.is('.active') && !$(event.originalEvent.srcElement).is('.remove')) {
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
        $('#wrapper-page').find('.scroll').data('jsp').reinitialise();
    }
}

function zoomSetValue(val) {
    var zoom = $('#zoom');
    zoom.slider('value', zoom.slider('value') + val);
}


$(function(){

    $('#zoom').slider({
        orientation:'vertical',
        range:'min',
        min:0.1,
        step:0.05,
        max:2,
        value:1,
        stop:function () {
            resizeWorkArea(true)
        }
    });

    $('#zoom-add').click(function () {
        if ($('#zoom').slider('option','max') != $('#zoom').slider('value')) {
        zoomSetValue(0.20);
        resizeWorkArea(true)
        }
    });
    $('#zoom-minus').click(function () {
        zoomSetValue(-0.20);
        resizeWorkArea(true)
    });

    resizeWorkArea(false);
    $(window).resize(function () {
        resizeWorkArea(false)
    });

    $('#hide-pages').click(togglePagesPanel);

    $('#pages-panel .upload .choice:not(".noactive")>a').click(choiceUploadFile);

    $('.clicker').live('click', function () {
        hideChoiceUpload();
    });

    $('#pages-panel .upload li a').click(hideChoiceUpload);


    $('li .page img').bind('dragstart', function (event) {
        event.preventDefault();
    });

    var listing = $('#listing');

    listing.sortable({
        axis:"y",
//        appendTo: '#pages-panel',
        placeholder:'marker',
//        helper: 'clone',
        scrollSensitivity: 0,
        scrollSpeed: 400,
        scroll: true,

        stop:function (ev, ui) {
//            next = ui.item.next();
//            next.css({'-moz-transition':'none', '-webkit-transition':'none', 'transition':'none'});
//            setTimeout(next.css.bind(next, {'-moz-transition':'border-top-width 0.3s ease-in', '-webkit-transition':'border-top-width 0.3s ease-in', 'transition':'border-top-width 0.3s ease-in'}));
            reCountPages();
        }
//        start:function (e, ui) {        // new lines to
//            $(ui.placeholder).slideUp(); // remove popping
//        }, // effect on start
//        change:function (e, ui) {
//            $(ui.placeholder).hide().slideDown();
//        }
    });
    listing.disableSelection();

    listing.find('.remove').click(removePage);

    $('#pages-panel .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:10
    });

    $('#listing li').click(selectPage);

    $('#toolbar .buttons .wide').click(function () {
        $('#wrapper-page').find('.scroll').data('jsp').scrollTo(0,0);
        resizeWorkArea(true, 1);
    });

    $('#toolbar .buttons .width').click(function () {
        $('#wrapper-page').find('.scroll').data('jsp').scrollTo(0,0);
        resizeWorkArea(true, 2);
    });

    $('#toolbar .ico .del').click(function(){
        $(this).parents('.ico').remove();
    });

});
