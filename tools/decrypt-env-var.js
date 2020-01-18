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
		name: 'ciphertext',
		message: 'Enter your ciphertext: ',
	},
];

inquirer.prompt(questions).then(answers => {
	console.log(decrypt(answers.masterKey, answers.ciphertext));
});

const decrypt = (masterkey, ciphertext) => {
	const ciphertextBuffer = Buffer.from(ciphertext, 'base64');

	const salt = ciphertextBuffer.slice(0, 64);
	const iv = ciphertextBuffer.slice(64, 80);
	const tag = ciphertextBuffer.slice(80, 96);
	const text = ciphertextBuffer.slice(96);

	const key = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, 'sha512');

	const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
	decipher.setAuthTag(tag);

	const decrypted =
		decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

	return decrypted;
};
