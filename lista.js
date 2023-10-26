document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const addItemButton = document.getElementById("add-item");
    const itemInput = document.getElementById("item");
    const totalSpan = document.getElementById("total");
    const resetButton = document.getElementById("reset-list");
    const saveListButton = document.getElementById("save-list");
    const deleteSelectedButton = document.getElementById("delete-selected");

    function loadShoppingList() {
        const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        savedList.forEach(function (savedItem) {
            addItemToList(savedItem);
        });
        calcularTotal();
    }

    loadShoppingList();

    addItemButton.addEventListener("click", function () {
        const itemInputValue = itemInput.value.trim().toUpperCase();

        if (itemInputValue !== "") {
            const item = {
                name: itemInputValue,
                quantity: "", // Deixar em branco
                price: "",    // Deixar em branco
                purchased: false
            };

            const listItem = addItemToList(item);

            itemInput.value = "";
            salvarLista();
        }
    });

    resetButton.addEventListener("click", function () {
        itemList.innerHTML = "";
        itemInput.value = "";
        localStorage.removeItem("shoppingList");
        calcularTotal();
    });

    itemList.addEventListener("input", function () {
        calcularTotal();
        salvarLista();
    });

    saveListButton.addEventListener("click", function () {
        salvarLista();
    });

    deleteSelectedButton.addEventListener("click", function () {
        const selectedItems = itemList.querySelectorAll(".select-item:checked");

        selectedItems.forEach(function (selectedItem) {
            const itemIdToDelete = selectedItem.getAttribute("data-item-id");
            deleteItemFromList(itemIdToDelete);
        });
    });

    function addItemToList(item) {
        const listItem = document.createElement("li");
        const itemId = generateItemId();

        listItem.innerHTML = `
            <input type="checkbox" class="select-item" data-item-id="${itemId}">
            <span class="item-name">${item.name}</span>
            <input type="number" step="1" placeholder="Qtd" class="quantity-input" value="${item.quantity}">
            <input type="number" step="0.01" placeholder="R$" class="price-input" value="${item.price}">
            <button class="mark-as-purchased">${item.purchased ? "✔✔" : "✔"}</button>
        `;

        itemList.appendChild(listItem);

        const markAsPurchasedButton = listItem.querySelector(".mark-as-purchased");
        markAsPurchasedButton.addEventListener("click", function () {
            item.purchased = !item.purchased;
            updatePurchasedStyle(markAsPurchasedButton, item.purchased);
            markAsPurchasedButton.textContent = item.purchased ? "✔✔" : "✔";
            salvarLista();
        });

        updatePurchasedStyle(markAsPurchasedButton, item.purchased);

        return listItem;
    }

    function deleteItemFromList(itemId) {
        const itemToDelete = document.querySelector(`[data-item-id="${itemId}"]`).parentElement;
        itemList.removeChild(itemToDelete);
        calcularTotal();
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
            const isPurchased = item.querySelector(".mark-as-purchased").textContent === "✔✔";

            items.push({ name: itemName, quantity: itemQuantity, price: itemPrice, purchased: isPurchased });
        });

        localStorage.setItem("shoppingList", JSON.stringify(items));
    }

    function updatePurchasedStyle(button, isPurchased) {
        if (isPurchased) {
            button.style.backgroundColor = "green";
        } else {
            button.style.backgroundColor = "blue";
        }
    }

    function generateItemId() {
        return "item-" + new Date().getTime();
    }

    const openMenuButton = document.getElementById("open-menu");
    const menu = document.querySelector(".menu");

    openMenuButton.addEventListener("click", function () {
        menu.style.left = "0";
    });

    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== openMenuButton) {
            menu.style.left = "-150px";
        }
    });
});
