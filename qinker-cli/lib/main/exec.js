const qa = (desc, foo) => {
  process.stdout.write(desc);
  process.stdin.resume();
  process.stdin.setEncoding("utf-8");
  process.stdin.on("data", foo(e));
};
module.exports = {
  qa
};
