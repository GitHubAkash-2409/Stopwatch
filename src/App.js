import React, { useEffect, useState } from 'react'
import './App.css';

const App = () => {

  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const [hour, setHour] = useState(0)
  const [Running, setRunning] = useState(false)

  useEffect(() => {
    let intervalId = null;
    if (Running) {
      intervalId = setInterval(() => {
        setSec(prevSecond => {
          if (prevSecond === 59) {
            setMin(prevMin => {
              if (prevMin === 59) {
                setHour(prevHour => prevHour + 1);
                return 0;
              } else {
                return prevMin + 1;
              }
            });
            return 0;
          } else {
            return prevSecond + 1;
          }
        });
      }, 1000);
    }
 
    return () => clearInterval(intervalId);
  }, [Running]);

  const handleStart =() => {
      setRunning(true)
  }

  const handleStop =() => {
    setRunning(false)
  }

  const handleRestart =() => {
      setHour(0)
      setMin(0)
      setSec(0)
  }
  

  return (
    <div className='app'>
      <div className='container'>
      <p className='time'>{hour<10? "0"+hour: hour}:{min<10? "0"+min: min}:{sec<10? "0"+sec: sec}</p>
      <div className='btn-style'>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleRestart}>Restart</button>
      </div>
     </div>
    </div>
  )
}

export default App