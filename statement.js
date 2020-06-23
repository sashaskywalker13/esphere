function statement(invoice) {
    return renderInvoice();
    function calcAmount(performance) {
      let thisAmount = 0;
        switch (performance.type) {
      case "tragedy":
        thisAmount = 40000;
        if (performance.audience > 30) {
        thisAmount += 1000 * (performance.audience - 30); }
        break;
      case "comedy":
        thisAmount = 30000;
        if (performance.audience > 20) {
          thisAmount += 10000 + 500 * (performance.audience - 20);
        }
        thisAmount += 300 * performance.audience;
        break;
      default:
        throw new Error(`неизвестный тип: ${performance.type}`);
    }
      return thisAmount;
    };
    function calcTotalAmount() {
      let totalAmount = 0;
      for (let perf of invoice.performance) {
        totalAmount += calcAmount(perf);
      }
      return totalAmount;
    };
    function calcVolumeCradits(performance) {
      let volumeCredits = 0;
  
      volumeCredits += Math.max(performance.audience - 30, 0);
  
      if ("comedy" === performance.type) volumeCredits += Math.floor(performance.audience / 5);
      
      return volumeCredits;
    };
    function calcTotalVolumeCradits() {
      let bonus = 0;
        for (let perf of invoice.performance) {
          bonus += calcVolumeCradits(perf);
        }
      return bonus;
    };
    function renderInvoice() {
      let result = `Счет для ${invoice.customer}\n`;

      for (let perf of invoice.performance) {
      result += ` ${perf.playId}: ${formatRub((calcAmount(perf) / 100))}`;
      result += ` (${perf.audience} мест)\n`;
      result += `Вы заработали ${calcVolumeCradits(perf)} бонусов\n`;
      }

      result += `Итого с вас ${formatRub((calcTotalAmount()/100))}\n`;
      result += `Итого у Вас бонусов ${calcTotalVolumeCradits()}`;

      return result;
    };
    function formatRub(number) {
      return new Intl.NumberFormat("ru-RU",
      { style: "currency", currency: "RUB",
      minimumFractionDigits: 2 }).format(number);
    };
  };