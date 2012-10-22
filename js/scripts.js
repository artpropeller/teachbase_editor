$().ready(function(){ 
	$('.wysiwyg .icon.dropdown .dropdown-handler').click(function(){
		$(this).closest('.icon').addClass('opened');
	});
	
	$('*').mousedown(function(e){
		if (!$(e.target).closest('.dropdown-items').length)
		{
			$('.wysiwyg .icon.dropdown').removeClass('opened');
		}
	});
	
	$('.wysiwyg .icon-bg, .wysiwyg .dropdown-icon, .wysiwyg .dropdown-fontfamily-icon, .wysiwyg .icon.font-size .dropdown-items li').click(function(){
		var action = $(this).data('action');	
		switch(action)
		{
			case 'bold': alert('Жирный'); break;
			case 'italic': alert('Наклонный'); break;
			case 'align-left': alert('Выравнивание влево'); break;
			case 'align-center': alert('Выравнивание по центру'); break;
			case 'align-right': alert('Выравнивание вправо'); break;
			case 'list-unordered': alert('Маркированный список'); break;
			case 'list-ordered': alert('Нумерованный список'); break;
			case 'margin-increase': alert('Увеличить отступ'); break;
			case 'margin-reduce': alert('Уменьшить отступ'); break;
			case 'font-family-helvetica': alert('Шрифт Helvetica'); break;
			case 'font-family-beausans': alert('Шрифт Beausans'); break;
			case 'font-family-pragmatica': alert('Шрифт Pragmatica'); break;
			case 'size-large': alert('Большой размер'); break;
			case 'size-middle': alert('Средний размер'); break;
			case 'size-small': alert('Маленький размер'); break;
			case 'color': alert('Цвет шрифта'); break;
			case 'bg-color': alert('Цвет фона'); break;				
		}
		$('.wysiwyg .icon.dropdown').removeClass('opened');
	});
	
	
	// PPT CONTROLS
	$(".ppt-controls .btn-next").live("click", function(){
		alert("NEXT");
	});
	
	$(".ppt-controls .btn-prev").live("click", function(){
		alert("PREV");
	});
	
	$(".ppt-controls .btn-resize").live("click", function(){
		alert("RESIZE");
	});
	
	$(".ppt-slider-btn .back").live("click", function(){
		alert("BACK");
	});
	
	$(".ppt-slider-btn .remove").live("click", function(){
		alert("REMOVE");
	});
	
	$(".ppt-end-fill .ppt-end-btn").live("click", function(){
		alert("Let's start again!!!");
	});
	// --END-- PPT CONTROLS
	
	$(".hide_col").toggle(function(){
		$(".tabs-tests .preview-block-cont").hide();
		$(this).addClass("show_col");
		$(".middle-col").css("margin-right", 60);
	}, function(){
		$(".tabs-tests .preview-block-cont").show();
		$(this).removeClass("show_col");
		$(".middle-col").css("margin-right", 200);
	});
});


$(window).load(function(){
	$(".slider-window .zoomer-element").zoomer();
	
	// SLIDER WINDOW 
	var slider_hover = false;
	var count_item = $(".slider-main .item").size();
	var width = $(".slider-main .item:first").width() + 5;
	
	if (count_item < 6)
		$(".slider-main .slider-elements").width(count_item*width+5);
	
	var max_visible = Math.round($(".slider-main .slider-elements").width() / width);
	var count_max = $(".slider-main .item").size() - max_visible;
	if (count_max < 0) count_max = 0;
			
	var click = 0;
	
	$(".slider-window").click(function(){
		slider_hover = true;
		$(this).addClass("active");
		width = $(".slider-main .item:first").width() + 5;
		max_visible = Math.round($(".slider-main .slider-elements").width() / width);
		count_max = $(".slider-main .item").size() - max_visible;
		if (count_max < 0) count_max = 0;
	});
	
	$(".slider-window").hover(function(){
		slider_hover = true;
	}, function() {
		slider_hover = false;
	});
	
	$("*").click(function(){
		if(!slider_hover)
		{
			$(".slider-window").removeClass("active");
			if (click == count_max && count_max > 0)
			{
				click--;
				var left = click*width;
				$(".slider-main").find(".slider-elements-cont").animate({
					marginLeft:-left
				});
			}
		}
	});
	
	// NEXT
	$(".slider-main .btn-next").click(function(){
		var parent = $(this).parent(".slider-main");
		parent.find(".slider-elements-cont").stop();
		click++;
		if (click <= count_max)
			var left = click*width;
		else
		{
			click = count_max;
			var left = click*width;
		}
		
		parent.find(".slider-elements-cont").animate({
			marginLeft:-left
		});
	});
	
	// PREV
	$(".slider-main .btn-prev").click(function(){
		var parent = $(this).parent(".slider-main");
		parent.find(".slider-elements-cont").stop();
		click--;
		if (click >= 0)
			var left = click*width;
		else
		{
			click = 0;
			var left = click*width;
		}
		
		parent.find(".slider-elements-cont").animate({
			marginLeft:-left
		});
	});
	
	$(".slider-main .btn-next, .slider-main .btn-prev").mousedown(function(){
		return false;
	});
	
	$(".slider-main .item").click(function(){
		var parent = $(this).parents(".slider-main");
		parent.find(".item.active").removeClass("active");
		$(this).addClass("active");
		
		var img = $(this).find("img").attr("data-pic");
		$(".zoomer-main-block .zoomer-picture img").attr("src", img).load(function(){
			$(".slider-window .zoomer-element").zoomer();
		});
		
	});
	
	$(".slider-main .btn-add-img").click(function(){
		alert("ADD");
	});
	
	$(".slider-window .slider-close").click(function(){
		alert("CLOSE");
	});
	
	$(".slider-window .zoomer-remove").click(function(){
		alert("REMOVE");
	});
	// --END-- SLIDER WINDOW 
	
	$(".test-next-btn").click(function(){
		alert("NEXT");
	});
	
	$(".test-prev-btn").click(function(){
		alert("PREV");
	});
	
});

function resizeContentContainer()
{
	var wh = $(window).height();
	var bh = $('body').height();
	var max_h = Math.max(wh, bh);
	var new_h = max_h - $('.head').height() - 4;
	var width = $(".content-container .middle-col").width();
	var max_w = "100%";
	
	$(".content-container .middle-col .scroll-block").height(new_h-20);
	
	var main_block_height = $(".content-container .middle-col .scroll-block").height();
	var main_block_width = $(".content-container .middle-col .scroll-block").width();
	//$(".content-container .middle-col .main-block").width(main_block_width - 30);
}

function resizeTestBtn()
{
	var wh = $(window).height();
	var bh = $('body').height();
	var max_h = Math.max(wh, bh);
	var new_h = max_h - $('.head').height() - 4;
	
	var window_width = $(window).width();
	var main_block_width = $(".content-container .middle-col .main-block").width();
	var width_arrows = (window_width - main_block_width - 140)/2 - 40;
	if (window_width < 1410)
	{
		$(".test-prev-btn").css("margin-left", 5);
		$(".test-next-btn").css("margin-right", 5);
	}
	else
	{
		$(".test-prev-btn").css("margin-left", 26);
		$(".test-next-btn").css("margin-right", 26);
	}
	$(".test-prev-btn, .test-next-btn").width(width_arrows);
	
	$('.test-next-btn, .test-prev-btn').height(new_h-35);	
}
