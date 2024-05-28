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

const StatisticRow = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({ values }) => {
  const totalFeedbackCount = totalFeedback(values)
  if (totalFeedbackCount) {
    return (
      <table>
        <tr>
          <th />
          <th />
        </tr>
        <StatisticRow text="good" value ={values['good']} />
        <StatisticRow text="neutral" value ={values['neutral']} />
        <StatisticRow text="bad" value ={values['bad']} />
        <StatisticRow text="all" value ={totalFeedbackCount} />
        <StatisticRow text="average" value ={calculateAverage({values, totalFeedbackCount})} />
        <StatisticRow text="positive" value ={percentPositiveFeedback({values, totalFeedbackCount})+'%'} />
      </table>
    )
  }
  return (
    <div>No feedback yet!</div>
  )
}

const App = () => {
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