var liq1 = 0;
var liq2 = 0;

function updateQuali(form, classs) {
    var alloptions = Array("Exigência Mínima", "Fundamental Completo", "Médio Completo", "Médio Técnico", "Graduação Completa", "Especialização", "Mestrado", "Doutorado");
    var allvalues = Array(0, 1, 2, 3, 4, 5, 6, 7);
    var newoptions = Array();
    var newvalues = Array();
    var curValue = form.ddQuali.value;
    var classe = parseFloat(classs);
    if (classe <= 11) {
        newoptions = alloptions;
        newvalues = allvalues;
    } else if (classe == 17) {
        newoptions = alloptions.slice(2, alloptions.length);
        newvalues = allvalues.slice(2, alloptions.length);
        newoptions.splice(0, 1, "Exigência Mínima");
        newvalues.splice(0, 1, 0);
    } else if (classe == 31) {
        newoptions = alloptions.slice(4, alloptions.length);
        newvalues = allvalues.slice(4, alloptions.length);
        newoptions.splice(0, 1, "Exigência Mínima");
        newvalues.splice(0, 1, 0);
    }
    while (form.ddQuali.options.length) form.ddQuali.options[0] = null;
    for (i = 0; i < newoptions.length; i++) {
        // Create a new drop down option with the
        // display text and value from arr
        option = new Option(newoptions[i], newvalues[i]);
        // Add to the end of the existing options
        form.ddQuali.options[form.ddQuali.length] = option;
    }
    if (newvalues.includes(parseInt(curValue, 10))) {
        form.ddQuali.value = curValue;
    }
    calcSalario(form);
}

function calcfatorpg(i, areadireta) {
    var pesos = Array();
    if (areadireta) {
        pesos = Array(0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.52, 0.75);
    } else {
        pesos = Array(0, 0, 0, 0.1, 0.15, 0.2, 0.35, 0.5);
    }
    return pesos[i];
}

function firstload() {
    updateQuali(myform, 1);
    updateQuali(myform2, 1);
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
    var intRegex = /^\d+$/;
    valor = Math.round(valor * 100) / 100;
    if (valor === 0) {
        return "R$ 0,00";
    } else if (intRegex.test(valor)) {
        return "R$ " + valor + ",00";
    } else if (intRegex.test(valor * 10)) {
        return "R$ " + valor.toString().replace(".", ",") + "0";
    } else {
        return "R$ " + valor.toString().replace(".", ",");
    }
}

function valorIRRF(base, periodo) {
    var aliquota = 0;
    if (periodo == 1) {
        // Ano 2013
        if (base < 1710.79) {
            aliquota = 0;
        } else if (base < 2563.92) {
            aliquota = base * 0.075 - 128.31;
        } else if (base < 3418.6) {
            aliquota = base * 0.15 - 320.6;
        } else if (base < 4271.59) {
            aliquota = base * 0.225 - 577.0;
        } else {
            aliquota = base * 0.275 - 790.58;
        }
    } else if (periodo <= 4) {
        //Ano 2014 pra frente
        if (base <= 1787.77) {
            aliquota = 0;
        } else if (base <= 2679.29) {
            aliquota = base * 0.075 - 134.08;
        } else if (base <= 3572.43) {
            aliquota = base * 0.15 - 335.03;
        } else if (base <= 4463.81) {
            aliquota = base * 0.225 - 602.96;
        } else {
            aliquota = base * 0.275 - 826.15;
        }
    } else if (periodo < 16) {
        //Abril 2015 pra frente
        if (base <= 1903.98) {
            aliquota = 0;
        } else if (base <= 2826.65) {
            aliquota = base * 0.075 - 142.8;
        } else if (base <= 3751.05) {
            aliquota = base * 0.15 - 354.8;
        } else if (base <= 4664.68) {
            aliquota = base * 0.225 - 636.13;
        } else {
            aliquota = base * 0.275 - 869.36;
        }
    } else {
        if (base <= 2112) {
            aliquota = 0;
        } else if (base <= 2826.65) {
            aliquota = base * 0.075 - 158.4;
        } else if (base <= 3751.05) {
            aliquota = base * 0.15 - 370.4;
        } else if (base <= 4664.68) {
            aliquota = base * 0.225 - 651.73;
        } else {
            aliquota = base * 0.275 - 884.96;
        }
    } 
    return Math.floor(aliquota * 100) / 100;
}

