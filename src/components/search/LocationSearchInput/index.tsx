import React, { useContext, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Suggestion } from '@/components/search/LocationSearchInput/types';
import { StateContext } from '@/context';
import styles from '../index.module.css';

const LocationSearchInput = () => {
  const [address, setAddress] = useState('');
  const { state, actions } = useContext(StateContext);

  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const newState = { ...state };

        newState.mapCenter = [latLng.lat, latLng.lng];
        newState.userCoordinates.coords = {
          latitude: latLng.lat,
          longitude: latLng.lng,
        };
        newState.selectedCity.id = 1;
        newState.cities = undefined;

        actions.setAllState(newState);
      })
      .catch((error) => console.error('Error', error));
  };

  const suggestionsHTML = (
    suggestion: Suggestion,
    getSuggestionItemProps: Function,
  ) => {
    const className = suggestion.active
      ? styles.suggestionItemActive
      : styles.suggestionItem;

    return (
      <div
        {...getSuggestionItemProps(suggestion, { className })}
        key={suggestion.index}
      >
        <span>{suggestion.description}</span>
      </div>
    );
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      debounce={500}
      shouldFetchSuggestions={!!address && address.length >= 2}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Type an address or name of a place ...',
              className: styles.input,
            })}
          />
          <div className={styles.autocompleteDropdownContainer}>
            {loading && <div className={styles.suggestionItem}>Loading...</div>}
            {suggestions?.map((suggestion) =>
              suggestionsHTML(suggestion, getSuggestionItemProps),
            )}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
