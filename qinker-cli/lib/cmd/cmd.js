const exec = require("child_process").exec;
const msg = require("./msg");

class qinkerCli {
  constructor() {
    this.exec = exec;
    this.argv = process.argv.splice(2, process.argv.length);
    this.msg = msg;
    this.filter() // get error
    this.fetch(); // fetch argv to Function
  }

  argvError() {
    console.log("");
    console.log("you must use command and option.");
    console.log("");
    console.log("please console -v or -version");
  }
  fetch() {
    const command = this.argv[0];
    const option = this.argv[1];
  }
  /**
   * 1、判断是否是help参数，如果是就运行help函数。
   * 2、遍历command，command是否存在，不存在则运行error函数。
   * @memberof qinkerCli
   */
  filter() {
    if (this.argv.indexOf("-v") || this.argv.indexOf("-version")) {
        this.help();
        return;
    }
    const commands = this.argv[0];
    const option = this.argv[1];
    const isHaveCommand = Object.keys(this.msg.command).indexOf(commands);

    if (!isHaveCommand) this.argvError();
    const isHaveOption = this.msg.command[commands]
    console.log(isHaveOption)
    // if (!isHaveOption) this.argvError();
  }

  help() {
    console.log("");
    console.log(`-----help-----`);
    console.log(this.msg.description);
    console.log("");
    console.log("* cli  <command> <option>");
    console.log("* cli vue parcel ");
    console.log("");
    console.log("you must use command and option.");
    return;
  }
}

module.exports = qinkerCli;
