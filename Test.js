"use strict"
var Test = {};
Test.StartGame = function(){
    var lenthArr = 9;
    var arr = new Array(lenthArr);
    var inputRow;
    var inputCol;
    var neighborsoffsets = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

    for(var i = 0; i <arr.length; i++){
        arr[i] = new Array(lenthArr);
    }

    for(var row = 0; row < arr.length; row++) {
        for (var col = 0; col < arr[row].length; col++) {
            arr[row][col] = getRandomInt(0, 4/*lenthArr*/);
        }
        console.log(arr[row] + "\n");
    }

    inputRow = inputNumericalValue("строки");
    inputCol = inputNumericalValue("колонки");
    var curCollection = findCollection();

    for(var i = 0; i < curCollection.length; i++){
        arr[curCollection[i].r][curCollection[i].c] = "X";
    }
    console.log("\n");
    for(var row = 0; row < arr.length; row++) {
        console.log(arr[row] + "\n");
    }


    function findCollection(){
        var targetObj = {r:inputRow, c:inputCol, val: arr[inputRow][inputCol]};
        var arrProc = [];
        arrProc[0] = targetObj;
        var collection = [];
        while (arrProc.length > 0) {
            var curNum = arrProc.pop();
            if(curNum.val != targetObj.val)
                continue;
            else{
                var match = false;
                for(var j=0; j<collection.length; j++){
                    if(curNum.r == collection[j].r && curNum.c == collection[j].c && curNum.val == collection[j].val){
                        match = true;
                        break;
                    }
                }
                if(match)
                    continue;
                collection.push(curNum);
                var neighbors = getNeighbors(curNum);
                for(var i=0; i<neighbors.length; i++){

                     if(neighbors[i].val == targetObj.val){
                         arrProc.push(neighbors[i]);
                     }
                }
            }
        }
        return collection;
    }

    function getNeighbors(numObj){
        var neighbors = new Array();
        for (var i=0; i<neighborsoffsets.length; i++) {
            var nRow = numObj.r + neighborsoffsets[i][1];
            var nCol = numObj.c + neighborsoffsets[i][0];

            if (nCol >= 0 && nCol < lenthArr && nRow >= 0 && nRow < lenthArr) {
                neighbors.push({r:nRow, c:nCol, val: arr[nRow][nCol]});

            }
        }
        return neighbors;
    }

    function inputNumericalValue(str) {
        var input = prompt("Введите номер " + str + " от 0-"+ (lenthArr - 1) +":", "");
        input = parseInt(input);
        while(isNaN(input) == true)
            input = prompt("Введите номер " + str + " от 0-"+ (lenthArr - 1) +":", "");

        while(input > (lenthArr - 1))
            input = prompt("Введите номер " + str + " от 0-"+ (lenthArr - 1) +":", "");

        return input;
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}