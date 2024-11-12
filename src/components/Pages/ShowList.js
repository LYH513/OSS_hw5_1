import React from 'react';

function ShowList(){

  window.onload = function () {
    let btnStu = document.getElementById("btnStu");
    let btnAdd = document.getElementById("btnAdd");

    btnStu.addEventListener("click", getStudents);
    btnAdd.addEventListener("click", postData);
  }

  // 학생 정보를 서버에서 가져오는 함수
  function getStudents() {
    let contents = document.getElementById("contents");
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response); 
        contents.innerHTML = makeList(res);   
      } else {
        console.log(xhr.status, xhr.statusText); 
      }
    }
  }

  function makeList(data) {
    let html = "<ul>";
    console.log(data);
    data.forEach(item => {
      html += `<li className="member"> 
        이름: ${item.name}/ 나이: ${item.age}/ 직업: ${item.job}/ 번호: ${item.phoneNumber}
        <span>
          <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn1" onClick={()=>editChange('${item.id}', '${item.name}', '${item.age}', '${item.job}', '${item.phoneNumber}')}>
            수정</button>
          <button onClick={()=>deleteData('${item.id}')}className="btn2">삭제</button>
        </span>
      </li>`;
    });
    html += "</ul>";
    return html;
  }


  // 데이터를 서버에 추가하는 함수
  function postData() {
    let contents = document.getElementById("contents");
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let job = document.getElementById("job");
    let phoneNumber = document.getElementById("phoneNumber");

    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://672818e6270bd0b975545367.mockapi.io/api/v1/user");
    xhr.setRequestHeader("content-type","application/json;charset=UTF-8")
    const data = { name: name.value, age: age.value, job: job.value, phoneNumber:phoneNumber.value };

    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 201) {
        name.value = "";
        age.value = "";
        const res = JSON.parse(xhr.response);
        getStudents() ;
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    }
    }

  function editChange(id, nameValue, ageValue, jobValue, phoneNumberValue) {
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let job = document.getElementById("job");
    let phoneNumber = document.getElementById("phoneNumber");

    name.value = nameValue;
    age.value = ageValue;
    job.value = jobValue;
    phoneNumber.value = phoneNumberValue;

    let btnAdd = document.getElementById("btnAdd");
    
    btnAdd.removeEventListener("click", postData);
    // 새로운 이벤트 핸들러 등록
    const handler = function() {
      updateData(id);
      
      // updateData 호출 후 핸들러 재설정
      btnAdd.removeEventListener("click", handler); // 현재 이벤트 핸들러 제거
      btnAdd.addEventListener("click", postData);   // 다시 postData로 원복
    };

    // 업데이트용 이벤트 핸들러 추가
    btnAdd.addEventListener("click", handler);
  }

  function resetInput(){
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let job = document.getElementById("job");
    let phoneNumber = document.getElementById("phoneNumber");

    name.value = "";
    age.value = "";
    job.value = "";
    phoneNumber.value = "";
  }

  //데이터 수정하는 함수
  function updateData(id) {
    // alert(id)
    const xhr = new XMLHttpRequest();

    let contents = document.getElementById("contents");
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let job = document.getElementById("job");
    let phoneNumber = document.getElementById("phoneNumber");

    xhr.open("PUT", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user/" +id);
    xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
    const data = { name: name.value, age: age.value, job: job.value, phoneNumber:phoneNumber.value };

    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        console.log(res);
        getStudents();
        resetInput();
      } 
      else {
        console.log(xhr.status, xhr.statusText);
      }
    }
    }

  function deleteData(id){
    const xhr = new XMLHttpRequest();

    console.log("id 확인", id);
    
    xhr.open("DELETE", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user/"+id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response); 
        // contents.innerHTML = makeList(res); 
        console.log(xhr.status, res);  
        getStudents(); 
      } else {
        console.log("삭제 실패", xhr.status, xhr.statusText);
      }
    }
    xhr.onerror = () => {
      console.log("DELETE 요청 실패 - 네트워크 오류 발생");
    };

  }

  return(
    <div>
    <h2>Membership Management</h2>
  <button id="btnStu" className="btn btn-warning" >회원 정보 가져오기</button>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  회원 추가
  </button>

  <div id="contents"></div>  

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetInput}></button>
          </div>
            <div className="modal-body">
              <div style={{marginTop: "10px"}}>
                <label htmlFor="name">이름:</label>
                <input type="text" id="name" name="name"/>
              <label htmlFor="age">나이:</label>
              <input  type="number" id="age" name="age"/>
          
              <label htmlFor="job">직업:</label>
              <input  type="text" id="job" name="job"/>
              
              <label htmlFor="phoneNumber">번호:</label>
              <input  type="text" id="phoneNumber" name="phoneNumber"/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetInput}>취소</button>
            <button type="button" id="btnAdd" className="btn btn-primary" data-bs-dismiss="modal">확인</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ShowList;