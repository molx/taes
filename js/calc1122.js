var liq1 = 0;
var liq2 = 0;

function updateQuali(form, classs) {
    var alloptions = Array("Mínima do Cargo", "Fundamental Completo",
        "Médio Completo", "Médio Técnico", "Graduação Completa",
        "Especialização", "Mestrado", "Doutorado");
    var allvalues = Array(0, 1, 2, 3, 4, 5, 6, 7);
    var newoptions = Array();
    var newvalues = Array();
    var classe = parseFloat(classs);
    if(classe <= 11) {
        newoptions = alloptions;
        newvalues = allvalues;
    } else if(classe == 17) {
        newoptions = alloptions.slice(2, alloptions.length);
        newvalues = allvalues.slice(2, alloptions.length);
        newoptions.splice(0, 1, "Exigência Mínima");
        newvalues.splice(0, 1, 0);
    } else if(classe == 31) {
        newoptions = alloptions.slice(4, alloptions.length);
        newvalues = allvalues.slice(4, alloptions.length);
        newoptions.splice(0, 1, "Exigência Mínima");
        newvalues.splice(0, 1, 0);
    }
    while(form.ddQuali.options.length) form.ddQuali.options[0] = null;
    for(i = 0; i < newoptions.length; i++) {
        // Create a new drop down option with the
        // display text and value from arr
        option = new Option(newoptions[i], newvalues[i]);
        // Add to the end of the existing options
        form.ddQuali.options[form.ddQuali.length] = option;
    }
    calcSalario(form);
}

