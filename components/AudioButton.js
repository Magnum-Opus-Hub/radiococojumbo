import React, { Component } from "react";

class AudioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }

  onPlay = (event) => {
    this.setState({ playing: true });
  };
  onPause = (event) => {
    this.setState({ playing: false });
  };
  onEnded = (event) => {
    this.setState({ playing: false });
  };

  playAudio = () => {
    this.audioEl.play();
    const audio = this.audioEl;
    audio.addEventListener("play", this.onPlay);
    audio.addEventListener("pause", this.onPause);
  };

  pauseAudio = () => {
    this.audioEl.pause();
  };

  startAudio = () => {
    this.playAudio();
  };

  renderAudio = () => {
    const { url } = this.props;
    const { playing } = this.state;
    const notSupportedMsg =
      "Your browser does not support the <code>audio</code> element.";
    return (
      <>
        {!playing && (

          <button onClick={this.startAudio}>
            <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 fill-red-500"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clipRule="evenodd"
          />
        </svg></button>
        )}
        {playing && <button onClick={this.pauseAudio}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10 fill-red-500" fill="currentColor" id="pause"><path fillRule="evenodd" clipRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"></path></svg></button>}

        <audio
          src={url}
          ref={(ref) => {
            this.audioEl = ref;
          }}
        >
          {notSupportedMsg}
        </audio>
      </>
    );
  };

  render() {
    return this.renderAudio();
  }
}

export default AudioButton;
