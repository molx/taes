var liq1=0,liq2=0;function updateQuali(a,e){var d=Array("Exigência Mínima","Fundamental Completo","Médio Completo","Médio Técnico","Graduação Completa","Especialização","Mestrado","Doutorado"),l=Array(0,1,2,3,4,5,6,7),u=Array(),r=Array(),t=a.ddQuali.value,e=parseFloat(e);for(e<=11?(u=d,r=l):17==e?(u=d.slice(2,d.length),r=l.slice(2,d.length),u.splice(0,1,"Exigência Mínima"),r.splice(0,1,0)):31==e&&(u=d.slice(4,d.length),r=l.slice(4,d.length),u.splice(0,1,"Exigência Mínima"),r.splice(0,1,0));a.ddQuali.options.length;)a.ddQuali.options[0]=null;for(i=0;i<u.length;i++)option=new Option(u[i],r[i]),a.ddQuali.options[a.ddQuali.length]=option;r.includes(parseInt(t))&&(a.ddQuali.value=t),calcSalario(a)}function calcfatorpg(a,e){Array();return(e?Array(0,.1,.15,.2,.25,.3,.52,.75):Array(0,0,0,.1,.15,.2,.35,.5))[a]}function firstload(){updateQuali(myform,1),updateQuali(myform2,1)}function validateGD1(a,e){var d=a||window.event,a=d.keyCode||d.which,a=String.fromCharCode(a);/[0-9]|\./.test(a)||(d.returnValue=!1,d.preventDefault&&d.preventDefault())}function validateGD2(a){var e=99<(e=a.gastoTrans.value)?e.toString().substring(0,e.length-1):parseInt(e,10);a.gastoTrans.value=e,calcSalario(a)}function formatValor(a){var e=/^\d+$/;return 0===(a=Math.round(100*a)/100)?"R$ 0,00":e.test(a)?"R$ "+a+",00":e.test(10*a)?"R$ "+a.toString().replace(".",",")+"0":"R$ "+a.toString().replace(".",",")}function valorIRRF(a,e){var d=0,d=1==e?a<1710.79?0:a<2563.92?.075*a-128.31:a<3418.6?.15*a-320.6:a<4271.59?.225*a-577:.275*a-790.58:e<=4?a<=1787.77?0:a<=2679.29?.075*a-134.08:a<=3572.43?.15*a-335.03:a<=4463.81?.225*a-602.96:.275*a-826.15:e<16?a<=1903.98?0:a<=2826.65?.075*a-142.8:a<=3751.05?.15*a-354.8:a<=4664.68?.225*a-636.13:.275*a-869.36:a<=2112?0:a<=2826.65?.075*a-158.4:a<=3751.05?.15*a-370.4:a<=4664.68?.225*a-651.73:.275*a-884.96;return Math.floor(100*d)/100}function calcPSS(a,e,d){var l=0,l=a<12?.11*e:12==a?e<=1045?.075*e:e<=2089.6?.09*e-15.68:e<=3134.4?.12*e-78.36:e<=6101.06?.14*e-141.05:e<=10448?.145*e-171.56:e<=20896.2?.165*e-380.52:e<=40474.2?.19*e-902.92:.22*e-2117.14:13==a?e<=1100?.075*e:e<=2203.48?.09*e-16.5:e<=3305.22?.12*e-82.6:e<=6433.57?.14*e-148.7:e<=11017.42?.145*e-180.87:e<=22034.83?.165*e-401.22:e<=42967.92?.19*e-952.09:.22*e-2241.13:14==a?e<=1212?.075*e:e<=2427.35?.09*e-18.18:e<=3641.04?.12*e-91:e<=7087.23?.14*e-163.82:e<=12136.8?.145*e-199.26:e<=24273.58?.165*e-441.99:e<=47333.46?.19*e-1048.83:.22*e-2468:a<16?e<=1302?.075*e:e<=2571.29?.09*e-19.53:e<=3856.94?.12*e-96.67:e<=7507.49?.14*e-173.81:e<=12856.5?.145*e-211.35:e<=25712.99?.165*e-468.48:e<=50140.33?.19*e-1111.3:.22*e-2615.51:e<=1320?.075*e:e<=2571.29?.09*e-19.8:e<=3856.94?.12*e-96.94:e<=7507.49?.14*e-174.08:e<=12856.5?.145*e-211.62:e<=25712.99?.165*e-468.75:e<=50140.33?.19*e-1111.57:.22*e-2615.78;return Math.floor(100*l)/100}function dependentesIR(a,e){var d=0,d=1==e?171.97*a:e<=4?179.71*a:189.59*a;return Math.floor(100*d)/100}function valorSaude(a,e,d){var l=Array();l[0]=Array(121.94,127.69,129.42,134.6,138.62,143.22,154.98,157.44,159.9,167.7),l[1]=Array(116.19,121.94,123.67,127.69,131.72,136.32,147.42,149.76,152.1,159.9),l[2]=Array(110.44,116.19,117.92,121.94,125.97,130.57,139.86,142.08,144.3,152.1),l[3]=Array(105.84,110.44,112.16,116.19,120.22,124.82,133.56,135.68,137.8,144.3),l[4]=Array(100.08,105.84,107.56,110.44,114.46,119.07,127.26,129.28,131.3,137.8),l[5]=Array(90.88,93.18,94.91,95.48,99.51,104.11,105.84,107.52,109.2,111.8),l[6]=Array(87.43,88.58,90.31,90.88,94.91,99.51,100.8,102.4,104,106.6),l[7]=Array(82.83,83.98,85.7,86.28,90.31,94.91,95.76,97.28,98.8,101.4);var u=0,u=a<1500?0:a<2e3?1:a<2500?2:a<3e3?3:a<4e3?4:a<5500?5:a<7500?6:7,d=6<=d?1.22618:1;return 1e3==e?0:Math.round(l[u][e]*d*100)/100}function valorCreche(a,e,d){var l=95;6<=e&&(l=321);return l*(1-(a<6200.8?.05:a<12401.6?.1:a<18602.4?.15:a<24803.2?.2:.25))*d}function valorTransporte(a,e){var d;return gastodiario=isNaN(e)||e<0?0:.2*Math.ceil((e-1)/.2)+1,(d=22*gastodiario-.06*a*(22/30))<0?0:d}function valorFG(a,e){var d=Array(0,777.26,522.9,423.94,215.78,175.09,128.4,81.89,60.57,49.15),l=Array(0,790.75,531.99,431.3,219.54,187.14,130.63,83.31,61.61,50),u=Array(0,804.49,541.23,438.79,223.35,181.23,132.89,84.75,62.69,50.86),r=Array(0,848.74,571,462.92,235.63,191.2,140.2,89.41,66.14,53.66),t=Array(0,891.17,599.55,486.07,247.42,200.76,147.21,93.88,69.44,56.34),n=Array(0,933.5,628.03,509.16,259.17,210.29,154.2,98.34,72.74,59.02),o=Array(0,975.51,656.29,532.07,270.83,219.76,161.14,101.77,76.02,61.67),v=Array(0,1063.31,715.35,579.96,270.83,219.76,161.14,102.77,76.02,61.67);return(1==e?d:e<=2?l:e<=6?u:7==e?r:8==e?t:9==e?n:e<16?o:v)[a]}function valorCD(a,e){var d=Array(0,9575.95,8004.9,9284.22,4563.53),l=Array(0,10315.37,8623.02,6769.47,4915.92),u=Array(0,11111.9,9288.86,7292.19,5295.51),r=Array(0,11723.05,9799.75,7693.26,5586.77),t=Array(0,12309.21,10289.74,8077.92,5866.1),n=Array(0,12893.89,10778.5,8461.62,6144.74),o=Array(0,13474.12,11263.53,8842.29,6421.26),v=Array(0,14686.79,12277.25,9638.21,6999.17);return(1==e?d:e<=3?l:e<=6?u:7==e?r:8==e?t:9==e?n:e<16?o:v)[a]}function valorAlim(a){return a<6?373:a<16?458:658}function nocd(a){0!=a.ddFG.value&&(a.ddCD.value=0)}function nofg(a){0!=a.ddCD.value&&(a.ddFG.value=0)}function calcSalario(a){var e=parseInt(a.ddAno.value,10);base=1==e?(ftstep=1.036,1086.32):2==e?(ftstep=1.037,1086.32):3==e?(ftstep=1.037,1140.64):4==e?(ftstep=1.038,1140.64):5==e||6==e?(ftstep=1.038,1197.67):7==e?(ftstep=1.038,1263.54):7<e&&e<16?(ftstep=1.039,1326.72):(ftstep=1.039,1446.12),"1"==a.ddCargo.value&&(base*=2);var d=parseFloat(a.ddClasse.value)+parseFloat(a.ddNivel.value)+parseFloat(a.ddProg.value)-3,l=a.ddCargaH.value,u=Math.ceil(base*Math.pow(ftstep,d)*l*100)/100,r=a.numAnuenio.value/100*u,t=a.alim.checked?valorAlim(e):0;.5==l&&(t/=2);var n=a.trans.checked?valorTransporte(u,a.gastoTrans.value):0,o=a.ddInsa.value,v=calcfatorpg(a.ddQuali.value,a.areaquali[0].checked),c=0;$('form[name="'+a.name+'"] span[name="numURPview"]').css("visibility","hidden"),1==a.ddURP.value?($('form[name="'+a.name+'"] span[name="numURPview"]').css("visibility","visible"),a.numURP.disabled&&(a.numURP.disabled=!1),c=parseFloat(a.numURP.value)):2==a.ddURP.value?(a.numURP.disabled=!0,c=.2605*u*(1+v)):a.numURP.disabled=!0;var i=v*u,s=0;"2"==a.ddCargo.value&&(x=4750,(s=(x="11"==a.ddClasse.value?.5*x*(40*a.ddCargaH.value/44):"17"==a.ddClasse.value?.7*x*(40*a.ddCargaH.value/44):"11"==a.ddClasse.value?+x*(40*a.ddCargaH.value/44):0)-u)<0&&(s=0));var p=u+c+i+Math.floor(o*u*100)/100+r+s,m=0;a.sindicato.checked&&(m="vb"==a.ddSindTipo.value?.01*u:"rem"==a.ddSindTipo.value?.01*p:Math.round(.01*base*Math.pow(ftstep,parseInt(a.ddClasse.value)-1)*l*100)/100);var h,f,D,I=p/(240*l)*(a.noturno.value*(60/52.5))*.25,C=valorFG(parseInt(a.ddFG.value,10),e),k=p+C+(h=a.rdCD[0].checked&&"0"!=a.ddCD.value?.6*valorCD(a.ddCD.value,e):a.rdCD[1].checked&&"0"!=a.ddCD.value?valorCD(a.ddCD.value,e)-u:0),F=a.saude.checked?valorSaude(k,parseInt(a.ddIdade.value,10),e)+valorSaude(k,parseInt(a.ddIdadeDep1.value,10),e)+valorSaude(k,parseInt(a.ddIdadeDep2.value,10),e)+valorSaude(k,parseInt(a.ddIdadeDep3.value,10),e)*a.Dep3Qtd.value:0,g=valorCreche(u+c+Math.floor(o*u*100)/100+r,e,a.numCreche.value);D=a.ferias.checked?valorIRRF(f=(p+C+h)/3,e):f=0;var A=a.decter.checked?(p+C+h)/2:0,y=Math.round(100*(p+F+t+n+g+C+h+I+f+A))/100,V=p,b=4663.75,b=6==e||7==e?5189.82:8==e?5531.31:9==e?5645.81:10==e?5839.45:11==e||12==e?6101.06:13==e?6433.57:14==e?7087.23:7507.49;a.pssfgcd.checked&&(V+=C+h),"rpc"==a.novopss.value&&b<V&&(V=b);var R=calcPSS(e,V,b),M=0;"sim"==a.funp_ad.value&&(V==b?(Q=u+c+i-b,a.pssfgcd.checked&&(Q+=C+h),M=Math.round(Q*parseFloat(a.ddFunp.value)*100)/100,"myform"==a.name?(document.getElementById("funp_plano_norm1").checked=!0,document.getElementById("ddFunp1").disabled=!1,document.getElementById("numFunpAlt1").disabled=!0):(document.getElementById("funp_plano_norm2").checked=!0,document.getElementById("ddFunp2").disabled=!1,document.getElementById("numFunpAlt2").disabled=!0)):(M=parseInt(a.numFunpAlt.value),"myform"==a.name?(document.getElementById("funp_plano_alt1").checked=!0,document.getElementById("ddFunp1").disabled=!0,document.getElementById("numFunpAlt1").disabled=!1):(document.getElementById("funp_plano_alt2").checked=!0,document.getElementById("ddFunp2").disabled=!0,document.getElementById("numFunpAlt2").disabled=!1)));var S=parseInt(a.numFunpFacul.value);isNaN(S)&&(S=0);var P=dependentesIR(a.numDepIRRF.value,e),d=u+c+i+o*u+C+h,x=R+M+S+P,l=d-x;16<=e&&x<528&&(l=d-(x=528));var k=valorIRRF(l,e),p=a.decter.checked&&"2"==a.decter_par.value?k+R+M+S:0,b=parseFloat(a.numOutros.value),Q=Math.round(100*(k+R+M+S+p+m+D+b))/100,d=y-Q;"myform"==a.name?liq1=d:liq2=d,document.getElementById("diffLiqAbs").value=formatValor(Math.abs(Math.round(100*(liq1-liq2))/100)),document.getElementById("diffLiqPor").value=Math.round(100*liq2/liq1)+"%",a.txVB.value=formatValor(u),a.txResult.value=formatValor(d),a.txInsa.value=formatValor(Math.floor(o*u*100)/100),a.txInss.value=formatValor(Math.round(100*R)/100),a.txBruto.value=formatValor(Math.round(100*y)/100),a.txIrrf.value=formatValor(Math.round(100*k)/100),a.txSaude.value=formatValor(F),a.txTrans.value=formatValor(Math.round(100*n)/100),a.txAlim.value=formatValor(t),a.txCreche.value=formatValor(Math.round(100*g)/100),a.txURP.value=formatValor(Math.round(100*c)/100),a.txbIRRF.value=formatValor(Math.round(100*l)/100),a.txbINSS.value=formatValor(Math.round(100*V)/100),a.txdesconto.value=formatValor(Q),a.txSindicato.value=formatValor(Math.round(100*m)/100),a.txQualif.value=formatValor(Math.round(100*i)/100),a.txFunp.value=formatValor(Math.round(100*M)/100),a.txDepIRRF.value=formatValor(P),a.txFG.value=formatValor(C),a.txCD.value=a.rdCD[0].checked?formatValor(Math.round(100*h)/100):formatValor(valorCD(a.ddCD.value,e)),a.txNoturno.value=formatValor(Math.round(100*I)/100),a.txFerias.value=formatValor(Math.round(100*f)/100),a.txIrrfFerias.value=formatValor(Math.round(100*D)/100),a.txDecter.value=formatValor(Math.round(100*A)/100),a.txDesc13.value=formatValor(Math.round(100*p)/100);p=1;"myform"==a.name?($("#tabdetails-rend-1").empty(),$("#tabdetails-desc-1").empty(),$("#tabdetails-outros-1").empty()):($("#tabdetails-rend-2").empty(),$("#tabdetails-desc-2").empty(),$("#tabdetails-outros-2").empty(),p=2),addDetailValue("#tabdetails-rend",p,"VB",u),addDetailValue("#tabdetails-rend",p,"VA",t),0<n&&addDetailValue("#tabdetails-rend",p,"VT",n),0<g&&addDetailValue("#tabdetails-rend",p,"Pré-escolar",g),0<I&&addDetailValue("#tabdetails-rend",p,"Ad. Noturno",I),0<c&&addDetailValue("#tabdetails-rend",p,"URP",c),0<v&&addDetailValue("#tabdetails-rend",p,"IQ",u*v),0<C&&addDetailValue("#tabdetails-rend",p,"FG",C),0<h&&addDetailValue("#tabdetails-rend",p,"CD",h),0<r&&addDetailValue("#tabdetails-rend",p,"Anuênio",r),0<o&&addDetailValue("#tabdetails-rend",p,"Insalubridade",o*u),0<F&&addDetailValue("#tabdetails-rend",p,"Saúde Sup.",F),0<s&&addDetailValue("#tabdetails-rend",p,"Dif. Piso Enf.",s),addDetailValue("#tabdetails-desc",p,"PSS",R),addDetailValue("#tabdetails-desc",p,"IR",k),0<M&&addDetailValue("#tabdetails-desc",p,"Funpresp",M),0<S&&addDetailValue("#tabdetails-desc",p,"Funpresp-facultativo",S),0<m&&addDetailValue("#tabdetails-desc",p,"Sindicato",m),0<b&&addDetailValue("#tabdetails-desc",p,"Outros",b),addDetailValue("#tabdetails-outros",p,"Bruto",y),addDetailValue("#tabdetails-outros",p,"Descontos",Q),addDetailValue("#tabdetails-outros",p,"Líquido",d),addDetailValue("#tabdetails-outros",p,"Base PSS",V),addDetailValue("#tabdetails-outros",p,"Base IR",l),addDetailValue("#tabdetails-outros",p,"Deduções IR",x),saveStorage()}function addDetailValue(a,e,d,l){l="<div>"+d+": "+formatValor(l)+"</div>";$(a+"-"+e).append(l)}function inverterform(a){var e,d,l=document.forms.myform,u=document.forms.myform2;"inverter"==a?(e=Array(l.ddClasse.value,l.ddProg.value,l.ddFG.value,l.ddNivel.value,l.ddCargaH.value,l.ddAno.value,l.ddQuali.value,l.saude.checked,l.ddIdade.value,l.ddURP.value,l.trans.checked,l.gastoTrans.value,l.alim.checked,l.ddInsa.value,l.numCreche.value,l.sindicato.checked,l.areaquali[0].checked,l.areaquali[1].checked,l.novopss.value,l.ddFunp.value,l.numAnuenio.value,l.funp_ad.value,l.numFunpAlt.value,l.numDepIRRF.value,l.ddIdadeDep1.value,l.ddIdadeDep2.value,l.ddIdadeDep3.value,l.ddCD.value,l.rdCD[0].checked,l.rdCD[1].checked,l.ferias.checked,l.decter.checked,l.decter_par.value,l.ddSindTipo.value,0,l.numOutros.value,l.numURP.value,l.numFunpFacul.value,l.Dep3Qtd.value,l.ddCargo.value),d=Array(u.ddClasse.value,u.ddProg.value,u.ddFG.value,u.ddNivel.value,u.ddCargaH.value,u.ddAno.value,u.ddQuali.value,u.saude.checked,u.ddIdade.value,u.ddURP.value,u.trans.checked,u.gastoTrans.value,u.alim.checked,u.ddInsa.value,u.numCreche.value,u.sindicato.checked,u.areaquali[0].checked,u.areaquali[1].checked,u.novopss.value,u.ddFunp.value,u.numAnuenio.value,u.funp_ad.value,u.numFunpAlt.value,u.numDepIRRF.value,u.ddIdadeDep1.value,u.ddIdadeDep2.value,u.ddIdadeDep3.value,u.ddCD.value,u.rdCD[0].checked,u.rdCD[1].checked,u.ferias.checked,u.decter.checked,u.decter_par.value,u.ddSindTipo.value,0,u.numOutros.value,u.numURP.value,u.numFunpFacul.value,u.Dep3Qtd.value,u.ddCargo.value)):"cima"==a?e=d=Array(u.ddClasse.value,u.ddProg.value,u.ddFG.value,u.ddNivel.value,u.ddCargaH.value,u.ddAno.value,u.ddQuali.value,u.saude.checked,u.ddIdade.value,u.ddURP.value,u.trans.checked,u.gastoTrans.value,u.alim.checked,u.ddInsa.value,u.numCreche.value,u.sindicato.checked,u.areaquali[0].checked,u.areaquali[1].checked,u.novopss.value,u.ddFunp.value,u.numAnuenio.value,u.funp_ad.value,u.numFunpAlt.value,u.numDepIRRF.value,u.ddIdadeDep1.value,u.ddIdadeDep2.value,u.ddIdadeDep3.value,u.ddCD.value,u.rdCD[0].checked,u.rdCD[1].checked,u.ferias.checked,u.decter.checked,u.decter_par.value,u.ddSindTipo.value,0,u.numOutros.value,u.numURP.value,u.numFunpFacul.value,u.Dep3Qtd.value,u.ddCargo.value):d=e=Array(l.ddClasse.value,l.ddProg.value,l.ddFG.value,l.ddNivel.value,l.ddCargaH.value,l.ddAno.value,l.ddQuali.value,l.saude.checked,l.ddIdade.value,l.ddURP.value,l.trans.checked,l.gastoTrans.value,l.alim.checked,l.ddInsa.value,l.numCreche.value,l.sindicato.checked,l.areaquali[0].checked,l.areaquali[1].checked,l.novopss.value,l.ddFunp.value,l.numAnuenio.value,l.funp_ad.value,l.numFunpAlt.value,l.numDepIRRF.value,l.ddIdadeDep1.value,l.ddIdadeDep2.value,l.ddIdadeDep3.value,l.ddCD.value,l.rdCD[0].checked,l.rdCD[1].checked,l.ferias.checked,l.decter.checked,l.decter_par.value,l.ddSindTipo.value,0,l.numOutros.value,l.numURP.value,l.numFunpFacul.value,l.Dep3Qtd.value,l.ddCargo.value),l.ddClasse.value=d[0],l.ddProg.value=d[1],l.ddFG.value=d[2],l.ddNivel.value=d[3],l.ddCargaH.value=d[4],l.ddAno.value=d[5],l.saude.checked=d[7],l.ddIdade.value=d[8],l.ddURP.value=d[9],l.trans.checked=d[10],l.gastoTrans.value=d[11],l.alim.checked=d[12],l.ddInsa.value=d[13],l.numCreche.value=d[14],l.sindicato.checked=d[15],l.areaquali[0].checked=d[16],l.areaquali[1].checked=d[17],l.novopss.value=d[18],l.ddFunp.value=d[19],l.numAnuenio.value=d[20],l.funp_ad.value=d[21],l.numFunpAlt.value=d[22],l.numDepIRRF.value=d[23],l.ddIdadeDep1.value=d[24],l.ddIdadeDep2.value=d[25],l.ddIdadeDep3.value=d[26],l.ddCD.value=d[27],l.rdCD[0].checked=d[28],l.rdCD[1].checked=d[29],l.ferias.checked=d[30],l.decter.checked=d[31],l.decter_par.value=d[32],l.ddSindTipo.value=d[33],l.numOutros.value=d[35],l.numURP.value=d[36],l.numFunpFacul.value=d[37],l.Dep3Qtd.value=d[38],l.ddCargo.value=d[39],u.ddClasse.value=e[0],u.ddProg.value=e[1],u.ddFG.value=e[2],u.ddNivel.value=e[3],u.ddCargaH.value=e[4],u.ddAno.value=e[5],u.saude.checked=e[7],u.ddIdade.value=e[8],u.ddURP.value=e[9],u.trans.checked=e[10],u.gastoTrans.value=e[11],u.alim.checked=e[12],u.ddInsa.value=e[13],u.numCreche.value=e[14],u.sindicato.checked=e[15],u.areaquali[0].checked=e[16],u.areaquali[1].checked=e[17],u.novopss.value=e[18],u.ddFunp.value=e[19],u.numAnuenio.value=e[20],u.funp_ad.value=e[21],u.numFunpAlt.value=e[22],u.numDepIRRF.value=e[23],u.ddIdadeDep1.value=e[24],u.ddIdadeDep2.value=e[25],u.ddIdadeDep3.value=e[26],u.ddCD.value=e[27],u.rdCD[0].checked=e[28],u.rdCD[1].checked=e[29],u.ferias.checked=e[30],u.decter.checked=e[31],u.decter_par.value=e[32],u.ddSindTipo.value=e[33],u.numOutros.value=e[35],u.numURP.value=e[36],u.numFunpFacul.value=e[37],u.Dep3Qtd.value=e[38],u.ddCargo.value=e[39],updateQuali(l,d[0]),updateQuali(u,e[0]),l.ddQuali.value=d[6],u.ddQuali.value=e[6],calcSalario(l),calcSalario(u)}