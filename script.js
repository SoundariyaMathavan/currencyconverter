async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultBox = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    resultBox.textContent = "Please enter a valid amount.";
    return;
  }

  if (fromCurrency === toCurrency) {
    resultBox.textContent = `${amount.toFixed(2)} ${toCurrency}`;
    return;
  }

  try {
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.rates && data.rates[toCurrency]) {
      resultBox.textContent = `${data.rates[toCurrency].toFixed(2)} ${toCurrency}`;
    } else {
      resultBox.textContent = "Conversion failed.";
    }
  } catch (error) {
    resultBox.textContent = "Error fetching data.";
    console.error("Conversion error:", error);
  }
}
