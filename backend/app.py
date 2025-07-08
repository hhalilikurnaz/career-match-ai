# -----------------------------
# CareerMatch AI – Core Engine
# -----------------------------

import os
from sklearn.feature_extraction.text import TfidfVectorizer
#=>Metni (vektörleştirme)sayısala çevirmek ----- Feature Extraction
from sklearn.metrics.pairwise import cosine_similarity
#=>İki vektörün açısını ölçmek.------ Unsupervised pattern matching

CS_FILE="data/resumes/resume1.txt"
JOB_FILE="data/job_posts/job1.txt"

def read_text(path: str) -> str:
     
     """Plain-text dosyayı oku, \n ve boşlukları normalize et."""
     with open(path,"r",encoding="utf-8") as f:

        text=f.read()
     return " ".join(text.lower().split())

def compute_similarity(cv:str,job:str) -> float:
     """TF-IDF + Cosine Similarity ile benzerlik skoru döndür."""
     vect=TfidfVectorizer(stop_words="english")
     tfidf=vect.fit_transform([cv,job])
     score=cosine_similarity(tfidf[0], tfidf[1])
     return score


if __name__ =="__main__":
    #2.ci veriyi oku

    cv_text=read_text(CS_FILE)
    job_text=read_text(JOB_FILE)


    #Skoru hesapla
    similarity=compute_similarity(cv_text,job_text)

    #Sonucu Göster
    print(f" Eşleşme Skoru : %{similarity*100:.2f}")





