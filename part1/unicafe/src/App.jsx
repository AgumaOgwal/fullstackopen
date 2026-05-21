import { useState } from 'react'

const Button = (props) => {

    return (
      <button onClick={props.onClick}>{props.text}</button>
    )
}

const StatisticLine = (props) => {

  return (
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </>
    
  )
}
const Statistics = (props) => {

  if (props.stats.all === 0) {

    return ( 
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p> 
      </>
    )
  }
    
  else {
    return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.stats.good} />
          <StatisticLine text='neutral' value={props.stats.neutral} />
          <StatisticLine text='bad' value={props.stats.bad} />
          <StatisticLine text='all' value={props.stats.all} />
          <StatisticLine text='average' value={props.stats.average} />
          <StatisticLine text='positive' value={props.stats.positive}/>
        </tbody>
      
      </table>
      
    </>
    
  )
  }

  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleBad = () => {
    setBad(bad+1)
    setAll(all+1)
  }

  let average = all === 0 ? 0 : ((good * 1) + (neutral * 0) + (bad * -1)) / all
  let positive = all === 0 ? 0 + " %" :  ((good / all) * 100) + " %"
  
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive, positive
  }

  console.log(stats)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad' />
      <Statistics stats={stats} />


    </div>
  )
}

export default App