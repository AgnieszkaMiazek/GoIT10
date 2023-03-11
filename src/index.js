import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputElement = document.querySelector('#search-box');
const listElement = document.querySelector('.country-list');
const infoElement = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputElement.addEventListener(
  'input',
  debounce(async event => {
    // reset
    infoElement.innerHTML = '';
    listElement.innerHTML = '';

    const response = await fetchCountries(event.target.value.trim());
    if (response.status === 404) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    }

    if (response.length > 10) {
      Notiflix.Notify.warning(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }

    if (response.length <= 10 && response.length >= 2) {
      response.forEach(item => {
        const el = document.createElement('li');
        console.log(item);
        el.innerHTML = `${item.name.common}`;
        listElement.appendChild(el);
      });
      return;
    }

    if (response.length === 1) {
      console.log(response[0]);
      infoElement.innerHTML = `
        <div>
         name: ${response[0].name.common}
         capital: ${response[0].capital.common}
         population: ${response[0].population.common}
         flags: ${response[0].flags.common}
         languages: ${response[0].languages.common}

        <div>
      `;
      return;
    }
  }, DEBOUNCE_DELAY)
);
