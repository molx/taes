// PLV 12/2026 (MP 1.375/2026), aprovado pelo Congresso em 28/10/2026.
// Simulação condicionada à sanção e ao enquadramento da carreira/localidade.
// Lei 12.855/2013, arts. 2º e 4º: verba indenizatória, sem reflexos ou IR.
function valorFronteira(form, periodo) {
    if (!form.fronteira) return 0;

    var disponivel = periodo >= 202701;
    form.fronteira.disabled = !disponivel;
    form.diasFronteira.disabled = !disponivel || !form.fronteira.checked;

    var dias = Number(form.diasFronteira.value);
    var valor = disponivel && form.fronteira.checked && Number.isFinite(dias)
        ? 191 * Math.min(31, Math.max(0, Math.floor(dias)))
        : 0;
    form.txFronteira.value = formatValor(valor);
    return valor;
}
