import { useState } from 'react'





const Display = ({ counter, text, unit = "" }) => {
 return (
  <tr>
    <td>{text}</td>
    <td>{counter} {unit}</td>
  </tr>
 )
}

const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  )
}

const UserFeedback = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average =((good - bad) / total).toFixed(2) // toFixed hace lo mismo que la condicion ternaria
  const positive =((good / total) * 100).toFixed(2)  

  
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <Display counter={good} text="Good"/>
        <Display counter={neutral} text="Neutral"/>
        <Display counter={bad} text="Bad"/>
        <Display counter={total} text="Total"/>
        <Display counter={average} text="Average"/>
        <Display counter={positive} text="Positive" unit="%"/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [goodCounter, setGoodCounter] = useState(0)
  const [neutralCounter, setNeutralCounter] = useState(0)
  const [badCounter, setBadCounter] = useState(0)
  // const {total, average, positive} = userFeedback(goodCounter, neutralCounter, badCounter)
  const increaseGood = () => {setGoodCounter(goodCounter + 1)}
  const increaseNeutral = () => {setNeutralCounter(neutralCounter + 1)}
  const increaseBad = () => {setBadCounter(badCounter + 1)}

  return (
  <div>
    <h1>Give feedback</h1>
    <Button onClick={increaseGood} text="Good" />
    <Button onClick={increaseNeutral} text = "Neutral" />
    <Button onClick={increaseBad} text= "Bad" />
    <h1>Statistics</h1>
    <UserFeedback good={goodCounter} neutral={neutralCounter} bad={badCounter} />
  </div>
  )
}

export default App