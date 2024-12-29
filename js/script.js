jQuery(function ($) {

  const ROOT_URL = 'https://jupiter.wonser.ru';

  const pageTitleText = 'Юпитер';

  const menu = [

    {

      text: 'Главная страница',

      url: 'home.html',

      isFinished: true,

    },

    {

      text: 'Каталог',

      url: 'catalog.html',

      isFinished: true,

    },

    {

      text: 'Карточка товара',

      url: 'product.html',

      isFinished: true,

    },

    {

      text: 'Корзина',

      url: 'cart.html',

      isFinished: true,

    },

    {

      text: 'Доставка и оплата',

      url: 'delivery.html',

      isFinished: true,

    },

    {

      text: 'Акции',

      url: 'actions.html',

      isFinished: true,

    },

    {

      text: 'О компания',

      url: 'about.html',

      isFinished: true,

    },

    {

      text: 'Контакты',

      url: 'contacts.html',

      isFinished: true,

    },

    {

      text: 'Избранное',

      url: 'favorite.html',

      isFinished: true,

    },

    {

      text: 'Вопросы и ответы',

      url: 'faq.html',

      isFinished: true,

    },

    {

      text: 'Новости и статьи',

      url: 'news.html',

      isFinished: true,

    },

    {

      text: 'Карточка статьи',

      url: 'post.html',

      isFinished: true,

    },

    {

      text: '404',

      url: '404.html',

      isFinished: true,

    },

    {

      text: 'Страница поиска',

      url: 'search.html',

      isFinished: true,

    },

  ];



  const menuInnerHtml = menu

    .map(

      (item) =>

        `

        <li class="pages__item">

          <a href="${

            ROOT_URL + '/' + item.url

          }" target="_blank" class="pages__url ${

          !item.isFinished ? 'pages__url--in-progress' : ''

        }">

            ${item.text}

          </a>

        </li>

      `

    )

    .join('');



  $('.page-head__title').text(pageTitleText);

  $('.pages__list').html(menuInnerHtml);



  let totalSlides = $('.pages__url').length;

  let doneSlides = $('.pages__url:not(.pages__url--in-progress)').length;

  // doneSlides = 20;

  let slideProgress = Math.round((doneSlides / totalSlides) * 100);



  if (slideProgress >= 20) {

    $('.progress-text-js').text('Дорогу осилит идущий.');

  }



  if (slideProgress >= 40) {

    $('.progress-text-js').text(

      'Чтобы дождаться конца, нужно пройти начало и середину.'

    );

  }



  if (slideProgress >= 60) {

    $('.progress-text-js').text('Мы уже почти закончили.');

  }



  if (slideProgress >= 80) {

    $('.progress-text-js').text(

      'Для того, чтобы началось что-то новое, что-то должно закончиться.'

    );

  }



  if (slideProgress == 100) {

    $('.fixed-progress').addClass('fixed-progress--done');

    $('.progress-bar__fill').addClass('progress-bar__fill--yum');

    $('.progress-text-js').text('Ну всё, товарищи! Фенита ля комедия!');

    $('.status-js').text('Завершён');

  }



  $('.progress-bar__fill').width(slideProgress + '%');

  $('.progress-numbers-js').text(slideProgress + '%');

});

