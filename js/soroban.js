
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
var multTableMin;
var multTableMax;

$(document).ready(function() {

    // $('#result').bind('enterKey', checker);

    $('.fa-cog').hover(
        function(){ $(this).addClass('fa-spin') },
        function(){ $(this).removeClass('fa-spin') }
    );

    $('#tables').on('shown.bs.modal', buildMultiplicationTables);

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