function calcPSS(periodo, base, teto) {
    var valor = 0;
    if (periodo < 12) {
        valor = base * 0.11;
    } else if (periodo == 12) {
        //2020
        if (base <= 1045.0) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2089.6) {
            valor = base * 0.09 - 15.68;
        } else if (base <= 3134.4) {
            valor = base * 0.12 - 78.36;
        } else if (base <= 6101.06) {
            // teto
            valor = base * 0.14 - 141.05;
        } else if (base <= 10448.0) {
            valor = base * 0.145 - 171.56;
        } else if (base <= 20896.2) {
            valor = base * 0.165 - 380.52;
        } else if (base <= 40474.2) {
            valor = base * 0.19 - 902.92;
        } else {
            valor = base * 0.22 - 2117.14;
        }
    } else if (periodo == 13) {
        //2021
        if (base <= 1100.0) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2203.48) {
            valor = base * 0.09 - 16.5;
        } else if (base <= 3305.22) {
            valor = base * 0.12 - 82.6;
        } else if (base <= 6433.57) {
            //teto
            valor = base * 0.14 - 148.7;
        } else if (base <= 11017.42) {
            valor = base * 0.145 - 180.87;
        } else if (base <= 22034.83) {
            valor = base * 0.165 - 401.22;
        } else if (base <= 42967.92) {
            valor = base * 0.19 - 952.09;
        } else {
            valor = base * 0.22 - 2241.13;
        }
    } else if (periodo == 14) {
        //2022
        if (base <= 1212.0) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2427.35) {
            valor = base * 0.09 - 18.18;
        } else if (base <= 3641.04) {
            valor = base * 0.12 - 91;
        } else if (base <= 7087.23) {
            //teto
            valor = base * 0.14 - 163.82;
        } else if (base <= 12136.8) {
            valor = base * 0.145 - 199.26;
        } else if (base <= 24273.58) {
            valor = base * 0.165 - 441.99;
        } else if (base <= 47333.46) {
            valor = base * 0.19 - 1048.83;
        } else {
            (valor = base * 0.22 - 2468), 84;
        }
    } else if (periodo < 16) {
        //2023
        if (base <= 1302.0) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2571.29) {
            valor = base * 0.09 - 19.53;
        } else if (base <= 3856.94) {
            valor = base * 0.12 - 96.67;
        } else if (base <= 7507.49) {
            //teto
            valor = base * 0.14 - 173.81;
        } else if (base <= 12856.5) {
            valor = base * 0.145 - 211.35;
        } else if (base <= 25712.99) {
            valor = base * 0.165 - 468.48;
        } else if (base <= 50140.33) {
            valor = base * 0.19 - 1111.3;
        } else {
            valor = base * 0.22 - 2615.51;
        }
    } else {
        if (base <= 1320.0) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2571.29) {
            valor = base * 0.09 - 19.8;
        } else if (base <= 3856.94) {
            valor = base * 0.12 - 96.94;
        } else if (base <= 7507.49) {
            //teto
            valor = base * 0.14 - 174.08;
        } else if (base <= 12856.5) {
            valor = base * 0.145 - 211.62;
        } else if (base <= 25712.99) {
            valor = base * 0.165 - 468.75;
        } else if (base <= 50140.33) {
            valor = base * 0.19 - 1111.57;
        } else {
            valor = base * 0.22 - 2615.78;
        }
    }
    return Math.floor(valor * 100) / 100;
}

/*function calcPSSreforma(base) {    
	if (base <= 998.00) {
		aliquota = base * 0.075;
	} else if (base <= 2000.00 ) {
		aliquota = base * 0.090 - 14.97;
	} else if (base <= 3000.00) {
		aliquota = base * 0.12 - 74.97;
	} else if (base <=  5839.45) {
		aliquota = base * 0.14 - 134.97;
	} else if (base <=  10000.00) {
		aliquota = base * 0.145 - 164.17;
	} else if (base <=  20000.00) {
		aliquota = base * 0.165 - 364.17;
	} else if (base <=  39000.00) {
		aliquota = base * 0.19 - 864.17;	
	} else {
		aliquota = base * 0.22 -  2034.17;
	}
    return Math.floor(aliquota * 100) / 100;
}*/

function dependentesIR(deps, periodo) {
    var aliq = 0;
    if (periodo == 1) {
        // Ano 2013
        aliq = deps * 171.97;
    } else if (periodo <= 4) {
        //Entre 2014 e 02/2015
        aliq = deps * 179.71;
    } else {
        aliq = deps * 189.59;
    }
    return Math.floor(aliq * 100) / 100;
}

function valorSaude(bruto, ftidade, periodo) {
    var tabela = Array();
    tabela[0] = Array(121.94, 127.69, 129.42, 134.6, 138.62, 143.22, 154.98, 157.44, 159.9, 167.7);
    tabela[1] = Array(116.19, 121.94, 123.67, 127.69, 131.72, 136.32, 147.42, 149.76, 152.1, 159.9);
    tabela[2] = Array(110.44, 116.19, 117.92, 121.94, 125.97, 130.57, 139.86, 142.08, 144.3, 152.1);
    tabela[3] = Array(105.84, 110.44, 112.16, 116.19, 120.22, 124.82, 133.56, 135.68, 137.8, 144.3);
    tabela[4] = Array(100.08, 105.84, 107.56, 110.44, 114.46, 119.07, 127.26, 129.28, 131.3, 137.8);
    tabela[5] = Array(90.88, 93.18, 94.91, 95.48, 99.51, 104.11, 105.84, 107.52, 109.2, 111.8);
    tabela[6] = Array(87.43, 88.58, 90.31, 90.88, 94.91, 99.51, 100.8, 102.4, 104.0, 106.6);
    tabela[7] = Array(82.83, 83.98, 85.7, 86.28, 90.31, 94.91, 95.76, 97.28, 98.8, 101.4);
    var ftbruto = 0;
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
    var ftAjuste = 1;
    if (periodo >= 6 && periodo < 17) {
        ftAjuste = 1.22618;
    } else {
        ftAjuste = 1.22618 * 1.5106;
    }
    if (ftidade == 1000) {
        return 0;
    } else {
        return Math.round(tabela[ftbruto][ftidade] * ftAjuste * 100) / 100;
    }
}

