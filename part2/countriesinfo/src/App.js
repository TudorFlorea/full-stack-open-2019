import React, { useState, useEffect } from "react";

import countriesService from "./services/contries";
import CountriesFilter from "./components/CountriesFilter";
import CountriesDetails from "./components/ContriesDetails";

const App = () => {
  const [countriesFilter, setCountriesFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const filteredCountries = countriesFilter
    ? countries.filter(
        country =>
          country.name.toLowerCase().search(countriesFilter.toLowerCase()) !==
          -1
      )
    : countries;

  useEffect(() => {
    countriesService.getAllCountries().then(data => {
      setCountries(data);
    });
  }, []);

  const handleCountriesFilterChange = event => {
    setCountriesFilter(event.target.value);
  };

  const changeCountriesFilter = filter => {
    setCountriesFilter(filter);
  };

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
