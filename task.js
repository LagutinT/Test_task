function statement(invoice) { // Убрал лишний аргумент функции 'plays', т.к. он является лишним и программа в нем не нуждается.
    let totalAmount = 0; // общая сумма.
    let volumeCredits = 0; // сумма бонусов.
    let result = `Счет для ${invoice.customer}\n`; // изменил одинарные кавычки на обратные для отображения выражения в '${}'.
    const formatter = new Intl.NumberFormat("ru-RU",
    { style: "currency", currency: "RUB",
    minimumFractionDigits: 2 }); // поправил форматирование числа в валюту.

    for (let performance of invoice.performances) { // переименовал элемент итерируемого объекта для удобства и более понятного кода.
        let thisAmount = 0; // убрал переменную 'play', т.к. программа в ней не нуждается. Вместо нее используется переменная 'performance'.
        switch (performance.type) {
            case "tragedy":
                thisAmount = 400; // убрал лишние нули, чтобы в конце не делить результат на 100.
                if (performance.audience > 30) {
                    thisAmount += 10 * (performance.audience - 30); // убрал лишние нули, чтобы в конце не делить результат на 100.
                }
                break;
            case "comedy":
                thisAmount = 300; // убрал лишние нули, чтобы в конце не делить результат на 100.
                if (performance.audience > 20) {
                    thisAmount += 100 + 5 * (performance.audience - 20); // убрал лишние нули, чтобы в конце не делить результат на 100.
                }
                thisAmount += 3 * performance.audience; // убрал лишние нули, чтобы в конце не делить результат на 100.
                break;
            default:
                throw new Error(`неизвестный тип: ${performance.type}`); // изменил одинарные кавычки на обратные для отображения выражения в '${}'.
        }

        // Добавление бонусов
        volumeCredits += Math.max(performance.audience - 30, 0); // Было неверно название объетка 'Math'.
    
        // Дополнительный бонус за каждые 10 комедий
        if ("comedy" === performance.type) volumeCredits += Math.floor(performance.audience / 5); // Было неверное условие, поменял ', ' на '.' чтобы сравнивалось значение свойства 'type' объекта 'performance'. Также было неверно название объетка 'Math'.
    
        // Вывод строки счета
        result += ` ${performance.playId}: ${formatter.format(thisAmount)}`; // изменил одинарные кавычки на обратные для отображения выражения в '${}'. Поправил форматирование числа в валюту.
        result += ` (${performance.audience} мест)\n`; // изменил одинарные кавычки на обратные для отображения выражения в '${}'.
        totalAmount += thisAmount;
        
    }

    // Вывод итоговой суммы вынес за пределы цикла, так как он преждевременно завершался из-за 'return' и в итоговую сумму попадала только первая постановка.
    result += ` Итого с вас ${formatter.format(totalAmount)}\n `; // изменил одинарные кавычки на обратные для отображения выражения в '${}'. Поправил форматирование числа в валюту.
    result += `Вы заработали ${volumeCredits} бонусов\n`; // изменил одинарные кавычки на обратные для отображения выражения в '${}'.
    return result;


}

let companyInvoice = {
    "customer": "MDT",
    "performances": [ // добавил в конце s, так как это массив постановок, и считаю, что так будет корректнее.
        {
            "playId": "Гамлет",
            "audience": 55,
            "type": "tragedy"
        },
        {
            "playId": "Ромео и Джульетта",
            "audience": 35,
            "type": "tragedy"
        },
        {
            "playId": "Отелло",
            "audience": 40,
            "type": "comedy"
        }
    ]
}

console.log(statement(companyInvoice));
// Пример корректной работы программы  
// Выводит: 
//          Счет для MDT
//           Гамлет: 650,00 ₽ (55 мест)
//           Ромео и Джульетта: 450,00 ₽ (35 мест)
//           Отелло: 620,00 ₽ (40 мест)
//           Итого с вас 1 720,00 ₽
//           Вы заработали 48 бонусов