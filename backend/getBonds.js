import getData from "./getData.js";

const getTransactions = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const { limit, page } = req.query;

  const data = getData('bonds.json', limit, page);

  res.send(data);
};

export default getTransactions;
