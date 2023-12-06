import getData from './getData.js';

const transactions = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const { page, limit } = req.query;

  const data = getData(limit, page);

  res.send(data);
};

export default transactions;
