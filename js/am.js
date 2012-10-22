$(function(){
	$('.window-video-youtube-items li').hover(function(){
		$(this).addClass('hover')
	},function(){
		$(this).removeClass('hover')
	})
	// tabs video
	$('.window-video .window-tabs a').click(function(){
		$('.window-video .window-tabs a').removeClass('active')
		$(this).addClass('active')
		$('.tab-content-item').hide()
		$('.window-video-' + $(this).attr('href')).show()
		return false
	})
	$('.window-image .window-tabs a').click(function(){
		$('.window-image .window-tabs a').removeClass('active')
		$(this).addClass('active')
		$('.window-image-intem-tab').hide()
		$('.window-image-' + $(this).attr('href')).show()
		return false
	})
	// folder add i tag
	$('.window-image-lib-folders li ul').parent(this).find(' > a').append('<i></i>')
	$('.window-image-lib-folders li a ').click(function(){
		var t = $(this).parent(this)
		if(t.is('.opened')){
			t.removeClass('opened')
			t.find('> ul').slideUp(250)
		}else{
			t.addClass('opened')
			t.find('> ul').slideDown(250)
		}
	})
	$('.window-image-lib-rg a,.window-image-google-results a').each(function(i,e){
		e = $(e).find('img')
		e.css('top',(116 - e.height())/2 + 'px')
	})
	// color google
	$('.window-image-google-color a.window-image-google-color-link').click(function(){
		var t = $(this).parent(this)
		if(t.is('.active')){
			t.removeClass('active')
			t.find('.window-image-google-color-select').hide()
		}else{
			t.addClass('active')
			t.find('.window-image-google-color-select').show()
		}
		return false
	})
	// new course
	$('.new-course > ul > li').hover(function(){
		$(this).addClass('hover')
	},function(){
		$(this).removeClass('hover')
	})

	$('.edit-icon a.i4').click(function(){
		var t = $(this)
		if(t.is('.active')){
			t.removeClass('active')
			$('.new-table').hide()
		}else{
			t.addClass('active')
			$('.new-table').show()
		}
		return false
	})
	$('.new-table i').hover(function(){
		var i = $(this).index('.new-table i')+1
		var c = i%4
		c = c == 0 ? 4 : c
		var a = 4-i%4
		a = a == 4 ? 0 : a
		var r = (i+a)/4
		$('.new-table i').removeClass('active')
		for(var i1 = 0; i1<r; i1++)
			for(var i2 = 0; i2<c; i2++){
				$('.new-table i').eq(i1*4+i2).addClass('active')
			}
		$('.new-table span').text(r + ' × ' + c)
	})
	// gray-btn
	$('.gray-btn').append('<i class="gray-btn-l"></i><i class="gray-btn-r"></i>')
	$('.window-edit-course-closed').click(function(){
		$('.window-edit-course').animate({top:'-800px'},500)
		return false
	})
})