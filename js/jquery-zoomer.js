(function( $ ) {
	$.fn.zoomer = function() {
		return this.each(function() {
			$(this).removeClass("empty");
			var parent_element = $(this);
			
			parent_element.find(".zoomer-picture img").css({
				"width": "auto",
				"left": 0,
				"top": 0
			});
			
			
			var zoomer_pic_min_w = parent_element.find(".zoomer-picture").width(); // минимальная ширина картинки
			var zoomer_pic_min_h = parent_element.find(".zoomer-picture").height(); // минимальная высота картинки
			
			var zoomer_pic_max_w = parent_element.find(".zoomer-picture img").width(); // максимальная ширина картинки
			var zoomer_pic_max_h = parent_element.find(".zoomer-picture img").height(); // максимальная высота картинки
			
			var zoomer_pic_middle_w = (zoomer_pic_max_w+zoomer_pic_min_w)/2; // средняя ширина картинки
			var zoomer_pic_middle_h = (zoomer_pic_max_h+zoomer_pic_min_h)/2; // средняя высота картинки
			
			// Отношение сторон
			var zoomer_ratio_max = zoomer_pic_max_w/zoomer_pic_max_h;
			var zoomer_ratio_min = zoomer_pic_min_w/zoomer_pic_min_h;
			
			var zoomer_pic_min_w_new = zoomer_ratio_max*zoomer_pic_min_h;
			
			// Значения для слайдера
			var zoomer_min, zoomer_max, zoomer_value;
			
			if (zoomer_pic_max_h > zoomer_pic_max_w)
			{
				zoomer_min = zoomer_pic_min_h;
				zoomer_max = zoomer_pic_max_h;
				zoomer_value = zoomer_pic_middle_h;
				parent_element.find(".zoomer-picture img").height(zoomer_pic_middle_h);
			}
			else
			{
				if (zoomer_ratio_max < zoomer_ratio_min)
				{
					zoomer_min = zoomer_pic_min_w_new; 
					zoomer_pic_middle_w = (zoomer_pic_max_w+zoomer_pic_min_w_new)/2; // средняя ширина картинки
				}
				else
				{
					zoomer_min = zoomer_pic_min_w;
				}
				
				zoomer_max = zoomer_pic_max_w;
				zoomer_value = zoomer_pic_middle_w;
				parent_element.find(".zoomer-picture img").width(zoomer_pic_middle_w);
				
			}
			
			if (parent_element.is(".zoomer"))
			{
				parent_element.find(".zoomer-slider-cont").slider("destroy");
			}
			imgCenter();
			parent_element.find(".zoomer-slider-cont").slider({
				value:zoomer_value,
				min: zoomer_min,
				max: zoomer_max,
				step: 1,
				slide: function( event, ui ) {
					zoomImg(ui.value);
				},
				change: function(event, ui) { 
					zoomImg(ui.value);
				}
			});
			
			if (!parent_element.is(".zoomer"))
			{
				// Кнопки плюс и минус
				parent_element.find(".zoomer-slider-minus").click(function(){
					var value = parent_element.find(".zoomer-slider-cont").slider("option", "value") - 100;
					var min = parent_element.find(".zoomer-slider-cont").slider("option", "min");
					if (value < min)
						value = min;
					parent_element.find(".zoomer-slider-cont").slider("option", "value", value);
				});
				
				parent_element.find(".zoomer-slider-plus").click(function(){
					var value = parent_element.find(".zoomer-slider-cont").slider("option", "value") + 100;
					var max = parent_element.find(".zoomer-slider-cont").slider("option", "max");
					if (value > max)
						value = max;
					parent_element.find(".zoomer-slider-cont").slider("option", "value", value);
				});
				
				parent_element.find(".zoomer-slider-minus, .zoomer-slider-plus").mousedown(function(){
					return false;
				});
				
				// --end-- Кнопки плюс и минус
			}
			parent_element.find(".zoomer-picture img").draggable({
				scope: "slider",
				drag: function(event, ui){
					if(parent_element.parents(".slider-window").is(".slider-window"))
						parent_element.parents(".slider-window").addClass("active");
					var img_height = $(this).height();
					var img_width = $(this).width();
					var top_bottom = img_height - zoomer_pic_min_h;
					var top = ui.position.top;
					var left = ui.position.left;
					var left_right = img_width - zoomer_pic_min_w;
					
					// Выставление верхнего отступа
					if (img_height < zoomer_pic_min_h)
					{
						ui.position.top = (zoomer_pic_min_h - img_height)/2;
					}
					else
					{
						if (top > 0)
							ui.position.top = 0;
							
						if (top <= -top_bottom)
							ui.position.top = -top_bottom;
					}
					
					// Выставление левого отступа
					if (img_width < zoomer_pic_min_w)
					{
						ui.position.left = (zoomer_pic_min_w - img_width)/2;
					}
					else
					{
						if (left > 0)
							ui.position.left = 0;
							
						if (left <= -left_right)
							ui.position.left = -left_right;
					}
				}
			});
			
			function imgCenter()
			{
				var area_w = parent_element.find(".zoomer-picture").width(); 
				var area_h = parent_element.find(".zoomer-picture").height(); 
				var img_w = parent_element.find(".zoomer-picture img").width();
				var img_h = parent_element.find(".zoomer-picture img").height();
				
				var img_left = (-img_w/2)+area_w/2;
				var img_top = (-img_h/2)+area_h/2;
				
				parent_element.find(".zoomer-picture img").css({"left": img_left, "top": img_top});
				
				
			}
			
			function imgLeftTop()
			{
				var img_height = parent_element.find(".zoomer-picture img").height();
				var img_width = parent_element.find(".zoomer-picture img").width();
				var top_bottom = img_height - zoomer_pic_min_h;
				var top = parent_element.find(".zoomer-picture img").position().top;
				var left = parent_element.find(".zoomer-picture img").position().left;
				var left_right = img_width - zoomer_pic_min_w;
				
				// Выставление верхнего отступа
				if (img_height < zoomer_pic_min_h)
				{
					parent_element.find(".zoomer-picture img").css("top", (zoomer_pic_min_h - img_height)/2);
				}
				else
				{
					if (top > 0)
						parent_element.find(".zoomer-picture img").css("top",  0);
					else if (top <= -top_bottom)
						parent_element.find(".zoomer-picture img").css("top",  -top_bottom);
				}
				
				// Выставление левого отступа
				if (img_width < zoomer_pic_min_w)
				{
					parent_element.find(".zoomer-picture img").css("left", (zoomer_pic_min_w - img_width)/2);
				}
				else
				{
					if (left > 0)
						parent_element.find(".zoomer-picture img").css("left",  0);
					else if (left <= -left_right)
						parent_element.find(".zoomer-picture img").css("left",  -left_right);
				}
			}
			
			function zoomImg(value)
			{
				if (zoomer_pic_max_h > zoomer_pic_max_w)
					parent_element.find(".zoomer-picture img").height(value);
				else
					parent_element.find(".zoomer-picture img").width(value);
				imgLeftTop();
			}
			
			parent_element.addClass("zoomer");
		});
	};
})( jQuery );