function valorCreche(rem, periodo, n) {
    var teto = 95;
    if (periodo < 17) {
        teto = 321;
    } else {
        teto = 485.90;
    }
    var desc = 0;
    if (periodo < 9) {        
        if (rem < 6200.8) {
            desc = 0.05;
        } else if (rem < 12401.6) {
            desc = 0.1;
        } else if (rem < 18602.4) {
            desc = 0.15;
        } else if (rem < 24803.2) {
            desc = 0.2;
        } else {
            desc = 0.25;
        }
    } else {
        if (rem < 6888.05) {
            desc = 0.05;
        } else if (rem <= 13776.10) {
            desc = 0.1;
        } else if (rem <= 20664.15) {
            desc = 0.15;
        } else if (rem <= 27552.20) {
            desc = 0.2;
        } else {
            desc = 0.25;
        }
    }
    return teto * (1 - desc) * n;
}

function valorTransporte(vencimento, gasto) {
    var auxilio = 0;
    var gastodiaro = 0;
    if (isNaN(gasto) || gasto < 0) {
        gastodiario = 0;
    } else {
        gastodiario = Math.ceil((gasto - 1) / 0.2) * 0.2 + 1;
    }
    auxilio = gastodiario * 22 - vencimento * 0.06 * (22 / 30);
    if (auxilio < 0) {
        return 0;
    } else {
        return auxilio;
    }
}

function valorFG(FG, periodo) {
    var FG2013 = Array(0, 777.26, 522.9, 423.94, 215.78, 175.09, 128.4, 81.89, 60.57, 49.15);
    var FG2014 = Array(0, 790.75, 531.99, 431.3, 219.54, 187.14, 130.63, 83.31, 61.61, 50.0);
    var FG2015 = Array(0, 804.49, 541.23, 438.79, 223.35, 181.23, 132.89, 84.75, 62.69, 50.86);
    var FG2016 = Array(0, 848.74, 571.0, 462.92, 235.63, 191.2, 140.2, 89.41, 66.14, 53.66);
    var FG2017 = Array(0, 891.17, 599.55, 486.07, 247.42, 200.76, 147.21, 93.88, 69.44, 56.34);
    var FG2018 = Array(0, 933.5, 628.03, 509.16, 259.17, 210.29, 154.2, 98.34, 72.74, 59.02);
    var FG2019 = Array(0, 975.51, 656.29, 532.07, 270.83, 219.76, 161.14, 101.77, 76.02, 61.67);
    var FG2023 = Array(0, 1063.31, 715.35, 579.96, 270.83, 219.76, 161.14, 102.77, 76.02, 61.67);

    var valor = 0;
    if (periodo == 1) {
        valor = FG2013[FG];
    } else if (periodo <= 2) {
        valor = FG2014[FG];
    } else if (periodo <= 6) {
        //até 07/2016
        valor = FG2015[FG];
    } else if (periodo == 7) {
        //até 12/2016
        valor = FG2016[FG];
    } else if (periodo == 8) {
        //até 12/2017
        valor = FG2017[FG];
    } else if (periodo == 9) {
        //a partir de 2018
        valor = FG2018[FG];
    } else if (periodo < 16) {
        //a partir de 2019
        valor = FG2019[FG];
    } else {
        //a partir de maio/2023
        valor = FG2023[FG];
    }
    return valor;
}

function valorCD(CD, periodo) {
    //var CD2012 = Array(0, 8889.52, 7431.09, 5833.75, 4236.41)
    var CD2013 = Array(0, 9575.95, 8004.9, 9284.22, 4563.53);
    var CD2014 = Array(0, 10315.37, 8623.02, 6769.47, 4915.92);
    var CD2015 = Array(0, 11111.9, 9288.86, 7292.19, 5295.51);
    var CD2016 = Array(0, 11723.05, 9799.75, 7693.26, 5586.77);
    var CD2017 = Array(0, 12309.21, 10289.74, 8077.92, 5866.1);
    var CD2018 = Array(0, 12893.89, 10778.5, 8461.62, 6144.74);
    var CD2019 = Array(0, 13474.12, 11263.53, 8842.29, 6421.26);
    var CD2023 = Array(0, 14686.79, 12277.25, 9638.21, 6999.17);

    var valor = 0;
    if (periodo == 1) {
        //Placeholder para atualizações futuras, não está retroativo
        // até 2013
        valor = CD2013[CD];
    } else if (periodo <= 3) {
        //até 2014
        valor = CD2014[CD];
    } else if (periodo <= 6) {
        //até 08/2016
        valor = CD2015[CD];
    } else if (periodo == 7) {
        //até 12/2016
        valor = CD2016[CD];
    } else if (periodo == 8) {
        //até 12/2017
        valor = CD2017[CD];
    } else if (periodo == 9) {
        //A partir de 2018
        valor = CD2018[CD];
    } else if (periodo < 16) {
        //A partir de 2019
        valor = CD2019[CD];
    } else {
        valor = CD2023[CD];
    }
    return valor;
}

function valorAlim(periodo) {
    var alimentacao = 0;
    if (periodo < 6) {
        alimentacao = 373;
    } else if (periodo < 16) {
        alimentacao = 458;
    } else if (periodo < 17) {
        alimentacao = 658;
    } else  {
        alimentacao = 1000;
    }
    return alimentacao;
}

function nocd(form) {
    if (form.ddFG.value != 0) {
        form.ddCD.value = 0;
    }
}

function nofg(form) {
    if (form.ddCD.value != 0) {
        form.ddFG.value = 0;
    }
}

