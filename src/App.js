import React, {useState, useEffect} from 'react';
import TapInput from './components/tapinput';
import Tabs from './components/tabs';
import './App.css';

function App() {
  const [data,setData] = useState(null);
  const [text,setText] = useState("");
  const [searchViewOn,setSearchViewOn] = useState(false);
  
  return (<React.Fragment>
      {!!searchViewOn && <TapInput data={data} text={text} setText={setText} setSearchViewOn={setSearchViewOn} />}
      {!searchViewOn && <Tabs text={text} setData={setData} setText={setText} setSearchViewOn={setSearchViewOn} />}
    </React.Fragment>
  )
}

export default App;
