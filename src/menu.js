const sectionName = ['home', 'narration', 'teaser', 'concept', 'demo', 'team', 'chapters', ''].reverse();
const sectionFloor = [0, 1, 2, 3, 5, 6, 7, -1].reverse();

class Menu {
  constructor() {
    this.init();

    this.radiusSection = 290;
    this.radiusBullet = 230;
    this.widthSection = 450;
    this.heightSection = -90;
    this.widthBullet = 450;
    this.heightBullet = -50;
  }

  /////
  //Init
  /////

  init() {
    let $menu = $('#menu');

    for(let i in sectionName) {
      $('<button/>', {
        'class': 'button menu-section',
        'data-scrollToFloor': sectionFloor[i],
        'text': sectionName[i]
      }).appendTo($menu);

      $('<div/>', {
        'class': 'menu-bullet'
      }).appendTo($menu);
    }

    setTimeout(() => {
      this.distributeSections();
      this.distributeBullets();
    },500);


    $(window).resize( () => { this.handleResize() });
    $('#nav-main button').click( () => { this.openMenu()() });
    $('#menu button').click( () => { this.closeMenu() });
    $('#menu').click( () => { this.closeMenu() });
  }

  /////
  //Distrubute
  /////

  distributeSections() {
    let sections = $('.menu-section'),
      angle = 0,
      step = Math.PI / sections.length;

    sections.each( (index, value) => {
      let $target = $(value);
      let x = Math.round(this.widthSection/2 + this.radiusSection * Math.cos(angle) - $target.width()/2) + Math.round($(window).width() / 2 - this.widthSection/2);
      let y = Math.round(this.heightSection/2 + this.radiusSection * Math.sin(angle) - $target.height()/2);

      $target.css({
        left: x + 'px',
        top: y + 'px'
      });

      angle += step;
    });
  }

  distributeBullets() {
    let bullets = $('.menu-bullet'),
      angle = 0,
      step = Math.PI / bullets.length;

    bullets.each( (index, value) => {
      let $target = $(value);
      let x = Math.round(this.widthBullet/2 + this.radiusBullet * Math.cos(angle) - $target.width()/2) + Math.round($(window).width() / 2 - this.widthBullet/2);
      let y = Math.round(this.heightBullet/2 + this.radiusBullet * Math.sin(angle) - $target.height()/2);

      $target.css({
        left: x + 'px',
        top: y + 'px'
      });

      angle += step;
    });
  }

  /////
  //Open / Close menu
  /////

  openMenu() {
    $('body').addClass('menu-open');
  }

  closeMenu() {
    $('body').removeClass('menu-open');
  }

  /////
  //Handlers
  /////

  handleResize() {
    this.distributeSections();
    this.distributeBullets();
  }
}

export default Menu;