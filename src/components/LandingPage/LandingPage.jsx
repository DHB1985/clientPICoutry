import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  useEffect } from "react";
import { getCountries } from "../../redux/actions";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div className={styles.landingPage}>
      <h1>Bienvenidos</h1>
      <Link to="/home">
        <button className={styles.buttonLanding + " " + styles.type3}>
          Ingresar
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
