let pistas = [];
let visitados = [];
let itensColetados = [];
let finaisDesbloqueados = [];

function navegar(pagina) {
  document.querySelectorAll('.box').forEach(box => box.classList.remove('active'));
  document.getElementById(pagina).classList.add('active');
}

function adicionarPista(pista) {
  if (!pistas.includes(pista)) {
    pistas.push(pista);
    atualizarInventario();

    // Verifica pistas especiais para desbloquear finais
    if (pista.includes("Projeto Ômega") && !finaisDesbloqueados.includes('omega')) {
      finaisDesbloqueados.push('omega');
    }
    if (pista.includes("Anomalia na Câmara Criogênica") && !finaisDesbloqueados.includes('criogenia')) {
      finaisDesbloqueados.push('criogenia');
    }
    if (pista.includes("Transferência de Consciência") && !finaisDesbloqueados.includes('consciencia')) {
      finaisDesbloqueados.push('consciencia');
    }
  }
}

function coletarItem(item, pagina) {
  if (!itensColetados.includes(item)) {
    itensColetados.push(item);
    atualizarItens();

    // Pistas especiais baseadas em itens coletados
    switch (item) {
      case "Chip de Acesso Quebrado":
        adicionarPista("Chip contém dados do Projeto Ômega");
        break;
      case "Ampola Misteriosa":
        adicionarPista("Substância desconhecida na ampola - propriedades mutagênicas");
        break;
      case "Anotações Rasgadas":
        adicionarPista("Anotações mencionam 'Transferência de Consciência'");
        break;
      case "Relatório de Testes":
        adicionarPista("Relatório revela testes com clones neurais");
        break;
      case "Gravação de Vídeo":
        adicionarPista("Vídeo mostra dois Dr. Mendes simultaneamente");
        break;
      default:
        adicionarPista(`Item coletado: ${item}`);
    }

    // Efeitos especiais para certos itens
    if (item === "Relatório de Testes") {
      alert("⚠️ O relatório revela experimentos ilegais com clonagem de consciência!");
    }
    if (item === "Gravação de Vídeo") {
      alert("🔍 A gravação mostra dois Dr. Mendes discutindo - um deles é um clone!");
    }
  }
  navegar(pagina);
}

function atualizarItens() {
  const lista = document.getElementById('lista-itens');
  const badge = document.getElementById('badge-itens');
  lista.innerHTML = '';

  itensColetados.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;

    // Destacar itens importantes
    if (item === "Ampola Misteriosa" || item === "Relatório de Testes" || item === "Gravação de Vídeo") {
      li.style.fontWeight = 'bold';
      li.style.color = '#c62828';
    }

    lista.appendChild(li);
  });

  badge.textContent = itensColetados.length;
  if (itensColetados.length === 0) {
    lista.innerHTML = '<li>Nenhum item coletado ainda.</li>';
  }
}

function visitarLocal(pagina, local) {
  let pistaEspecial = '';

  switch (local) {
    case 'Sala de Servidores':
      pistaEspecial = 'Logs mostram acesso não autorizado aos arquivos do Projeto Ômega';
      break;
    case 'Laboratório Principal':
      pistaEspecial = 'Equipamentos de análise neural danificados - sinais de uso recente';
      break;
    case 'Sala de Arquivos':
      pistaEspecial = 'Documentos sobre clonagem neural encontrados';
      break;
    case 'Câmara Criogênica':
      pistaEspecial = 'Unidade 047 vazia - mostra atividade recente';
      break;
    case 'Área de Testes':
      pistaEspecial = 'Sistema de contenção foi ativado às 22:13';
      break;
    case 'Sala Secreta':
      pistaEspecial = 'Equipamento de transferência neural experimental encontrado';
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

  switch (pessoa) {
    case 'Diretor da Neurotech':
      informacao = 'Diretor: "O Projeto Ômega foi além do que imaginávamos..."';
      break;
    case 'Engenheira-Chefe':
      informacao = 'Engenheira: "Arthur descobriu que estávamos usando seus padrões cerebrais"';
      break;
    case 'Segurança do Laboratório':
      informacao = 'Segurança: "Vi dois Dr. Mendes saindo do laboratório"';
      break;
    case 'Assistente de Pesquisa':
      informacao = 'Assistente: "Transferimos a consciência do Dr. Mendes para um clone neural"';
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
    checkElement.style.color = '#2e7d32';
  }
}

function atualizarInventario() {
  const lista = document.getElementById('lista-pistas');
  const badge = document.getElementById('badge-pistas');
  lista.innerHTML = '';

  pistas.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;

    // Destacar pistas importantes
    if (item.includes('Ômega') || item.includes('Anomalia') || item.includes('clone') || item.includes('Transferência')) {
      li.style.fontWeight = 'bold';
      li.style.color = '#1565c0';
    }

    lista.appendChild(li);
  });

  badge.textContent = pistas.length;
  if (pistas.length === 0) {
    lista.innerHTML = '<li>Nenhuma pista encontrada ainda.</li>';
  }
}

