import React from 'react';

function ShowList(){

  return(
    <div>
    <h2>Membership Management</h2>
  <button id="btnStu" class="btn btn-warning" >회원 정보 가져오기</button>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  회원 추가
  </button>

  <div id="contents"></div>  

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="resetInput()"></button>
          </div>
            <div class="modal-body">
              <div style={{marginTop: "10px"}}>
                <label for="name">이름:</label>
                <input type="text" id="name" name="name"/>
              <label for="age">나이:</label>
              <input  type="number" id="age" name="age"/>
          
              <label for="job">직업:</label>
              <input  type="text" id="job" name="job"/>
              
              <label for="phoneNumber">번호:</label>
              <input  type="text" id="phoneNumber" name="phoneNumber"/>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="resetInput()">취소</button>
            <button type="button" id="btnAdd" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ShowList;