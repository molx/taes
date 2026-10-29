const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');

const context = vm.createContext({ formatValor: value => value.toFixed(2) });
vm.runInContext(readFileSync(`${__dirname}/../js/fronteira.js`, 'utf8'), context);

function form(dias = '22', checked = true) {
    return {
        fronteira: { checked },
        diasFronteira: { value: dias },
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
