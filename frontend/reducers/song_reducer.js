import { RECEIVE_SONGS, RECEIVE_SONG, REMOVE_SONG, APPEND_SONGS, RANDOM_SONGS, RANDOM_SONG, RECEIVE_REPOSTS } from "../actions/song_actions";
import merge from 'lodash/merge';

const _defaultState = {};

const SongReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SONG:
      newState[action.song.id] = action.song;
      if (newState.random !== undefined) {
        if (newState.random[action.song.id] !== undefined ) {
          newState.random[action.song.id] = action.song;
        }
      }
      return newState;

    case RECEIVE_SONGS:
      let random = newState.random;
      newState = action.songs;
      newState.random = random;
      return newState;

    case REMOVE_SONG:
      delete newState[action.song.id];
      return newState;

    case APPEND_SONGS:
      for (let key in action.songs) {
        if (key === 'order') {
          if (newState[key] === undefined) {
            newState[key] = action.songs[key];
          } else {
            newState[key] = newState[key].concat(action.songs[key]);
          }
        } else {
          newState[key] = action.songs[key];
        }
      }
      return newState;

    case RANDOM_SONG:
      newState.random[action.song.id] = action.song;
      if (newState[action.song.id] !== undefined) {
        newState[action.song.id] = action.song;
      }
      return newState;

    case RANDOM_SONGS:
      newState['random'] = action.songs;
      delete newState.random['order'];
      return newState;
      
    default:
      return state;
  }
};

export default SongReducer;
