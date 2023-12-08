import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Import = () => {
  const [modalIsOpen, setModalIsOpen] = useState({ show: false, data: { quantityAdd: 0, quantityMissing: 0 }});
  const [disableButton, setDisabelButton] = useState(false);

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
  
    reader.onload = () => {
      const { name } = file;
      if (regexpTestForName.test(name)) {
        const data = reader.result.split(',')[1];
        const addFile = async () => await axios.post('http://localhost:8080/addFile', { file: data })
          .then(({ data }) => openModal(data));
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
        <Modal.Body>Добавлено транзакций: {modalIsOpen.data.quantityAdd}</Modal.Body>
        <Modal.Body>Не добавлено транзакций (дублирование): {modalIsOpen.data.quantityMissing}</Modal.Body>
      </Modal>
    </>
  )
};

export default Import;
