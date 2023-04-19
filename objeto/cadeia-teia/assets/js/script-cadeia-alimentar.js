function proportionScale(largura, altura) {

  var larguraScreen = $(window).width();
  var alturaScreen = $(window).height();
  var proporcaoAltura = (alturaScreen * 100) / altura;
  var proporcaoLargura = (larguraScreen * 100) / largura;
  var proporcao, larguraAltura, larguraAlturaAuto;

  if (proporcaoAltura < proporcaoLargura) {
    larguraAltura = "height";
    larguraAlturaAuto = "width";
    proporcao = proporcaoAltura / 100;
  } else {
    larguraAltura = "width";
    larguraAlturaAuto = "height";
    proporcao = proporcaoLargura / 100;
  }

  console.log(proporcao, proporcaoAltura, proporcaoLargura)
  return [proporcao, larguraAltura, larguraAlturaAuto];
}

function resizeBodyCadeia() {

  var proporcao1920 = proportionScale(1920, 1080)[0];

  $("#app-cadeia-alimentar").css({
    "transform": "scale(" + proporcao1920 + ")",
    "transform-origin": "center center"
  });

  var proporcao900;

  if ($(window).width() < 992) {
    proporcao900 = proportionScale(900, 576)[0];
  } else {
    proporcao900 = 1;
  }
}

$(document).ready(function () {
  $("#intro").modal("show")
  resizeBodyCadeia()
  $(window).resize(function () {
    resizeBodyCadeia()
  })

});

// Aqui você adiciona ou remove os containers pra onde devem ir os cards
var containers = [
  // Container com os cards que serão realocados
  // Não mexer
  document.querySelector("#cardPile.dragallowed"),

  // Containers que irão receber os cards
  document.querySelector("#slot1"),
  document.querySelector('#slot2'),
  document.querySelector('#slot3'),
  document.querySelector('#slot4')
];
var audio = new Audio();
var erro = 0;

// Solução ao dragindrop
var scrollable = true;

var listener = function (e) {
  console.log(scrollable)
  if (!scrollable) {
    e.preventDefault();
  }
}

document.addEventListener('touchmove', listener, {
  passive: false
});

// Solução ao dragindrop
let fase1_count = 4;
dragula({
  containers: containers,
  revertOnSpill: true,
  direction: 'vertical',
  accepts: function (el, target, source, sibling) {
    return el.dataset.target == target.id;
  }
}).on('drag', function (el, source) {
  // On mobile this prevents the default page scrolling while dragging an item.
  scrollable = false;
}).on("drop", function (el, source) {
  scrollable = true;
  console.log(el.id)
  if (--fase1_count < 1) trocar_fase();
  $("#" + source.id).addClass("donttouchme");
  $("#feedbackPositivo .imgFeedback").attr("src", el.src)
  $("#feedbackPositivo .txtFeedback").text(fase1_feedbacks[el.id].positivo)
  $('#feedbackPositivo').modal('show')

  audio.setAttribute('src', 'assets/audios/acerto.mp3'); //change the source
  audio.load(); //load the new source
  audio.play(); //play

}).on("cancel", function (el) {
  scrollable = true;

  $("#feedbackNegativo .imgFeedback").attr("src", el.src)
  $("#feedbackNegativo .txtFeedback").text(fase1_feedbacks[el.id].negativo)
  $('#feedbackNegativo').modal('show')

  audio.setAttribute('src', 'assets/audios/erro.mp3'); //change the source
  audio.load(); //load the new source
  audio.play(); //play
});

function trocar_fase() {

  $("#cardPile").remove();
  $("#cardPile.dragallowed").remove();
  var cardpile = $("<div id=\"cardPile\" class=\"centralizar\"></div>")
  $("footer").append(cardpile)

  $("#fase1 .diretrizes").html("");

  var texto = $("<p></p>");
  texto.html("Muito bem! Você concluiu com sucesso a <strong>fase 1</strong>. <br><strong>Clique</strong> ou <strong>toque</strong> no botão abaixo para avançar para a próxima etapa.");
  $("#fase1 .diretrizes").append(texto);
  var botao_avancar = $('<button type="button" class="bto-avancar animate__infinite animate__delay-2s animate__animated animate__bounce">Próxima fase: <strong>Teia Alimentar</strong> <i class="fa-sharp fa-solid fa-arrow-right"></i></button>');
  $("#cardPile *").remove();
  $("#cardPile").append(botao_avancar);

}

