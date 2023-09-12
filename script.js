document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const addItemButton = document.getElementById("add-item");
    const itemInput = document.getElementById("item");
    const totalSpan = document.getElementById("total");
    const resetButton = document.getElementById("reset-list");
    const saveButton = document.getElementById("save-list"); // Botão de salvar

    // Função para carregar a lista de compras salva no localStorage
    function loadShoppingList() {
        const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        savedList.forEach(function (savedItem) {
            addItemToList(savedItem.name, savedItem.bought);
        });
    }

    // Carregue a lista de compras ao carregar a página
    loadShoppingList();

    addItemButton.addEventListener("click", function () {
        const item = itemInput.value.trim().toUpperCase();

        if (item !== "") {
            const listItem = addItemToList(item);

            // Limpar o campo após adicionar o item
            itemInput.value = "";

            // Adicionar um ouvinte de evento ao botão "Comprado" para alternar o estado
            const boughtButton = listItem.querySelector(".bought-button");

            boughtButton.addEventListener("click", function (event) {
                event.stopPropagation(); // Impedir que o clique no botão afete a marcação como "comprado"
                toggleBought(listItem);
            });

            // Recalcular o total após adicionar um item
            calcularTotal();
            salvarLista();
        }
    });

    resetButton.addEventListener("click", function () {
        // Remover todos os itens da lista
        itemList.innerHTML = "";

        // Limpar o campo após adicionar o item
        itemInput.value = "";

        // Limpar o localStorage
        localStorage.removeItem("shoppingList");

        // Recalcular o total após limpar a lista
        calcularTotal();
    });

    itemList.addEventListener("input", function () {
        calcularTotal();
        salvarLista();
    });

    saveButton.addEventListener("click", function () {
        salvarLista();
    });

    function addItemToList(itemName, bought = false) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="item-name">${itemName}</span>
            <input type="number" step="1" placeholder="Qtd" class="quantity-input">
            <input type="number" step="0.01" placeholder="R$" class="price-input">
            <button class="bought-button">${bought ? "✔" : ""}</button> <!-- Use o símbolo de marca de seleção se estiver "comprado" -->
        `;

        if (bought) {
            listItem.classList.add("comprado");
        }

        itemList.appendChild(listItem);
        return listItem;
    }

    function toggleBought(listItem) {
        listItem.classList.toggle("comprado");
        salvarLista();
    }

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

    function salvarLista() {
        const items = [];
        const itemsList = itemList.querySelectorAll("li");

        itemsList.forEach(function (item) {
            const itemName = item.querySelector(".item-name").textContent;
            const isBought = item.classList.contains("comprado");
            items.push({ name: itemName, bought: isBought });
        });

        localStorage.setItem("shoppingList", JSON.stringify(items));
    }
});
