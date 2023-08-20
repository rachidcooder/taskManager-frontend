import React, { useEffect, useState } from 'react'
import ic_delet from '../assets/delete.svg'
import ic_updaye from '../assets/update.svg'
import axios from 'axios'
import  UpdateItem from "./updateItem"
import { todoState } from '../context/TodoProvider'

function item() {
  const{tasks}=todoState();
  const{setTasks}=todoState();
  const[lstasks,setLsTasks] =useState([])
  const[taskToUpdate,setTasktoUpdate]=useState([])
  const[isupdate,setIsupadate] = useState(false);


   const onDeletItem=async(task)=>{  
    try{
      const res= await axios.delete(`http://localhost:5000/api/todo/delete/${task._id}`);
       console.log(res)
        setTasks(prevTasks => prevTasks.filter(item => item._id !== task._id));

    }catch(err){
      console.log(err) ;
    }

   }

   const onUpdateItem=async(task)=>{
      if(task._id){
        setTasktoUpdate(task);
        setIsupadate(true);
      } 
   }

    const onGetItems=async()=>{
      try{
    const res=await axios.get("http://localhost:5000/api/todo");

    if(res.data){
     setTasks(res.data.tasks)
     //setLsTasks(res.data.tasks);
    }
      }catch(err){
        console.log(err) ;
      }
     }

   useEffect(()=>{
     onGetItems();
   },[tasks]);
 
 const onClose=async()=>{
    setIsupadate(!isupdate);
   }
  return (
<div className='overflow-y-scroll scroll-smooth  scrollbar scrollbar-thumb-2px'> 

 { tasks &&
    tasks.map((task,i)=>{

     return(
     <div key={task._id}
     className='flex  flex-col justify-center items-center h-16 font-bold bg-slate-50 m-2
         hover:bg-slate-200 drop-shadow-xl rounded-lg'>
                    <h1 className='text-lg'>{task.time}</h1>
             <div className='flex justify-between w-full ps-2 pe-1'>
               <h1 className='text-lg '>{task.task}</h1>
               <div className='flex flex-row'>
                <img src={ic_delet} alt='icDelet' 
                 className='h-6 w-6 hover:bg-slate-50 rounded'
                   onClick={()=>{onDeletItem(task)}}/>

                   <img src={ic_updaye} alt='icUpdate' 
                 className='h-6 w-6 hover:bg-slate-50 rounded'
                   onClick={()=>{onUpdateItem(task)}}/>
                </div>
               
            </div>
    
      </div>) 
   })
     }
       
    { isupdate && <UpdateItem taskItem={taskToUpdate} onclose={onClose}/>}
     </div>
    
  )
}
export default item
