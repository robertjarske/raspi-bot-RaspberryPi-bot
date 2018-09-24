import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestRobots, requestAlive, requestMakeUnavailable } from '../../../redux/robots/actions';
import { Loader, Modal } from '../../../components';
import { Button } from '../../../elements';
import './Robots.css';


const mapStateToProps = state => ({
  robots: state.robots,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestRobots: () => dispatch(requestRobots()),
  requestAlive: robot => dispatch(requestAlive(robot)),
  requestMakeUnavailable: id => dispatch(requestMakeUnavailable(id)),
});

class Robots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRobot: {},
      modalOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCreateSession = this.handleCreateSession.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.requestRobots();
    }, 5000);
    this.props.requestRobots();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.aliveTimer);
  }

  handleClick(robot) {
    this.aliveTimer = setInterval(() => {
      this.props.requestAlive(robot);
    }, 1000);
    this.setState({
      activeRobot: robot,
    });

    this.toggleModal(null, true);
  }


  toggleModal(e, shouldToggle) {
    if (shouldToggle) {
      if (this.state.modalOpen) {
        clearInterval(this.aliveTimer);
        this.setState({
          activeRobot: {},
        });
      }

      this.setState({
        modalOpen: !this.state.modalOpen,
      });
    }
  }

  handleCreateSession() {
    this.props.requestMakeUnavailable(this.state.activeRobot._id);
  }

  render() {
    const { activeRobot } = this.state;

    if (!this.props.robots.robots.length) {
      return <Loader />;
    }

    return (
      <div style={{ width: '100%' }}>
        {this.state.modalOpen
          ? <Modal closeModal={this.toggleModal}>
                <div>
                    <div className="status-container">
                      <h5 className="status-text">Status:</h5>
                      {activeRobot.isOnline
                        ? <div className="robot-available">
                          {activeRobot.isAvailable ? '' : <div className="robot-busy"></div>}
                        </div>
                        : <div className="robot-unavailable"></div>
                      }
                      </div>
                  <h3 style={{ width: '300px' }}>{activeRobot.name}</h3>
                  <p style={{ width: '300px' }}>{activeRobot.url}</p>
                  {activeRobot.isOnline
                    ? <div>
                      {activeRobot.isAvailable ? <Button><Link onClick={this.handleCreateSession} to={`/dashboard/session/${activeRobot._id}`}>Create Session</Link></Button> : <Button><Link to={`/dashboard/watchsession/${activeRobot._id}`}>Watch Session</Link></Button>}
                    </div>

                    : ''}

                </div>
              </Modal> : ''}
        <div className="robots">
        {this.props.robots.robots.map((robot, i) => (
          <div key={i}>
            <div className="robot-card" onClick={() => this.handleClick(robot)}>
              <h4>
                {robot.name.toUpperCase()}
              </h4>
              <p>{robot.url}</p>
          </div>
          </div>
        ))}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Robots);
