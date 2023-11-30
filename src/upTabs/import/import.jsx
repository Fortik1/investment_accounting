import React, { useState } from "react";

const Import = () => {
  const [file, setFile] = useState();

  console.log(file);

  return (
    <div class="mb-3">
      <label for="formFile" class="form-label">Поддерживаемые брокерские отчеты: Тинькофф, ВТБ</label>
      <input class="form-control" type="file" id="formFile" event={setFile} />
    </div>
  )
};

export default Import;
