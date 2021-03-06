import {
  sortedCountries,
  filterByActivity,
  filterByContinent,
  filterBySeason
} from "../../utils/Utils.jsx";
import {
  GETALLCOUNTRIES,
  POSTACTIVITY,
  GETCOUNTRYDETAIL,
  GETACTIVITIES,
  ALLFILTERS,
  GETSEASONS,
} from "../actions/constants";

const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: [],
  activitiesNamesId: [],
  seasons: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCOUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case ALLFILTERS:
      let countries =
      action.payload.condition.countrySearch === ""
      ? state.allCountries
      : action.payload.response;
      
      if (action.payload.condition.continent.length !== 0) {
        console.log('entre1')
        countries = filterByContinent(
          action.payload.condition.continent,
          countries
          );
        }
        if (action.payload.condition.activity !== "All") {
        console.log('entre2')

          countries = filterByActivity(
          action.payload.condition.activity,
          countries
          );
        }
        
        if (action.payload.condition.season !== "All") {
        console.log('entre3')

          countries = filterBySeason(
            action.payload.condition.season,
            countries
            );
          }
          
          if (action.payload.condition.sort !== "Orden") {
        console.log('entre4')

            countries = sortedCountries(action.payload.condition.sort, countries);
          }
          console.log('filtro pais searchdddsds',countries )
          
          return {
            ...state,
            countries: countries,
      };

    case POSTACTIVITY:
      return {
        ...state,
      };

    case GETCOUNTRYDETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    case GETACTIVITIES:
      let activitys;
      if (action.payload[0].name !== "No hay actividades guardadas") {
        activitys = action.payload.map((elem) => {
          return { name: elem.name, id: elem.id };
        });
      }
      return {
        ...state,
        activitiesNamesId: activitys,
      };

    case GETSEASONS:
      console.log('reducer seasonslist', action.payload)
      return {
        ...state,
        seasons: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
