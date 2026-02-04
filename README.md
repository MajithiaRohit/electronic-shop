# 🛒 Electronic Shop – Full Stack Application

A full-stack **Electronic Shop Admin Panel** built using  
**ASP.NET Core Web API (.NET 8)** and **Angular 21 (Standalone Components)**.

This project is designed as a **real-world, interview-ready showcase**.

---

## 🚀 Tech Stack

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core (Code First)
- SQL Server
- LINQ
- RESTful APIs

### Frontend
- Angular 21 (Standalone Components)
- Signals & Reactive Forms
- Bootstrap 5.3
- Modern Angular control flow (`@if`, `@for`)

### Tools
- Git & GitHub (Monorepo)
- VS 2022 / VS Code

---

## 📁 Project Structure

electronic-shop/
│
├── Backend/
│ └── ElectronicShop.API
│
├── frontend/
│ └── electronic-shop-ui
│
└── README.md



---

## ✨ Features Implemented

### Admin Panel
- Category Management (CRUD)
- Active / Inactive status
- Admin-style layout (Header, Sidebar, Footer)
- Confirmation before delete

### Backend
- Clean architecture (Controllers, Services, DTOs)
- Code-first migrations
- Proper async/await usage
- JSON-based API responses

---

## 🧠 Key Learnings

- Real-world Angular + .NET integration
- Handling async bugs and API response issues
- Git monorepo setup for frontend & backend
- Debugging frontend–backend data mismatch
- Modern Angular best practices (no deprecated syntax)

---

## ▶️ How to Run the Project

### Backend
1. Open solution in Visual Studio
2. Update connection string in `appsettings.json`
3. Run the API
4. Swagger opens at `/swagger`

### Frontend
```bash
cd frontend/electronic-shop-ui
npm install
ng serve

Open: http://localhost:4200

🔮 Future Enhancements

Product management

Orders & cart

Authentication (JWT)

Role-based access

Deployment (Azure / Vercel)

👤 Author

Rohit
Full Stack Developer (ASP.NET Core + Angular)