import Axios from "axios";
const customAxios = Axios.create();
// const spinPin = () => {
//   const pin = document.querySelectorAll("div[title='pin']")[0];
//   console.log(pin);
//   const aniPin = pin.animate([{ transform: "rotate(360deg)" }], {
//     duration: 100,
//     iterations: Infinity,
//   });
//   console.log("히");
//   return aniPin;
// };

customAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
customAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default customAxios;
