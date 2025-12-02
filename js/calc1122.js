var liq1 = 0;
var liq2 = 0;

function updateQuali(form, classs) {
    var alloptions = Array("Exigência Mínima", "Fundamental Completo", "Médio Completo", "Médio Técnico", "Superior", "Especialização", "Mestrado", "Doutorado");
    var allvalues = Array(0, 1, 2, 3, 4, 5, 6, 7);
    var newoptions = Array();
    var newvalues = Array();
    var curValue = form.ddQuali.value;
    var classe = parseFloat(classs);
    if ($('#selCarreira').val() == "MF") {
        newoptions = ["Nenhum", "Aperfeiçoamento", "Especialização", "Mestrado", "Doutorado"];
        newvalues = [0, 4, 5, 6, 7];
    } else if (classe <= 3) {
        newoptions = alloptions;
        newvalues = allvalues;
    } else if (classe == 3) {
        newoptions = alloptions.slice(2, alloptions.length);
        newvalues = allvalues.slice(2, alloptions.length);
        newoptions.splice(0, 1, "Exigência Mínima");
        newvalues.splice(0, 1, 0);
    } else if (classe == 4) {
        newoptions = alloptions.slice(4, alloptions.length);
        newvalues = allvalues.slice(4, alloptions.length);
        newoptions.splice(0, 1, "Exigência Mínima");
        newvalues.splice(0, 1, 0);
    }
    while (form.ddQuali.options.length) form.ddQuali.options[0] = null;
    for (i = 0; i < newoptions.length; i++) {
        option = new Option(newoptions[i], newvalues[i]);
        form.ddQuali.options[form.ddQuali.length] = option;
    }
    if (newvalues.includes(parseInt(curValue, 10))) {
        form.ddQuali.value = curValue;
    }
    calcSalario(form);
}

function calcfatorpg(i, areadireta = true, docente = false, ch = 1) {
    //Para docentes, carga horária altera o % da RT 
    var pesos = Array();
    if (docente) {
        if (ch == 0.5) { //20h
            pesos = [0, 0, 0, 0, 0.05, 0.1, 0.25, 0.575];
        } else if (ch == 0.7) { //40h
            pesos = [0, 0, 0, 0, 0.075, 0.15, 0.375, 0.8625];
        } else { //DE
            pesos = [0, 0, 0, 0, 0.1, 0.2, 0.50, 1.15];
        }
    } else if (areadireta) {
        pesos = Array(0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.52, 0.75);
    } else {
        pesos = Array(0, 0, 0, 0.1, 0.15, 0.2, 0.35, 0.5);
    }
    return pesos[i];
}

function firstload() {
    // var padrao1 = document.getElementById('ddPadrao1'),
    //     padrao2 = document.getElementById('ddPadrao2');
    // for (var i = 1; i < 20; i++){
    //     var opt1 = document.createElement('option'),
    //     opt2 = document.createElement('option');
    //     opt1.value = i;
    //     opt1.innerHTML = i;
    //     opt2.value = i;
    //     opt2.innerHTML = i;
    //     padrao1.appendChild(opt1);
    //     padrao2.appendChild(opt2);
    // }
    // updateQuali(myform, 1);
    // updateQuali(myform2, 1);
    //atualizaCarreira();
    calcSalario(myform);
    calcSalario(myform2);
}

function atualizaCarreira() {
    var carreira = $('#selCarreira').val();

    //Novas regras
    //$('[name^=ddPadrao]').empty();
    var pads = [];
    $('select[name="ddPadrao"]').each(function(i, x) {pads.push($(x).val())});
    $('select[name="ddPadrao"]').empty().each(function() {
        infoCarreiras[carreira].niveis.forEach((opt, i) => $(this).append(`<option value="${i}">${opt}</option>`));
    });
    $('select[name="ddPadrao"]').each(function(i, x) {$(x).val(pads[i])});
    $('.labelch').html(infoCarreiras[carreira].nomech);
    $('.labelIQRT').html(infoCarreiras[carreira].labelIQRT);
    $('.labelIQRT2').html(infoCarreiras[carreira].labelIQRT2);

    /*var fgv = [],
    cdv = [];
    $('select[name="ddFG"]').each(function(i, x) {fgv.push($(x).val())});    
    $('select[name="ddFG"]').empty().each(function() {
        infoCarreiras[carreira].func.forEach((opt, i) => $(this).append(`<option value="${i}">${opt}</option>`));
    });
    $('select[name="ddFG"]').each(function(i, x) {$(x).val(fgv[i])});
    $('select[name="ddCD"]').each(function(i, x) {cdv.push($(x).val())});
    $('select[name="ddCD"]').empty().each(function() {
        infoCarreiras[carreira].CD.forEach((opt, i) => $(this).append(`<option value="${i}">${opt}</option>`));
    });
    $('select[name="ddCD"]').each(function(i, x) {$(x).val(cdv[i])});

    $('.labelCD').html(infoCarreiras[carreira].tipoCD);
    */
    if (infoCarreiras[carreira].escol) {
        $('select[name="ddEscol"]').empty().each(function() {
            infoCarreiras[carreira].escol.forEach((opt, i) => $(this).append(`<option value="${i}">${opt}</option>`));
        });
        $('select[name="ddEscol"]').parent().parent().show();
    } else {
        $('select[name="ddEscol"]').parent().parent().hide();
    }
    $('select[name="ddCargaH"]').empty().each(function() {
        infoCarreiras[carreira].chlab.forEach((opt, i) => $(this).append(`<option value="${infoCarreiras[carreira].chval[i]}">${opt}</option>`));
    });
    $('select[name="ddFuncTipo"]').empty().each(function() {
        infoCarreiras[carreira].funcs.forEach((opt, i) => $(this).append(`<option value="${i}">${opt}</option>`));
    }).prop('selectedIndex', 0);

    if (carreira == "TAE") {
        //Mostra campos específicos de TAEs:
        $('.inpt_TAE').parent().parent().show();
        //Esconde campos específicos de docentes
        //$('.inpt_noTAE').parent().parent().hide();   
    } else {        
        //Esconde campos específicos de TAEs:
        $('.inpt_TAE').parent().parent().hide();        
        //Mostra campos específicos de docentes
        //$('.inpt_noTAE').parent().parent().show();
    }
    
    if (infoCarreiras[carreira].nomeGrat) {
        var gratVals = [0, 50, 80, 100];
        $('select[name="ddGratDes"]').empty().each(function() {
            gratVals.forEach((opt, i) => $(this).append(`<option value="${opt}">${opt}%</option>`));
        });
        $('.inpt_GratDes').parent().parent().show();
        $('.labelGratDes').parent().show();
    } else {
        $('.inpt_GratDes').parent().parent().hide();
        $('.labelGratDes').parent().hide();
    }
    if (infoCarreiras[carreira].labelIQRT) {
        $('select[name="ddQuali"]').parent().parent().show();
        $('.labelIQRT2').parent().show();
        $('input[name="txQualif"]').parent().show();  
    } else {
        $('select[name="ddQuali"]').parent().parent().hide();
        $('.labelIQRT2').parent().hide();
        $('input[name="txQualif"]').parent().hide();
    }
    updateQuali(myform, 1, carreira == "MF");
    updateQuali(myform2, 1, carreira == "MF");
    //UpdateQuali já chama calcSalario para o form
    //calcSalario(myform);
    //calcSalario(myform2);
};

