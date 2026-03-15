#Ashvanth Student Portal
A modern student portal web application built by Ashvanth to manage students, courses, and academic information in a clean, responsive interface. The app focuses on a smooth UI, quick search and filtering, and a simple workflow for day‑to‑day student management.

Live demo
Deployed app: https://ashvanth-student-portal.lovable.app

Features
Student list with key details (name, ID, contact, etc.).

Add, edit, and remove students directly from the UI.

Search and filter functionality for quickly finding students.

Clean, responsive design that works on desktop and mobile.

Local storage–based persistence for student data during development (no external DB setup needed yet).

Built with a modern React + TypeScript + Tailwind + shadcn‑ui stack for fast, scalable development.
​

Tech stack
Vite (frontend build tool)
​

React with TypeScript
​

Tailwind CSS for styling
​

shadcn‑ui for pre‑built, accessible UI components
​

Getting started
Prerequisites
Node.js and npm installed on your machine.

Git installed (optional but recommended).

Setup
Clone the repository:

bash
git clone https://github.com/Ashvanth-M/Ashvanth-Student-Portal.git
cd Ashvanth-Student-Portal
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Open the local URL shown in your terminal (usually http://localhost:5173) in your browser.

Project structure
src/ – React components, pages, hooks, and core logic.
​

public/ – Static assets.
​

index.html – Root HTML entry point.
​

tailwind.config.ts – Tailwind configuration.
​

vite.config.ts – Vite configuration and dev server settings.
​

You can extend the project by adding:

Separate pages for dashboard, students, courses, and reports.

Authentication and role‑based access (admin, faculty, student).

API integration with a real backend and database.

Development notes
The app is designed to be easy to extend: you can plug in your own API or database layer later.

TypeScript types are used to keep the student data model consistent across the app.
​

UI components are built with shadcn‑ui and Tailwind, so customizing the design is straightforward.
​

Roadmap / ideas
Add authentication (JWT / OAuth) for secure access.

Integrate real‑time updates for attendance or marks.

Export data as CSV / PDF for admin use.

Dark mode and theme customization.

Ashvanth – design, development, and deployment of this student portal.

GitHub: @Ashvanth-M
