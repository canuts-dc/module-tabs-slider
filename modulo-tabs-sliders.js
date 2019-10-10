Ecomisi.module('tabs-healthy', ['vendor', function(){

  // Array de container-centers
  // Alterar cada container para algo mais verboso
  var containersArr = [
    $('.w-section__container-center[data-module="container"]'),
    $('.w-section__container-center[data-module="container2"]'),
    $('.w-section__container-center[data-module="container3"]'),
    $('.w-section__container-center[data-module="container4"]')
  ]

  // Escolher index da primeira tab
  var showTab = 0;
  
  var tabs = [];
  var tabClass = $('.tabslider');

  // Escolher active class
  var activeTabClass = 'active-tab';
  var activeContainerClass = 'active-container';

  // Precorrer containers e adicionar tab respetiva a array
  for(var i = 0; i < containersArr.length; i++){
    // Popular array de tabs e verificar se faltam containers
    if($(tabClass[i]).length === 0){
      console.error('missing container-center number', i);
    }
    tabs.push($(tabClass[i]));
    // Adicionar index da tab
    tabClass[i].setAttribute('data-slider-index', i);

    // Adicionar classes active à tab no index showTab
    if (i === showTab) {
      $(tabClass[i]).addClass(activeTabClass);
      $(containersArr[i]).addClass(activeContainerClass);
    }
  }


  // adicionar listeners para abrir e fechar 
  // add class or remove class
  tabs.map(function(tab){
    tab.on('click', function(e){
      // Definir index do botao carregado
      var index = e.target.getAttribute('data-slider-index')
      index = Number(index);

      // Adicionar/Remover classes
      //
      // Ler target com jquery
      var targetTab = $(e.target);
      // Verificar se a tab que foi carregada é a tab ativa
      if(targetTab.hasClass(activeTabClass) === false){
        // Se a tab carregada não for a tab ativa
        for(var i = 0; i < tabs.length; i++){
          // Precorrer as tabs e retirar as classes da que esteja ativa
          // retirar o index e remover a class active-container do container ativo
          if(tabs[i].hasClass(activeTabClass)){
            tabs[i].removeClass(activeTabClass)
            var j = Number(tabs[i].attr('data-slider-index'));
            containersArr[j].removeClass(activeContainerClass)
          }
        }
        // Adicionar classes ativas a tab e container
        targetTab.addClass(activeTabClass);
        containersArr[index].addClass(activeContainerClass)
      }
    })
  })


  // Criação do slider
  // Alterar classe de de iniciar slider
  var sliderTabs = new Swiper('.slider-tabs', {
    direction: 'horizontal',
    loop: false,
    slidesPerView:4,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
        centeredSlides: false,
        loop: false,
        spaceBetween: 5
      }
    }
  })

  return {
    slider: sliderTabs,
    tabs: tabs,
    containers: containersArr
  }
}]);
