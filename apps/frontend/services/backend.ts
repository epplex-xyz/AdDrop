import { Connection, Keypair } from "@solana/web3.js";
import { COMMITMENT } from "../client/constants";
import { ShdwProgram } from "../client/shdwProgram";

const signer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.SIGNER as string)));
const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC as string, COMMITMENT);
export const Drive = new ShdwProgram(signer, connection);