function atualizaFunc(form) {
    var $obj = $(form).find("select[name='ddFuncVal']");
    var func = $(form).find("select[name='ddFuncTipo'] option:selected").text();
    var vals = [];
    if (["Não", "FCC"].includes(func)) {
        vals = [0,0];
    } else {
        for (let date in infoCarreiras.funcs) {        
            if (date > form.ddAno.value) break;
            vals = infoCarreiras.funcs[date][func];
        }
    }
    $obj.empty();
    vals.forEach((opt, i) => $obj.append(`<option value="${i}">${i}</option>`));
    $obj.find("option:first").remove();
    if (["CD", "CCE"].includes(func)) {
        $(form).find("input[name='rdCD']").parent().show();
    } else {
        $(form).find("input[name='rdCD']").parent().hide();
    }
    calcSalario(form);
}

function validateGD1(evt, form) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validateGD2(form) {
    var valor = form.gastoTrans.value;
    if (valor > 99) {
        valor = valor.toString().substring(0, valor.length - 1);
    } else {
        valor = parseInt(valor, 10);
    }
    form.gastoTrans.value = valor;
    calcSalario(form);
}

function formatValor(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function valorIRRF(base, periodo, deducoes) {
    var aliquota = 0;
    var desconto = 0;
    if (periodo < 202505) {
        if (base <= 2259.20) {
            aliquota = 0;
        } else if (base <= 2826.65) {
            aliquota = base * 0.075 - 169.44;
        } else if (base <= 3751.05) {
            aliquota = base * 0.15 - 381.44;
        } else if (base <= 4664.68) {
            aliquota = base * 0.225 - 662.77;
        } else {
            aliquota = base * 0.275 - 896.00;
        }
    } else {
        if (base <= 2428.80) {
            aliquota = 0;
        } else if (base <= 2826.65) {
            aliquota = base * 0.075 - 182.16;
        } else if (base <= 3751.05) {
            aliquota = base * 0.15 - 394.16;
        } else if (base <= 4664.68) {
            aliquota = base * 0.225 - 675.49;
        } else {
            aliquota = base * 0.275 - 908.73;
        }
    }
    //Regras isenção e desconto 
    if (periodo >= 202601) {
        if ((base + deducoes) <= 5000.00) {
            desconto = aliquota;
        } else if ((base + deducoes) < 7350.00) {
            desconto = 978.62 - 0.133145 * (base + deducoes);
        }
    }
    aliquota = aliquota - desconto;
    return [Math.floor(aliquota * 100) / 100, desconto];
}

function calcPSS(periodo, base, teto) {
    var valor = 0;
    if (periodo < 202501) { //2024
        if (base <= 1412.00) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2666.68) {
            valor = base * 0.09 - 21.18;
        } else if (base <= 4000.03) {
            valor = base * 0.12 - 101.18;
        } else if (base <= 7786.02) {
            //teto
            valor = base * 0.14 - 181.18;
        } else if (base <= 13333.48) {
            valor = base * 0.145 - 220.11;
        } else if (base <= 26666.94) {
            valor = base * 0.165 - 486.78;
        } else if (base <= 52000.54) {
            valor = base * 0.19 - 1153.46;
        } else {
            valor = base * 0.22 - 2713.47;
        }
    } else { //2025
        if (base <= 1518.00) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2793.88) {
            valor = base * 0.09 - 22.77;
        } else if (base <= 4190.83) {
            valor = base * 0.12 - 106.59;
        } else if (base <= 8157.41) {
            //teto
            valor = base * 0.14 - 190.40;
        } else if (base <= 13969.49) {
            valor = base * 0.145 - 231.19;
        } else if (base <= 27938.95) {
            valor = base * 0.165 - 510.58;
        } else if (base <= 54480.97) {
            valor = base * 0.19 - 1209.05;
        } else {
            valor = base * 0.22 - 2843.48;
        }
    }
    return Math.floor(valor * 100) / 100;
}

function dependentesIR(deps, periodo) {
    var aliq = 0;
    if (periodo <= 202604) {
        aliq = deps * 189.59;
    } else {
        //placeholder
        aliq = deps * 189.59;
    }
    return Math.floor(aliq * 100) / 100;
}

