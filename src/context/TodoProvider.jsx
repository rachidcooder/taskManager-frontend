import React, { useState } from 'react'
import { useContext,createContext,useEffect } from 'react'

const todoContext=createContext();

function TodoProvider({children}) {
  const[tasks,setTasks] =useState("")

  return (
    <todoContext.Provider value={{
      tasks,
      setTasks
    }}>
      {children}
    </todoContext.Provider >
  );
}
export const todoState =()=>{
 return useContext(todoContext) ;
}
export default TodoProvider 
