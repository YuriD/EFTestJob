import React, { useContext } from 'react'
import Plot from 'react-plotly.js'
import { UserContext } from './UserContext'

export const UsersPlot = () => {
  const u = useContext(UserContext)
  const data = {}
  let ret7d = 0, reg7d = 0, now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      diffTime = 0, diffDay = 0, rollRet = 0

  if (u.users.length === 0) {
    return <p className='p_calc'>There is no data available</p>
  }

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
    <p className='p_calc'>Rolling Retention 7 day: <span style={{ color: 'Brown' }}>{reg7d !== 0?rollRet+'%':'no valid data'}</span> </p>
    <Plot
      data={[
        { type: 'bar', x: Object.keys(data), y: Object.keys(data).map(key => data[key]), marker: { color:'SeaGreen'  }}
      ]}
      layout={{
        title: "Distribution of user lives in days",
        font: { color: 'blue', size: 14 },
        xaxis: {
          title: 'days from registration date to date of last activity', titlefont: { size: 18, color: 'Sienna' }},
        yaxis: { title: 'number of users', titlefont: { size: 18, color: 'Sienna' }}
      }}
      style={{ width: '100%', height: 650 }}
    />
  </>;
}

