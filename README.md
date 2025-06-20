# 📦 Inventory Manager

A simple inventory management system with a **Node.js + Express backend** and a **vanilla HTML/CSS/JS frontend**. Easily add, edit, delete, import/export inventory items and manage them visually.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB
- **Other**: XLSX, PapaParse for CSV/Excel import/export

---

## 📌 Features

- Add, edit, and delete inventory items
- Search functionality
- CSV and Excel file import/export
- Item summary (total count and quantity)
- Light/Dark theme toggle
- Confirmation modal before delete
- Toast notifications
- Fully responsive UI

---

## 🛠️ APIs and Functionality

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| GET    | `/api/items`         | Get all items           |
| POST   | `/api/items`         | Add a new item          |
| PUT    | `/api/items/:id`     | Update an existing item |
| DELETE | `/api/items/:id`     | Delete an item          |

### 📤 Sample Request

**POST /api/items**
```json
{
  "name": "Laptop",
  "quantity": 10
}
```
### 📥 Sample Response

**GET /api/items**
```json
 {
    "_id": "667d02d5671adf9232d14c91",
    "name": "Laptop",
    "quantity": 10
}
```
## 🧪 Database Setup
- Database: MongoDB
- Integration: Connected using Mongoose

## 🔌 Sample .env file
```ini
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventory
PORT=5000
```

## 🚀 How to Run This Project Locally
1️⃣ Clone the Repository
```bash
git clone https://github.com/Uddipta7/my-api-server.git
cd my-api-server
```
2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```
3️⃣ Set up .env
Create a .env file in the backend directory:
```bash
MONGO_URI=<your-mongodb-uri>
PORT=5000
```
4️⃣ Run the Server
```bash
npm start
Server will run at: http://localhost:5000
```

## 🌐 How to Run the Frontend
Simply open the following file in your browser:
```bash
frontend/index.html
```
No build tools or bundlers required.

## 📎 Folder Structure
```pgsql
my-api-server/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── .gitignore
├── README.md
└── api-docs.md.txt
```

