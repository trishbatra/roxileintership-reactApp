import { useState, useEffect, React, useRef } from 'react';
import './App.css';
function App() {
  const [todo, settodo] = useState([])
  const [user, setuser] = useState({userData: ""})
  const [search, setsearch] = useState("")
  const [desc, setdesc] = useState(false)
  useEffect( () => {
    async function a(){
      let data  = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=15`)
      let todoss = await data.json()
      console.log(todoss)
      settodo(todoss)
    }
    a()
  }, [])
  function check(index){
    if(index % 2 === 0){
      return true
    }else{
      return false
    }
  }
  function close(){
    detailDiv.current.classList.add("hidden")      
  }
  let detailDiv = useRef()
  let b = useRef()
  function displayUserDetailDiv(){
    if( detailDiv.current.classList.contains("hidden") ){
      detailDiv.current.classList.remove("hidden")      
    }
  }
  async function userDetail(id, title){
    displayUserDetailDiv()
    let jsonUser = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    let userData = await jsonUser.json()
    setuser({userData, title, todoID: id})
  }
  const fil =  todo.filter((elem) => { return  elem.title.includes(search)}  )
  function filterResults(e){
    setsearch(e.target.value)
  }
  function changeTheArr (){
    if(desc == false){
      setdesc(true)
    }else{
      setdesc(false)
    }
    let length = todo.length -1
    let i = 0
    const fil = []
    while(length >= i){  //* 15 14 13 12 11 10 9 8 7  6 5 4 3 2 1
      fil.push(todo[length])
      length--
    }
    console.log(fil)
    settodo(fil)
  }
  return (
    <div  >
      <h1 className="font-bold text-xl absolute top-8 left-[40%] ">React Coding Challange : Trish Batra</h1>
      <button id='a' className='absolute left-[12%] py-1 px-4 rounded border-[1.75px] border-black top-[7em]' onClick={changeTheArr} > { desc === true? ' Sort:  asc': 'Sort: desc'} </button>
      <input
      type="search"
      onChange={filterResults}
      placeholder="Search by title"
      className="px-4 py-2 absolute w-[20%] left-[20%] top-11 my-4 text-gray-700 bg-white border border-gray-500 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="overflow-x-auto p-28">
  <table className="table w-[50%]">
    <thead>
      <tr>
        <th className="px-4 py-2"> ID</th>
        <th className="px-4 py-2"> Title</th>
        <th className="px-4 py-2"> Status</th>
        <th className="px-4 py-2"> Action</th>
      </tr>
    </thead>
    <tbody>

      {fil.map((elem)=> {  
        return <tr className={`${check(todo.indexOf(elem)) === true? "bg-gray-100": 'bg-white'}`}>  
         <td className="border-2 border-black w-[5%]  text-center px-1 py-2">  {elem.id} </td>  
         <td className="border-2 border-black px-3  w-[15%] py-2">  {elem.title} </td> 
         {<td className="border-2 border-black px-4 w-[10%] py-2" >  {`${elem.completed === false  ?  'Incomplete' : 'Complete'}`} </td> }
          <td  className="border-2 border-black px-4 w-[10%] py-2">  <a href="#detaiDiv"> <button onClick={ ()=>{userDetail(elem.id, elem.title)}} className='border-black border-2  py-2 px-5 rounded-md' > View User </button> </a> </td> 
         </tr>
      })}
    </tbody>
  </table>
</div>
      <div  ref={detailDiv}   className='hidden w-auto' >
        <button   onClick={close} className='absolute top-[8em] left-[70em]  font-bold text-2xl' > X </button>
        <h2 className='absolute top-[6em] text-3xl font-medium  left-[32em]'>  User Detail  </h2> 
        <div className="border-2 absolute top-[15em] left-[60em] border-black h-[540px]  w-[40%]"> 
          <span className="font-bold text-2xl block my-16">todoID : { user.todoID } </span>
          <span className="font-bold text-2xl block my-16">todo Tittle : {user.title} </span>
          <span className="font-bold text-2xl block my-16">todoID : { `${user.userData.id == undefined ? "notAvailable in api" : user.userData.id}` } </span>
          <span className="font-bold text-2xl block my-16">Name : { `${user.userData.name == undefined ? "notAvailable in api" : user.userData.name}` } </span>
          <span className="font-bold text-2xl block my-16">Email : { `${user.userData.email == "" ? "notAvailable in api" : user.userData.email}` } </span>
      </div>
      </div>
    </div>
  );
}

export default App;
