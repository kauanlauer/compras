document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const addItemButton = document.getElementById("add-item");
    const itemInput = document.getElementById("item");
    const totalSpan = document.getElementById("total");

    addItemButton.addEventListener("click", function () {
        const item = itemInput.value.trim().toUpperCase();
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.step = "1";
        quantityInput.placeholder = "Qtd";
        quantityInput.classList.add("quantity-input");

        const priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.step = "0.01";
        priceInput.placeholder = "R$";
        priceInput.classList.add("price-input");

        if (item !== "") {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="item-name">${item}</span>
            `;
            listItem.appendChild(quantityInput);
            listItem.appendChild(priceInput);

            itemList.appendChild(listItem);

            // Limpar o campo após adicionar o item
            itemInput.value = "";

            // Adicionar um ouvinte de evento para marcar como "Comprado"
            listItem.addEventListener("click", function () {
                const isComprado = listItem.classList.contains("comprado");

                if (!isComprado) {
                    listItem.classList.add("comprado");
                } else {
                    listItem.classList.remove("comprado");
                }

                // Recalcular o total após marcar como "Comprado"
                calcularTotal();
            });

            // Recalcular o total após adicionar um item
            calcularTotal();
        }
    });

    function calcularTotal() {
        let total = 0;
        const items = itemList.querySelectorAll("li");

        items.forEach(function (item) {
            const quantityInput = item.querySelector(".quantity-input");
            const priceInput = item.querySelector(".price-input");
            const quantity = parseFloat(quantityInput.value) || 1;
            const price = parseFloat(priceInput.value) || 0;

            if (!item.classList.contains("comprado")) {
                total += quantity * price;
            }
        });

        totalSpan.textContent = total.toFixed(2);
    }
});
