import React from "react";

const NetworkError = ({ refresh }) => {
  return (
    <div>
      <div>Ошибка сети</div>
      <button onClick={() => refresh()}>Попробовать снова</button>
    </div>
  )
}

export default NetworkError;