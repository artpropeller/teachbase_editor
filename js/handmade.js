




$(function() {
		$( "#slider-vertical" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			step: 100,
			max: 200,
			value: 100,
			slide: function( event, ui ) {
				$( "#amount" ).val( ui.value );
			}
		});
		$( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
	

 $("#scrollTest #tabs-1 .item").each(function(i){
			$(this).click(function(){
		
			var count = i+1;
				$("#scrollTest #tabs-1 .item").removeClass("active");
				$(this).addClass("active");
                if ($(this).is('.test')) {
                    $('.main-block').addClass('test-view');
                }
                else {
                    $('.main-block').removeClass('test-view');
                }
				$(".l").css("display", "none");
				var l = ".l"+count;

				$(l).css("display", "block");

        });
	    });

    $("#scrollTest #tabs-2 .item").each(function(i){
        $(this).click(function(){

            var count = i+1;
            $("#scrollTest #tabs-2 .item").removeClass("active");
            $(this).addClass("active");
            $(".l").css("display", "none");
            var l = ".l"+count;
            //  alert(l);

            $(l).css("display", "block");

        });
    });

});










$(function() {
	//$( "#tabs" ).tabs();
		
	var tab_active = $(".switch-tabs .active a").attr("href");
	$(".tabs").hide();
	$(tab_active).show();
	
	
	$(".switch-tabs li").click(function(){
		var parent = $(this).parents(".switch-tabs");
		parent.find(".active").removeClass("active");
		$(this).addClass("active");

		var tab_active = parent.find(".active a").attr("href");
		$(".tabs").hide();
		$(tab_active).show();
	});
});


	$(document).ready(function() {
				$("#scrollTest").scrollbars();
				$("#scrollTest1").scrollbars();
				$("#lib-photos").scrollbars();
				$("#google-photos").scrollbars();
			});



$(document).ready(function(){
$("#scrollTest, #scrollTest1,#lib-photos,#google-photos").mouseover(function(){
		$(".scrollarea", this).css("display","block");
		$(".scrollblock", this).css("display","block");
}); 
$("#scrollTest, #scrollTest1,#lib-photos,#google-photos").mouseout(function(){
		$(".scrollarea", this).css("display","none");
		$(".scrollblock", this).css("display","none");

}); 

}); 



$(document).ready(function(){
$("#vihod").click(function(){
		$(".preview-block-cont").css("display","none");
		$("#vihod1").css("display","block");
		$(".main-block").css("margin-right","60px");
				$(".main-block-big").css("margin-right","65px");


   
});  
  

$("#vihod1").click(function(){
			$(".preview-block-cont").css("display","block");
			$("#vihod1").css("display","none");
			$(".main-block").css("margin-right","225px");
						$(".main-block-big").css("margin-right","143px");

});    
});



$(function() {
			$("li .hover").hover(function(){
				$(".help-button", this).css("display", "block");
			 });
		$("li .hover").mouseleave(function(){
				$(".help-button", this).css("display", "none");
			 });		
		});











