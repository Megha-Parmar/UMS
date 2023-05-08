import { Injectable } from '@angular/core';
import { SecretConstant } from '@common/GlobalConstants';
import * as CryptoJS from 'crypto-js';
import { LocalStorageService } from './local-storage.service';
@Injectable({
	providedIn: 'root'
})
export class EncryptDecryptService {

	sessionInitial = SecretConstant.sessionInitial;

	/**
	 *Creates an instance of EncryptDecryptService.
	 */
	constructor(
		private localStorageService: LocalStorageService,
	) { }

	/**
	 * Encrypts the data in Crypto AES format for security purpose
	 * @returns Encrypted string
	* @param {*} data
	 */
	encryptData(data: any): string {
		return CryptoJS.AES.encrypt(JSON.stringify(data), SecretConstant.localStorageEncryptSecret).toString();

	}

	/**
	 * Decrypts the data from Crypto AES format to human understandable parsed format in
	 * @returns Decrypted parsed data
	 * @param {*} data
	 */
	decryptData(data: any): any {
		// const encrypted = Buffer.from(data, 'base64').toString('ascii');
		const encrypted = CryptoJS.AES.decrypt(data, SecretConstant.localStorageEncryptSecret).toString(CryptoJS.enc.Utf8);
		try {
			return JSON.parse(encrypted);
		} catch (e) {
			return null;
		}
	}
	/*
	 encryptUsingAES256_(text) {
	console.log("text", text)
	return CryptoJS.AES.encrypt(text.trim(), process.env.PASSWORD.trim()).toString();
  }

  decryptUsingAES256_(text) {
	console.log("text", text)
	return CryptoJS.AES.decrypt(text.trim(), process.env.PASSWORD.trim()).toString(CryptoJS.enc.Utf8);

  }
	*/


	/**
	 * Sets encrypted secured localStorage data
	 * @param key LocalStorage Key
	 * @param data Data to be stored
	 */
	setEncryptedLocalStorage(key: string, data: any): void {
		const encryptedString = this.encryptData(data);
		const keyName = this.sessionInitial + '-' + key.trim();
		this.localStorageService.set(keyName, encryptedString);
	}

	/**
	 * Gets secured localStorage data after decryption
	 * @param key LocalStorage Key
	 * @returns Parsed localStorage data
	 */
	getDecryptedLocalStorage(key: string): any {
		const keyName = this.sessionInitial + '-' + key.trim();
		const localStorageData = this.localStorageService.get(keyName);
		if (localStorageData) {
			return this.decryptData(localStorageData);
		}
	}

	/**
	 * Removes encrypted localStorage data
	 * @param key LocalStorage Key
	 */
	removeEncryptedLocalStorage(key: string): void {
		const keyName = this.sessionInitial + '-' + key.trim();
		this.localStorageService.remove(keyName);
	}
}
