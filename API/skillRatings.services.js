const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/skillRatings/';
const DEV_BASE_URL = 'http://192.168.1.6:3000/skillRatings/';

export const addNewReview = async (review) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
