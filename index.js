function createEmployeeRecord(employeeRecordArray) {
  return {
    firstName: employeeRecordArray[0],
    familyName: employeeRecordArray[1],
    title: employeeRecordArray[2],
    payPerHour: employeeRecordArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRecordsArrayOfArrays) {
  return employeeRecordsArrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeStamp) {
  const [date, hour] = dateTimeStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeStamp) {
  const [date, hour] = dateTimeStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeInEvent && timeOutEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100; // Convert to hours
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  return hoursWorked * payRate;
}

function allWagesFor(employeeRecord) {
  const allDates = [
    ...new Set([
      ...employeeRecord.timeInEvents.map((event) => event.date),
      ...employeeRecord.timeOutEvents.map((event) => event.date),
    ]),
  ];

  return allDates.reduce((totalWages, date) => {
    return totalWages + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employeeRecord) => {
    return totalPayroll + allWagesFor(employeeRecord);
  }, 0);
}
