$().ready(function(){
	var tmp_cnt;
	$('.edit-icon .buttons li:not(.vertical) ul').each(function(){
		tmp_cnt = $(this).find('li').length;
		$(this).width(tmp_cnt * 33);
	});
	
	$('.edit-icon .buttons .dropdown').mouseover(function(){
		$(this).addClass('opened');
	});
	
	$('.edit-icon .buttons .dropdown').bind('mouseleave', function(){
		$(this).removeClass('opened');
	});
	
	$('.edit-icon .buttons li a').click(function(){
		$('.edit-icon .buttons li, .edit-icon .buttons li a').removeClass('active');
		$(this).addClass('active').closest('li').addClass('active');
	});	
});