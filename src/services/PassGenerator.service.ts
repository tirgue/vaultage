import { inject, injectable } from 'inversify';
import { EncryptionService } from './Encryption.service';

export class PassGeneratorFilterException extends Error {
  constructor(hex: string) {
    super(`Could not filter the given hexadecimal : ${hex}`);
  }
}

@injectable()
export class PassGeneratorService {
  constructor(
    @inject(EncryptionService)
    protected readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Split Hexadecimal in groups of 2 numbers to shift non-printable char to printable char
   * @param hex String representation of the Hexadecimal value
   * @returns Shifted Hexadecimal
   */
  protected shiftHex(hex: string): string {
    const hexSplitted = hex.match(/..?/g);

    if (hexSplitted === null) {
      throw new PassGeneratorFilterException(hex);
    }

    const hexFiltered = hexSplitted.map((hex) => {
      let hexInt = parseInt(hex);
      while (hexInt < 21 || hexInt > 79) {
        if (hexInt < 21) {
          hexInt += 58;
        } else {
          hexInt -= 58;
        }

        return hexInt.toString();
      }
    });
    return hexFiltered.join('');
  }

  /**
   * Generate a password
   * @param masterPassword Master Password
   * @param switcher Switch to generate the password
   * @returns A password
   */
  async generatePassword(
    masterPassword: string,
    switcher: string,
    length?: number,
  ): Promise<string> {
    const encryptedLayer = await this.encryptionService.sha256(
      `${switcher}${masterPassword}`,
    );

    const base64Layer = this.encryptionService.base64Encode(encryptedLayer);
    const hexadecimalLayer = this.encryptionService.hexEncode(base64Layer);
    const integerLayer = this.encryptionService.hex2int(hexadecimalLayer);
    const filteredLayer = this.shiftHex(integerLayer);
    const password = this.encryptionService.hex2ascii(filteredLayer);

    return password.slice(0, length);
  }
}
