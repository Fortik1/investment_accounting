import React from "react";
import axios from "axios";

const Import = () => {

  const setFile = (e) => {
    e.preventDefault();

    const file = e.target.querySelector('#formFile').files[0]; 
    const regexpTestForName = /xls(x)?$/;
    const reader = new FileReader();

    reader.onload = () => {
      const { name } = file;
      if (regexpTestForName.test(name)) {
        const data = reader.result.split(',')[1];

        const addFile = async () => await axios.post('http://localhost:8080/addFile', { file: data })
          .then(({ data }) => console.log(data));
        addFile();
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <form className="mb-3" onSubmit={setFile}>
      <label htmlFor="formFile" className="form-label">Поддерживаемые брокерские отчеты: Тинькофф, ВТБ</label>
      <input className="form-control" type="file" id="formFile"/>
      <button type="submit">Загрузить</button>
    </form>
  )
};

export default Import;