const fase1_feedbacks = {
  "planta": {
    positivo: "Parabéns! Você demonstrou compreender que as plantas são organismos produtores, capazes de produzir seu próprio alimento por meio da fotossíntese, sendo fundamentais para a cadeia alimentar dos ecossistemas.​",
    negativo: "Lembre-se de que as plantas produzem seu próprio alimento a partir da luz solar e são fundamentais para a cadeia alimentar.​"
  },
  "caracol": {
    positivo: "Parabéns! Você demonstrou compreender que esse animal é um detritívoro, alimentando-se de restos de matéria orgânica em decomposição, desempenhando um importante papel na reciclagem de nutrientes nos ecossistemas.",
    negativo: "Lembre-se de que esse animal se alimenta de restos de matéria orgânica em decomposição, desempenhando um importante papel na reciclagem de nutrientes nos ecossistemas.​"
  },
  "peixe": {
    positivo: "Parabéns! Você demonstrou compreender que os peixes que se alimentam de outros seres vivos são consumidores, desempenhando um importante papel na cadeia alimentar dos ecossistemas aquáticos como predadores e consumidores de níveis tróficos mais elevados.​",
    negativo: "Lembre-se de que esse animal se alimenta de outros seres vivos, sendo um importante membro da cadeia alimentar dos ecossistemas aquáticos."
  },
  "ave": {
    positivo: "Parabéns! Você demonstrou compreender que as garças se alimentam de outros animais, como peixes e pequenos mamíferos, o que as coloca em um nível trófico mais elevado na cadeia alimentar dos ecossistemas em que vivem.​",
    negativo: "Lembre-se de que as garças, por se alimentarem de outros animais, como peixes e pequenos mamíferos, estão em um nível trófico mais elevado na cadeia alimentar dos ecossistemas em que vivem.​"
  }
}
const fase2_base = {
  "arvore": {
    feedback: "Quase lá! Lembre-se de que as árvores são os seres vivos que iniciam a cadeia alimentar e fornecem alimento para outros animais.​",
    nome: "Árvore"
  },
  "passaro": {
    feedback: "Quase acertou! Os pássaros podem se alimentar diretamente dos produtores ou de outros animais que já se alimentaram dos produtores.​",
    nome: "Pássaro"
  },
  "lagarta": {
    feedback: "Quase lá! As lagartas se alimentam diretamente dos seres vivos que iniciam a cadeia alimentar.​",
    nome: "Lagarta"
  },

  "sapo": {
    feedback: "Quase acertou! Os sapos se alimentam dos animais que estão em um nível trófico abaixo deles na cadeia alimentar.​",
    nome: "Sapo"
  },
  "serpente": {
    feedback: "Quase lá! As serpentes se alimentam de outros animais que estão em um nível trófico abaixo delas na cadeia alimentar.​",
    nome: "Serpente"
  },
  "ave_de_rapina": {
    feedback: "Quase acertou! As aves de rapina se alimentam de outros animais que estão em níveis tróficos mais baixos na cadeia alimentar.​",
    nome: "Ave de rapina"
  }

}

let etipo;
let bid;
$(function () {
  $("body").on("click", ".bto-avancar", function () {
    $("#fase1").fadeOut("fast", function () {
      $("#fase2").fadeIn("fast");
      $("#introfase2").modal("show")
    })

  });

  $(".bto-ask").click(function () {
    etipo = $(this).attr("data-tipo");
    bid = $(this).attr("id");
    $("#modalselecionar").modal("show")
  });

  $(".select").click(function () {
    verifica_resposta($(this).attr("data-nivelt"));

  });

  $(".bto-reiniciar").click(function () {
    window.location.href = "index.html";
  })

})

function traduzir(sigla) {
  console.log(sigla)
  let traducao;
  switch (sigla) {
    case "produtor":
      traducao = "Produtor";
      break;
    case "c1":
      traducao = "Consumidor primário";
      break;
    case "c2":
      traducao = "Consumidor secundário";
      break;
    case "c3":
      traducao = "Consumidor terciário";
      break;
    case "c4":
      traducao = "Consumidor quaternário";
      break;
  }
  console.log(traducao)
  return traducao;
}

const permissoes = {
  ave_de_rapina: ["c2", "c3", "c4"],
  serpente: ["c2", "c3"],
  sapo: ["c2"],
  lagarta: ["c1"],
  passaro: ["c1", "c2"],
  arvore: ["produtor"]
}

let inseridos = {
  ave_de_rapina: [],
  serpente: [],
  sapo: [],
  lagarta: [],
  passaro: [],
  arvore: []
}

function verifica_resposta(nivelt) {
  console.log(etipo, bid, nivelt, fase2_base[etipo].nome)
  //fase2_base
  //
  $("#modalselecionar").modal("hide");

  if (permissoes[etipo].indexOf(nivelt) != -1) {
    if (inseridos[etipo].indexOf(nivelt) == -1) {
      $("#" + bid).remove();
      $("." + bid).removeClass("d-none");
      $("." + bid).html(traduzir(nivelt))
      inseridos[etipo].push(nivelt);
      audio.setAttribute('src', 'assets/audios/acerto.mp3'); //change the source
      audio.load(); //load the new source
      audio.play(); //play
      fimdejogo();
    } else {
      $("#fase2_feedbackNegativo .txtFeedback").html("Ops! Você já inclui este nível trófico <br>para: <strong>" + fase2_base[etipo].nome + "</strong>.");
      $("#fase2_feedbackNegativo").modal("show")
      audio.setAttribute('src', 'assets/audios/erro.mp3'); //change the source
      audio.load(); //load the new source
      audio.play(); //play
    }
  } else {
    $("#fase2_feedbackNegativo .txtFeedback").text(fase2_base[etipo].feedback);
    $("#fase2_feedbackNegativo").modal("show")
    audio.setAttribute('src', 'assets/audios/erro.mp3'); //change the source
    audio.load(); //load the new source
    audio.play(); //play

  }

}
let contador = 0;

function fimdejogo() {
  if (contador >= 9) {
    $("#fimdejogo").modal("show");
    $(".bto-reiniciar").removeClass("d-none");
    $(".bto-ajuda").addClass("d-none");
    $(".diretrizes p").html("Comece de novo, clicando no botão <strong>Reiniciar</strong>")
  } else {
    contador++;
  }
}