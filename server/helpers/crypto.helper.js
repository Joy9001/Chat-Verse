import CryptoJS from 'crypto-js'

const encryptWithCryptoJS = (text) => {
	return CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString()
}

const decryptWithCryptoJS = (text) => {
	const bytes = CryptoJS.AES.decrypt(text, process.env.CRYPTO_SECRET)
	return bytes.toString(CryptoJS.enc.Utf8)
}

const encryptObjectWithCryptoJS = (object) => {
	return CryptoJS.AES.encrypt(JSON.stringify(object), process.env.CRYPTO_SECRET).toString()
}

const decryptObjectWithCryptoJS = (object) => {
	const bytes = CryptoJS.AES.decrypt(object, process.env.CRYPTO_SECRET)
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export { encryptWithCryptoJS, decryptWithCryptoJS, encryptObjectWithCryptoJS, decryptObjectWithCryptoJS }
