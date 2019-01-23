import * as React from 'react';
import trim from 'lodash/trim';

import { Place } from '../../interfaces/Place';
import * as styled from './Search.styled';


interface SearchDropdownProps {
  options: Place[];
  onPoiSearch: (searchQuery: string) => void;
  onSelectItem: (item: number) => void;
  onLatLonSearch: (lat: number, lon: number) => void;
}

interface SearchDropdownState {
  value: string,
}

class SearchDropdown extends React.Component<SearchDropdownProps, SearchDropdownState> {

  public state = {
    value: '',
  };

  private onKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    const key = event.which || event.keyCode;
    if (key === 13) {
      this.searchByLatLon();
    }
  };

  private onSelectItem = (index: number) => {
    this.setState({
      value: '',
    });

    this.props.onSelectItem(index);
  };

  private searchByLatLon = () => {
    // check whether LatLon was entered
    const latLonMatch = this.state.value.split(',').map(trim);
    if (latLonMatch
      && latLonMatch.length === 2
      && latLonMatch.every(Boolean)
    ) {
      const [lat = 0, lon = 0] = latLonMatch.map(Number);
      const isCorrectLat = lat >= -90 && lat <= 90;
      const isCorrectLon = lon >= -180 && lon <= 180;
      if (isCorrectLat && isCorrectLon) {
        this.props.onLatLonSearch(lat, lon);
        this.setState({
          value: '',
        });
      }
    }
  };

  private onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });

    if (event.target.value.length > 2) {
      this.props.onPoiSearch(event.target.value);
    }
  };

  public render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <styled.Container>
        <styled.Input
          onChange={this.onSearchInputChange}
          value={value}
          placeholder="Search by POI or LatLon"
          onKeyPress={this.onKeyPress}
          title="Lat: [-90..90], Lon: [-180..180]"
        />
        {
          value.length > 2 && options.length > 0 && (
            <styled.List>
              {
                options.map((el, index) => (
                  <styled.Item
                    key={index}
                    onClick={() => this.onSelectItem(index)}
                  >
                    {el.name}
                  </styled.Item>
                ))
              }
            </styled.List>
          )
        }
      </styled.Container>
    );
  }
}

export default SearchDropdown;
