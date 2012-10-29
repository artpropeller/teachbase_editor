/**
 * Created with JetBrains WebStorm.
 * User: Ivan
 * Date: 15.10.12
 * Time: 18:33
 * To change this template use File | Settings | File Templates.
 */
//-------------------------------- begin -------------------------------------//
// показ списков оглавления и привью
$(function () {

//    показывает или скрывает подуровни при просмотре привью курса

    $('#sortable .arr-set').live('click', function () {
        if (!$(this).is('.active')) {
            $(this).parent().parent().children('ol').show();
            $(this).addClass('active');
        }
        else {
            $(this).parent().parent().children('ol').hide();
            $(this).removeClass('active');
        }
    });

//    показывает или скрывает подуровни при просмотре оглавления курса

    $('#contents .arr-set').live('click', function () {
        if (!$(this).is('.active')) {
            $(this).parent().parent().children('ul').show();
            $(this).addClass('active');
        }
        else {
            $(this).parent().parent().children('ul').hide();
            $(this).removeClass('active');
        }
    });

});


//-------------------------------- begin -------------------------------------//
// перетаскивание слайдов (поддержка многоуровневости)
$(function () {
    $('#sortable').nestedSortable({
        handle:'div',
        items:'li',
        toleranceElement:'> div'
    });
});

//-------------------------------- begin -------------------------------------//
// обработка событий ввода названия курса

$(function () {

    // наведение на закладку, и установка курсора в появившееся поле ввода

    $('.bookmarklet').hover(function () {
        if (!$('#name-chapter-text').html()) {
            $(this).css('background', 'url("images/bookmarklet.png") bottom');
            $('#name-chapter').show().focus();
            $(this).animate(
                {
                    height:40
                }, 200
            );
        }
    }, function () {
    });

    // очистка введеного названия слайда

    $('.bookmarklet .del').click(function () {
        $('#name-chapter-text').hide(0).html('');
        $('#name-chapter').val('').show(0).focus();
        $('.bookmarklet').removeClass('active');
        return false;
    });

    // сохранение названия или скрытие пустого поля по нажатию "enter"

    $('#name-chapter').live("keypress", function (e) {
        if (e.which == 13)

            if ($(this).val()) {
                $('#name-chapter-text').html($(this).val()).show(0);
                $('#name-chapter').hide(0);
                $('.bookmarklet').addClass('active');
            }
            else {
                $('#name-chapter').hide();
                $('.bookmarklet').animate(
                    {
                        height:24
                    }, 200, function () {
                        $('.bookmarklet').css('background', 'url("images/bookmarklet_mini.png") no-repeat top');
                    }
                );
            }
    });

    // редактирование название по двойному клику

    $('#name-chapter-text').dblclick(function () {
        $('#name-chapter-text').hide(0).html('');
        $('#name-chapter').show(0).focus();
        $('.bookmarklet').removeClass('active');
    });


    // сохранение названия или скрытие пустого при потере фокуса с инпута

    $('#name-chapter').blur(function () {
        if ($(this).val()) {
            $('#name-chapter-text').html($(this).val()).show(0);
            $('#name-chapter').hide(0);
            $('.bookmarklet').addClass('active');
        }
        else {
            $('#name-chapter').hide();
            $('.bookmarklet').animate(
                {
                    height:24
                }, 200, function () {
                    $('.bookmarklet').css('background', 'url("images/bookmarklet_mini.png") no-repeat top');
                }
            );
        }

    });
});

//-------------------------------- begin -------------------------------------//
// кнопка "новый лист" и управление показом списка новых листов

$(function () {
    $('.create').click(function () {
        var e = $('.new-course');
        if (e.is(':visible')) {
            $(this).removeClass('active');
            $('.blank-cover').remove();
            e.hide();
        }

        else {
            e.show();
            $(this).addClass('active');
            $('body').prepend('<div class="blank-cover"></div>');
        }

    });
});


//-------------------------------- begin -------------------------------------//
// клики по пустой зоне

$(function () {
    $('.blank-cover').live('click', function () {
        // скрытие списка элементов для новых листов
        $('.new-course').hide(0);
        $('.create').removeClass('active');

        $(this).remove();

    });
});


//-------------------------------- begin -------------------------------------//
// добавление теста в курс


