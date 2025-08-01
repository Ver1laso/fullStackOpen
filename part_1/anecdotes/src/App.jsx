import { useState } from 'react'



const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  )
}


function  getRandom(max) {
  return Math.floor(Math.random()*max)
}


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomQuote = getRandom(anecdotes.length);
  const [selected, setSelected] = useState(randomQuote);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleClick = () => { 
    const newIndex = getRandom(anecdotes.length);
    setSelected(newIndex);
  }
  const handlVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] +=1;
    setVotes(updatedVotes)
  }

  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);
  const mostVotedAnecdote = anecdotes[mostVotedIndex];

  return (
    <div>
      <h2>Anecdote of the day!</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handlVote} text= "Vote" />
      <Button onClick={handleClick} text= "Next Anecdote" />
      <h2>Anecdote with most votes!</h2>
      <p>{mostVotedAnecdote}</p>
    </div>
  )
}

export default App;

  