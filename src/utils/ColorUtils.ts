import { EncodingUtils } from "./EncodingUtils";

export class ColorUtils {
    static rgbToHex(r: number, g: number, b: number): string {
        return "#" + EncodingUtils.componentToHex(r)
            + EncodingUtils.componentToHex(g)
            + EncodingUtils.componentToHex(b);
    }
}
