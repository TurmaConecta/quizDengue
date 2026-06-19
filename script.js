const perguntas = [
  {
    pergunta: "Qual é o principal mosquito vetor responsável pela transmissão do vírus da dengue?",
    alternativas: [
      "A) Anopheles gambiae",
      "B) Aedes aegypti",
      "C) Culex quinquefasciatus",
      "D) Simulium pertinax"
    ],
    correta: 1,
    explicacao: "O mosquito Aedes aegypti é o principal vetor da dengue no ambiente urbano."
  },

  {
    pergunta: "Qual é a principal forma de transmissão da dengue?",
    alternativas: [
      "A) Contato físico com uma pessoa infectada",
      "B) Picada da fêmea do mosquito infectado",
      "C) Ingestão de água contaminada",
      "D) Gotículas de saliva"
    ],
    correta: 1,
    explicacao: "A dengue é transmitida pela picada da fêmea infectada do mosquito Aedes aegypti."
  },

  {
    pergunta: "Qual é o agente causador da dengue?",
    alternativas: [
      "A) Bactéria",
      "B) Protozoário",
      "C) Vírus",
      "D) Fungo"
    ],
    correta: 2,
    explicacao: "A dengue é causada por um vírus da família Flaviviridae."
  },

  {
    pergunta: "Como ocorre a transmissão da dengue para os seres humanos?",
    alternativas: [
      "A) Água contaminada",
      "B) Contato com objetos contaminados",
      "C) Picada da fêmea infectada do Aedes aegypti",
      "D) Ar contaminado"
    ],
    correta: 2,
    explicacao: "A transmissão ocorre exclusivamente pela picada da fêmea infectada."
  },

  {
    pergunta: "Quantos sorotipos do vírus da dengue existem atualmente?",
    alternativas: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 5"
    ],
    correta: 2,
    explicacao: "Existem quatro sorotipos conhecidos: DENV-1, DENV-2, DENV-3 e DENV-4."
  },

  {
    pergunta: "Por que a fêmea do mosquito Aedes aegypti pica os seres humanos?",
    alternativas: [
      "A) Para se defender",
      "B) Para obter proteínas necessárias à produção de ovos",
      "C) Para hidratação",
      "D) Para transmitir doenças"
    ],
    correta: 1,
    explicacao: "A fêmea precisa das proteínas presentes no sangue para o desenvolvimento dos ovos."
  },

  {
    pergunta: "Qual destes é um sinal de alarme da dengue?",
    alternativas: [
      "A) Dor abdominal intensa",
      "B) Espirros",
      "C) Coriza",
      "D) Tosse seca"
    ],
    correta: 0,
    explicacao: "A dor abdominal intensa é considerada um sinal de agravamento da doença."
  },

  {
    pergunta: "Após ter dengue uma vez, a pessoa fica imune:",
    alternativas: [
      "A) A todos os sorotipos",
      "B) Apenas ao sorotipo que causou a infecção",
      "C) Por apenas seis meses",
      "D) Não desenvolve imunidade"
    ],
    correta: 1,
    explicacao: "A imunidade adquirida é permanente apenas para o sorotipo que causou a infecção."
  },

  {
    pergunta: "Qual medida ajuda a prevenir a proliferação do mosquito da dengue?",
    alternativas: [
      "A) Acumular água da chuva",
      "B) Deixar pneus expostos",
      "C) Eliminar recipientes com água parada",
      "D) Armazenar garrafas abertas"
    ],
    correta: 2,
    explicacao: "Eliminar locais com água parada impede a reprodução do mosquito."
  },

  {
    pergunta: "Em qual período do dia o mosquito Aedes aegypti costuma picar com maior frequência?",
    alternativas: [
      "A) Apenas durante a madrugada",
      "B) Apenas à noite",
      "C) Principalmente no início da manhã e final da tarde",
      "D) Somente ao meio-dia"
    ],
    correta: 2,
    explicacao: "O Aedes aegypti possui hábitos predominantemente diurnos, sendo mais ativo no início da manhã e no final da tarde."
  }
]

// Referências dos elementos HTML

const telaInicial = document.getElementById("TelaInicial");
const telaQuiz = document.getElementById("QuizPerguntas");
const telaFinal = document.getElementById("TelaFinal");

