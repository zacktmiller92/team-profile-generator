const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

inquirer
    .prompt([
        // Manager
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
        // Engineer
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
        // Intern
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
    .then( data => {
        // use inquirer data to create an array of employee objects
        const allEmployees = []; 
        const newManager = new Manager(data.managerName, data.managerId, data.managerEmail,data.managerOfficeNumber);
        const newEngineer = new Engineer(data.engineerName, data.entineerId, data.engineerEmail, data.engineerGithub);
        const newIntern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        allEmployees.push(newManager, newEngineer, newIntern);

        // create html template from array of employee objects
        const renderedHtml = render(allEmployees);
        console.log(renderedHtml);

        //write html template to file in dist folder
        fs.writeFile(outputPath,renderedHtml, function(error, results) {
            if (error) console.log(error);
        })

    });
