import React from 'react';
import { connect } from 'react-redux';
import { requestAlive, requestMakeAvailable, requestRobot } from '../../../redux/robots/actions';
import { Loader, Stream } from '../../../components';
import './WatchSession.css';

const mapStateToProps = state => ({
  robots: state.robots,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestAlive: robot => dispatch(requestAlive(robot)),
  requestMakeAvailable: id => dispatch(requestMakeAvailable(id)),
  requestRobot: id => dispatch(requestRobot(id)),
});

class WatchSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robotId: this.props.location.pathname.slice(56),
    };
  }

  componentDidMount() {
    this.props.requestRobot(this.state.robotId);
  }

  render() {
    const { robot } = this.props.robots;
    console.log(this.state.robotId);
    if (!robot) return <Loader />;

    return (
      <div className="session">
          <Stream robot={robot} robotId={robot._id} socket={this.socket}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchSession);
