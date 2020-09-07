import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import RNFetchBlob from 'react-native-fetch-blob';

export const uploadProfilePicture = async (uri) => {
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
