const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname + '/../', "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("../lib/htmlRenderer");

class DynamicPrompts {
    constructor() {
        this.allEmployees = [];
    };

    createNewEmployee() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'createNew',
                    message: "Would you like to create a new employee?",
                    choices: ['Yes', 'No'],
                },
            ])
            .then(data => {
                if (data.createNew === 'Yes') {
                    return inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'createNewType',
                                message: "Would type of employee would you like to create?",
                                choices: ['Manager', 'Engineer', 'Intern'],
                            },
                        ])
                }
                else {
                    // create html template from array of employee objects
                    // and write html template to file in dist folder
                    // inform user and return empty Object from endMessage() function
                    // to prevent promise from resolving further
                    const renderedHtml = render(this.allEmployees);
                    fs.writeFile(outputPath,renderedHtml, function(error, results) {
                        if (error) console.log(error);
                    })
                    return this.endMessage();
                };
            })
            .then(data => {
                console.log(data);
                if (data.createNewType === 'Manager') {
                    return this.createManager();
                }
                else if (data.createNewType === 'Engineer') {
                    return this.createEngineer();
                }
                else if (data.createNewType === 'Intern') {
                    return this.createIntern();
                }
            })

    };

    createManager() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: "Enter the manager's name",
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "Enter the manager's ID Number",
                },
                {
                    type: 'input',
                    name: 'managerEmail',
                    message: "Enter the manager's email address",
                },
                {
                    type: 'input',
                    name: 'managerOfficeNumber',
                    message: "Enter the manager's office number",
                },
            ])
            .then(data => {
                this.allEmployees.push(new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber));
                return this.createNewEmployee();
            })

    };

    createEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'engineerName',
                    message: "Enter the engineer's name",
                },
                {
                    type: 'input',
                    name: 'engineerId',
                    message: "Enter the engineer's ID Number",
                },
                {
                    type: 'input',
                    name: 'engineerEmail',
                    message: "Enter the engineer's email address",
                },
                {
                    type: 'input',
                    name: 'engineerGithub',
                    message: "Enter the engineer's github username",
                },
            ])
            .then(data => {
                this.allEmployees.push(new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub));
                return this.createNewEmployee();
            })
    };

    createIntern() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'internName',
                    message: "Enter the intern's name",
                },
                {
                    type: 'input',
                    name: 'internId',
                    message: "Enter the intern's ID Number",
                },
                {
                    type: 'input',
                    name: 'internEmail',
                    message: "Enter the intern's email address",
                },
                {
                    type: 'input',
                    name: 'internSchool',
                    message: "Enter the intern's School",
                },
            ])
            .then(data => {
                this.allEmployees.push(new Intern(data.internName, data.internId, data.internEmail, data.internSchool));
                return this.createNewEmployee();
            })
    };

    endMessage() {
        console.log('Check the /dist/folder for your generated html file.');
        return Object;
    }

};


module.exports = DynamicPrompts;