/**
 * Created with JetBrains WebStorm.
 * User: Ivan
 * Date: 23.10.12
 * Time: 10:51
 * To change this template use File | Settings | File Templates.
 */
//-------------------------------- begin -------------------------------------//
// скрытие панели привью

$(function () {
    $('.slide_menu').click(function () {
        if (!$(this).is('.active')) {
            $('.preview-block').animate({width:0}, 500);
            $('.next_ar').animate({right:50}, 500);
        }
        else {
            $('.preview-block').animate({width:207}, 500);
            $('.next_ar').animate({right:207}, 500);
        }
        $(this).toggleClass('active')
    });
});


//-------------------------------- begin -------------------------------------//
// переключение слайдов

$(function () {
    timeanimate = false;
    var sha = '<div class="shal"></div><div class="shar"></div>';


    $('#next_sl').click(function () {
        var ac = $('#tabs-1 .item.active');
        var next_list = 'l' + (parseInt(ac.parent().attr('rel').split('l')[1]) + 1);
        if (!timeanimate && $('#tabs li[rel=' + next_list + ']').size()) {
            timeanimate = true;
            var area = $('.main-block');
            next = area.clone();
            var w = area.innerWidth();
            next.css({'position':'absolute', 'left':w + 146, 'top':0});
            area.css({'position':'absolute', 'left':73, 'top':0});
            area.wrap('<div class="wrapper-area"></div>');
            var wrap = $('.wrapper-area');
            wrap.prepend(sha);
            wrap.css({'width':w + 146, 'height':area.innerHeight() + 40});
            wrap.append(next);
            $(next[0]).find('.l').hide(0);

            $('#tabs .item').removeClass('active');
            $('#tabs li[rel=' + next_list + ']>.item').addClass('active');
            if ($('#tabs .item.active').is('.test')) {
                next.addClass('test-view');
            }
            else {
                next.removeClass('test-view');
            }
            if ($('#tabs-1 .item.active').parent().children('ol').size()) {
                $('#tabs .item.active').parent().children('ol,ul').show();
                $('#tabs .item.active .arr-set').addClass('active');
            }
            next.find('.' + next_list).show();
            area.animate({left:-(w - 13)}, 1000);
            next.animate({left:73}, 1000, function () {
                next = next.clone();
                next.css({'position':'relative', 'left':0});
                wrap.remove();
                $('.cont').append(next);
                timeanimate = false;
            });
            return false;
        }
    });
    $('#prev_sl').click(function () {
        var ac = $('#tabs-1 .item.active');
        var next_list = 'l' + (parseInt(ac.parent().attr('rel').split('l')[1]) - 1);
        if (!timeanimate && $('#tabs li[rel=' + next_list + ']').size()) {
            timeanimate = true;
            var area = $('.main-block');
            next = area.clone();
            var w = area.innerWidth();
            next.css({'position':'absolute', 'left':-(w + 146), 'top':0});
            area.css({'position':'absolute', 'left':73, 'top':0});
            area.wrap('<div class="wrapper-area"></div>');
            var wrap = $('.wrapper-area');
            wrap.prepend(sha);
            wrap.css({'width':w + 146, 'height':area.innerHeight() + 40});
            wrap.append(next);
            $(next[0]).find('.l').hide(0);

            $('#tabs .item').removeClass('active');
            $('#tabs li[rel=' + next_list + ']>.item').addClass('active');
            if ($('#tabs .item.active').is('.test')) {
                next.addClass('test-view');
            }
            else {
                next.removeClass('test-view');
            }
            if ($('#tabs-1 .item.active').parent().children('ol').size()) {
                $('#tabs .item.active').parent().children('ol,ul').show();
                $('#tabs .item.active .arr-set').addClass('active');
            }
            next.find('.' + next_list).show();
            area.animate({left:w+146}, 1000);
            next.animate({left:73}, 1000, function () {
                next = next.clone();
                next.css({'position':'relative', 'left':0});
                wrap.remove();
                $('.cont').append(next);
                timeanimate = false;
            });
            return false;
        }
    });
});




//-------------------------------- end -------------------------------------//


