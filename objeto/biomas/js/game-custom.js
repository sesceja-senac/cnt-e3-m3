

// Aqui você adiciona ou remove os containers pra onde devem ir os cards
var containers = [
  // Container com os cards que serão realocados
  // Não mexer
  document.querySelector("#cardPile"),

  // Containers que irão receber os cards
  document.querySelector("#slot-1"),
  document.querySelector('#slot-2'), 
  document.querySelector('#slot-3'),
  document.querySelector('#slot-4'),
  document.querySelector('#slot-5'),
  document.querySelector('#slot-6')
];
var audio = new Audio();
var erro = 0;

// Solução ao dragindrop
var scrollable = true;

var listener = function(e) {
  console.log(scrollable)
    if (! scrollable) {
        e.preventDefault();
    }
}

document.addEventListener('touchmove', listener, { passive:false });

// Solução ao dragindrop

dragula({
  containers: containers,
  revertOnSpill: true,
  direction: 'vertical',
  accepts: function (el, target, source, sibling) {
      return el.dataset.target == target.id; 
  }
}).on('drag', function(el, source) {
  // On mobile this prevents the default page scrolling while dragging an item.
  scrollable = false;
}).on("drop", function(el, source){
  scrollable = true;
  $(".imgModal").attr("src", feedbacks[el.id].thumb);
  $(".mapa-bolinha." + el.id).removeClass("d-none")
  $(".feedbackPositivoTxt").html(feedbacks[el.id].positivo);
  $('#bgmodal-acerto').modal('show')
      audio.setAttribute('src','objeto/biomas/audios/acerto.mp3'); //change the source
      audio.load(); //load the new source
      audio.play(); //play

  
}).on("cancel", function(el,source){
  scrollable = true;

      // Executa o áudio e a modal necessária
      // Também é possível fazer algum teste aqui caso necessário.
      $(".imgModal").attr("src", feedbacks[el.id].thumb);
      $(".feedbackNegativoTxt").html(feedbacks[el.id].negativo);
  $('#bgmodal-erro').modal('show')
      audio.setAttribute('src','objeto/biomas/audios/erro.mp3'); //change the source
      audio.load(); //load the new source
      audio.play(); //play

});

