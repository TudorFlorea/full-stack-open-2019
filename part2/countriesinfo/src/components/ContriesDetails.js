import React from "react";

const CountriesDetails = ({ countries, changeFilter }) => {
  switch (true) {
    case countries.length > 10: {
      return <p>Too many matches, specify another filter</p>;
    }
    case countries.length > 1 && countries.length < 10: {
      return (
        <div>
          {countries.map(country => {
            return <p key={country.name}>{country.name}</p>;
          })}
        </div>
      );
    }
    case countries.length === 1: {
      return (
        <div>
          <h1>{countries[0].name}</h1>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h3>languages</h3>
          <ul>
            {countries[0].languages.map(lang => {
              return <li key={lang.name}>{lang.name}</li>;
            })}
          </ul>
          <img src={countries[0].flag} width="150px" />
        </div>
      );
    }
    default:
      return null;
  }
};

export default CountriesDetails;
