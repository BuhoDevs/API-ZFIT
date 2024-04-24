"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexPhone = exports.regexImages = exports.regexSchedule = exports.regexDuration = exports.nameClass = exports.fullName = exports.regexPassword = exports.dominiosPermitidosRegex = exports.dominiosPermitidos = exports.emailRegex = void 0;
exports.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
exports.dominiosPermitidos = ['gmail.com', 'hotmail.com', "yahoo.com", "yahoo.es", "outlook.com", "outlook.es"];
exports.dominiosPermitidosRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${exports.dominiosPermitidos.join('|')})$`, 'i');
exports.regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
// export const fullName = /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/;
exports.fullName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}(?:\s|-)[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}$/;
exports.nameClass = /^[a-zA-Z]{3,}(\s|-)[a-zA-Z]{3,}$/;
// *                            30min | 40-99min | 100-190min|120        min | 1|2     h
// export const regexDuration = /^(3[0-9]|[4-9][0-9]|1[0-1][0-9]|120)\s*(min)|(1|2)\s*(h)$/;
// *                            30min | 40-99min | 100-190min|120
exports.regexDuration = /^(3[0-9]|[4-9][0-9]|1[0-1][0-9]|120)\s*(min)$/;
// export const regexDuration = /^(30|([1-2][0-9]{1,2}))\s*(minutos?|hora?|horas?)$/;
exports.regexSchedule = /^1[0-2]:[0-5][0-9] ((a)m|(A)M)|(1[3-9]|2[0]):[0-5][0-9] ((p)m|(P)M)$/; // OK
// *                            06-09 | 10-12 : 00 - 59              | 13-19 | 20-22 : 00 - 59 
// export const regexSchedule = /^(0[6-9]|1[0-2]):[0-5][0-9] ((a)m|(A)M)|(1[3-9]|2[0]):[0-5][0-9] ((p)m|(P)M)$/;// OK
// export const regexImages = /.*\.(gif|jpe?g|bmp|png)$/igm;
exports.regexImages = /^(http|https):\/\/\S+\.(jpeg|jpg|png|gif|bmp)$/;
exports.regexPhone = /^\+(?:\d{1,3}-)?\d{6,14}$/;
