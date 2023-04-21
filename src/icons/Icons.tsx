import { createIcon } from "@chakra-ui/icons";
import { chakra, forwardRef, ImageProps } from "@chakra-ui/react";
import fingerprint from "./fingerprint.svg";
import ckb from "./ckb.svg";
import joyid from "./joyid.svg";

export const CkbIcon = forwardRef<ImageProps, "img">((props: any, ref: any) => {
    return <chakra.img src={ckb} width="1em" height="1em" ref={ref} {...props} />
});

export const JoyIDIcon = forwardRef<ImageProps, "img">((props: any, ref: any) => {
    return <chakra.img src={joyid} ref={ref} width="1em" height="1em" {...props} />
});

// export const StacksIcon = forwardRef<ImageProps, "img">((props: any, ref: any) => {
//     return <chakra.img src="https://docs.stacks.co/img/stacks_with_interior_white_exterior_transparent.png" ref={ref} width="1em" height="1em" {...props} />
// });

export const FingerprintIcon = forwardRef<ImageProps, "img">((props: any, ref: any) => {
    return <chakra.img src={fingerprint} ref={ref} width="1em" height="1em" {...props} />
});
