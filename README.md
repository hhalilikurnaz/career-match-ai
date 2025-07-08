# CareerMatch AI

🎯 **CareerMatch AI** is an intelligent resume-job matching platform powered by Natural Language Processing (NLP).  
It not only compares a given CV to a job description for a similarity score, but now also recommends the **top matching job listings** based on the uploaded resume!

---

## 💡 Features

- Upload or paste your **CV (resume)**
- Either:
  - Compare it with a specific **job post** to get a match score
  - **OR** get a list of job ads ranked by their match score with your resume
- Built with **TF-IDF**, **Cosine Similarity**, and **Flask**
- Dynamic **frontend** (HTML + JS) for a smooth user experience
- 100% deployable & professional project for portfolios

---

## 🔍 Use Cases

| Use Case | Description |
|----------|-------------|
| 🎯 Match Score | Get a similarity score (%) between a CV and a specific job ad |
| 📌 Job Recommendations | Upload a CV and receive the **top 3 matching job listings** automatically |
| 🔧 HR Utility | Can be adapted for bulk resume screening or job filtering systems |

---

## 🚀 Tech Stack

- Python (NLP & backend logic)
- Flask (API server)
- HTML/CSS/JavaScript (Frontend UI)
- Scikit-learn, Pandas, NumPy
- GitHub & Render/Vercel (for deployment)

---

## 📁 Project Structure





career-match-ai/
├── backend/
│ └── app.py
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── data/
│ ├── resumes/
│ │ └── resume1.txt
│ └── job_posts/
│ └── job1.txt
├── requirements.txt
└── README.md


---


---

## 🧠 How It Works

1. The user provides a resume and/or job description.
2. All texts are preprocessed (stopwords removed, normalized, vectorized via TF-IDF).
3. Cosine similarity is used to measure how similar the resume is to each job ad.
4. Either a single score is returned or the **top 3 job matches** are displayed.
5. Results are rendered dynamically on the frontend.

---

## 💻 Run Locally

```bash
git clone https://github.com/hhalilikurnaz/career-match-ai.git
cd career-match-ai
pip install -r requirements.txt
python backend/app.py


🧑‍💼 Author
Devoloped by Halil İbrahim Kunraz
