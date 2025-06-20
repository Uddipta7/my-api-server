let items = [];
let editIndex = null;
let deleteIndex = null;

const itemList = document.getElementById("itemList");
const itemForm = document.getElementById("itemForm");
const itemName = document.getElementById("itemName");
const itemQuantity = document.getElementById("itemQuantity");
const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submitBtn");
const totalItems = document.getElementById("totalItems");
const totalQuantity = document.getElementById("totalQuantity");
const toggleDark = document.getElementById("toggleDark");
const confirmModal = document.getElementById("confirmModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");

function showToast(message, type = "success") {
  VanillaToasts.create({
    title: type === "success" ? "Success" : type === "info" ? "Info" : "Notice",
    text: message,
    type: type, // success, info, warning, error
    timeout: 2000
  });
}

function renderItems() {
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  itemList.innerHTML = "";
  filtered.forEach((item, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerHTML = `<strong>${item.name}</strong> — Qty: ${item.quantity}`;

    const actions = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerText = "✏️ Edit";
    editBtn.onclick = () => {
      itemName.value = item.name;
      itemQuantity.value = item.quantity;
      editIndex = index;
      submitBtn.innerText = "Update Item";
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerText = "🗑️ Delete";
    deleteBtn.onclick = () => {
      deleteIndex = index;
      confirmModal.style.display = "flex";
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    itemList.appendChild(li);
  });

  totalItems.innerText = `Total Items: ${items.length}`;
  totalQuantity.innerText = `Total Quantity: ${items.reduce((sum, i) => sum + Number(i.quantity), 0)}`;
}

itemForm.onsubmit = (e) => {
  e.preventDefault();
  const newItem = { name: itemName.value, quantity: itemQuantity.value };

  if (editIndex !== null) {
    items[editIndex] = newItem;
    showToast("✅ Item updated successfully!", "success");
    editIndex = null;
    submitBtn.innerText = "Add Item";
  } else {
    items.push(newItem);
    showToast("🎉 Item added successfully!", "success");
  }

  itemName.value = "";
  itemQuantity.value = "";
  renderItems();
};

function hideModal() {
  confirmModal.style.display = "none";
  deleteIndex = null;
}

confirmDeleteBtn.onclick = () => {
  if (deleteIndex !== null) {
    items.splice(deleteIndex, 1);
    showToast("🗑️ Item deleted.", "info");
    renderItems();
  }
  hideModal();
};

searchInput.oninput = renderItems;

document.getElementById("exportCSV").onclick = () => {
  const csv = Papa.unparse(items);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "inventory.csv";
  link.click();
};

document.getElementById("importFile").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  const isExcel = file.name.endsWith(".xlsx");

  reader.onload = (event) => {
    let data = [];
    if (isExcel) {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet);
    } else {
      data = Papa.parse(event.target.result, { header: true }).data;
    }

    for (let item of data) {
      if (item.name && item.quantity) {
        items.push({ name: item.name, quantity: item.quantity });
      }
    }
    showToast("📥 Import complete!", "success");
    renderItems();
  };

  if (isExcel) reader.readAsBinaryString(file);
  else reader.readAsText(file);
};

toggleDark.onclick = () => {
  document.querySelector(".container").classList.toggle("dark");
  document.body.classList.toggle("dark");
  toggleDark.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

renderItems();