$(function () {
    // показываем окно выбора
    $('a.new-test').fancybox({
        beforeShow:function () {
            $('.blank-cover').remove();
            $('.new-course').hide(0);
            $('.create').removeClass('active');
        },
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

//-------------------------------- begin -------------------------------------//
// просмотр теста

$(function () {
    $('.test-view label').click(
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

    $('#setbp .inparr .up').click(function () {
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

    $('#setbp .inparr input').change(function () {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
    });

    $('#setbp #percent').bind('change keyup', function () {
        if (!$(this).val()) {
            $(this).val('0');
        }
        changeBall();
    });

    $('#setbp #ball').bind('change keyup', function () {
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

    $('#setbp .inparr input').keyup(function (e) {
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        if ($(this).is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
    });

    $('#setbp .inparr input').keydown(function (event) {
        console.log(event);
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

    $('#setbp .inparr .down').click(function () {
        $(this).parent().find('input').val(parseInt($(this).parent().find('input').val()) - 1);
        if ($(this).parent().find('input').is('#percent')) {
            changeBall();
        } else {
            changePercent();
        }
        return false;

    });


    $('.fullsettings').click(function () {
        $('.blockset').toggle(0);
    });


});

//-------------------------------- begin -------------------------------------//
// добавление таблиц

$(function () {


    $(".insert-table .mouse").mousemove(function (event) {
        var hl = $('.insert-table .highlight');
        var df = $('.insert-table .cells_container, .insert-table .unhighlight');
//        console.log(event.pageY - document.getElementById('inserttable').offsetTop);
        var height, width;
        if (typeof event.offsetX === "undefined" || typeof event.offsetY === "undefined") {
            var targetOffset = $(event.target).offset();
            event.offsetX = event.pageX - targetOffset.left;
            event.offsetY = event.pageY - targetOffset.top;
        }
        height = Math.ceil((event.offsetY) / 20);
        width = Math.ceil((event.offsetX) / 20);
        $('.insert-table .status .x').html(width);
        $('.insert-table .status .y').html(height);
        hl.css({'width':width * 20 + 'px', 'height':height * 20 + 'px'});
        if (height >= 4 && height <= 9) {
            df.css({'height':(height + 1) * 20 + 'px'});
        }
        else {
            if (height <= 5) {
                df.css({'height':(5 * 20) + 'px'});
            }
            if (height == 10) {
                df.css({'height':(10 * 20) + 'px'});
            }
        }
        if (width >= 4 && width <= 9) {
            df.css({'width':(width + 1) * 20 + 'px'});
        }
        else {
            if (width <= 5) {
                df.css({'width':(5 * 20) + 'px'});
            }
            if (width == 10) {
                df.css({'width':(10 * 20) + 'px'});
            }
        }
    });

    $(".insert-table .mouse").click(function () {
        alert("Размер: " + $('.insert-table .status .x').html() + ' x ' + $('.insert-table .status .y').html());
    });

});


//-------------------------------- begin -------------------------------------//
// редактирование видео

$(function () {

    //редактирование текста по клику на строку "placeholder"
    $('.videoblock .placeholder').click(function () {
        $(this).hide(0);
        $(this).next().show();
        $(this).next().focus();
        $('.videoblock textarea').autosize({
            append:''
        });

    });

    //удаление видео
    $('.videoblock .del').click(function () {
        $(this).parents('.videoblock').remove();
    });


    //установка высоты картинки привью видео


//    $('.videoblock img').one('load',function () {
//        var vid = $(this).parents('.videoblock');
//        vid.find('img').css({'height':vid.height() - (vid.find('.header').height() + vid.find('.description').height())});
//    }).each(function () {
//            if (this.complete) $(this).load();
//        });

    //активация редактирования видеоблока
    $('.videoblock').click(function () {
        if (!$(this).is('.active')) {
            $(this).addClass('active');
            var body = $('body');
            body.prepend('<div class="wrap-video"></div>');
            body.addClass('no-select');
            $(this).css('height', ($(this).find('.video').height() + 80) + 'px');
            $(this).find('.header').css('height', '30px');
            $(this).find('.description').css('height', '50px');
            var name = $(this).find('.header .name');
            if (name.html()) {
                name.hide(0);
                name.prev().show(0).html(name.text());
            }
            else {
                name.prev().prev().show(0);
            }
            var desc = $(this).find('.description .desc');
            if (desc.html()) {
                desc.hide(0);
                desc.prev().show(0).html(desc.text());
//                if ($(this).find('textarea').size() == 1) {
//                    $('.videoblock textarea').autoResize({
//                        animate:false,
//                        extraSpace:0
//                    });
//                }

            }
            else {
                desc.prev().prev().show(0);
            }
            $('.videoblock input:visible,.videoblock textarea:visible').each(function () {
                $(this).prev().hide(0);
            });
            var img = $(this).find('img');
            var img_h = img.height();
            var img_w = img.width();
            img.css({'width':'auto','height':'auto'});





            $(this).resizable({
                maxHeight: $('.main-block').height()-30,
                maxWidth: ($('.main-block').width()-30),
                minHeight:240,
                minWidth:230,
                aspectRatio: true,
                resize:function (e, el) {
                    var ar = $(el.originalElement);
                    var nh = ((ar.find('.header').width()-12) * img.height())/img.width();
                    console.log(nh);
                    ar.find('img').css({'height':nh, 'width':ar.find('.header').width()-12});
                    $(el.element).css('height',80+nh);
                }
            });
            img.css({'height':img_h, 'width':img_w});
        }
    });

    //отключение редактирования видеоблока
    $('.wrap-video').live('click', function () {
        var item = $('.videoblock');
        var name = item.find('.header input');
        name.hide(0);
        name.next().html(name.val());
        if (name.val()) {
            name.next().show(0);
        }
        else {
            name.prev().hide(0);
            name.next().hide(0);
            item.find('.header').css('height', '6px');
            item.css('height', (item.height() - 24) + 'px');
        }
//        if (item.find('textarea').size()>1) {
//            item.find('textarea:eq(0)').remove();
//        }
        var desc = item.find('textarea');
        desc.hide(0);
        desc.next().html(desc.val());
        if (desc.val()) {
            desc.next().show(0);
        }
        else {
            desc.prev().hide(0);
            desc.next().hide(0);
            desc.find('.description').css('height', '0');
            item.css('height', (item.height() - 43) + 'px');
        }
        item.removeClass('active');
        $('body').removeClass('no-select');
        $(this).remove();
    });


});

function textCounter(textarea, counterID, maxLen) {
    cnt = document.getElementById(counterID);
    if (textarea.value.length > maxLen) {
        textarea.value = textarea.value.substring(0, maxLen);
    }
//    cnt.innerHTML = maxLen - textarea.value.length;
}


//-------------------------------- end -------------------------------------//
