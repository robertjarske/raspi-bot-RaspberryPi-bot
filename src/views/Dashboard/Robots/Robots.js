import React from 'react';

const Robots = ({ ...props }) => {
  console.log(props);
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>This is Robots</div>
  );
};
export default Robots;
