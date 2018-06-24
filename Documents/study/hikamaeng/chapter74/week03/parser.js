/* 
  예제
  <div>
    a
    <a>b</a>
    c
    <img />
    d
  </div>
*/
const parser = input => {
  const result;
  let cursor = 0;
  let text = '';
  while(cursor < input.length){
    const char = input[cursor++];
    if(char === '<') {
      if(text.length){
        // 텍스트노드 삽입
        text = '';
      }
    }else {
      text += char;
    }
  }

  return result;
};

// 알고리즘을 인지하기 쉽게 바꾸는 방법은 함수뿐이다.
// 알고리즘의 역활을 함수로 대체한다.
// 알고리즘이 특정 역활을 가르치면 그 시점에서 함수로 빼낸다. 시그니처만 인식하는 순간 바로뺸다.
const textNode = (text, target) => {
  if(text.length){
    // target에 삽입
  }
};

const parser = input => {
  const result;
  let cursor = 0;
  let text = '';
  while(cursor < input.length){
    const char = input[cursor++];
    if(char === '<') {
      textNode(text, target);
      text = '';
    }else {
      text += char;
    }
  }
  return result;
};

// 오토마타...
const textNode = (text, target) => {
  if(text.length){
    // target에 삽입
    target.push({type:'TEXT',text});
  }
  return text = '';
};

const parser = input => {
  const result = {tag:{type:'ROOT', children:[]}}, stacks = [];
  let cursor = 0, stack = result;
  do{
    let text = '';
    while(cursor < input.length){
      const char = input[cursor++];
      if(char === '<') {
        text = textNode(text, stack.tag.children);
        if(input[cursor++] !== '/'){
          let name = input.substring(cursor - 1, cursor = input.indexOf('>', cursor));
          const isClose = input[cursor] === '/';
          if(isClose) name = name.substr(0, name.length -1);
          const tag = {name, type: 'NODE', children: isClose ? null : []};
          cursor++;
          stack.tag.children.push(tag);
          if(!isClosed){
            stacks.push({tag, back: stack});
            break;  
          }
        }
      }else {
        text += char;
      }
    }
  }while(stack = stacks.pop());
  return result;
};

// 완성본
const textNode = (text, target) => {
  if(text.length){
    // target에 삽입
    target.push({type:'TEXT', text});
  }
  return text = '';
};

const elementNode = (input, cursor, text, stack, stacks) => {
  const char = input[cursor++];
  let isBreak = false;
  if(char === '<'){
    text = textNode(text, stack.tag.children);
    if(input[cursor++] !== '/'){
      let name = input.substring(cursor - 1, cursor = input.indexOf('>', cursor));
      const isClose = input[cursor] === '/';
      if(isClose) name = name.substr(0, name.length - 1);
      const tag = {name, type: 'NODE', children:[]};
      cursor++;
      stack.tag.children.push(tag);
      if(!isClose){
        stacks.push({tag, back: stack});
        isBreak = true;
      }
    }else if(stack.tag.name == input.substring(cursor, input.indexOf('>', cursor))) {
      stack = stack.back;
    }
  } else {
    text += char;
  }
  return {cursor, text, isBreak}
};

const parser = input => {
  const result = {tag:{type:'ROOT', children:[]}}, stacks = [];
  let cursor = 0, stack = result;
  do{
    let text = '';
    while(cursor < input.length){
      const v = elementNode(input, cursor, text, stack, stacks);
      ({cursor, text} = v);
      if(v.isBreak) break;
    }
  }while(stack = stacks.pop());
  return result;
};

