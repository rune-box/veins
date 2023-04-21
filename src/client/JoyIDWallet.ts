import { config, authWithPopup, signWithPopup, AuthResponseData } from '@joyid/core'
import { AppSettings } from "../client/AppSettings";
import { Wallet } from './Wallet';
import { ProviderKeys } from '../data/ProviderKeys';

export class JoyIDWallet extends Wallet {
    joyIdInfo?: AuthResponseData;
    
    constructor() {
        super();
        this.wallet = ProviderKeys.JoyID;
    }

    async connect(): Promise<string> {
        this.account = "";
        const res = await authWithPopup({
            redirectURL: location.origin + '/',
            name: AppSettings.appName,
            challenge: 'Connect with ' + AppSettings.appName,
            logo: AppSettings.appIcon,
        });
        if (res.error == null) {
            this.joyIdInfo = res.data;
            this.account = this.joyIdInfo.address;
            this.publicKey = this.joyIdInfo.pubkey;
            console.log(res.data);
        }
        return this.account;
    }

    async signMessage(message: string): Promise<string> {
        let signature = "";
        const res = await signWithPopup({
            redirectURL: location.origin + '/',
            name: AppSettings.appName,
            challenge: message,
            logo: AppSettings.appIcon,
            address: this.account,
        });
        if (res.error == null) {
            signature = res.data.signature;
            this.publicKey = res.data.pubkey;
            console.log(res.data);
        }
        return signature;
    }

    async verifyMessage(): Promise<boolean> {
        return false;
    }
}