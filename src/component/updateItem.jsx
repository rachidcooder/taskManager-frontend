import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { todoState } from '../context/TodoProvider';

function updateItem({taskItem,onclose}) {

  const{tasks}=todoState();
  const{setTasks}=todoState();
  const [task,setTasck] =useState("");
  const [time,setTime]=useState("")
 
   useEffect(()=>{
      if(taskItem!==null){
        setTasck(taskItem.task) ;
        setTime(taskItem.time)  ;
      }
   },[])
 
    const onUpdate=async()=>{
         try{
          const res = await axios.put(`http://localhost:5000/api/todo/update/${taskItem._id}`,{task,time});
          if(res){
           // setTasks(...tasks);  
            onclose();
          }

         }catch(err){
          console.log(err) ;
         }
    }

  return (
    
     <div className="  bg-slate-400 fixed inset-0 flex items-center justify-center z-50">
<div className="bg-white p-8 rounded shadow-md border-2">
<h2 className="text-lg font-semibold mb-4"></h2>

  <div 
  className='flex flex-col'>
     <label>Task : </label>
    <textarea type='text' placeholder='i will ...'
        value={task}
        onChange={(e)=>{setTasck(e.target.value)}}
         className='outline-none rounded bg-slate-50 p-1 hover:bg-slate-200 m-1 '/>
         <label>Time :</label>
    <input type='time'
     value={time}
        onChange={(e)=>{setTime(e.target.value)}}
         className='outline-none rounded bg-slate-50 p-1 hover:bg-slate-200 m-1'
         />
      <div className='flex justify-around'>

<button className="mt-4 bg-red-500 text-white p-1 px-4  rounded hover:bg-red-700 " 
  onClick={onclose}
    >cancle</button>

    <button className="mt-4 bg-blue-500 text-white px-4 rounded hover:bg-blue-600" 
    onClick={onUpdate}
   >Add</button>

  </div>

  </div>

</div>
</div>
  )
}

export default updateItem
