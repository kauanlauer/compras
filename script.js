document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const addItemButton = document.getElementById("add-item");
    const itemInput = document.getElementById("item");
    const totalSpan = document.getElementById("total");

    addItemButton.addEventListener("click", function () {
        const item = itemInput.value.trim().toUpperCase();

        if (item !== "") {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="item-name">${item}</span>
                <input type="number" step="1" placeholder="Qtd" class="quantity-input">
                <input type="number" step="0.01" placeholder="R$" class="price-input">
            `;
            itemList.appendChild(listItem);

            // Limpar o campo após adicionar o item
            itemInput.value = "";

            // Adicionar um ouvinte de evento ao nome do item para marcar como "comprado"
            const itemName = listItem.querySelector(".item-name");

            itemName.addEventListener("click", function (event) {
                event.stopPropagation(); // Impedir que o clique no nome afete a marcação como "comprado"
                listItem.classList.toggle("comprado");
            });

            // Recalcular o total após adicionar um item
            calcularTotal();
        }
    });

    itemList.addEventListener("input", function () {
        calcularTotal();
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
