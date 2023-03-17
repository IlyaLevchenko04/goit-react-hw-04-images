import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      return this.props.handleLargeImage();
    }
  };

  onBakcdropClick = e => {
    if (e.currentTarget === e.target) {
      return this.props.handleLargeImage();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.onBakcdropClick}>
        <div className="modal">
          <img src={this.props.imageInfo} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleLargeImage: PropTypes.func.isRequired,
  imageInfo: PropTypes.string.isRequired,
};
