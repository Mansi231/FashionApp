import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '@env';

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    "Cache-Control":"public, max-age=86400"
  }
});

API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token')
    if (token) config.headers.Authorization = 'Bearer ' + JSON.parse(token)
    return config
  },
)

// API.interceptors.response.use(

//   response => {
//     // Do something before response is sent
//     return response;
//   },
//   error => {
//     // Do something with response error
//     if (error?.toJSON()?.message === 'Network Error') {
//       if (!process.env.openedAlert) {
//         process.env.openedAlert = true;
//       }
//     }
//     else if (error.response && error.response.status === 401) {
//       // Redirect to the login page
      
//       navigationRef.dispatch(
//         CommonActions.navigate({
//           name: 'CreateAccountScreen',
//         })
//       );
//       AsyncStorage.clear();
//     }

//     else {
//       console.log(
//         !error?.response?.data
//           ? error
//           : [error.response.status, error.response.data],
//       );
//     }
//     return Promise.reject(error);
//   },
// );

export default API


