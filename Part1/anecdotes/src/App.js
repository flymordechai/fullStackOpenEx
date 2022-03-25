import { useState } from 'react'

const App = () => {

  const page = {
    title: 'Anecdote of the day',
    subtitle: 'Anecdote with the most votes'
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const setToValue = (setValue ,newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  const pointsArray = new Array(7).fill(0);

  const [points, setPoints] = useState(pointsArray)

  const setToPoints = (setValue ,newValue) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Header header={page.title}/>
      <Anecdote anecdote={anecdotes[selected]}/>
      <Results points={points[selected]}/>
      <Button handleClick={() => setToPoints(setPoints, points[selected])} text={'vote'}/>
      <Button handleClick={() => setToValue(setSelected, getRandomInt(0, 6))} text={'next anecdote'}/>
      <Header header={page.subtitle}/>
      <MostVotes votes={anecdotes[points.indexOf(Math.max(...points))]}/>
    </div>
  )
}

const Header = (props) => (
      <h1>{props.header}</h1>
  )

const Anecdote = (props) => (
  <p>{props.anecdote}</p>
)

const Results = (props) => (
  <p>{'has '}{props.points}{' votes'}</p>
)

const MostVotes = (props) => (
  <p>{props.votes}</p>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export default App
