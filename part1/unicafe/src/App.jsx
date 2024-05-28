import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const totalFeedback = (values) => {
  return values['good'] + values['neutral'] + values['bad']
}

const calculateAverage = (values) => {
  if (totalFeedback(values)) {
    return (values['good']*1 + values['bad']*-1)/(totalFeedback(values))
  }
  return 0
}

const percentPositiveFeedback = (values) => {
  if (totalFeedback(values)) {
    return (values['good']*100/totalFeedback(values))
  }
  return 0
}

const Statistics = ({ values }) => {
  if (totalFeedback(values)) {
    return (
      <div>
        <div>good: {values['good']}</div>
        <div>neutral: {values['neutral']}</div>
        <div>bad: {values['bad']}</div>
        <div>average: {calculateAverage(values)}</div>
        <div>positive: {percentPositiveFeedback(values)}%</div>
      </div>
    )
  }
  return (
    <div>No feedback yet!</div>
  )
}

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
      <Statistics values={values} />
    </div>
  )
}

export default App