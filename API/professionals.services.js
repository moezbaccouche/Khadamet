const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/professionals/';
const DEV_BASE_URL = 'http://192.168.1.6:3000/professionals/';

export async function professionalExists(email) {
  try {
    const response = await fetch(`${DEV_BASE_URL}email/${email}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
