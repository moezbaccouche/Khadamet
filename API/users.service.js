const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/users/';
const DEV_BASE_URL = 'http://192.168.1.6:3000/users/';

export async function userExists(email) {
  try {
    const response = await fetch(`${DEV_BASE_URL}email/${email}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const createUser = async ({
  email,
  password,
  name,
  dob,
  phone,
  address,
  pictureUrl,
  role,
}) => {
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
      picture: pictureUrl,
      role: role,
    }),
  });
  const data = await response.json();
  return data;
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
