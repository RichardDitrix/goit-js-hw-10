import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_nldcvANMnVwtnxtG7sE4b17GDerjR7djzUQGXVhpz0QkZQHdTVtMGDHUbvkLqY17';
const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = refs;
selector.addEventListener('change', onSelectBreed);

const arrayBreedsId = [];

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      placeholder: 'Select a breed',
      data: arrayBreedsId,
    });
  })
  .catch(onError);


function onSelectBreed(e) {
  loader.classList.remove('is-hidden');
  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];

 
    loader.classList.add('is-hidden');

      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="500"/>
      </div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p></br>
      <p><b>Temperament:</b>${breeds[0].temperament}</p></div>`;
    })
    .catch(onError);
  
}

function onError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'left-top',
    width: '600px',
    timeout: 2000,
    backOverlay: 'blue',
    fontSize: '20px',
  });
}