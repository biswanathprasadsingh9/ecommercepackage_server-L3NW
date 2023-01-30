const response = require('express');

// INDEX
const index = (req,res) => {

    var pdf = require("pdf-creator-node");
    // var pdf = require("../index");
    var fs = require("fs");
    var path = require("path");
    // Read HTML Template
    var html = fs.readFileSync(path.join(__dirname, "../pdf_templete/templete.html"), "utf8");

    var options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      footer: {
            height: "28mm",
            contents: {
                // first: 'Cover page',
                // 2: 'Second page', // Any page number is working. 1-based index
                // default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                // last: 'Last Page'
                // default:'<center>This is computer generated receipt and does not require physical signature.</center>'
                default: '<span style="float: right;font-size:11px">Page {{page}} of {{pages}}</span>', // fallback value

            }
        }
    };

    var users = [
      {
        name: "Shyam",
        age: "26",
      },
      {
        name: "Navjot",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ];


    //INVOICE NUMBER
    var d = new Date();
    var n = d.valueOf();

    var invoice_number = 'EX'+n;






    var document = {
      html: html,
      data: {
        invoice_number,
        users: users,
        name:'Biswnath Prasad Singh'
      },
      path: "./pdf/output.pdf",
      type: "pdf", // "stream" || "buffer" || "" ("" defaults to pdf)
    };

    console.log(document);
    pdf
    .create(document, options)
    .then((resp) => {
      console.log(resp);

      res.json({
        response:true,
        data:resp
      })


    })
    .catch((error) => {
      console.error(error);
    });


  // res.json({
  //   response:true
  // })
}



const deletepdf = (req,res) => {
  const fs = require('fs');
           fs.unlink('./pdf/output.pdf', function (err) {
                if (err) {
                    console.error(err);
                    res.json({
                      response:false,

                    })
                }
                res.json({
                  response:true,
                })
            });
}

module.exports={index,deletepdf};
