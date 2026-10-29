// PLV 12/2026 (MP 1.375/2026), aprovado pelo Congresso em 28/10/2026.
// Simulação condicionada à sanção e ao enquadramento da carreira/localidade.
// Lei 12.855/2013, art. 2º, §§ 3º e 4º: diária de referência de 8 horas,
// proporcional às horas efetivamente prestadas, inclusive em escala ou plantão.
// Art. 4º: verba indenizatória, sem reflexos ou IR.
function valorFronteira(form, periodo) {
    if (!form.fronteira) return 0;

    var disponivel = periodo >= 202701;
    form.fronteira.disabled = !disponivel;
    form.diasFronteira.disabled = !disponivel || !form.fronteira.checked;

    // Os valores de ddCargaH são fatores salariais: no magistério, 40h vale
    // 0.7, mas corresponde a 8h/dia. Usar a descrição da jornada, não o fator.
    var cargaSemanal = form.ddCargaH
        ? parseFloat(form.ddCargaH.options[form.ddCargaH.selectedIndex].text)
        : NaN;
    var horasPadrao = Number.isFinite(cargaSemanal) ? cargaSemanal / 5 : 8;
    var horas = horasPadrao;
    if (form.horasFronteira) {
        form.horasFronteira.disabled = !disponivel || !form.fronteira.checked;
        form.horasFronteira.placeholder = String(horasPadrao);
        if (form.horasFronteira.value !== '') horas = Number(form.horasFronteira.value);
    }

    var dias = Number(form.diasFronteira.value);
    var valor = disponivel && form.fronteira.checked && Number.isFinite(dias) && Number.isFinite(horas)
        ? Math.round(191 * Math.min(31, Math.max(0, Math.floor(dias)))
            * Math.min(24, Math.max(0, horas)) / 8 * 100) / 100
        : 0;
    form.txFronteira.value = formatValor(valor);
    return valor;
}
