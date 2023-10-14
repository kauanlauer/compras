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
        calcularTotal();
    }

    // Carregue a lista de compras ao carregar a página
    loadShoppingList();

    addItemButton.addEventListener("click", function () {
        const itemInputValue = itemInput.value.trim().toUpperCase();
        const quantityInput = 1; // Defina a quantidade como desejado.
        const priceInput = 0; // Defina o preço como desejado.

        if (itemInputValue !== "") {
            const item = {
                name: itemInputValue,
                quantity: quantityInput,
                price: priceInput,
                purchased: false
            };

            const listItem = addItemToList(item);

            // Limpar o campo após adicionar o item
            itemInput.value = "";
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

    saveListButton.addEventListener("click", function () {
        // Função para salvar a lista no cache do navegador
        salvarLista();
    });

    function addItemToList(item) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <input type="number" step="1" placeholder="Qtd" class="quantity-input" value="${item.quantity}">
            <input type="number" step="0.01" placeholder="R$" class="price-input" value="${item.price}">
            <button class="mark-as-purchased">${item.purchased ? "Comprado" : "Comprar"}</button>
        `;

        itemList.appendChild(listItem);

        // Adicionar um ouvinte de evento ao botão "Comprar/Comprado"
        const markAsPurchasedButton = listItem.querySelector(".mark-as-purchased");
        markAsPurchasedButton.addEventListener("click", function () {
            item.purchased = !item.purchased;
            updatePurchasedStyle(markAsPurchasedButton, item.purchased);
            markAsPurchasedButton.textContent = item.purchased ? "Comprado" : "Comprar";
            salvarLista();
        });

        updatePurchasedStyle(markAsPurchasedButton, item.purchased);

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

            if (!item.purchased) {
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
            const itemQuantity = item.querySelector(".quantity-input").value || 1;
            const itemPrice = item.querySelector(".price-input").value || 0;
            const isPurchased = item.querySelector(".mark-as-purchased").textContent === "Comprado";

            items.push({ name: itemName, quantity: itemQuantity, price: itemPrice, purchased: isPurchased });
        });

        localStorage.setItem("shoppingList", JSON.stringify(items));
    }

    function updatePurchasedStyle(button, isPurchased) {
        if (isPurchased) {
            button.style.backgroundColor = "red";
        } else {
            button.style.backgroundColor = "blue";
        }
    }
});
