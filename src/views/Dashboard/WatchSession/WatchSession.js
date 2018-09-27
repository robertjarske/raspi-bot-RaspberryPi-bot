import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {
  requestAlive, requestMakeAvailable, requestRobot, requestClear,
} from '../../../redux/robots/actions';
import { Loader, Stream, Modal } from '../../../components';
import './WatchSession.css';

const mapStateToProps = state => ({
  robots: state.robots,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestAlive: robot => dispatch(requestAlive(robot)),
  requestMakeAvailable: id => dispatch(requestMakeAvailable(id)),
  requestRobot: id => dispatch(requestRobot(id)),
  requestClear: () => dispatch(requestClear()),
});

class WatchSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robotId: this.props.location.pathname.slice(24),
      streamEnded: false,
      modalOpen: false,
    };

    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.room = this.props.location.pathname.slice(24);
    this.toggleModal = this.toggleModal.bind(this);

    this.socket.on('connect', () => {
      this.socket.emit('room', this.room);
    });
  }

  componentDidMount() {
    this.props.requestRobot(this.state.robotId);
  }

  toggleModal(e, shouldToggle) {
    if (shouldToggle) {
      this.setState({
        modalOpen: !this.state.modalOpen,
      });
    }
  }

  componentWillUnmount() {
    this.props.requestClear();
  }

  render() {
    const { robot } = this.props.robots;
    const { streamEnded, modalOpen } = this.state;
    if (!robot) return <Loader />;

    this.socket.on('driver-left', () => {
      this.setState({
        streamEnded: true,
        modalOpen: true,
      });
    });

    return (
      <div className="session">
        {streamEnded && modalOpen
          ? <Modal closeModal={this.toggleModal}>
            <h3>Seems like the stream has ended....</h3>
            <p>Go do something else!</p>
          </Modal>
          : <Stream robot={robot} robotId={robot._id} socket={this.socket}/>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchSession);
