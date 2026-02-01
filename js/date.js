const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const time = new Date();
const lmonth = months[time.getMonth()];
const date = time.getDate();
let year = time.getFullYear();
document.write("<center>" + lmonth + " ");
document.write(date + ", " + year + "</center>");