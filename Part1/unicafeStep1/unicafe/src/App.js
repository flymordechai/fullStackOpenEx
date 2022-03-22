import { useState } from 'react'

const page = {
  title: 'give feedback',
  subtitle: 'statistics'
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (setValue ,newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Header header={page.title}/>
      <Button handleClick={() => setToValue(setGood, good + 1)} text={'good'}/>
      <Button handleClick={() => setToValue(setNeutral, neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setToValue(setBad, bad + 1)} text={'bad'}/>
      <Header header={page.subtitle}/>
      <Statistics feedback={'good'} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Header = (props) => {
  return(
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const Statistics = (props) => {

  const total = props.good + props.neutral + props.bad

  if (total === 0) {
    return(
      <p>{'No feedback given'}</p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text={'good'} value={props.good}/>
        <StatisticLine text={'neutral'} value={props.neutral}/>
        <StatisticLine text={'bad'} value={props.bad}/>
        <StatisticLine text={'all'} value={total}/>
        <StatisticLine text={'average'} value={total / 3}/>
        <StatisticLine text={'positive'} value={(props.good / total) * 100} secondaryValue={'%'}/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return(
    <tr><td>{props.text}</td><td>{props.value}</td><td>{props.secondaryValue}</td></tr>
  )
}


export default App
