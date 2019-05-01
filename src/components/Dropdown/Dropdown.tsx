import React from 'react';
import PropTypes from 'prop-types';

import * as styled from './Dropdown.styled';


interface DropdownProps {
  value?: string,
  options: string[],
  onChange: (option: string) => void,
}

function Dropdown(props: DropdownProps) {
  const [searchInputValue, setSearchInputValue] = React.useState(props.value || '');
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setSearchInputValue(props.value || '');
  }, [props.value]);

  const renderOption = (option: string) => {
    const searchString = searchInputValue.toLowerCase().trim();
    const optionString = option.toLowerCase().trim();
    const isShown = searchInputValue.length === 0 || optionString.includes(searchString);

    return (
      <li
        key={option}
        onMouseDown={() => { props.onChange(option); }}
        className={isShown ? '' : 'closed'}
      >
        {option}
      </li>
    );
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const openDropdown = () => { setIsOpen(true); };
  const closeDropdown = () => { setIsOpen(false); };
  const clearSearch = () => { setSearchInputValue(''); };

  return (
    <styled.Form>
      <styled.InputChosenValue
        type="text"
        value={searchInputValue}
        placeholder="Type to filter"
        onChange={onInputChange}
        className={isOpen ? 'open' : ''}
        onFocus={openDropdown}
        onBlur={closeDropdown}
      />
      <styled.ValueList
        className={isOpen ? 'open' : ''}
      >
        {props.options.map(renderOption)}
      </styled.ValueList>
      <styled.ClearButton onClick={clearSearch}>×</styled.ClearButton>
    </styled.Form>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Dropdown.defaultProps = {
  options: [],
  value: '',
};

export default Dropdown;
