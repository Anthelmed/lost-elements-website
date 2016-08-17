import App from './app';

let $body = $('body');

$('main').imagesLoaded({ background: true })
  .done( ( instance ) => {
  	$('#loader').addClass('finish');
    setTimeout(() => {
      $body.removeClass('loading');
    },500);
  });

new App();
