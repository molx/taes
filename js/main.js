function saveStorage() {
	localStorage.clear();
	var frms = ['myform', 'myform2'];
	$.each(frms, function(i, v) {
		$('form[name="' + v + '"] *').filter(':input').each(function(i, inp){
			if ($(inp).attr("id")) {
				var ptype = $(inp).prop("type");
				if (ptype && ptype == "radio" || ptype == "checkbox") {
					localStorage.setItem($(inp).attr("id"), $(inp).prop("checked"));
				} else {
					localStorage.setItem($(inp).attr("id"), $(inp).val());
				}
			}
		});
	});
}

function loadStorage() {
	$.each(localStorage, function(key, val) {
		var ptype = $('#' + key).prop("type");
		if (ptype && ptype == "radio" || ptype == "checkbox") {
			$('#' + key).prop("checked", val == 'true');
		} else {
			$('#' + key).val(val);
		}
	});
}


$(document).ready(function() {
    $(".tabs-menu1 a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content1").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    
	$(".tabs-menu2 a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content2").not(tab).css("display", "none");
        $(tab).fadeIn();
    });	

	$(".tabs-menu3 a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content3").not(tab).css("display", "none");
        $(tab).fadeIn();
    });	

	$(".tabs-menu4 a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content4").not(tab).css("display", "none");
        $(tab).fadeIn();
    });	
	
	loadStorage();
});



