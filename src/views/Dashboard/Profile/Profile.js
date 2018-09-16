import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from '../../../elements';
import { requestUserUpdate } from '../../../redux/user/actions';
import './Profile.css';

const mapDispatchToProps = dispatch => ({
  requestUserUpdate: userData => dispatch(requestUserUpdate(userData)),
});


class Profile extends React.Component {
  constructor({ ...props }) {
    super(...props);
    this.state = {
      id: '',
      name: '',
      username: '',
      email: '',
      password: '',
    };

    this.userUpdate = this.userUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  userUpdate() {
    const userData = this.state;

    if (userData.name === '') {
      delete userData.name;
    }
    if (userData.username === '') {
      delete userData.username;
    }

    if (userData.email === '') {
      delete userData.email;
    }

    if (userData.password === '') {
      delete userData.password;
    }

    this.props.requestUserUpdate(userData);
    this.setState({
      name: '',
      username: '',
      email: '',
      password: '',

    });
  }

  handleChange(e) {
    this.setState({
      id: this.props.user._id,
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
    <div className="profile-page">
      {this.props.user.avatar
        ? <div className="profile-container">
            <div className="profile-img-container">
              <div className="profile-img" style={{
                background: `url('${this.props.user.avatar}')`,
              }}>
              </div>
              <h3>{this.props.user.username.toUpperCase()}</h3>
            </div>
            <div className="profile-info">
            <form>
              <h3>Update your information</h3>
              <p>Only fill out the fields you wish to update</p>
              <label htmlFor="name">Name</label>
              <Input name="name" type="text" onChange={e => this.handleChange(e)} value={this.state.name} placeholder={this.props.user.name}/>
              <label htmlFor="username">Username</label>
              <Input name="username" type="text" onChange={e => this.handleChange(e)} value={this.state.username} placeholder={this.props.user.username}/>
              <label htmlFor="email">Email</label>
              <Input name="email" type="email" onChange={e => this.handleChange(e)} value={this.state.email} placeholder={this.props.user.email}/>
              <label htmlFor="password">Password</label>
              <Input name="password" type="password" onChange={e => this.handleChange(e)} value={this.state.password} placeholder='Password...'/>
              <Button onClick={this.userUpdate} type="button">Submit</Button>
            </form>
            </div>
        </div> : ''}
    </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(Profile);
