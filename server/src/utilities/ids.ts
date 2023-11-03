import { Buffer } from 'buffer';
import { randomBytes } from 'crypto';

const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

// This function takes a number and returns a Buffer object
const bufferHex = (n: number): Buffer => {
    // Convert the number to its hexadecimal representation
    let hex = n.toString(16);

    // If the hexadecimal representation has an odd number of characters, add a leading zero
    hex = '0'.repeat(hex.length % 2) + hex;

    // Create a Buffer object from an array of integers representing each pair of hexadecimal characters
    return Buffer.from((<RegExpMatchArray>hex.match(/.{2}/g)).map((byte) => parseInt(byte, 16)));
};

const stringBuffer = (b: Buffer): string => [...b].map((b) => alphabet[b & 63]).join('');

const spacer = 4;
export const id = (): string => {
    const date = bufferHex(Date.now());
    const bytes = randomBytes((date.length + 1) * spacer);

    const combined = Buffer.alloc(bytes.length + date.length);
    let combinedIdx = 0;

    for (let i = 0; i <= date.length; i++) {
        for (let j = 0; j <= spacer; j++) {
            if (j < spacer) combined[combinedIdx++] = bytes[i * spacer + j];
            else if (i < date.length) combined[combinedIdx++] = date[i];
        }
    }

    return stringBuffer(combined);
};

export const password = (): string => stringBuffer(Buffer.concat([randomBytes(10), bufferHex(Date.now())]));
