import axios from "axios";

import {
  GETALLCOUNTRIES,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  ALLFILTERS,
  GETSEASONS,
} from "./constants";

export const getCountries = () => {
  return async (dispatch) => {
    let allCountries = await axios.get(
      `${process.env.API_ENDPOINT}/countries`
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
      `${process.env.API_ENDPOINT}/activity`,
      // "https://piapicountries.herokuapp.com/activity",
      payload
    );
    return response.data;
  };
};

export const getCountryDetail = (payload) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${process.env.API_ENDPOINT}/countries/${payload}`
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
      `${process.env.API_ENDPOINT}/activity`
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
      `${process.env.API_ENDPOINT}/seasons`
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
        `${process.env.API_ENDPOINT}/countries?name=${payload.countrySearch}`
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
