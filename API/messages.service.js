export const PROD_BASE_URL = 'https://khadamet-api.herokuapp.com/messages/';
export const DEV_BASE_URL = 'http://192.168.1.6:3000/messages/';

export const getUserConversations = async (userId) => {
  try {
    const response = await fetch(
      `${DEV_BASE_URL}conversations/overview/${userId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getConversationMessages = async (conversationId) => {
  try {
    const response = await fetch(
      `${DEV_BASE_URL}conversations/${conversationId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const persistMessage = async (newMessage) => {
  try {
    const response = await fetch(`${DEV_BASE_URL}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });
    const data = await response.json();
    return data;
  } catch (error) {}
};
