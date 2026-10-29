const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

const context = vm.createContext({ formatValor: value => value.toFixed(2) });
vm.runInContext(readFileSync(`${__dirname}/../js/fronteira.js`, 'utf8'), context);

function form(dias = '22', checked = true, jornada = '40 horas', horas = '') {
    return {
        fronteira: { checked },
        diasFronteira: { value: dias },
        ddCargaH: { options: [{ text: jornada }], selectedIndex: 0 },
        horasFronteira: { value: horas },
        txFronteira: { value: '' }
    };
}

test('22 dias acrescentam R$ 4.202,00 e atualizam o valor exibido', () => {
    const fields = form();
    assert.equal(context.valorFronteira(fields, 202701), 4202);
    assert.equal(fields.txFronteira.value, '4202.00');
    assert.equal(fields.diasFronteira.disabled, false);
});

test('não há pagamento antes de janeiro de 2027, mesmo com seleção salva', () => {
    const fields = form();
    for (const periodo of [202501, 202601, 202604, 202612]) {
        assert.equal(context.valorFronteira(fields, periodo), 0);
        assert.equal(fields.fronteira.disabled, true);
        assert.equal(fields.diasFronteira.disabled, true);
    }
    assert.equal(context.valorFronteira(fields, 202701), 4202);
    assert.equal(fields.fronteira.disabled, false);
});

test('o adicional exige seleção explícita', () => {
    const fields = form('22', false);
    assert.equal(context.valorFronteira(fields, 202701), 0);
    assert.equal(fields.diasFronteira.disabled, true);
});

test('zero dias, campo vazio e valores inválidos não geram rendimentos', () => {
    for (const dias of ['0', '', '-1', 'abc', 'Infinity']) {
        assert.equal(context.valorFronteira(form(dias), 202701), 0);
    }
});

test('a quantidade de dias fica limitada aos dias inteiros do mês', () => {
    assert.equal(context.valorFronteira(form('20'), 202701), 3820);
    assert.equal(context.valorFronteira(form('31'), 202701), 5921);
    assert.equal(context.valorFronteira(form('100'), 202701), 5921);
    assert.equal(context.valorFronteira(form('20.9'), 202701), 3820);
});

test('as duas simulações mantêm quantidades independentes', () => {
    const atual = form('20');
    const comparacao = form('22');
    assert.equal(context.valorFronteira(atual, 202701), 3820);
    assert.equal(context.valorFronteira(comparacao, 202701), 4202);
});

test('formulários sem a opção continuam compatíveis', () => {
    assert.equal(context.valorFronteira({}, 202701), 0);
});

test('20h e 30h semanais são proporcionais a 4h e 6h diárias', () => {
    assert.equal(context.valorFronteira(form('22', true, '20 horas'), 202701), 2101);
    assert.equal(context.valorFronteira(form('22', true, '30 horas'), 202701), 3151.5);
});

test('40h do magistério e dedicação exclusiva usam 8h diárias', () => {
    const fields = form();
    fields.ddCargaH.value = '0.7';
    assert.equal(context.valorFronteira(fields, 202701), 4202);
    assert.equal(context.valorFronteira(form('22', true, 'DE'), 202701), 4202);
});

test('horas efetivas informadas prevalecem sobre a carga semanal', () => {
    assert.equal(context.valorFronteira(form('10', true, '40 horas', '12'), 202701), 2865);
    assert.equal(context.valorFronteira(form('22', true, '40 horas', '6'), 202701), 3151.5);
    assert.equal(context.valorFronteira(form('1', true, '40 horas', '6.5'), 202701), 155.19);
});

test('horas inválidas, negativas ou zeradas não geram rendimentos', () => {
    for (const horas of ['abc', 'Infinity', '-1', '0']) {
        assert.equal(context.valorFronteira(form('22', true, '40 horas', horas), 202701), 0);
    }
});

test('mudar a carga semanal atualiza a jornada padrão, sem sobrescrever horas informadas', () => {
    const fields = form();
    context.valorFronteira(fields, 202701);
    assert.equal(fields.horasFronteira.placeholder, '8');
    fields.ddCargaH.options[0].text = '30 horas';
    assert.equal(context.valorFronteira(fields, 202701), 3151.5);
    assert.equal(fields.horasFronteira.placeholder, '6');
    fields.horasFronteira.value = '4';
    assert.equal(context.valorFronteira(fields, 202701), 2101);
});
