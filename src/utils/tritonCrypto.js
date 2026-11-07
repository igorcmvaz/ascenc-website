// Criptografia assimétrica (RSA-OAEP 2048 + PBKDF2-SHA256 + AES-GCM 256)
// Nenhuma senha em texto puro existe no código-fonte:
// - Qualquer visitante criptografa seus dados com a chave pública (PUB_KEY_B64).
// - Apenas quem possui a senha consegue derivar a chave AES-GCM via PBKDF2 (100.000 iterações)
//   para descriptografar a chave privada (ENCRYPTED_PRIV_KEY_B64) e ler os registros.

export const TRITON_ENCRYPTED_TOPIC = "triton_ufsc_enc_prod_4d9b7a1e";

const SALT_B64 = "Y0Vjfvcj6/bgteBBzzpnjA==";
const IV_B64 = "rYLeD7W2L7eT3flN";
const PUB_KEY_B64 =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKANTrwSKAWIZOhMquP3uDIiAUm0DRvznrJyIBrnoSHhNixwGkzwqRO8yBcsedElygocIGup756g41NDCQqT52BegXZNlxDN/PSs4/bRy9An8Z07G3MaPu62ml3rDZLXsFrDZOmixt5Ji8XrOB/qs/oipMh0nstvWyvGVChAeQ9aDasQpf9OZk5DKUWkUQBcN3Cs2vHIsW8tldFNfaJkMismtQ4cBq+JTsxVFnjBJSKT2BeoAui117zjXIRcLGzKsbBkT8+/elRdreCJDn4fPy6NgrV3rKzqA+kHHmaIV5YorGl9exblJjPcAeoibGF8/aC3TmbFyXXywA5pZscGOwIDAQAB";
const ENCRYPTED_PRIV_KEY_B64 =
  "HYLgQei/Tvu3c28xnf5fys2DmD0nZfwBUalJwZkpalHdfU78PpJsNeG0jsup7DU3JqgSchGdXq4guy7Vxwdz2XW5hgnguIHM33AC1so4fUVwhlXi6CVSyMQKibM3nXyLujRBAewIzVRsoHUbMMHHUABp5KgfQ0gktoFkNv01MgxhIWLmFUfpRH3isIKSHpdaEoNcmv0ukHY+fQqBDHV3A4Q3ZFPRk8F6OwLQeHm8CWo+fio3Czgyua6AqfduUjShdTJuOmm8zf1TY11OW6znBJBNx71Dpq87grM2iLKj+2Ad1RYv0vvXN/idK2f8zcsyiaFpIjnqhBvG8R7CL//PasxiA/4OmOxYp8IY59iDrOI5cgNaZMowv3Fh4TVX5PJNi3GYBXhnCQA50ib3+twewiI0e7qrrp6tsc8jANxxkrbaFw13FvOp9VuE9jYuHpZ2sCYF+nFJbJ9ownFEU55qX8luetXb0Hc+r60/nB6XACm/3KMGZtwRyNoBTBDETd9utvox/NkLkuliJTyKfvQOLKp9SznZG9QnVQf982bCqWVdZ1maDY+zlyaHKjuRf4pONUUnATSo0fbkGdQGFQOY8an0NUxX/cfB7/r7Jz9FFDgwO0/bTpvIJJjQYIfRd4iv9mbt5h5x+U2W5YGF8SzLfyKJJamdhFjVvHosVegpmYLaIQSvie1No9BeqlLyuh9BrUvqNsLJL/cUSf2rh6OTpfnx60/3u/vn4b6UysUMALF8n9Z5FCF6x1rv+hocF/oRpPd9hY/J+3l9Kw2J/VpxWNbKhd0LC/aNCTdf9oOPWSeDaroSnUXYOAQgOKO+a7k9SuFVXmqcSNmftoGN/L5Eoz/jwNWizc9WteubuiU9/Z2SDKE7wX8t/Zis5u7yoIVIbTsNk6uiHTmDejGu/To/2RJSkwOf04Wpd0O3FfLQDmSbgE/yFYldZ4iJtTuzXItvvHfj2vu3h9N2tLlCoH3E66waMepKv3vG/oWB1O44Vd5MgBR50A4z4lZCJ9h6vDgttkNWLbgpHxOwhZpEBLkzJnkLUJl4pHiYXU09td2wjbGNtZu7zJwsGp/ac//XrdNi4XhZIrrCNLaLrl2IxwhAl4N9eVzVs3/eDZWD6ulJlsmLN7UDbrlr+t44G5kxco8Nw13btFUkipb+g++DqA3/Bz4igh4EPNfPWBxDPUwNz8/8HBH2Rv3mX/PTuXPxDLR4E5wJqdt4cjSCEpH7sscUkelW7ygcMZDSrkquRIGxsegT9UQ9fVFHzb+sqTzGoYaxux0aIsqy2wIDnC+338h3uTwbythwvKa/mGN1fZuAVQy1/aeiiwDo7AoHn0MuloZg5GNTvuzTUB5vNyuAEIZU1R9J8KbG7jIB6wkoA5bG8DlwcHOMSeBjfQZUrWD1W/ORPUqj2u0EgpISWDl1kxXJx0Fo7cC2Jde1neZ85GRQFM1c+RPtrTRCU6WLWA8EFbXoVoMa3LgLY1U5pCtQ4h8E/35jEMJq4wFqxAOsvRT461I2tZuVmA/hWXlES3hxPMxQVlaeUBWPLjQfWZvu5ft3i/Te3rHhsGMmGXEkAspOWhqGy3JoaUNKks+nervCf1r5HXtALVe6xGRTFRGLobgj+PP0WCyUwR/Qd9Lvf8IFe6E=";

