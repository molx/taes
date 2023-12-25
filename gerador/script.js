// Função para preencher os dados da matriz
// Função para preencher os dados da matriz
const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
function preencherMatriz(maxNiveis, valorReferencia, step, niveisClassificacao) {
  const matriz = [];
  const offsets = [];
  const niveisClassificao = niveisClassificacao;
  let valorInicial = parseFloat(valorReferencia);
  let maxCapacitacoes = parseInt(document.getElementById('numNiveisCapacitacao').value) || 4;

  for (let i = 1; i < niveisClassificao; i++) {
    const offsetInput = document.getElementById(`offsetNiveis${letras[i]}`).value;
    offsets.push(offsetInput)
  }

  let maxLinhas = maxNiveis + Math.max(...offsets) + maxCapacitacoes - 2;

  for (let nivel = 1; nivel <= maxLinhas; nivel++) {
    // Para cada linha de valores da matriz
    let valor = valorInicial;
    let capacitacoes = [];

    for (let i = 1; i <= niveisClassificao; i++) {
      //Para cada nível de classificacao
      let offset = 0;
      if (i > 1) offset = parseInt(offsets[i - 2]) - 1;
      //console.log(maxLinhas + ' - ' + i + ' - ' + offset) ;

      for (let j = 1; j <= maxCapacitacoes; j++) {
        //Para cada nivel de capacitacao        
        const valorDeslocado = nivel >= j + offset ? nivel - j - offset + 1 : '';
        capacitacoes.push(valorDeslocado > maxNiveis ? '' : valorDeslocado);
      }
    }

    matriz.push({ nivel, valor: valor.toFixed(2), capacitacoes });
    valorInicial *= (1 + step / 100);
  }

  return matriz;
}

// Função para converter números arábicos para romanos
function converterParaRomano(numero) {
  const romanos = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romanos[numero];
}

