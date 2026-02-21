🚀 Smart Expense Tracker
Production-Grade Personal Finance Analytics Platform
A full-stack financial analytics web application that parses bank statement PDFs, extracts transactions, and generates dynamic visual insights through a modern dashboard.
________________________________________
🏆 Why This Project Stands Out
This is not just a CRUD app.
It demonstrates:
•	🔐 Secure JWT Authentication Architecture
•	📄 Real-world PDF Parsing & Data Extraction
•	📊 Advanced Financial Analytics Dashboard
•	🧠 Category Detection & Monthly Aggregation Logic
•	☁️ Cloud Deployment (MongoDB Atlas + Render + Vercel)
•	🏗 Clean, Scalable Full-Stack Architecture
________________________________________
🌍 Live Application
•	Frontend (Vercel): https://personal-finance-tracking-app.vercel.app/
•	Backend API (Render): https://finance-backend-1g15.onrender.com/
________________________________________
🖼 Application Preview
🔐 Authentication System
•	Register / Login
•	JWT Token Generation
•	Protected Routes
•	Persistent Sessions
________________________________________
 
📄 PDF Upload & Transaction Extraction
•	Upload Bank Statement PDF
•	Server-side parsing using pdf-parse
•	Extract:
o	Date
o	Description
o	Credit / Debit
o	Balance
•	Automatic categorization logic
________________________________________
📊 Financial Analytics Dashboard
•	Total Income vs Total Expense
•	Monthly Expense Breakdown
•	Category-wise Analysis
•	Dynamic Charts (Recharts)
•	Real-time aggregation from MongoDB

 ________________________________________
🛠 Tech Stack
🖥 Frontend
•	React (Vite)
•	React Router v6
•	Context API (Auth State Management)
•	Axios
•	Tailwind CSS
•	Recharts (Data Visualization)
⚙ Backend
•	Node.js
•	Express.js
•	MongoDB + Mongoose
•	JWT Authentication
•	Multer (File Upload Middleware)
•	pdf-parse (PDF Data Extraction)
•	CORS Configuration
☁️ Deployment
•	MongoDB Atlas (AWS - Mumbai Region)
•	Render (Backend Hosting)
•	Vercel (Frontend Hosting)
________________________________________
🔐 Authentication Architecture
•	Password hashed before storage
•	JWT signed with secret key
•	Token stored in localStorage
•	AuthContext hydrates session safely
•	ProtectedRoute prevents unauthorized access
•	Logout clears token + user state
________________________________________
📊 Data Processing Logic
When a PDF is uploaded:
1.	File stored temporarily via Multer
2.	Parsed using pdf-parse
3.	Transactions extracted using custom logic
4.	Categorization applied
5.	Stored in MongoDB
6.	Aggregated dynamically:
o	Total Income
o	Total Expense
o	Monthly Breakdown
o	Category Totals
________________________________________
 
📂 Project Structure
personal-finance-tracking-app/
│
├── client/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── App.jsx
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md
________________________________________
🔌 API Endpoints
Auth Routes
Method	  Endpoint	Description
POST	  /api/auth/register	Register new user
POST	  /api/auth/login	Login user
Transaction Routes
Method	Endpoint	Description
POST	/api/upload	Upload & parse PDF
GET	/api/transactions	Get user transactions
GET	/api/summary	Get financial summary
________________________________________
⚙️ Environment Variables
Backend (.env)
PORT=5000
MONGO_URI= mongodb://127.0.0.1:27017/financeApp
JWT_SECRET= supersecretkey123
Frontend (.env)
VITE_API_BASE_URL= https://finance-backend-1g15.onrender.com/
________________________________________
🧪 Local Setup Guide
1️ Clone Repository
git clone https://github.com/kashyap-deepanshu/personal-finance-tracking-app.git
cd personal-finance-tracking-app
2️ Install Backend
cd server
npm install
npm run dev
3️ Install Frontend
cd client
npm install
npm run dev
________________________________________
📈 Engineering Highlights (For Recruiters)
•	Real-world financial data processing
•	Backend PDF parsing & structured extraction
•	Clean separation of concerns
•	Scalable architecture
•	Secure authentication workflow
•	Production cloud deployment
•	Environment-based configuration
•	Persistent user session handling
•	Modular React component structure
•	Modern UI/UX with Tailwind
________________________________________
🔮 Future Improvements
•	Expense trend prediction
•	AI-based smart categorization
•	Multi-bank PDF support
•	CSV Upload support
•	Admin analytics panel
•	Dark mode
•	PWA support
________________________________________
👨💻 Author
Deepanshu 
Full-Stack Developer
GitHub: https://github.com/kashyap-deepanshu
LinkedIn: https://www.linkedin.com/in/kashyap1999/

