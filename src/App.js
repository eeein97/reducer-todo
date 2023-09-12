import { useReducer, useRef } from 'react';
import './App.css';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

const initialState = {
  inputs: {
    username: '',
    email:''
  },
  users: [
    {
      id: 1,
      username: 'green',
      email: 'green@naver.com',
      active: false
    },
    {
      id: 2,
      username: 'blue',
      email: 'blue@naver.com',
      active: false
    },
  {
      id: 3,
      username: 'red',
      email: 'red@naver.com',
      active: false
    }
  ]
}
//reducer함수
function reducer(state, action){
  switch(action.type){
    case 'INPUTCHANGE':
      return{
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      }
      case 'CREATEUSER' :
        return {
        inputs: {
          username: "",
          email: "",
        }, 
        users: [
          ...state.users,
          action.user
        ]
      }
      case 'USEREMOVE' :
        return {
          ...state,
          users: state.users.filter(user=> user.id !== action.id)
      }
      case 'USERTOGGLE' :
        //active를 반전 true -> false, false -> true
        return {
          ...state,
          user: state.users.map(user => user.id === action.id ? 
            {...user, active: !user.active} : user)
      }
      default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state;
  const {username, email} = state.inputs;
  //1. 인풋의 값이 변경되면 inputs의 값을 변경
  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch({
      type:"INPUTCHANGE",
      name: name,
      value: value
    })
  }
  //2.등록버튼 클릭시 users배열에 항목 추가
  //id번호
  const nextId = useRef(4);
  const onCreate = () => {
    //reducer호울 (액션객체 전달)
    dispatch({
      type:"CREATEUSER",
      user: {
        id: nextId.current,
        username: username,
        email: email,
        active: false
      }
    })
    //nextId값을 1씩 더해라
    nextId.current += 1;
  }
  //3. 삭제 버튼 클릭시 users배열에 해당 user제거
  //filter에서 사용할 id를 전달, type: 삭제 전달
  const onRemove = (id) => {
    dispatch({
      type: 'USEREMOVE',
      id: id
    })
  }
  //4. 유저항목 클릭시 유저의 active를 반전 true->false,
    //id전달
    const onToggle = (id) => {
      dispatch({
        type: 'USERTOGGLE',
        id: id
      })
    }
  return (
    <div className="App">
      <CreateUser username={username} 
      email={email} onChange={onChange} 
      onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}

export default App;
