import {PRIMARY_COLOR} from '../assets/colors';

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
