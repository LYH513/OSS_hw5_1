import React, { useState } from 'react';
import '../../index.css';

function ShowList(){

  const [mockData, setMockData] =useState([]);
  const [mode, setMode] =useState('add');

  const [modalInput, setModalInput] = useState({
    name: "",
    age: "",
    job: "",
    phoneNumber: ""
  })

  const [selectId, setSelectID] = useState("");

  const handleModalInput = (e) =>{
    setModalInput({
      ...modalInput,
      [e.target.name] :e.target.value
    })
  }

  window.onload = function () {
    let btnStu = document.getElementById("btnStu");
    let btnAdd = document.getElementById("btnAdd");

    btnStu.addEventListener("click", getStudents);
    btnAdd.addEventListener("click", postData);
  }

  // 학생 정보를 서버에서 가져오는 함수
  function getStudents() {
    console.log("눌림");
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://672818e6270bd0b975545367.mockapi.io/api/v1/user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.response); 
        console.log('데이터 확인', res);
        setMockData(res);  
      } else {
        console.log(xhr.status, xhr.statusText); 
      }
    }
  }

  // 데이터를 서버에 추가하는 함수
  function postData() {

    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://672818e6270bd0b975545367.mockapi.io/api/v1/user");
    xhr.setRequestHeader("content-type","application/json;charset=UTF-8")

    const data = modalInput;

    xhr.send(JSON.stringify(data));
    xhr.onload = () => {
      if (xhr.status === 201) {
        const res = JSON.parse(xhr.response);
        getStudents() ;
      } else {
        console.log(xhr.status, xhr.statusText);
      }
    }
    }

  function editChange(item) {
    console.log("수정 데이터 확인", item);
    
    setMode('edit');
    const {id, name, age, job, phoneNumber} = item;
    setSelectID(id);

    setModalInput({
      ...modalInput,
      name: name,
      age:age,
      job: job,
      phoneNumber: phoneNumber
    })
  }

  function resetInput(){

    setModalInput({
      name: "",
      age: "",
      job: "",
      phoneNumber: ""
    })
  }

  //데이터 수정하는 함수
  function updateData(id) {
    // alert(id)
    const xhr = new XMLHttpRequest();

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
  <button id="btnStu" className="btn btn-warning" onClick={getStudents}>회원 정보 가져오기</button>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setMode('add')}>
  회원 추가
  </button>

  <div id="contents">
    <ul>
    {
      mockData.map((item)=>{
        return(
          <div key={item.id}>
            <li className='member'>
            이름: {item.name}/ 나이: {item.age}/ 직업: {item.job}/ 번호: {item.phoneNumber}
            <span>
              <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn1" onClick={()=>editChange(item)}>
                수정</button>
              <button onClick={()=>deleteData(item.id)}className="btn2">삭제</button>
            </span>
            </li>
          </div>
        );
      })
    }
    </ul>
  </div>  

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
                <input type="text" id="name" name="name" onChange={handleModalInput} value={modalInput.name}/>
              <label htmlFor="age">나이:</label>
              <input  type="number" id="age" name="age" onChange={handleModalInput} value={modalInput.age}/>
          
              <label htmlFor="job">직업:</label>
              <input  type="text" id="job" name="job" onChange={handleModalInput} value={modalInput.job}/>
              
              <label htmlFor="phoneNumber">번호:</label>
              <input  type="text" id="phoneNumber" name="phoneNumber" onChange={handleModalInput} value={modalInput.phoneNumber}/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetInput}>취소</button>
            <button type="button" id="btnAdd" className="btn btn-primary" data-bs-dismiss="modal" onClick= {()=>(mode==='add'? postData() : updateData(selectId))}>확인</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ShowList;