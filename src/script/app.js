let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');
let lastClickedButton = null;

let realTimeScreenValue = []

clearbtn.addEventListener("click", () => {
    realTimeScreenValue = [''];
    lastClickedButton = null; 
    answerScreen.innerHTML = 0;
    currentInput.className = 'currentInput';
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
})

buttons.forEach((btn) => {

    btn.addEventListener("click", () => {
        if (!btn.id.match('erase')) {
            if (btn.classList.contains('fun_btn')) {
                if (lastClickedButton !== null && lastClickedButton.classList.contains('fun_btn')) {
                    return; 
                }
            }
            realTimeScreenValue.push(btn.value);
            currentInput.innerHTML = realTimeScreenValue.join('');

            if (btn.classList.contains('fun_btn')) {
                lastClickedButton = btn;
            }
            if (btn.classList.contains('num_btn')) {
                lastClickedButton = null;
                answerScreen.innerHTML = evaluateMath(realTimeScreenValue.join(''));
            }
        }

        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            currentInput.innerHTML = realTimeScreenValue.join('');
            answerScreen.innerHTML = evaluateMath(realTimeScreenValue.join(''));
        }

        if (btn.id.match('evaluate')) {
            lastClickedButton = null; 
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = "white";
        }

        if (typeof eval(realTimeScreenValue.join('')) == 'undefined') {
            answerScreen.innerHTML = 0
        }
    })
});

function sanitizeExpression(expression) {
    const sanitized = expression.replace(/[^0-9+\-*/()% .]/g, '');
    if (sanitized === expression) {
        return sanitized;
    }

    return null;
}

function evaluateMath(expression) {
    const sanitizedExpression = sanitizeExpression(expression);
    if (sanitizedExpression === null) {
        return undefined;
    }

    try {
        const result = Function(`"use strict"; return (${expression})`)();
        return result;
    } catch (err) {
        return err;
    }
}
