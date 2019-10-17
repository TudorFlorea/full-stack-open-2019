import axios from "axios";

const apiKey = "WEATHERSTACK_API_KEY"; //replace with your own key
const baseUrl = "http://api.weatherstack.com";

const makeCityRequestUrl = city =>
  `${baseUrl}/current?access_key=${apiKey}&query=${city}`;

const getCityWeather = city => {
  const req = axios.get(makeCityRequestUrl(city));
  return req.then(res => res.data);
};

export default { getCityWeather };
