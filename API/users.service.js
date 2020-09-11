const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/users/';
const DEV_BASE_URL = 'http://192.168.1.5:3000/users/';

export const userExists = async (email) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}email/${email}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createUser = async ({
  email,
  password,
  name,
  dob,
  phone,
  address,
  pictureUrl,
  userRole,
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
      role: userRole,
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

export const getProfessionalsBySkill = async (skillId) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}skill/${skillId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const searchProfessional = async (name, loggedUserId) => {
  try {
    const response = await fetch(
      `${DEV_BASE_URL}search/${name}/${loggedUserId}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getProfessional = async (expertId) => {
  console.log(expertId);
  try {
    const response = await fetch(`${DEV_BASE_URL}professional/${expertId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getBestProfessionals = async (skillId) => {
  try {
    const response = await fetch(
      `${DEV_BASE_URL}professionals/best/skill/${skillId}`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
