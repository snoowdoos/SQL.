const perguntas = [
  {
    texto: "1) Qual operador seleciona linhas de uma tabela por uma condição?",
    alternativas: [
      { texto: "Projeção (π)", correta: false },
      { texto: "Seleção (σ)", correta: true },
      { texto: "União (⋃)", correta: false },
      { texto: "Produto cartesiano (×)", correta: false }
    ]
  },
  {
    texto: "2) Qual operador retorna apenas colunas específicas de uma tabela?",
    alternativas: [
      { texto: "Seleção (σ)", correta: false },
      { texto: "Projeção (π)", correta: true },
      { texto: "União (⋃)", correta: false },
      { texto: "Junção (⋈)", correta: false }
    ]
  },
  {
    texto: "3) Qual operador combina duas tabelas com base em colunas comuns?",
    alternativas: [
      { texto: "Junção (⋈)", correta: true },
      { texto: "Intersecção (∩)", correta: false },
      { texto: "Divisão (÷)", correta: false },
      { texto: "Renomeação (ρ)", correta: false }
    ]
  },
  {
    texto: "4) Qual operador retorna linhas que existem em ambas as tabelas?",
    alternativas: [
      { texto: "União (⋃)", correta: false },
      { texto: "Diferença (−)", correta: false },
      { texto: "Intersecção (∩)", correta: true },
      { texto: "Produto cartesiano (×)", correta: false }
    ]
  },
  {
    texto: "5) Qual operador retorna todas as tuplas de uma relação que correspondem a todas as tuplas de outra?",
    alternativas: [
      { texto: "Divisão (÷)", correta: true },
      { texto: "Junção (⋈)", correta: false },
      { texto: "Seleção (σ)", correta: false },
      { texto: "Projeção (π)", correta: false }
    ]
  },
  {
    texto: "6) O operador que permite renomear uma tabela ou resultado de operação é:",
    alternativas: [
      { texto: "Renomeação (ρ)", correta: true },
      { texto: "Junção (⋈)", correta: false },
      { texto: "Projeção (π)", correta: false },
      { texto: "Seleção (σ)", correta: false }
    ]
  },
  {
    texto: "7) Qual operador retorna todas as tuplas de duas relações sem repetição?",
    alternativas: [
      { texto: "União (⋃)", correta: true },
      { texto: "Intersecção (∩)", correta: false },
      { texto: "Diferença (−)", correta: false },
      { texto: "Produto cartesiano (×)", correta: false }
    ]
  },
  {
    texto: "8) O operador produto cartesiano (×) realiza:",
    alternativas: [
      { texto: "Combina cada linha de uma tabela com todas as linhas da outra", correta: true },
      { texto: "Seleciona colunas específicas", correta: false },
      { texto: "Retorna linhas comuns", correta: false },
      { texto: "Renomeia tabelas", correta: false }
    ]
  },
  {
    texto: "9) Qual sequência equivale a um Join Natural (⋈)?",
    alternativas: [
      { texto: "Produto cartesiano + Seleção + Projeção", correta: true },
      { texto: "União + Diferença", correta: false },
      { texto: "Projeção + Intersecção", correta: false },
      { texto: "Divisão + Renomeação", correta: false }
    ]
  },
  {
    texto: "10) Clientes de São Paulo com seus pedidos podem ser representados por qual expressão?",
    alternativas: [
      { texto: "πnome, data_pedido (σcidade='São Paulo'(Clientes ⋈ Pedidos))", correta: true },
      { texto: "σcidade='São Paulo'(Clientes)", correta: false },
      { texto: "Clientes ⋈ Pedidos", correta: false },
      { texto: "πnome (Clientes)", correta: false }
    ]
  }
];

let indiceAtual = 0;
let travado = false;
let pontuacao = 0;

function mostrarPergunta() {
  travado = false;
  const pergunta = perguntas[indiceAtual];
  document.getElementById("pergunta").innerText = pergunta.texto;
  const respostasDiv = document.getElementById("respostas");
  respostasDiv.innerHTML = "";
  pergunta.alternativas.forEach((alt) => {
    const div = document.createElement("div");
    div.classList.add("resposta");
    div.innerText = alt.texto;
    div.onclick = () => verificarResposta(div, alt.correta);
    respostasDiv.appendChild(div);
  });
  document.getElementById("resultado").innerText = "";
}

function verificarResposta(elemento, correta) {
  if (travado) return;
  travado = true;
  if (correta) pontuacao++;
  const alternativas = document.querySelectorAll(".resposta");
  alternativas.forEach((el) => {
    const texto = el.innerText;
    const certo = perguntas[indiceAtual].alternativas.find(a => a.texto === texto)?.correta;
    el.classList.add(certo ? "correta" : "errada");
    el.onclick = null;
  });
  document.getElementById("resultado").innerText = correta ? "✅ Resposta correta!" : "❌ Resposta incorreta.";
}

function proximaPergunta() {
  if (indiceAtual < perguntas.length - 1) {
    indiceAtual++;
    mostrarPergunta();
  } else {
    mostrarResultadoFinal();
  }
}

function voltarPergunta() {
  if (indiceAtual > 0) {
    indiceAtual--;
    mostrarPergunta();
  }
}

function mostrarResultadoFinal() {
  document.getElementById("pergunta").innerText = "🎉 Você concluiu o quiz!";
  document.getElementById("respostas").innerHTML = "";
  document.getElementById("resultado").innerText = `Pontuação final: ${pontuacao} de ${perguntas.length}`;
  const botaoReiniciar = document.createElement("button");
  botaoReiniciar.innerText = "Reiniciar Quiz";
  botaoReiniciar.onclick = reiniciarQuiz;
  botaoReiniciar.classList.add("botao-reiniciar");
  document.getElementById("respostas").appendChild(botaoReiniciar);
}

function reiniciarQuiz() {
  indiceAtual = 0;
  pontuacao = 0;
  mostrarPergunta();
}

// Iniciar quiz
mostrarPergunta();