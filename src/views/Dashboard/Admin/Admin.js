import React from 'react';

const Admin = ({ ...props }) => {
  console.log(props);
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>This is Admin</div>
  );
};
export default Admin;
