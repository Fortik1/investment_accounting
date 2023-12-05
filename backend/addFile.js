import axios from "axios";
import dataList from "./transactions.js";

const addFile = (req, res) => {
  const { file } = req.body;

  const path = 'https://functions.yandexcloud.net/d4evukecdouqh2hdnmoi';

  const parseNewFile = async () => await axios.post(path, { data: file })
  .then(({data}) => dataList.data = [ ...dataList.data, ...data ]);
  
  parseNewFile();
  res.send();
};

export default addFile;
