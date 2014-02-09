
/*
 * Soroban JS
 */

(function(globals){

'use strict';

var CONST = {'MIN': 2,
             'MAX': 20,
             'SYMBOLS': ['+', '-', '&times;', '/']};

var opsSuccess = 0;
var opsFail = 0;
var totalOps = 20;
var operand1;
var operand2;
var operation;
var result;
var multTableMin;
var multTableMax;

$(document).ready(function() {

    $('#dashboard').hide();
    // $('#result').bind('enterKey', checker);

    /*$('.fa-cog').hover(
        function(){ $(this).addClass('fa-spin') },
        function(){ $(this).removeClass('fa-spin') }
    );*/

    $('#tables').on('shown.bs.modal', buildMultiplicationTables);

    $('#result').keyup(function(event) {

        if (13 === event.keyCode) {
            check(parseInt($(this)[0].value));
        }

    });

    $('#splash img').click(function() {
        $('#splash').fadeOut(500, function() {
            $('#config-bar').css('top', 0);
            $('#status-bar').delay(500).css('bottom', 0);
            $('#dashboard').delay(500).fadeIn(1000);
        });
    });

    mainLoop();

});

function mainLoop() {

    globals.operation = Math.floor(CONST.SYMBOLS.length * Math.random());

    switch (globals.operation) {

        case 0:
            globals.operand1 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.operand2 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.result = parseInt(globals.operand1 + globals.operand2);
            break;

        case 1:
            globals.operand1 = Math.floor(CONST.MIN + 1 + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.operand2 = Math.floor(CONST.MIN + Math.random() * (globals.operand1 - CONST.MIN + 1));
            globals.result = parseInt(globals.operand1 - globals.operand2);
            break;

        case 2:
            globals.operand1 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.operand2 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.result = parseInt(globals.operand1 * globals.operand2);
            break;

        case 3:
            globals.operand2 = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.result = Math.floor(CONST.MIN + Math.random() * (CONST.MAX - CONST.MIN + 1));
            globals.operand1 = parseInt(globals.operand2 * globals.result);
            break;

    }

    $('#operation').html(CONST.SYMBOLS[globals.operation]);
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

function buildMultiplicationTables() {

    if (undefined === multTableMin || undefined === multTableMax || multTableMin !== CONST.MIN || multTableMax !== CONST.MAX) {
        // Build an updated table.
        var i;
        var j;

        // 1. Header:
        var header = $('#tableOfTables > thead > tr');
        // var headerContent = '<td class="symbol">&times;</td>';
        var headerContent = '<td/>';

        header.empty();

        for (i = Math.max(2, CONST.MIN); i <= CONST.MAX; i ++) {
            headerContent += '<td>' + i + '</td>';
        }

        header.html(headerContent);

        // 2. Rows:
        var rows = $('#tableOfTables > tbody');
        var rowsContent = '';

        rows.empty();

        for (i = Math.max(2, CONST.MIN); i <= CONST.MAX; i ++) {
            rowsContent += '<tr><td class="axis">' + i + '</td>';

            for (j = Math.max(2, CONST.MIN); j < i; j ++) {
                rowsContent += '<td/>';
            }

            rowsContent += '<td class="square' + (Math.max(i, j) > 10 ? ' extended' : '') + '">' + (i * j++) + '</td>';

            for (; j <= CONST.MAX; j ++) {
                rowsContent += '<td' + (Math.max(i, j) > 10 ? ' class="extended"' : '') + '>' + (i * j) + '</td>';
            }

            rowsContent += '</tr>';
        }

        rows.html(rowsContent);

        // 3. Save boundaries, for checking in the future:
        multTableMin = CONST.MIN;
        multTableMax = CONST.MAX;
    }

}

}(this));

// EOF