const feedbacks = {
  /*mandacaru*/      
  card1: { thumb: "objeto/biomas/thumb/mandacaru.jpg", id: "Mandacaru", positivo: "Parabéns. Você acertou! O mandacaru é uma cactácea nativa do Brasil, adaptada às condições climáticas do semiárido. Ele é facilmente encontrado no bioma Caatinga", negativo: "<i>Oops</i>, tente novamente! Dica: o mandacaru é uma cactácea nativa do Brasil, adaptada às condições climáticas do semiárido." },
  /*paubrasil*/       
  card2: { thumb: "objeto/biomas/thumb/pau-brasil.jpg", id: "Pau-brasil", positivo: "Parabéns. Você acertou! O pau-brasil é uma árvore nativa do Brasil e foi muito explorada pelos portugueses no período pré-colonial. Atualmente, é uma espécie em perigo de extinção.", negativo: "<i>Oops</i>, tente novamente! Dica: o pau-brasil é uma árvore nativa das florestas brasileiras. É encontrado em uma das regiões mais populosas do Brasil." },
  /*zorrilho*/        
  card3: { thumb: "objeto/biomas/thumb/zorrilho.jpg", id: "Zorrilho", positivo: "Parabéns. Você acertou! Frequentemente é chamado de gambá, mas isso é um engano. O zorrilho (<i>Conepatus</i> <i>chinga</i>) é um carnívoro, cuja espécie e mais semelhante à de animais como o furão", negativo: "<i>Oops</i>, tente novamente! Dica: os zorrilhos vivem em áreas abertas, principalmente em campos, e têm hábitos noturnos." },
  /*jaburu*/          
  card4: { thumb: "objeto/biomas/thumb/jaburu.jpg", id: "Jaburu (tuiuiú)", positivo: "Parabéns. Você acertou! O jaburu alimenta-se de peixes, moluscos, répteis, insetos e pequenos mamíferos. Ele também se alimenta de pescado morto, ajudando a evitar a putrefação dos peixes que morrem por falta de oxigênio nas épocas de seca.", negativo: "<i>Oops</i>, tente novamente! Dica: o hábitat do jaburu são as margens dos rios, em árvores esparsas. A fêmea forma seus ninhos no alto dessas árvores com ramos secos, com a ajuda do companheiro." },
  /*guaranazeiro*/    
  card5: { thumb: "objeto/biomas/thumb/guaranazeiro.jpg", id: "Guaranazeiro", positivo: "Parabéns. Você acertou! O guaranazeiro é uma espécie nativa da Amazônia, cujo uso foi consolidado por algumas etnias indígenas há séculos devido às suas propriedades estimulantes e medicinais.", negativo: "<i>Oops</i>, tente novamente! O guaranazeiro produz o fruto conhecido como guaraná. É uma espécie vegeta arbustiva e trepadeira da família das sapindáceas, cujo nome provém do termo indígena <i>varana</i>, que significa árvore que sobe apoiada em outra" },
  /*mico*/            
  card6: { thumb: "objeto/biomas/thumb/mico-leao-dourado.jpg", id: "Mico-leão-dourado", positivo: "Parabéns. Você acertou! O mico-leão-dourado é um animal carismático, que inclusive está estampado na nota de 20 reais. Já foi muito desejado como animal de estimação. O que é um grande problema na conservação da espécie, por ser altamente visado no tráfico ilegal de animais silvestres.", negativo: "<i>Oops</i>, tente novamente! Dica: o mico-leão-dourado é encontrado na região do Rio de Janeiro e no sul do Espírito Santo, em clima quente e úmido, como nos ambientes de floresta. Ele fica na copa das árvores" },
  /*araracaninde*/    
  card7: { thumb: "objeto/biomas/thumb/arara-caninde.jpg", id: "Arara-canindé", positivo: "Parabéns. Você acertou! A arara-canindé voa aos pares, em grupos de três indivíduos ou até em bandos maiores, com 30 indivíduos. Abrigam-se em poleiros para dormir e fazem grandes deslocamentos diários, indo do ponto de alimentação até o ponto de descanso e pernoite.", negativo: "<i>Oops</i>, tente novamente! Dica: a arara-canindé busca árvores altas para colocar seus ovos, então vive em um ambiente rico em árvores."},
  /*pequizeiro*/      
  card8: { thumb: "objeto/biomas/thumb/pequizeiro.jpg", id: "Pequizeiro", positivo: "Parabéns. Você acertou! O pequizeiro tem um fruto conhecido e apreciado na cozinha local, com sabor e cheiro característicos. Ele tem cor verde e, no seu interior, é possível observar a presença de um a quatro caroços amarelos, que são consumidos em pratos típicos como arroz com pequi e galinhada, além de serem utilizados para a produção de geleias, doces, ração e para a retirada de óleo.", negativo: "<i>Oops</i>, tente novamente! O pequizeiro tem como hábitat a savana tropical mais rica do mundo: abriga cerca de 5% de toda a diversidade do planeta. No seu bioma encontram-se muitas nascentes de rios que alimentam 8 das 12 regiões hidrográficas do país, com destaque para três: as bacias dos rios Araguaia/Tocantins, do rio São Francisco e do rio Paraná."},
  /*tatubola*/        
  card9: { thumb: "objeto/biomas/thumb/tatu-bola.jpg", id: "Tatu-bola-do-nordeste", positivo: "Parabéns. Você acertou! O tatu-bola-do-nordeste é a menor espécie brasileira de tatu conhecida, medindo cerca de 30 cm e pesando entre 1 kg e 1,8 kg. Já foi mascote da Copa do Mundo de 2014, no Brasil.", negativo: "<i>Oops</i>, tente novamente! Dica: espécie encontrada somente no Brasil, o tatu-bola-do-nordeste enfrenta grave ameaça da caça e destruição, e fragmentação do hábitat por fazendas, estradas e construção de parques eólicos."},
  /*capimforquilha*/  
  card10: { thumb: "objeto/biomas/thumb/capim-forquilha.jpg", id: "Capim-forquilha", positivo: "Parabéns. Você acertou! É rasteiro e forma densas coberturas do solo, podendo ser usado no paisagismo para a composição de gramados. O nome popular, forquilha, deve-se ao fato de que ao final de suas hastes florais se desenvolvem dois raminhos que têm o aspecto de uma forquilha.", negativo: "<i>Oops</i>, tente novamente! Dica: é uma gramínea muito comum e frequente nas pastagens. Ela se desenvolve muito bem em solos secos ou encharcados e em ambientes de baixa fertilidade. É também considerada uma espécie de forrageira, servindo como alimento para o gado."},
  /*loboguara*/       
  card11: { thumb: "objeto/biomas/thumb/lobo-guara.jpg", id: "Lobo-guará", positivo: "Parabéns. Você acertou! O lobo-guará não é uma raposa nem um lobo. É a única espécie do gênero <i>Chrysocyon</i> e provavelmente tem como espécie vivente mais semelhante a do cachorro-vinagre.", negativo: "<i>Oops</i>, tente novamente! Dica: a presença do lobo-guará ocorre em savanas e áreas abertas no centro do Brasil, Paraguai, Argentina e Bolívia."},
  /*aguapes*/         
  card12: { thumb: "objeto/biomas/thumb/aguapes.jpg", id: "Aguapés", positivo: "Parabéns. Você acertou! Os aguapés até recentemente eram vendidos como planta ornamental em lojas de jardinagem europeias, mas foi banida no continente por seu potencial nocivo ao meio ambiente.", negativo: "<i>Oops</i>, tente novamente! Dica: o aguapé é uma bonita planta aquática flutuante, com grandes folhas redondas. É típica de regiões alagadas"}
}

// document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive:false });