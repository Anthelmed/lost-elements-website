import 'stylesheets/main.scss';

import 'gsap';
import 'imagesloaded';

class App {

  constructor() {
    this.start();
    this.sectionName = ['home', 'narration', 'teaser', 'concept-a', 'concept-b', 'demo', 'team']
  }

  start() {
    $(document).ready(() => {
      let hash = window.location.hash.split("#")[1];
      let sectionIndex = this.sectionName.indexOf(hash) || 0;

      console.log(hash);

      this.initAscensor();
      this.initParallax();
      this.handleScroll(sectionIndex);
      this.handleEmbedClick();
    });
  }

  /////
  //Initialisation
  /////

  initAscensor() {
    let ascensor = $('main').ascensor({
      ascensorFloorName: this.sectionName,
      childType: 'section',
      width: '100vw',
      height: '100vh',
      direction: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]],
      time: 700,
      wheelNavigation: true,
      wheelNavigationDelay: 20
    });

    ascensor.on("scrollStart", (e, floor) => {
      this.handleScroll(floor.to);
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
    $('.embed-responsive').on('click', (event) => {
      let $this = $(event.target);
      let iframe = $this.find('iframe')[0].contentWindow;

      $this.toggleClass('active');
      if($this.hasClass('active'))
        this.toggleVideo(iframe,'playVideo');
      else
        this.toggleVideo(iframe,'pauseVideo');
    });
  }

  handleScroll(index) {
    let navSidePath = $('#nav-side .path')[0];
    let navSidePathLength = navSidePath.getTotalLength();
    let sectionLength = $('section').length;
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
