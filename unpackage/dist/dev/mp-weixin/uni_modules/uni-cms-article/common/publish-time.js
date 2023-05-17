"use strict";
function translatePublishTime(timestamp) {
  let result = "";
  const currentData = new Date();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const mouth = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const timer = date.getTime();
  const currentYear = currentData.getFullYear();
  const currentMonth = currentData.getMonth() + 1;
  const currentDay = currentData.getDate();
  const currentHours = currentData.getHours();
  let currentMinute = currentData.getMinutes();
  const currentSecond = currentData.getSeconds();
  const currentTimer = currentData.getTime();
  if (currentTimer - timer < 1e3 * 10) {
    result = `\u521A\u521A`;
  } else if (currentTimer - timer < 1e3 * 60) {
    if (currentMinute > minute) {
      result = `${(currentMinute - minute) * 60 + currentSecond - second}\u79D2\u524D`;
    } else {
      result = `${currentSecond - second}\u79D2\u524D`;
    }
  } else if (currentTimer - timer < 1e3 * (60 * 60)) {
    if (currentHours > hours) {
      result = `${(currentHours - hours) * 60 + currentMinute - minute}\u5206\u949F\u524D`;
    } else {
      if (currentMinute < minute) {
        currentMinute += 60;
      }
      result = `${currentMinute - minute}\u5206\u949F\u524D`;
    }
  } else if (currentTimer - timer < 1e3 * (24 * 60 * 60)) {
    if (currentDay > day) {
      result = `${(currentDay - day) * 24 + currentHours - hours}\u5C0F\u65F6\u524D`;
    } else {
      if (currentMonth !== mouth) {
        result = `${24 + currentHours - hours}\u5C0F\u65F6\u524D`;
      } else {
        result = `${currentHours - hours}\u5C0F\u65F6\u524D`;
      }
    }
  } else if (currentYear === year) {
    result = `${mouth}\u6708${day}\u65E5`;
  } else {
    result = `${year}\u5E74${mouth}\u6708${day}\u65E5`;
  }
  return result;
}
exports.translatePublishTime = translatePublishTime;
