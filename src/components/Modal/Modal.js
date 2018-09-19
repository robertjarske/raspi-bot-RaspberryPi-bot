import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();
    this.killModal = this.killModal.bind(this);
    this.handleIconKillModal = this.handleIconKillModal.bind(this);
  }

  killModal(e) {
    if (this.props.closeModal) {
      this.props.closeModal(e, e.target.contains(this.modalRef));
    }
  }

  handleIconKillModal(e) {
    e.stopPropagation();

    if (this.props.closeModal) this.props.closeModal(null, true);
  }

  render() {
    const { children } = this.props;
    return (
    <div ref={(modalRef) => { this.modalRef = modalRef; }}
    onClick={this.killModal}
    className="modal-wrapper"
    >
      <div className="modal">
        {children}
        <span onClick={this.handleIconKillModal} className="close-modal">X</span>
      </div>
    </div>
    );
  }
}

export default Modal;
