import { useReducer, useState } from 'react'
import './App.css'
import data from './data'
import Modal from './Modal'
// import { reducer } from './reducer'

const reducer=(state,action)=>{
  if(action.type==="ADD_ITEM"){
    const newPeople=[...state.people,action.payload]
    console.log(state,action,newPeople)
    return {
      ...state,
      people:newPeople,
      isModalOpen:true,
      modalContent:"item added"
    }
  }
  if(action.type==="NO_VALUE"){
    return {
      ...state,
      isModalOpen:true,
      modalContent:"please enter a value"
    }
  }
  if(action.type==="CLOSE_MODAL"){
    return {
      ...state,
      isModalOpen:false
    }
  }
  if(action.type==="REMOVE_ITEM"){
    const newPeople=state.people.filter((person)=>person.id!==action.payload)
    return {
      ...state,
      people:newPeople,
      isModalOpen:true,
      modalContent:"item removed"
    }
  }
  return state;
}


const initialState={
  people:[],
  isModalOpen:false,
  modalContent:"hello world"
}

function App() {
  const [name, setname] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(name){
      const newItem={id:new Date().getTime().toString(),name}
      dispatch({type:"ADD_ITEM",payload:newItem})
      setname('')
    }
    else{
      dispatch({type:"NO_VALUE"})
    }
  }

  const closeModal=()=>{
    dispatch({type:"CLOSE_MODAL"})
  }
  return (
    <div className="App">
      {state.isModalOpen && <Modal modalContent={state.modalContent} closeModal={closeModal}/>}
      <form action="">
        <input type="text" value={name} onChange={(e)=>setname(e.target.value)}/>
        <button type='submit' onClick={handleSubmit}>submit</button>
      </form>
      {
        state.people.map((person)=>{
          return (
            <div key={person.id}>
              <h2>{person.name}</h2>
              <button onClick={()=>{
                dispatch({type:"REMOVE_ITEM",payload:person.id})
              }}>remove</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
