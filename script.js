// Sample JSON data (replace this with your actual data)
const productsJson = [
    { "name": "Nandini 500 ml", "mrp": 44 },
    { "name": "Nandini 1000 ml", "mrp": 42 },
    { "name": "Nandini Shubham", "mrp": 50 },
    { "name": "Nandini Special", "mrp": 50 },
    { "name": "Curd 200 g", "mrp": 12 },
    { "name": "Curd 500 g", "mrp": 26 }
];

// Function to add a new row to the table
function addTableRow() {
    const row = document.createElement("tr");
    const productCell = document.createElement("td");
    const mrpCell = document.createElement("td");
    const quantityCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const removeButtonCell = document.createElement("td");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        row.remove();
        calculateTotalAmount();
    });

    quantityCell.innerHTML = '<input type="number" class="quantity" min="1" value="1">';
    amountCell.textContent = "0.00";
    amountCell.classList.add("amount");

    // Populate the "Product" column with a dropdown of product names
    const productSelect = document.createElement("select");
    productsJson.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.name;
        option.text = product.name;
        productSelect.appendChild(option);
    });
    productCell.appendChild(productSelect);

    // Populate the "MRP" column with MRP values based on the selected product
    productSelect.addEventListener("change", () => {
        const selectedProductName = productSelect.value;
        const selectedProduct = productsJson.find((product) => product.name === selectedProductName);
        const selectedMRP = selectedProduct ? selectedProduct.mrp : 0;
        mrpCell.textContent = selectedMRP.toFixed(2);
        calculateAmount();
    });

    // Trigger the initial calculation when the page loads
    productSelect.dispatchEvent(new Event("change"));


    // Calculate "Amount" based on "MRP" and "Quantity"
    function calculateAmount() {
        const selectedMRP = parseFloat(mrpCell.textContent);
        const selectedQuantity = parseFloat(quantityCell.querySelector(".quantity").value);
        const calculatedAmount = selectedMRP * selectedQuantity;
        amountCell.textContent = calculatedAmount.toFixed(2);
        calculateTotalAmount();
    }

    // Add an event listener to the quantity input for live calculation
    quantityCell.querySelector(".quantity").addEventListener("input", calculateAmount);

    productCell.classList.add("product-cell");
    mrpCell.classList.add("mrp-cell");
    quantityCell.classList.add("quantity-cell");
    amountCell.classList.add("amount-cell");
    removeButtonCell.classList.add("remove-button-cell");

    removeButtonCell.appendChild(removeButton);

    row.appendChild(productCell);
    row.appendChild(mrpCell);
    row.appendChild(quantityCell);
    row.appendChild(amountCell);
    row.appendChild(removeButtonCell);

    document.getElementById("bill-items").appendChild(row);

    // Update the total amount when a new row is added
    calculateTotalAmount();
}

// Function to calculate and update total amount
function calculateTotalAmount() {
    const amountElements = document.querySelectorAll(".amount");
    let totalAmount = 0;
    amountElements.forEach((element) => {
        totalAmount += parseFloat(element.textContent);
    });
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
}

// Add item button click event
document.getElementById("add-item").addEventListener("click", addTableRow);

// Generate and download the JPEG image
function generateJPEG(event) {
    event.preventDefault(); // Prevent the form from submitting and resetting

    const date = document.getElementById("date").value;
    const name = document.getElementById("name").value;

    // Capture the HTML content as an image using dom-to-image
    const captureDiv = document.querySelector(".container");

    domtoimage.toBlob(captureDiv).then(function (blob) {
        // Create a URL for the blob
        const blobUrl = URL.createObjectURL(blob);

        // Create an "a" element to trigger the download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${name}_${date}.jpeg`;
        link.click();

        // Release the URL object to free up resources
        URL.revokeObjectURL(blobUrl);
    });
}

// Add event listener for the "Generate Bill" button
document.getElementById("generate-bill").addEventListener("click", generateJPEG);
