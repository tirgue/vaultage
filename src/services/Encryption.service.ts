export class EncryptionService {
  /**
   * Hash a string with SHA-256 algorithm
   * @param text String to hash
   * @returns Hash version of the string
   */
  async sha256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(text)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  /**
   * Base64 a string
   * @param text String to Base64
   * @returns Base64 version of the string
   */
  base64Encode(text: string): string {
    return btoa(text);
  }

  /**
   * Transform a string to its Hexadecimal representation
   * @param text String to Base64
   * @returns Hexadecimal version of the string
   */
  hexEncode(text: string): string {
    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(text);
    return Array.from(arrayBuffer)
      .map((i) => i.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Parse an Hexadecimal to its Integer representation
   * @param hex String representation of the Hexadecimal value
   * @returns Integer version of the Hexadecimal string
   */
  hex2int(hex: string): string {
    return BigInt(parseInt(hex, 16)).toString();
  }

  /**
   * Parse an Hexadecimal to its ASCII representation
   * @param hex String representation of the Hexadecimal value
   * @returns ASCII version of the Hexadecimal string
   */
  hex2ascii(hex: string): string {
    let ascii = '';

    for (let i = 0; i < hex.length; i += 2) {
      const part = hex.substring(i, i + 2);
      const ch = String.fromCharCode(parseInt(part, 16));
      ascii += ch;
    }

    return ascii;
  }
}
