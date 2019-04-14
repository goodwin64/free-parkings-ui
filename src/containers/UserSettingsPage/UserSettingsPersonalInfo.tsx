import React from 'react';
import styled from 'styled-components';

import { UserAccountPageProps } from './UserSettingsPage';

const style = {
  aaa: styled.div`
    display: grid;
    grid: 20px auto / 1fr 2fr;
    grid-template:
      "header header"
      "image params"
    ;
    
    & > h3 {
      grid-area: header;
    }
    
    & > img {
      grid-area: image;
    }
    
    & > div {
      grid-area: params;
    }
`
};


export default function UserSettingsPersonalInfo(props: UserAccountPageProps) {
  const [draftAvatarUrl, setDraftAvatarUrl] = React.useState(props.user.avatarUrl);
  const [savedAvatarUrl, setSavedAvatarUrl] = React.useState(props.user.avatarUrl);
  const [username, setUsername] = React.useState(props.user.username);
  const [errorWithAvatar, setErrorWithAvatar] = React.useState('');

  const imgAvatarRef = React.useRef(null);
  // const inputAvatarRef = React.useRef(null);

  const onAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftAvatarUrl(e.target.value);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onNewAvatarUrlCheck = () => {
    fetch(draftAvatarUrl)
      .then((r) => r && r.url && setSavedAvatarUrl(r.url))
      .catch(() => setErrorWithAvatar('Invalid URL'))
  };

  return (
    <style.aaa>
      <h3>Profile picture</h3>
      <img
        src={savedAvatarUrl}
        alt=""
        ref={imgAvatarRef.current}
        width={240}
      />

      <div>
        <div>
          <label>
            <p>profile image</p>
            <input
              type="text"
              value={draftAvatarUrl}
              onChange={onAvatarUrlChange}
              onPaste={onNewAvatarUrlCheck}
              onBlur={onNewAvatarUrlCheck}
            />
          </label>
        </div>
        <button>update profile picture</button>
        <p>{errorWithAvatar}</p>

        <div>
          <label>
            <p>username:</p>
            <input type="text" value={username} onChange={onUsernameChange}/>
          </label>
        </div>
      </div>
    </style.aaa>
  );
}
