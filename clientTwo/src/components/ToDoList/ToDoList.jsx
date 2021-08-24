import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Calendar from "../Calendar/Calendar";
import { StoreContext } from "../context/Context";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";

const ToDoList = () => {
  const State = useContext(StoreContext);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const history = useHistory();



useEffect(() => {
  API.getToDoList(State.studentDatePicked)
   .then(res => {
    if(res.data.todolist.length > 0){
      setTodoArr(res.data.todolist);
    } else {
      setTodoArr([{time: '', task: "Pick another date or make a new to-do-list"}])
    }
   }).catch(err => console.error(err.message))

}, [State.studentDatePicked])



const markedAsDone = (id, body) => {
  API.toDoListItemDone(id, body)
  .then(res => {
    setTodoArr(res.data.todolist)
  })
  .catch(err => console.error(err.message))
};


  const CreateToDoList = (e) => {
    e.preventDefault();
    if (State.studentDatePicked !== "") {
      const body = { time: e.target[0].value, task: e.target[1].value, date: State.studentDatePicked, student: State.user.id };
      API.createToDoList(body)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.success);
            setTodoArr(res.data.todolist);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast.warning("Please Pick a Date!");
    };
    setTime("");
    setInput("");
  };

  return (
    <div>
    <div className="mail-top">
    <div className="mail-logo">
      <div onClick={() => {history.push("/dashboard")}}>
      <i className="fas fa-home fa-2x"></i>
      </div>
      </div>
  </div>
    <div className="color2  main-todo-maker-container">
  
      <div className="todo-maker-container">
        <h1> Daily To-Do-List Maker</h1>
        <div>
          <form onSubmit={(e) => CreateToDoList(e)}>
            <div className="todolist-form-container">
              <input
                onChange={(e) => setTime(e.target.value)}
                value={time}
                placeholder="Enter Time"
                className="input-form-todo"
              />
              <br/>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Enter Task Here."
                className="input-form-todo-textarea"
              />
              <br/>
              <button className="btn-todo">
                Add Time and Task to To-Do-List
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="todo-display">
          <div>
            <div className="todo-header-container">
              <h1 className="title">To-Do-List {State.studentDatePicked}</h1>
            </div>
            <div className="to-do-list">
            {todoArr &&
              todoArr.sort((a, b) => a-b).map((n, i) => (
                <div key={i} className="border time-block cursor-pointer" onClick={() => markedAsDone(n.id, n)}>
                  <pre className={n.is_done == '0' ? "border hour colorTime line-through"  : "border hour colorTime"}>{n.time}</pre>
                  <pre className={n.is_done == '0' ? "border hour-task color line-through" : "border hour-task color"}>
                    {n.task}
                    </pre>
                </div>
              ))}
              </div>
          </div>
        </div>

      <div className="calendar-todo-wrapper">
        <Calendar />
      </div>
    </div>
    </div>
  );
};

export default ToDoList;
