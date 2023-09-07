const fs = require("fs");
const uploadFile = require('../middleware/upload')
const baseUrl = "http://192.168.0.111:3000/api/files/";
const __basedir = "";

const upload = async (req, res) => {
    try {
        await uploadFile(req,res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please select a file!" });
        }

        res.status(200).send({
            message: "File uploaded successfully: " + req.file.originalname
        });
    } catch(err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`
        })
    }
}

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "../storage";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "../storage/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
    upload,
    getListFiles,
    download,
};