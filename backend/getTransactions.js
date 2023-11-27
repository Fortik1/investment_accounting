import getData from './getData.js';

const transactions = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const { page, limit } = req.query;

  const data = getData('transactions.json', limit, page);

  res.send(data);
};

export default transactions;
