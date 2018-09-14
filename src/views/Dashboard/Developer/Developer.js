import React from 'react';

const Developer = ({ ...props }) => {
  console.log(props);
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>This is Developer</div>
  );
};
export default Developer;
