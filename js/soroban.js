
/*
 * Soroban JS
 */

(function(globals){

'use strict';

var CONST = {'MIN': 2,
             'MAX': 11};

var operand1;
var operand2;
var result;

$(document).ready(function() {

    // $('#result').bind('enterKey', checker);

    $('#result').keyup(function(event) {

        if (13 === event.keyCode) {
            check(parseInt($(this)[0].value));
        }

    });

    mainLoop();

});

function mainLoop() {

    globals.operand1 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
    globals.operand2 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
    globals.result = parseInt(globals.operand1 * globals.operand2);

    $('#operand1').html(globals.operand1);
    $('#operand2').html(globals.operand2);
    $('#result')

}

function check(answer) {

    if (answer === globals.result) {
        window.alert('OK!');
    } else {
        window.alert('Nope. It\'s ' + globals.result + '.');
    }

}

}(this));

// EOF

