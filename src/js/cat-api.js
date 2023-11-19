

import axios from "axios";

const URL = 'https://api.thecatapi.com/v1';


  axios.defaults.headers.common['x-api-key'] =
    'live_nldcvANMnVwtnxtG7sE4b17GDerjR7djzUQGXVhpz0QkZQHdTVtMGDHUbvkLqY17';



export function fetchBreeds() {
 
  return axios.get(`${URL}/breeds`)
    .then(response => response.data)
    .catch(error => { throw error }
    );
}

export function fetchCatByBreed(breedId) {
 
  return axios
    .get(`${URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}