jQuery(document).ready(function($) {

  // Открытие дополнительного меню в шапке
  $('.menu-item-has-children').on('click', function () {
    $(this).toggleClass('active');
    $(this).find('.sub-menu').toggleClass('open');
    $('.phone-wrap__head, .select__head').removeClass('active');
    $('.phone-wrap__inner, .select__dropdown').removeClass('open');
  });

  // Открытие дополнительных телефонов в шапке
  $('.phone-wrap__head').on('click', function () {
    $(this).toggleClass('active');
    $(this).parent().find('.phone-wrap__inner').toggleClass('open');
    $('.menu-item-has-children, .select__head').removeClass('active');
    $('.sub-menu, .select__dropdown').removeClass('open');
  });

  // Закрытие дополнительных окон по нажатию вне конкретных блоков
  $(document).click(function(){
    $('.menu-item-has-children, .phone-wrap__head, .select__head').removeClass('active');
    $('.sub-menu, .phone-wrap__inner, .select__dropdown').removeClass('open');
  });
  $(".menu-item-has-children, .phone-wrap__head, .select__head").click(function(e){
    e.stopPropagation();
  });

  // Инициализация слайдера на первом экране
  const heroSwiper = new Swiper('.hero-swiper', {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    pagination: {
      el: '.hero .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
  
  // Инициализация слайдера в блоке хиты продаж
  var hotSwiper = new Swiper('.hot__tab.active .hot-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
      nextEl: '.hot__tab.active .swiper-button-next',
      prevEl: '.hot__tab.active .swiper-button-prev',
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    }
  });

  // Инициализация слайдеров активного таба в блоке хиты продаж
  $('.hot__tab:not(.active)').hide();
  $(document).on("click", ".hot__button:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".hot")
        .find(".hot__tab")
        .removeClass('active')
        .hide()
        .eq($(this).index())
        .addClass('active')
        .fadeIn();
    
    hotSwiper = new Swiper('.hot__tab.active .hot-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      navigation: {
        nextEl: '.hot__tab.active .swiper-button-next',
        prevEl: '.hot__tab.active .swiper-button-prev',
      },
      breakpoints: {
        991: {
          slidesPerView: 4,
          spaceBetween: 24,
        }
      }
    });
  });

  // Скрыте значка плей в видео
  $('.about-video').on('click', function () {
    $(this).addClass('play');
  });

  // Инициализация слайдера в блоке акции
  var salesSwiper = new Swiper('.sales-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
      nextEl: '.sales-swiper .swiper-button-next',
      prevEl: '.sales-swiper .swiper-button-prev',
    },
    breakpoints: {
      991: {
        slidesPerView: 2,
        spaceBetween: 24,
      }
    }
  });

  // Открытие мобильного меню
  $('.menu-btn').on('click', function () {
    $(this).toggleClass('open');
    $('body').toggleClass('modal-open');
    $('.mobile-modal').toggleClass('open');
  });

  // Скрытие мобильного меню по клику на фон
  $('.mobile-modal__overlay').on('click', function () {
    $('.menu-btn').removeClass('open');
    $('body').removeClass('modal-open');
    $('.mobile-modal').removeClass('open');
  });

  // Показать/скрыть элемент фильтров
  $('.filter-block__title').on('click', function () {
    $(this).toggleClass('closed');
    $(this).closest('.filter-block').find('.filter-block__content').toggle(400);
  });


  // Инициализация рендж слайдеров в фильтрах
  if($('#price-slider').length) {
    let priceSlider = document.getElementById('price-slider');
    let priceMin = document.getElementById('pricemin');
    let priceMax = document.getElementById('pricemax');
    const rangePriceMin = $('#price-slider').data('min');
    const rangePriceMax = $('#price-slider').data('max');

    noUiSlider.create(priceSlider, {
      start: [rangePriceMin, rangePriceMax],
      connect: true,
      behaviour: 'drag',
      range: {
          'min': rangePriceMin,
          'max': rangePriceMax
      },
      format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: ''
      }),
    });

    priceSlider.noUiSlider.on('update', function (values, handle) {

      var value = values[handle];
      if (handle) {
        priceMax.value = value;
      } else {
        priceMin.value = value;
      }
    });

    priceMin.addEventListener('change', function () {
      priceSlider.noUiSlider.set([this.value, null]);
    });
    priceMax.addEventListener('change', function () {
      priceSlider.noUiSlider.set([null, this.value]);
    });
  }
  if($('#height-slider').length) {
    let heightSlider = document.getElementById('height-slider');
    let heightMin = document.getElementById('heightmin');
    let heightMax = document.getElementById('heightmax');
    const rangeHeightMin = $('#height-slider').data('min');
    const rangeHeightMax = $('#height-slider').data('max');

    noUiSlider.create(heightSlider, {
      start: [rangeHeightMin, rangeHeightMax],
      connect: true,
      behaviour: 'drag',
      range: {
          'min': rangeHeightMin,
          'max': rangeHeightMax
      },
      format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: ''
      }),
    });

    heightSlider.noUiSlider.on('update', function (values, handle) {

      var value = values[handle];

      if (handle) {
        heightMax.value = value;
      } else {
        heightMin.value = value;
      }
    });

    heightMin.addEventListener('change', function () {
      heightSlider.noUiSlider.set([this.value, null]);
    });
    heightMax.addEventListener('change', function () {
      heightSlider.noUiSlider.set([null, this.value]);
    });
  }

  // Активация модальных окон
  const productModal = new HystModal({
    linkAttributeName: "data-hystmodal",
  });


  // Слайдер галереи продукта
  var thumbSwiper = new Swiper(".swiper-thumb", {
    spaceBetween: 12,
    slidesPerView: 3,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".main-product .swiper-button-next",
      prevEl: ".main-product .swiper-button-prev",
    },
    breakpoints: {
      340: {
        slidesPerView: 4,
      },
      768: {
        direction: 'vertical',
        slidesPerView: 3,
      }
    }
  }); 
  var gallerySwiper = new Swiper(".swiper-gallery", {
    spaceBetween: 0,
    effect: "fade",
    thumbs: {
      swiper: thumbSwiper,
    },
  });

  // Активация лайтбоксов
  const lightbox = GLightbox({});

  // Изменение кол-ва продукта
  $(document).on('click', '.plus, .minus', function () {
		var qty = $(this).parent();
		var val = parseFloat(qty.find('input').val());
		var max = parseFloat(qty.find('input').attr('max'));
		var min = parseFloat(qty.find('input').attr('min'));
		var step = 1;

      if ($(this).is('.plus')) {
        if (max && max <= val) {
          qty.find('input').val(max);
        } else {
          qty.find('input').val(val + step);
        }
      } 
      
      if ($(this).is('.minus')) {
        if (min && min >= val) {
          qty.find('input').val(min);
        } else if (val > min) {
          qty.find('input').val(val - step);
        }
      }

      qty.find('input').trigger('change');
	});
  $('.count__input').on('change', function(){
    var value = parseFloat($(this).val());
    var min = parseFloat($(this).attr('min'));
    var max = parseFloat($(this).attr('max'));

    if(value > max) {
      $(this).val(max);
    }

    if(value < min) {
      $(this).val(min);
    }
  });

  // Выпадающие меню для селекта в продукте
  $('.select__head').on('click', function () {
    $(this).toggleClass('active');
    $(this).parent().find('.select__dropdown').toggleClass('open');
    $('.menu-item-has-children, .phone-wrap__head').removeClass('active');
    $('.sub-menu, .phone-wrap__inner').removeClass('open');
  });
  $(document).on("click", ".select__item:not(.active)", function () {
    $('.select__value').text($(this).text());
    $('.select__head').removeClass('active');
    $('.select__dropdown').removeClass('open');
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".select")
        .find("option")
        .eq($(this).index())
        .prop('selected', true);
  });

  // Табы в продукте
  $('.product-description__tab:not(.active)').hide();
  $(document).on("click", ".product-description__button:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
        .closest(".product-description")
        .find(".product-description__tab")
        .removeClass('active')
        .hide()
        .eq($(this).index())
        .addClass('active')
        .fadeIn();
  });

  // Табы в оформление заказа
  $(document).on("click", ".cart__payment:not(.active)", function () {
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
    if($('.cart__payment_delivery').hasClass('active')) {
      $('.cart-delivery').show(400);
    } else {
      $('.cart-delivery').hide(400);
    }
  });

  // Валидация чекбокса по принятию
  $("input[name=accept]").click(function() {
    var form = $(this).closest('form').find('.btn-submit');
    if ($(this).is(":checked")) {
      form.removeAttr("disabled");
    } else {
      form.attr("disabled", "disabled");
    }
  });

  // Аккардион
  $(document).on("click", ".faq-list__item", function (event) {
    $(this).siblings().removeClass("active").find('.faq-list__content').hide(400);
    $(this).toggleClass('active').find('.faq-list__content').toggle(400);
  });

  // Карта в контактах
  if($('#map').length) {
    var myPlacemark = "";
    var myMap = "";        
    ymaps.ready(function () {
      myMap = new ymaps.Map('map', {
          center: [59.9887660641145,30.43648499999996],
          zoom: 15
      }, {
          searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark([59.9887660641145,30.43648499999996], {
          hintContent: 'Санкт-Петербург, Волго-Донской пр. д.4. лит. Ж',
          balloonContent: 'Санкт-Петербург, Волго-Донской пр. д.4. лит. Ж'
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'assets/img/pin.svg',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-20, -20],
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom'); 

      if(window.matchMedia('(max-width: 991px)').matches){
        myMap.behaviors.disable('drag');
      }
      
    });
  }
 
  // Показать/скрыть окно фильтров на мобилке
  $('.filter-btn').on('click', function () {
    $('body').toggleClass('modal-open');
    $('.filter').toggleClass('open');
  });
  $('.filter__overlay').on('click', function () {
    $('body').removeClass('modal-open');
    $('.filter').removeClass('open');
  });

  // Маски для инпутов
  if($('#phone-input').length) {
    const element = document.getElementById('phone-input');
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(element, maskOptions);
  }
  if($('#phone-input2').length) {
    const element = document.getElementById('phone-input2');
    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(element, maskOptions);
  }

  // Карта для выбора адреса
  if($('#deliverymap').length) {
    var myPlacemark2 = "";
    var myMap2 = "";
    var address = ""; 
    ymaps.ready(function () {
      myMap2 = new ymaps.Map('deliverymap', {
          center: [59.9887660641145,30.43648499999996],
          zoom: 15
      }, {
          searchControlProvider: 'yandex#search'
      }),

      // Слушаем клик на карте.
      myMap2.events.add('click', function (e) {
      var coords = e.get('coords');

      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark2) {
          myPlacemark2.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
        myPlacemark2 = createPlacemark(coords);
        myMap2.geoObjects.add(myPlacemark2);
        // Слушаем событие окончания перетаскивания на метке.
        myPlacemark2.events.add('dragend', function () {
            getAddress(myPlacemark2.geometry.getCoordinates());
        });
      }
      getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
      return new ymaps.Placemark(coords, {
          iconCaption: 'поиск...'
      }, {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true
      });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
      myPlacemark2.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        address = firstGeoObject.getAddressLine();

        myPlacemark2.properties
          .set({
              // Формируем строку с данными об объекте.
              iconCaption: [
                  // Название населенного пункта или вышестоящее административно-территориальное образование.
                  firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                  // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                  firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
              ].filter(Boolean).join(', '),
              // В качестве контента балуна задаем строку с адресом объекта.
              balloonContent: firstGeoObject.getAddressLine(),
          });
        });

      }
    });

    $('.map-modal .main-btn').on('click', function () {
      $('#cart-delivery').val(address);
    });
  }

  // Показать/скрыть дополнительные фильтры
  $(".filter__load-more").on('click', function () {
    $('.filter-block_hidden').toggle(400);
    $(this).text(($(".filter__load-more").text() == 'Ещё') ? 'Скрыть' : 'Ещё');
  });
});
