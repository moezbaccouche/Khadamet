import {PRIMARY_COLOR} from '../assets/colors';

export const PROD_BASE_URL =
  'https://khadamet-api.herokuapp.com/notifications/';
export const DEV_BASE_URL = 'http://192.168.1.4:3000/notifications/';

export const NEW_REQUEST = 1;
export const ACCEPTED_REQUEST = 2;
export const REJECTED_REQUEST = 3;
export const EDITED_REQUEST = 4;
export const CANCELED_REQUEST = 5;
export const NEW_MESSAGE = 6;

export const sendNotification = async (title, msg, playersIds) => {
  try {
    const response = await fetch(`https://onesignal.com/api/v1/notifications`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: '25407cd0-bf75-4a57-b6bb-f4d202d08820',
        include_player_ids: playersIds,
        headings: {
          fr: title,
          en: title,
        },
        contents: {
          fr: msg,
          en: msg,
        },
        android_accent_color: PRIMARY_COLOR,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createNotification = async (newNotification) => {
  //Adds notification to DB
  try {
    const response = await fetch(`${DEV_BASE_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNotification),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getReceivedNotifications = async (userId) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
