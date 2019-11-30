import React, {useState,useEffect} from 'react';
import getInvertedIndexedData from '../actions/invertedindexing';
// import pdfjs from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function TabIcons({tabIndex,setTabIndex}){
    const icons=["fas fa-align-left","far fa-file-pdf"];

    return <div className="icons">
        {icons.map((icon,index)=>(
            <i
                onClick={() => setTabIndex(index)}
                class={tabIndex == index
                ? icon + " active": icon}>
            </i>))}
    </div>
}

function TabData({tabIndex,text,setText,handleChange,setSearchViewOn}){
    return <div className="tabbox">
        <Data tabIndex={tabIndex} text={text} setText={setText} handleChange={handleChange} setSearchViewOn={setSearchViewOn} />
    </div>
}

function Data({tabIndex,setText,text,handleChange,setSearchViewOn}){
    switch(tabIndex){
        case 0: return <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter Some Text..."></textarea>; break;
        case 1: return <div className="uploaderbox">
                <h3>Upload</h3>
                <button style={{background: 'blue'}}>
                    <label htmlFor="pdfuploader">
                        Browse
                    </label>
                </button>
                <input id="pdfuploader" type="file" accept=".pdf" disabled onChange={(e)=>handleChange(e,setText,setSearchViewOn)} multiple={false}/>
            </div>; break;
        default: return <h3>Please Click on a Tab Icon!</h3>; break;
    }
}

function TabButton({disabled,text,setData,saveInvertedIndexedArr,setSearchViewOn}){
    return (<div class="right">
        <button className={!disabled &&"fromtop"} disabled={disabled} onClick={()=>saveInvertedIndexedArr(text,setData,setSearchViewOn)}>Save</button>
    </div>
    )
} 

export default function Tabs({setData,setText,text,setSearchViewOn}) {
    const [tabIndex,setTabIndex] = useState(0);

    return (
        <div class="frame-bg">
            <TabIcons tabIndex={tabIndex} setTabIndex={setTabIndex} />
            <TabData tabIndex={tabIndex} text={text} setText={setText} handleChange={handleChange} setSearchViewOn={setSearchViewOn} />
            <TabButton disabled={text.length <= 3} text={text} setData={setData} 
                saveInvertedIndexedArr={saveInvertedIndexedArr} setSearchViewOn={setSearchViewOn} />
        </div>
    )
}

function saveInvertedIndexedArr(text,setData,setSearchViewOn){
    var data = getInvertedIndexedData(text);
    localStorage.setItem('text',text);
    localStorage.setItem('data',JSON.stringify(data));
    setData(data);
    setSearchViewOn(true);
}

function handleChange(e,setText,setSearchViewOn){
    var file = e.target.files[0];
}
