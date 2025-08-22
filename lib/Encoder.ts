export class Encoder {
  // Encode Method
  static encode(value: string): string {
    // UTF-8 এনকোডিং
    let encoded = Buffer.from(value).toString("base64");
    return encoded;
  }

  // Decode Method
  static decode(value: string): string {
    // Base64 ডিকোডিং
    let decoded = Buffer.from(value, "base64").toString("utf-8");
    return decoded;
  }
}
