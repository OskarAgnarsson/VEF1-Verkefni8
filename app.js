const alphabet = "AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ";

/**
 * 
 * @param {string} letter stafur sem á að finna index á í alphabet
 * @returns {number} index í alphabet
 */
function alphaIndex(letter) {
    return alphabet.indexOf(letter.toLocaleUpperCase());
}

/**
 * 
 * @param {string} str str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
    let encoded = "";
    for (let i = 0; i < str.length; i++) {
        if (alphaIndex(str[i]) >= 0) {
            if (str[i] === str[i].toLocaleLowerCase()) {
                encoded += alphabet[(alphaIndex(str[i])+n)%alphabet.length].toLocaleLowerCase();
            }
            else {
                encoded += alphabet[(alphaIndex(str[i])+n)%alphabet.length];
            }
        }
        else {
            encoded = "-1";
            break;
        }
    }
    return encoded;
}
/**
 * 
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
    let decoded = "";
    for (let i = 0; i < str.length; i++) {
        let index;
        if(alphaIndex(str[i]) >= 0) {
            if ((alphaIndex(str[i])-n)%alphabet.length < 0) {
                index = (alphaIndex(str[i])-n)%alphabet.length+alphabet.length;
            }
            else {
                index = (alphaIndex(str[i])-n)%alphabet.length;
            }
        }
        else {
            decoded = "-1";
            break;
        }
        if (str[i] === str[i].toLocaleLowerCase()) {
            decoded += alphabet[index].toLocaleLowerCase();
        }
        else {
            decoded += alphabet[index];
        }
    }
    return decoded;
}


console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');

function start() {
    let answered = false;
    while(!answered) {
        let action = prompt("Hvort viltu kóða eða afkóða streng? Skrifaðu \"kóða\" eða \"afkóða\"");

        if (action != "kóða" && action != "afkóða") {
            alert(`Veit ekki hvaða aðgerð ${action} er. Reyndu aftur.`);
        }
        else {
            let n = Number.parseInt(prompt("Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1,31]"));
            if (Number.parseInt(n) > 31 || Number.parseInt(n) < 1 || isNaN(n)) {
                alert(`${n} er ekki á bilinu [1,31]. Reyndu aftur.`);
            }
            else {
                let input = prompt(`Gefðu upp strenginn sem á að ${action} með hliðrun ${n}:`);

                if (!isNaN(Number.parseInt(input))) {
                    alert("Þú gafst ekki upp streng. Reyndu aftur.");
                }
                else if (action === "kóða") {
                    if (encode(input,n) === "-1") {
                        const invalid = [];
                        for (let i = 0; i < input.length; i++) {
                            if (alphaIndex(input[i]) == -1) {
                                invalid.push(input[i]);
                            }
                        }
                        alert(`Þú gafst upp stafi sem ekki er hægt að ${action}: ${invalid.join(", ")}. Reyndu aftur.`);
                    }
                    else {
                        alert(`\"${input}\" hliðrað um ${n} stafi til hægri er \"${encode(input,n)}\"`);
                        answered = true;
                    }
                }
                else if (action === "afkóða") {
                    if (decode(input,n) === "-1") {
                        const invalid = [];
                        for (let i = 0; i < input.length; i++) {
                            if (alphaIndex(input[i]) == -1) {
                                invalid.push(input[i]);
                            }
                        }
                        alert(`Þú gafst upp stafi sem ekki er hægt að ${action}: ${invalid.join(", ")}. Reyndu aftur.`);
                    }
                    else {
                        alert(`\"${input}\" hliðrað um ${n} stafi til vinstri er \"${decode(input,n)}\"`);
                        answered = true;
                    }
                }
            }
        }
    }
}

start();