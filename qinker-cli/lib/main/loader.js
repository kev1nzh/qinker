const fs = require("fs");
const path = require("path");
const { localPath } = require("./file");
const fileBox = []; //全局array
/**
 * 获取文件数据
 * @param {String} filedir
 * @returns 文件数据
 */
let getFileData = async filedir => {
  return new Promise((resolve, reject) => {
    fs.readFile(filedir, "binary", (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
/**
 *
 * 获取文件夹下的所有文件
 * @param {String} filePath
 * @returns 文件夹下的所有文件
 */
let read = async filePath => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};
/**
 *
 *  判断是否是文件or文件夹
 * @param {String} filedir
 * @returns
 */
let isFile = async filedir => {
  return new Promise((resolve, reject) => {
    fs.stat(filedir, (err, stats) => {
      if (err) reject(err);
      const result = stats.isFile();
      resolve(result);
    });
  });
};
/**
 *递归获取param文件夹中的所有文件
 *
 * @param {String} filePath
 */
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
/**
 *
 * 获取绝对路径、文件数据和文件名。
 * @param {String} dirPath
 * @returns {Array} result
 */
let loader = async (dirPath) => {

  const url = path.resolve(
    __dirname.substring(0, __dirname.length - 9) + dirPath
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
