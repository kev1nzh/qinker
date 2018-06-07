const exec = require("child_process").exec;
const fs = require("fs");

let compileTemp = async (projectName, file) => {
  await createFolder(localPath(), projectName);
  const filePath = localPath() + "/" + projectName;
  await createFolder(filePath, "src");
  await createFolder(filePath + "/src", "assets");
  await createFolder(filePath + "/src", "components");
  await createFolder(filePath + "/src", "router");

  for (let i of file) {
    // const newPath
    const newPath =
      localPath() +
      "/" +
      projectName +
      "/" +
      i.filePath
        .split("/")
        .slice(
          i.filePath.split("/").indexOf("template") + 2,
          i.filePath.split("/").length
        )
        .join("/");
    await createFile(newPath, i.fileData);
  }
  console.log("-----------------------------");
  console.log("       completed ok!");
  console.log("       welcome qinker!");
  console.log("-----------------------------");
};
let localPath = () => {
  return process.cwd();
};
let cmdUse = cmdStr => {
  exec(cmdStr, (err, stdout, srderr) => {
    if (err) {
      console.log(srderr);
    } else {
      console.log(stdout);
    }
  });
};
let createFolder = async (path, name) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path + "/" + name, err => {
      if (err) reject(err);
      console.log("create  " + path + "/" + name + ".....");
      resolve("ok");
    });
  });
};
let createFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      console.log("create  " + path + ".....");
      resolve("ok");
    });
  });
};

module.exports = {
  localPath,
  createFolder,
  createFile,
  cmdUse,
  compileTemp
};
