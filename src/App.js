import React, {useState, useEffect} from 'react';
import TapInput from './components/tapinput';
import Tabs from './components/tabs';
import './App.css';

function App() {
  const dataVal = JSON.parse(localStorage.getItem('data'));
  const fileVal = JSON.parse(localStorage.getItem('file'));
  const textVal = localStorage.getItem('text');
  const [data,setData] = useState(dataVal);
  const [text,setText] = useState(textVal ? textVal:"");
  const [searchViewOn,setSearchViewOn] = useState(!!dataVal);
  const [fileData,setFileData] = useState(fileVal);
  
  return (<React.Fragment>
      {!!searchViewOn && <TapInput data={data} text={text} setText={setText} fileData={fileData} setFileData={setFileData} setSearchViewOn={setSearchViewOn} />}
      {!searchViewOn && <Tabs text={text} setData={setData} fileData={fileData} setFileData={setFileData} setText={setText} setSearchViewOn={setSearchViewOn} />}
    </React.Fragment>
  )
}

export default App;
