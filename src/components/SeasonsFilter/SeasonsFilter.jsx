import React from "react";
import {useSelector } from "react-redux";


//Importacion de estilos
import styles from './SeasonsFilter.module.css';

const SeasonFilter = ({ setCurrentPage, setFilterState, filterState }) => {


  const allSeasons = useSelector((state) => state.seasons);

  //Funcion para ejecutar el filtrado por Actividad

  const handleFilterSeason = (event) => {
    console.log('evento season filter', event.target.id)
    setFilterState({...filterState, season:event.target.value})
    setCurrentPage(1);
    event.preventDefault();
  };

  return (
    <div className={styles.filterSeason}>
      {/* Filtrado por Actividad */}

      <h4>Filtrado por Temporada</h4>
      <div className={styles.selectSeason}>
        <select onChange={(e) => handleFilterSeason(e)}>
          <option key={"seasonFilterAll"} value="All">
            All Countries
          </option>
          {allSeasons &&
            allSeasons.map((elem) => {
              return (
                <option key={"seasonsFilter" + elem.name} value={elem.id}>
                  {elem.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default SeasonFilter;
