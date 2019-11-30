export default function performSearch(word,invertedData,text){
    word = word.toLowerCase().trim();
    var words = word.split(" ");
    var filteredArr = [];
    text = text.replace(/<[^>]+>/g, '');
    const paras = text.split("\n\n");
    words.map(word=>{
        var filteredData = invertedData.filter(obj=>obj.word.indexOf(word)>-1);
        filteredData.map((obj,index)=>{
            obj.data.map((innerObj,innerIndex)=>{
                let found = filteredArr.findIndex(str=>str == paras[innerObj.docIndex]);
                let tmpPara = paras[innerObj.docIndex]
                if(found !== -1){
                    filteredArr[found] = tmpPara;
                }else{
                    filteredArr.push(tmpPara);
                }
            })
        })
    })

    return filteredArr.join("<br/><br/>");
}

function getUnique(array){
    var uniqueArray = [];
    
    // Loop through array values
    for(let i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}