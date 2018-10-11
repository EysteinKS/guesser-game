const arithmeticArray = [
    "255+67",
    "1278-54",
    "54*82",
    "985/549",
    "44%59"
]

const findOperator = (str) => {

    const operatorArray = [
        "+", "-", "*", "/", "%"
    ]

    for ( let j = 0; j < operatorArray.length; j++ ) {
        let checkForOperator = str.indexOf(operatorArray[j])
        if (checkForOperator > 0) {
            return checkForOperator
        }
    }
}

const createFirstNumber = ( arithmeticString, operatorIndex ) => {
    return arithmeticString.substring(0, operatorIndex)
}

const createSecondNumber = ( arithmeticString, operatorIndex ) => {
    return arithmeticString.substring( Number(operatorIndex) + 1 )
}

const createOperator = ( arithmeticString, operatorIndex ) => {
    return arithmeticString.substring(operatorIndex, (Number(operatorIndex) + 1))
}

const calculate = (firstNumber, arithmeticOperator, secondNumber) => {
    let result;
    switch (arithmeticOperator) {
        case("+"):
            result = Number(firstNumber) + Number(secondNumber);
            break;
        case("-"):
            result = firstNumber - secondNumber;
            break;
        case("*"):
            result = firstNumber * secondNumber;
            break;
        case("/"):
            result = firstNumber / secondNumber;
            break;
        case("%"):
            result = firstNumber % secondNumber;
            break;
        default:
            break;
    }
    return result;
}

const Magnus = () => {
    console.log("Running Magnus")
    for ( let i = 0; i < arithmeticArray.length; i++) {
        let arrayPosition = arithmeticArray[i]
        let operatorIndex = findOperator(arrayPosition)
        let firstNumber = createFirstNumber(arrayPosition, operatorIndex)
        let secondNumber = createSecondNumber(arrayPosition, operatorIndex)
        let operator = createOperator(arrayPosition, operatorIndex)
        let result = calculate(firstNumber, operator, secondNumber)

        console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`)
    }
}

export default Magnus;