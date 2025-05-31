const express = require("express");
const router = express.Router();
var axios = require('../../function/axios');
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');
const { jsPDF } = require("jspdf");
const pdf2base64 = require('pdf-to-base64');
var fs = require('fs');
var fsm = require('fs-extra')



Number.prototype.pad = function (n) {
  if (n === undefined)
    n = 2;

  return (new Array(n).join('0') + this).slice(-n);
}



router.post('/goPDF', async (req, res) => {
  //-------------------------------------
  console.log("--goPDF--");
  let input = req.body;


  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined, input[`PO`] != undefined) {
    let doc = new jsPDF("p", "mm", "a4", true);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    doc.save(`${input[`PO`]}.pdf`)

    const d = new Date();
    // let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    //
    console.log(month.pad(2))
    console.log(year.pad(4))


    //211,212 BP12PH
    //251,252 BP12KNG
    //331 ,332 HESISN
    //341 ,342 HESGAS 
    //311 ,312  HESPH

    //321 ,322  HESPAL
    //361 ,362  HESDEL
    //.substring(startIndex, endIndex)

    // var dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\${year.pad(4)}${(month+1).pad(2)}\\${input['PO']}`;
    var dir = ``;
    if (`${input['PO']}`.length > 4) {
      if (`${input['PO']}`.substring(0, 3) === '211' || `${input['PO']}`.substring(0, 3) === '212') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12PH\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '251' || `${input['PO']}`.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '331' || `${input['PO']}`.substring(0, 3) === '332') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN\\${input['PO']}`;
      }
      else if (`${input['PO']}`.substring(0, 3) === '341' || `${input['PO']}`.substring(0, 3) === '342') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESGAS\\${input['PO']}`;
      }
      else if (`${input['PO']}`.substring(0, 3) === '311' || `${input['PO']}`.substring(0, 3) === '312') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPH\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '321' || `${input['PO']}`.substring(0, 3) === '322') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPAL\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '361' || `${input['PO']}`.substring(0, 3) === '362') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESDEL\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '251' || `${input['PO']}`.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${input['PO']}`;
      }

      else {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${input['PO']}`;
      }
    } else {
      dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${input['PO']}`;
    }


    console.log(dir);

    //S4PRD\HSORDERSHEET_PP\Input
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    //save file แล้วผม read มาเป็น base64 ส่งกลับ

    await pdf2base64(`${input[`PO`]}.pdf`)
      .then(
        (response) => {
          // console.log(response); 
          fs.rmSync(`${input[`PO`]}.pdf`);
          bitmap = response;

        }
      )
      .catch(
        (error) => {
          fs.rmSync(`${input[`PO`]}.pdf`);
          // console.log(error); //Exepection error....

        }
      )

  }

  return res.json({ "PIC": bitmap });
});

router.post('/genfloder', async (req, res) => {
  //-------------------------------------
  console.log("--genfloder--");
  let input = req.body;


  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined, input[`PO`] != undefined) {
    // let doc = new jsPDF("p", "mm", "a4", true);
    // var width = doc.internal.pageSize.getWidth();
    // var height = doc.internal.pageSize.getHeight();

    // doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    // doc.save(`${input[`PO`]}.pdf`)

    // const d = new Date();
    // // let day = d.getDate();
    // let month = d.getMonth();
    // let year = d.getFullYear();
    // //
    // console.log(month.pad(2))
    // console.log(year.pad(4))

    // var dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\${year.pad(4)}${(month+1).pad(2)}\\${input['PO']}`;
    // var dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${input['PO']}`;

    var dir = ``;
    if (`${input['PO']}`.length > 4) {
      if (`${input['PO']}`.substring(0, 3) === '211' || `${input['PO']}`.substring(0, 3) === '212') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12PH\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '251' || `${input['PO']}`.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '331' || `${input['PO']}`.substring(0, 3) === '332') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN\\${input['PO']}`;
      }
      else if (`${input['PO']}`.substring(0, 3) === '341' || `${input['PO']}`.substring(0, 3) === '342') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESGAS\\${input['PO']}`;
      }
      else if (`${input['PO']}`.substring(0, 3) === '311' || `${input['PO']}`.substring(0, 3) === '312') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPH\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '321' || `${input['PO']}`.substring(0, 3) === '322') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPAL\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '361' || `${input['PO']}`.substring(0, 3) === '362') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESDEL\\${input['PO']}`;
      }

      else if (`${input['PO']}`.substring(0, 3) === '251' || `${input['PO']}`.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${input['PO']}`;
      }

      else {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${input['PO']}`;
      }
    } else {
      dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${input['PO']}`;
    }

    console.log(dir);

    //S4PRD\HSORDERSHEET_PP\Input
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    //save file แล้วผม read มาเป็น base64 ส่งกลับ

    // await pdf2base64(`${input[`PO`]}.pdf`)
    //   .then(
    //     (response) => {
    //       // console.log(response); 
    //       fs.rmSync(`${input[`PO`]}.pdf`);
    //       bitmap = response;

    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       fs.rmSync(`${input[`PO`]}.pdf`);
    //       // console.log(error); //Exepection error....

    //     }
    //   )

  }

  return res.json({ "PIC": bitmap });
});

