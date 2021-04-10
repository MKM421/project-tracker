export const dateTimeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour12 : true,
  hour:  "2-digit",
  minute: "2-digit"
};


const getCurrentDateTime = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const date = today.toLocaleDateString('default', options);
  const time = today.toLocaleTimeString('default');

  const dateTime = date + " " + time;
  return dateTime;
}

export default getCurrentDateTime
