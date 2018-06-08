const exec = require("child_process").exec;
const fs = require("fs");

/**
 *
 * 编译单页面函数
 * @param {String} fileName 文件名
 * @param {String} file 文件数据
 */
let compilePage = async (fileName, file) => {
  const newPath = localPath() + '/' + fileName + '.vue'
  await createFile(newPath, file)
  console.log("-----------------------------");
  console.log("       completed ok!");
  console.log("       welcome qinker!");
  console.log("-----------------------------");
}

/**
 *
 * 获取cmd路径后编译文件夹和文件
 * @param {String} projectName 项目名
 * @param {Object} file 文件对象
 */
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

/**
 * @returns {String} 获取cmd当前路径
 */
let localPath = () => {

  return process.cwd();
};

/**
 *  传入cmd命令，运行函数后调用 已废弃
 * @param {String} cmdStr
 */
let cmdUse = cmdStr => {
  
  exec(cmdStr, (err, stdout, srderr) => {
    if (err) {
      console.log(srderr);
    } else {
      console.log(stdout);
    }
  });
};

/**
 *
 * 创建文件夹
 * @param {String} path
 * @param {String} name
 * @returns
 */
let createFolder = async (path, name) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path + "/" + name, err => {
      if (err) reject(err);
      console.log("create  " + path + "/" + name + ".....");
      resolve("ok");
    });
  });
};
/**
 *
 * 创建文件
 * @param {String} path
 * @param {String} data
 * @returns
 */
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
  compileTemp,
  localPath,
  compilePage
};
