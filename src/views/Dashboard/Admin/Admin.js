import React from 'react';
import './Admin.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('get all users');
  }

  render() {
    console.log(this.props);
    return (
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black',
      }}>This is Admin</div>
    );
  }
}

export default Admin;