// Função para gerar a tabela no HTML
function gerarTabela(matriz, numNiveisClassificacao, numNiveisCapacitacao) {
  const tabelaCorpo = document.getElementById('tabelaCorpo');
  tabelaCorpo.innerHTML = '';

  //Adicionar a primeira linha de cabeçalhos com P, Valor e NCs
  const cabecalhosDinamicosClass = Array.from({ length: numNiveisClassificacao }, (_, index) => {
    const nivelClass = letras[index];
    return `${nivelClass}`;
  });

  const cabecalhoRowClass = document.createElement('tr');
  cabecalhoRowClass.innerHTML = `
    <th rowspan="2" style="width:60px;">P</th>
	  <th rowspan="2" style="width:100px;">Valor (R$)</th>
    ${cabecalhosDinamicosClass.map(cabecalho => `<th colspan="${numNiveisCapacitacao}">${cabecalho}</th>`).join('')}
  `;
  tabelaCorpo.appendChild(cabecalhoRowClass);

  // Adicionar os cabeçalhos dinâmicos de I até o número correspondente ao input
  const cabecalhosDinamicos = Array.from({ length: numNiveisCapacitacao * numNiveisClassificacao }, (_, index) => {
    const nivelRomano = converterParaRomano((index % numNiveisCapacitacao + 1));
    return `${nivelRomano}`;
  });

  const cabecalhoRowCap = document.createElement('tr');
  cabecalhoRowCap.innerHTML = `
    ${cabecalhosDinamicos.map(cabecalho => `<th style="width:50px;">${cabecalho}</th>`).join('')}
  `;
  tabelaCorpo.appendChild(cabecalhoRowCap);

  // Adicionar os dados da matriz
  matriz.forEach((dados) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${dados.nivel}</td>
      <td>${dados.valor}</td>
      ${dados.capacitacoes.map(valor => `<td>${valor}</td>`).join('')}
    `;
    tabelaCorpo.appendChild(row);
  });
}

// Função para atualizar a tabela com base nos inputs
function atualizarTabela() {
  const maxNiveis = parseInt(document.getElementById('maxNiveis').value) || 16;
  const valorReferencia = document.getElementById('valorReferencia').value || 1446.12;
  const step = parseFloat(document.getElementById('step').value) || 3.9;
  const numNiveisClassificacao = parseInt(document.getElementById('numNiveisClassificacao').value) || 5;
  const numNiveisCapacitacao = parseInt(document.getElementById('numNiveisCapacitacao').value) || 4;

  const matriz = preencherMatriz(maxNiveis, valorReferencia, step, numNiveisClassificacao);
  gerarTabela(matriz, numNiveisClassificacao, numNiveisCapacitacao);
  atualizarInfo(maxNiveis, valorReferencia, step, numNiveisClassificacao, numNiveisCapacitacao);
}

function atualizarInfo(maxNiveis, valorReferencia, step, numNiveisClassificacao, numNiveisCapacitacao) {
  const tabelaPisoTeto = document.getElementById('tabelaPisoTeto');
  tabelaPisoTeto.innerHTML = '';

  const headerPisoTeto = document.createElement('tr');
  headerPisoTeto.innerHTML = '<th>Nível</th><th>Piso</th><th>Teto</th>';
  tabelaPisoTeto.appendChild(headerPisoTeto);

  const tabelaCorr = document.getElementById('tabelaCorr');
  tabelaCorr.innerHTML = '';

  //Tabela corr
  const headerCorr = document.createElement('tr');
  const letrasUse = letras.slice(1, numNiveisClassificacao);
  headerCorr.innerHTML = `
    <th>Correlação</th>
    ${letrasUse.map(cabecalho => `<th>${cabecalho}</th>`).join('')}
  `;
  tabelaCorr.appendChild(headerCorr);
  const pisos = [];

  for (let i = 0; i < numNiveisClassificacao; i++) {
    const offset = i == 0 ? 1 : parseInt(document.getElementById(`offsetNiveis${letras[i]}`).value);
    const row = document.createElement('tr');
    const piso = (valorReferencia * Math.pow((1 + step / 100), offset - 1)).toFixed(2);
    const teto = (valorReferencia * Math.pow(1 + (step / 100), offset + maxNiveis + numNiveisCapacitacao - 3)).toFixed(2);
    pisos.push(piso);
    row.innerHTML = `<td>${letras[i]}</td>
      <td>${piso}</td>
      <td>${teto}</td>
    `;
    tabelaPisoTeto.appendChild(row);
  }

  for (let i = 0; i < numNiveisClassificacao - 1; i++) {
    //Correl
    const rowCorr = document.createElement('tr');
    rowCorr.innerHTML = `<th>${letras[i]}</th>`;
    for (let j = 1; j < numNiveisClassificacao; j++) {
      var correl = (100 * (pisos[i] / pisos[j])).toFixed(2);
      correl = correl >= 100 ? '-' : correl;
      rowCorr.innerHTML += `<td>${correl}</td>`
    }
    tabelaCorr.appendChild(rowCorr);
  }
}

function atualizarNCs() {
  const numNiveisClassificacao = parseInt(document.getElementById('numNiveisClassificacao').value);
  for (let i = 1; i < 10; i++) {
    const el = document.getElementById(`offsetNiveis${letras[i]}`);
    const lab = document.getElementById(`offsetNiveis${letras[i]}lab`);
    if (i < numNiveisClassificacao) {
      el.style.display = "inline-block";
      lab.style.display = "inline-block"
    } else {
      el.style.display = "none";
      lab.style.display = "none"
    }
  }
  atualizarTabela();
}

// Adicionar event listeners para os inputs
document.getElementById('maxNiveis').addEventListener('input', atualizarTabela);
document.getElementById('valorReferencia').addEventListener('input', atualizarTabela);
document.getElementById('step').addEventListener('input', atualizarTabela);
document.getElementById('numNiveisCapacitacao').addEventListener('input', atualizarTabela);

document.getElementById('offsetNiveisB').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisC').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisD').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisE').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisF').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisG').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisH').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisI').addEventListener('input', atualizarTabela);
document.getElementById('offsetNiveisJ').addEventListener('input', atualizarTabela);

document.getElementById('numNiveisClassificacao').addEventListener('input', atualizarNCs);



// Chamando a função para gerar a tabela ao carregar a página
window.onload = atualizarTabela;
