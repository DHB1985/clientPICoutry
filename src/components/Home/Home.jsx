import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivitiesList,
  allFilters,
  getSeasonsList,
} from "../../redux/actions";
import { Link } from "react-router-dom";

//Importacion de estilos
import styles from "./Home.module.css";

//Importación de componentes

import CountriesCards from "../Cards/Cards";
import CountrySort from "../Sort/Sort";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import SearchBar from "../SearchBar/SearchBar";
import ActivityFilter from "../ActivityFilter/ActivityFilter";
import SeasonFilter from "../SeasonsFilter/SeasonsFilter";
//Importacion del Paginado
import Paged from "../Paged/Paged";

import loadingIMG from "../../img/GIF_Mundo_Banderas.gif";

const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivitiesList());
    dispatch(getSeasonsList());
  }, [dispatch]);

  //Estado local para los filtros
  const [filterState, setFilterState] = useState({
    continent: [],
    sort: "Orden",
    activity: "All",
    countrySearch: "",
    season: "All"
  });

  useEffect(() => {
    setLoading((loading) => !loading);
    dispatch(allFilters(filterState));
  }, [filterState, dispatch]);

  const handleClick = (event) => {
    dispatch(getCountries());
    window.location.reload();
  }; //Funcion para resetear el State, para que vuelva a traer todos los países

  // Estados locales para setear el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 9;

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountries =
    !allCountries.length > 0
      ? []
      : allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //Final de las funciones de paginado

  //funcion loading

  const [loading, setLoading] = useState(false);
   useEffect(() => {
    setShow((show) => !show);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  return (
    <div className={styles.homeBox}>
      <div className={styles.homeTitleBox}>
        <div className={styles.buttonReset}>
          <button
            onClick={(event) => {
              handleClick(event);
            }}
            className={styles.button + " "+ styles.type3}
          >
            Volver a Cargar
          </button>
        </div>

        <div className={styles.titleH2}>
          <h2 style={{marginLeft:'56%'}}>Countries App</h2>
        </div>
        {/* SearchBar */}
        <div className={styles.searchCreateAct}>
          <SearchBar
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

          <Link to="/activity">
            <button  className={styles.button + " "+ styles.type3}>Crear actividad Turística</button>
          </Link>
        </div>
      </div>

      <div className={styles.homeContentBox}>
        <div className={styles.leftMenu}>
          {/* Filtrado por Continente */}

          <ContinentFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

          {/* Orden alfabetico o por poblacion ascendente o descendente */}

          <CountrySort
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
        </div>

        <div className={styles.dataCards}>
          {/* Área para el mapeo de las cartas */}

          {currentCountries.length === 0 && !show ? (
            <div className={styles.sinCoincidencias}>
              <img src={loadingIMG} alt="" />
            </div>
          ) : currentCountries.length > 0 ? (
            <CountriesCards currentCountries={currentCountries} />
          ) : (
            <div className={styles.sinCoincidencias}>
              <img src={loadingIMG} alt="" />
              <h4>"No hay coincidencias"</h4>
            </div>
          )}
          {/* Mapeo del Paginado */}

          <Paged
            countriesPerPage={countriesPerPage}
            allCountries={allCountries}
            paged={paged}
            key={"page" + currentPage}
            currentPage={currentPage}
          />
        </div>

        <div className={styles.filterActivity}>

          <SeasonFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />
          
          {/* Filtrado por Actividad */}

          <ActivityFilter
            setCurrentPage={setCurrentPage}
            setFilterState={setFilterState}
            filterState={filterState}
          />

        </div>
      </div>
    </div>
  );
};

export default Home;
