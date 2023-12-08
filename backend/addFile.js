import axios from "axios";
import dataList from "./transactions.js";

const addNewFileReturnInfo = (acc, element) => {
  const { transactionID } = element;

  if (acc.transactionsIDList.includes(transactionID)) {
    acc.quantityMissing += 1;
    return acc;
  }

  acc.quantityAdd += 1;
  acc.newTransactions = [...acc.newTransactions, element];
  acc.transactionsIDList = [...acc.transactionsIDList, transactionID];

  return acc;
}; 

const addFile = (req, res) => {
  const { file } = req.body;

  const path = 'https://functions.yandexcloud.net/d4evukecdouqh2hdnmoi';

  const defaultAccInfo = { 
    quantityAdd: 0, 
    quantityMissing: 0, 
    newTransactions: [], 
    transactionsIDList: [...dataList.transactionsIDList] 
  };

  const parseNewFile = async () => await axios.post(path, { data: file })
  .then(({ data }) => {
    const { transactionsIDList, newTransactions, quantityAdd, quantityMissing} = data
      .reduce(addNewFileReturnInfo, defaultAccInfo);

    dataList.transactionsIDList = transactionsIDList;
    dataList.data = [...dataList.data, ...newTransactions];
    
    res.send({ quantityAdd, quantityMissing });
  });
  
  parseNewFile();
};

export default addFile;
