import React, { useState } from "react";

const Import = () => {
  const [file, setFile] = useState();

  console.log(file);

  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label">Поддерживаемые брокерские отчеты: Тинькофф, ВТБ</label>
      <input className="form-control" type="file" id="formFile" event={setFile} />
    </div>
  )
};

export default Import;
