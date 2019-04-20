import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import * as styled from './UserSettingsPersonalInfo.styled';
import ImagesService from '../../services/Images.service';
import Button from '../../components/Button/Button';
import './UserSettingsPersonalInfo.global.css';


export default function UserSettingsPersonalInfo(props: UserAccountPageProps) {
  const [draftAvatarUrlImage, setDraftAvatarUrlImage] = React.useState(props.user.avatarUrl);
  const [draftAvatarUrlInput, setDraftAvatarUrlInput] = React.useState('');
  const [username, setUsername] = React.useState(props.user.username);
  const [errorWithAvatar] = React.useState('');

  // const imgAvatarRef = React.useRef(null);

  const onAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setDraftAvatarUrlImage(url);
    }
    setDraftAvatarUrlInput(url);
  };

  const onAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const imageBase64 = await ImagesService.getBase64(e.target.files[0]);
    console.log('imageBase64', imageBase64);
    if (imageBase64) {
      // @ts-ignore
      setDraftAvatarUrlImage(imageBase64);
    }
  };

  const onAvatarSave = () => {
    console.log('onAvatarSave');
    props.updateAvatar(draftAvatarUrlImage);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <styled.Container>
      <styled.MenuHeader>Profile picture</styled.MenuHeader>

      <styled.ChangeAvatarInputFile
        type="file"
        id="avatar-file"
        onChange={onAvatarFileUpload}
        accept="image/*"
      />
      <styled.UserCurrentAvatarContainer
        htmlFor="avatar-file"
      >
        <styled.UserCurrentAvatar
          src={draftAvatarUrlImage}
          alt="draft avatar is broken"
          // ref={imgAvatarRef.current}
        />
        <styled.UploadFileTooltip>upload</styled.UploadFileTooltip>
      </styled.UserCurrentAvatarContainer>

      <styled.AvatarParametersContainer>
        <styled.InputContainer>
          <styled.ChangeAvatarInputUrl
            type="text"
            value={draftAvatarUrlInput.slice(0, 100)}
            onChange={onAvatarUrlChange}
            className="effect-20"
            required
          />
          <styled.ChangeAvatarInputPlaceholder>
            By existing URL
          </styled.ChangeAvatarInputPlaceholder>
          <span className="focus-border"><i/></span>
        </styled.InputContainer>
        <p>{errorWithAvatar}</p>

        <styled.InputContainer>
          <p>username:</p>
          <input type="text" value={username} onChange={onUsernameChange}/>
        </styled.InputContainer>

        <styled.InputContainer>
          <Button
            onClick={onAvatarSave}
            disabled={props.user.avatarUrl === draftAvatarUrlImage}
          >
            Save
          </Button>
        </styled.InputContainer>
      </styled.AvatarParametersContainer>
    </styled.Container>
  );
}
