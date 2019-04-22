#!/usr/bin/env node
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

const commands = ({
  license = "MIT",
  name = "Default",
  email = "default@email.com"
}) => [
  `git init`,
  `npx license ${license} -o "${name}" > LICENSE`,
  `npx gitignore node`,
  `npx covgen "${email}"`,
  `npm init -y`,
  `echo "# New Project"  > readme.md`,
  "git add -A",
  'git commit -m "Initial commit"'
];

const main = async () => {
  try {
    let config = await run("npm config list --json");
    config = JSON.parse(config);
    let [name, email, license] = [
      config["init.author.name"],
      config["init.author.email"],
      config["init.license"]
    ];

    if (!(name && email && license)) {
      console.log(`
      Default value is not set.
      please use the below code to set the values.

      npm set init.author.name "Your name"
      npm set init.author.email "your@email.com"
      npm set init.author.url "https://your-url.com"
      npm set init.license "MIT"
      npm set init.version "0.0.1"
      `);
      return;
    }

    const _commands = commands({ name, email, license });
    for (let i = 0; i < _commands.length; i++) {
      const cmd = _commands[i];
      console.log(cmd);
      const output = await run(cmd);
      console.log(output);
    }
  } catch (error) {
    console.error(error);
  }
};

main();
