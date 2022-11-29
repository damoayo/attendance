import React, { useState, useReducer, useRef } from "react";
import Student from "./conponents/Student";

const reducer = (state, action) => {
  switch (action.type) {
    case "addStudent":
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name, //name이 동일하니까 이름하나를 생각해줄수있음
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    case "deleteStudent":
      return {
        count: state.count - 1,
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };
    case "markStudent":
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0,
  students: [],
};

function App() {
  const inputName = useRef(null);
  const [name, setName] = useState("");
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>출석부</h1>
      <p>총 학생 수: {studentsInfo.count} </p>
      <input
        ref={inputName}
        type="text"
        placeholder="이름을 입력해주세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          if (name === "") {
            alert("입력을 하지 않았습니다.");
            inputName.current.focus();
            return;
          }
          dispatch({ type: "addStudent", payload: { name } });

          setName("");
        }}
      >
        추가
      </button>
      {studentsInfo.students.map((student) => {
        return (
          <Student
            key={student.id}
            name={student.name}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
      <br />
      <p>
        학생이름을 누르면{" "}
        <span style={{ color: "gray", textDecoration: "line-through" }}>
          출석
        </span>
        이 표시됩니다.
      </p>
    </div>
  );
}

export default App;
