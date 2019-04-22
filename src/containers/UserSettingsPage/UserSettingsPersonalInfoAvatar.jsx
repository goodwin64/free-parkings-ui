import React from 'react';

import ImagesService from '../../services/Images.service';
import * as styled from './UserSettingsPersonalInfoAvatar.styled';
import Button from '../../components/Button/Button';


const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

function UserSettingsPersonalInfoAvatar(props) {
  const [draftAvatarUrlImage, setDraftAvatarUrlImage] = React.useState(props.user.avatarUrl);
  const [draftAvatarUrlInput, setDraftAvatarUrlInput] = React.useState('');
  const [errorWithAvatar, setErrorWithAvatar] = React.useState('');

  const onAvatarUrlChange = (e) => {
    setErrorWithAvatar('');

    const url = e.target.value;
    if (url) {
      setDraftAvatarUrlImage(url);
    }
    setDraftAvatarUrlInput(url);
  };

  const onAvatarFileUpload = async (e) => {
    setErrorWithAvatar('');

    if (!e.target.files) {
      return;
    }

    if (e.target.files[0].size > MAX_AVATAR_SIZE) {
      setErrorWithAvatar('Exceeds limit 5 MB');
    }

    const imageBase64 = await ImagesService.getBase64(e.target.files[0]);
    if (imageBase64) {
      setDraftAvatarUrlImage(imageBase64);
    }
  };

  const onAvatarSave = () => {
    props.updateAvatar(draftAvatarUrlImage);
  };

  return (
    <styled.Container>
      <styled.UserAvatarInputContainer>
        <styled.ChangeAvatarInputFile
          type="file"
          id="avatar-file"
          onChange={onAvatarFileUpload}
          accept="image/*"
        />
        <styled.UserCurrentAvatarLabel
          htmlFor="avatar-file"
        >
          <styled.UserCurrentAvatar
            src={draftAvatarUrlImage}
            alt="draft avatar is broken"
          />
          <styled.UploadFileTooltip>upload</styled.UploadFileTooltip>
        </styled.UserCurrentAvatarLabel>
        <styled.UserCurrentAvatarError>{errorWithAvatar}</styled.UserCurrentAvatarError>
      </styled.UserAvatarInputContainer>

      <styled.UserAvatarInputContainer>
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

        <styled.InputContainer>
          <Button
            onClick={onAvatarSave}
            disabled={props.user.avatarUrl === draftAvatarUrlImage}
          >
            Save
          </Button>
        </styled.InputContainer>
      </styled.UserAvatarInputContainer>
    </styled.Container>
  );
}

export default UserSettingsPersonalInfoAvatar;
