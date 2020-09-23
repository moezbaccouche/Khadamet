export const sortOverviews = (data) => {
  data.sort((a, b) => {
    const msgTimeA = a.lastMessage.msgTime;
    const msgTimeB = b.lastMessage.msgTime;
    if (msgTimeA > msgTimeB) {
      return -1;
    }
    if (msgTimeA < msgTimeB) {
      return 1;
    }
    return 0;
  });
  return data;
};
