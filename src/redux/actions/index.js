import axios from "axios";

import {
  GETALLCOUNTRIES,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  ALLFILTERS,
  GETSEASONS,
} from "./constants";

//const urlAPI = 'http://localhost:3001';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//const urlAPI = 'https://web-production-579e.up.railway.app';
export const getCountries = () => {
  console.log(`${API_BASE_URL}/countries`);
  return async (dispatch) => {
    let allCountries = await axios.get(
      //`https://picountriesapi.onrender.com/countries`
      //`https://web-production-579e.up.railway.app/countries`
      `${API_BASE_URL}/countries`
      // "https://piapicountries.herokuapp.com/countries"
    );
    return dispatch({
      type: GETALLCOUNTRIES,
      payload: allCountries.data,
    });
  };
};

export const postActivity = (payload) => {
  return async (dispatch) => {
    const response = await axios.post(
      //`https://picountriesapi.onrender.com/activity`,
      //`https://web-production-579e.up.railway.app/activity`,
      `${API_BASE_URL}/activity`,
      // "https://piapicountries.herokuapp.com/activity",
      payload
    );
    return response.data;
  };
};

export const getCountryDetail = (payload) => {
  return async (dispatch) => {
    const response = await axios.get(
      //`https://picountriesapi.onrender.com/countries/${payload}`
      //`https://web-production-579e.up.railway.app/countries/${payload}`
      `${API_BASE_URL}/countries/${payload}`
      // `https://piapicountries.herokuapp.com/countries/${payload}`
    );
    return dispatch({
      type: GETCOUNTRYDETAIL,
      payload: response.data,
    });
  };
};

export const getActivitiesList = () => {
  return async (dispatch) => {
    const response = await axios.get(
      //`https://picountriesapi.onrender.com/activity`
      //`https://web-production-579e.up.railway.app/activity`
      `${API_BASE_URL}/activity`
      // "https://piapicountries.herokuapp.com/activity"
    );
    return dispatch({
      type: GETACTIVITIES,
      payload: response.data,
    });
  };
};

export const getSeasonsList = () => {
  return async (dispatch) => {
    const response = await axios.get(
      //`https://picountriesapi.onrender.com/seasons`
      //`https://web-production-579e.up.railway.app/seasons`
      `${API_BASE_URL}/seasons`
      // "https://piapicountries.herokuapp.com/seasons"
    );
    console.log("actions get seasons list", response.data);
    return dispatch({
      type: GETSEASONS,
      payload: response.data,
    });
  };
};

export const allFilters = (payload) => {
  if (payload.countrySearch !== "") {
    return async (dispatch) => {
      const response = await axios.get(
        //`https://picountriesapi.onrender.com/countries?name=${payload.countrySearch}`
        //`https://web-production-579e.up.railway.app/countries?name=${payload.countrySearch}`
        `${API_BASE_URL}/countries?name=${payload.countrySearch}`
        // `https://piapicountries.herokuapp.com/countries?name=${payload.countrySearch}`
      );

      return dispatch({
        type: ALLFILTERS,
        payload: { response: response.data, condition: payload },
      });
    };
  } else {
    return {
      type: ALLFILTERS,
      payload: { response: "", condition: payload },
    };
  }
};
