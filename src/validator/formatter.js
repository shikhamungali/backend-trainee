// Module 3: src / validator / formatter.js
// - trim() : calls the trim function on a hardcoded string for example ‘ functionUp  ’
// - changetoLowerCase() : changes the case of the string to lower. [Call toLowerCase() on a hardcoded string]
// - changeToUpperCase() : changes the case of the string to upper case [Call toUpperCase() on a hardcoded string]

// Call all these functions in route.js inside the test - me route handler


let trim = function(){
    let a = "        Shikha    Mungali                   "
    console.log( a.trim() )
}

let changetoLowerCase = function (){
    let a = 'SHIKHA MUNGALI'
    console.log(a.toLowerCase())
}

let changeToUpperCase = function (){
    let a = 'shikha mungali'
    console.log(a.toUpperCase())
}

module.exports.trim = trim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changeToUpperCase = changeToUpperCase


