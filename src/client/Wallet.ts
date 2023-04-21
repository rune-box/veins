
export interface IWallet {
    connect(): Promise<string>;
    signMessage(message: string): Promise<string>;
    verifyMessage(): Promise<boolean>;
}

export class Wallet implements IWallet {
    wallet: string = "";
    account: string = "";
    publicKey: string = "";
    
    async connect(): Promise<string>{
        return "";
    }

    async signMessage(message: string): Promise<string>{
        return "";
    }
    
    async verifyMessage(): Promise<boolean> {
        return false;
    }

}