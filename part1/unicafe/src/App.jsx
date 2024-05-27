import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const Stat = ({ values, statistic }) => (
  <p>{statistic}: {values[statistic]}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const values = {
    'good': good,
    'neutral': neutral,
    'bad': bad
  }

  return (
    <div>
      <h1>Give Feedback Here!</h1>
      <Button handleClick = {() => setGood(good+1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad+1)} text = "bad"/>

      <h1>Stats!</h1>
      <Stat values={values} statistic='good'/>
      <Stat values={values} statistic='neutral'/>
      <Stat values={values} statistic='bad'/>

    </div>
  )
}

export default App