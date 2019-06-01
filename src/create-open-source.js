#!/usr/bin/env node
const inquirer = require("inquirer");

console.log("Create open source menu:");

const templatesOptions = [
  {
    key: "basic",
    name: "basic",
    value: "basic"
  }
  // {
  //   key: "linter",
  //   name: "eslint/prettier/hooks",
  //   value: "linter"
  // },
  // {
  //   key: "jest",
  //   name: "eslint/prettier/hooks/jest",
  //   value: "jest"
  // }
];

const questions = [
  {
    type: "list",
    name: "template",
    message: "Pick template:",
    choices: templatesOptions
  }
];

inquirer.prompt(questions).then(async answers => {
  try {
    let task = null;
    if (answers.template) {
      task = require(`./templates/${answers.template}`);
    }

    if (task && typeof task === "function") await task();
    else throw new Error("Template not found or not configure currectly!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});
