function updateQuali(a,b){var c=Array("Mínima do Cargo","Fundamental Completo","Médio Completo","Médio Técnico","Graduação Completa","Especialização","Mestrado","Doutorado"),d=Array(0,1,2,3,4,5,6,7),e=Array(),f=Array(),g=parseFloat(b);for(g<=11?(e=c,f=d):17==g?(e=c.slice(2,c.length),f=d.slice(2,c.length),e.splice(0,1,"Exigência Mínima"),f.splice(0,1,0)):31==g&&(e=c.slice(4,c.length),f=d.slice(4,c.length),e.splice(0,1,"Exigência Mínima"),f.splice(0,1,0));a.ddQuali.options.length;)a.ddQuali.options[0]=null;for(i=0;i<e.length;i++)option=new Option(e[i],f[i]),a.ddQuali.options[a.ddQuali.length]=option;calcSalario(a)}function calcfatorpg(a,b){var c=Array();return c=b?Array(0,.1,.15,.2,.25,.3,.52,.75):Array(0,0,0,.1,.15,.2,.35,.5),c[a]}function firstload(){updateQuali(myform,1),updateQuali(myform2,1)}function validateGD1(a,b){var c=a||window.event,d=c.keyCode||c.which;d=String.fromCharCode(d);var e=/[0-9]|\./;e.test(d)||(c.returnValue=!1,c.preventDefault&&c.preventDefault())}function validateGD2(a){var b=a.gastoTrans.value;b>20?(b=b.toString().substring(0,b.length-1),b>20&&(b=b.toString().substring(0,b.length-1))):b=parseInt(b,10),a.gastoTrans.value=b,calcSalario(a)}function formatValor(a){var b=/^\d+$/;return 0===a?"R$ 0,00":b.test(a)?"R$ "+a+",00":b.test(10*a)?"R$ "+a.toString().replace(".",",")+"0":"R$ "+a.toString().replace(".",",")}function valorIRRF(a,b){var c=0;return 1==b?c=a<1710.79?0:a<2563.92?.075*a-128.31:a<3418.6?.15*a-320.6:a<4271.59?.225*a-577:.275*a-790.58:b<=4?a<=1787.77?c=0:a<=2679.29?(c=.075*a-134,8):a<=3572.43?(c=.15*a-335,3):c=a<=4463.81?.225*a-602.96:.275*a-826.15:c=a<=1903.98?0:a<=2826.65?.075*a-142.8:a<=3751.05?.15*a-354.8:a<=4664.68?.225*a-636.13:.275*a-869.36,Math.floor(100*c)/100}function dependentesIR(a,b){var c=0;return c=1==b?171.97*a:b<=4?179.71*a:189.59*a,Math.floor(100*c)/100}function valorSaude(a,b,c){var d=Array();d[0]=Array(121.94,127.69,129.42,134.6,138.62,143.22,154.98,157.44,159.9,167.7),d[1]=Array(116.19,121.94,123.67,127.69,131.72,136.32,147.42,149.76,152.1,159.9),d[2]=Array(110.44,116.19,117.92,121.94,125.97,130.57,139.86,142.08,144.3,152.1),d[3]=Array(105.84,110.44,112.16,116.19,120.22,124.82,133.56,135.68,137.8,144.3),d[4]=Array(100.08,105.84,107.56,110.44,114.46,119.07,127.26,129.28,131.3,137.8),d[5]=Array(90.88,93.18,94.91,95.48,99.51,104.11,105.84,107.52,109.2,111.8),d[6]=Array(87.43,88.58,90.31,90.88,94.91,99.51,100.8,102.4,104,106.6),d[7]=Array(82.83,83.98,85.7,86.28,90.31,94.91,95.76,97.28,98.8,101.4);var e=0;e=a<1500?0:a<2e3?1:a<2500?2:a<3e3?3:a<4e3?4:a<5500?5:a<7500?6:7;var f=1;return c>=6&&(f=1.22618),1e3==b?0:Math.round(d[e][b]*f*100)/100}function valorCreche(a,b,c){var d=95;b>=6&&(d=321);var e=0;return e=a<6200.8?.05:a<12401.6?.1:a<18602.4?.15:a<24803.2?.2:.25,d*(1-e)*c}function valorTransporte(a,b){var c=0;return isNaN(b)||b<0?gastodiario=0:gastodiario=.2*Math.ceil((b-1)/.2)+1,c=22*gastodiario-.06*a*(22/30),c<0?0:c}function valorFG(a,b){var c=Array(0,777.26,522.9,423.94,215.78,175.09,128.4,81.89,60.57,49.15),d=Array(0,790.75,531.99,431.3,219.54,187.14,130.63,83.31,61.61,50),e=Array(0,804.49,541.23,438.79,223.35,181.23,132.89,84.75,62.69,50.86),f=Array(0,848.74,571,462.92,235.63,191.2,140.2,89.41,66.14,53.66),g=Array(0,891.17,599.55,486.07,247.42,200.76,147.21,93.88,69.44,56.34),h=Array(0,933.5,628.03,509.16,259.17,210.29,154.2,98.34,72.74,59.02),j=(Array(0,975.51,656.29,532.07,270.83,219.76,161.14,101.77,76.02,61.67),0);return 1==b?j=c[a]:b<=2?j=d[a]:b<=6?j=e[a]:7==b?j=f[a]:8==b?j=g[a]:b<=9&&(j=h[a]),j}function valorCD(a,b){var c=Array(0,9575.95,8004.9,9284.22,4563.53),d=Array(0,10315.37,8623.02,6769.47,4915.92),e=Array(0,11111.9,9288.86,7292.19,5295.51),f=Array(0,11723.05,9799.75,7693.26,5586.77),g=Array(0,12309.21,10289.74,8077.92,5866.1),h=Array(0,12893.89,10778.5,8461.62,6144.74),j=(Array(0,13474.12,11263.53,8842.29,6421.26),0);return j=1==b?c[a]:b<=3?d[a]:b<=6?e[a]:7==b?f[a]:8==b?g[a]:h[a]}function calcSalario(a){var b=parseInt(a.ddAno.value,10);1==b?(ftstep=1.036,base=1086.32):2==b?(ftstep=1.037,base=1086.32):3==b?(ftstep=1.037,base=1140.64):4==b?(ftstep=1.038,base=1140.64):5==b||6==b?(ftstep=1.038,base=1197.67):7==b?(ftstep=1.038,base=1263.54):8==b?(ftstep=1.039,base=1326.72):9==b?(ftstep=1.0405,base=1535.84):10==b?(ftstep=1.043,base=1960.17):11==b&&(ftstep=1.0455,base=2501.73),a.medico.checked&&(base=2*base);var c=parseFloat(a.ddClasse.value)+parseFloat(a.ddNivel.value)+parseFloat(a.ddProg.value)-3,d=a.ddCargaH.value;if(0==a.ddCD.value||a.rdCD[0].checked)var e=Math.floor(base*Math.pow(ftstep,c)*d*100)/100;else var e=valorCD(a.ddCD.value,b);var f=a.numAnuenio.value/100*e,g=0;g=b<6?a.alim.checked?373:0:a.alim.checked?458:0,.5==d&&(g/=2);var h=a.trans.checked?valorTransporte(e,a.gastoTrans.value):0,i=a.ddInsa.value,j=calcfatorpg(a.ddQuali.value,a.areaquali[0].checked),k=a.removeurp.checked?.2605*e*(1+j):0,l=j*e,m=e+k+l+Math.floor(i*e*100)/100+f,n=a.sintfub.checked?.01*m:0,o=valorFG(parseInt(a.ddFG.value,10),b),p=a.rdCD[0].checked?.6*valorCD(a.ddCD.value,b):0,q=m+o+p,r=a.saude.checked?valorSaude(q,parseInt(a.ddIdade.value,10),b)+valorSaude(q,parseInt(a.ddIdadeDep1.value,10),b)+valorSaude(q,parseInt(a.ddIdadeDep2.value,10),b)+valorSaude(q,parseInt(a.ddIdadeDep3.value,10),b):0,s=valorCreche(m,b,a.numCreche.value),t=m+r+g+h+s+o+p,u=e+k+l,v=4663.75;b>=6&&(v=5189.82),a.novopss.checked&&u>v&&(u=v);var w=Math.floor(.11*u*100)/100,x=0;if("sim"==a.funp_ad.value)if(u==v){var y=e+k+l-v;x=y*a.ddFunp.value,"myform"==a.name?(document.getElementById("funp_plano_norm1").checked=!0,document.getElementById("ddFunp1").disabled=!1,document.getElementById("numFunpAlt1").disabled=!0):(document.getElementById("funp_plano_norm2").checked=!0,document.getElementById("ddFunp2").disabled=!1,document.getElementById("numFunpAlt2").disabled=!0)}else x=a.numFunpAlt.value,"myform"==a.name?(document.getElementById("funp_plano_alt1").checked=!0,document.getElementById("ddFunp1").disabled=!0,document.getElementById("numFunpAlt1").disabled=!1):(document.getElementById("funp_plano_alt2").checked=!0,document.getElementById("ddFunp2").disabled=!0,document.getElementById("numFunpAlt2").disabled=!1);var z=dependentesIR(a.numDepIRRF.value,b),A=e+k+l+i*e+o+p-w-x-z,B=valorIRRF(A,b),C=Math.round(100*(t-B-w-x-n))/100;"myform"==a.name?liq1=C:liq2=C,document.getElementById("diffLiqAbs").value=formatValor(Math.abs(Math.round(100*(liq1-liq2))/100)),document.getElementById("diffLiqPor").value=Math.round(100*liq2/liq1)+"%",a.txVB.value=formatValor(e),a.txResult.value=formatValor(C),a.txInsa.value=formatValor(Math.floor(i*e*100)/100),a.txInss.value=formatValor(Math.round(100*w)/100),a.txBruto.value=formatValor(Math.round(100*t)/100),a.txIrrf.value=formatValor(Math.round(100*B)/100),a.txSaude.value=formatValor(r),a.txTrans.value=formatValor(Math.round(100*h)/100),a.txAlim.value=formatValor(g),a.txCreche.value=formatValor(Math.round(100*s)/100),a.txURP.value=formatValor(Math.round(100*k)/100),a.txbIRRF.value=formatValor(Math.round(100*A)/100),a.txbINSS.value=formatValor(Math.round(100*u)/100),a.txdesconto.value=formatValor(Math.round(100*(B+w))/100),a.txsintfub.value=formatValor(Math.round(100*n)/100),a.txQualif.value=formatValor(Math.round(100*l)/100),a.txFunp.value=formatValor(Math.round(100*x)/100),a.txDepIRRF.value=formatValor(z),a.txFG.value=formatValor(o),a.txCD.value=formatValor(a.rdCD[0].checked?Math.round(100*p)/100:valorCD(a.ddCD.value,b))}function inverterform(a){var b=document.forms.myform,c=document.forms.myform2;if("inverter"==a)var d=Array(b.ddClasse.value,b.ddProg.value,b.ddFG.value,b.ddNivel.value,b.ddCargaH.value,b.ddAno.value,b.ddQuali.value,b.saude.checked,b.ddIdade.value,b.removeurp.checked,b.trans.checked,b.gastoTrans.value,b.alim.checked,b.ddInsa.value,b.numCreche.value,b.sintfub.checked,b.areaquali[0].checked,b.areaquali[1].checked,b.novopss.checked,b.ddFunp.value,b.numAnuenio.value,b.funp_ad.value,b.numFunpAlt.value,b.numDepIRRF.value,b.ddIdadeDep1.value,b.ddIdadeDep2.value,b.ddIdadeDep3.value,b.ddCD.value,b.rdCD[0].checked,b.rdCD[1].checked),e=Array(c.ddClasse.value,c.ddProg.value,c.ddFG.value,c.ddNivel.value,c.ddCargaH.value,c.ddAno.value,c.ddQuali.value,c.saude.checked,c.ddIdade.value,c.removeurp.checked,c.trans.checked,c.gastoTrans.value,c.alim.checked,c.ddInsa.value,c.numCreche.value,c.sintfub.checked,c.areaquali[0].checked,c.areaquali[1].checked,c.novopss.checked,c.ddFunp.value,c.numAnuenio.value,c.funp_ad.value,c.numFunpAlt.value,c.numDepIRRF.value,c.ddIdadeDep1.value,c.ddIdadeDep2.value,c.ddIdadeDep3.value,c.ddCD.value,c.rdCD[0].checked,c.rdCD[1].checked);else if("cima"==a)var e=Array(c.ddClasse.value,c.ddProg.value,c.ddFG.value,c.ddNivel.value,c.ddCargaH.value,c.ddAno.value,c.ddQuali.value,c.saude.checked,c.ddIdade.value,c.removeurp.checked,c.trans.checked,c.gastoTrans.value,c.alim.checked,c.ddInsa.value,c.numCreche.value,c.sintfub.checked,c.areaquali[0].checked,c.areaquali[1].checked,c.novopss.checked,c.ddFunp.value,c.numAnuenio.value,c.funp_ad.value,c.numFunpAlt.value,c.numDepIRRF.value,c.ddIdadeDep1.value,c.ddIdadeDep2.value,c.ddIdadeDep3.value,c.ddCD.value,c.rdCD[0].checked,c.rdCD[1].checked),d=e;else var d=Array(b.ddClasse.value,b.ddProg.value,b.ddFG.value,b.ddNivel.value,b.ddCargaH.value,b.ddAno.value,b.ddQuali.value,b.saude.checked,b.ddIdade.value,b.removeurp.checked,b.trans.checked,b.gastoTrans.value,b.alim.checked,b.ddInsa.value,b.numCreche.value,b.sintfub.checked,b.areaquali[0].checked,b.areaquali[1].checked,b.novopss.checked,b.ddFunp.value,b.numAnuenio.value,b.funp_ad.value,b.numFunpAlt.value,b.numDepIRRF.value,b.ddIdadeDep1.value,b.ddIdadeDep2.value,b.ddIdadeDep3.value,b.ddCD.value,b.rdCD[0].checked,b.rdCD[1].checked),e=d;b.ddClasse.value=e[0],b.ddProg.value=e[1],b.ddFG.value=e[2],b.ddNivel.value=e[3],b.ddCargaH.value=e[4],b.ddAno.value=e[5],b.saude.checked=e[7],b.ddIdade.value=e[8],b.removeurp.checked=e[9],b.trans.checked=e[10],b.gastoTrans.value=e[11],b.alim.checked=e[12],b.ddInsa.value=e[13],b.numCreche.value=e[14],b.sintfub.checked=e[15],b.areaquali[0].checked=e[16],b.areaquali[1].checked=e[17],b.novopss.checked=e[18],b.ddFunp.value=e[19],b.numAnuenio.value=e[20],b.funp_ad.value=e[21],b.numFunpAlt.value=e[22],b.numDepIRRF.value=e[23],b.ddIdadeDep1.value=e[24],b.ddIdadeDep2.value=e[25],b.ddIdadeDep3.value=e[26],b.ddCD.value=e[27],b.rdCD[0].checked=e[28],b.rdCD[1].checked=e[29],c.ddClasse.value=d[0],c.ddProg.value=d[1],c.ddFG.value=d[2],c.ddNivel.value=d[3],c.ddCargaH.value=d[4],c.ddAno.value=d[5],c.saude.checked=d[7],c.ddIdade.value=d[8],c.removeurp.checked=d[9],c.trans.checked=d[10],c.gastoTrans.value=d[11],c.alim.checked=d[12],c.ddInsa.value=d[13],c.numCreche.value=d[14],c.sintfub.checked=d[15],c.areaquali[0].checked=d[16],c.areaquali[1].checked=d[17],c.novopss.checked=d[18],c.ddFunp.value=d[19],c.numAnuenio.value=d[20],c.funp_ad.value=d[21],c.numFunpAlt.value=d[22],c.numDepIRRF.value=d[23],c.ddIdadeDep1.value=d[24],c.ddIdadeDep2.value=d[25],c.ddIdadeDep3.value=d[26],c.ddCD.value=d[27],c.rdCD[0].checked=d[28],c.rdCD[1].checked=d[29],updateQuali(b,e[0]),updateQuali(c,d[0]),b.ddQuali.value=e[6],c.ddQuali.value=d[6],calcSalario(b),calcSalario(c)}var liq1=0,liq2=0;