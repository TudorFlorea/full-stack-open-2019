import React, { useState, useEffect } from "react";
import axios from "axios";

import CountriesFilter from "./components/CountriesFilter";
import CountriesDetails from "./components/ContriesDetails";

const App = () => {
  const [countriesFilter, setCountriesFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const filteredCountries = countriesFilter
    ? countries.filter(
        country => country.name.toLowerCase().search(countriesFilter) !== -1
      )
    : countries;

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleCountriesFilterChange = event => {
    setCountriesFilter(event.target.value);
  };

  const changeCountriesFilter = filter => {
    setCountriesFilter(filter);
  };

  console.log(countries);
  console.log(filteredCountries);
  console.log(countriesFilter);
  return (
    <div className="App">
      <CountriesFilter
        value={countriesFilter}
        onChange={handleCountriesFilterChange}
      />
      <CountriesDetails
        countries={filteredCountries}
        changeFilter={changeCountriesFilter}
      />
    </div>
  );
};

export default App;
