const exec = require("child_process").exec;

const run = cmd =>
  new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error !== null) {
        reject(error);
      }
      resolve(stdout);
    });
  });

module.exports = {
  run
};
