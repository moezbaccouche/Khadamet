export const PROD_BASE_URL =
  'https://khadamet-api.herokuapp.com/conversations/';
export const DEV_BASE_URL = 'http://192.168.1.6:3000/conversations/';

export const conversationExists = async (senderId, receiverId) => {
  try {
    console.log('URL', `${DEV_BASE_URL}users/${senderId}/${receiverId}`);
    const response = await fetch(
      `${DEV_BASE_URL}users/${senderId}/${receiverId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createConversation = async ({
  conversationCreatorId,
  conversationReceiverId,
  createdAt,
}) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationCreatorId,
        conversationReceiverId,
        createdAt,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
