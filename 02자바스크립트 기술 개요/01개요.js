/*
    개요
        HTML은 웹 페이지의 내용과 양식을 저장하기 위해 사용되고 CSS는 웹 페이지가 시각적으로 어떻게 보일지 결정한다. 
        자바스크립트는 웹 어플리케이션에 더 풍부한 효과를 주기 위해 사용된다. 
        웹 브라우저에서 자바스크립트는 여러가지 다른 뜻을 가진 포괄적인 용어이다. 
        그중 한가지 뜻은 핵심 언어(ECMA 스크립트)이고 나머지 뜻은 DOM(Document Object Model)이다.
    
    핵심 언어로써의 자바스크립트(ECMAScript)
        1. 언어 문법(파싱 규칙, 키워드, 흐름 제어, 오브젝트 리터럴 초기화 등)
        2. 에러 처리 방법(throw, try/catch, 유저가 직접 정의한 에러 등)
        3. 타입들(boolean, number, string, function, object...)
        4. 전역 오브젝트. 브라우저 환경에서는 window 오브젝트가 전역 오브젝트이다. 
           몇 가지의 함수들이 이 오브젝트에 포함되어있다(parseInt, parseFloat, decodeURI, encodeURI 등).
           프로토타입을 기반으로한 상속 구조
        5. built-in 오브젝트 및 함수들(JSON, Math, Array.prototype methods, Object  introspection methods...)
        6. Strict mode
        
    브라우저 지원
        역사적으로 ECMAScript은 브라우저의 구분 없이 잘 지원되었다. 
        2011년 6월, ECMAScript5에 대한 구현에서  브라우저마다 다른 부분이 발견되었다. 
        ECMAScript5에 대한 브라우저별 지원 현황을 더 알고 싶다면 몇가지 자료를 참고하라.
    
    미래에는
        1999년에 ECMAScript 세 번째 개정판이 발표된 이후로 ECMA-262 (ECMAScript 4 또는 ES4) 라고 불리는 네 번째 개정판이 주요한 개선이었다. 
        2008년 8월, ECMAScript 네 번째 개정판이 ECMAScript Harmony 라고 불리는 프로젝트 안에 포함되었다. 
        이 프로젝트는 특히 Proxies나 const 키워드도 정의한다. 
    
    DOM (Document Object Model)
        WebIDL 명세는 DOM 기술과 ECMAScript을 연결해주는 역할을 한다.    https://heycam.github.io/webidl/
    
    DOM의 핵심
        Document Object Model의 표준은 W3C에 의해 관리된다. 
        HTML이나 XML 문서를 오브젝트로 추상화하여 언어에 관계없이 이들을 다루는 방법이 정의되어 있다. 
        DOM에서 정의된 것들 중에 다음과 같은 것들이 중요하다.

            1. 문서 구조, 나무 모델(tree model), DOM core에 있는 이벤트 구조. 
               Node, Element, DocumentFragment, Document, DOMImplementation, Event, EventTarget 등 …
            2. 덜 엄격한 DOM 이벤트 구조, DOM events에 속하는 특정 이벤트.
            3. DOM Traversal, DOM Range 등

        ECMAScript에서는 DOM 명세에 의해 정의된 오브젝트들을 "호스트 오브젝트"라고 부른다.
    
    HTML DOM
       웹 마크업 언어인 HTML은 DOM 코어에 정의된 추상화 개념에 엘리먼트의 의미를 더한 레이어라고 할 수 있겠다. 
       HTML DOM은 HTML 엘리먼트의 className 같은 속성과 document.body 같은 API도 포함한다. 

       HTML 명세는 문서의 제약도 정의한다. 
       예를들어 순서가 없는 리스트를 나타내는 ul 의 모든 자식들은 리스트 요소를 나타내는 li 엘리먼트여야 한다. 
       또한 표준에 정의되지 않은 엘리먼트와 속성을 사용하는것도 금지된다.
    
    알아둘만한 API들
        1. setTimeout 과 setInterval 함수는 HTML 표준의 Window 인터페이스에 처음으로 정의되었다.
        2. XMLHttpRequest는 비동기적 HTTP 요청을 보낼 수 있게 해주는 API이다.
        3. CSS Object Model는 CSS 규칙을 오브젝트처럼 다룰 수 있도록 추상화 해준다.
        4. WebWorkers는 병렬 처리를 가능하게 하는 API이다.
        5. WebSockets는 양방향 저수준 통신을 가능하게 하는 API이다.
        6. Canvas 2D Context는 canvas 엘리먼트에 그릴 수 있게 해주는 API이다.

    브라우저 지원
        모든 웹 개발자들은 DOM이 엉망이라는 것을 경험했을 것이다. 
        기능마다 브라우저 지원 여부가 다르다. 
        가장 주요한 이유는 DOM의 많은 기능에 대한 명세가 불분명하기 때문이다. 
        또한 브라우저들에 인터넷 익스플로러 이벤트 모델같이 호환되지 않는 기능들이 추가되었기 때문이다. 
        2011년 6월 현재 W3C와 WHATWWG가 브라우저 호환성을 개선하기 위해 오래된 기능들에 대한 자세한 명세를 만들고 있다. 
        이런 흐름으로 본다면 브라우저들은 이 명세를 기반으로하여 개선될 것이다.

        또 자주 쓰이는 접근은 여러 브라우저에서 호환이 되게 만든 자바스크립트 라이브러리를 사용하는 것이다. 
        이 라이브러리들은 DOM을 추상화해 여러 브라우저에서도 같은 기능을 쓸 수 있게 해준다. 
        가장 널리 쓰이는 프레임워크로는 jQuery, prototype, YUI가 있다.   
*/