function valorSaude(bruto, ftidade, periodo) {
    var tabela = Array(),
    ftbruto = 0;
    if (periodo < 202405) {
        tabela[0] = Array(149.52, 156.57, 158.69, 165.04, 169.97, 175.61, 190.03, 193.05, 196.06, 205.63);
        tabela[1] = Array(142.47, 149.52, 151.64, 156.57, 161.51, 167.15, 180.76, 183.63, 186.50, 196.06);
        tabela[2] = Array(135.42, 142.47, 144.59, 149.52, 154.46, 160.10, 171.49, 174.21, 176.94, 186.50);
        tabela[3] = Array(129.78, 135.42, 137.53, 142.47, 147.41, 153.05, 163.77, 166.37, 168.97, 176.94);
        tabela[4] = Array(122.71, 129.78, 131.89, 135.42, 140.35, 146.00, 156.04, 158.52, 161.00, 168.97);
        tabela[5] = Array(111.43, 114.25, 116.38, 117.07, 122.02, 127.66, 129.78, 131.84, 133.90, 137.09);
        tabela[6] = Array(107.20, 108.61, 110.73, 111.43, 116.38, 122.02, 123.60, 125.56, 127.52, 130.71);
        tabela[7] = Array(101.56, 102.97, 105.08, 105.79, 110.73, 116.38, 117.42, 119.28, 121.14, 124.33);
        if (bruto < 1500) {
            ftbruto = 0;
        } else if (bruto < 2000) {
            ftbruto = 1;
        } else if (bruto < 2500) {
            ftbruto = 2;
        } else if (bruto < 3000) {
            ftbruto = 3;
        } else if (bruto < 4000) {
            ftbruto = 4;
        } else if (bruto < 5500) {
            ftbruto = 5;
        } else if (bruto < 7500) {
            ftbruto = 6;
        } else {
            ftbruto = 7;
        }
    } else {
        tabela = Array();
        tabela[0] = Array(254.18, 266.17, 269.77, 297.07, 305.95, 316.10, 361.06, 366.80, 372.51, 411.26);
        tabela[1] = Array(196.34, 207.65, 211.02, 230.21, 238.60, 248.20, 280.87, 285.34, 289.80, 321.04);
        tabela[2] = Array(160.80, 162.92, 166.10, 178.29, 186.21, 195.23, 210.12, 213.45, 216.78, 235.28);
        tabela[3] = Array(142.18, 144.16, 147.11, 158.69, 166.10, 174.57, 187.87, 190.85, 193.82, 211.36);
        tabela[4] = Array(132.03, 133.86, 136.60, 148.11, 155.02, 162.93, 176.13, 178.92, 181.71, 198.93);
        tabela[5] = Array(121.87, 123.56, 126.10, 137.53, 143.95, 151.29, 164.39, 166.99, 169.60, 186.50);
        tabela[6] = Array(111.72, 113.27, 115.59, 126.95, 132.88, 139.66, 152.65, 155.06, 157.48, 174.06);
        tabela[7] = Array(106.64, 108.12, 110.33, 116.37, 121.80, 128.02, 140.90, 143.14, 145.37, 161.63);
        if (bruto < 3000) {
            ftbruto = 0;
        } else if (bruto < 6000) {
            ftbruto = 1;
        } else if (bruto < 9000) {
            ftbruto = 2;
        } else if (bruto < 12000) {
            ftbruto = 3;
        } else if (bruto < 15000) {
            ftbruto = 4;
        } else if (bruto < 18000) {
            ftbruto = 5;
        } else if (bruto < 21000) {
            ftbruto = 6;
        } else {
            ftbruto = 7;
        }
    }    
    if (ftidade == 1000) {
        return 0;
    } else {
        return tabela[ftbruto][ftidade];
    }
}

function valorCreche(rem, periodo, n, cota) {
    var teto = 484.90;
    var desc = 0;
    var faixas = [7507.95, 15015.90, 22523.85, 30031.80];
    if (periodo >= 202501 & periodo < 202604) {
        faixas = [8183.65, 16367.3, 24550.95, 32734.6];
    } else if(periodo >= 202501) {
        faixas = [8592.85, 17185.7, 25778.55, 34371.4];
    }
    if (rem < faixas[0]) {
        desc = 0.05;
    } else if (rem <= faixas[1]) {
        desc = 0.1;
    } else if (rem <= faixas[2]) {
        desc = 0.15;
    } else if (rem <= faixas[3]) {
        desc = 0.2;
    } else {
        desc = 0.25;
    }    
    if (cota) {
        return teto * (1 - desc) * n;
    } else {
        return teto * n;
    }
}

function valorTransporte(vencimento, gasto, dias) {
    var auxilio = 0;
    var gastodiario = 0;
    if (isNaN(gasto) || gasto < 0) {
        gastodiario = 0;
    } else {
        gastodiario = Math.ceil((gasto - 1) / 0.2) * 0.2 + 1;
    }
    auxilio = (gastodiario - 0.06 * (vencimento / 30)) * dias;
    if (auxilio < 0) {
        return 0;
    } else {
        return auxilio;
    }
}

// function valorFG(FG, periodo) {
//     //FG 1-9 + FCC;
//     var FG2023 = Array(0, 1063.31, 715.35, 579.96, 270.83, 219.76, 161.14, 102.77, 76.02, 61.67, 1071.67);
//     var FG2025 = Array(0, 1159.01, 779.73, 632.16, 295.2, 239.54, 175.64, 112.02, 82.86, 67.22, 1168.12);
//     var FG2026 = Array(0, 1263.32, 849.91, 689.05, 321.77, 261.1, 191.45, 122.1, 90.32, 73.27, 1273.25);
    
//     var valor = 0;
//     if (periodo < 202501) {
//         //a partir de maio/2023
//         valor = FG2023[FG];
//     } else if (periodo < 202604) {
//         //a partir de janeiro/2025
//         valor = FG2025[FG];
//     } else {
//         //a partir de abril/2026 (as FGs na verdade mudam já em Janeiro)
//         valor = FG2026[FG];
//     }
//     return valor; 
// }

// function valorCD(CD, periodo) {
//     //var CD2012 = Array(0, 8889.52, 7431.09, 5833.75, 4236.41)
//     var CD2023 = Array(0, 14686.79, 12277.25, 9638.21, 6999.17);
//     var CD2025 = Array(0, 18064.75, 14364.38, 11276.71, 7629.10);
//     var CD2026 = Array(0, 22219.64, 16806.33, 12291.61, 8315.71);

