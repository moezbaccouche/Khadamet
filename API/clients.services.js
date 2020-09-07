import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import RNFetchBlob from 'react-native-fetch-blob';

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
  console.log('URI:', uri);
  let stats;
  try {
    //If the picture is chosen from the library
    stats = await RNFetchBlob.fs.stat(uri);
  } catch (e) {
    //If the picture was taken from the camera then stats will be null
    stats = null;
  }

  let pathToFile = '';
  let fileName = '';
  if (stats) {
    //Picture from the library
    const uuid = uuidv4();
    let reg = /(?:\.([^.]+))?$/,
      fileExtension = reg.exec(stats.filename)[1];
    fileName = `${uuid}.${fileExtension}`;
    pathToFile = stats.path;
  } else {
    //Picture from the Camera
    fileName = uri.substring(uri.lastIndexOf('/') + 1);
    pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${fileName}`;
  }

  const reference = storage().ref(fileName);

  const task = reference.putFile(pathToFile);
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
