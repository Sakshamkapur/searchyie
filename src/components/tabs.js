import React, {useState} from 'react';
import getInvertedIndexedData from '../actions/invertedindexing';
import pdfjsLib from 'pdfjs-dist/webpack';

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

function TabData({tabIndex,text,fileData,setFileData,setText,setData,handleChange,setSearchViewOn}){
    return <div className="tabbox">
        <Data tabIndex={tabIndex} 
            text={text} setText={setText} setData={setData} setFileData={setFileData}
            fileData={fileData}
            handleChange={handleChange} setSearchViewOn={setSearchViewOn} />
    </div>
}

function Data({tabIndex,fileData,setFileData,setText,text,setData,handleChange,setSearchViewOn}){
    switch(tabIndex){
        case 0: return <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter Some Text..."></textarea>; break;
        case 1: return <div className="uploaderbox">
                <h3>Upload</h3>
                {fileData && <div>
                    <i className="far fa-file-pdf" style={{fontSize: '3em'}} />
                    <p>{fileData.name}</p>
                </div>}
                <button style={{background: 'blue'}}>
                    <label htmlFor="pdfuploader">
                        Browse
                    </label>
                </button>
                <input id="pdfuploader" type="file" accept=".pdf" 
                    onChange={(e)=>handleChange(e,setText,setSearchViewOn,setData,setFileData)} multiple={false}/>
            </div>; break;
        default: return <h3>Please Click on a Tab Icon!</h3>; break;
    }
}

function TabButton({disabled,text,setText,setFileData,setData,saveInvertedIndexedArr,setSearchViewOn}){ 
    return (<div class="right">
        <button className={!disabled &&"fromtop"} disabled={disabled} onClick={()=>clearAllData(setFileData,setText,setData)}>Clear</button>
        <button className={!disabled &&"fromtop"} disabled={disabled} onClick={()=>saveInvertedIndexedArr(text,setData,setSearchViewOn)}>Search</button>
    </div>
    )
} 

export default function Tabs({fileData,setFileData,setData,setText,text,setSearchViewOn}) {
    const [tabIndex,setTabIndex] = useState(0);

    return (
        <div class="frame-bg">
            <TabIcons tabIndex={tabIndex} setTabIndex={setTabIndex} />
            <TabData tabIndex={tabIndex} 
                text={text} setText={setText} setData={setData} fileData={fileData}
                setFileData={setFileData}
                handleChange={handleChange} setSearchViewOn={setSearchViewOn} />
            <TabButton disabled={text.length <= 3 && !fileData} text={text} setData={setData} setText={setText} saveInvertedIndexedArr={saveInvertedIndexedArr} 
                setFileData={setFileData}  setSearchViewOn={setSearchViewOn} />
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


//pdf 
function handleChange(e,setText,setFileData,setSearchViewOn,setData){
    var file = e.target.files[0];
    localStorage.setItem('file',JSON.stringify({name: file.name}));
    setFileData(file); 
    var reader = new FileReader();

    reader.onload = ()=>{

        var loadingTask = pdfjsLib.getDocument({data: reader.result});
        loadingTask.promise.then(function(pdf) {
            console.log(pdf)
            gettext(pdf).then((tmpText)=>{
                var data = getInvertedIndexedData(tmpText);
                localStorage.setItem('text',tmpText);
                localStorage.setItem('data',JSON.stringify(data));
                setText(tmpText);
                setData(data);
                setSearchViewOn(true);
            });
        })
    }
        
    reader.readAsBinaryString(file);
}

function gettext(pdf){
    var maxPages = pdf._pdfInfo.numPages;
    var countPromises = []; // collecting all page promises
    for (var j = 1; j <= maxPages; j++) {
        var page = pdf.getPage(j);

        var txt = "";
        countPromises.push(page.then(function(page) { // add page promise
            var textContent = page.getTextContent();
            return textContent.then(function(text){ // return content promise
                return text.items.map(function (s) { return s.str; }).join(''); // value page text 

            });
        }));
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
        return texts.join('\n\n');
    });
}

function clearAllData(setFileData,setText,setData){
    localStorage.clear();
    setFileData(null); 
    setText(""); 
    setData(null); 
}