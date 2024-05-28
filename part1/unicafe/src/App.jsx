import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

const totalFeedback = (values) => {
  return values['good'] + values['neutral'] + values['bad']
}

const calculateAverage = ({ values, totalFeedbackCount }) => (
    (values['good']*1 + values['bad']*-1)/(totalFeedbackCount)
  )

const percentPositiveFeedback = ({ values, totalFeedbackCount }) => (
  values['good']*100/totalFeedbackCount
)

const StatisticLine = (props) => (
  <div>{props.text}: {props.value}</div>
)

const Statistics = ({ values }) => {
  const totalFeedbackCount = totalFeedback(values)
  if (totalFeedbackCount) {
    return (
      <div>
        <StatisticLine text="good" value ={values['good']} />
        <StatisticLine text="neutral" value ={values['neutral']} />
        <StatisticLine text="bad" value ={values['bad']} />
        <StatisticLine text="average" value ={calculateAverage({values, totalFeedbackCount})} />
        <StatisticLine text="positive" value ={percentPositiveFeedback({values, totalFeedbackCount})+'%'} />
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