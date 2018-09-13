import React from 'react';
import { Header } from '../index';


const withPublicRoot = ComposedComponent => class PublicRoot extends React.Component {
  render() {
    const {
      authenticated, backend, activeMenu, changeMenu, logout,
    } = this.props;
    return (
        <React.Fragment>
          <Header
          backend={backend}
          activeMenu={activeMenu}
          changeMenu={changeMenu}
          isAuthenticated={authenticated}
          logout={logout}
          />
          <main className="App-content">
            <ComposedComponent />
          </main>
        </React.Fragment>
    );
  }
};

export default withPublicRoot;
