import React from "react";
import "../style.css";

function Forbidden() {
  return (
    <div id='notfound'>
      <div className='notfound'>
        <div className='notfound-404'>
          <h2>
            403 - 허가되지 않은 사용자입니다. <br /> 관리자에게 문의하세요.
          </h2>
        </div>
        <a href='/'>뒤로가기</a>
      </div>
    </div>
  );
}

export default Forbidden;
