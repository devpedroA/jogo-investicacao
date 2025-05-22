let pistas = [];
let visitados = [];
let finaisDesbloqueados = [];

function navegar(pagina) {
  document.querySelectorAll('.box').forEach(box => box.classList.remove('active'));
  document.getElementById(pagina).classList.add('active');
}

function adicionarPista(pista) {
  if (!pistas.includes(pista)) {
    pistas.push(pista);
    atualizarInventario();

    // Verifica pistas especiais
    if (pista.includes("pergaminho com símbolos alquímicos") && !finaisDesbloqueados.includes('simbolos')) {
      finaisDesbloqueados.push('simbolos');
    }
    if (pista.includes("bilhete: 23h, portal leste") && !finaisDesbloqueados.includes('portal')) {
      finaisDesbloqueados.push('portal');
    }
  }
}

function visitarLocal(pagina, local) {
  let pistaEspecial = '';

  // Adiciona detalhes específicos para cada local
  switch (local) {
    case 'Estante Principal':
      pistaEspecial = 'Pista coletada em Estante Principal: pergaminho com símbolos alquímicos';
      break;
    case 'Escritório do Bibliotecário':
      pistaEspecial = 'Pista coletada em Escritório: bilhete: "23h, portal leste. Traga o medallion."';
      break;
    case 'Entrada Secreta':
      pistaEspecial = 'Pista coletada em Entrada Secreta: pingente com olho triplo';
      break;
    default:
      pistaEspecial = `Pista coletada em ${local}`;
  }

  adicionarPista(pistaEspecial);
  marcarCheck(local);
  navegar(pagina);
}

function interrogar(pagina, pessoa) {
  let informacao = '';

  // Diálogos especiais para cada suspeito
  switch (pessoa) {
    case 'Bibliotecário':
      informacao = 'Informação do Bibliotecário: Tatuagem do olho triplo, nervosismo sobre o solstício';
      break;
    case 'Assistente':
      informacao = 'Informação da Assistente: Bilhete sobre "sangue do iniciado"';
      break;
    case 'Zelador':
      informacao = 'Informação do Zelador: Marca de queimadura ritualística';
      break;
    default:
      informacao = `Informação do(a) ${pessoa}`;
  }

  adicionarPista(informacao);
  marcarCheck(pessoa);
  navegar(pagina);
}

function marcarCheck(nome) {
  if (!visitados.includes(nome)) {
    visitados.push(nome);
  }
  const checkElement = document.getElementById(`check-${nome}`);
  if (checkElement) {
    checkElement.textContent = '✔️';
  }
}

function atualizarInventario() {
  const lista = document.getElementById('lista-pistas');
  const badge = document.getElementById('badge-pistas');
  lista.innerHTML = '';

  pistas.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;

    // Destaca pistas importantes
    if (item.includes('pergaminho') || item.includes('bilhete') || item.includes('pingente')) {
      li.style.fontWeight = 'bold';
      li.style.color = '#c62828';
    }

    lista.appendChild(li);
  });

  badge.textContent = pistas.length;
  if (pistas.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhuma pista encontrada ainda.';
    lista.appendChild(li);
  }
}

function finalizarJogo(suspeito) {
  const culpado = 'Bibliotecário';
  let mensagem = '';
  let consequencias = '';
  const resultados = document.getElementById('resultado');
  const divConsequencias = document.getElementById('consequencias');
  const textoConsequencias = document.getElementById('texto-consequencias');

  // Respostas detalhadas para cada suspeito
  switch (suspeito) {
    case 'Bibliotecário':
      mensagem = '🎉 Você acertou! Mortimer Blackwood é o Grão-Mestre da Ordem Lux Veritatis. ';
      mensagem += 'Sua família guarda o segredo há gerações: a biblioteca foi construída sobre um portal dimensional. ';
      mensagem += 'O ritual do solstício visa abri-lo para "conhecimento ilimitado", mas libertará algo antigo e maligno.';

      consequencias = 'Com Blackwood preso, o ritual é interrompido. O estudante é encontrado em cárcere privado. ';
      consequencias += 'A Ordem se dispersa, mas o pingente do visitante misterioso sugere que a ameaça persiste...';
      break;

    case 'Professor':
      mensagem = '❌ Quase lá! Dr. Graves é o Ritualista, mas não o líder. ';
      mensagem += 'Ele traduziu os textos antigos para Blackwood, obcecado pelo poder prometido. ';
      mensagem += 'Sem prender o Bibliotecário, o ritual continua - o portal se abre parcialmente na noite do solstício.';

      consequencias = 'Luzes estranhas são vistas na biblioteca. Pessoas relatam pesadelos vívidos. ';
      consequencias += 'O zelador é encontrado em estado catatônico, murmurando sobre "os olhos nas paredes".';
      break;

    case 'Visitante Misterioso':
      mensagem = '❌ Parcialmente correto! "Sr. Smith" é um Emissário da Ordem, ';
      mensagem += 'mas ele apenas supervisionava o trabalho de Blackwood. ';
      mensagem += 'Com sua prisão, a Ordem envia outro emissário e o ritual é apenas adiado.';

      consequencias = 'Duas semanas depois, outro estudante desaparece. ';
      consequencias += 'A assistente encontra um novo símbolo pintado com sangue nos arquivos.';
      break;

    case 'Assistente':
      mensagem = '❌ Errado! Clara era inocente, apenas observadora curiosa. ';
      mensagem += 'Ao acusá-la, você alertou Blackwood, que acelera os preparativos.';

      consequencias = 'Na noite seguinte, a biblioteca é consumida por chamas azuis. ';
      consequencias += 'Nenhum corpo é encontrado, apenas sete cálices derretidos e um portal aberto na adega.';
      break;

    case 'Zelador':
      mensagem = '❌ Grave erro! Joaquim era vítima, não culpado. ';
      mensagem += 'Sua marca era um aviso para não interferir. ';
      mensagem += 'Sem oposição, a Ordem realiza o ritual sem obstáculos.';

      consequencias = 'No solstício, 7 pessoas desaparecem na cidade. ';
      consequencias += 'O estudante é encontrado vagando, com olhos totalmente negros, sussurrando em uma língua desconhecida.';
      break;

    case 'Estudante':
      mensagem = '❌ Farsa! Lucas forjou seu desaparecimento para expor a Ordem. ';
      mensagem += 'Sua acusação infundada faz a polícia ignorar alertas reais.';

      consequencias = 'Enquanto Lucas é interrogado, o ritual é concluído. ';
      consequencias += 'Ao amanhecer, a biblioteca está intacta, mas todos os livros agora contêm páginas em branco - ';
      consequencias += 'todo conhecimento foi consumido.';
      break;

    default:
      mensagem = '❌ Investigação incompleta! O verdadeiro culpado escapa.';
      consequencias = 'O ritual ocorre como planejado. Nas semanas seguintes, habitantes relatam sonhos idênticos ';
      consequencias += 'com uma biblioteca infinita onde "algo" os observa das prateleiras...';
  }

  resultado.innerHTML = mensagem;
  textoConsequencias.innerHTML = consequencias;
  divConsequencias.style.display = 'block';

  // Final especial se coletou todas pistas importantes
  if (finaisDesbloqueados.includes('simbolos') && finaisDesbloqueados.includes('portal')) {
    resultado.innerHTML += '<p><strong>🔎 Você descobriu a verdade completa!</strong> A biblioteca é apenas a ponta do iceberg - a Ordem tem células em sete cidades, todas construídas sobre portais.</p>';
  }

  navegar('pagina17');
}