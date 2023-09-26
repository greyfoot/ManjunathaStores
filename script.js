// Product details
const products = {
    Blue500: 22,
    Orange500: 25,
    Curd200: 12
};

const billingForm = document.getElementById('billingForm');
const billTable = document.getElementById('billTable');
const downloadButton = document.getElementById('downloadButton');

let billData = [];

function calculateBill() {
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const item = parseInt(document.getElementById('item').value);

    // Calculate total for each product
    const billDetails = [];
    let totalAmount = 0;

    for (const productName in products) {
        const productMRP = products[productName];
        const total = productMRP * item;
        totalAmount += total;

        billDetails.push([productName, productMRP, item, total]);
    }

    // Display bill details
    billData = billDetails;

    const billRows = billDetails.map(item => {
        return `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td><td>${item[3]}</td></tr>`;
    });

    billTable.querySelector('tbody').innerHTML = billRows.join('');
    downloadButton.style.display = 'block';
}

downloadButton.addEventListener('click', () => {
    const doc = new jsPDF();

    doc.autoTable({
        head: [['Product', 'MRP', 'Quantity', 'Total']],
        body: billData
    });

    doc.save('bill.pdf');
});
