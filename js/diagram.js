$(document).ready(function(){
	// DIAGRAM
	// активность окна
	var hover_diagram = false;
	$(".diagram-window").click(function(){
		$(this).addClass("active");
		hover_diagram = true;
	});
	
	$(".diagram-window").hover(function(){
		hover_diagram = true;
	}, function(){
		hover_diagram = false;
	});
	
	$(".diagram-window .diagram-close").click(function(){
		alert("CLOSE");
	});
	
	$(".diagram-table-header .close").click(function(){
		alert("CLOSE");
	});
	// switch diagram
	
	$(".diagram-table .switch .vertical, .diagram-table .switch .horizontal").click(function(){
		var parent = $(this).parent();
		parent.find(".active").removeClass("active");
		$(this).addClass("active");
	});
	
	// show/hide remove btn
	$(".diagram-table td").live("mouseenter", function(){
		var index = $(this).index();
		var parent = $(this).parents("table");
		parent.find("tr:first td").eq(index).find(".remove").show();
	});
	
	$(".diagram-table td").live("mouseleave", function(){
		var index = $(this).index();
		var parent = $(this).parents("table");
		parent.find("tr:first td").eq(index).find(".remove").hide();
	});
	
	// add columns
	//usual
	var count_td = countTD($(".diagram-table"));
	var width = (count_td)*100;
	$(".diagram-table").width(width);
	
	if (count_td < 4)
		width = width/(count_td-1); 
	if (count_td == 1)
		width = 400;
	$(".diagram-table td").width(width);
	
	// multirows
	count_td = countTD($(".diagram-table"));
	width = (count_td)*100;
	$(".diagram-table.multirows").width(width);
	
	if (count_td > 4)
		var width = 100; 
	$(".diagram-table.multirows td:first").width(width);
	
	$(".diagram-table .add-btn-vert").click(function(){
		var table = $(this).parents(".diagram-table").find("table");
		
		var remove = false;
		if (table.find("tr:first td:last .remove").is(".remove"))
			remove = true;
			
		table.find("tr").each(function(index){
			if (index == 0 && remove)
				$(this).append('<td><div class="title"><div class="remove column"></div></div></td>');
			else
				$(this).append("<td></td>");
		});
		
		var count_td = countTD(table);
		var width = (count_td)*100;
		$(this).parents(".diagram-table").width(width);
		
		// Если таблица с добавлением строк
		if (count_td > 4 && $(this).parents(".diagram-table").is(".multirows"))
		{
			// ширина первой колонки
			var width = 160; 
			table.find("td:first").width(width);
		}	
		else if (count_td > 1)
		{
			width = $(this).parents(".diagram-table").width();
			table.find("td").width(width/count_td);
		}
		
	});
	
	// add rows
	$(".diagram-table .add-btn-hor").click(function(){
		var table = $(this).parents(".diagram-table").find("table");
		addRow(table);
	});
	
	// remove rows and columns
	$(".diagram-table .remove").live("click", function(){
		var parent = $(this).parents(".diagram-table table");
		var parent_main = $(this).parents(".diagram-table");
		if ($(this).is(".column")) // remove columns
		{
			var index = $(this).parents(".diagram-table td").index();
			var count_td = countTD(parent);
			
			if (count_td > 2 && parent_main.is(".multirows"))
			{
				parent.find("tr").each(function(){
					$(this).find("td").eq(index).remove();
				});
								
				var width = (count_td-1)*100; // ширина родительского контейнера
				parent.parents(".diagram-table").width(width);
				
				// ширина первой колонки
				if (count_td < 5)
					var width = (count_td)*100; 
				else
					var width = 160;
				parent.find("td:first").width(width);
			}
			else if (count_td > 1 && !parent_main.is(".multirows"))
			{
				parent.find("tr").each(function(){
					$(this).find("td").eq(index).remove();
				});
				var width = (count_td-1)*100; // ширина родительского контейнера
				parent.parents(".diagram-table").width(width);
				
				width = (count_td)*100;
				if (count_td > 3)
					parent.find("td").width(width/(count_td-1));
				else if (count_td > 2)
					parent.find("td").width(width/(count_td-2));
				else
					parent.find("td").width(400);
			}
		}
		else // remove rows
		{
			var count_tr = parent.find("tbody tr").size();
			if (count_tr > 1)
				$(this).parents(".diagram-table tr").remove();
		}
	});
	
	// Показываем/скрываем легенду диаграммы
	$("#show_legend").change(function(){
		var parent = $(this).parents(".diagram-window");
		if ($(this).is(":checked"))
			parent.find(".diagram-legend").show();
		else
			parent.find(".diagram-legend").hide();
	});
	
	// diagram title
	var title_hover = false;
	$(".diagram-title").click(function(){	
		$(this).addClass("active");
		title_hover = true;
	});
	
	$(".diagram-title").hover(function(){
		title_hover = true;
	}, function(){
		title_hover = false;
	});
	
	// diagram h1
	var h1_hover = false;
	$(".diagram-window h1").click(function(){	
		$(this).addClass("active");
		h1_hover = true;
	});
	
	$(".diagram-window h1").hover(function(){
		h1_hover = true;
	}, function(){
		h1_hover = false;
	});
	
	// remove class "active"
	$("*").click(function(){
		if (!hover_diagram)
			$(".diagram-window").removeClass("active"); // remove window activity
			
		if (!title_hover)
			$(".diagram-title").removeClass("active"); // remove title activity
			
		if (!h1_hover)
			$(".diagram-window h1").removeClass("active"); // remove h1 activity
	});
});


// Добавление строки в таблицу
function addRow(parent)
{
	var count_td = countTD(parent); // количество добавляемых столбцов
	
	// проверка на элементы управления
	var remove = false;
	if(parent.find("tbody tr:first").find(".remove").is(".remove"))
		remove = true;
	
	// Формирование строки
	var html = "<tr>";
	for (var i = 0; i < count_td; i++)
	{
		if (i == 0 && remove)
			html += '<td><div class="title"><div class="remove"></div><div class="clear"></div></td>';
		else
			html += "<td></td>";
	}
	html += "</tr>";
	
	// Добавляем строку в таблицу
	parent.find("tbody").append(html);
	
	parent.find("tbody tr").removeClass("odd");
	parent.find("tbody tr:odd").addClass("odd");
}

// подсчет количесва столбцов в таблице
function countTD(parent)
{
	var count_td = 0; // количество добавляемых столбцов
	
	// Проверка на colspan
	parent.find("tr:first td").each(function(){
		var colspan = parseInt($(this).attr("colspan"));
		if (colspan) count_td += colspan;
		else count_td++;
	});
	
	return count_td;
}