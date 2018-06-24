/*
  Main Flow                         Routine A
  A, B                              Arguments[B]
  A = RoutineA(B)                   Local variables LA(B)
                                    return LA

  Main Flow                         Routine B
  A, B, C, D                        Arguments[D]
  A = RoutineA(B)                   Local variables LB(D)
  C = RoutineB(D)                   return LB
  함수를 가져다 쓸때 참조를 조심해야함
  인자로 참조를 보내면 위험해짐
*/

/*
  SUB ROUTINE CHAIN
  객체가 너무 크면 참조를 보내는게 좋다. 
  복사본은 성능에 영향을 미침(우리가 하는 개발은 성능 영향 미칠정도의 개발은 안함)
  안정성을 생각하면 항상 복사본을 보내는게 좋음
  함수안에 함수를 부르면 콜스택에 함수가 쌓임 이걸 스택 체인이라고 부름
  함수마다 기억해야하는 인자와 지역변수가 존재함
  지역변수와 인자가 없는 함수를 만들변 BEST
  M           R1 keep       R3            R4            R5              R6
  A = R1()    ARG           ARG           ARG           ARG             ARG
              LOCAL         LOCAL         LOCAL         LOCAL           LOCAL
              return R2()   return R4()   return R5()   return R6()     return 
  ARG LOCAL을 스택에서 사라졌지만 여전히 return point는 남아있다.
  꼬리물기 최적화 TAIL RECURISION
*/
const sum = v => v + (v > 1 ? sum(v-1) : 0);
sum(3);
/*
  sum(v:3): return 3 + sum(2)
  sum(v:2): return 2 + sum(1)
  sum(v:1): return 1 + sum(0)
  재귀함수는 연산 스택 때문에 스택을 해제할수 없다.
*/
const sum = (v, prev = 0) => {
  prev += v;
  return v + (v > 1 ? sum(v-1, prev) : 0);
};
sum(3);
/*
sum(v:3, prev:0)    sum(v:2, prev:3)      sum(v:1, prev:5)
return sum(2,3);    return rum(1, 5);     return 6;
재귀함수는 아무리 잘짜도 메모리가 중첩되면 죽는다.
브라우저가 꼬리물기 최적화를 지원하지 않는다.
loop로 바꺼야함
*/
// tail recursion to loop
const sum = (v) => {
  let prev = 0;
  while(v > 1) {
    prev += v;
    v--;
  }
  return prev;
};
/*
  위 코드는 정적함수에 쓰이는 방법
*/    
/*
  runtime state
  GLOBAL G1, G2
  MAINFLOW
  F, A, B
  F = ROUTINE
      ARGUMENTS
      LOCAL VARIABLES LA
      RETURN LA
  A = F(B)
  closuer function 자유변수를 인식하는 함수의 공간 (ROUTINE)
*/
/* 
  NESETED CLOSURE
  기저층을 위애 깔고 결론을 내부에 두어야 한다.
  자유변수를 쓰는 이유는 루틴안에서 제공 받는 서비스가 필요하기 떄문에
*/
window.a = 3;
if(a == 3) {
  const b = 5;
  const f1 = v => {
    const c = 7;
    if(a + b > c) {
      return p => v + p + a + b + c;
    }else {
      return p => v + p + a + b;
    }
  };
}

/*
  shadowing
  보안떄문에 필요함 바깥쪽 자유변수에대한 접근을 차단하기 위해서
*/
const a = 3;
if(a == 3) {
  const a = 5;
  const f1 = v => {
    const a = 7;
    console.log(a);
  };
}
/* 
  CO ROUTINE 
  M               R2
  A = R2()        ARG
    ...           LOCAL
                    ...
  B = R2()        YIELD
    ...
                    ...
  C = R2()        YIELD
                    ...
                  YIELD
  여러번 진입하고 여러번 반환함
  장점: arguments 와 지역변수가 유지됨(메모리가 유지됨)
*/
const generator = function*(a) {
  a++;
  yield a;
  a++;
  yield a;
  a++
  yield a;
};
const coroutine = generator(3);

let result = 0;
result += coroutine().next().value;
console.log(result);          // 4
result += coroutine().next().value;
console.log(result);          // 5
result += coroutine().next().value;
console.log(result);          // 6
/*
  보다더 시나리오적으로 짤떄 쓰면 좋을것 같다.
  절차적 객체일수록 corutine이 유리하다.
  호출 순서가 보장된다.
*/
const a = {
  *_(){}
};
const b = a._();