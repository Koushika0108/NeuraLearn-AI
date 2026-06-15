# 🚀 NeuraLearn AI

**🌟 Personalized Curriculum Generator with AI-Powered Learning Insights**

---

## 📘 Overview

NeuraLearn AI is an intelligent and dynamic learning platform that crafts **personalized curriculums** tailored to each learner's unique goals, subject preferences, and performance. It leverages **AI, data analytics,** and **gamification** to make learning not just effective—but fun, insightful, and motivating!

---

## 🔑 Key Features

✅ **Personalized Curriculum Generator**  
🎯 Adapts learning paths based on your goals, performance, and strengths.

📊 **Data Analytics Dashboard**  
Track your performance with rich visuals—right from the homepage to quiz pages.

🤖 **ASK AI – Your AI Study Buddy**  
Get real-time assistance, explanations, and tips directly from an AI-powered assistant.

📚 **Quiz-Based User Clustering**  
Groups similar learners together for collaborative and personalized strategy suggestions.

💡 **Curriculum-wise Study Tips**  
Actionable insights for each subject or topic to boost learning outcomes.

🧠 **AI-Generated Content & Quizzes**  
Auto-generated quizzes, questions, and explanations using advanced AI models.

📈 **Progress Tracking + Weakness Detection**  
Get detailed **report cards** highlighting weak areas and recommended improvements.

📘 **Multi-Subject Support**  
Covers Math, Science, Programming, and more—scalable to any subject.

🎮 **Gamification Elements**  
Earn **XP**, build **streaks**, and unlock **badges** to stay motivated and consistent.

---

## 🧠 Technologies Used

- **Backend**: Python, Flask, Node.js, Express  
- **Frontend**: React (with Vite)  
- **APIs & AI**: Supabase, Groq API (Llama 3.3 70B)  
- **ML Models**: K-Means Clustering, StandardScaler (scikit-learn)  
- **Visualization**: Chart.js  
- **Authentication**: JWT  
- **Hosting**: Vercel (Client), Render (Server)

---
## 🌐 Live Demo

Try out **NeuraLearn AI** live:  
🔗 [https://neura-learn-ai.vercel.app/](https://neura-learn-ai.vercel.app/)

---

## 💻 Local Setup Guide

> Follow these steps to run NeuraLearn AI locally on your system.

---

### ⚙️ Prerequisites

- ✅ Python 3.8+  
- ✅ Node.js (v16+ recommended)  
- ✅ npm or yarn  
- ✅ Git  

---

## 🔧 Basic Setup


```bash
git clone https://github.com/Charan970-1/NeuraLearn-AI.git
```

### Frontend Setup
#### Step 1: Create a .env file inside client folder
```env
VITE_BACKEND_URL= "your backend url"
VITE_PYTHON_URL = "your python url"
```

#### Step 2: Execute these commands
``` bash
cd NeuraLearn-AI/client
npm install
npm run dev

```


### Backend Setup
##### Open a new terminal
#### Step 3: Create a .env file inside server folder
```env
PORT="port"
SUPA_URL="your_supabase url"
SUPA_KEY="your_supabase key"
JWT_SECRET="jwt secret"
CLIENT_URL="client url"
```

#### Step 4: Execute these commands
``` bash
cd NeuraLearn-AI/server
npm install
node server.js
```


### Python Backend Setup
##### Open a new terminal
#### Step 5: Create a .env file inside python folder

```env
SUPA_URL="your_supabase url"
SUPA_KEY="your_supabase key"
GROQ_API_KEY="your_groq_api_key"
JWT_SECRET="jwt secret"
CLIENT_URL="client url"
```

> Get your free Groq API key at [console.groq.com](https://console.groq.com)

#### Step 6: Execute these commands
``` bash
pip install -r req.txt
python app.py
```

### 🗄️ Database Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in the dashboard
3. Copy the contents of `supabase_migration.sql` and run it
4. This creates all required tables, views, and RPC functions

---

## 🙌 Contribution

We welcome contributions, feature suggestions, and bug reports!  
📬 Feel free to open an issue or create a pull request:  
👉 [GitHub Issues](https://github.com/Charan970-1/NeuraLearn-AI/issues)

---

## 📝 License

This project is licensed under the **MIT License** – feel free to use and modify.

---

## 📫 Contact

Need help or want to collaborate?  
📧 Reach out: `charanbandi18@gmail.com`
