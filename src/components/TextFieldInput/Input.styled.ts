import styled from 'styled-components';


export const InputContainer = styled.div`
  position: relative;
  width: 200px;
  margin: 20px 0;
`;

export const Input = styled.input`
  text-overflow: ellipsis;
`;

export const InputPlaceholder = styled.label`
  ${Input}:valid:not(:focus) ~ & {
    opacity: 0;
  }
`;
