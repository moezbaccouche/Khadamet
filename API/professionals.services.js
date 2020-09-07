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

export const createProfessional = async ({
  email,
  password,
  name,
  dob,
  phone,
  address,
  picturePath,
}) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        dob: dob,
        address: address,
        phone: phone,
        email: email,
        password: password,
        picture: picturePath,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
