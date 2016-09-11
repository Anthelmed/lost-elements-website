import 'gsap';

const mainSectionLength = 7;
const chapterSectionLength = 4;
const sectionName = ['home', 'narration', 'teaser', 'concept-a', 'concept-b', 'demo', 'team',
  'chapter-wind', 'chapter-earth', 'chapter-water', 'chapter-sun',
  'chapter-water-platform-1', 'chapter-water-platform-2', 'chapter-water-platform-3', 'chapter-water-sum-up'];

class Ascensor {
  constructor() {
    this.ascensor = null;
    this.init();
  }

  /////
  //Init
  /////

  init() {
    let hash = window.location.hash.split("#")[window.location.hash.split("#").length - 1];
    let sectionIndex = sectionName.indexOf(hash) || 0;

    this.ascensor = $('main').ascensor({
      ascensorFloorName: sectionName,
      childType: 'section',
      width: '100vw',
      height: '100vh',
      direction: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[4,1],[4,2],[4,3],[4,4],[5,3],[6,3],[7,3],[8,3]],
      time: 500,
      wheelNavigation: true
    });

    this.ascensor.on("scrollStart", (e, floor) => {
      if(Number.isInteger(floor.to))
        this.handleScroll(floor.to);
    });

    this.ascensor.on("scrollEnd", (e, floor) => {
      if(floor.to == 1) {
        setInterval(() => {
          $('#narration p').toggleClass('hide');
        },6000);
      }
    });



    this.handleScroll(sectionIndex);
    this.handleButtonClick();
  }

  /////
  //Handlers
  /////

  handleButtonClick() {
    $('[data-scrollToDirection]').click( (event) => {
      let ascensorInstance = this.ascensor.data('ascensor');
      let direction = $(event.target).attr('data-scrollToDirection');

      ascensorInstance.scrollToDirection(direction);
    });

    $('[data-scrollToFloor]').click( (event) => {
      let ascensorInstance = this.ascensor.data('ascensor');
      let floorId = parseInt($(event.target).attr('data-scrollToFloor'));

      ascensorInstance.scrollToFloor(floorId);
    });
  }



  handleScroll(index) {
    let $main = $('#nav-side #main');
    let $chapter = $('#nav-side #chapter');

    if(index < 7) {
      index += 1;
      $main.show();
      $chapter.hide();
      this.scrollAnimation(index, $main, mainSectionLength);
    } else if (index > 10) {
      index -= 10;
      $chapter.show();
      $main.hide();
      this.scrollAnimation(index, $chapter, chapterSectionLength);
    } else {
      $main.hide();
      $chapter.hide();
    }
  }

  /////
  //Animation
  /////

  scrollAnimation(index, $selector, sectionLength) {
    let navSidePath = $selector.find('.path')[0];
    let navSidePathLength = navSidePath.getTotalLength();
    let progress = (navSidePathLength / sectionLength * (index + sectionLength));

    TweenMax.to($selector.find('.path'), 0.5, {
      strokeDasharray: navSidePathLength + ' ' + navSidePathLength,
      strokeDashoffset: progress
    });
  }
}

export default Ascensor;
