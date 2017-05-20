import React from 'react';
import Dropzone from 'react-dropzone';
var superagent = require('superagent');

const IMAGE_URL = 	'https://api.cloudinary.com/v1_1/winber1/image/upload';
const UPLOAD_PRESET = 'cgbryuxc';

class SongEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      album: '',
      genre: '',
      description: '',
      release_date: '',
      author_id: '',
      image_url: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentWillReceiveProps() {
    let song = this.props.song;
    if (song !== undefined) {
      this.setState({
        id: song.id,
        title: song.title,
        album: song.album,
        genre: song.genre,
        description: song.description,
        release_date: song.release_date,
        author_id: song.user.id,
        image_url: { preview: song.image_url },
      })
    }
  }


  componentDidMount() {
    this.props.fetchSingleSong(this.props.match.params.songId);
  }

  toHome() {
    debugger;
    this.props.history.push('/stream');
  }

  update(prop) {
    return e => this.setState({ [prop]: e.target.value})
  }

  uploadImage(files) {
    this.setState({ image_url: files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();
    let imageFile = this.state.image_url
    let upload = this;
    let image = new FormData();

    if (imageFile.preview = this.props.song.image_url) {
      this.props.editSong(this.state).then(upload.props.history.push('/stream'));
      return;
    }

    image.append('file', imageFile);
    image.append('upload_preset', UPLOAD_PRESET)

    superagent.post(IMAGE_URL)
      .send(image)
      .end(function(err, res) {
        if (res.body.secure_url !== '') {
          upload.state.image_url = res.body.secure_url;
        }

        upload.props.editSong(upload.state).then(upload.props.history.push('/stream'));
      });
  }

  render() {
    return (
      <section className='upload-main'>
        <div className='upload-info' />
        <div className='upload-box active'>
          <ul>
            <h1>Edit Song</h1>
          </ul>
          <ul className='upload-song active'>
            <h1>Song info</h1>
            <ul className='upload-song-description'>
              <li className='upload-image-box'>
                <img src={this.state.image_url.preview} />
                <Dropzone onDrop={this.uploadImage} className='dropzone'>
                  <button className='upload-image'>Upload Image</button>
                </Dropzone>
              </li>
              <ul className='upload-song-info'>
                  Title
                  <input onChange={this.update('title')} value={this.state.title}></input>
                  Album
                  <input onChange={this.update('album')} value={this.state.album}></input>
                  <ul className='upload-song-detail'>
                <li>
                  Genre
                  <input onChange={this.update('genre')} value={this.state.genre}></input>
                </li>
                <li>
                  Release Date
                  <input onChange={this.update('release_date')} value={this.state.release_date} type='date'></input>
                </li>
              </ul>
              Description
              <textarea rows='6' onChange={this.update('description')} value={this.state.description}></textarea>
              </ul>
            </ul>
            <div className='upload-buttons'>
              <button onClick={this.toHome} className='login'>Cancel</button>
              <button onClick={this.handleSubmit} className='signup'>Save</button>
            </div>
          </ul>
        </div>
      </section>
    );
  }
}

export default SongEditForm;