function calcfatorpg(i, areadireta) {
    var pesos = Array();
    if(areadireta) {
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
    if(!regex.test(key)) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function validateGD2(form) {
    var valor = form.gastoTrans.value;
    if(valor > 20) {
        valor = valor.toString().substring(0, valor.length - 1);
        if(valor > 20) {
            valor = valor.toString().substring(0, valor.length - 1);
        }
    } else {
        valor = parseInt(valor, 10);
    }
    form.gastoTrans.value = valor;
    calcSalario(form);
}

function formatValor(valor) {
    var intRegex = /^\d+$/;
    if(valor === 0) {
        return "R$ 0,00";
    } else if(intRegex.test(valor)) {
        return "R$ " + valor + ",00";
    } else if(intRegex.test(valor * 10)) {
        return "R$ " + valor.toString().replace(".", ",") + "0";
    } else {
        return "R$ " + valor.toString().replace(".", ",");
    }

}

function valorIRRF(base, periodo) {
    var aliquota = 0;
    if(periodo == 1) { // Ano 2013
        if(base < 1710.79) {
            aliquota = 0;
        } else if(base < 2563.92) {
            aliquota = base * 0.075 - 128.31;
        } else if(base < 3418.60) {
            aliquota = base * 0.15 - 320.60;
        } else if(base < 4271.59) {
            aliquota = base * 0.225 - 577.00;
        } else {
            aliquota = base * 0.275 - 790.58;
        }
    } else if(periodo <= 4) { //Ano 2014 pra frente
        if(base <= 1787.77) {
            aliquota = 0;
        } else if(base <= 2679.29) {
            aliquota = base * 0.075 - 134, 08;
        } else if(base <= 3572.43) {
            aliquota = base * 0.15 - 335, 03;
        } else if(base <= 4463.81) {
            aliquota = base * 0.225 - 602.96;
        } else {
            aliquota = base * 0.275 - 826.15;
        }
    } else { //Abril 2015 pra frente
        if(base <= 1903.98) {
            aliquota = 0;
        } else if(base <= 2826.65) {
            aliquota = base * 0.075 - 142.80;
        } else if(base <= 3751.05) {
            aliquota = base * 0.15 - 354.80;
        } else if(base <= 4664.68) {
            aliquota = base * 0.225 - 636.13;
        } else {
            aliquota = base * 0.275 - 869.36;
        }
    }
    return Math.floor(aliquota * 100) / 100;
}

function dependentesIR(deps, periodo) {
    var aliq = 0;
    if(periodo == 1) { // Ano 2013
        aliq = deps * 171.97;
    } else if(periodo <= 4) { //Entre 2014 e 02/2015
        aliq = deps * 179.71;
    } else {
        aliq = deps * 189.59;
    }
    return Math.floor(aliq * 100) / 100;
}

function valorSaude(bruto, ftidade, periodo) {
    var tabela = Array();
    tabela[0] = Array(121.94, 127.69, 129.42, 134.60, 138.62, 143.22,
        154.98, 157.44, 159.90, 167.70);
    tabela[1] = Array(116.19, 121.94, 123.67, 127.69, 131.72, 136.32,
        147.42, 149.76, 152.10, 159.90);
    tabela[2] = Array(110.44, 116.19, 117.92, 121.94, 125.97, 130.57,
        139.86, 142.08, 144.30, 152.10);
    tabela[3] = Array(105.84, 110.44, 112.16, 116.19, 120.22, 124.82,
        133.56, 135.68, 137.80, 144.30);
    tabela[4] = Array(100.08, 105.84, 107.56, 110.44, 114.46, 119.07,
        127.26, 129.28, 131.30, 137.80);
    tabela[5] = Array(90.88, 93.18, 94.91, 95.48, 99.51, 104.11,
        105.84, 107.52, 109.20, 111.80);
    tabela[6] = Array(87.43, 88.58, 90.31, 90.88, 94.91, 99.51,
        100.80, 102.40, 104.00, 106.60);
    tabela[7] = Array(82.83, 83.98, 85.70, 86.28, 90.31, 94.91, 95.76,
        97.28, 98.80, 101.40);
    var ftbruto = 0;
    if(bruto < 1500) {
        ftbruto = 0;
    } else if(bruto < 2000) {
        ftbruto = 1;
    } else if(bruto < 2500) {
        ftbruto = 2;
    } else if(bruto < 3000) {
        ftbruto = 3;
    } else if(bruto < 4000) {
        ftbruto = 4;
    } else if(bruto < 5500) {
        ftbruto = 5;
    } else if(bruto < 7500) {
        ftbruto = 6;
    } else {
        ftbruto = 7;
    }
    var ftAjuste = 1;
    if(periodo >= 6) {
        ftAjuste = 1.22618;
    }
    if(ftidade == 1000) {
        return 0;
    } else {
        return Math.round(tabela[ftbruto][ftidade] * ftAjuste * 100) /
            100;
    }
}

function valorCreche(bruto, periodo, n) {
    var teto = 95;
    if(periodo >= 6) {
      teto = 321;
    } 
    var desc = 0;
    if (bruto < 6200.8) {
        desc = 0.05;
    } else if(bruto < 12401.6) {
        desc = 0.1;
    } else if(bruto < 18602.4) {
        desc = 0.15;
    } else if(bruto < 24803.2) {
        desc = 0.2;
    } else {
        desc = 0.25;
    }
    return teto * (1 - desc) * n;
}

function valorTransporte(vencimento, gasto) {
    var auxilio = 0;
    var gastodiaro = 0;
    if(isNaN(gasto) || gasto < 0) {
        gastodiario = 0;
    } else {
        gastodiario = Math.ceil((gasto - 1) / 0.2) * 0.2 + 1;
    }
    auxilio = gastodiario * 22 - vencimento * 0.06 * (22 / 30);
    if(auxilio < 0) {
        return 0;
    } else {
        return auxilio;
    }
}

function valorFG(FG, periodo) {
    var FG2013 = Array(0, 777.26, 522.90, 423.94, 215.78, 175.09,
        128.40, 81.89, 60.57, 49.15);
    var FG2014 = Array(0, 790.75, 531.99, 431.30, 219.54, 187.14,
        130.63, 83.31, 61.61, 50.00);
    var FG2015 = Array(0, 804.49, 541.23, 438.79, 223.35, 181.23,
        132.89, 84.75, 62.69, 50.86);
    var FG2016 = Array(0, 848.74, 571.00, 462.92, 235.63, 191.20,
        140.20, 89.41, 66.14, 53.66);
    var FG2017 = Array(0, 891.17, 599.55, 486.07, 247.42, 200.76,
        147.21, 93.88, 69.44, 56.34);
    var FG2018 = Array(0, 933.50, 628.03, 509.16, 259.17, 210.29,
        154.20, 98.34, 72.74, 59.02);
    var FG2019 = Array(0, 975.51, 656.29, 532.07, 270.83, 219.76,
        161.14, 101.77, 76.02, 61.67);
    
    var valor = 0;
    if(periodo == 1) {
      valor = FG2013[FG];
    } else if(periodo <= 2) {
      valor = FG2014[FG];
    } else if(periodo <= 6) {
      //até 07/2016
      valor = FG2015[FG];
    } else if(periodo == 7) {
      //até 12/2016
      valor = FG2016[FG];
    } else if(periodo == 8) {
      //até 12/2017
      valor = FG2017[FG];
    } else if(periodo <= 9) {
      //a partir de 2018
      //perido 2019 nao implementado
      valor = FG2018[FG];
    }  
    return valor;
}

function valorCD(CD, periodo) {
  //var CD2012 = Array(0, 8889.52, 7431.09, 5833.75, 4236.41)
  var CD2013 = Array(0, 9575.95, 8004.90, 9284.22, 4563.53);
  var CD2014 = Array(0, 10315.37, 8623.02, 6769.47, 4915.92);
  var CD2015 = Array(0, 11111.90, 9288.86, 7292.19, 5295.51);
  var CD2016 = Array(0, 11723.05, 9799.75, 7693.26, 5586.77);
  var CD2017 = Array(0, 12309.21, 10289.74, 8077.92, 5866.10);
  var CD2018 = Array(0, 12893.89, 10778.5, 8461.62, 6144.74);
  var CD2019 = Array(0, 13474.12, 11263.53, 8842.29, 6421.26);
  var valor = 0;
  if(periodo == 1) { //Placeholder para atualizações futuras, não está retroativo
    // até 2013
    valor = CD2013[CD]
  } else if(periodo <= 3) {
    //até 2014
    valor = CD2014[CD]
  } else if(periodo <= 6) {
    //até 08/2016
    valor = CD2015[CD]
  } else if(periodo == 7) {
    //até 12/2016
    valor = CD2016[CD]
  } else if(periodo == 8) {
    //até 12/2017
    valor = CD2017[CD]
  } else {
    //A partir de 2018
    valor = CD2018[CD]
    //Tabelas de 2019 inserida mas sem o periodo ainda
  }
  return valor;
}

function calcSalario(form) {
    var periodo = parseInt(form.ddAno.value, 10);
    if(periodo == 1) {
        ftstep = 1.036;
        base = 1086.32;
    } else if(periodo == 2) {
        ftstep = 1.037;
        base = 1086.32;
    } else if(periodo == 3) {
        ftstep = 1.037;
        base = 1140.64;
    } else if(periodo == 4) {
        ftstep = 1.038;
        base = 1140.64;
    } else if(periodo == 5 || periodo == 6) {
        ftstep = 1.038;
        base = 1197.67;
    } else if(periodo == 7) {
        ftstep = 1.038;
        base = 1263.54;
    } else if(periodo == 8) {
        ftstep = 1.039;
        base = 1326.72;
    } else if(periodo == 9) {
        ftstep = 1.0405;
        base = 1535.84;
    } else if(periodo == 10) {
        ftstep = 1.043;
        base = 1960.17;
    } else if(periodo == 11) {
        ftstep = 1.0455;
        base = 2501.73;
    }
    if(form.medico.checked) {
      base = base * 2;
    }
    var ftvb = parseFloat(form.ddClasse.value) + parseFloat(form.ddNivel
        .value) + parseFloat(form.ddProg.value) - 3;
    var ftcarga = form.ddCargaH.value;
    
    if (form.ddCD.value == 0 || form.rdCD[0].checked) {
      //Se não houver CD ou se for 60%, o vencimento é calculado pela tabela normalmente
      var vencimento = Math.floor(base * (Math.pow(ftstep, ftvb)) *
        ftcarga * 100) / 100;
    } else {
      //Se o CD for 100% então o vencimento é o valor do CD
      var vencimento = valorCD(form.ddCD.value,periodo);
    }
    
    var anuenio = (form.numAnuenio.value / 100) * vencimento
 
    var alimentacao = 0;
    if(periodo < 6) {
        alimentacao = (form.alim.checked) ? 373 : 0;
    } else {
        alimentacao = (form.alim.checked) ? 458 : 0;
    }
    if(ftcarga == 0.5) {
        alimentacao = alimentacao / 2;
    }
    
    var transporte = (form.trans.checked) ? valorTransporte(
        vencimento, form.gastoTrans.value) : 0;
    var ftinsa = form.ddInsa.value;
    var ftpg = calcfatorpg(form.ddQuali.value, form.areaquali[0].checked);
    var urp = (form.removeurp.checked) ? vencimento * 0.2605 * (1 +
        ftpg) : 0;
    var qualificacao = ftpg * vencimento
    var remuneracao = vencimento + urp + qualificacao + Math.floor(
        ftinsa * vencimento * 100) / 100 + anuenio;
    var sintfub = (form.sintfub.checked) ? remuneracao * 0.01 : 0;
    
    var noturno = (remuneracao/(30*8*ftcarga))*(form.noturno.value*(60/52.5))*0.25;
    //http://progep.sites.ufms.br/coordenadorias/administracao-de-pessoal/divisao-de-pagamento/adicional-noturno/
    //http://www.progep.ufu.br/procedimento/adicional-noturno
    
    var fungrat = valorFG(parseInt(form.ddFG.value, 10), periodo);
    var cargodir = (form.rdCD[0].checked) ? valorCD(form.ddCD.value, periodo)*0.6 : 0;
    
    var basesaude = remuneracao + fungrat + cargodir;
    var saude = (form.saude.checked) ? valorSaude(basesaude,
            parseInt(form.ddIdade.value, 10), periodo) +
        valorSaude(basesaude, parseInt(form.ddIdadeDep1.value, 10),
            periodo) +
        valorSaude(basesaude, parseInt(form.ddIdadeDep2.value, 10),
            periodo) +
        valorSaude(basesaude, parseInt(form.ddIdadeDep3.value, 10),
            periodo) :
        0;
        
    var creche = valorCreche(remuneracao, periodo, form.numCreche.value);
    var bruto = remuneracao + saude + alimentacao + transporte +
        creche + fungrat + cargodir + noturno;
    var baseinss = vencimento + urp + qualificacao;
    var tetoinss = 4663.75
    if(periodo >= 6) {
        tetoinss = 5189.82
    }
    if(form.novopss.checked && (baseinss > tetoinss)) {
        baseinss = tetoinss; //Se for da nova previdencia, o calculo é feito baseado no teto. 
    }
    var aliqinss = Math.floor(baseinss * 0.11 * 100) / 100;

    var aliqfunp = 0

    if(form.funp_ad.value == "sim") {
        if(baseinss == tetoinss) { //Só pode ser ativo normal quem entrou depois de 02/2013 e recebe acima do teto da previdência
            var basefunp = vencimento + urp + qualificacao - tetoinss;
            aliqfunp = basefunp * form.ddFunp.value;
            if(form.name == "myform") {
                document.getElementById("funp_plano_norm1").checked =
                    true;
                document.getElementById("ddFunp1").disabled = false;
                document.getElementById("numFunpAlt1").disabled =
                    true;
            } else {
                document.getElementById("funp_plano_norm2").checked =
                    true;
                document.getElementById("ddFunp2").disabled = false;
                document.getElementById("numFunpAlt2").disabled =
                    true;
            }
        } else {
            aliqfunp = form.numFunpAlt.value
            if(form.name == "myform") {
                document.getElementById("funp_plano_alt1").checked =
                    true;
                document.getElementById("ddFunp1").disabled = true;
                document.getElementById("numFunpAlt1").disabled =
                    false;
            } else {
                document.getElementById("funp_plano_alt2").checked =
                    true;
                document.getElementById("ddFunp2").disabled = true;
                document.getElementById("numFunpAlt2").disabled =
                    false;
            }
        }
    }

    var reducaoDepsIRRF = dependentesIR(form.numDepIRRF.value,
        periodo);
        
        //Eu chutei que CD 60% nao incidia IR, mas pelo FB falaram que incide.
        //Caso não incida basta remover de baseirrf. Quando é 100%, cargodir = 0
    var baseirrf = vencimento + urp + qualificacao + ftinsa*vencimento + 
        fungrat + cargodir - aliqinss - aliqfunp - reducaoDepsIRRF;
    var aliqirrf = valorIRRF(baseirrf, periodo);

    var salario = Math.round((bruto - aliqirrf - aliqinss - aliqfunp -
        sintfub) * 100) / 100;
    if(form.name == "myform") {
        liq1 = salario;
    } else {
        liq2 = salario;
    }
    document.getElementById("diffLiqAbs").value = formatValor(Math.abs(
        Math.round((liq1 - liq2) * 100) / 100));
    document.getElementById("diffLiqPor").value = Math.round(100 *
        liq2 / liq1) + "%";
    form.txVB.value = formatValor(vencimento);
    form.txResult.value = formatValor(salario);
    form.txInsa.value = formatValor(Math.floor(ftinsa * vencimento *
        100) / 100);
    form.txInss.value = formatValor(Math.round(aliqinss * 100) / 100);
    form.txBruto.value = formatValor(Math.round(bruto * 100) / 100);
    form.txIrrf.value = formatValor(Math.round(aliqirrf * 100) / 100);
    form.txSaude.value = formatValor(saude);
    form.txTrans.value = formatValor(Math.round(transporte * 100) /
        100);
    form.txAlim.value = formatValor(alimentacao);
    form.txCreche.value = formatValor(Math.round(creche * 100) / 100);
    form.txURP.value = formatValor(Math.round(urp * 100) / 100);
    form.txbIRRF.value = formatValor(Math.round(baseirrf * 100) / 100);
    form.txbINSS.value = formatValor(Math.round(baseinss * 100) / 100);
    form.txdesconto.value = formatValor(Math.round((aliqirrf +
        aliqinss) * 100) / 100);
    form.txsintfub.value = formatValor(Math.round(sintfub * 100) /
        100);
    form.txQualif.value = formatValor(Math.round(qualificacao * 100) /
        100);
    form.txFunp.value = formatValor(Math.round(aliqfunp * 100) / 100);
    form.txDepIRRF.value = formatValor(reducaoDepsIRRF);
    form.txFG.value = formatValor(fungrat);
    form.txCD.value = (form.rdCD[0].checked) ? formatValor(Math.round(cargodir * 100) / 100) : formatValor(valorCD(form.ddCD.value, periodo));
    form.txNoturno.value = formatValor(Math.round(noturno * 100)/100);
}

function inverterform(tipo) {
    var form1 = document.forms["myform"]
    var form2 = document.forms["myform2"]

    if(tipo == "inverter") {

        var values1 = Array(form1.ddClasse.value, form1.ddProg.value,
            form1.ddFG.value, form1.ddNivel.value, form1.ddCargaH
            .value, form1.ddAno.value, form1.ddQuali.value, form1
            .saude.checked, form1.ddIdade.value, form1.removeurp.checked,
            form1.trans.checked, form1.gastoTrans.value, form1.alim
            .checked, form1.ddInsa.value, form1.numCreche.value,
            form1.sintfub.checked, form1.areaquali[0].checked,
            form1.areaquali[1].checked, form1.novopss.checked,
            form1.ddFunp.value, form1.numAnuenio.value, form1.funp_ad
            .value, form1.numFunpAlt.value, form1.numDepIRRF.value,
            form1.ddIdadeDep1.value, form1.ddIdadeDep2.value,
            form1.ddIdadeDep3.value, form1.ddCD.value, form1.rdCD[0].checked, 
            form1.rdCD[1].checked);

        var values2 = Array(form2.ddClasse.value, form2.ddProg.value,
            form2.ddFG.value, form2.ddNivel.value, form2.ddCargaH
            .value, form2.ddAno.value, form2.ddQuali.value, form2
            .saude.checked, form2.ddIdade.value, form2.removeurp.checked,
            form2.trans.checked, form2.gastoTrans.value, form2.alim
            .checked, form2.ddInsa.value, form2.numCreche.value,
            form2.sintfub.checked, form2.areaquali[0].checked,
            form2.areaquali[1].checked, form2.novopss.checked,
            form2.ddFunp.value, form2.numAnuenio.value, form2.funp_ad
            .value, form2.numFunpAlt.value, form2.numDepIRRF.value,
            form2.ddIdadeDep1.value, form2.ddIdadeDep2.value,
            form2.ddIdadeDep3.value, form2.ddCD.value, form2.rdCD[0].checked, 
            form2.rdCD[1].checked);

    } else if(tipo == "cima") {

        var values2 = Array(form2.ddClasse.value, form2.ddProg.value,
            form2.ddFG.value, form2.ddNivel.value, form2.ddCargaH
            .value, form2.ddAno.value, form2.ddQuali.value, form2
            .saude.checked, form2.ddIdade.value, form2.removeurp.checked,
            form2.trans.checked, form2.gastoTrans.value, form2.alim
            .checked, form2.ddInsa.value, form2.numCreche.value,
            form2.sintfub.checked, form2.areaquali[0].checked,
            form2.areaquali[1].checked, form2.novopss.checked,
            form2.ddFunp.value, form2.numAnuenio.value, form2.funp_ad
            .value, form2.numFunpAlt.value, form2.numDepIRRF.value,
            form2.ddIdadeDep1.value, form2.ddIdadeDep2.value,
            form2.ddIdadeDep3.value, form2.ddCD.value, form2.rdCD[0].checked, 
            form2.rdCD[1].checked);

        var values1 = values2;

    } else {

        var values1 = Array(form1.ddClasse.value, form1.ddProg.value,
            form1.ddFG.value, form1.ddNivel.value, form1.ddCargaH
            .value, form1.ddAno.value, form1.ddQuali.value, form1
            .saude.checked, form1.ddIdade.value, form1.removeurp.checked,
            form1.trans.checked, form1.gastoTrans.value, form1.alim
            .checked, form1.ddInsa.value, form1.numCreche.value,
            form1.sintfub.checked, form1.areaquali[0].checked,
            form1.areaquali[1].checked, form1.novopss.checked,
            form1.ddFunp.value, form1.numAnuenio.value, form1.funp_ad
            .value, form1.numFunpAlt.value, form1.numDepIRRF.value,
            form1.ddIdadeDep1.value, form1.ddIdadeDep2.value,
            form1.ddIdadeDep3.value, form1.ddCD.value, form1.rdCD[0].checked, 
            form1.rdCD[1].checked);

        var values2 = values1;
    }

    form1.ddClasse.value = values2[0]
    form1.ddProg.value = values2[1]
    form1.ddFG.value = values2[2]
    form1.ddNivel.value = values2[3]
    form1.ddCargaH.value = values2[4]
    form1.ddAno.value = values2[5]

    form1.saude.checked = values2[7]
    form1.ddIdade.value = values2[8]
    form1.removeurp.checked = values2[9]
    form1.trans.checked = values2[10]
    form1.gastoTrans.value = values2[11]
    form1.alim.checked = values2[12]
    form1.ddInsa.value = values2[13]
    form1.numCreche.value = values2[14]
    form1.sintfub.checked = values2[15]
    form1.areaquali[0].checked = values2[16]
    form1.areaquali[1].checked = values2[17]
    form1.novopss.checked = values2[18]
    form1.ddFunp.value = values2[19]
    form1.numAnuenio.value = values2[20]
    form1.funp_ad.value = values2[21]
    form1.numFunpAlt.value = values2[22]
    form1.numDepIRRF.value = values2[23]
    form1.ddIdadeDep1.value = values2[24]
    form1.ddIdadeDep2.value = values2[25]
    form1.ddIdadeDep3.value = values2[26]
    form1.ddCD.value = values2[27]
    form1.rdCD[0].checked = values2[28]
    form1.rdCD[1].checked= values2[29]



    form2.ddClasse.value = values1[0]
    form2.ddProg.value = values1[1]
    form2.ddFG.value = values1[2]
    form2.ddNivel.value = values1[3]
    form2.ddCargaH.value = values1[4]
    form2.ddAno.value = values1[5]

    form2.saude.checked = values1[7]
    form2.ddIdade.value = values1[8]
    form2.removeurp.checked = values1[9]
    form2.trans.checked = values1[10]
    form2.gastoTrans.value = values1[11]
    form2.alim.checked = values1[12]
    form2.ddInsa.value = values1[13]
    form2.numCreche.value = values1[14]
    form2.sintfub.checked = values1[15]
    form2.areaquali[0].checked = values1[16]
    form2.areaquali[1].checked = values1[17]
    form2.novopss.checked = values1[18]
    form2.ddFunp.value = values1[19]
    form2.numAnuenio.value = values1[20]
    form2.funp_ad.value = values1[21]
    form2.numFunpAlt.value = values1[22]
    form2.numDepIRRF.value = values1[23]
    form2.ddIdadeDep1.value = values1[24]
    form2.ddIdadeDep2.value = values1[25]
    form2.ddIdadeDep3.value = values1[26]
    form2.ddCD.value = values1[27]
    form2.rdCD[0].checked = values1[28]
    form2.rdCD[1].checked= values1[29]

    updateQuali(form1, values2[0])
    updateQuali(form2, values1[0])

    form1.ddQuali.value = values2[6]
    form2.ddQuali.value = values1[6]

    calcSalario(form1)
    calcSalario(form2)
}