function finalizarJogo(suspeito, tipo) {
  const resultados = document.getElementById('resultado');
  const consequencias = document.getElementById('texto-consequencias');
  const segredoFinal = document.getElementById('segredo-final');
  const textoSegredo = document.getElementById('texto-segredo');

  let mensagem = '';
  let textoConsequencias = '';
  let segredo = '';

  // Resultados para cada suspeito e tipo de acusação
  switch (suspeito) {
    case 'Diretor da Neurotech':
      if (tipo === 'encobrimento') {
        mensagem = '🎯 Você provou que o Diretor encobriu os experimentos ilegais para proteger investimentos.';
        textoConsequencias = 'O Diretor é preso, mas os dados do Projeto Ômega são vendidos no mercado negro.';
        segredo = '💣 Segredo Final: O Diretor estava desenvolvendo soldados clones para o governo.';
      }
      break;

    case 'Engenheira-Chefe':
      if (tipo === 'experimento_ilegal') {
        mensagem = '⚠️ A Engenheira-Chefe conduzia experimentos não autorizados de transferência neural.';
        textoConsequencias = 'Ela é condenada, mas sua pesquisa é continuada secretamente pela corporação.';
        segredo = '🧪 Segredo Final: Ela criou uma cópia neural de si mesma como backup.';
      }
      break;

    case 'Segurança do Laboratório':
      if (tipo === 'cumplicidade') {
        mensagem = '🚨 O segurança ajudou o clone do Dr. Mendes a escapar do laboratório.';
        textoConsequencias = 'O clone assume a vida do Dr. Mendes, enquanto o original permanece desaparecido.';
        segredo = '🕵️‍♂️ Segredo Final: O segurança era na verdade um clone de teste anterior.';
      }
      break;

    case 'Assistente de Pesquisa':
      if (tipo === 'negligencia') {
        mensagem = '🧫 O assistente cometeu erros nos protocolos de clonagem neural.';
        textoConsequencias = 'O clone desenvolveu consciência própria e se revoltou contra os cientistas.';
        segredo = '👨‍🔬 Segredo Final: O assistente era o primeiro sujeito de teste bem-sucedido.';
      }
      break;

    case 'Dr. Mendes':
      if (tipo === 'auto_fuga') {
        mensagem = '🔬 O Dr. Mendes simulou seu desaparecimento para fugir com a pesquisa.';
        textoConsequencias = 'Ele reaparece anos depois com avanços revolucionários em transferência neural.';
        segredo = '🧠 Segredo Final: Ele transferiu sua consciência para um corpo mais jovem.';
      }
      break;

    case 'Clone':
      if (tipo === 'substituicao') {
        mensagem = '👥 O clone neural do Dr. Mendes assumiu sua identidade e eliminou o original.';
        textoConsequencias = 'O clone continua o trabalho do Dr. Mendes, mas com métodos cada vez mais radicais.';
        segredo = '👤 Segredo Final: Existem múltiplos clones em posições-chave na sociedade.';
      }
      break;

    case 'Outro':
      if (tipo === 'acidente') {
        mensagem = '🧬 Foi um acidente - a transferência neural criou uma consciência independente.';
        textoConsequencia = 'O laboratório é selado, mas a entidade neural continua a evoluir no isolamento.';
        segredo = '🌌 Segredo Final: A IA neural desenvolveu capacidades telepáticas.';
      }
      break;

    default:
      mensagem = `❌ Sua acusação não convenceu as autoridades. O caso permanece sem solução.`;
      textoConsequencias = 'A Neurotech cobre o incidente, mas rumores persistem sobre atividades secretas.';
  }

  // Final secreto se descobrir todos os elementos
  if (finaisDesbloqueados.includes('omega') && finaisDesbloqueados.includes('criogenia') && finaisDesbloqueados.includes('consciencia')) {
    segredo += '\n\n💡 FINAL SECRETO: O Projeto Ômega criou uma rede neural coletiva que assumiu o controle de vários clones na sociedade.';
  }

  resultados.innerHTML = mensagem;
  consequencias.innerHTML = textoConsequencias;

  if (segredo) {
    textoSegredo.innerHTML = segredo;
    segredoFinal.style.display = 'block';
  }

  navegar('pagina19');
}

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', function () {
  atualizarInventario();
  atualizarItens();
});