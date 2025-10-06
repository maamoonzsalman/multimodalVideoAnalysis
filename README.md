# Multimodal Video Analysis Application

A full-stack application that enables users to **analyze YouTube videos through AI-powered multimodal understanding**. It combines **LLMs and computer vision models** to provide intelligent insights, including timestamped visual searches, video summaries, and chat-based interactions about specific video content.  
Built using modern AI and web technologies, it bridges language and visual understanding for a rich, interactive analysis experience.

---

## About

This project demonstrates an intelligent multimodal system where users can:

- Perform **visual content searches** within YouTube videos  
- Chat with an **AI model about video topics** in natural language  
- Get **timestamped results** for relevant frames or moments  
- Retrieve **automatic segment breakdowns** and contextual summaries  

The app uses **React** for an intuitive frontend, **FastAPI** for the backend, and **PyTorch** for model integration. It leverages **Google Gemini** for multimodal reasoning and **CLIP-based embeddings** for visual similarity search.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** FastAPI (Python)  
- **AI Models:** Google Gemini, CLIP (OpenAI), Mistral for embeddings  
- **Data Processing:** yt-dlp, ffmpeg, numpy, torch  
- **Database:** PostgreSQL (SQLAlchemy ORM)  
- **API Design:** RESTful architecture  

---

## Features

- **Video Chat:** Ask natural language questions about any YouTube video and get context-aware answers.  
- **Visual Content Search:** Find timestamps in a video where certain objects or scenes appear.  
- **Automatic Transcription:** Extracts and processes video transcripts for context-aware AI queries.  
- **Segmented Insights:** Breaks down long videos into coherent, time-stamped sections.  
- **Scalable Compute:** Supports distributed video frame extraction and analysis for large videos.  
- **Clean UI:** Modern interface for uploading, searching, and chatting with videos.  

---

## Future Work

- **GPU Scaling:** Use distributed compute for large-scale video embeddings and inference.  
- **Database Optimization:** Cache and reuse processed embeddings for faster retrieval.  
- **Fine-tuned Models:** Improve accuracy for specialized domains like lectures, sports, or news.  
- **Multi-video Comparison:** Enable cross-video visual and semantic search.  

---
