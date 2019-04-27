import React from 'react';

import ImagesService from '../../../services/Images.service';
import * as styled from './UserSettingsPersonalInfoAvatar.styled';
import * as settingsStyled from '../UserSettingsPage.styled';
import Button from '../../../components/Button/Button';
import Input from '../../../components/TextFieldInput/Input';


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
    <settingsStyled.AllSettingsContainer>
      <settingsStyled.AllSettingsHeader>Avatar</settingsStyled.AllSettingsHeader>
      <settingsStyled.AllSettingsDescription>Here you can change you profile picture</settingsStyled.AllSettingsDescription>
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
        <Input
          value={draftAvatarUrlInput}
          onChange={onAvatarUrlChange}
          placeholder="By existing URL"
        />

        <styled.InputContainer>
          <Button
            onClick={onAvatarSave}
            disabled={props.user.avatarUrl === draftAvatarUrlImage}
          >
            Save
          </Button>
        </styled.InputContainer>
      </styled.UserAvatarInputContainer>
    </settingsStyled.AllSettingsContainer>
  );
}

export default UserSettingsPersonalInfoAvatar;
