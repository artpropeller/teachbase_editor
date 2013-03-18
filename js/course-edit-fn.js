var clicker = '<div class="clicker"></div>',
    viewCourse = true,
    hoverPrev = new Array(0, 0),
    hoverNext = new Array(0, 0);

function inRange(arr, i) {
    if (i >= arr[0] && i <= arr[1]) return true;
    return false;
}

function nod(a, b) {
    var c = a;
    for (c = a; c > 0; c--) {
        if (a % c == 0 && b % c == 0) return c;
    }
    return c
}

function showArrows() {
    var sw = $('#hide-pages').attr('class') == 'active' ? true : false,
        page = $('#page').width(),
        area = $('#work-area').width(),
        work = area - 206 - 72,
        empty = (work - page) / 2;
    hoverNext[1] = area - 72;
    hoverNext[0] = hoverNext[1] - (page / 100) * 75 - empty;
    hoverPrev[0] = sw ? 206 : 65;
    hoverPrev[1] = hoverPrev[0] + (page / 100) * 25 + empty;
    $('#listing li:first').is('.active') ? $('#prev').fadeOut(100) : $('#prev').show(0);
    $('#listing li:last').is('.active') ? $('#next').hide(0) : $('#next').show(0);
}

$(function () {
    $('#work-area').bind('mousemove', function (e) {
        if (inRange(hoverNext, e.pageX)) {
            $('#next').addClass('hover')
        }
        else {
            $('#next').removeClass('hover')
        }
        if (inRange(hoverPrev, e.pageX)) {
            $('#prev').addClass('hover')
        }
        else {
            $('#prev').removeClass('hover')
        }
    }).click(function(e){
            if ($(e.originalEvent.srcElement).parents('.video-view').size() == 0) {
            if (inRange(hoverNext, e.pageX)) {
                nextSlide();
            }
            if (inRange(hoverPrev, e.pageX)) {
                prevSlide();
            }}
        });

});

function showLoader(){
    $('#page').hide(0, function(){
        $('#loader').show(0);
        $('#toolbar').addClass('noactive');
        timeInterval = setTimeout(function(){
            $('#page').show(0);
            $('#loader').hide(0);
            $('#toolbar').removeClass('noactive');
            resizeWorkArea(false);
            timeInterval = false;
        }, 1000);
    });
}

function nextSlide() {
    if (!timeInterval) {
    var li = $('#listing li.active').next();
    if (li.is('li')) {selectAfterDelete(li); $('#pages-panel .scroll').data('jsp').scrollToElement(li);}
        showLoader();
    }
}

