const link = 'https://economia.awesomeapi.com.br/json/all';

const getCurrency = async () => {
  const response = await fetch(link);
  const data = await response.json();
  return data;
};

export default getCurrency;
