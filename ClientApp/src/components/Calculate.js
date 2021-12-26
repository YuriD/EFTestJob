import React, { useContext } from 'react'
import Plot from 'react-plotly.js'
import { UserContext } from './UserContext'

export const UsersPlot = () => {
  const u = useContext(UserContext)
  const data = {}
  let ret7d = 0, reg7d = 0, now = new Date(), diffTime = 0, diffDay = 0, rollRet = 0 

  u.users.forEach(user => {
    diffTime = Math.abs(new Date(user.dLastAct) - new Date(user.dReg))
    diffDay = Math.ceil(diffTime / (1000 * 3600 * 24))
    if (diffDay >= 7) ret7d += 1
    if (Math.ceil(Math.abs(now - new Date(user.dReg)) / (1000 * 3600 * 24)) >= 7) reg7d += 1
    if (diffDay in data) {
      data[diffDay] = data[diffDay] + 1
    } else {
      data[diffDay] = 1
    }
  });

  rollRet = (ret7d / reg7d * 100).toPrecision(3)

  return <>
    <p style={{ textAlign: 'center', padding: '2rem', fontSize: '15pt', fontFamily: 'verdana', color: 'blue' }}>
      Rolling Retention 7 day: <span style={{ color: 'Brown' }}>{rollRet}%</span> </p>
    <Plot
      data={[
        { type: 'bar', x: Object.keys(data), y: Object.keys(data).map(key => data[key]), marker: { color: 'darkseagreen'  }}
      ]}
      layout={{ title: "Distribution of user lives in days", font: { color: 'blue', size: 14 } }}
      style={{ width: '100%', height: 650 }}
    />
  </>;
}

