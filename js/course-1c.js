var intervalHover;

this.exelTooltip = function () {
    /* CONFIG */

    xOffset = -28;
    yOffset = -33;
    $(".hover-invisible:not('.nopop')").hover(function (e) {
            this.t = $(this).attr('rel');
            $("body").append("<div id='excel-tooltip'>" + this.t + "</div>");
            $("#excel-tooltip")
                .css("top", (e.pageY - xOffset) + "px")
                .css("left", (e.pageX + yOffset) + "px");
                $("#excel-tooltip").fadeIn(300);
        },
        function () {
            $("#excel-tooltip").remove();
        });
    $(".hover-invisible").mousemove(function (e) {
        $("#excel-tooltip")
            .css("top", (e.pageY - xOffset) + "px")
            .css("left", (e.pageX + yOffset) + "px");
    });
};

var _counter = 0;
var _seconds = 0;

var steps = {
    1: {'elements': '.e-step-1', 'invisible': false},
    2: {'elements': '.e-step-2', 'invisible': '.i-step-2'},
    3: {'elements': '.e-step-3', 'invisible': '.i-step-3'},
    4: {'elements': '.e-step-4', 'invisible': '.i-step-4'},
    5: {'elements': '.e-step-5', 'invisible': '.i-step-5'},
    6: {'elements': '.e-step-6', 'invisible': '.i-step-6'},
    7: {'elements': '.e-step-7', 'invisible': '.i-step-7'},
    8: {'elements': '.e-step-8', 'invisible': '.i-step-8'},
    9: {'elements': '.e-step-9', 'invisible': '.i-step-9'},
    10: {'elements': '.e-step-10', 'invisible': '.i-step-10'},
    11: {'elements': '.e-step-11', 'invisible': '.i-step-11'}
};

function initSlideExcel_1() {




    $('#page .hover-area.red-circle').each(function () {
        var h = parseInt($(this).css('height').split('px')[0]);
        $(this).find('.border-red').height(h - 12);
        var l = (parseInt($(this).css('left').split('px')[0]) + 8) + 'px';
        var t = (parseInt($(this).css('top').split('px')[0]) + 8) + 'px';
        if (!$(this).attr('bg')) {
        $(this).find('.border-red').css({
            'background': 'url(' + $(this).parents('.interactive').find('img').attr('src') + ') -' + l + ' -' + t
        });}
        else {
            $(this).find('.border-red').css({
                'background': 'url(' + $($(this).attr('bg')).find('img').attr('src') + ') -' + l + ' -' + t
            });
        }
    });
    $('#page .hover-area.red-circle').hover(function () {
        var th = $(this);
        console.log(th.attr('rel'));
        var invis = $(th.attr('rel')).show();


        invis.show(0);
//        invis.css({'visibility':'visible'});
        invis.click(function(){
            $(this).remove();
            th.remove();
            $("#excel-tooltip").remove();
        });
        invis.hover(function () {
        }, function () {
            $(this).hide(0);
            th.fadeIn(1);
        });
        th.fadeOut(1);

    }, function () {

    });


    setStep(1);

    exelTooltip();
}

function setStep(i) {
    if (i != 1) {
        $(steps[i - 1]['elements']).fadeOut(0);
        if (steps[i - 1]['invisible']) {
            $(steps[i - 1]['invisible']).css('visibility', 'hidden');
        }
    }
    else {
        $('.excel .invisibles').css('visibility', 'hidden');
        $('.excel .interact-arr, .excel .interactive-popup, .excel .hover-area').hide(0);
    }
    $(steps[i]['elements']).each(function () {
        var delay = parseInt($(this).attr('delay'));
        $(this).delay(delay).fadeIn(300);
    });
    if (steps[i]['invisible']) {
        $(steps[i]['invisible']).each(function () {
            $(this).css('visibility', 'visible');
        });
    }
}

function removeSymbols(input) {
    var value = input.value;
    var rep = /[-\;":'a-zA-Zа-яА-Я]/;
    if (rep.test(value)) {
        value = value.replace(rep, '');
        input.value = value;
    }
    if (parseFloat(input.value) > 20000) {
        $(input).removeClass('err').attr('readonly', 'readonly');
        $('#after-input-1').fadeIn(300).addClass('.e-step-7');
    }
}

function removeSymbols2(input) {
    var value = input.value;
    if (parseFloat(value[9])) {
        $(input).removeClass('err').attr('readonly', 'readonly');
        $('#after-input-2').fadeIn(300).addClass('.e-step-8');
    }
}