function prevSlide() {
    if (!timeInterval) {
    var li = $('#listing li.active').prev();
    if (li.is('li')) {selectAfterDelete(li); $('#pages-panel .scroll').data('jsp').scrollToElement(li);}
        showLoader();
    }
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
        test = page.hasClass('test-view') ? true : false,
        video = page.hasClass('video-view') ? true : false,
        begin = page.hasClass('begin-view') ? true : false,
        end = page.hasClass('end-view') ? true : false,
        contents = page.hasClass('contents-view') ? true : false,
        wrapper = $('#wrapper-page');

    if (width && width == 1 || test) {
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

    if (width && width == 2) {
        w_page = empty - 10;
        h_page = (w_page / (orientation == 'gorizontal' ? ratioX : ratioY)) * (orientation == 'gorizontal' ? ratioY : ratioX);
        $('#zoom').slider('value', w_page / base);
        page.addClass('wide');
    }
    else {
        page.removeClass('wide');
    }

    if (video) {
        w_page = parseInt(page.find('.sizer').css('width').split('px')[0]);
        h_page = parseInt(page.find('.sizer').css('height').split('px')[0]);
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


    $.extend(options, {'left':w_page > wrapper.width() ? '7px' : '0'});


    animate ? page.animate(options, 500, function () {
        wrapper.find('.scroll').data('jsp').reinitialise();
        showArrows();
        if (width && width == 1) {
            $('#zoom').slider('value', 1);
        }

    }) : page.css(options);

    if (!animate) showArrows();

    var tools = $('#toolbar');

    if (test || video || begin || end || contents) {
        page.find('.test-page, .begin-page, .end-page').css('margin-top', ((h_page - 470) / 2) + 'px');
        $('.full-contents').css({'margin-top': ((h_page - 375) / 2) + 'px', 'height':'300px'});
        $('#page .full-contents').jScrollPane({
            autoReinitialise:true,
            autoReinitialiseDelay: 100
        });
        tools.find('.ico:not(.audio,.file), .zoomer, .buttons').hide(0);
    }
    else {
        tools.find('.ico:not(.audio,.file), .zoomer, .buttons').show(0);
    }


}


function togglePagesPanel() {
    var sw = $('#hide-pages'),
        speed = 750,
        ri = $('#page').width() > $('#wrapper-page').width() ? true : false;
    sw.toggleClass('active');
    $('#pages-panel').animate({left:sw.attr('class') == 'active' ? 0 : -176}, speed);
    $('#loader').animate({'marginLeft':sw.attr('class') == 'active' ? '+=80px' : '-=80px'}, speed);
    $('#empty-front').animate({'margin-left':sw.attr('class') == 'active' ? 176 : 0}, speed);
    $('#prev').animate({'left':sw.attr('class') == 'active' ? 206 : 65}, speed, showArrows);
    var ml = parseInt($('#wrapper-page').css('margin-left').split('px')[0]);
    var deli = $('#page').width() + 176 < $('#work-area').width() - (57) ? 2 : 1;
    if ($('#page').hasClass('wide')) deli = 1;
    $('#wrapper-page').animate({'margin-left':sw.attr('class') == 'active' ? ml + 176 / deli : ml - 176 / deli}, speed,
        function () {
            if (ri) $('#wrapper-page').find('.scroll').data('jsp').reinitialise();
            if ($('#page').hasClass('wide')) {
                resizeWorkArea(true, 2);
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
    up.find('ul').slideUp(200);
    $('.clicker').remove();
    return false
}

function reCountPages() {
    $('#listing li .num').each(function (i, e) {
        $(this).text(i + 1);
    });
}

function removePage(event) {
    var t = $(this),
        l = $(this).parents('li')[0];
    $(l).find('.page').append($('#template-delete').html());

    if ($(l).hasClass('active')) {
        var items = $('ul#listing li:not(".remove")'),
            pos = $.inArray(l, items);
        if (pos > 0) {
            selectAfterDelete($(items[pos - 1]));
        }
        else {
            selectAfterDelete($(items[pos + 1]));
        }

    }
    $(l).addClass('remove');

}

function restorePage(li) {
    li.find('.overlay').remove();
    li.removeClass('remove');
}

function selectPage(event) {
    if (!timeInterval) {
        showLoader();
    }
    if (!$(event.originalEvent.srcElement).is('.remove') && !$(this).hasClass('remove') && !$(this).hasClass('active')) $('#page').attr("class", '');
    var th = $(this),
        cl = th.attr('class');
    if (!th.is('.active') && !th.is('.remove') && !$(event.originalEvent.srcElement).is('.remove')) {
        $('#page').attr("class", cl);
        $('#listing li').removeClass('active');
        th.addClass('active');
        switch (cl) {
            case 'test-view':
                $('#page').html($('#template-test').html());
                break;
            case 'begin-view':
                $('#page').html($('#template-begin').html());
                break;
            case 'end-view':
                $('#page').html($('#template-end').html());
                break;
            case 'video-view':
                $('#page').html($('#template-video').html());
                break;
            case 'contents-view':
                $('#page').html($('#template-contents').html());
                break;
            default:
                $('#page').html($('#template-page').html());
                $('#page img').attr('src', th.attr('rel'));
                break;
        }


        resizeWorkArea(false);
        $('#wrapper-page').find('.scroll').data('jsp').reinitialise();
    }
}

function selectAfterDelete(li) {
    $('#page').attr("class", '');
    var cl = li.attr('class');
    $('#page').attr("class", cl);
    $('#listing li').removeClass('active');
    li.addClass('active');
    switch (cl) {
        case 'test-view':
            $('#page').html($('#template-test').html());
            break;
        case 'video-view':
            $('#page').html($('#template-video').html());
            break;
        case 'begin-view':
            $('#page').html($('#template-begin').html());
            break;
        case 'end-view':
            $('#page').html($('#template-end').html());
            break;
        case 'contents-view':
            $('#page').html($('#template-contents').html());
            break;
        default:
            $('#page').html($('#template-page').html());
            $('#page img').attr('src', li.attr('rel'));
            break;
    }

    resizeWorkArea(false);
    $('#wrapper-page').find('.scroll').data('jsp').reinitialise();
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
        max:2,
        value:1,
        stop:function () {
            resizeWorkArea(true)
        }
    });

    $('#zoom-add').click(function () {
        if ($('#zoom').slider('option', 'max') != $('#zoom').slider('value')) {
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
        resizeWorkArea(false);
    });

    $('#hide-pages').click(togglePagesPanel);

    $('#pages-panel .upload .choice:not(".noactive")>a').click(choiceUploadFile);

    $('.clicker').live('click', function () {
        hideChoiceUpload();
    });

//    $('#pages-panel .upload li a').click(hideChoiceUpload);

    $('.page .overlay a').live('click', function () {
        restorePage($(this).parents('li'))
    });
    $('.page .overlay .close').live('click', function () {
        $(this).parents('li').slideUp(300, function () {
            $(this).remove();
            reCountPages();
        })
    });


    $('li .page img').bind('dragstart', function (event) {
        event.preventDefault();
    });

    var listing = $('#listing');
    if (!viewCourse) {
        listing.sortable({
            axis:"y",
//        appendTo: '#pages-panel',
            placeholder:'marker',
//        helper: 'clone',
            scrollSensitivity:0,
            scrollSpeed:400,
            scroll:true,

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

    }

    listing.find('.remove').click(removePage);

    $('#pages-panel .scroll').jScrollPane({
        autoReinitialise:true,
        hideFocus:1,
        autoReinitialiseDelay:10
    });

    $('#listing li').click(selectPage);

    $('#toolbar .buttons .wide').click(function () {
        $('#wrapper-page').find('.scroll').data('jsp').scrollTo(0, 0);
        resizeWorkArea(true, 1);
    });

    $('#toolbar .buttons .width').click(function () {
        $('#wrapper-page').find('.scroll').data('jsp').scrollTo(0, 0);
        resizeWorkArea(true, 2);
    });

    $('#toolbar .ico:not(".audio") .del').click(function () {
        $(this).parents('.ico').remove();
    });

    $('#toolbar .ico.audio .del').click(function () {
        $(this).parents('.ico').removeClass('active');
    });


});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//добавление аудио

var audioTime = 0;
var timeInterval;

function getTimeRec(t) {
    var m = t / 60 | 0;
    var s = t % 60;
    if (s < 10) s = '0' + s;
    return '0' + m + ':' + s;
}

function parseTimeRec(t) {
    var s = t.split(':');
    return parseInt(s[0] * 60) + parseInt(s[1]);
}

function startAudioRecord() {
    var t = 0;
    $('#audio-record #rec-button').removeClass('rec').addClass('stop').html('Остановить');
    var c = $('#audio-record .counter');
    var time = $('#audio-record .timer');
    c.text(3).fadeIn(150, function () {
        timeInterval = setInterval(function () {
            t = parseInt(c.text()) - 1;
            if (t == 0) {
                clearInterval(timeInterval);
                c.hide(0);
                time.text('00:00');
                timeInterval = setInterval(function () {
                    audioTime++;
                    if (audioTime == 60) {
                        stopAudioRecord();
                    }
                    time.text(getTimeRec(audioTime));
                }, 1000);
            }
            c.text(t);
        }, 1000);
    });

}

function stopAudioRecord() {
    clearInterval(timeInterval);
    $('#audio-record #rec-button').removeClass('stop').addClass('save').html('Сохранить');
    $('#audio-record .help, #audio-record .timer').hide(0);
    $('#audio-record .play, #audio-record .timeline, #audio-record .del-audio').show(0);
    var tl = $('#audio-record .timeline');
    tl.find('.time').text('00:00 / ' + getTimeRec(audioTime));
    tl.find('.line').width(0);
}

function startAudio() {
    var c = $('#audio-record .timeline .time'),
        t = c.text().split(' / '),
        ct = parseTimeRec(t[0]);
    if (ct == audioTime) {
        ct = 0;
        c.text('00:00' + ' / ' + t[1]);
        $('#audio-record .timeline .line').css('width', 0);
    }
    timeInterval = setInterval(function () {
        ct++;
        c.text(getTimeRec(ct) + ' / ' + t[1]);
        $('#audio-record .timeline .line').css('width', ct / audioTime * 100 + '%');
        if (ct == audioTime) {
            clearInterval(timeInterval);
            $('#audio-record .play').addClass('pause');
        }
    }, 1000);
}

function setDefaultAudio() {
    var a = $('#audio-record');
    a.find('.help, .timer, #rec-button').show(0);
    a.find('.play, .timeline, .saveline, .del-audio').hide(0);
    a.find('#rec-button').removeClass('save').removeClass('stop').addClass('rec').html('<i></i>Записать');
    a.find('.timer').html('00:00');
    audioTime = 0;
    clearInterval(timeInterval);
    return false;
}

function saveAudio() {
    var a = $('#audio-record');
    a.find('.play, .timeline, .saveline, .del-audio, #rec-button').hide(0);
    var s = a.find('.saveline'),
        i = 0;
    s.show(0);
    s.find('.line').width(0);
    s.find('.percent').text(0);
    timeInterval = setInterval(function () {
        i++;
        s.find('.percent').text(i + '%');
        s.find('.line').css('width', i + '%');
        if (i == 100) {
            clearInterval(timeInterval);
            $.fancybox.close(true);
            setDefaultAudio();

            $('#toolbar .ico.audio').addClass('active');
        }
    }, 25)
}

$(function () {
    $('#audio-record #rec-button').click(function () {
        var t = $(this);
        var cls = t.attr('class');

        switch (cls) {
            case 'rec':
                startAudioRecord();
                break;
            case 'stop':
                if (parseTimeRec($('#audio-record .timer').text()) > 0) stopAudioRecord();
                break;
            case 'save':
                saveAudio();
                break;
        }
        return false;
    });

    $('#audio-record .play').click(function () {
        if ($(this).hasClass('pause')) {
            startAudio();
            $(this).removeClass('pause');
        }
        else {
            clearInterval(timeInterval);
            $(this).addClass('pause');
        }
    });
    $('#audio-record .del-audio').click(setDefaultAudio);


    $('.ico.audio').click(function (event) {
        if (!$(this).hasClass('active') && !$(event.originalEvent.srcElement).is('.del')) {
            $.fancybox($('#audio-record'), {
                margin:0,
                padding:0,
                scrollOutside:false,
                fitToView:false,
                minHeight:0
            });
        }
    });

});


$(function () {
    var p = location.pathname;
    $('.items a').each(function () {
        if ($(this).attr('href') == p) {
            $(this).parents('.items').addClass('active');
            $(this).parents('.top_menus').addClass('active')
        }
        ;
    });
    if ($('.items a').size() > 5) {
        $('#wood').css('background', 'url(/themes/kraftman/images/wood_bgs2.png) no-repeat top');
        $('.textinmain').css('padding-top', '460px');
        var s = $('.items a[href=' + $('.items.active').attr('rel') + ']');
        s.parents('.items').addClass('active');
        s.parents('.top_menus').addClass('active');
    }
});


//-------------------------------- begin -------------------------------------//
// просмотр теста

$(function () {
    $('.test-view label').live("click",
        function () {
            $(this).toggleClass('active');
            if ($(this).is('#timetest')) {
                if ($(this).is('.active')) {
                    $('#time-deadline').show();
                }
                else {
                    $('#time-deadline').hide();
                }
            }
        }
    );

    //баллы проценты

    $('#setbp .inparr .up').live("click", function () {
        var inp = $(this).parent().find('input');
        var val = parseInt(inp.val()) + 1;
        if (val <= parseInt(inp.attr('max'))) {
            inp.val(parseInt(inp.val()) + 1);
        }
        if ($(this).parent().find('input').is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        return false;
    });

    $('#setbp .inparr input').live("change", function () {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
    });

    $('#setbp #percent').live('change keyup', function () {
        if (!$(this).val()) {
            $(this).val('0');
        }
        changeBall();
    });

    $('#setbp #ball').live('change keyup', function () {
        if (!$(this).val()) {
            $(this).val('0');
        }
        changePercent();
    });

    function changeBall() {
        var i = parseFloat($('#ball').attr('max')) / 100;
        if (i) {
            $('#ball').val(parseInt(i * parseInt($('#percent').val())));
        }
        else {
            $('#ball').val(0);
        }
    }

    function changePercent() {
        var i = parseFloat($('#ball').val() / $('#ball').attr('max')) * 100;
        if (i) {
            $('#percent').val(parseInt(i));
        }
        else {
            $('#percent').val(0);
        }
    }

    $('#setbp .inparr input').live("keyup", function (e) {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        if ($(this).is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
    });

    $('#setbp .inparr input').live("keydown", function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault();
            }
        }
    });

    $('#setbp .inparr .down').live("click", function () {
        $(this).parent().find('input').val(parseInt($(this).parent().find('input').val()) - 1);
        if ($(this).parent().find('input').is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        return false;

    });


    $('.fullsettings').live("click", function () {
        $('.blockset').toggle(0);
    });


});
//-------------------------------- end -------------------------------------//



//-------------------------------- begin -------------------------------------//
// добавление теста в курс


$(function () {
    // показываем окно выбора
    $('a.u-test').fancybox({
        margin:0,
        padding:0,
        scrollOutside:false,
        fitToView:false,
        minHeight:0,
        beforeShow:hideChoiceUpload,
        afterShow:function () {

            // скролл тестов
            $('.test-list .scroll').jScrollPane();
        }
    });

    // выделение активного
    $('.test-list .test').click(function () {
        if ($(this).is('.active')) {
            $(this).removeClass('active');
        }
        else {
            $('.test-list .test').removeClass('active');
            $(this).addClass('active');
        }
    });

    // переключение категорий
    $('.choice-test .categories li a').click(function () {
        $('.choice-test .categories li').removeClass('active');
        $(this).parent().addClass('active');
        showTestCat();
        checkSearch(false);
        return false;
    });

    //показать тесты выбранной категории
    function showTestCat() {
        var cat = $('.choice-test .categories li.active a').attr('rel');
        var tests = $('.test-list .test');
        if (cat == 'all') {
            tests.show(0);
        }
        else {
            tests.hide(0);
            tests.each(function () {
                var cats = $(this).attr('cat').split(',');
                if ($.inArray(cat, cats) + 1) {
                    $(this).show(0);
                }
            });
        }
    }


//    проверка запроса поиска на соответствие списка
    function checkSearch(t) {
        var text;
        if (t) {
            text = t;
        }
        else {
            text = $('.test-items .search input').val();
        }
        if (text) {
            $('.test-list .test:visible').each(function () {
                if ($(this).find('.name').text().toLowerCase().indexOf(text.toLowerCase()) + 1 == 0) {
                    $(this).hide();
                }
            });
        }
        $('.test-list .scroll').jScrollPane();
    }

//живой поиск
    $('.test-items .search input').keydown(function (event) {
        var text;
        setTimeout(function () {
            text = $('.test-items .search input').val();
        }, 50);
        setTimeout(function () {
            showTestCat();
            checkSearch(text);
        }, 150);
    });


});


$(function () {
    $('.fancy').fancybox({
        margin:0,
        padding:0,
        scrollOutside:false,
        fitToView:false,
        minHeight:0,
        beforeShow:function () {
            hideChoiceUpload();
            showDefaultVideoScreen();
            showStep1();
        }
    });

});


//закачка документов

function showStep1() {
    $('#step2, #step3, #step4, #add_document .cont, #add_document .select_all').fadeOut(0, function () {
        $('#add_document .flange').fadeIn(100, function () {
            $('#load_doc').fadeIn(100);
        });
    });
    return false;
}


function showStep2() {
    $('#step2 .doc-name').show(0);
    $('#step2 .process').hide(0);
    $('#step2 .uploader').removeClass('green').find('.progress').width(0);
    $('#load_doc').fadeOut(350, function () {
        $('#step2').fadeIn(300, progressUpload);
    });

    return false;
}

function showStep3() {
    clearInterval(timeUpload);
    $('#add_document .flange').fadeOut(300, function () {
        $('#add_document .select_all').show(0);
        reCountSlides();
        $('#add_document .cont').fadeIn(300);
    });
}

function showStep4() {
    if ($('#add_document .file.active').size()) {
        $('#step4 .uploader').find('.progress').width(0);
        $('#step2, #step3, #add_document .select_all').hide(0);
        $('#add_document .cont').fadeOut(300, function () {
            $('#add_document .flange').fadeIn(100, function () {
                $('#step4').fadeIn(200, progressPaste);
            });
        });
    }
    return false;
}

var timeUpload;

function progressUpload() {
    var i = 0;
    timeUpload = setInterval(function () {
        i++;
        if (i == 100) {
            clearInterval(timeUpload);
            $('#step2 .doc-name').hide(0);
            $('#step2 .process').fadeIn(100);
            $('#step2 .uploader').addClass('green');
            setTimeout(showStep3, 1000);

        }
        $('#step2 .progress').css({'width':i + '%'});
    }, 25);
}

function progressPaste() {
    var i = 0,
        total = parseInt($('#step4 .total').text());
    timeUpload = setInterval(function () {
        i++;
        $('#step4 .cur').text(i);
        if (i == total) {
            clearInterval(timeUpload);
            $.fancybox.close(true);
            showStep1();
        }
        $('#step4 .progress').css({'width':(i / total) * 100 + '%'});
    }, 325);
}


function reCountSlides() {
    $('#add_document .choices .select').text($('#add_document .file.active').size());
    $('#add_document .choices .total').text($('#add_document .file').size());
    $('#step4 .total').text($('#add_document .file.active').size());
    $('#step4 .cur').text(0);
    checkSelectSlides();
}

function deselectSlides() {
    $('#add_document .file.active').removeClass('active');
    reCountSlides();
}

function selectSlides() {
    $('#add_document .file').addClass('active');
    reCountSlides();
}

function checkSelectSlides() {
    if ($('#add_document .file.active').size() != $('#add_document .file').size()) {
        $('#add_document .select_all').text('выделить все');
    }
    else {
        $('#add_document .select_all').text('снять выделение');
    }
}

$(function () {
    $('#load_doc .btn-download').click(showStep2);
    $('#add_document .file').click(function () {
        $(this).toggleClass('active');
        reCountSlides();

    });

    $('#add_document .select_all').click(function () {
        if ($(this).text() == 'снять выделение') {
            deselectSlides();
        }
        else {
            selectSlides();
        }
        return false;
    });


    $('#cancel-doc').click(showStep1);

    $('.cancel-set').click(showStep3);

    $('.settocourse').click(showStep4);


    $('#add_document .scroll').jScrollPane({
        autoReinitialise:true,
        autoReinitialiseDelay:25
    });

});


//меню выбора видео

$(function () {
    $('#add_video .menu li a').click(function () {
        $('#add_video .menu li').removeClass('active');
        $(this).parent().addClass('active');
        $('#add_video .flange').show(0);
        $('#add_video .hide').hide(0);
        $('#add_video ' + $(this).attr('href')).show(0);
        clearInterval(timeUpload);
        return false;
    });
});


//добавляем видео

function showDefaultVideoScreen() {
    $('#add_video .hide').hide(0);
    $('#add_video .flange, #video-from-pc').show(0);
    $('#add_video .menu li').removeClass('active').first().addClass('active');
    $('#video-from-pc-step4 .progress').width(0);
}

function showUploadForComputer() {
    $('#video-from-pc-step4 .progress').width(0);
    var i = 0;
    $('#video-from-pc, #video-from-pc-drag').hide(0);
    $('#video-from-pc-step4').fadeIn(300, function () {
        timeUpload = setInterval(function () {
            i++;
            if (i == 100) {
                clearInterval(timeUpload);
                $('#video-from-pc-step4').hide(0, function () {
                    $('#video-from-pc-step3').fadeIn(300);
                });
            }
            $('#video-from-pc-step4 .progress').css('width', i + '%');
        }, 40);
    });
    return false;
}


function showLibrary() {
    $('#add_video .hide,#add_video .flange ').hide(0);
    $('#video-from-library').show(0);
    return false;
}


function showYouTube() {
    $('#add_video .hide,#add_video .flange ').hide(0);
    $('#video-from-youtube').show(0);
}

$(function () {
    $('#video-from-pc .btn-download, #video-from-pc-drag .btn-download').click(showUploadForComputer);

    $('#video-from-pc-step3 .button-blue ,#video-from-youtube .settocourse,#video-from-youtube #cancel_but, #video-from-library .shad a').click(function () {
        $.fancybox.close(true);
        return false;
    });

    $('#library .btn-download').click(showLibrary);


    $('#video-from-library .left ul a').click(function () {
        if (!$($(this).parents('li')[0]).hasClass('active')) {
            $('#video-from-library .left li').removeClass('active');
            $($(this).parents('li')[0]).addClass('active');
        }
    });

    $('#video-from-library .left li em').click(function () {
        if (!$(this).hasClass('trail')) {
            $(this).addClass('trail');
            !$(this).parents('li').find('>ul').slideDown(200);
        }
        else {
            $(this).removeClass('trail');
            !$(this).parents('li').first().find('>ul').slideUp(200);
        }
    });


    $('#video-from-library .video').click(function () {
        if (!$(this).hasClass('active')) {
            $('#video-from-library .video').removeClass('active');
            $(this).addClass('active');
        }
    });


    $('#video-from-youtube .video').live('click', function () {
        if (!$(this).hasClass('active')) {
            $('#video-from-youtube .video').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#youtube .button-blue').click(function () {
        if ($('#search-key').val()) {
            $('#search-key2').val($('#search-key').val());
            showYouTube();
        }
        return false;
    });

    $('#show-more-youtube').click(function () {
        $('#video-from-youtube .inner').prepend($('#video-from-youtube .video').clone().removeClass('active').removeClass('last_row'));
        return false;
    });

});

this.tooltip = function () {
    /* CONFIG */
    xOffset = -23;
    yOffset = -135;
    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result
    /* END CONFIG */
    $(".tooltip").hover(function (e) {
            this.t = $(this).attr('alt');
            $("body").append("<p id='tooltip'>" + this.t + "</p>");
            $("#tooltip")
                .css("top", (e.pageY - xOffset) + "px")
                .css("left", (e.pageX + yOffset) + "px")
                .fadeIn("fast");
        },
        function () {
            $("#tooltip").remove();
        });
    $(".tooltip").mousemove(function (e) {
        $("#tooltip")
            .css("top", (e.pageY - xOffset) + "px")
            .css("left", (e.pageX + yOffset) + "px");
    });
};


$(function () {
    $('#toolbar .play').click(function () {
        $(this).toggleClass('pause');
    });
    tooltip();

});


