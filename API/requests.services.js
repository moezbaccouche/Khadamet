const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/requests/';
const DEV_BASE_URL = 'http://192.168.1.7:3000/requests/';

export const addNewRequest = async (request) => {
  try {
    const response = await fetch(DEV_BASE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getPendingRequestsForProfessional = async (professionalId) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}pending/${professionalId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
