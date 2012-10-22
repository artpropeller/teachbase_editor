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


$(function(){
    // показываем окно выбора
    $('a.new-test').fancybox({
        beforeShow:function(){
            $('.blank-cover').remove();
            $('.new-course').hide(0);
            $('.create').removeClass('active');
        },
        afterShow: function(){
            // скролл тестов
            $('.test-list .scroll').jScrollPane();
        }
    });

    // выделение активного
    $('.test-list .test').click(function(){
       if ($(this).is('.active')) {
           $(this).removeClass('active');
       }
        else {
           $('.test-list .test').removeClass('active');
           $(this).addClass('active');
       }
    });

    // переключение категорий
    $('.choice-test .categories li a').click(function(){
        $('.choice-test .categories li').removeClass('active');
        $(this).parent().addClass('active');
        showTestCat();
        checkSearch(false);
        return false;
    });

    //показать тесты выбранной категории
    function showTestCat(){
        var cat = $('.choice-test .categories li.active a').attr('rel');
        var tests = $('.test-list .test');
        if (cat == 'all') {
            tests.show(0);
        }
        else {
            tests.hide(0);
            tests.each(function(){
                var cats = $(this).attr('cat').split(',');
                if ($.inArray(cat, cats) + 1) {
                    $(this).show(0);
                }
            });
        }
    }


//    проверка запроса поиска на соответствие списка
    function checkSearch(t){
        var text;
        if (t) {
            text = t;
        }
        else {
            text = $('.test-items .search input').val();
        }
        if (text) {
            $('.test-list .test:visible').each(function(){
                if ($(this).find('.name').text().toLowerCase().indexOf(text.toLowerCase()) + 1 == 0){
                    $(this).hide();
                }
            });
        }
        $('.test-list .scroll').jScrollPane();
    }

//живой поиск
    $('.test-items .search input').keydown(function(event) {
        var text;
        setTimeout(function(){text = $('.test-items .search input').val();}, 50);
        setTimeout(function() {
            showTestCat();
            checkSearch(text);
        }, 150);
    });



});

//-------------------------------- begin -------------------------------------//
// просмотр теста

$(function(){
    $('.test-view label').click(
        function(){
            $(this).toggleClass('active');
            if ($(this).is('#timetest')) {
                if ($(this).is('.active')){
                    $('#time-deadline').show();
                }
                else {
                    $('#time-deadline').hide();
                }
            }
        }
    );

    //баллы проценты

    $('#setbp .inparr .up').click(function() {
        var inp = $(this).parent().find('input');
        var val = parseInt(inp.val()) + 1;
        if (val <= parseInt(inp.attr('max'))) {
            inp.val(parseInt(inp.val()) + 1);}
        if ($(this).parent().find('input').is('#percent')) {changeBall();} else {changePercent();}
        return false;
    });

    $('#setbp .inparr input').change(function(){
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
    });

    $('#setbp #percent').bind('change keyup', function(){
        if (!$(this).val()){$(this).val('0');}
        changeBall();
    });

    $('#setbp #ball').bind('change keyup', function(){
        if (!$(this).val()){$(this).val('0');}
        changePercent();
    });

    function changeBall(){
        var i = parseFloat($('#ball').attr('max'))/100;
        if (i) {
            $('#ball').val(parseInt(i*parseInt($('#percent').val())));
        }
        else {
            $('#ball').val(0);
        }
    }

    function changePercent(){
        var i = parseFloat($('#ball').val()/$('#ball').attr('max'))*100;
        if (i) {
        $('#percent').val(parseInt(i));
        }
        else {
            $('#percent').val(0);
        }
    }

    $('#setbp .inparr input').keyup(function(e){
        if (parseInt($(this).val()) > parseInt($(this).attr('max'))) {
            $(this).val($(this).attr('max'));
        }
        if ($(this).is('#percent')) {changeBall();} else {changePercent();}
    });

    $('#setbp .inparr input').keydown(function(event) {
        console.log(event);
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
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

    $('#setbp .inparr .down').click(function() {
        $(this).parent().find('input').val(parseInt($(this).parent().find('input').val()) - 1);
        if ($(this).parent().find('input').is('#percent')) {changeBall();} else {changePercent();}
        return false;

    });


    $('.fullsettings').click(function(){
        $('.blockset').toggle(0);
    });



});


//-------------------------------- end -------------------------------------//
