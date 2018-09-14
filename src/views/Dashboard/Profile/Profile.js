import React from 'react';
import './Profile.css';

const Profile = ({ ...props }) => {
  console.log(props);
  return (
    <div className="profile">
      {props.user.avatar
        ? <div>
          <div className="profile-img" style={{
            background: `url('${props.user.avatar}')`,
          }}>
          </div>
          <h4>{props.user.name}</h4>
        </div> : ''}
    </div>
  );
};
export default Profile;
