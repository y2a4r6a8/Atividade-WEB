const story = {
    start: {
      text: "A Máquina do Mistério para em frente a uma mansão sombria. A noite está escura, e um uivo distante ecoa na floresta. Scooby e Salsicha tremem, mas Velma lidera o grupo até a porta principal. O que vocês farão?",
      options: [
        { text: "Abrir a porta da mansão", next: "mansion" },
        { text: "Explorar o jardim em busca de pistas", next: "garden" },
      ],
    },
    mansion: {
      text: "A porta range ao abrir, revelando um hall escuro e empoeirado. De repente, um lustre balança no teto. Scooby fareja algo suspeito. O que vocês farão?",
      options: [
        { text: "Subir as escadas", next: "upstairs" },
        { text: "Explorar a biblioteca no térreo", next: "library" },
      ],
    },
    garden: {
      text: "No jardim, as folhas secas estalam sob os pés. Pegadas misteriosas levam até um poço coberto de teias. Scooby fareja algo dentro. O que vocês farão?",
      options: [
        { text: "Olhar dentro do poço", next: "well" },
        { text: "Seguir as pegadas até a floresta", next: "forest" },
      ],
    },
    upstairs: {
      text: "No andar de cima, uma porta se abre sozinha, revelando uma sala cheia de retratos antigos. Um dos quadros tem olhos que parecem segui-los. Scooby late nervosamente. O que vocês farão?",
      options: [
        { text: "Investigar o quadro", next: "painting" },
        { text: "Abrir outra porta no corredor", next: "corridor" },
      ],
    },
    library: {
      text: "A biblioteca está cheia de livros antigos e estantes altas. Velma encontra um livro com uma capa estranhamente nova. Ao abrir, vocês ouvem um clique. Uma passagem secreta se revela!",
      options: [
        { text: "Entrar na passagem secreta", next: "secret_passage" },
        { text: "Ignorar e continuar explorando o térreo", next: "ground_floor" },
      ],
    },
    well: {
      text: "Dentro do poço, vocês encontram um amuleto antigo com símbolos estranhos. Velma acredita que ele é a chave para resolver o mistério!",
      options: [
        { text: "Voltar para a mansão", next: "mansion" },
        { text: "Seguir as pegadas até a floresta", next: "forest" },
      ],
    },
    forest: {
      text: "Na floresta, vocês encontram uma cabana abandonada com luzes piscando. Parece perigoso, mas talvez tenha pistas. O que vocês farão?",
      options: [
        { text: "Entrar na cabana", next: "cabin" },
        { text: "Voltar para a mansão", next: "mansion" },
      ],
    },
    painting: {
      text: "Ao tocar o quadro, ele gira, revelando uma sala secreta! No centro, está um cofre que parece conter algo importante. Scooby encontra um biscoito ao lado. O que vocês farão?",
      options: [
        { text: "Abrir o cofre", next: "vault" },
        { text: "Voltar ao corredor", next: "corridor" },
      ],
    },
    corridor: {
      text: "No final do corredor, vocês encontram uma janela que dá para o jardim. Do lado de fora, algo se mexe entre as árvores. Scooby e Salsicha decidem ficar para trás. O que vocês farão?",
      options: [
        { text: "Pular pela janela", next: "garden" },
        { text: "Voltar ao hall principal", next: "mansion" },
      ],
    },
    secret_passage: {
      text: "A passagem leva até uma sala subterrânea com um painel cheio de botões. Velma encontra uma alavanca que parece importante. O que vocês farão?",
      options: [
        { text: "Puxar a alavanca", next: "reveal_clue" },
        { text: "Explorar mais o subterrâneo", next: "subterranean" },
      ],
    },
    cabin: {
      text: "Dentro da cabana, um rádio antigo toca uma música assustadora. Scooby e Salsicha tropeçam em uma armadilha, mas conseguem se soltar. Eles encontram uma pista crucial: um mapa!",
      options: [
        { text: "Seguir o mapa", next: "map_route" },
        { text: "Voltar para a mansão", next: "mansion" },
      ],
    },
    vault: {
      text: "O cofre contém documentos que revelam o verdadeiro vilão: o zelador da mansão! Ele planejava assustar os visitantes para roubar um tesouro escondido. Vocês resolvem o mistério!",
      options: [],
    },
    reveal_clue: {
      text: "A alavanca abre uma parede falsa, revelando o vilão mascarado escondido. Ele tenta fugir, mas é capturado pela turma! Mistério resolvido!",
      options: [],
    },
    map_route: {
      text: "Seguindo o mapa, vocês encontram o tesouro perdido da mansão! O vilão aparece para tentar roubar, mas Fred prende ele com a ajuda de Scooby!",
      options: [],
    },
    subterranean: {
      text: "Enquanto exploram o subterrâneo, vocês encontram um sistema de túneis que leva até a floresta. Vocês sentem que estão chegando perto do vilão...",
      options: [
        { text: "Seguir os túneis", next: "forest" },
        { text: "Voltar para a passagem secreta", next: "secret_passage" },
      ],
    },
  };
  
  function saveProgress(step) {
    localStorage.setItem("lastStep", step);
  }
  
  function loadProgress() {
    return localStorage.getItem("lastStep") || "start";
  }
  
  function renderStory(step) {
    const container = document.getElementById("story-container");
    container.innerHTML = "";
  
    const currentStep = story[step];
    if (!currentStep) {
      container.innerHTML = "<p>Erro: passo não encontrado!</p>";
      return;
    }
  
    const textElement = document.createElement("p");
    textElement.textContent = currentStep.text;
    container.appendChild(textElement);
  
    if (currentStep.options && currentStep.options.length > 0) {
      currentStep.options.forEach((option) => {
        const link = document.createElement("a");
        link.href = `?step=${option.next}`;
        link.textContent = option.text;
  
        link.addEventListener("click", (e) => {
          e.preventDefault();
          saveProgress(option.next);
          renderStory(option.next);
        });
  
        container.appendChild(link);
      });
    } else {
      const restartLink = document.createElement("a");
      restartLink.href = "?step=start";
      restartLink.textContent = "Recomeçar a história";
      restartLink.addEventListener("click", (e) => {
        e.preventDefault();
        saveProgress("start");
        renderStory("start");
      });
      container.appendChild(restartLink);
    }
  }
  
  window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
    const step = params.get("step") || loadProgress();
    renderStory(step);
  });
  