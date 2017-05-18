import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { icon: 'assets/play-button.png' };
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let audio = this.props.audio;
    if (this.props.audio.isPlaying) {
      audio.player.play();
      this.setState({ icon: 'assets/pause-button.png' });
    } else {
      audio.player.pause();
      this.setState({ icon: 'assets/play-button.png' });
    }
  }

  componentDidMount() {
    let player = this.refs.audioPlayer;
    let audio = this.props.audio;
    audio.player = player;
    this.props.receivePlayer(audio);
  }

  togglePlay() {
    let audio = this.props.audio;
    let player = audio.player;

    if (audio.isPlaying) {
      audio.isPlaying = false;
      this.setState({ icon: 'assets/pause-button.png' });
    } else {
      audio.isPlaying = true;
      this.setState({ icon: 'assets/play-button.png' });
    }

    this.props.receiveAudio(audio);
  }

  render() {
    let song = this.props.audio.song || { track_url: '' };
    return (
      <footer id="music-player">
        <div className="inner">
          <audio ref='audioPlayer' className="player" src={song.track_url} autoPlay/>

          <div className="controls">
            <img className="previous" src="assets/back-button.png"></img>
            <img onClick={this.togglePlay} className="play-pause" src={this.state.icon}></img>
            <img className="next" src="assets/skip-button.png"></img>
          </div>

          <div className="play-bar">
            <span id="time">0:00</span>
              <div className="bar-box">
                <div className="bar-bg">
                  <div className="progress"></div>
                </div>
              </div>
            <span id="total-time">0:00</span>
          </div>

         <div className="song-content">

            <div className="user-info">

              <div className="img-wrapper">
                <a className='user-info' />
              </div>

              <div className="song-info">
                <span className="artist">Artist Name</span>
                <span className="song">Song Name</span>
              </div>
            </div>

          </div>
        </div>
      </footer>
    );
  }
}

export default ProgressBar;