function calcSalario(form) {
    if (form.name == "myform") {
        document.getElementById("numProposta1").disabled = true;
    } else if (form.name == "myform2") {
        document.getElementById("numProposta2").disabled = true;
    }
    var periodo = parseInt(form.ddAno.value, 10);
    if (periodo == 1) {
        ftstep = 1.036;
        base = 1086.32;
    } else if (periodo == 2) {
        ftstep = 1.037;
        base = 1086.32;
    } else if (periodo == 3) {
        ftstep = 1.037;
        base = 1140.64;
    } else if (periodo == 4) {
        ftstep = 1.038;
        base = 1140.64;
    } else if (periodo == 5 || periodo == 6) {
        ftstep = 1.038;
        base = 1197.67;
    } else if (periodo == 7) {
        ftstep = 1.038;
        base = 1263.54;
    } else if (periodo > 7 && periodo < 16) {
        ftstep = 1.039;
        base = 1326.72;
    } else if (periodo < 18) {
        //aumentos em maio/2023
        ftstep = 1.039;
        base = 1446.12;
    } else if (periodo == 100) {
        //Proposta Fasubra 2023 AB CD E plenaria
        //Piso 3 SM, Step 5%
        ftstep = 1.05;
        base = 3960;
    } else if (periodo == 101) {
        //Proposta Fasubra 2023 AB CD E sem reajuste
        //Piso 3 SM, Step 5%
        ftstep = 1.039;
        base = 1822.77;
    } else if (periodo == 102) {
        //Ajusta o estado do campo reajuste de acordo com periodo
        if (form.name == "myform") {
            document.getElementById("numProposta1").disabled = false;
        } else if (form.name == "myform2") {
            document.getElementById("numProposta2").disabled = false;
        }
        var reajuste = parseInt(form.numProposta.value, 10);    
        //Proposta Fasubra 2023 AB CD E +15%
        //Piso 3 SM, Step 3.9%
        ftstep = 1.039;
        base = 1822.77 * (1 + (reajuste / 100));
    }

    if (form.ddCargo.value == "1") {
        base = base * 2;
    }

    var classeOffset = parseFloat(form.ddClasse.value);
    var nivelMerito = parseFloat(form.ddNivel.value);
    var nivelCap = parseFloat(form.ddProg.value);

    var ftvb = classeOffset + nivelMerito + nivelCap - 3;
    var ftcarga = form.ddCargaH.value;

    var vencimento = Math.ceil(base * Math.pow(ftstep, ftvb) * ftcarga * 100) / 100;

    if (periodo >= 100) {        
        //Propostas Fasubra
        var frac = 1;
        ftvb = nivelMerito + nivelCap - 2;
        //if (classeOffset == 1 || classeOffset == 6) frac = 0.4; //niveis AB
        if (classeOffset == 11 || classeOffset == 17) frac = 0.6 / 0.4; //niveis CD
        if (classeOffset == 31) frac = 1 / 0.4
        vencimento = Math.ceil(base * Math.pow(ftstep, ftvb) * ftcarga * 100 * frac) / 100;
    }
   
    var anuenio = (form.numAnuenio.value / 100) * vencimento;

    var alimentacao = form.alim.checked ? valorAlim(periodo) : 0;

    if (ftcarga == 0.5) {
        alimentacao = alimentacao / 2;
    }

    var transporte = form.trans.checked ? valorTransporte(vencimento, form.gastoTrans.value) : 0;
    var ftinsa = form.ddInsa.value;
    var ftpg = calcfatorpg(form.ddQuali.value, form.areaquali[0].checked);
    /*var urp = (form.removeurp.checked) ? vencimento * 0.2605 * (1 +
        ftpg) : 0;*/
    var urp = 0;
    $('form[name="' + form.name + '"] span[name="numURPview"]').css("visibility", "hidden");
    //form.numURPview.style.visibility = "hidden";
    if (form.ddURP.value == 1) {
        /* Na verdade o valor foi totalmente congelado, não só a tabela
		//Calcula a URP usando a tabela até Julho 2016, periodo = 6;
		var vencURP = Math.floor(1197.67 * (Math.pow(1.038, ftvb)) * ftcarga * 100) / 100;		
		urp = vencURP * 0.2605 * (1 + ftpg);
		*/
        $('form[name="' + form.name + '"] span[name="numURPview"]').css("visibility", "visible");
        if (form.numURP.disabled) {
            form.numURP.disabled = false;
        }
        urp = parseFloat(form.numURP.value) || 0;
    } else if (form.ddURP.value == 2) {
        form.numURP.disabled = true;
        urp = vencimento * 0.2605 * (1 + ftpg);
    } else {
        form.numURP.disabled = true;
    }
    var qualificacao = ftpg * vencimento;

    var diffPisoEnf = 0;
    if (form.ddCargo.value == "2") {
        var piso = 4750;
        if (form.ddClasse.value == "11") {
            piso = piso * 0.5 * ((40 * form.ddCargaH.value) / 44);
            //50% nivel C, corrigindo carga horaria
        } else if (form.ddClasse.value == "17") {
            piso = piso * 0.7 * ((40 * form.ddCargaH.value) / 44);
            //70% nivel D, corrigindo carga horaria
        } else if (form.ddClasse.value == "11") {
            piso = piso * 1.0 * ((40 * form.ddCargaH.value) / 44);
            //100% nivel E, corrigindo carga horaria
        } else {
            piso = 0;
        }
        diffPisoEnf = piso - vencimento;
        if (diffPisoEnf < 0) diffPisoEnf = 0;
    }

    var outrosRendTrib = parseFloat(form.numOutrosRendTrib.value) || 0;
    var outrosRendIsnt = parseFloat(form.numOutrosRendIsnt.value) || 0;

    var remuneracao = vencimento + urp + qualificacao + Math.floor(ftinsa * vencimento * 100) / 100 + anuenio + diffPisoEnf + outrosRendTrib;

    var sindicato = 0;
    if (form.sindicato.checked) {
        if (form.ddSindTipo.value == "vb") {
            sindicato = vencimento * 0.01;
        } else if (form.ddSindTipo.value == "rem") {
            sindicato = remuneracao * 0.01;
        } else {
            //form.ddSindTipo.value == "cat"
            sindicato = Math.round(0.01 * base * Math.pow(ftstep, parseInt(form.ddClasse.value, 10) - 1) * ftcarga * 100) / 100;
        }
    }

    var noturno = (remuneracao / (30 * 8 * ftcarga)) * (form.noturno.value * (60 / 52.5)) * 0.25;
    //http://progep.sites.ufms.br/coordenadorias/administracao-de-pessoal/divisao-de-pagamento/adicional-noturno/
    //http://www.progep.ufu.br/procedimento/adicional-noturno

    var fungrat = valorFG(parseInt(form.ddFG.value, 10), periodo);

    if (form.rdCD[0].checked && form.ddCD.value != "0") {
        //60%
        var cargodir = valorCD(form.ddCD.value, periodo) * 0.6;
    } else if (form.rdCD[1].checked && form.ddCD.value != "0") {
        //100%
        var cargodir = valorCD(form.ddCD.value, periodo) - vencimento;
        //Subtraindo o vencimento pois ele entra na conta de qualquer jeito, mas é necessário para cálculo de adicionais. O 'cargodir' fica como um adicional da difernça entre o vencimento e o 100% do CD
    } else {
        var cargodir = 0;
    }
    var basesaude = remuneracao + fungrat + cargodir;
    var saude = form.saude.checked
        ? valorSaude(basesaude, parseInt(form.ddIdade.value, 10), periodo) +
          valorSaude(basesaude, parseInt(form.ddIdadeDep1.value, 10), periodo) +
          valorSaude(basesaude, parseInt(form.ddIdadeDep2.value, 10), periodo) +
          valorSaude(basesaude, parseInt(form.ddIdadeDep3.value, 10), periodo) * form.Dep3Qtd.value
        : 0;

    var basecreche = vencimento + urp + Math.floor(ftinsa * vencimento * 100) / 100 + anuenio;
    //basecreche aparentemente não leva em consideração o Incentivo à Qualificação - outros a ver
    var creche = valorCreche(basecreche, periodo, form.numCreche.value);

    if (form.ferias.checked) {
        var ferias = (remuneracao + fungrat + cargodir) / 3;
        var aliqirrfferias = valorIRRF(ferias, periodo);
    } else {
        var ferias = 0;
        var aliqirrfferias = 0;
    }

    var decter = form.decter.checked ? (remuneracao + fungrat + cargodir) / 2 : 0;

    var bruto = Math.round((remuneracao + saude + alimentacao + transporte + creche + fungrat + cargodir + noturno + ferias + decter + outrosRendIsnt) * 100) / 100;
    var basepss = remuneracao; //vencimento + urp + qualificacao;
    var tetopss = 4663.75;

    if (periodo == 6 || periodo == 7) {
        tetopss = 5189.82;
    } else if (periodo == 8) {
        tetopss = 5531.31;
    } else if (periodo == 9) {
        tetopss = 5645.81;
    } else if (periodo == 10) {
        tetopss = 5839.45;
    } else if (periodo == 11 || periodo == 12) {
        tetopss = 6101.06;
    } else if (periodo == 13) {
        tetopss = 6433.57;
    } else if (periodo == 14) {
        tetopss = 7087.23;
    } else {
        tetopss = 7507.49;
    }

    if (form.pssfgcd.checked) {
        basepss += fungrat + cargodir;
    }

    if (form.novopss.value == "rpc" && basepss > tetopss) {
        // Se for regime complementar e se for maior que teto.
        basepss = tetopss;
    }

    var valorpss = calcPSS(periodo, basepss, tetopss);

    var aliqfunp = 0;

    if (form.funp_ad.value == "sim") {
        if (basepss == tetopss) {
            //Só pode ser ativo normal quem entrou depois de 02/2013 e recebe acima do teto da previdência
            var basefunp = vencimento + urp + qualificacao - tetopss;
            if (form.pssfgcd.checked) {
                basefunp += fungrat + cargodir;
            }
            aliqfunp = Math.round(basefunp * parseFloat(form.ddFunp.value) * 100) / 100;
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

    var aliqFunpFacul = parseFloat(form.numFunpFacul.value) || 0;

    var reducaoDepsIRRF = dependentesIR(form.numDepIRRF.value, periodo);

    //Eu considerei que CD 60% nao incidia IR, mas pelo FB falaram que incide.
    //Caso não incida basta remover de baseirrf. Quando é 100%, cargodir = 0

    var rendTributavel = vencimento + urp + qualificacao + ftinsa * vencimento + fungrat + cargodir + outrosRendTrib;

    var deducoesIrrf = valorpss + aliqfunp + aliqFunpFacul + reducaoDepsIRRF;

    var baseirrf = rendTributavel - deducoesIrrf;

    if (periodo >= 16 && deducoesIrrf < 528) {
        deducoesIrrf = 528;
        baseirrf = rendTributavel - deducoesIrrf;
    }

    var aliqirrf = valorIRRF(baseirrf, periodo);

    var desc_13 = form.decter.checked && form.decter_par.value == "2" ? aliqirrf + valorpss + aliqfunp + aliqFunpFacul : 0;

    var outrosdescontos = parseFloat(form.numOutros.value) || 0;

    var descontos = Math.round((aliqirrf + valorpss + aliqfunp + aliqFunpFacul + desc_13 + sindicato + aliqirrfferias + outrosdescontos) * 100) / 100;

    var salario = bruto - descontos;
    if (form.name == "myform") {
        liq1 = salario;
    } else {
        liq2 = salario;
    }
    //Toggle URP input visibility

    //Print results after each calculation
    document.getElementById("diffLiqAbs").value = formatValor(Math.abs(Math.round((liq1 - liq2) * 100) / 100));
    document.getElementById("diffLiqPor").value = Math.round((100 * liq2) / liq1) + "%";
    form.txVB.value = formatValor(vencimento);
    form.txResult.value = formatValor(salario);
    form.txInsa.value = formatValor(Math.floor(ftinsa * vencimento * 100) / 100);
    form.txInss.value = formatValor(Math.round(valorpss * 100) / 100);
    form.txBruto.value = formatValor(Math.round(bruto * 100) / 100);
    form.txIrrf.value = formatValor(Math.round(aliqirrf * 100) / 100);
    form.txSaude.value = formatValor(saude);
    form.txTrans.value = formatValor(Math.round(transporte * 100) / 100);
    form.txAlim.value = formatValor(alimentacao);
    form.txCreche.value = formatValor(Math.round(creche * 100) / 100);
    form.txURP.value = formatValor(Math.round(urp * 100) / 100);
    form.txbIRRF.value = formatValor(Math.round(baseirrf * 100) / 100);
    form.txbINSS.value = formatValor(Math.round(basepss * 100) / 100);
    form.txdesconto.value = formatValor(descontos);
    form.txSindicato.value = formatValor(Math.round(sindicato * 100) / 100);
    form.txQualif.value = formatValor(Math.round(qualificacao * 100) / 100);
    form.txFunp.value = formatValor(Math.round(aliqfunp * 100) / 100);
    form.txDepIRRF.value = formatValor(reducaoDepsIRRF);
    form.txFG.value = formatValor(fungrat);
    form.txCD.value = form.rdCD[0].checked ? formatValor(Math.round(cargodir * 100) / 100) : formatValor(valorCD(form.ddCD.value, periodo));
    form.txNoturno.value = formatValor(Math.round(noturno * 100) / 100);
    form.txFerias.value = formatValor(Math.round(ferias * 100) / 100);
    form.txIrrfFerias.value = formatValor(Math.round(aliqirrfferias * 100) / 100);
    form.txDecter.value = formatValor(Math.round(decter * 100) / 100);
    form.txDesc13.value = formatValor(Math.round(desc_13 * 100) / 100);

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
    if (urp > 0) addDetailValue("#tabdetails-rend", formid, "URP", urp);
    if (ftpg > 0) addDetailValue("#tabdetails-rend", formid, "IQ", vencimento * ftpg);
    if (fungrat > 0) addDetailValue("#tabdetails-rend", formid, "FG", fungrat);
    if (cargodir > 0) addDetailValue("#tabdetails-rend", formid, "CD", cargodir);
    if (anuenio > 0) addDetailValue("#tabdetails-rend", formid, "Anuênio", anuenio);
    if (ftinsa > 0) addDetailValue("#tabdetails-rend", formid, "Insalubridade", ftinsa * vencimento);
    if (saude > 0) addDetailValue("#tabdetails-rend", formid, "Saúde Sup.", saude);
    if (diffPisoEnf > 0) addDetailValue("#tabdetails-rend", formid, "Dif. Piso Enf.", diffPisoEnf);
    if (outrosRendIsnt > 0) addDetailValue("#tabdetails-rend", formid, "Outros Rend. Isen.", outrosRendIsnt);
    if (outrosRendTrib > 0) addDetailValue("#tabdetails-rend", formid, "Outros Rend. Trib.", outrosRendTrib);

    addDetailValue("#tabdetails-desc", formid, "PSS", valorpss);
    addDetailValue("#tabdetails-desc", formid, "IR", aliqirrf);
    if (aliqfunp > 0) addDetailValue("#tabdetails-desc", formid, "Funpresp", aliqfunp);
    if (aliqFunpFacul > 0) addDetailValue("#tabdetails-desc", formid, "Funpresp-facultativo", aliqFunpFacul);
    if (sindicato > 0) addDetailValue("#tabdetails-desc", formid, "Sindicato", sindicato);
    if (outrosdescontos > 0) addDetailValue("#tabdetails-desc", formid, "Outros", outrosdescontos);

    addDetailValue("#tabdetails-outros", formid, "Bruto", bruto);
    addDetailValue("#tabdetails-outros", formid, "Descontos", descontos);
    addDetailValue("#tabdetails-outros", formid, "Líquido", salario);
    addDetailValue("#tabdetails-outros", formid, "Base PSS", basepss);
    addDetailValue("#tabdetails-outros", formid, "Base IR", baseirrf);
    addDetailValue("#tabdetails-outros", formid, "Deduções IR", deducoesIrrf);

    //cdorfg(form);
    saveStorage();
}

function addDetailValue(parent, form, name, value) {
    var newEl = "<div>" + name + ": " + formatValor(value) + "</div>";
    $(parent + "-" + form).append(newEl);
}

function inverterform(tipo) {
    var form1 = document.forms["myform"];
    var form2 = document.forms["myform2"];

    if (tipo == "inverter") {
        var values1 = Array(
            form1.ddClasse.value,
            form1.ddProg.value,
            form1.ddFG.value,
            form1.ddNivel.value,
            form1.ddCargaH.value,
            form1.ddAno.value,
            form1.ddQuali.value,
            form1.saude.checked,
            form1.ddIdade.value,
            form1.ddURP.value,
            form1.trans.checked,
            form1.gastoTrans.value,
            form1.alim.checked,
            form1.ddInsa.value,
            form1.numCreche.value,
            form1.sindicato.checked,
            form1.areaquali[0].checked,
            form1.areaquali[1].checked,
            form1.novopss.value,
            form1.ddFunp.value,
            form1.numAnuenio.value,
            form1.funp_ad.value,
            form1.numFunpAlt.value,
            form1.numDepIRRF.value,
            form1.ddIdadeDep1.value,
            form1.ddIdadeDep2.value,
            form1.ddIdadeDep3.value,
            form1.ddCD.value,
            form1.rdCD[0].checked,
            form1.rdCD[1].checked,
            form1.ferias.checked,
            form1.decter.checked,
            form1.decter_par.value,
            form1.ddSindTipo.value,
            0, //form1.pss_aliq.value,
            form1.numOutros.value,
            form1.numURP.value,
            form1.numFunpFacul.value,
            form1.Dep3Qtd.value,
            form1.ddCargo.value,
            form1.numOutrosRendIsnt.value,
            form1.numOutrosRendTrib.value,
            form1.numProposta.value
        );

        var values2 = Array(
            form2.ddClasse.value,
            form2.ddProg.value,
            form2.ddFG.value,
            form2.ddNivel.value,
            form2.ddCargaH.value,
            form2.ddAno.value,
            form2.ddQuali.value,
            form2.saude.checked,
            form2.ddIdade.value,
            form2.ddURP.value,
            form2.trans.checked,
            form2.gastoTrans.value,
            form2.alim.checked,
            form2.ddInsa.value,
            form2.numCreche.value,
            form2.sindicato.checked,
            form2.areaquali[0].checked,
            form2.areaquali[1].checked,
            form2.novopss.value,
            form2.ddFunp.value,
            form2.numAnuenio.value,
            form2.funp_ad.value,
            form2.numFunpAlt.value,
            form2.numDepIRRF.value,
            form2.ddIdadeDep1.value,
            form2.ddIdadeDep2.value,
            form2.ddIdadeDep3.value,
            form2.ddCD.value,
            form2.rdCD[0].checked,
            form2.rdCD[1].checked,
            form2.ferias.checked,
            form2.decter.checked,
            form2.decter_par.value,
            form2.ddSindTipo.value,
            0, //form2.pss_aliq.value,
            form2.numOutros.value,
            form2.numURP.value,
            form2.numFunpFacul.value,
            form2.Dep3Qtd.value,
            form2.ddCargo.value,
            form2.numOutrosRendIsnt.value,
            form2.numOutrosRendTrib.value,
            form2.numProposta.value
        );
    } else if (tipo == "cima") {
        var values2 = Array(
            form2.ddClasse.value,
            form2.ddProg.value,
            form2.ddFG.value,
            form2.ddNivel.value,
            form2.ddCargaH.value,
            form2.ddAno.value,
            form2.ddQuali.value,
            form2.saude.checked,
            form2.ddIdade.value,
            form2.ddURP.value,
            form2.trans.checked,
            form2.gastoTrans.value,
            form2.alim.checked,
            form2.ddInsa.value,
            form2.numCreche.value,
            form2.sindicato.checked,
            form2.areaquali[0].checked,
            form2.areaquali[1].checked,
            form2.novopss.value,
            form2.ddFunp.value,
            form2.numAnuenio.value,
            form2.funp_ad.value,
            form2.numFunpAlt.value,
            form2.numDepIRRF.value,
            form2.ddIdadeDep1.value,
            form2.ddIdadeDep2.value,
            form2.ddIdadeDep3.value,
            form2.ddCD.value,
            form2.rdCD[0].checked,
            form2.rdCD[1].checked,
            form2.ferias.checked,
            form2.decter.checked,
            form2.decter_par.value,
            form2.ddSindTipo.value,
            0, //form2.pss_aliq.value,
            form2.numOutros.value,
            form2.numURP.value,
            form2.numFunpFacul.value,
            form2.Dep3Qtd.value,
            form2.ddCargo.value,
            form2.numOutrosRendIsnt.value,
            form2.numOutrosRendTrib.value,
            form2.numProposta.value
        );

        var values1 = values2;
    } else {
        var values1 = Array(
            form1.ddClasse.value,
            form1.ddProg.value,
            form1.ddFG.value,
            form1.ddNivel.value,
            form1.ddCargaH.value,
            form1.ddAno.value,
            form1.ddQuali.value,
            form1.saude.checked,
            form1.ddIdade.value,
            form1.ddURP.value,
            form1.trans.checked,
            form1.gastoTrans.value,
            form1.alim.checked,
            form1.ddInsa.value,
            form1.numCreche.value,
            form1.sindicato.checked,
            form1.areaquali[0].checked,
            form1.areaquali[1].checked,
            form1.novopss.value,
            form1.ddFunp.value,
            form1.numAnuenio.value,
            form1.funp_ad.value,
            form1.numFunpAlt.value,
            form1.numDepIRRF.value,
            form1.ddIdadeDep1.value,
            form1.ddIdadeDep2.value,
            form1.ddIdadeDep3.value,
            form1.ddCD.value,
            form1.rdCD[0].checked,
            form1.rdCD[1].checked,
            form1.ferias.checked,
            form1.decter.checked,
            form1.decter_par.value,
            form1.ddSindTipo.value,
            0, //form1.pss_aliq.value,
            form1.numOutros.value,
            form1.numURP.value,
            form1.numFunpFacul.value,
            form1.Dep3Qtd.value,
            form1.ddCargo.value,
            form1.numOutrosRendIsnt.value,
            form1.numOutrosRendTrib.value,
            form1.numProposta.value
        );

        var values2 = values1;
    }

    form1.ddClasse.value = values2[0];
    form1.ddProg.value = values2[1];
    form1.ddFG.value = values2[2];
    form1.ddNivel.value = values2[3];
    form1.ddCargaH.value = values2[4];
    form1.ddAno.value = values2[5];

    form1.saude.checked = values2[7];
    form1.ddIdade.value = values2[8];
    form1.ddURP.value = values2[9];
    form1.trans.checked = values2[10];
    form1.gastoTrans.value = values2[11];
    form1.alim.checked = values2[12];
    form1.ddInsa.value = values2[13];
    form1.numCreche.value = values2[14];
    form1.sindicato.checked = values2[15];
    form1.areaquali[0].checked = values2[16];
    form1.areaquali[1].checked = values2[17];
    form1.novopss.value = values2[18];
    form1.ddFunp.value = values2[19];
    form1.numAnuenio.value = values2[20];
    form1.funp_ad.value = values2[21];
    form1.numFunpAlt.value = values2[22];
    form1.numDepIRRF.value = values2[23];
    form1.ddIdadeDep1.value = values2[24];
    form1.ddIdadeDep2.value = values2[25];
    form1.ddIdadeDep3.value = values2[26];
    form1.ddCD.value = values2[27];
    form1.rdCD[0].checked = values2[28];
    form1.rdCD[1].checked = values2[29];
    form1.ferias.checked = values2[30];
    form1.decter.checked = values2[31];
    form1.decter_par.value = values2[32];
    form1.ddSindTipo.value = values2[33];
    //form1.pss_aliq.value = values2[34]
    form1.numOutros.value = values2[35];
    form1.numURP.value = values2[36];
    form1.numFunpFacul.value = values2[37];
    form1.Dep3Qtd.value = values2[38];
    form1.ddCargo.value = values2[39];
    form1.numOutrosRendIsnt.value = values2[40];
    form1.numOutrosRendTrib.value = values2[41];
    form1.numProposta.value = values2[42];

    form2.ddClasse.value = values1[0];
    form2.ddProg.value = values1[1];
    form2.ddFG.value = values1[2];
    form2.ddNivel.value = values1[3];
    form2.ddCargaH.value = values1[4];
    form2.ddAno.value = values1[5];

    form2.saude.checked = values1[7];
    form2.ddIdade.value = values1[8];
    form2.ddURP.value = values1[9];
    form2.trans.checked = values1[10];
    form2.gastoTrans.value = values1[11];
    form2.alim.checked = values1[12];
    form2.ddInsa.value = values1[13];
    form2.numCreche.value = values1[14];
    form2.sindicato.checked = values1[15];
    form2.areaquali[0].checked = values1[16];
    form2.areaquali[1].checked = values1[17];
    form2.novopss.value = values1[18];
    form2.ddFunp.value = values1[19];
    form2.numAnuenio.value = values1[20];
    form2.funp_ad.value = values1[21];
    form2.numFunpAlt.value = values1[22];
    form2.numDepIRRF.value = values1[23];
    form2.ddIdadeDep1.value = values1[24];
    form2.ddIdadeDep2.value = values1[25];
    form2.ddIdadeDep3.value = values1[26];
    form2.ddCD.value = values1[27];
    form2.rdCD[0].checked = values1[28];
    form2.rdCD[1].checked = values1[29];
    form2.ferias.checked = values1[30];
    form2.decter.checked = values1[31];
    form2.decter_par.value = values1[32];
    form2.ddSindTipo.value = values1[33];
    //form2.pss_aliq.value = values1[34]
    form2.numOutros.value = values1[35];
    form2.numURP.value = values1[36];
    form2.numFunpFacul.value = values1[37];
    form2.Dep3Qtd.value = values1[38];
    form2.ddCargo.value = values1[39];
    form2.numOutrosRendIsnt.value = values1[40];
    form2.numOutrosRendTrib.value = values1[41];
    form2.numProposta.value = values1[42];

    updateQuali(form1, values2[0]);
    updateQuali(form2, values1[0]);

    form1.ddQuali.value = values2[6];
    form2.ddQuali.value = values1[6];

    calcSalario(form1);
    calcSalario(form2);
}