const contadorPergunta = document.getElementById("ContadorPergunta");
const barraProgresso = document.getElementById("BarraDeProgresso");
const cronometro = document.getElementById("Temporizador");
const perguntaElemento = document.getElementById("TituloPergunta");
const alternativasElemento = document.getElementById("Alternativas");

const resultadoElemento = document.getElementById("Resultado");
const relatorioErros = document.getElementById("RelatorioErros");

// Variáveis do jogo

let tempo = 0;
let perguntaAtual = 0;
let pontos = 0;
let intervalo = null;
let erros = [];

function IniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";
    relatorioErros.innerHTML = "";

    cronometro.textContent = "Tempo: 0s";

    telaInicial.style.display = "none";
    telaFinal.style.display = "none";
    telaQuiz.style.display = "block";

    clearInterval(intervalo);

    intervalo = setInterval(() => {

        tempo++;

        cronometro.textContent =
            `Tempo: ${tempo}s`;

    }, 1000);

    mostrarPergunta();
}

function mostrarPergunta() {

    alternativasElemento.innerHTML = "";

    contadorPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    let progresso =
        (perguntaAtual / perguntas.length) * 100;

    barraProgresso.style.width =
        progresso + "%";

    perguntaElemento.textContent =
        perguntas[perguntaAtual].pergunta;

    perguntas[perguntaAtual].alternativas.forEach(
        (alternativa, indice) => {

            const botao =
                document.createElement("button");

            botao.textContent = alternativa;

            botao.onclick = () =>
                verificarResposta(indice);

            alternativasElemento.appendChild(botao);
        }
    );
}

function verificarResposta(respostaSelecionada) {

    const perguntaAtualObj =
        perguntas[perguntaAtual];

    if (
        respostaSelecionada ===
        perguntaAtualObj.correta
    ) {

        pontos++;

    } else {

        erros.push({

            pergunta:
                perguntaAtualObj.pergunta,

            respostaCorreta:
                perguntaAtualObj.alternativas[
                    perguntaAtualObj.correta
                ],

            explicacao:
                perguntaAtualObj.explicacao
        });
    }

    perguntaAtual++;

    if (
        perguntaAtual <
        perguntas.length
    ) {

        mostrarPergunta();

    } else {

        finalizarQuiz();
    }
}

function finalizarQuiz() {

    clearInterval(intervalo);

    barraProgresso.style.width = "100%";

    telaQuiz.style.display = "none";
    telaFinal.style.display = "block";

    resultadoElemento.innerHTML = `
        <strong>Pontuação:</strong>
        ${pontos}/${perguntas.length}

        <br><br>

        <strong>Tempo:</strong>
        ${tempo} segundos
    `;

    relatorioErros.innerHTML = "";

    if (erros.length > 0) {

        relatorioErros.innerHTML =
            "<h2>Questões que você errou:</h2>";

        erros.forEach(erro => {

            relatorioErros.innerHTML += `

                <div class="erro">

                    <h3>${erro.pergunta}</h3>

                    <p>
                        <strong>Resposta correta:</strong>
                        ${erro.respostaCorreta}
                    </p>

                    <p>
                        <strong>Explicação:</strong>
                        ${erro.explicacao}
                    </p>

                </div>

            `;
        });

    } else {

        relatorioErros.innerHTML = `
            <h2>
                🎉 Parabéns!
                Você acertou todas as questões!
            </h2>
        `;
    }
}

function reiniciarQuiz() {

    clearInterval(intervalo);

    perguntaAtual = 0;
    pontos = 0;
    tempo = 0;
    erros = [];

    barraProgresso.style.width = "0%";

    telaFinal.style.display = "none";
    telaQuiz.style.display = "none";
    telaInicial.style.display = "block";
}

