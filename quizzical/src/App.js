import React from 'react';
import './css/main.css'
import Start from './components/Start';
import Quiz from './components/Quiz';
import blob5 from './assets/images/blob 5.png'
import blobs from './assets/images/blobs.png'

function App() {
  const [started, setStarted] = React.useState(false)
  

  function startQuiz() {
    if(!started) setStarted(true)
  }

  return (
    <div className="App">
      <img src={blob5} className='blob5'/>
      <img src={blobs} className='blobs'/>
      {!started && <Start btnFunc={startQuiz} />}
      {started && <Quiz />}
    </div>
  );
}

export default App;
