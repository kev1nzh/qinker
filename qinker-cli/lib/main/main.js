const path = require("path");
const msg = require("./msg");
const { compileTemp, compilePage } = require("./file");
const loader = require("./loader");

class qinkerCli {
  constructor() {
    this.argv = process.argv.splice(2, process.argv.length);
    this.msg = msg;
    this.filterResult = false;
    this.fileBox = [];
    this.filter(); // get error
    this.fetch(); // fetch argv to Function
  }
  /**
   * error Function
   * @memberof qinkerCli
   */
  argvError() {
    console.log("");
    console.log("you must use command and option.");
    console.log("");
    console.log("please console -v or -version");
  }
  /**
   *  fecth to all function
   *  1、判断filter函数是否筛选成功。
   *  2、之后根据command参数来分别使用Function。
   * @memberof qinkerCli
   */
  fetch() {
    if (!this.filterResult) return;
    const command = this.argv[0];
    const option = this.argv[1];
    if (command == "createVue") {
      this.vueProject(option);
    }
    if (command == "createFormat") {
      this.vueFormat(option);
    }
  }
  /**
   *  构建vue模板function
   *  读取vue模板的数据后 编译至运行cmd的路径下。
   * @param {String} projectName
   * @memberof qinkerCli
   */
  async vueProject(projectName) {
    if (!projectName) {
      this.argvError();
      return;
    }
    console.log("[vue-parcel] completed start!");
    const templateData = await loader("/template/parcel-vue");
    const result = await compileTemp(projectName, templateData);
  }
  /**
   *构建vue模板function
   *  读取vue模板的数据后 编译至运行cmd的路径下。
   * @param {String} fileName
   * @memberof qinkerCli
   */
  async vueFormat(fileName) {
    console.log("[vue-format] completed start!");
    const templateData = await loader("/template/format-vue");
    const result = await compilePage(
      fileName,
      templateData[0].fileData.replace(/index/g, fileName)
    );
  }
  /**
   * 1、判断是否 帮助 参数 如果是则使用help()
   * 2、判断是否有两个参数 <command> <name>
   * 3、判断第一参数是否为已有配置。
   * 4、吐出result结果，继续运行fetch函数
   * @memberof qinkerCli
   */
  filter() {
    if (
      this.argv.indexOf("-v") !== -1 ||
      this.argv.indexOf("-version") !== -1
    ) {
      this.help();
      return;
    }
    if (!this.argv.length) {
      this.argvError();
      return;
    }
    const commands = this.argv[0];
    const isHaveCommand = this.msg.command.indexOf(commands);
    if (isHaveCommand === -1) {
      this.argvError();
      return;
    }

    this.filterResult = true;
  }

  help() {
    console.log("");
    console.log(`-----help-----`);
    console.log(this.msg.description);
    console.log("");
    console.log("* cli  <command> <projectName>");
    console.log(
      "* cli    vue    myVueProject  @vue+vue-router+element-ui+parcel"
    );
    console.log("");
    console.log("you must use command and option.");
    return;
  }
}

module.exports = qinkerCli;
