import { PublicKey } from "@solana/web3.js";
export enum Tokens {
    USDC,
    SOL,
    BONK,
    EUROe,
}

export const tokenList: string[] = ["USDC", "SOL", "BONK", "EUROe"];

export const tokenKeys: PublicKey[] = [
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    new PublicKey("So11111111111111111111111111111111111111112"),
    new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
    new PublicKey("2VhjJ9WxaGC3EZFwJG9BDUs9KxKCAjQY4vgd1qxgYWVg")
];