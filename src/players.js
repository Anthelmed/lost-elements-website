import YouTubePlayer from 'youtube-player';

const videoIds = ['rBAtqUzJgXA', 'WIGH5L2awA0'];
const stateNames = {
  '-1': 'unstarted',
  0: 'ended',
  1: 'playing',
  2: 'paused',
  3: 'buffering',
  5: 'video cued'
};

class Videos {

  constructor() {
    this.players = [];
    this.init();
  }

  /////
  //Init
  /////

  init() {
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.onYouTubeIframeAPIReady();
    this.handleClick();
  }

  /////
  //YouTubeIframeAPI
  /////

  onYouTubeIframeAPIReady() {
    for (let [key, item] of videoIds.entries()) {
      let player = YouTubePlayer('player-' + key, {
        videoId: item
      });

      player.on('stateChange', (event) => {

        if (!stateNames[event.data]) {
          throw new Error('Unknown state (' + event.data + ').');
        }

        if (stateNames[event.data] == stateNames[2]) {
          $('[id^="player-'+ key +'"]').parent('.embed-responsive').removeClass('active');
        }

        if (stateNames[event.data] == stateNames[3]) {
          $('[id^="player-'+ key +'"]').parent('.embed-responsive').addClass('active');
        }


      });

      this.players.push(player);
    }
  }

  stopVideo(player) {
    player.stopVideo();
  }

  playVideo(player) {
    player.playVideo();
  }

  /////
  //Handlers
  /////

  handleClick() {
    $('.embed-responsive').click( (event) => {
      let $this = $(event.target);
      let playerId = $this.find('iframe').attr('id').substring(7);

      if(!$this.hasClass('active')) {
        $this.addClass('active');
        this.playVideo(this.players[playerId]);
      }
    });
  }
}


export default Videos;
