import { useState } from 'react'
import './App.css'
import ic_delet from './assets/delete.svg'
import Item from "./component/items";
import AddItem from './component/addItem';

function App() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);


 
  const currentTimeMillis = Date.now();
const currentTime = new Date(currentTimeMillis);

const day = currentTime.getDate();
const month = currentTime.getMonth() ; // Month is 0-indexed, so we add 1
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 const onAddItem=async()=>{
    setIsPopUpOpen(!isPopUpOpen);
   }
  return (
   <div className='m-0 flex justify-center h-screen w-screen z-1 '>
  <div className="bg-white h-5/6 w-1/3 rounded-lg mt-5 flex flex-col overflow-hidden 
      drop-shadow-2xl relative">

    <div className='bg-cyan-400 flex justify-center items-center h-20 font-bold'>
      <h1 className='text-white text-lg'>{`${months[month]} ,${day}`}</h1>
    </div>

    <div className="flex-grow overflow-y-auto">
      <Item />
    </div>

    <button className='rounded-full w-10 h-10 bg-cyan-400 text-lg m-3 absolute bottom-0 right-0'
    onClick={onAddItem}
    >+</button>
   
  </div>
 {
      isPopUpOpen && <AddItem onClose={onAddItem} />
    }
</div>
  )
}

export default App
