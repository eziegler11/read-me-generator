// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

// TODO: Include packages needed for this application
const inquirer = require('./node_modules/inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
	{
		type: 'input',
		message: 'What is the title of your project?',
		name: 'title',
	},
	{
		type: 'input',
		message: 'What is your project about?',
		name: 'description',
	},
	{
		type: 'input',
		message: 'How does a user install your code?',
		name: 'installation',
	},
	{
		type: 'input',
		message: 'How does a user run your code?',
		name: 'usage',
	},
	{
		type: 'input',
		message: 'How can a user contribute to your code?',
		name: 'contribute',
	},
	{
		type: 'input',
		message: 'How can a user test your code?',
		name: 'test',
	},
	{
		type: 'list',
		message: 'Which license do you want to use?',
		name: 'license',
		choices: ['MIT', 'GNU'],
	},
	{
		type: 'input',
		message: 'What is your GitHub username?',
		name: 'github',
	},
	{
		type: 'input',
		message: 'What is your email address?',
		name: 'email',
	}
];

// Generate badge
function generateBadge(license) {
	switch (license) {
		case 'MIT':
			return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';

		case 'GNU':
			return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';

		case 'CC0':
			return '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)';

		case 'BSD':
			return '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
	}
}

// Generate license text
function generateLicenseText(license) {
	switch (license) {
		case 'MIT':
			return 'Go here to [Read More on MIT license](https://opensource.org/licenses/MIT)';

		case 'GNU':
			return 'Go here to [Read More on GNU license](https://www.gnu.org/licenses/gpl-3.0)';

		case 'CC0':
			return 'Go here to [Read More on CC0 license](http://creativecommons.org/publicdomain/zero/1.0/)';

		case 'BSD':
			return 'Go here to [Read More on the BSD license](https://opensource.org/licenses/BSD-3-Clause)';
	}
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) =>
		err ? console.error(err) : console.log('Success!')
	);
}

// TODO: Create a function to initialize app
function init() {
	inquirer.prompt(questions).then((response) => {
		console.log(response);
		const markdown = `${generateBadge(response.license)}

# ${response.title}

## Description
${response.description}

## Table of Contents

## Installation
${response.installation}

## Usage
${response.usage}

## License
${generateLicenseText(response.license)}

## Contributing
${response.contribute}

## Tests
${response.test}

## Questions
http://github.com/${response.github}\n
Please reach out to me at ${response.email} with any questions.`;

		writeToFile('readme.md', markdown);
	});
}

// Function call to initialize app
init();
