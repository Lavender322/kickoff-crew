import Moment from "moment";
// import 'moment/locale/en-gb';

export function getFormattedDate(date, withDayInfo) {
  var currentDate = new Date();
  var todayDate = Moment(currentDate).format("ll").split(",")[0];
  currentDate.setDate(currentDate.getDate() + 1);
  var nextDate = Moment(currentDate).format("ll").split(",")[0];
  var eventDate = Moment(date).format("ll").split(",")[0];
  if (eventDate === todayDate) {
    return "Today";
  }
  if (eventDate === nextDate) {
    return "Tomorrow";
  }
  if (withDayInfo) {
    eventDate =
      Moment(date).format("llll").split(",")[0] +
      "," +
      Moment(date).format("llll").split(",")[1];
  }
  return eventDate;
}

export function getEventDates() {
  var eventDates = [];

  for (let i = 0; i < 31; i++) {
    var today = new Date();
    today = addMinutes(today, 15);
    var targetDate = addDays(today, i);
    var targetPreviewDate = Moment(targetDate).format("ddd, D MMM YYYY");
    var targetDay = Moment(targetDate).format("llll").split(", ")[0];
    var targetMonth = Moment(targetDate)
      .format("llll")
      .split(", ")[1]
      .split(" ")[0];
    var targetYear = Moment(targetDate)
      .format("llll")
      .split(", ")[2]
      .split(" ")[0];
    var targetDateNum = Moment(targetDate)
      .format("llll")
      .split(", ")[1]
      .split(" ")[1];
    eventDates.push({
      fullDate: targetDate.toString(),
      day: targetDay,
      date: targetDateNum,
      month: targetMonth, // Nov
      year: targetYear, // 2023
      previewDate: targetPreviewDate,
    });
  }
  return eventDates;
}

export function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
}

function addDays(date, days) {
  date.setDate(date.getDate() + days);

  return date;
}

export function getEventStartTime(date, startTime) {
  var selectedStartTime = new Date(startTime);
  var startDate = new Date(date);
  startDate.setHours(selectedStartTime.getHours());
  startDate.setMinutes(selectedStartTime.getMinutes());
  startDate.setSeconds(0);

  return Moment(startDate).format("YYYY-MM-DD HH:mm:ss");
}

export function roundUpTime() {
  var time = 1000 * 60 * 15;
  var date = new Date();
  var rounded = new Date(date.getTime() + time - (date.getTime() % time));
  return rounded;
}

export function getFormattedChatTime(date) {
  return Moment(date).format("HH:mm");
  var currentDate = new Date();
  var eventDate = Moment(date).format("D MMM");
  if (eventDate === Moment(currentDate).format("D MMM")) {
    return "Today " + Moment(date).format("HH:mm");
  }

  currentDate.setDate(currentDate.getDate() - 1);
  var previousDate = Moment(currentDate).format("D MMM");
  if (eventDate === previousDate) {
    return "Yesterday " + Moment(date).format("HH:mm");
  }

  return Moment(date).format("D MMM HH:mm");
}

export function getCurrentMonth() {
  var currentDate = new Date();
  return Moment(currentDate).format("MMM, YYYY");
}

export function getFormattedMessageTime(date) {
  return Moment(date).format("HH:mm");
}

export function getFormattedMessageDate(date) {
  return Moment(date).format("D MMM YYYY");
}

export function checkWhetherSameDate(dates) {
  var result = [];
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      result.push(true);
    } else {
      if (dates[i] === dates[i - 1]) {
        result.push(false);
      } else {
        result.push(true);
      }
    }
  }
  return result;
}
