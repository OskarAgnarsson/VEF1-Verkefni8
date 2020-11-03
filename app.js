/**
 *
 * @param {string} letter stafur sem á að finna index á í alphabet
 * @returns {number} index í alphabet
 */
function alphaIndex(letter, alpha) {
  return alpha.indexOf(letter.toLocaleUpperCase());
}

/**
 *
 * @param {string} str str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alpha Stafróf sem er notað í hliðrun
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alpha) {
  let encoded = '';
  for (let i = 0; i < str.length; i++) {
    if (alphaIndex(str[i], alpha) >= 0) {
      if (str[i] === str[i].toLocaleLowerCase()) {
        encoded += alpha[(alphaIndex(str[i], alpha) + n) % alpha.length].toLocaleLowerCase();
      }
      else {
        encoded += alpha[(alphaIndex(str[i], alpha) + n) % alpha.length];
      }
    }
    else {
      encoded = '-1';
      break;
    }
  }
  return encoded;
}
/**
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alpha Stafróf sem er notað í hliðrun
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alpha) {
  let decoded = '';
  for (let i = 0; i < str.length; i++) {
    let index;
    if (alphaIndex(str[i], alpha) >= 0) {
      if ((alphaIndex(str[i], alpha) - n) % alpha.length < 0) {
        index = ((alphaIndex(str[i], alpha) - n) % alpha.length) + alpha.length;
      }
      else {
        index = (alphaIndex(str[i], alpha) - n) % alpha.length;
      }
    }
    else {
      decoded = '-1';
      break;
    }
    if (str[i] === str[i].toLocaleLowerCase()) {
      decoded += alpha[index].toLocaleLowerCase();
    }
    else {
      decoded += alpha[index];
    }
  }
  return decoded;
}

function updateOutput(alphabet, type, shift, input) {
  const result = document.querySelector('.result');
  let textResult = '';
  if (type === 'decode') {
    if (decode(input, shift, alphabet) !== '-1') {
      textResult = decode(input, shift, alphabet);
    }
    else {
      textResult = 'Invalid letters';
    }
  }
  else {
    if (encode(input, shift, alphabet) !== '-1') {
      textResult = encode(input, shift, alphabet);
    }
    else {
      textResult = 'Invalid letters';
    }
  }
  result.textContent = textResult;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  function init(el) {
    const alphabetEl = el.querySelector('#alphabet');
    const inputEl = el.querySelector('#input');
    const shiftEl = el.querySelector('#shift');
    const typeEl = el.querySelectorAll('input[name="type"]');

    alphabetEl.addEventListener('change', () => {
      alphabet = alphabetEl.value;
      shiftEl.max = alphabet.length;
      if (shiftEl.value >= alphabet.length) {
        const shiftValue = el.querySelector('.shiftValue');
        shiftEl.value = alphabet.length;
        shiftValue.textContent = alphabet.length;
      }
      updateOutput(alphabet, type, shift, inputEl.value);
    });

    typeEl[0].addEventListener('change', () => {
      type = typeEl[0].value;
      updateOutput(alphabet, type, shift, inputEl.value);
    });

    typeEl[1].addEventListener('change', () => {
      type = typeEl[1].value;
      updateOutput(alphabet, type, shift, inputEl.value);
    });

    shiftEl.addEventListener('change', () => {
      const shiftValue = el.querySelector('.shiftValue');
      shiftValue.textContent = shiftEl.value;
      shift = Number.parseInt(shiftEl.value, 10);
      updateOutput(alphabet, type, shift, inputEl.value);
    });

    inputEl.addEventListener('change', () => {
      updateOutput(alphabet, type, shift, inputEl.value);
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
