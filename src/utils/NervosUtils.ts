
export class NervosUtils {
    static parseBalanceStr(balanceStr: string): number{
        const balancePos = balanceStr.length - 8;
        const newStr = balanceStr.substring(0, balancePos) + "." + balanceStr.substring(balancePos);
        const balance = Number.parseFloat(newStr);
        return balance;
    }
}