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

        // Verifica pistas especiais para finais alternativos
        if (pista.includes("Projeto Fênix") && !finaisDesbloqueados.includes('fenix')) {
            finaisDesbloqueados.push('fenix');
        }
        if (pista.includes("túmulo violado") && !finaisDesbloqueados.includes('tumulo')) {
            finaisDesbloqueados.push('tumulo');
        }
    }
}

function coletarItem(item, pagina) {
    if (!itensColetados.includes(item)) {
        itensColetados.push(item);
        atualizarItens();
        adicionarPista(`Item coletado: ${item}`);

        // Efeito especial para itens importantes
        if (item === "Documentos da lápide") {
            alert("Você descobriu um segredo de família: Ricardo é realmente filho de Eduardo!");
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

        // Destaca itens chave
        if (item === "Frasco suspeito" || item === "Documentos da lápide") {
            li.style.fontWeight = 'bold';
            li.style.color = '#c62828';
        }

        lista.appendChild(li);
    });

    badge.textContent = itensColetados.length;
    if (itensColetados.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Nenhum item coletado.';
        lista.appendChild(li);
    }
}

function visitarLocal(pagina, local) {
    let pistaEspecial = '';

    switch (local) {
        case 'Biblioteca':
            pistaEspecial = 'Cena do crime: Odor de amêndoas, livro de toxicologia faltando';
            break;
        case 'Adega':
            pistaEspecial = 'Taça contaminada e frasco escondido atrás dos vinhos';
            break;
        case 'Capela':
            pistaEspecial = 'Túmulo violado com documentos escondidos';
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
        case 'Governanta':
            informacao = 'Informação da Governanta: Mencionou morte suspeita da primeira esposa';
            break;
        case 'Sobrinho':
            informacao = 'Informação do Sobrinho: Estava sendo preparado para assumir os negócios';
            break;
        case 'Esposa':
            informacao = 'Informação da Esposa: Recebeu documentos sobre o passado de Eduardo';
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

        if (item.includes('cianeto') || item.includes('Fênix') || item.includes('túmulo')) {
            li.style.fontWeight = 'bold';
            li.style.color = '#1565c0';
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

function finalizarJogo(suspeito, tipo) {
    const resultados = document.getElementById('resultado');
    const consequencias = document.getElementById('texto-consequencias');
    const segredoFinal = document.getElementById('segredo-final');
    const textoSegredo = document.getElementById('texto-segredo');

    let mensagem = '';
    let textoConsequencias = '';
    let segredo = '';

    // Sistema de múltiplos finais baseado nas escolhas
    switch (suspeito) {
        case 'Esposa':
            if (tipo === 'crime_passional') {
                mensagem = '🎉 Você provou que Camila envenenou Eduardo após descobrir que ele a enganou por 15 anos!';
                textoConsequencias = 'Camila é presa, mas os documentos que ela queimou continham segredos que morrem com ela.';
                segredo = '🔎 Segredo Final: Eduardo planejava assumir Ricardo como filho e deserdar Camila no dia seguinte.';
            }
            break;

        case 'Sobrinho':
            if (tipo === 'vinganca') {
                mensagem = '🎉 Ricardo é o culpado! Ele descobriu que Eduardo matou sua mãe (a primeira esposa) e planejou sua vingança por anos.';
                textoConsequencias = 'Ricardo foge para o exterior com os documentos do cofre, deixando a empresa em colapso.';
                segredo = '🔎 Segredo Final: O "Projeto Fênix" era um plano para clonar a fortuna da família em paraísos fiscais.';
            }
            break;

        case 'Governanta':
            if (tipo === 'segredo_familiar') {
                mensagem = '❌ Inesperado! D. Matilde é a verdadeira mãe de Ricardo e matou Eduardo para proteger seu segredo.';
                textoConsequencias = 'Aos 72 anos, ela confessa e é internada, enquanto Ricardo herda tudo sem saber a verdade.';
                segredo = '🔎 Segredo Final: A primeira esposa era estéril - Eduardo teve um caso com a governanta nos anos 90.';
            }
            break;

        case 'Outro':
            if (tipo === 'suicidio') {
                mensagem = '🤯 Reviravolta! Eduardo cometeu suicídio para incriminar Camila, após descobrir que ela e o chef planejavam envenená-lo.';
                textoConsequencias = 'O testamento secreto no porão revela que toda fortuna foi doada a um orfanato.';
                segredo = '🔎 Segredo Final: Eduardo estava morrendo de câncer e arquitetou tudo para se vingar da família.';
            }
            break;

        default:
            mensagem = `❌ ${suspeito} não é o culpado principal. Você pode ter prendido um cúmplice, mas o verdadeiro assassino escapou.`;
            textoConsequencias = 'O caso é arquivado como "insolúvel". Seis meses depois, a mansão pega fogo misteriosamente.';
    }

    // Verifica se descobriu segredos para finais especiais
    if (finaisDesbloqueados.includes('fenix') && finaisDesbloqueados.includes('tumulo')) {
        segredo += '\n\n💡 Você descobriu TODOS os segredos: O Projeto Fênix era um plano para "renascer" Eduardo através de um clone (Ricardo).';
    }

    resultados.innerHTML = mensagem;
    consequencias.innerHTML = textoConsequencias;

    if (segredo) {
        textoSegredo.innerHTML = segredo;
        segredoFinal.style.display = 'block';
    }

    navegar('pagina19');
}