import App from './app';

let $body = $('body');

$('main').imagesLoaded({ background: true })
  .done( ( instance ) => {
    setTimeout(() => {
      $body.removeClass('loading');
    },200);
  });

new App();
