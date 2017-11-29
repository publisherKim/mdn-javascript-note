/*
    정규식은 문자열에서 문자 조합에 일치 시키기 위하여 사용되는 패턴입니다. 
    자바스크립트에서, 정규식 또한 객체입니다.  
    이 패턴들은 RegExp의 exec 메소드와 test 메소드  ,그리고 String의  match메소드 , replace메소드 , search메소드 ,  split 메소드와 함께 쓰입니다. 
*/
// 정규식(정규 표현식) 만들기
var re = /ab+c/;
// 정규식 리터럴은 스크립트가 로드되었을 때 정규식 컴파일을 제공,  만약 정규식이 상수라면, 이와 같은 사용이 성능을 향상

// RegExp 객체의 생성자 함수를 호출 하는 방법
var re = new RegExp("ab+c");
// 생성자 함수를 사용하면 정규식의 런타임 컴파일을 제공
// 정규식의 패턴이 변경될 것을 인지하거나 패턴이 예측되지 않을 때 그리고 사용자 입력과 같이 다른 출처로부터 패턴을 가져올 경우에는 생성자 함수를 사용

// 정규식 패턴 작성하기: 정규식 패턴은 /abc/ 같은 단순 문자의 구성이거나, /ab*c/ 또는 /Chapter (\d+)\.\d*/와 같은 단순 문자와 특수 문자의 조합으로 구성
/*
    단순한 패턴을 사용하기
    단순한 패턴은 직접 찾고자 하는 문자들로 구성됩니다. 
    예들 들어, /abc/라는 패턴은 문자열에서 정확히 'abc' 라는 문자들이 모두 함께 순서대로 나타나야 일치합니다. 
    위의 패턴은 "Hi, do you know your abc's?" 와 "The latest airplane designs evolved from slabcraft." 두가지 예 에서 부분 문자열'abc'에서 일치할 것입니다.  
    'Grab crab' 이라는 문자열에서'ab c' 라는 부분 문자열을 포함하고 있지만, 'abc' 라는 정확한 부분 문자열을 포함하지 않기 때문에  일치하지 않습니다.
*/
var re = new RegExp("abc");
var str1 = "Hi, do you know your abc's?";
var str2 = "The latest airplane designs evolved from slabcraft.";
var str3 = 'Grab crab';
re.test(str1);  // true;
re.test(str2);  // true;
re.test(str3);  // false;

/*
    검색에서 하나 이상의 b들을 찾거나 공백을 찾는 것과 같이 직접적인 일치 이상의 일치를 필요로 할 경우 패턴은 특수한 문자를 포함합니다. 
    예를 들어, /ab*c/ 패턴은  'a'문자 뒤에 0  또는 'b' 문자(*은 바로 앞의 문자가 0 개 이상이라는 것을 의미합니다)와 바로 뒤의 'c' 가 따라오는 문자 조합에 일치합니다. 
    문자열 "cbbabbbbcdebc," 에서 위의 패턴은 부분 문자열 'abbbbc' 와 일치합니다.   
*/
var re = new RegExp(/ab*c/);
var str1 = "cbbabbbbcdebc,";
var str2 = 'abbbbc';
var str3 = 'dbadbc';
re.test(str1);  // true;
re.test(str2);  // true;
re.test(str3);  // false;

// 정규식에서 특수문자
/*    
    \
        특수 문자 앞의 백슬래시는 앞의 문자는 특별하고, 문자 그대로 해석되면 안된다고 알려줍니다. 
        예를 들어, 앞에 \가 없는 'b'는 보통 소문자 b가 나타나는 어디든지 일치합니다. 
        그러나 '\b'스스로는 어떤 문자도 일치하지 않습니다; 
        이 문자는 특별한단어 경계 문자의 형태를 띄고 있습니다.  
*/
var re = new RegExp(/a\b\*c/);
var str1 = "cbbabbbbcdebc,";
var str2 = 'abbbbc';
var str3 = 'ab*c';
re.test(str1);  // false;
re.test(str2);  // false;
re.test(str3);  // false;

var re = new RegExp(/a\*/);
re.test('a*');  // true;
re.test('abc'); // false

/*
    ^
        입력의 시작에 일치합니다. 만약 다중 선 플래그가 참으로 설정되어 있다면, 줄 바꿈 문자 바로 다음에서도 일치합니다.
        예를 들어, /^A/ 는 "an A" 의 'A'에 일치하지 않습니다, 그러나 "An E" 의 'A'에서는 일치합니다.
        '^' 는 문자셋([abc]) 패턴의 첫글자로 쓰인다면, 다른의미를 가집니다. 더 자세한 내용은역 문자셋을 참고하세요.        
*/
var re = new RegExp(/^a/);
var str1 = 'an A';
var str2 = 'An E';
re.test(str1);  // true
re.test(str2);  // false

