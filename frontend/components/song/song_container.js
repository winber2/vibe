import { connect } from 'react-redux';
import { deleteSong } from '../../actions/song_actions';
import { receiveAudio } from '../../actions/audio_actions';
import Song from './song';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  audio: state.audio
});

const mapDispatchToProps = dispatch => ({
  receiveAudio: song => dispatch(receiveAudio(song)),
  deleteSong: id => dispatch(deleteSong(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song);
