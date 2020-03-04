function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  const action = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  }

  const priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 3
  }

  function stringToRNP (expr) {
    
    const exprRNP = [];
    const operators = [];
    let numberStr = '';
    
    for (let i = 0; i < expr.length; i++){
      if (/\D/.test(expr[i])) {

        if (numberStr.length > 0) {
          exprRNP.push(Number(numberStr));
          numberStr = '';
        }

        if (expr[i] === '(') {
          operators.push(expr[i]);
        }else if (expr[i] === ')') {
          while (operators[operators.length - 1] !== '(') {
            if (operators.length === 0) {
              throw "ExpressionError: Brackets must be paired";
            }
            exprRNP.push(operators.pop());
          }
          operators.pop();
        }else if (expr[i] in action) {
          while (operators.length > 0 && priority[expr[i]] <= priority[operators[operators.length - 1]]) {
            exprRNP.push(operators.pop());
          }
          operators.push(expr[i]);
        }
      }else{
        numberStr += expr[i];
      }
    }

    if (numberStr.length > 0) {
      exprRNP.push(Number(numberStr));
    }
    
    operators.reverse().forEach(item => {
      if (item in action) {
        exprRNP.push(item);
      }else {
        throw "ExpressionError: Brackets must be paired";
      }
    });

    return exprRNP;
  }

  function calculateRNPExpr (exprRNP) {
    const stack = [];
    
    exprRNP.forEach(item => {
      if (item in action) {
        if (item === '/' && stack[stack.length - 1] === 0) {
          throw "TypeError: Division by zero.";
        }
        
        let b = stack.pop();
        let a = stack.pop();
        stack.push(action[item](a, b));

      }else{
        stack.push(item);
      }

    })

    return stack[0];
  }

  return (calculateRNPExpr(stringToRNP(expr)));
}

module.exports = {
    expressionCalculator
}
