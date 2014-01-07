
/*
 * Soroban JS
 */

(function(globals){

'use strict';

var CONST = {'MIN': 2,
             'MAX': 12};

var opsSuccess = 0;
var opsFail = 0;
var totalOps = 10;
var operand1;
var operand2;
var result;

$(document).ready(function() {

    // $('#result').bind('enterKey', checker);

    $('.fa-cog').hover(
        function(){ $(this).addClass('fa-spin') },
        function(){ $(this).removeClass('fa-spin') }
    );

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

}

function check(answer) {

    $('#result').val(null);

    if (answer === globals.result) {
        opsSuccess ++;
    } else {
        opsFail ++;
    }

    $('#barSuccess').css('width', parseFloat(100 * opsSuccess / totalOps) + '%');
    $('#barFail').css('width', parseFloat(100 * opsFail / totalOps) + '%');

    if (totalOps === opsSuccess + opsFail) {
        // window.alert('End!');
        $('#result').prop('disabled', true);
    } else {
        mainLoop();
    }

}

}(this));

// EOF

