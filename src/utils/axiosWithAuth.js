import axios from 'axios';

const url =
  process.env.REACT_APP_API_URL ||
  'https://labspt12-express-groomer-f-api.herokuapp.com';

export const axiosWithAuth = () => {
  const oktaToken = JSON.parse(localStorage.getItem('okta-token-storage'));
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${oktaToken.idToken.value}`,
    },
  });
};
