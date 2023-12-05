import React from "react";
import axios from "axios";

const Import = () => {

  const setFile = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const regexpTestForName = /xls(x)?$/;
    const reader = new FileReader();

    reader.onload = () => {
      const { name } = file;
      if (regexpTestForName.test(name)) {
        const data = reader.result.split(',')[1];

        const addFile = async () => await axios.post('http://localhost:8080/addFile', { file: data });
        addFile();
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label">Поддерживаемые брокерские отчеты: Тинькофф, ВТБ</label>
      <input className="form-control" type="file" id="formFile" onChange={setFile} />
    </div>
  )
};

export default Import;