//     var valor = 0;
//     if (periodo < 202501) {
//         //a partir de maio/2023
//         valor = CD2023[CD];
//     } else if (periodo < 202604) {
//         //a partir de janeiro/2025
//         valor = CD2025[CD];
//     } else {
//        //a partir de abril/2026 (as FGs na verdade mudam já em Janeiro)
//         valor = CD2026[CD];
//     } 
//     return valor;
// }

function valorAlim(periodo) {
    var alimentacao = 0;
    if (periodo < 202305) {
        alimentacao = 658;
    } else if (periodo < 202512)  {
        alimentacao = 1000;
    } else {
        alimentacao = 1175;
    }
    return alimentacao;
}

// function nocd(form) {
//     if (form.ddFG.value != 0) {
//         form.ddCD.value = 0;
//     }
// }

// function nofg(form) {
//     if (form.ddCD.value != 0) {
//         form.ddFG.value = 0;
//     }
// }

function atualizaPold(form) {
    var pold = parseInt(form.ddPadrao.value),
    capold = parseInt(form.ddProg.value);

    form.ddPadrao.value = pold + capold - 1;

    //calcSalario(form);
}

function atualizaPnew(form) {
    var pnew = parseInt(form.ddPadrao.value);
    /* Da estrutura nova para a antiga, é impossível saber a posição com certeza. Considera-se Capacitacao = IV sempre, tirando 
    para servidores no começo da carreira, nesse caso considera capacitação = I */
    if (pnew < 5) {
        form.ddPadrao.value = pnew;
        form.ddProg.value = 1;
    } else {
        form.ddProg.value = 4;
        form.ddPadrao.value = pnew - 3;
    }   

    //calcSalario(form);
}

