const glob = require('glob');
const readline = require('readline');
const fs = require('fs');

const mysql = require('mysql');

const  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql_01",
    database: "investmate"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!")
  });

  function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return year +'-'+ month + '-' + day  ;
}


  let dataArr ;
  let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  let srcPath = 'C:\\Users\\ganla\\Downloads\\'  ;
  let tgtPath = 'C:\\data\\investment\\portfolio\\' ;

glob(srcPath+'quote*.csv', {}, (err, files)=>{
        //console.log(files);
        for (var i=0; i < files.length; i++ ) {
            console.log(files[i]);

            let stats = fs.statSync(files[i]);
            let fdate = getFormattedDate( stats["mtime"]);


            let readInterface = readline.createInterface({
                input: fs.createReadStream(files[i]),
                // output: process.stdout,
                console: false
            });

            readInterface.on('line', function(line) {
                // console.log(line);
                   dataArr = line.split(',');
                   if (dataArr[0]  == 'Symbol' ) {
                       console.log ('Header col')
                   }
                   else {
                       //console.log(dataArr);
                       dataArr[0] = dataArr[0] == '' ? " " : dataArr[0];
                       dataArr[1] = dataArr[1] == '' ? "0" : dataArr[1];
                       dataArr[2] = dataArr[2] == '' ? fdate : dataArr[2];
                       dataArr[3] = dataArr[3] == '' ? " " : dataArr[3];
                       dataArr[4] = dataArr[4] == '' ? "0" : dataArr[4];
                       dataArr[5] = dataArr[5] == '' ? "0" : dataArr[5];
                       dataArr[6] = dataArr[6] == '' ? "0" : dataArr[6];
                       dataArr[7] = dataArr[7] == '' ? "0" : dataArr[7];
                       dataArr[8] = dataArr[8] == '' ? "0" : dataArr[8];
                       dataArr[9] = dataArr[9] == '' ? " " : dataArr[9];
                       dataArr[10] = dataArr[10] == '' ? "0" : dataArr[10];
                       dataArr[11] = dataArr[11] == '' ? "0" : dataArr[11];
                       dataArr[12] = dataArr[12] == '' ? "0" : dataArr[12];
                       dataArr[13] = dataArr[13] == '' ? "0" : dataArr[13];
                       dataArr[14] = dataArr[14] == '' ? "0" : dataArr[14];
                       dataArr[15] = dataArr[15] == '' ? " " : dataArr[15];
                       
                      console.log(dataArr);
                
                      let sql = mysql.format(insertQuery,["portfolio_stage","Symbol","CurrentPrice", "CurrentDate" ,
                                "CurrentTime" ,"ChangePct" ,"OpenAmt" ,"HighAmt" ,"LowAmt" ,"TradeVolume",
                                "TradeDate" ,"PurchasePrice" ,"Quantity","Commission","HighLimit","LowLimit","UserComment","file_date"  
                               ,dataArr[0],dataArr[1], dataArr[2],dataArr[3], dataArr[4],dataArr[5], dataArr[6],dataArr[7]
                               ,dataArr[8],dataArr[9], dataArr[10],dataArr[11],dataArr[12],dataArr[13],dataArr[14],dataArr[15],fdate
                               ] );
                       
                       con.query(sql, function (err, result) {
                           if (err) throw err;
                           console.log("1 record inserted");
                
                       });
                       console.log(dataArr); 
                   }
               
               })
               // Now move the file from this directory to its own with date 
               fs.renameSync(files[i],tgtPath+fdate+'quotes_'+[i]+'.txt')
            }   

        //return(files);
        })
 