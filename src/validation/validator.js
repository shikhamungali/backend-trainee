const moment = require('moment')

const isValidEmail = function (mail) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false
};



const isValidPassword = function (pass) {
  if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass)) return true;
  return false
};



const isValidName = function (name) {
  if (/^[A-Za-z\s]{1,35}$/.test(name)) return true
  return false
};



const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};



const isvalidPhone = function (mobile) {
  if (/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile)) return true
  return false
};



const isvalidPincode = function (pincode) {
  if (/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode)) return true
  return false
};


const isValidDate = function (date) {
  if (typeof date != "string") return false
  return moment(date, 'YYYY-MM-DD', true).isValid()
}


module.exports = { isValidEmail, isValidName, isValidBody, isValidPassword, isvalidPhone, isvalidPincode,isValidDate };
