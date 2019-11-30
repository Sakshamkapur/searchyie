export default function performSearch(word,invertedData,text){
    var words = word.toLowerCase().trim().split(" ");
    var filteredArr = [];
    const paras = text.replace(/<[^>]+>/g, '').toLowerCase().split("\n\n");
    words.map(word=>{
        var filteredData = invertedData.filter(obj=>obj.word.indexOf(word)>-1);
        filteredData.map((obj,index)=>{
            obj.data.map((innerObj,innerIndex)=>{
                let found = filteredArr.findIndex(str=>str.replace(/<[^>]+>/g, '') == paras[innerObj.docIndex].replace(/<[^>]+>/g, ''));
                let tmpPara = paras[innerObj.docIndex].replace(/<[^>]+>/g, '')
                    .replaceAll(word,`<span style="background: yellow;">${word}</span>`)
                if(found !== -1){
                    let re = new RegExp(word + '(?=[^<>]*(<|$))', 'g')
                    filteredArr[found] = filteredArr[found].replaceAll(re,`<span style="background: yellow;">${word}</span>`);
                }else{
                    filteredArr.push(tmpPara);
                }
            })
        })
    })

    if(filteredArr.length > 10){
        return filteredArr.filter((str,index)=>index<10).join("<br/><br/>");
    }

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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};