const conteudos = [

{
titulo: "O Horário de Maior Perigo 🕐",	
texto: `
O mosquito da dengue tem hábitos predominantemente diurnos. 
Ele costuma picar com maior frequência no início da manhã e no final da tarde. 
Esses são os momentos em que a temperatura está mais amena e o inseto fica mais ativo para buscar sangue.
Reforce o uso de repelentes e mantenha portas e janelas protegidas por telas especialmente nesses períodos do dia.
`
},

{
titulo: "O Inimigo Número Um da Dengue 🦟",
texto: `
O principal mosquito vetor responsável pela transmissão do vírus da dengue no ambiente urbano é o Aedes aegypti. Diferente de outros mosquitos comuns, ele possui características muito específicas, como o corpo escuro com listras brancas brilhantes nas patas e no tronco. Conhecer o inimigo é o primeiro passo para combatê-lo. Fique atento aos locais que possam servir de abrigo para ele em sua casa!

`
},

{
titulo: "Como a Dengue é Transmitida?",
texto: `
A transmissão da dengue acontece unicamente através da picada da fêmea do mosquito Aedes aegypti infectado. Isso significa que a doença não passa de pessoa para pessoa por meio de abraços, apertos de mão, beijos ou compartilhamento de objetos. Se o mosquito não picar uma pessoa doente e depois uma saudável, o ciclo de transmissão do vírus é quebrado.

`
},

{
titulo: "Conheça o Vilão: O Vírus da Dengue 🔬",
texto: `
Você sabia que a dengue não é causada por uma bactéria, verme ou fungo? O verdadeiro agente causador é um vírus da família Flaviviridae. Os vírus precisam invadir as células do nosso corpo para se multiplicarem, provocando toda aquela reação inflamatória, febre alta e dores no corpo que caracterizam a doença. O tratamento busca aliviar os sintomas enquanto o próprio corpo combate o vírus.

`
},

{
titulo: "Ciclo Exclusivo de Transmissão 🔂",
texto: `
Atenção: você não pega dengue ao beber água contaminada ou respirar o ar de um ambiente. A transmissão para os seres humanos ocorre exclusivamente pela picada da fêmea infectada. Portanto, o foco total das campanhas de saúde pública e das nossas ações diárias deve ser um só: impedir que o mosquito nasça e circule entre nós.

`
},

{
titulo: " Os 4 Tipos de Dengue 🔢",
texto: `
 Atualmente existem 4 sorotipos diferentes do vírus da dengue em circulação: DENV-1, DENV-2, DENV-3 e DENV-4. Eles são geneticamente distintos, embora causem sintomas parecidos. Isso significa que uma mesma pessoa pode contrair dengue até quatro vezes ao longo da vida, e o risco de desenvolver a forma grave da doença aumenta a cada nova infecção.

`
},

{
titulo: " Por que Elas nos Picam? 🩸",
texto: `
Não é por maldade ou fome comum: a fêmea do Aedes aegypti pica os seres humanos porque precisa das proteínas do sangue para o desenvolvimento de seus ovos. Os machos do mosquito alimentam-se apenas de seiva de plantas e frutas. Como apenas as fêmeas geram descendentes, são elas as únicas responsáveis por transmitir o vírus enquanto buscam os nutrientes necessários para perpetuar a espécie.

`
},

{
titulo: "Sinal de Alarme: Dor Abdominal Intensa 🚨",
texto: `
Embora a dengue cause febre e dor no corpo, existem sinais que indicam o agravamento da doença. A dor abdominal intensa e contínua é considerada um dos principais sinais de alarme. Se você ou alguém próximo estiver com suspeita de dengue e apresentar esse sintoma, procure atendimento médico imediato, pois pode ser um indício de evolução para a dengue grave.

`
},

{
titulo: "O Mito da Imunidade Total 🛡️",
texto: `
Cuidado com a falsa sensação de segurança! Após ter dengue uma vez, você fica imune apenas ao sorotipo específico que causou aquela infecção. Você continua vulnerável aos outros três sorotipos circulantes. Por isso, mesmo quem já teve dengue no passado deve manter os cuidados de prevenção e o uso de repelentes exatamente igual a qualquer outra pessoa.

`
},

];

function mostrarConteudo(indice){

    const conteudo =
        document.getElementById("conteudoExtra");

    conteudo.innerHTML = `

        <h3>${conteudos[indice].titulo}</h3>

        <p>
            ${conteudos[indice].texto.replace(/\n/g,"<br>")}
        </p>

    `;
}
