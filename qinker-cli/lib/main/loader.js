const fs = require("fs");
const path = require("path");
const { localPath } = require("./file");
const fileBox = [];
let getFileData = async filedir => {
  return new Promise((resolve, reject) => {
    fs.readFile(filedir, "binary", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
let read = async filePath => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};
let isFile = async filedir => {
  return new Promise((resolve, reject) => {
    fs.stat(filedir, (err, stats) => {
      if (err) reject(err);
      const result = stats.isFile();
      resolve(result);
    });
  });
};
let fileDisplay = async filePath => {
  const files = await read(filePath);
  for (let i of files) {
    const filedir = path.join(filePath, i);
    const isFileResult = await isFile(filedir);
    if (isFileResult) {
      fileBox.push(filedir);
    } else {
      await fileDisplay(filedir);
    }
  }
};

let loader = async () => {
  const url = path.resolve(
    __dirname.substring(0, __dirname.length - 9) + "/template/parcel-vue"
  );
  const fileFoo = await fileDisplay(url);
  const result = [];
  for (let i of fileBox) {
    result.push({
      filename: i.split("/")[i.split("/").length - 1],
      fileData: await getFileData(i),
      filePath: i
    });
  }
  return result;
};
module.exports = loader;
