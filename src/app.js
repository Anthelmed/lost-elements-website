import 'stylesheets/main.scss';

import 'gsap';
import 'imagesloaded';

class App {

  constructor() {
    this.start();
    this.sectionName = ['home', 'narration', 'teaser', 'concept-a', 'concept-b', 'demo', 'team',
      'chapter-wind', 'chapter-earth', 'chapter-water', 'chapter-sun',
      'chapter-water-platform-1', 'chapter-water-platform-2', 'chapter-water-platform-3', 'chapter-water-sum-up'];
    this.ascensor = null;
  }

  start() {
    $(document).ready(() => {
      let hash = window.location.hash.split("#")[1];
      let sectionIndex = this.sectionName.indexOf(hash) || 0;

      this.initAscensor();
      this.initParallax();
      this.handleScroll(sectionIndex);
      this.handleEmbedClick();
      this.handleButtonClick();
    });
  }

  /////
  //Initialisation
  /////

  initAscensor() {
    this.ascensor = $('main').ascensor({
      ascensorFloorName: this.sectionName,
      childType: 'section',
      width: '100vw',
      height: '100vh',
      direction: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[4,1],[4,2],[4,3],[4,4],[5,3],[6,3],[7,3],[8,3]],
      time: 700,
      wheelNavigation: true,
      wheelNavigationDelay: 20
    });

    this.ascensor.on("scrollStart", (e, floor) => {
      let index = floor.to;

      if(index < 7) {
        $('#nav-side').show();
        this.handleScroll(index);
      } else {
        $('#nav-side').hide();
      }

    });
  }

  initParallax() {
    let $parallax = $('[id^="parallax-"]');

    $parallax.parallax();
  }

  /////
  //Handlers
  /////

  handleEmbedClick() {
    $('.embed-responsive').click( (event) => {
      let $this = $(event.target);
      let iframe = $this.find('iframe')[0].contentWindow;

      $this.toggleClass('active');
      if($this.hasClass('active'))
        this.toggleVideo(iframe,'playVideo');
      else
        this.toggleVideo(iframe,'pauseVideo');
    });
  }

  handleButtonClick() {
    $('[data-scrollToDirection]').click( (event) => {
      let ascensorInstance = this.ascensor.data('ascensor');
      let direction = $(event.target).attr('data-scrollToDirection');

      ascensorInstance.scrollToDirection(direction);
    });
  }

  handleScroll(index) {
    let navSidePath = $('#nav-side .path')[0];
    let navSidePathLength = navSidePath.getTotalLength();
    let sectionLength = $('.section').length;
    let progress = (navSidePathLength / sectionLength * (index + sectionLength + 1));

    TweenMax.to("#nav-side .path", 0.7, {
      strokeDasharray: navSidePathLength + ' ' + navSidePathLength,
      strokeDashoffset: progress
    });
  }

  /////
  //Other
  /////

  toggleVideo(iframe, func) {
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
  }
}

export default App;
