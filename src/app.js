import 'stylesheets/main.scss';

import 'imagesloaded';

import Players from './players';
import Ascensor from './ascensor';
import Parallax from './parallax';
import Menu from './menu';

class App {

  constructor() {
    this.init();
  }

  /////
  //Init
  /////

  init() {
    $(document).ready(() => {
      new Menu();
      new Players();
      new Parallax();
      new Ascensor();
    });
  }
}

export default App;
