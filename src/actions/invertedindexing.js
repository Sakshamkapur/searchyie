



export default function getInvertedIndexedData(str){
    const para = str.split("\n\n");
    var arr = [];
    para.map((str,paraIndex)=>{
        var words = str.split(" ");
        words.map((text,wordIndex)=>{
            var word = text.toLowerCase().trim();
            if(word.length > 0){
                const found = arr.findIndex(obj=>obj.word == word);
                if(found !== -1){
                    arr[found].data.push({
                        docIndex: paraIndex,
                        wordIndex: wordIndex
                    });
                }else{
                    arr.push({
                        word: word,
                        data: [{
                            docIndex: paraIndex,
                            wordIndex: wordIndex
                        }]
                    });
                }
            }
        })
    })
    return arr;
}

