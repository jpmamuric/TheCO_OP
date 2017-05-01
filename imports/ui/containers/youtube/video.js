import React, { Component } from 'react';
import { connect }          from 'react-redux';

import actions from '../../redux/actions/youtube';

import './video.css';

class YoutubeVideo extends Component {
  componentWillMount() {
    this.props.fetchVideos('digital media management luigi picarazzi');
  }

  render() {
    const { selectedVideo } = this.props;
    if(!selectedVideo) {
      return null;
    } else {
      console.log(selectedVideo)
    }
    return (
      <div className='video_container'>
        <iframe src="http://www.youtube.com/embed/W7qWa52k-nE" className='iframe'
          frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }
}

const mapStateToProps = ({ youtube }) => {
  const { selectedVideo } = youtube;
  return { selectedVideo };
}

export default connect(mapStateToProps, actions)(YoutubeVideo);