function calcSalario(form) {
    var carreira = $('#selCarreira').val();
    if (form.name == "myform") {
        $('#numProposta1').parent().css('visibility','hidden');
        //document.getElementById("numProposta1").disabled = true;
    } else if (form.name == "myform2") {
        //document.getElementById("numProposta2").disabled = true;
        $('#numProposta2').parent().css('visibility','hidden');
    }
    var periodo = parseInt(form.ddAno.value, 10),
    vbArray = [],
    fgArray = [],
    cdArray = [],
    gratArray = [],
    gratDesemp = 0,
    gratGeneric = 0,
    gratGenArray = [],
    gratGenMax = 0;
    padraovb = parseInt(form.ddPadrao.value),
    correlacoes = [0.36, 0.40, 0.50, 0.61, 1],
    correl = correlacoes[parseInt(form.ddClasse.value)],
    ftcarga = form.ddCargaH.value,
    idxvbs = 0;
    

    if (carreira != "TAE") {
        correl = 1;        
    } else {
        //Código para retrocompatibilidade com prog por cap. em 2024
        if (periodo < 202501) {
            $('form[name="' + form.name + '"] [name="ddProg"]').parent().parent().show();
            padraovb = padraovb + parseInt(form.ddProg.value, 10) - 1;
            correlacoes = [0.317346, 0.465255, 0.465255, 0.585305, 1];
            correl = correlacoes[parseInt(form.ddClasse.value)];
        } else {
            $('form[name="' + form.name + '"] [name="ddProg"]').parent().parent().hide();
        }
    }
    if (infoCarreiras[carreira].escol) {
        idxvbs = form.ddEscol.value;
    } 
    
    for (let date in infoCarreiras[carreira].vbs[idxvbs]) {
        if (date > periodo) break;
        vbArray = infoCarreiras[carreira].vbs[idxvbs][date];
        if (infoCarreiras[carreira].valGrat) {
            gratArray = infoCarreiras[carreira].valGrat[idxvbs][date];
            gratDesemp = gratArray[padraovb] * form.ddGratDes.value;
        }
    }

    if (form.ddGratGen.value != "0") {
        var idxGratGen = idxvbs;
        if (carreira == "TAE" && form.ddClasse.value == "4") {
            idxGratGen = 1 //1 = NS;
        } else if(carreira == "MF") {
            idxGratGen = 1 //1 = NS;
        }
        for (let date in infoCarreiras.grats[idxGratGen]) {
            if (date > periodo) break;
            gratGenArray = infoCarreiras.grats[idxGratGen][date];
            gratGeneric = gratGenArray[form.ddGratGen.value];
            gratGenMax = infoCarreiras.gratsMax[idxGratGen][date][form.ddGratGen.value];
        }
    }

    if (form.ddCargo.value == "1") { 
        //Médicos na MP 1.286 não estão mais 2x
        vbArray = [9523.96, 9895.40, 10281.34, 10682.30, 11098.90, 11531.76, 11981.52, 12448.80, 12934.28, 13438.72, 13962.84, 14507.40, 15073.18, 15661.02, 16271.80, 16906.42, 17565.76, 18250.82, 18962.62];
        if (periodo >= 202604) {
            vbArray = [9952.54, 10340.70, 10744.00, 11163.00, 11598.36, 12050.68, 12520.68, 13009.00, 13516.32, 14043.46, 14591.16, 15160.24, 15751.48, 16365.76, 17004.04, 17667.20, 18356.22, 19072.10, 19815.94];
        }
    }

    var vencimento = vbArray[padraovb];

    //Apenas PCCTAE tem vários níveis

    vencimento = vencimento * ftcarga * correl;
    // if (periodo >= 100) {        
    //     //Propostas Fasubra
    //     var frac = 1;
    //     ftvb = nivelMerito + nivelCap - 2;
    //     //if (classeOffset == 1 || classeOffset == 6) frac = 0.4; //niveis AB
    //     if (classeOffset == 11 || classeOffset == 17) frac = 0.6 / 0.4; //niveis CD
    //     if (classeOffset == 31) frac = 1 / 0.4
    //     vencimento = Math.ceil(base * Math.pow(ftstep, ftvb) * ftcarga * 100 * frac) / 100;
    // }
   
    var anuenio = (form.numAnuenio.value / 100) * vencimento;

    var alimentacao = form.alim.checked ? valorAlim(periodo) : 0;

    if (ftcarga == 0.5) {
        alimentacao = alimentacao / 2;
    }

    var transporte = form.trans.checked ? valorTransporte(vencimento, form.gastoTrans.value, form.diasTrans.value) : 0,
    ftinsa = form.ddInsa.value,
    valinsa = ftinsa * vencimento,
    ftpg = calcfatorpg(form.ddQuali.value, true, carreira == "MF", ftcarga),
    jud = 0;
    $('form[name="' + form.name + '"] label[name="numJudview"]').css("visibility", "hidden");
    //form.numJudview.style.visibility = "hidden";
    if (form.ddJud.value == 1) {
        $('form[name="' + form.name + '"] label[name="numJudview"]').css("visibility", "visible");
        if (form.numJud.disabled) {
            form.numJud.disabled = false;
        }
        jud = parseFloat(form.numJud.value) || 0;
    } else if (form.ddJud.value == 2) {
        form.numJud.disabled = true;
        jud = (vencimento + vencimento * ftpg + anuenio) * 0.2605;
    } else if (form.ddJud.value == 3) {
        form.numJud.disabled = true;
        jud = (vencimento + vencimento * ftpg + anuenio) * 0.2886;
    } else if (form.ddJud.value == 4) {
        form.numJud.disabled = true;
        jud = (vencimento + vencimento * ftpg + anuenio) * 0.4794;
    } else {
        form.numJud.disabled = true;
    }
    var qualificacao = ftpg * vencimento;

    var diffPisoEnf = 0;
    if (form.ddCargo.value == "2") {
        var piso = 4750;
        if (form.ddClasse.value == "2") {
            piso = piso * 0.5 * ((40 * form.ddCargaH.value) / 44);
            //50% nivel C, corrigindo carga horaria
        } else if (form.ddClasse.value == "3") {
            piso = piso * 0.7 * ((40 * form.ddCargaH.value) / 44);
            //70% nivel D, corrigindo carga horaria
        } else if (form.ddClasse.value == "4") {
            piso = piso * 1.0 * ((40 * form.ddCargaH.value) / 44);
            //100% nivel E, corrigindo carga horaria
        } else {
            piso = 0;
        }
        diffPisoEnf = piso - vencimento;
        if (diffPisoEnf < 0) diffPisoEnf = 0;
    }

    var outrosRendTrib = parseFloat(form.numOutrosRendTrib.value) || 0;
    var outrosRendTribPSS = parseFloat(form.numoutrosRendTribPSS.value) || 0;
    var outrosRendIsnt = parseFloat(form.numOutrosRendIsnt.value) || 0;

    var remuneracao = vencimento + jud + qualificacao + anuenio + diffPisoEnf + outrosRendTrib + outrosRendTribPSS + gratDesemp + gratGeneric;

    //Checa e limita os valores máximos das gratificacoes que tem limite
    if (form.ddGratGen.value >= 1 && form.ddGratGen.value <= 3 && vencimento > gratGenMax) {
        remuneracao = gratGenMax;
    }

    /*var tipoFG = infoCarreiras[carreira].tipoFG,
    //tipoCD = infoCarreiras[carreira].tipoCD;
    for (let date in infoCarreiras.funcs) {
        if (date > periodo) break;
        fgArray = infoCarreiras.funcs[date][tipoFG];    
        cdArray = infoCarreiras.funcs[date][tipoCD];
    } 
    var fungrat = fgArray[parseInt(form.ddFG.value, 10)],
    cargodir = cdArray[parseInt(form.ddCD.value, 10)]; 

    if (form.rdCD[0].checked && form.ddCD.value != "0") {
        //60%
        cargodir = cargodir * 0.6;
    } else if (form.rdCD[1].checked && form.ddCD.value != "0") {
        //100%
        cargodir = cargodir - vencimento;
        //Subtraindo o vencimento pois ele entra na conta de qualquer jeito, mas é necessário para cálculo de adicionais. O 'cargodir' fica como um adicional da difernça entre o vencimento e o 100% do CD
    } else {
        cargodir = 0;
    } */
    var funcao = 0,
    funcaoDisp = 0
    funcaoSubst = false,
    funcNome = $(form).find("select[name='ddFuncTipo'] option:selected").text();
    for (let date in infoCarreiras.funcs) {        
        if (date > form.ddAno.value) break;
        if(funcNome !== "Não") {
            funcao = infoCarreiras.funcs[date][funcNome][form.ddFuncVal.value];
            funcaoDisp = funcao;
        }
    }
    $('form[name="' + form.name + '"] [name="txVB"]').removeAttr('style');
    $('form[name="' + form.name + '"] [name="txQualif"]').removeAttr('style');
    if (["CD", "CCE"].includes(funcNome)) {
        if (form.rdCD[0].checked) {
            funcao = funcao * 0.6;
            funcaoDisp = funcao;
        } else {            
            remuneracao = funcao;
            funcao = 0;
            funcaoSubst = true;
            $('form[name="' + form.name + '"] [name="txVB"]').css({"text-decoration": "line-through", "color": "red"});
            $('form[name="' + form.name + '"] [name="txQualif"]').css({"text-decoration": "line-through", "color": "red"}); 
        }        
    }

    var sindicato = 0;
    var sindaliq = parseFloat(form.sindaliq.value) / 100;
    if (form.ddSindTipo.value != "nao") {
        var basesind = remuneracao + funcao;
        if (carreira == "MF") basesind -= jud; //ADUnB não cobra sobre a Dec Jud
        if (form.ddSindTipo.value == "vb") {
            sindicato = vencimento * sindaliq;
        } else if (form.ddSindTipo.value == "rem") {
            sindicato = basesind * sindaliq;
        } else {            
            sindicato = 0; //?
        }
    }

    var noturno = ((remuneracao + valinsa) / (30 * 8 * ftcarga)) * (form.noturno.value * (60 / 52.5)) * 0.25;
    //http://progep.sites.ufms.br/coordenadorias/administracao-de-pessoal/divisao-de-pagamento/adicional-noturno/
    //http://www.progep.ufu.br/procedimento/adicional-noturno

    var basesaude = remuneracao + valinsa + funcao - outrosRendTrib + outrosRendTribPSS;
    var saude = form.saude.checked
        ? valorSaude(basesaude, parseInt(form.ddIdade.value, 10), periodo) +
          valorSaude(basesaude, parseInt(form.ddIdadeDep1.value, 10), periodo) +
          valorSaude(basesaude, parseInt(form.ddIdadeDep2.value, 10), periodo) +
          valorSaude(basesaude, parseInt(form.ddIdadeDep3.value, 10), periodo) * form.Dep3Qtd.value
        : 0;

    var basecreche = vencimento + qualificacao + jud + Math.floor(valinsa * 100) / 100 + anuenio + funcao;
    //basecreche aparentemente não leva em consideração o Incentivo à Qualificação - outros a ver
    var creche = valorCreche(basecreche, periodo, form.numCreche.value, form.crechecota.checked);
    
    //A base do PSS é quase a mesma da 'remuneracao', mas sem insalubridade pois a cobrança é opcional
    //Subtrair também os rendimentos tributaveis mas isentos de PSS
    var basepss = remuneracao - outrosRendTribPSS;
    var tetopss = 4663.75;

    if (periodo < 202501) {
        tetopss = 7786.02;
    } else {
        tetopss = 8157.41;
    }

    var deducaoSimp = 564.80
    if (periodo >= 202505) {
        deducaoSimp = 607.20;
    }

    var ferias = 0,
    aliqirrfferias = 0,
    adiantamento = 0,
    adiantPct = (parseInt(form.numAdiant.value) / 30) * 0.7,
    aliqirrfadiant = 0,
    aliqpssadiant = 0,
    descAdiant = 0;

    if (form.ferias.checked) {
        ferias = (remuneracao + valinsa + funcao) / 3;
        if (carreira == "MF") {
            //Terço de férias de docentes é calculado sob salário de 45 dias
            ferias = ferias * 1.5;
        }
        aliqirrfferias = valorIRRF(ferias - deducaoSimp, periodo, deducaoSimp)[0];
    } 

    if (adiantPct > 0 && !form.adiantRest.checked) {
        adiantamento = (remuneracao + valinsa + funcao) * adiantPct;
        aliqirrfadiant = valorIRRF(adiantamento, periodo)[0];
        aliqpssadiant = calcPSS(periodo, adiantamento, tetopss);
    } else if (adiantPct > 0 && form.adiantRest.checked) {
        var tempAdiant = (remuneracao + valinsa + funcao) * adiantPct;
        descAdiant = tempAdiant - valorIRRF(tempAdiant, periodo, deducaoSimp)[0] - calcPSS(periodo, tempAdiant, tetopss);
    }

    var decter = 0;
    
    if (form.decter.checked) {
        if(form.decter_par.value == "1") {
            //Primeira parcela, metade do bruto mas sem descontos
            decter = (remuneracao + valinsa + funcao) / 2;
        } else {
            //Segunda parcela, bruto mas serao calculados descontos
            decter = remuneracao + valinsa + funcao;
        }
    }

    //Checa quais opcionais deverão entrar na base do PSS
    if (form.pssfgcd.checked) {
        basepss += funcao;
    }
    if (form.pssrisco.checked) {
        basepss += valinsa;
    }
    if (form.pssnoturno.checked) {
        basepss += noturno;
    }
    if (form.pssgrat.checked) {
        basepss += gratGeneric;
    }

    if (form.novopss.value == "rpc" && basepss > tetopss) {
        // Se for regime complementar e se for maior que teto.
        basepss = tetopss;
    }

    var valorpss = calcPSS(periodo, basepss, tetopss);
    var abonoperm = 0;
    if (form.novopss.value == "rpps" && form.abonoperm.checked) abonoperm = valorpss;

    var aliqfunp = 0;

    if (form.funp_ad.value == "sim") {
        if (basepss == tetopss) {
            //Só pode ser ativo normal quem entrou depois de 02/2013 e recebe acima do teto da previdência
            var basefunp = vencimento + gratDesemp + jud + qualificacao - tetopss;
            if (funcaoSubst) basefunp = remuneracao;
            if (form.rpcfgcd.checked) {
                basefunp += funcao;
            }
            if (form.rpcrisco.checked) {
                basefunp += valinsa;
            }
            if (form.rpcnoturno.checked) {
                basefunp += noturno;
            }
            if (form.rpcgrat.checked) {
                basefunp += gratGeneric;
            }
            aliqfunp = basefunp * parseFloat(form.ddFunp.value);
            if (form.name == "myform") {
                document.getElementById("funp_plano_norm1").checked = true;
                document.getElementById("ddFunp1").disabled = false;
                document.getElementById("numFunpAlt1").disabled = true;
            } else {
                document.getElementById("funp_plano_norm2").checked = true;
                document.getElementById("ddFunp2").disabled = false;
                document.getElementById("numFunpAlt2").disabled = true;
            }
        } else {
            aliqfunp = parseInt(form.numFunpAlt.value, 10);
            if (form.name == "myform") {
                document.getElementById("funp_plano_alt1").checked = true;
                document.getElementById("ddFunp1").disabled = true;
                document.getElementById("numFunpAlt1").disabled = false;
            } else {
                document.getElementById("funp_plano_alt2").checked = true;
                document.getElementById("ddFunp2").disabled = true;
                document.getElementById("numFunpAlt2").disabled = false;
            }
        }
    }

    var outrosdescontos = parseFloat(form.numOutros.value) || 0;
    var outrosdescontospct = ((parseInt(form.numOutrosPct.value) || 0) / 100 ) * (remuneracao + valinsa);

    var outrosdescontosIsnt = parseFloat(form.numOutrosIsnt.value) || 0;
    var outrosdescontospctIsnt = ((parseInt(form.numOutrosPctIsnt.value) || 0) / 100 ) * (remuneracao + valinsa);

    var outrosdescsum = outrosdescontos + outrosdescontospct + outrosdescontosIsnt + outrosdescontospctIsnt;

    var aliqFunpFacul = parseFloat(form.numFunpFacul.value) || 0;

    var reducaoDepsIRRF = dependentesIR(form.numDepIRRF.value, periodo);

    var rendTributavel = vencimento + jud + qualificacao + anuenio + noturno + valinsa + funcao + 
    outrosRendTrib + outrosRendTribPSS + gratDesemp+ gratGeneric + abonoperm;

    //Checa e limita os valores máximos das gratificacoes que tem limite
    if (form.ddGratGen.value >= 1 && form.ddGratGen.value <= 3 && remuneracao > gratGenMax) {
        rendTributavel = gratGenMax;
    } else if (funcaoSubst) {
        rendTributavel = remuneracao;
    }

    var deducoesIrrf = valorpss + aliqfunp + aliqFunpFacul + reducaoDepsIRRF + outrosdescontosIsnt + outrosdescontospctIsnt;

    var baseirrf = rendTributavel - deducoesIrrf;

    //Checa se a deducao calculada é menor que o valor da simplificada
    //Valor da deducao é definido acima para uso em férias também
    //Lei 9.250/95, Art. 4, § 2º: deve ser usada a maior deducação mensal entre a calculada e a simplificada 

    if (deducoesIrrf < deducaoSimp) {
        baseirrf = rendTributavel - deducaoSimp;
    }

    var valsirrf = valorIRRF(baseirrf, periodo, Math.max(deducoesIrrf, deducaoSimp)),
    aliqirrf = valsirrf[0],
    descIrrf = valsirrf[1];    

    var desc_13 = form.decter.checked && form.decter_par.value == "2" ? aliqirrf + valorpss + aliqfunp + aliqFunpFacul + decter/2 : 0;

    var descontos = aliqirrf + valorpss + aliqfunp + aliqFunpFacul + desc_13 + sindicato + aliqirrfferias + aliqirrfadiant + aliqpssadiant + descAdiant + outrosdescsum;

    var bruto = remuneracao + valinsa + saude + alimentacao + transporte + creche + funcao + noturno + ferias + adiantamento + decter + outrosRendIsnt + abonoperm;

    var salario = bruto - descontos;
    if (form.name == "myform") {
        liq1 = salario;
    } else {
        liq2 = salario;
    }

    //Print results after each calculation
    var diffLiqs = (liq2 - liq1);
    $('#diffLiqAbs').html(formatValor(diffLiqs));
    $('#diffLiqPct').html((100 * diffLiqs / liq1).toFixed(2).replace(".", ",") + "%");
    $('#diffLiqPor').html(((100 * liq2) / liq1).toFixed(0) + "%");
    form.txVB.value = formatValor(vencimento);
    form.txResult.value = formatValor(salario);
    form.txInsa.value = formatValor(valinsa);
    form.txInss.value = formatValor(valorpss);
    form.txBruto.value = formatValor(bruto);
    form.txIrrf.value = formatValor(aliqirrf);
    form.txSaude.value = formatValor(saude);
    form.txTrans.value = formatValor(transporte);
    form.txAlim.value = formatValor(alimentacao);
    form.txCreche.value = formatValor(creche);
    form.txbIRRF.value = formatValor(baseirrf);
    form.txbINSS.value = formatValor(basepss);
    form.txdesconto.value = formatValor(descontos);
    form.txSindicato.value = formatValor(sindicato);
    form.txQualif.value = formatValor(qualificacao);
    form.txGratDes.value = formatValor(gratDesemp);
    form.txGratGen.value = formatValor(gratGeneric);
    form.txFunp.value = formatValor(aliqfunp);
    form.txDepIRRF.value = formatValor(reducaoDepsIRRF);
    //form.txFG.value = formatValor(fungrat);
    //form.txCD.value = form.rdCD[0].checked ? formatValor(cargodir) : formatValor(cdArray[parseInt(form.ddCD.value, 10)]);
    form.txFunc.value = formatValor(funcaoDisp);
    form.txNoturno.value = formatValor(noturno);
    form.txFerias.value = formatValor(ferias);
    form.txAdiant.value = formatValor(adiantamento - descAdiant);
    //form.txIrrfFerias.value = formatValor(aliqirrfferias);
    form.txDecter.value = formatValor(decter);
    //form.txDesc13.value = formatValor(desc_13);
    //form.tx13.value = formatValor(decter);
    form.txDescPct.value = formatValor(outrosdescontospct);
    form.txDescPctIsnt.value = formatValor(outrosdescontospctIsnt);    
    //form.txFeriasR.value = formatValor(ferias);

    //Display info on Detailed Results
    var formid = 1;
    if (form.name == "myform") {
        $("#tabdetails-rend-1").empty();
        $("#tabdetails-desc-1").empty();
        $("#tabdetails-outros-1").empty();
    } else {
        $("#tabdetails-rend-2").empty();
        $("#tabdetails-desc-2").empty();
        $("#tabdetails-outros-2").empty();
        formid = 2;
    }

    addDetailValue("#tabdetails-rend", formid, "VB", vencimento);
    addDetailValue("#tabdetails-rend", formid, "VA", alimentacao);
    if (transporte > 0) addDetailValue("#tabdetails-rend", formid, "VT", transporte);
    if (creche > 0) addDetailValue("#tabdetails-rend", formid, "Pré-escolar", creche);
    if (noturno > 0) addDetailValue("#tabdetails-rend", formid, "Ad. Noturno", noturno);
    if (jud > 0) addDetailValue("#tabdetails-rend", formid, "Dec. Jud.", jud);
    if (ftpg > 0) addDetailValue("#tabdetails-rend", formid, infoCarreiras[carreira].labelIQRT, vencimento * ftpg);
    //if (fungrat > 0) addDetailValue("#tabdetails-rend", formid, "FG", fungrat);
    //if (cargodir > 0) addDetailValue("#tabdetails-rend", formid, "CD", cargodir);
    if (funcaoDisp > 0) addDetailValue("#tabdetails-rend", formid, "Função", funcaoDisp);
    if (anuenio > 0) addDetailValue("#tabdetails-rend", formid, "Anuênio", anuenio);
    if (valinsa > 0) addDetailValue("#tabdetails-rend", formid, "Insalubridade", valinsa);
    if (saude > 0) addDetailValue("#tabdetails-rend", formid, "Saúde Sup.", saude);
    if (diffPisoEnf > 0) addDetailValue("#tabdetails-rend", formid, "Dif. Piso Enf.", diffPisoEnf);
    if (outrosRendIsnt > 0) addDetailValue("#tabdetails-rend", formid, "Outros Isen.", outrosRendIsnt);
    if (outrosRendTrib > 0) addDetailValue("#tabdetails-rend", formid, "Outros Trib.", outrosRendTrib);
    if (outrosRendTribPSS > 0) addDetailValue("#tabdetails-rend", formid, "Outros Trib.", outrosRendTribPSS);
    if (abonoperm > 0) addDetailValue("#tabdetails-rend", formid, "Abono Perm.", abonoperm);
    if (ferias > 0) addDetailValue("#tabdetails-rend", formid, "1/3 Férias", ferias);
    if (adiantamento > 0) addDetailValue("#tabdetails-rend", formid, "Adiantamento", adiantamento);
    if (decter > 0) addDetailValue("#tabdetails-rend", formid, "13º", decter);
    //
    if (gratDesemp > 0) addDetailValue("#tabdetails-rend", formid, infoCarreiras[carreira].nomeGrat, gratDesemp);
    
    

    addDetailValue("#tabdetails-desc", formid, "CPSS", valorpss);
    addDetailValue("#tabdetails-desc", formid, "IR", aliqirrf);
    if (aliqirrfferias > 0) addDetailValue("#tabdetails-desc", formid, "IR Férias", aliqirrfferias);
    if (aliqirrfadiant > 0) addDetailValue("#tabdetails-desc", formid, "IR Adiant.", aliqirrfadiant);
    if (aliqpssadiant > 0) addDetailValue("#tabdetails-desc", formid, "CPSS Adiant.", aliqpssadiant);
    if (descAdiant > 0) addDetailValue("#tabdetails-desc", formid, "Adiantamento", descAdiant);
    if (desc_13 > 0) addDetailValue("#tabdetails-desc", formid, "IR+CPSS 13º", desc_13);
    if (aliqfunp > 0) addDetailValue("#tabdetails-desc", formid, "Funpresp", aliqfunp);
    if (aliqFunpFacul > 0) addDetailValue("#tabdetails-desc", formid, "Funpresp-facultativo", aliqFunpFacul);
    if (sindicato > 0) addDetailValue("#tabdetails-desc", formid, "Sindicato", sindicato);
    if (outrosdescontos > 0) addDetailValue("#tabdetails-desc", formid, "Outros Trib.", outrosdescontos);
    if (outrosdescontospct > 0) addDetailValue("#tabdetails-desc", formid, "Outros Trib.", outrosdescontospct);
    if (outrosdescontosIsnt > 0) addDetailValue("#tabdetails-desc", formid, "Outros Isen.", outrosdescontosIsnt);
    if (outrosdescontospctIsnt > 0) addDetailValue("#tabdetails-desc", formid, "Outros Isen.", outrosdescontospctIsnt);

    addDetailValue("#tabdetails-outros", formid, "Bruto", bruto);
    addDetailValue("#tabdetails-outros", formid, "Descontos", descontos);
    addDetailValue("#tabdetails-outros", formid, "Líquido", salario);
    addDetailValue("#tabdetails-outros", formid, "Base CPSS", basepss);
    addDetailValue("#tabdetails-outros", formid, "Rend. Trib.", rendTributavel);
    addDetailValue("#tabdetails-outros", formid, "Deduções IR", Math.max(deducoesIrrf, deducaoSimp));
    addDetailValue("#tabdetails-outros", formid, "Base IR", baseirrf);
    addDetailValue("#tabdetails-outros", formid, "Desc. IR", descIrrf);

    //cdorfg(form);
    saveStorage();
}

