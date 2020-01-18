import crypto from 'crypto';

const decryptValue = (masterkey, ciphertext) => {
	try {
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
	} catch (err) {
		console.error(`Error decrypting environment variable. ${err.message}`);
	}
};

export default decryptValue;
