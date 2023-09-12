document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const addItemButton = document.getElementById("add-item");
    const itemInput = document.getElementById("item");
    const totalSpan = document.getElementById("total");
    const resetButton = document.getElementById("reset-list");
    const saveListButton = document.getElementById("save-list");

    // Função para carregar a lista de compras salva no localStorage
    function loadShoppingList() {
        const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        savedList.forEach(function (savedItem) {
            addItemToList(savedItem);
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

            // Adicionar um ouvinte de evento ao nome do item para marcar como "comprado"
            const itemName = listItem.querySelector(".item-name");

            itemName.addEventListener("click", function (event) {
                event.stopPropagation(); // Impedir que o clique no nome afete a marcação como "comprado"
                listItem.classList.toggle("comprado");
                salvarLista();
            });

            // Recalcular o total após adicionar um item
            calcularTotal();
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

    saveListButton.addEventListener("click", function () {
        // Função para salvar a lista no cache do navegador
        salvarLista();
    });

    function addItemToList(itemName) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="item-name">${itemName}</span>
            <input type="number" step="1" placeholder="Qtd" class="quantity-input">
            <input type="number" step="0.01" placeholder="R$" class="price-input">
        `;
        itemList.appendChild(listItem);
        return listItem;
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
            items.push(itemName);
        });

        localStorage.setItem("shoppingList", JSON.stringify(items));
    }
});
