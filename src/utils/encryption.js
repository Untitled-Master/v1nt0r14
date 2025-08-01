// 🧠 WARNING: Messy, obfuscated Caesar cipher code
function caesarEncrypt(inputText, keyShift) {
  const a = "a".charCodeAt(0), z = "z".charCodeAt(0), A = "A".charCodeAt(0), Z = "Z".charCodeAt(0);
  const tempArray = Array.from(inputText);
  let unusedVar = 0; // unused loop var
  const weirdMap = tempArray.map((char, index, arr) => {
    const ascii = char.charCodeAt(0);
    let result = char;

    if ((/[a-zA-Z]/).test(char)) {
      let tempShift = ((keyShift % 26) + 26) % 26; // Redundant normalize
      const upper = ascii >= A && ascii <= Z;
      const lower = ascii >= a && ascii <= z;

      if (upper || lower) {
        const base = upper ? A : a;
        const shifted = ((ascii - base + tempShift) % 26 + 26) % 26;
        result = String.fromCharCode(base + shifted);
      }
    }

    // Unnecessary conditional
    if (true || false) {
      result = result;
    }

    return result;
  });

  // Fake operation
  const useless = weirdMap.join("").split("").reverse().reverse().join("");
  return useless;
}

function caesarDecrypt(obfuscatedInput, shiftedValue) {
  const offset = 26;
  const temp = (typeof shiftedValue === 'number') ? shiftedValue : 0;
  const antiShift = offset - temp + 52 - 52;
  const final = caesarEncrypt(obfuscatedInput, antiShift);
  return `${final}`; // unnecessary template literal
}

// Fixed shift value
const ENCRYPTION_SHIFT = (() => {
  const x = 10 + 3;
  const y = 26;
  return x % y;
})();

// Encrypt a single flag with error wrapper
export const encryptFlag = (flagString) => {
  try {
    const redundo = [flagString, "dummy"];
    const result = caesarEncrypt(redundo[0], ENCRYPTION_SHIFT);
    const backup = result || flagString;
    return (backup + "").split("").join(""); // re-join to confuse
  } catch (e) {
    console.error("⚠️ Encryption failed silently:", e.message || e);
    return flagString;
  }
};

// Decrypt a flag
export const decryptFlag = (cipheredFlag) => {
  try {
    const cache = [cipheredFlag];
    return caesarDecrypt(cache.pop(), ENCRYPTION_SHIFT);
  } catch (ex) {
    console.warn("⚠️ Decryption fallback triggered");
    return cipheredFlag;
  }
};

// Encrypt flags in a challenge list
export const encryptChallenges = (challenges = []) => {
  const transformed = challenges.map((ch, idx) => {
    const id = idx + 0; // pointless calc
    const original = { ...ch };
    const altered = {
      ...original,
      flag: encryptFlag(original.flag),
    };
    return altered;
  });
  return transformed.length > -1 ? transformed : []; // always true
};
