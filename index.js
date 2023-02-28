// Required dependencies
const inquirer = require('./node_modules/inquirer');
const fs = require('fs');

// Array of questions to generate ReadMe
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
		choices: ['MIT', 'GNU', 'CC0', 'BSD'],
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
	},
];

// Generates a badge for specific license selected
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

// Generate license text for specific license
function generateLicenseText(license) {
	switch (license) {
		case 'MIT':
			return 'Licensed under the [MIT license](https://opensource.org/licenses/MIT)';

		case 'GNU':
			return 'Licensed under the [GNU license](https://www.gnu.org/licenses/gpl-3.0)';

		case 'CC0':
			return 'Licensed under the [CC0 license](http://creativecommons.org/publicdomain/zero/1.0/)';

		case 'BSD':
			return 'Licensed under the [BSD license](https://opensource.org/licenses/BSD-3-Clause)';
	}
}

// Writes the readme file and displays success, or shows error
function writeToFile(fileName, data) {
	fs.writeFile(fileName, data, (err) =>
		err ? console.error(err) : console.log('Success! New ReadMe generated in current folder.')
	);
}

// Initializes the app when run in the command line and produces the content of the ReadMe
function init() {
	inquirer.prompt(questions).then((response) => {
		console.log(response);
		const markdown = `# ${response.title}

${generateBadge(response.license)}

## Description
${response.description}

## Table of Contents
- [Project Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Test](#Tests)
- [Questions](#Questions)

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