function addDetailValue(parent, form, name, value) {
    var newEl = '<div><span style="font-weight:bold;">' + name + '</span>: ' + formatValor(value) + '</div>';
    $(parent + "-" + form).append(newEl);
}

function fillform(form, data) {
    for (const [key, value] of Object.entries(data)) {
        if (typeof(value) == 'boolean') {
            form[key].checked = value;
        } else { 
            form[key].value = value;
        }
    }
}

function inverterform(tipo) {
    var form1 = document.forms["myform"];
    var form2 = document.forms["myform2"];

    var fields = {myform: {}, myform2: {}};
    var frms = ['myform', 'myform2'];
    $.each(frms, function(i, v) {
        $('form[name="' + v + '"] *').filter(':input').each(function(i, inp){
            if ($(inp).attr("id")) {
                var ptype = $(inp).prop("type");
                var prop = {};
                if (ptype && ptype == "checkbox") {
                    prop = {[$(inp).attr("name")]: $(inp).prop("checked")};
                } else if (ptype && ptype == "radio") {
                    if ($(inp).prop("checked")) {
                        prop = {[$(inp).attr("name")]: $(inp).val()};
                    }
                } else {
                    prop = {[$(inp).attr("name")]: $(inp).val()};
                }
                fields[v] = Object.assign(fields[v], prop);
            }
        });
    });
    //console.log(fields);
    if (tipo == "inverter") {
        fillform(form1, fields.myform2);
        fillform(form2, fields.myform);
        atualizaFunc(form1);
        //Campos de func precisam ser atualizados manualmente pois os valores são dependentes do tipo de função
        form1.ddFuncVal.value = fields.myform2.ddFuncVal;
        atualizaFunc(form2);
        form2.ddFuncVal.value = fields.myform.ddFuncVal;
    } else if (tipo == "cima") {
        fillform(form1, fields.myform2);
        atualizaFunc(form1);
        form1.ddFuncVal.value = fields.myform2.ddFuncVal;
    } else {
        fillform(form2, fields.myform);
        atualizaFunc(form2);
        form2.ddFuncVal.value = fields.myform.ddFuncVal;
    }
    

    updateQuali(form1, form1.ddClasse.value);
    updateQuali(form2, form2.ddClasse.value);

    calcSalario(form1);
    calcSalario(form2);
}
