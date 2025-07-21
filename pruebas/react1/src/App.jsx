import { useState } from 'react'
import './App.css'

  const Display = props => <div>{props.value}</div>

  const Button = (props) => (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
)

const App = () => {
  const [value, setValue] = useState(10)


  const setToValue = (newValue) => {
    console.log("value now", newValue)
    setValue(newValue)
  }



  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />      
      <Button handleClick={() => setToValue(0)} text="reset" />     
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )

}

export default App


// *****************     OTRO EJERCICIO ********************//

// const History = (props) => {
//   if(props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(" ")}
//     </div>
//   )
// }

// const Button = ({ handleClick, text}) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )


// const App = () => {

//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)


//   const handleleftClick = () => {
//     setAll(allClicks.concat("L"))
//     const updateLeft = left+1
//     setLeft(updateLeft)
//     setTotal(updateLeft + right)
//   }

//   const handlerightClick = () => {
//     setAll(allClicks.concat("R"))
//     const updateRight = right+1
//     setRight(updateRight)
//     setTotal(left+updateRight)
//   }

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleleftClick} text='left' />
//       <Button handleClick={handlerightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )

// }

// export default App




// *****************     OTRO EJERCICIO ********************//
// const App = () =>{
//   // const [left, setLeft] = useState(0)
//   // const [right, setRight] = useState(0)
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })

//   const handleleftClick = () => {
//     const newClicks = {
//       ...clicks,
//       left: clicks.left + 1
//       // right: clicks.right
      
//     }
//     setClicks(newClicks) // tambien se puede resumir todo haciendo setClicks({...clicks, left:clicks.left + 1}) y asi evitas escribir todo desde const = newClicks..
//   }

//   const handleRightClick = () => {
//     const newClicks = {
//       // left: clicks.left,
//       ...clicks,
//       right: clicks.right + 1
//     }
//     setClicks(newClicks)
//   }

//   const handleReset = () => {
//     setClicks({
//       left: 0,
//       right: 0
//     })
//   }

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleleftClick}>left</button>
//       <button onClick={handleReset}>reset</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }

// export default App


// *****************     OTRO EJERCICIO ********************//

// const Display = (props) => {
//   return <div>{props.counter}</div>
// }

// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   )
// }

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return(
//     <div>
//       <Display counter = {counter}/>
//       <Button onClick={increaseByOne} text='plus'/>
//       <Button onClick={setToZero} text="zero"/>
//       <Button onClick={decreaseByOne} text="minus"/>
//     </div>
//   )
// }

// export default App;



// *****************     OTRO EJERCICIO ********************//
// const Hello = (props) => { // esto tambien se puede hacer con const Hello =({name, age}) => ...
//   const {name, age} = props
//   const bornYear = () => new Date().getFullYear() - age
  
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old.
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }


// const App =() => {
 
//   const name = "Peter"
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26+10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// export default App
