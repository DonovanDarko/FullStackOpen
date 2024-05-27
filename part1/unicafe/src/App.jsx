import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const Stat = ({ values, statistic }) => (
  <div>{statistic}: {values[statistic]}</div>
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

  const totalFeedback = good+neutral+bad
  
  const calculateAverage = () => {
    if (totalFeedback) {
      return (values['good']*1 + values['bad']*-1)/(totalFeedback)
    }
    return 0
  }

  const percentPositiveFeedback = () => {
    if (totalFeedback) {
      return (values['good']*100/totalFeedback)
    }
    return 0
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
      <div>average: {calculateAverage()}</div>
      <div>positive: {percentPositiveFeedback()}%</div>

    </div>
  )
}

export default App