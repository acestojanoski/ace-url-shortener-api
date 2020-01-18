const crypto = require('crypto');
const inquirer = require('inquirer');

const questions = [
	{
		type: 'input',
		name: 'masterKey',
		message: 'Enter your master key: ',
	},
	{
		type: 'input',
		name: 'text',
		message: 'Enter your text: ',
	},
];

inquirer.prompt(questions).then(answers => {
	console.log(encrypt(answers.masterKey, answers.text));
});

const encrypt = (masterKey, text) => {
	const iv = crypto.randomBytes(16);
	const salt = crypto.randomBytes(64);
	const key = crypto.pbkdf2Sync(masterKey, salt, 2145, 32, 'sha512');
	const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

	const encrypted = Buffer.concat([
		cipher.update(text, 'utf8'),
		cipher.final(),
	]);

	const tag = cipher.getAuthTag();

	return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
};
