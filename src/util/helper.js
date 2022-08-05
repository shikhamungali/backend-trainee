// - printDate() : prints the current date
// - printMonth() : prints the current month
// - getBatchInfo() : prints batch name, week#, Day#, the topic being taught today is ….. For example - Radon, W3D3, the topic for today is Nodejs module system’

// 	Call all these functions in route.js inside the test-me route handler

let printDate = function () {
    const d = new Date();
  console.log(d);
};

let printMonth = function () {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let m = months[d.getMonth()];
  console.log(m)
};

let getBatchInfo = function () {
  const b = "Plutonium";
  const n = "W3D5";
  const topic = "Nodejs module system";

  console.log(
    b + " , " + n + " , " + "the topic being taught today is " + topic
  );
};
 

module.exports.currentDate = printDate
module.exports.currentMonth = printMonth
module.exports.batch = getBatchInfo