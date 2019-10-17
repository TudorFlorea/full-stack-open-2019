import axios from "axios";

const allCountriesRequestUrl = "https://restcountries.eu/rest/v2/all";

const getAllCountries = () => {
  const req = axios.get(allCountriesRequestUrl);
  return req.then(res => res.data);
};

export default { getAllCountries };
