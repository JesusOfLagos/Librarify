


import axios, { AxiosError, AxiosResponse } from 'axios';

// import axios from 'axios';

console.log('Hello World')

// Define the base URL and access token
const baseURL = 'http://studentportalbeta.unilag.edu.ng';
const accessToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXRyaWNObyI6IjIxMDIwNTA3OSIsIkNvbXBhbnkiOiJVTklMQUciLCJleHAiOjE2OTgyMzE3MTMsImlzcyI6Imh0dHBzOi8vc3R1ZGVudHBvcnRhbGJldGEudW5pbGFnLmVkdS5uZyIsImF1ZCI6Imh0dHBzOi8vc3R1ZGVudHBvcnRhbGJldGEudW5pbGFnLmVkdS5uZyJ9.H0tZ0VzNmwKjPw9esYOarsyd_g-ogYaZVe0ronCc3ts'; // Replace with your access token

// Create an Axios instance with common headers
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: accessToken,
    'Content-Type': 'application/json',
  },
});

// Function to make an HTTP GET request with retries
// async function makeGetRequestWithRetries(url: string, maxRetries: number): Promise<any> {
//   for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
//     try {
//       const response = await axiosInstance.get(url);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError;

//       if (axiosError.response) {
//         // Handle HTTP error responses (e.g., 4xx or 5xx errors)
//         console.error('HTTP error:', axiosError.response.status, axiosError.response.statusText);
//       } else if (axiosError.request) {
//         // Handle request error (e.g., no response from the server)
//         console.error('Request error:', axiosError.request);
//       } else {
//         // Handle other errors
//         console.error('Error:', axiosError.message);
//       }

//       if (retryCount < maxRetries) {
//         // Retry after a delay (e.g., exponential backoff)
//         const delayMilliseconds = Math.pow(2, retryCount) * 1000; // Exponential backoff
//         console.log(`Retrying in ${delayMilliseconds / 1000} seconds...`);
//         await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
//       } else {
//         // Maximum number of retries reached, handle as needed
//         console.error('Maximum retries reached. Failed to get data.');
//         throw axiosError;
//       }
//     }
//   }
// }


async function makeRequestWithRetries(
    url: string,
    maxRetries: number,
    requestMethod: any,
    requestData?: any
  ): Promise<any> {
    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
      try {
        let response: AxiosResponse;
  
        if (requestMethod === 'GET') {
          response = await axiosInstance.get(url);
        } else if (requestMethod === 'POST') {
          response = await axiosInstance.post(url, requestData);
        } else {
          // You can add support for other HTTP methods as needed
          throw new Error('Unsupported HTTP method');
        }
  
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
  
        if (axiosError.response) {
          // Handle HTTP error responses (e.g., 4xx or 5xx errors)
          console.error('HTTP error:', axiosError.response.status, axiosError.response.statusText);
        } else if (axiosError.request) {
          // Handle request error (e.g., no response from the server)
          console.error('Request error:', axiosError.request);
        } else {
          // Handle other errors
          console.error('Error:', axiosError.message);
        }
  
        if (retryCount < maxRetries) {
          // Retry after a delay (e.g., exponential backoff)
          const delayMilliseconds = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Retrying in ${delayMilliseconds / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
        } else {
          // Maximum number of retries reached, handle as needed
          console.error('Maximum retries reached. Failed to get data.');
          throw axiosError;
        }
      }
    }
  }




async function makePostRequestWithRetry() {
  const maxRetries = 5;

  for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
    try {
      const url = 'http://studentportalbeta.unilag.edu.ng/accomodation/saveAccommodationReservation';
      const body = {
        HallId: 'PROFESSOR SABURI BIOBAKU HALL',
      };

      const response = await axios.post(url, body);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error('HTTP error:', axiosError.response.status, axiosError.response.statusText);
      } else if (axiosError.request) {
        console.error('Request error:', axiosError.request);
      } else {
        console.error('Error:', axiosError.message);
      }

      if (retryCount < maxRetries) {
        const delayMilliseconds = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`Retrying in ${delayMilliseconds / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
      } else {
        console.error('Maximum retries reached. Failed to get data.');
        throw axiosError;
      }
    }
  }
}



// Function to initiate the ballot process
async function initiateBallot() {
  const maxRetries = 5; // Maximum number of retry attempts
  const accommodationHallsURL = '/accomodation/accomodationHalls';
  const confirmationURL = '/accomodation/accomodationConfirmation';
  const checks = '/accomodation/accommodationChecks'
  const save = '/accomodation/saveAccommodationReservation'

  try {
    const accommodationHallsData = await makeRequestWithRetries(accommodationHallsURL, maxRetries, 'GET');
    console.log('Accommodation Halls Data:', accommodationHallsData);

    const saveAccommodationHallsData = await makeRequestWithRetries(save, maxRetries, 'POST', {HallOfResidenceId: 'PROFESSOR SABURI BIOBAKU HALL'});
    console.log('Accommodation Halls Data:', saveAccommodationHallsData);

    const confirmationCheck = await makeRequestWithRetries(checks, maxRetries, 'GET');
    console.log('Confirmation Data:', confirmationCheck);

    const confirmationData = await makeRequestWithRetries(confirmationURL, maxRetries, 'GET');
    console.log('Confirmation Data:', confirmationData);

    // Add your logic to process the responses and perform the ballot
    // For example, you can analyze the data and make decisions based on availability, preferences, etc.
  } catch (error) {
    // Handle the final error here, e.g., logging, notifying, or taking alternative actions
    console.error('Failed to complete the ballot process:', error);
  }
}



// // Define the URL based on the provided format
// const baseUrl = 'https://studentportalbeta.unilag.edu.ng';
// const path = '/accomodation/saveAccommodationReservation';
// const url = `${baseUrl}${path}`;

// // Define a function to make the GET request
// async function saveAccommodationReservation(): Promise<void> {
//   try {
//     const response: AxiosResponse = await axios.get(url);

//     // Check if the response status code is 200 (OK)
//     if (response.status === 200) {
//       console.log('Successfully saved accommodation reservation.');
//       // You can add more logic here to handle the response data if needed.
//     } else {
//       console.error(`Failed to save accommodation reservation. Status code: ${response.status}`);
//       // You can handle error cases or retry here if necessary.
//     }
//   } catch (error) {
//     console.error('An error occurred while saving accommodation reservation:', error);
//     // You can handle various error cases here, such as network errors, timeouts, etc.
//   }
// }


// Call the function to initiate the ballot

initiateBallot();
// Call the function to make the POST request with retry


initiateBallot();


// Call the function to save the accommodation reservation
// saveAccommodationReservation();

