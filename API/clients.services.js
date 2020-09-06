import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/clients/';
const DEV_BASE_URL = 'http://192.168.1.6:3000/clients/';

export async function clientExists(email) {
  try {
    const response = await fetch(`${DEV_BASE_URL}email/${email}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const createClient = async ({
  email,
  password,
  name,
  dob,
  phone,
  address,
  pictureUrl,
}) => {
  console.log('HERE', pictureUrl);
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
    }),
  });
  const data = await response.json();
  return data;
};

export const uploadClientPicture = async (uri) => {
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${fileName}`;
  const reference = storage().ref(fileName);
  console.log(pathToFile);
  console.log(fileName);

  const task = storage().ref(fileName).putFile(pathToFile);
  task.on('state_changed', (snapshot) => {
    console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 10000);
  });
  try {
    await task;
  } catch (e) {
    console.error(e);
  }

  return reference.getDownloadURL();
};
