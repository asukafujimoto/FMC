(function() {
    'use strict';
    console.log('js file read ok!!');

// common functon
    var divSetting = document.getElementById('divSetting');
    var divMain = document.getElementById('divMain');
    var divResult = document.getElementById('divResult');
    function setDisplay(isSettingVisible, isMainVisible, isResultVisible) {
        divSetting.style.display = isSettingVisible ? 'block' : 'none';
        divMain.style.display = isMainVisible ? 'block' : 'none';
        divResult.style.display = isResultVisible ? 'block' : 'none';
    }

    function sound(soud_file_id)
    {
        if( typeof( document.getElementById( soud_file_id ).currentTime ) != 'undefined' )
        {
            document.getElementById( soud_file_id ).currentTime = 0;
        }
        document.getElementById( soud_file_id ).play() ;
    }

// setting
    // digit
    var btnDigitPlus = document.getElementById('btnDigitPlus');
    var divDigitValue = document.getElementById('divDigitValue');
    var btnDigitMinus = document.getElementById('btnDigitMinus');
    var DEF_DIGIT = 3;
    var numDigit = DEF_DIGIT;
    divDigitValue.innerHTML = numDigit;
    btnDigitPlus.addEventListener('click', function() {
        if (2 < numDigit) return;
        sound('sound_bubble');
        numDigit++;
        divDigitValue.innerHTML = numDigit;
    }, false);
    btnDigitMinus.addEventListener('click', function() {
        if (2 > numDigit) return;
        sound('sound_bubble');
        numDigit--;
        divDigitValue.innerHTML = numDigit;
    }, false);

    // speed
    var btnSpeedPlus = document.getElementById('btnSpeedPlus');
    var divSpeedValue = document.getElementById('divSpeedValue');
    var btnSpeedMinus = document.getElementById('btnSpeedMinus');
    var DEF_SPEED = 0.5;
    var numSpeed = DEF_SPEED;
    divSpeedValue.innerHTML = numSpeed;
    btnSpeedPlus.addEventListener('click', function() {
        if (3 < numSpeed) return;
        sound('sound_bubble');
        numSpeed += 0.1;
        divSpeedValue.innerHTML = parseFloat(numSpeed).toFixed(1);
    }, false);
    btnSpeedMinus.addEventListener('click', function() {
        if (0.2 > numSpeed) return;
        sound('sound_bubble');
        numSpeed -= 0.1;
        divSpeedValue.innerHTML = parseFloat(numSpeed).toFixed(1);
    }, false);

    // questions
    var btnQuestionsPlus = document.getElementById('btnQuestionsPlus');
    var divQuestionsValue = document.getElementById('divQuestionsValue');
    var btnQuestionsMinus = document.getElementById('btnQuestionsMinus');
    var DEF_QUESTIONS = 5;
    var numQuestions = DEF_QUESTIONS;
    divQuestionsValue.innerHTML = numQuestions;
    btnQuestionsPlus.addEventListener('click', function() {
        if (9 < numQuestions) return;
        sound('sound_bubble');
        numQuestions++;
        divQuestionsValue.innerHTML = numQuestions;
    }, false);
    btnQuestionsMinus.addEventListener('click', function() {
        if (3 > numQuestions) return;
        sound('sound_bubble');
        numQuestions--;
        divQuestionsValue.innerHTML = numQuestions;
    }, false);

    // start button
    var btnStart = document.getElementById('btnStart');
    btnStart.addEventListener('click', function() {
        sound('sound_bubble');
        setDisplay(false, true, false);
        ready();
    }, false);

// main
    var divNumber = document.getElementById('divNumber');
    var btnResult = document.getElementById('divResult');
    var cntStart;
    var cntQuestion;
    var numResults = [0, 0, 0, 0];
    var isRunning = false;
    var idTimer;

    function ready() {
        if (!isRunning) {
            cntStart = 3;
            cntQuestion = 0;
            numResults = numResults.map(function() {return 0});
            isRunning = true;
            divNumber.className = 'main-number main-number-ready';
            btnResult.className = 'button-main button-inactive';
        }
        sound('sound_count' + cntStart);
        divNumber.innerHTML = cntStart;
        cntStart--;
        idTimer = setTimeout(function() {
            if (cntStart == 0) {
                sound('sound_hazime');
                divNumber.className = 'main-number';
                fmc();
            } else {
                ready();
            }
        }, 1000, );
    }

    function fmc() {
        cntQuestion++;

        var val;
        if (numDigit == 3) {
            val = Math.floor(( Math.random() * ( ( 999 + 1 ) - 100 ) ) + 100);
        } else if (numDigit == 2) {
            val = Math.floor(( Math.random() * ( ( 99 + 1 ) - 10 ) ) + 10);
        } else if (numDigit == 1) {
            val = Math.floor(( Math.random() * ( ( 9 + 1 ) - 1 ) ) + 1);
        } else {
            console.log('numDigit error : ' + numDigit);
            return;
        }
        sound('sound_shownumber');
        divNumber.innerHTML = val;

        numResults[0] = val;
        numResults[1] += val % 10;
        numResults[2] += val % 100;
        numResults[3] += val % 1000;
        console.log(cntQuestion + ':' + numResults[0] + ',' + numResults[1] + ',' + numResults[2] + ',' + numResults[3]);

        idTimer = setTimeout(function() {
            if (cntQuestion < numQuestions) {
                fmc();
            } else {
                clearTimeout(idTimer);
                sound('sound_sokomade');
                divNumber.className = 'main-number main-number-ready';
                divNumber.innerHTML = 'おわり';
                btnResult.className = 'button-main';
                isRunning = false;
            }
        }, numSpeed * 1000, )
    }

    // result button
    var btnResult = document.getElementById('btnResult');
    var divResult3Value = document.getElementById('divResult3Value');
    var divResult2Value = document.getElementById('divResult2Value');
    var divResult1Value = document.getElementById('divResult1Value');
    var divResult3Box = document.getElementById('divResult3Box');
    var divResult2Box = document.getElementById('divResult2Box');
    var divResult1Box = document.getElementById('divResult1Box');
    btnResult.addEventListener('click', function() {
        if (isRunning) return;
        console.log('result click!!');
        sound('sound_bubble');
        divResult3Value.innerHTML = numResults[3].toLocaleString();
        divResult2Value.innerHTML = numResults[2];
        divResult1Value.innerHTML = numResults[1];

        divResult3Box.style.display = 2 < numDigit ? 'inline-block' : 'none';
        divResult2Box.style.display = 1 < numDigit ? 'inline-block' : 'none';
        divResult1Box.style.display = 0 < numDigit ? 'inline-block' : 'none';

        sound('sound_otsukaresamadeshita');
        setDisplay(false, false, true);
    }, false);

// result
    // return button
    var btnReturn = document.getElementById('btnReturn');
    btnReturn.addEventListener('click', function() {
        console.log('return click!!');
        sound('sound_bubble');
        sound('sound_mataasondene');
        setDisplay(true, false, false);
    }, false);

})();