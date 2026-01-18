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
    localStorage.setItem('selCarreira', $('#selCarreira').val());
    //localStorage.setItem('rdMF', $('#rdMF').prop("checked"));
}

function loadStorage(urlonly = false) {
    let params = new URLSearchParams(window.location.search);
    let compressed = params.get('data');
    if (compressed) {
        let decompressed = LZString.decompressFromEncodedURIComponent(compressed);
        let restoredStorage = JSON.parse(decompressed);
        Object.entries(restoredStorage).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
    }
    if (!urlonly) { 
        //urlnonly baixa os dados da URL para o localstorage sem atualizar os campos para evitar
        //         erros caso a DOM não esteja compatível com a carreira do storage
        $.each(localStorage, function(key, val) {
            var ptype = $('#' + key).prop("type");
            if (ptype && ptype == "radio" || ptype == "checkbox") {
                $('#' + key).prop("checked", val == 'true');
            } else {
                $('#' + key).val(val);
            }
        });   
    }
}

function exportStorage() {
    let fullStorage = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        fullStorage[key] = localStorage.getItem(key);
    }    
    let compressed = LZString.compressToEncodedURIComponent(JSON.stringify(fullStorage));
    let data = `${window.location.origin}?data=${compressed}`;
    console.log(data);
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

    $('#showrepos1').hover(
        function() {
            $('#repostable1').fadeIn(200);
        },
        function() {
            $('#repostable1').fadeOut(200);
        }
    );
    $('#showrepos2').hover(
        function() {
            $('#repostable2').fadeIn(200);
        },
        function() {
            $('#repostable2').fadeOut(200);
        }
    );

	$.getJSON('js/carreiras.json', function(data) {
        //Espera carregar os dados e executa os cálculos pela 1a vez
        infoCarreiras = data;
        
        //1. Carrega o Storage para baixar dados da URL caso existam, sem atualizar DOM
        loadStorage(true);
        //2. Atualiza carreira manualmente do storage
        $('#selCarreira').val(localStorage.selCarreira || 'TAE');
        //3. Atualiza a UI com a carreira correta carregada
        atualizaCarreira();
        //4. Carrega o storage novamente, agora com a carreira e a DOM selecionadas para atualizar os campos
        loadStorage(false);
        //Por último calcula tudo
        calcSalario(myform);
        calcSalario(myform2);
    });
    //Primeira execução ocorre após o load de carreiras.json
    // calcSalario(myform);
    // calcSalario(myform2);
});