/*
    $
        입력의 끝을 일치합니다. 만약 다중 선 플래그가 참으로 설정되어 있다면, 줄 바꿈 문자 바로 뒤에도 일치합니다.
        예를 들어, /t$/ 는 "eater" 의 't' 에는 일치하지 않습니다, 그러나 "eat" 에서는 일치합니다.
*/
var re = new RegExp(/t$/);
re.test('eater');   // false
re.test('eat');     // true

/*
    *
        0회 이상 연속으로 반복되는 앞선 문자에 일치합니다. {0,} 와 동일합니다.
        예를 들어, /bo*/ /*는 "A ghost booooed" 의 'boooo' 에 일치하고, "A bird warbled" 의 'b'에 일치하지만 "A goat grunted" 에서는 아무것도 일치하지 않습니다.
*/
var re = new RegExp(/bo*/);
re.test("A ghost booooed");     // true
re.test("A bird warbled");      // true
re.test("A goat grunted");      // false

/*
    +
        1회 상 연속으로 반복되는 앞선 문자에 일치합니다. {1,} 와 동일합니다.
        예를 들어, /a+/ 는 "candy"의 'a'에 일치하고 "caaaaaaandy" 의 모든 'a'들에 일치하지만, "cndy" 에서는 아무것도 일치하지 않습니다.
*/
var re = new RegExp(/a+/);
re.test("candy");           // true
re.test("caaaaaaandy");     // true
re.test("cndy");            // false

/*
    ?
        0 또는 1회 반복되는 앞선 문자에 일치합니다. {0,1}와 동일합니다.
        예를 들어, /e?le?/ 는 "angel"의 'el' 에 일치하고, "angle"의 'le' 에 일치하고 또한 "oslo" 의 'l'에도 일치합니다.
        만약 수량자 *,+,?,{} 바로 뒤에 사용한다면, 기본적으로 탐욕스럽던(가능한 한 많이 일치시키는)와는 반대로 수량자를 탐욕스럽지 않게 만듭니다 (가능한 가장 적은 문자들에 일치시킵니다), 
        예를 들어, . /\d+/를 "123abc"에 적용시키면 "123"이 일치합니다. 그러나 /\d+?/를 같은 문자열에 적용시키면 오직 "1"만 일치합니다.
        또한 이 표 시작부분의 x(?=y) 와 x(?!y)에서 설명된것 처럼 사전 검증 에서도 쓰입니다.
*/
var re = new RegExp(/e?le?/);
re.test("angel");   // true
re.test("angle");   // true
re.test("oslo");    // true
re.test("abcde");   // false

var re = new RegExp(/\d+/); 
re.test("123abc");  // true     123 일치
re.test('abc');     // false    일치가능한 숫자 없음

var re = new RegExp(/\d+?/);
re.test("123abc");  // true     오직 1만 일치
re.test("abc");     // false    일치가능한 숫자 없음

/*
    .
        (소수점) 다음 줄 문자(개행 문자)를 제외한 어떤 하나의 문자에 일치합니다.
        예를 들어, /.n/는 "nay, an apple is on the tree"에서 'an'과 'on'에 일치하지만, 'nay' 에는 일치하지 않습니다.
*/
var re = new RegExp(/.n/);
re.test("nay");     // false
re.test("an");      // true
re.test("on");      // true

/*
    (x)
        다음의 예제가 보여주는것 처럼 'x'에 일치하고 일치한 것을 기억합니다. 괄호는 포획 괄호(capturing parentheses)로 불립니다.
        패턴 /(foo) (bar) \1 \2/안의 '(foo)' 와 '(bar)'는 문자열"foo bar foo bar"에서 처음의 두 단어에 일치하고 기억합니다. 
        패턴의 \1 와 \2는 문자열의 마지막 2 단어에 일치합니다. \1, \2, \n들은 정규식의 일치 부분에 사용되는것을 숙지하세요. 
        정규식의 바꾸기 부분에서 구문$1, $2, $n는 필수적으로 쓰여져야 됩니다. e.g.: 'bar foo'.replace( /(...) (...)/, '$2 $1' ).   
*/
var re = new RegExp(/(foo) (bar)\1\2/);
re.test("foobarfoobar");    // false
re.test("foo bar foo bar"); // true
'bar foo'.replace(/(bar) (foo)/, '$2, $1');