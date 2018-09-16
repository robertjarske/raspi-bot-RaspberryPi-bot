import React from 'react';
import { connect } from 'react-redux';
import { requestUsers } from '../../../redux/user/actions';
import './Admin.css';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  requestUsers: () => dispatch(requestUsers()),
});

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.requestUsers();
  }

  render() {
    console.log(this.props);
    const { users, isFetching } = this.props.user;
    if (isFetching) {
      return (
        <div style={{
          width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black',
        }}>Fetching Users....</div>
      );
    }


    return (users.map((user, i) => (
      <div key={i} style={{
        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black',
      }}>{user.name}</div>
    ))
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
