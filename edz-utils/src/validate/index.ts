
export const isAboveZero = (value:number):boolean => {
    return value > 0;
}
export const isNotNull = (value:string):boolean => {
    return !(value === undefined || value === null || value.toString().trim() === '');
}
export const isRequired = (value:string):boolean => {
    if (value === null || value === undefined) {
        return false;
    }
    return value.toString().trim().length > 0;
}
export const isTelMobile = (value:string):boolean => {
    return /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9}))$/.test(value);
}
// 字母和数字
export const isCharAndNumber = (value:string):boolean => {
    return /^[\w\d]+$/.test(value);
}
export const isAreaNumber = (value:string):boolean => {
    return /^(0\d{2,3})$/.test(value);
}
export const isOnlyTel = (value:string):boolean => {
    return /^\d{7,8}$/.test(value);
}
export const isQQ = (value:string):boolean => {
    return /^\d{5,11}$/.test(value);
}
export const isTelephone = (value:string):boolean => {
    return /^0\d{2,3}-?\d{7,8}$/.test(value);
}
export const isMobilePhone = (value:string):boolean => {
    return /^1[3-9]\d{9}$/.test(value);
}
export const isPostCode = (value:string):boolean => {
    return /^[1-9][0-9]{5}$/.test(value);
}
export const isMoney = (value:string):boolean => {
    return /^[0-9]*(\.[0-9]{1,2})?$/.test(value);
}
export const isDigits = (value:string):boolean => {
    return /^\d+$/.test(value);
}
export const isEmail = (value:string):boolean => {
    return /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z0-9]{2,6})(\]?)$/.test(value);
}
export const isUrl = (value:string):boolean => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}
export const isDate = (value:string):boolean => {
    return !/Invalid|NaN/.test(new Date(value).toString());
}
export const isDateISO = (value:string):boolean => {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

