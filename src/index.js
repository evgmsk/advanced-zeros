module.exports = function getZerosCount(number, base) {

    const PN = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
        47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127,
        131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
        199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277];

    const pnLength = PN.length;
    const factors = [];
    const powers = [];

    const divided = (num, div) => {
        if(num % div === 0){
            powers[powers.length -1] += 1;
            return divided(num / div, div)
        }
        return num
    };

    const factorization = (num, i = 0) => {
        let new_num = num;
        if (PN.indexOf(num) >= 0) {
            powers.push(1);
            factors.push(num);
            return true
        }
        if (num % PN[i] === 0) {
            powers.push(1);
            factors.push(PN[i]);
            new_num = divided(num / PN[i], PN[i]);
            if(new_num < 2)
                return true
        }
        return (i < pnLength - 1)? factorization(new_num, i + 1): false
    };

    const calcZeros = (num, divider = base, pow = 1) => {
        let zeros = 0;
        const recFn = (num, divider, pow) => {
            const int = Math.floor(num / divider);
            zeros += int;
            return (int >= divider)? recFn(int, divider, pow): Math.floor(zeros / pow)
        };
        return recFn(num, divider, pow)
    };


    const zerosMin = (factors, pows) => {
        let _zeros = Infinity;
        for(let i = 0; i < factors.length ; ++i){
            let res = calcZeros(number, factors[i], pows[i]);
            _zeros = _zeros < res? _zeros: res;
        }
        return _zeros
    };

    factorization(base);
    const length = powers.length;
    if(length < 2 || length < 3 &&
        powers[1] >= powers[0] ||
        calcZeros(factors[length - 1], factors[0]) >
        powers[0] / powers[length - 1]){
            return calcZeros(number, factors.pop(), powers.pop())
    }
    return zerosMin(factors, powers);
};