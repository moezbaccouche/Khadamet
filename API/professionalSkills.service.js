const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/professionalSkills/';
const DEV_BASE_URL = 'http://192.168.1.6:3000/professionalSkills/many/';

export const addProfessionalSkills = async (skills, professionalId) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills,
        professionalId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
