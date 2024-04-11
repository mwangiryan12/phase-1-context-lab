
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(dateWorked) {
    const timeIn = this.timeInEvents.find(event => event.date === dateWorked);
    const timeOut = this.timeOutEvents.find(event => event.date === dateWorked);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(dateWorked) {
    return hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour;
}

function allWagesFor() {
    const datesWorked = this.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate.call(this, date), 0);
}

function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}