import React from 'react';
import Modal from 'react-modal';
import Login from './login';
import Signup from './signup';
import { values } from 'lodash';
import SongShow from '../song/song_show';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, authRoute: '' };
    this.openSignUp = this.openSignUp.bind(this);
    this.openSignIn = this.openSignIn.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    this.props.fetchSongs({ query: 'display' });
  }

  componentWillReceiveProps() {
    if (Object.keys(this.props.songs).length > 10) {
      this.props.fetchSongs({ query: 'display' });
    }
  }

  openSignIn(e) {
    e.preventDefault();

    this.setState({ isOpen: true, authRoute: 'signin' });
  }

  openSignUp(e) {
    e.preventDefault();

    this.setState({ isOpen: true, authRoute: 'signup' });
  }

  closeModal(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.setState({ isOpen: false, authRoute: '' });
  }

  render() {
    let authRoute;
    if (this.state.authRoute === 'signin') {
      authRoute = <Login errors={this.props.errors} login={this.props.login}/>;
    } else {
      authRoute = <Signup errors={this.props.errors}
        signup={this.props.signup}
        login = {this.props.login}/>;
    }

    let songs = [];
    if (this.props.songs.order !== undefined) {
      this.props.songs.order.forEach( id => {
        if (this.props.songs[id] !== undefined) {
          songs.push(this.props.songs[id]);
        }
      });
    }
    songs = songs.map( (song,idx) => (
      <SongShow home={true}
        openSignIn={this.openSignIn}
        song={song}
        key={idx} />
    ));

    return (
      <div className='homepage'>
        <Modal overlayClassName="homepage-modal-overlay"
          className='homepage-modal'
          onRequestClose={this.closeModal}
          isOpen={this.state.isOpen}
          contentLabel="Modal">
            {authRoute}
        </Modal>
        <main className='homepage-info'>
          <div className='homepage-overlay'>
          </div>
          <header>
            <div className='homepage-logo'></div>
            <ul>
              <li>
                <button onClick={this.openSignIn} className='login'>Sign in</button>
              </li>
              <li>
                <button onClick={this.openSignUp} className='signup'>Create Account</button>
              </li>
            </ul>
          </header>
          <div className='homepage-description'>
            <h1>Connect on Vibe</h1>
            <span>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</span>
          </div>
          <span className='homepage-scroll'></span>
        </main>
        <section className="homepage-bottom">
          <input className="song-search" placeholder='Search for artists, bands, tracks'>

          </input>
          <h1>Here's what's trending in the Vibe Community</h1>
          <ul className='homepage-songs'>
            {songs}
          </ul>
        </section>
        <footer className="author">
          <div className="author">
            <figure className="github">
              <a href="https://github.com/winber2"></a>
            </figure>
            <figure className="linkedin">
              <a href="https://www.linkedin.com/in/winber/"></a>
            </figure>
          </div>
        </footer>
      </div>
    );
  }
}

export default HomePage;
