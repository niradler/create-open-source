const inquirer = require("inquirer");
const { run } = require("../../helpers/cmd");

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
  `echo New Project >> readme.md`,
  "git add -A",
  'git commit -m "Initial commit"'
];

const getData = async () => {
  let config = await run("npm config list --json");
  config = JSON.parse(config);
  let [name, email, license] = [
    config["init.author.name"],
    config["init.author.email"],
    config["init.license"]
  ];

  const questions = [
    {
      type: "input",
      name: "name",
      message: "Contact Full name?",
      default: email || "info@default.com"
    },
    {
      type: "input",
      name: "email",
      message: "Contact Email:",
      default: name || "info@default.com"
    },
    {
      type: "list",
      name: "license",
      message: "Project license:",
      default: license || "mit",
      choices: [
        "zlib",
        "wtfpl",
        "mpl",
        "mit",
        "lgpl",
        "gpl3",
        "gpl2",
        "epl",
        "cddl",
        "cc0",
        "bsd3",
        "bsd2",
        "apache",
        "agpl3"
      ]
    }
  ];

  return inquirer.prompt(questions);
};

const basic = async () => {
  await getData();
  const _commands = commands({ name, email, license });
  for (let i = 0; i < _commands.length; i++) {
    const cmd = _commands[i];
    await run(cmd);
  }
};

module.exports = basic;
