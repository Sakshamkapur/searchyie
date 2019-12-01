import React,{useState,useEffect} from 'react';
import performSearch from '../actions/performsearch';

function TabData({text}){
    if(text.indexOf("\n\n") > -1) text = text.split("\n\n").join("<br/><br/>");
    if(text.trim().length > 0){
        return <div className="tabbox" dangerouslySetInnerHTML={{__html: text}}></div>
    }else{
        return <div className="tabbox">
            <span>No Match Found !!</span>
        </div>
    }
}

function BackButton({setSearchViewOn,originalText,setText}){
    return <i onClick={()=>{
        setText(originalText)
        setSearchViewOn(false)
    }} class="fas fa-arrow-left back"></i>
}

export default function TapInput({text,setText,data,type,placeholder,setSearchViewOn}){
    const [searchword,setSearchWord] = useState("");
    const [originalText,setOriginalText] = useState(text);

    useEffect(()=>{
        if(searchword.length > 0){
            const newText = performSearch(searchword,data,originalText);
            setText(newText);
        }else{
            setText(originalText)
        }
    },[searchword]);

    return (<React.Fragment>
        <div class="frame-bg">
            <BackButton setSearchViewOn={setSearchViewOn} originalText={originalText} setText={setText} />
            <input 
                type={type} 
                placeholder="Enter Something.." 
                value={searchword} 
                onChange={(e)=>setSearchWord(e.target.value)} 
            />
            <TabData text={text} />
        </div>
        </React.Fragment>
    )
} 