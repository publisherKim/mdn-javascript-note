// 문자열: 원문의 데이터를 나타내는데 사용, 16비트 부호 없는 정수 값의 "요소" 집합

// 문자열 리터럴: 작은따옴표나 큰따옴표를 사용하여 간단한 문자열을 만듬
'foo'
"bar"

// 16진수 이스케이프 시퀀스: \x 뒤에 수는 16진수로 해석
'\xA9' // "©"

// 유니코드 이스케이프 시퀀스: 유니코드 이스케이프 시퀀스는 \u 다음에 적어도 네 개의 문자를 필요
'\u00A9' // "©"

// 유니코드 코드 포인트 이스케이프: ECMAScript 6의 새로운 기능. 유니코드 코드 포인트 이스케이프를 가지고,  최대 0x10FFFF로 유니코드 코드 포인트를 사용
'\u{2F804}' // "你"
// the same with simple Unicode escapes
'\uD87E\uDC04'  // "你"

// 문자열 개체: 문자열 기본 데이터 형식의 래퍼
var s = new String("foo"); // Creates a String object
console.log(s); // Displays: { '0': 'f', '1': 'o', '2': 'o'}
typeof s; // Returns 'object'

// 문자열 개체를 사용할 필요가 없지 않는 한, 문자열 개체는 직관에 반하는 행동을 할 수 있기 때문에 여러분은 문자열 리터럴을 사용
var s1 = "2 + 2"; // Creates a string literal value
var s2 = new String("2 + 2"); // Creates a String object
eval(s1); // Returns the number 4
eval(s2); // Returns the string "2 + 2"

// 문자열 개체는 문자열의 문자 수를 나타내는 하나의 속성, 길이를 가짐
var mystring = "Hello, World!";
var x = mystring.length;

// javascript string literal 은 boxing unboxing을 적용하여 단순 literal 표현 법으로 문자를 할당해도 length를 사용할수 있다.
var a = '1234';
a.length;   // 4
// boxing unboxing이 정확히 어떤 코드로 동작하는지는 알수가 없다. 
/*
    단지 이런식의 코드를 작성하면 동일한 결과를 얻을수 있다.
    var a = new String('1234');
    a.length;
    typeof a
    a = '1234';
    typeof a
*/

/*
    // 문자열 메서드: 자바스크립트를 참조한다.
    https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Text_formatting
    
    ex:
    var a = '1234';
    a.charAt(2);   // 3
    a.substring(a.length, a.length-1);  // 4
    
    메서드 
        charAt, charCodeAt, codePointAt
        indexOf, lastIndexOf
        startsWith, endsWith, includes
        concat
        fromCharCode, fromCodePoint
        split
        slice
        substring, substr
        match, replace, search
        toLowerCase, toUpperCase
        normalize
        repeat
        trim
*/

// 다중 선 템플릿 문자열: 포함 식을 용납하는 문자열 리터럴 다중 선 문자열 및 문자열 보간 기능을 사용
var templateLiteral = `string text line 1
string text line 2`;
var a = 5;
var b = 10;
var c = `Fifteen is ${a + b} and\nnot ${2 * a + b}.`;

// 국제화: Intl 개체는  ECMA스크립트 국제 API에 언어와 문자열과 숫자서식과 날짜와 시간서식을 제공하는 명칭공간
// 날짜와 시간서식: DateTimeFormat 개체는 날짜와 시간을 서식하기에 유용
var msPerDay = 24 * 60 * 60 * 1000;

// July 17, 2014 00:00:00 UTC.
var july172014 = new Date(msPerDay * (44 * 365 + 11 + 197));

var options = { year: "2-digit", month: "2-digit", day: "2-digit",
               hour: "2-digit", minute: "2-digit", timeZoneName: "short" };
var americanDateTime = new Intl.DateTimeFormat("en-US", options).format;

americanDateTime(july172014); // 07/16/14, 5:00 PM PDT
// 미국식 날짜 서식

// 숫자 서식: NumberFormat개체는 통화를 위해 숫자를 서식하는것에 대해 유용
var gasPrice = new Intl.NumberFormat("en-US",
{ style: "currency", currency: "USD",
  minimumFractionDigits: 3 });

gasPrice.format(5.259); // $5.259

var hanDecimalRMBInChina = new Intl.NumberFormat("zh-CN-u-nu-hanidec",
{ style: "currency", currency: "CNY" });

hanDecimalRMBInChina.format(1314.25); // ￥ 一,三一四.二五
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

// 조합: Collator개체는 문자열을 비교하고 구분하는 것에 대해 유용, 표기와 컨버팅에 관한 이야기
// phonebook 에서의 코드
var names = ["Hochberg", "Hönigswald", "Holzman"];

var germanPhonebook = new Intl.Collator("de-DE-u-co-phonebk");

// as if sorting ["Hochberg", "Hoenigswald", "Holzman"]:
var phoneBook = names.sort(germanPhonebook.compare).join(", ");
// logs "Hochberg, Hönigswald, Holzman"

// dictionary에서의 코드
var germanDictionary = new Intl.Collator("de-DE-u-co-dict");

// as if sorting ["Hochberg", "Honigswald", "Holzman"]:
var dictionary = names.sort(germanDictionary.compare).join(", ");
// logs "Hochberg, Holzman, Hönigswald"
// Intl 객체 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl

// 정규표현식: 패턴 문자열에서 문자 조합을 일치시키는 데 사용