import React from "react";

const Import = () => {

  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label">Поддерживаемые брокерские отчеты: Тинькофф, ВТБ</label>
      <input className="form-control" type="file" id="formFile" event={setFile} />
    </div>
  )
};

export default Import;