function b64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

function bytesToB64(bytes) {
  let bin = "";
  const u8 = new Uint8Array(bytes);
  for (let i = 0; i < u8.length; i++) {
    bin += String.fromCharCode(u8[i]);
  }
  return btoa(bin);
}

/**
 * Criptografa os dados do visitante com a chave pública RSA-OAEP-2048
 * (híbrido RSA-OAEP + AES-GCM caso o payload ultrapasse 140 bytes).
 */
export async function encryptRegistrationPayload(dataObj) {
  const { subtle } = window.crypto;
  const enc = new TextEncoder();

  const pubKey = await subtle.importKey(
    "spki",
    b64ToBytes(PUB_KEY_B64),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  // Gera uma chave efêmera AES-GCM de 256 bits para suportar qualquer tamanho de texto
  const ephemeralAesKey = await subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );
  const rawAesKey = await subtle.exportKey("raw", ephemeralAesKey);
  const msgIv = window.crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await subtle.encrypt(
    { name: "AES-GCM", iv: msgIv },
    ephemeralAesKey,
    enc.encode(JSON.stringify(dataObj))
  );

  const encryptedAesKey = await subtle.encrypt(
    { name: "RSA-OAEP" },
    pubKey,
    rawAesKey
  );

  return JSON.stringify({
    v: 1,
    k: bytesToB64(encryptedAesKey),
    iv: bytesToB64(msgIv),
    c: bytesToB64(ciphertext),
  });
}

/**
 * Desbloqueia a chave privada RSA-OAEP-2048 a partir da senha digitada pelo administrador.
 * Lança erro se a senha estiver incorreta.
 */
export async function unlockAdminPrivateKey(password) {
  const { subtle } = window.crypto;
  const enc = new TextEncoder();

  const baseKey = await subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const aesKey = await subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: b64ToBytes(SALT_B64),
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const pkcs8Bytes = await subtle.decrypt(
    { name: "AES-GCM", iv: b64ToBytes(IV_B64) },
    aesKey,
    b64ToBytes(ENCRYPTED_PRIV_KEY_B64)
  );

  return subtle.importKey(
    "pkcs8",
    pkcs8Bytes,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );
}

/**
 * Descriptografa um registro individual usando a chave privada desbloqueada.
 */
export async function decryptRegistrationMessage(privateKey, messageStr) {
  const { subtle } = window.crypto;
  const dec = new TextDecoder();
  const parsed = JSON.parse(messageStr);

  if (parsed && parsed.v === 1 && parsed.k && parsed.iv && parsed.c) {
    const rawAesKey = await subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      b64ToBytes(parsed.k)
    );
    const ephemeralAesKey = await subtle.importKey(
      "raw",
      rawAesKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuffer = await subtle.decrypt(
      { name: "AES-GCM", iv: b64ToBytes(parsed.iv) },
      ephemeralAesKey,
      b64ToBytes(parsed.c)
    );
    return JSON.parse(dec.decode(plainBuffer));
  }

  throw new Error("Invalid encrypted payload");
}

