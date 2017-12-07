// 숫자: 모든 숫자는 double-precision 64-bit binary format IEEE 754 (즉, -(253 -1)과 253 -1 사이의 숫자)
// +Infinity, -Infinity, and NaN(숫자가 아닌 값)

// Number 객체:  최대값, 숫자아님, 무한대와 같은 숫자 상수를 위한 속성이 존재
var biggestNum = Number.MAX_VALUE;
var smallestNum = Number.MIN_VALUE;
var infiniteNum = Number.POSITIVE_INFINITY;
var negInfiniteNum = Number.NEGATIVE_INFINITY;
var notANum = Number.NaN;
var epsilon = Number.EPSILON;
var minInteger = Number.MIN_SAFE_INTEGER;
var maxInteger = Number.MAX_SAFE_INTEGER;

// Number 객체의 속성, 메소드 prototype의 방법 표들은 다음링크를 참고하자.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Numbers_and_dates
/*
    Number.parseFloat() : 부동 소수 점 수를 반환하고 문자열 인수를 구문 분석
    Number.parseInt() : 지정된 radix 또는 베이스의 정수를 반환하는 문자열 인수를 구문 분석
    Number.isFinite() : 전달된 값은 한정 여부를 확인
    Number.isInteger() : 전달된 값은 정수 여부를 확인
*/

// Math 개체: 내장 수학개체 속성과 수학 상수 기능을 위해 방법을 가지
Math
Math.PI;
Math.sin(1.56); //  삼각 함수 사인을 사용
// Math 개체를 쓸일이 생기면 찾아보자.

// data 개체: 날짜 데이터 형식 무, 날짜 개체를 조작 활용 가능, 날짜 개체의 범위: -100,000,000일 100,000,000일
var dateObjectName = new Date([parameters]);    // ex new Date([01, 02, 2015]) => Fri Jan 02 2015 00:00:00 GMT+0900 (대한민국 표준시)
/*
    아무것도없을때: 오늘의 날짜와 시간을 만듭니다. 예를 들어, today = new Date();.
    날짜를 나타내는 문자열의 형식: "Month day, year hours:minutes:seconds.
    "예를 들어, var Xmas95 = new Date("December 25, 1995 13:30:00").만약 당신이 시간, 분, 또는 초를 빠뜨린다면, 값은 0이 됩니다.
    정수 값의 연도, 월, 날의 집합입니다. 예를 들어, var Xmas95 = new Date(1995, 11, 25).
    연도, 월, 일, 시, 분,초 동안 정수 값의 집합입니다.. 예를 들어, var Xmas95 = new Date(1995, 11, 25, 9, 30, 0);
*/
/*
    날짜 개체의 표현 방법: 날짜와 시간을 조절하는 날씨개체표현 방법은 아래 종류
        "set" 방법, 날짜 개체 안에서의 날짜 및 시간 값을 설정합니다.
        "get" 방법, 날짜 개체 안에서의 날짜 및 시간 값을 얻습니다.
        "to" 방법, 날짜 개체로부터 문자열 값을 반환합니다.
        날짜 문자열을 분석하기위해 파스와 UTC방법을 사용합니다.
        
        초와 분: 0 to 59
        시간: 0 to 23
        요일: 0 (Sunday) to 6 (Saturday)
        날짜: 1 to 31 (day of the month)
        월: 0 (January) to 11 (December)
        연도: years since 1900
*/
var Xmas95 = new Date("December 25, 1995"); // Mon Dec 25 1995 00:00:00 GMT+0900 (대한민국 표준시)

var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
endYear.setFullYear(today.getFullYear()); // Set year to this year
var msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft); //returns days left in the year
// 1995년으로부터 현재의 년도는 몇년이 지났나 

// parse
var IPOdate = new Date();   // Wed Nov 29 2017 12:19:24 GMT+0900 (대한민국 표준시)
IPOdate.setTime(Date.parse("Aug 9, 1995")); // 807894000000
// 문자를 총시간으로 파싱하기

// standard
function JSClock() {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var temp = "" + ((hour > 12) ? hour - 12 : hour);

    if (hour == 0) {
        temp = "12";
    } 
    temp += ((minute < 10) ? ":0" : ":") + minute;
    temp += ((second < 10) ? ":0" : ":") + second;
    temp += (hour >= 12) ? " P.M." : " A.M.";
    return temp;
}
// 함수 JSClock() 디지털 시계의 형식으로 시간을 반환