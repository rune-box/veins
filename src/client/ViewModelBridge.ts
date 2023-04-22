import { NervosSettings } from "./NervosSettings";

export class ViewModelBridge {
    static nervosNetwork: "testnet" | "mainnet" = "testnet";
    static nervosSettings = ViewModelBridge.nervosNetwork === "mainnet" ? NervosSettings.Mainnet : NervosSettings.TestNet;
    static nervosApi = `/api/nervos/v1/`;

    static afterConnected: () => void;
    static afterDisConnected: () => void;
}