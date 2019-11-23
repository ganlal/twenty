const glob = require('glob');
const readline = require('readline');
const fs = require('fs');

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return year +'-'+ month + '-' + day  ;
}

let srcPath = 'C:\\Users\\ganla\\Downloads\\'  
let tgtPath = 'C:\\data\\invest\\portfolio\\'

glob(srcPath+'quote*.csv', {}, (err, files)=>{
    //console.log(files);
    for (var i=0; i < files.length; i++ ) {

        let stats = fs.statSync(files[i]);
        let fdate = getFormattedDate( stats["mtime"]);
        console.log(tgtPath+fdate+'quotes_'+[i]+'.txt');
        fs.renameSync(files[i],tgtPath+fdate+'quotes_'+[i]+'.txt')
        }
}
)