import React from 'react';
import { connect } from 'react-redux';
import {
  requestUsers, requestUserCreate, requestUserDelete, requestAdminUserUpdate, requestSearch,
} from '../../../redux/user/actions';
import { Loader, Modal } from '../../../components';
import { Button, Input } from '../../../elements';
import './Admin.css';

const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestUsers: () => dispatch(requestUsers()),
  requestUserCreate: userData => dispatch(requestUserCreate(userData)),
  requestUserDelete: userData => dispatch(requestUserDelete(userData)),
  requestAdminUserUpdate: userData => dispatch(requestAdminUserUpdate(userData)),
  requestSearch: query => dispatch(requestSearch(query)),
});

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: {},
      modalOpen: false,
      name: '',
      username: '',
      email: '',
      password: '',
      query: '',

    };

    this.handleUserModalClick = this.handleUserModalClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.userUpdate = this.userUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

  componentDidMount() {
    this.props.requestUsers();
  }

  handleUserModalClick(user) {
    this.setState({
      activeCard: user,
    });

    this.toggleModal(null, true);
  }

  toggleModal(e, shouldToggle) {
    if (shouldToggle) {
      if (this.state.modalOpen) {
        this.setState({
          activeCard: {}, name: '', username: '', email: '', password: '',
        });
      }

      this.setState({
        modalOpen: !this.state.modalOpen,
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createNewUser() {
    this.props.requestUserCreate({
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });

    this.toggleModal(null, true);
  }

  deleteUser(user) {
    this.props.requestUserDelete(user);
  }

  userUpdate() {
    const userData = {
      id: this.state.activeCard._id,
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

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

    this.props.requestAdminUserUpdate(userData);

    this.toggleModal(null, true);
  }

  sendSearch() {
    return this.props.requestSearch(this.state.query);
  }

  handleSearch(e) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({
      query: e.target.value,
    }, () => {
      this.timer = setTimeout(() => { this.sendSearch(); }, 1000);
    });
  }


  render() {
    const { users } = this.props.user;
    const { isFetching } = this.props;
    const { activeCard } = this.state;

    if (isFetching) {
      return (
        <Loader />
      );
    }

    return (
      <div style={{ width: '100%' }}>
        {this.state.modalOpen
          ? <Modal closeModal={this.toggleModal}>
              {this.state.activeCard.name
                ? <div>
                  <div className="admin-user-thumbnail" style={{ backgroundImage: `url('${activeCard.thumbnail}')` }}></div>
                  <form>
                    <h3 style={{ width: '300px' }}>Update user information</h3>
                    <p style={{ width: '300px' }}>Only fill out the fields you wish to update</p>
                    <label htmlFor="name">Name</label>
                    <Input name="name" type="text" onChange={e => this.handleChange(e)} value={this.state.name} placeholder={activeCard.name}/>
                    <label htmlFor="username">Username</label>
                    <Input name="username" type="text" onChange={e => this.handleChange(e)} value={this.state.username} placeholder={activeCard.username}/>
                    <label htmlFor="email">Email</label>
                    <Input name="email" type="email" onChange={e => this.handleChange(e)} value={this.state.email} placeholder={activeCard.email}/>
                    <label htmlFor="password">Password</label>
                    <Input name="password" type="password" onChange={e => this.handleChange(e)} value={this.state.password} placeholder='Password...'/>
                    <Button onClick={this.userUpdate} type="button">Submit</Button>
                  </form>
                </div>
                : <form>
                    <h4>Register a new user</h4>
                    <Input
                      onChange={this.handleChange}
                      value={this.state.name}
                      name="name"
                      type="text"
                      placeholder="Name..."
                    />
                    <Input
                      onChange={this.handleChange}
                      value={this.state.username}
                      name="username"
                      type="text"
                      placeholder="Username..."
                    />
                    <Input
                      onChange={this.handleChange}
                      value={this.state.email}
                      name="email"
                      type="email"
                      placeholder="Email..."
                    />
                    <Input
                      onChange={this.handleChange}
                      value={this.state.password}
                      name="password"
                      type="password"
                      placeholder="Password..."
                      />
                    <Button onClick={this.createNewUser} type="button">Create Account</Button>
                  </form>
                }
              </Modal> : ''}
        <div className="admin">
        <input onChange={e => this.handleSearch(e)} value={this.state.query} className="admin-search" type="text" name="search" placeholder="Search for a user..." />
          {users.map((user, i) => (
            <div className="user-container" key={i}>
              <div className="card" onClick={() => this.handleUserModalClick(user)}>
                <div className="admin-user-thumbnail" style={{ backgroundImage: `url('${user.thumbnail}')` }}></div>
                <h4>
                  {user.name} / {user.username}
                </h4>
                {user.admin ? <p className="admin-indicator">Admin</p> : ''}
                <p>{user.email}</p>
                </div>
                <Button onClick={() => this.deleteUser(user)} appearance="danger">Delete User</Button>
            </div>
          ))}

        </div>
        <Button onClick={() => this.toggleModal(null, true)}>Add New User</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
