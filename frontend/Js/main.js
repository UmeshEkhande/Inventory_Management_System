document.addEventListener("DOMContentLoaded", () => {
  const addItemForm = document.getElementById("addItemForm");
  addItemForm.addEventListener("submit", addItem);

  fetchItems();

  const username = localStorage.getItem("username");
  if (username) {
    const usernameDisplay = document.getElementById("username");
    usernameDisplay.textContent = `Welcome, ${username}!`;
  }

  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", logout);
});

function logout() {
  localStorage.removeItem("username");
  window.location.href = "/";
}

function fetchItems() {
  fetch("http://localhost:3001/items")
    .then((response) => response.json())
    .then((data) => {
      const itemList = document.getElementById("itemList");
      itemList.innerHTML = "";
      data.forEach((item) => {
        const itemElement = document.createElement("li");
        itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>Description: ${item.description}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="deleteItem('${item._id}')">Delete</button>
                <button onclick="updateItem('${item._id}')">Update</button>
            `;
        itemList.appendChild(itemElement);
      });
    });
}

function addItem(event) {
  event.preventDefault();

  const name = document.getElementById("itemName").value;
  const description = document.getElementById("itemDescription").value;
  const quantity = document.getElementById("itemQuantity").value;

  fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, quantity }),
  })
    .then((response) => response.json())
    .then((data) => {
      fetchItems();
      document.getElementById("addItemForm").reset();
    });
}

function deleteItem(id) {
  fetch(`http://localhost:3001/items/${id}`, {
    method: "DELETE",
  }).then(() => {
    fetchItems();
  });
}

function updateItem(id) {
  fetch(`http://localhost:3001/items/${id}`)
    .then((response) => response.json())
    .then((item) => {
      document.getElementById("itemName").value = item.name;
      document.getElementById("itemDescription").value = item.description;
      document.getElementById("itemQuantity").value = item.quantity;

      deleteItem(id);

      document.getElementById("addItemForm").scrollIntoView();
      document
        .getElementById("addItemForm")
        .setAttribute("data-mode", "update");
      document.getElementById("addItemForm").setAttribute("data-id", id);
    })
    .catch((error) => {
      console.error("Error fetching item details:", error);
    });
}
