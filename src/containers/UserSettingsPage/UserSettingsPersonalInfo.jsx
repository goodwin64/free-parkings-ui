import React from 'react';

export default function UserSettingsPersonalInfo(props) {
  return (
    <div>
      <h3>Profile picture</h3>
      <img src={props.user.avatarUrl} alt=""/>
      <label>
        profile image
        <input type="text" value={props.user.avatarUrl}/>
      </label>
      <button>update profile picture</button>

      <label>
        username:
        <input type="text" value={props.user.username}/>
      </label>
    </div>
  );
}
