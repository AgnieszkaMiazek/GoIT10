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
      const country = response[0];
      console.log(country);
      infoElement.innerHTML = `
        <div>
          name: ${country.name.official}
          capital: ${country.capital}
          population: ${country.population}
          flags: ${country.flags.svg}
          languages: ${Object.values(country.languages).join(", ")}
        </div>
      `;
    }
        <div>
      `;
      return;
    }
  }, DEBOUNCE_DELAY)
);
