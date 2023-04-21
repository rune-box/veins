export class MathUtils {
    static getDecimalPlacesCount(n: number) {
        const str = n.toString();
        const index = str.indexOf(".");
        const dpStr = str.substring(index+1);
        return dpStr.length;
    }
}