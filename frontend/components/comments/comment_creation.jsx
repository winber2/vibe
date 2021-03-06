import React from 'react';
import FavoriteIconContainer from '../icons/favorite_container';
import RepostIconContainer from '../icons/repost_container';
import MoreOptionsContainer from '../icons/more_options_container';

class CommentCreation extends React.Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(e) {
    if (e.key === 'Enter' && e.target.value !== '') {
      let comment = {
        author_id: this.props.currentUser.id,
        song_id: this.props.song.id,
        body: e.target.value,
        user: this.props.currentUser
      };
      this.props.createComment(comment);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div className='comment-creation'>
        <div className='comment-input'>
          <img className='comment-user' src={this.props.currentUser.profile_image_url} />
          <input placeholder='Write a comment' onKeyPress={this.handleKey} className='comment-input'></input>
        </div>
        <ul className='comment-options'>
          <FavoriteIconContainer favoritable={this.props.song} />
          <RepostIconContainer song={this.props.song} />
          <MoreOptionsContainer song={this.props.song} />
        </ul>
      </div>
    );
  }
}

export default CommentCreation;
