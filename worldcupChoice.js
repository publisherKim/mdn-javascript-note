function ChoiceWorldCupGroup(arr) {
    this.portGroup = arr;
}

ChoiceWorldCupGroup.prototype.portLength = function(arr) {
    return arr.length;
};

ChoiceWorldCupGroup.prototype.choiceRandom = function() {
    return parseInt(Math.random() * this.portLength(this.portGroup[0]));
};

ChoiceWorldCupGroup.prototype.shupplePort = function(arr) {
    for (i = arr.length; i; i-= 1){
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
};

ChoiceWorldCupGroup.prototype.choiceGroup = function() {
    let results = '', index = this.choiceRandom(), i = 0;
    for(i; i < this.portGroup.length; i++){
        this.shupplePort(this.portGroup[i]);
        results += this.portGroup[i][index] + ',';
        this.portGroup[i].splice(index, 1);
    }
    return results;
};


var Test = new ChoiceWorldCupGroup([
    ["러시아", "독일", "브라질", "포르투갈", "아르헨티나", "벨기에", "폴란드", "프랑스"],
    ["스페인", "페루", "스위스", "잉글랜드", "콜롬비아", "멕시코", "우루과이", "크로아티아"],
    ["덴마크", "아이슬란드", "코스타리카", "스웨덴", "튀니지", "이집트", "세네갈", "이란"],
    ["세르비아", "나이지리아", "호주", "일본", "모로코", "파나마", "대한민국", "사우디아라비아"]
]);

var groupA = Test.choiceGroup();
var groupB = Test.choiceGroup();
var groupC = Test.choiceGroup();
var groupD = Test.choiceGroup();
var groupE = Test.choiceGroup();
var groupF = Test.choiceGroup();
var groupG = Test.choiceGroup();
var groupH = Test.choiceGroup();
console.log(groupA);
console.log(groupB);
console.log(groupC);
console.log(groupD);
console.log(groupE);
console.log(groupF);
console.log(groupG);
console.log(groupH);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var portA = ["러시아", "독일", "브라질", "포르투갈", "아르헨티나", "벨기에", "폴란드", "프랑스"];
var portB = ["스페인", "페루", "스위스", "잉글랜드", "콜롬비아", "멕시코", "우루과이", "크로아티아"];
var portC = ["덴마크", "아이슬란드", "코스타리카", "스웨덴", "튀니지", "이집트", "세네갈", "이란"];
var portD = ["세르비아", "나이지리아", "호주", "일본", "모로코", "파나마", "대한민국", "사우디아라비아"];

function ChoiceWorldCupGroup(arr) {
    this.portGroup = arr;
}

ChoiceWorldCupGroup.prototype.portLength = function(arr) {
    return arr.length;
};

ChoiceWorldCupGroup.prototype.choiceRandom = function() {
    return parseInt(Math.random() * this.portLength(this.portGroup));
};

ChoiceWorldCupGroup.prototype.choiceGroup = function() {
    let index = this.choiceRandom(), result = '';
    result = this.portGroup[index];
    this.portGroup.splice(index, 1);
    return result;
};

var PortA = new ChoiceWorldCupGroup(portA);
var PortB = new ChoiceWorldCupGroup(portB);
var PortC = new ChoiceWorldCupGroup(portC);
var PortD = new ChoiceWorldCupGroup(portD);

function result () {
    return ( 
        'A1: ' + PortA.choiceGroup() +
        ', B1: ' + PortA.choiceGroup() + 
        ', C1: ' + PortA.choiceGroup() + 
        ', D1: ' + PortA.choiceGroup() + 
        ', E1: ' + PortA.choiceGroup() + 
        ', F1: ' + PortA.choiceGroup() + 
        ', G1: ' + PortA.choiceGroup() + 
        ', H1: ' + PortA.choiceGroup() +
        ', A2: ' + PortB.choiceGroup() +
        ', B2: ' + PortB.choiceGroup() +
        ', C2: ' + PortB.choiceGroup() +
        ', D2: ' + PortB.choiceGroup() +
        ', E2: ' + PortB.choiceGroup() +
        ', F2: ' + PortB.choiceGroup() +
        ', G2: ' + PortB.choiceGroup() +
        ', H2: ' + PortB.choiceGroup() +
        ', A3: ' + PortC.choiceGroup() +
        ', B3: ' + PortC.choiceGroup() +
        ', C3: ' + PortC.choiceGroup() +
        ', D3: ' + PortC.choiceGroup() +
        ', E3: ' + PortC.choiceGroup() +
        ', F3: ' + PortC.choiceGroup() +
        ', G3: ' + PortC.choiceGroup() +
        ', H3: ' + PortC.choiceGroup() +
        ', A4: ' + PortD.choiceGroup() +
        ', B4: ' + PortD.choiceGroup() +
        ', C4: ' + PortD.choiceGroup() +
        ', D4: ' + PortD.choiceGroup() +
        ', E4: ' + PortD.choiceGroup() +
        ', F4: ' + PortD.choiceGroup() +
        ', G4: ' + PortD.choiceGroup() +
        ', H4: ' + PortD.choiceGroup()      
    ); 
}
result();