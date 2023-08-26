export class MathUtils {
    static getDecimalPlacesCount(n: number) {
        const str = n.toString();
        const index = str.indexOf(".");
        const dpStr = str.substring(index+1);
        return dpStr.length;
    }

    static randomInt(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}