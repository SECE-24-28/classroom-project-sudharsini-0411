  
import './App.css'
import { useState } from 'react'
function App() {
  const [count,setCount] = useState(0);
  function clickHandler(){
    setCount(count+1);
  }
  return <div>
    <h1>Counter App</h1>
    <h3>{count}</h3>
    <button onClick={clickHandler}>Increment</button>
  </div>
        
}
export default App