router.post('/goPDF_TESTSAP', async (req, res) => {
  //-------------------------------------
  console.log("--goPDF--");
  let input = req.body;


  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined, input[`PO`] != undefined) {
    let doc = new jsPDF("p", "mm", "a4", true);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    doc.save(`${input[`PO`]}.pdf`)

    const d = new Date();
    // let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    console.log(month.pad(2))
    console.log(year.pad(4))

    var dir = `\\\\172.20.10.150\\sap_s4hana\\S4DEV\\HSORDERSHEET_PP\\input\\${input['PO']}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    //save file แล้วผม read มาเป็น base64 ส่งกลับ

    await pdf2base64(`${input[`PO`]}.pdf`)
      .then(
        (response) => {
          // console.log(response); 
          fs.rmSync(`${input[`PO`]}.pdf`);
          bitmap = response;

        }
      )
      .catch(
        (error) => {
          fs.rmSync(`${input[`PO`]}.pdf`);
          // console.log(error); //Exepection error....

        }
      )

  }

  return res.json({ "PIC": bitmap });
});

router.post('/RAWDATA/sapget', async (req, res) => {
  //-------------------------------------
  console.log("--RAWDATA/sapget--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`ORDER`] !== undefined) {


    try {
      let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
        "BAPI_NAME": "ZPPIN011_OUT",
        "IMP_TEXT02": input[`ORDER`],
        "TABLE_NAME": "PPORDER"
      });
      // if (resp.status == 200) {
      let returnDATA = resp;
      output = returnDATA["Records"] || []
      //  console.log(output)
      // }
    } catch (err) {
      output = [];
    }

  }


  //-------------------------------------
  return res.json(output);
});


router.post('/moveflodertoset/HESISN', async (req, res) => {
  //-------------------------------------
  console.log("--moveflodertoset/HESISN'--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  let infloder = [];

  // const folderPath = '\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN';
   const folderPath = '\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\TESTPLANT';
  let listorderfile = fs.readdirSync(folderPath);
  for (let i = 0; i < listorderfile.length; i++) {
    let orderlist = [];
    // infloder.push(fs.readdirSync(`\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN\\${listorderfile[i]}`))
    // orderlist = fs.readdirSync(`\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN\\${listorderfile[i]}`)
        orderlist = fs.readdirSync(`\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\TESTPLANT\\${listorderfile[i]}`)
    if (orderlist.length >= 2) {
      console.log(`${listorderfile[i]}`);
      infloder.push(`${listorderfile[i]}`)
    }

  }
  for (let i = 0; i < infloder.length; i++) {

    dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Inputtest\\${infloder[i]}`;
    fsm.move(`\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\TESTPLANT\\${infloder[i]}`, dir, function (err) {
      if (err) return console.error(err)
      console.log("success!")
    })

  }

  output = infloder;

  //-------------------------------------
  return res.json(output);
});

module.exports = router;




