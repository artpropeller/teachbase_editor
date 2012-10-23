/**
 * Created with JetBrains WebStorm.
 * User: Ivan
 * Date: 23.10.12
 * Time: 10:51
 * To change this template use File | Settings | File Templates.
 */
//-------------------------------- begin -------------------------------------//
// скрытие панели привью

$(function(){
    $('.slide_menu').click(function(){
        $('.preview-block-cont').toggle(0);
        $(this).toggleClass('active')
    });
});
//-------------------------------- end -------------------------------------//
