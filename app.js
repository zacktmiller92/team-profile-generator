const DynamicPrompts = require("./lib/DynamicPrompts")

function init() {
    const startProgram = new DynamicPrompts();
    startProgram.createNewEmployee()
};

init();