import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const path = 'https://d5dpil1j3vqslj3529om.apigw.yandexcloud.net/api/v1/transactions/import';
//const path = 'http://localhost:8080/addFile'; // local

const Import = () => {
  const [modalIsOpen, setModalIsOpen] = useState({ show: false, data: { save: 0, not_save: 0 }});

  const openModal = (data) => {
    setModalIsOpen({ show: true, data });
  };

  const closeModal = () => {
    setModalIsOpen({ ...modalIsOpen, show: false });
  };

  const setFile = (e) => {
    e.preventDefault();
  
    const file = e.target.files[0]; 

    if (!file) return;

    const regexpTestForName = /xls(x)?$/;
    const reader = new FileReader();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  
    reader.onload = () => {
      const { name } = file;
      if (regexpTestForName.test(name)) {
        const data = reader.result.split(',')[1];
        const addFile = async () => await axios.post(path, { file: data }, config)
          .then(({ data }) => console.log(data));
        addFile();
      }
    };
  
    reader.readAsDataURL(file);
  };

  console.log(modalIsOpen);

  return (
    <>
      <form className="mb-3" onChange={setFile}>
        <label htmlFor="formFile" className="form-label">Поддерживаемые брокерские отчеты: Тинькофф, ВТБ</label>
        <input className="form-control" type="file" id="formFile"/>
      </form>
      <Modal show={modalIsOpen.show} onHide={closeModal}>
        <Modal.Body>Добавлено транзакций: {modalIsOpen.data.save}</Modal.Body>
        <Modal.Body>Не добавлено транзакций (дублирование): {modalIsOpen.data.not_save}</Modal.Body>
      </Modal>
    </>
  )
};

export default Import;
