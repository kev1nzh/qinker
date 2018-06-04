const exec = require("child_process").exec;

const cmd = async cmdStr => {
    
    exec(cmdStr, (err, stdout, srderr) => {
        if (err) {
            console.log(srderr);
        }
        else {
            console.log(stdout);
        }
    });
}
module.exports ={
    cmd
}