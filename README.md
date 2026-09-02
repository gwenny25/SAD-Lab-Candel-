# Student Record Management System

A simple CRUD web application built for the SAD Laboratory Exercise: *Design, Develop, and Deploy a Simple CRUD Information System*.

## Purpose
Allows a user to add, view, edit, and delete basic student records, backed by a cloud database.

## Functions
- **Create** — Add a new student record via a form.
- **Read** — Display all saved student records in a table.
- **Update** — Edit an existing record's details.
- **Delete** — Remove a record, with a confirmation prompt before deletion.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Database:** Supabase (PostgreSQL)

## Database Structure
Table: `students`

| Field       | Type      | Description                |
|-------------|-----------|----------------------------|
| id          | bigint    | Auto-generated primary key |
| student_id  | text      | Unique student number      |
| full_name   | text      | Complete name of student   |
| program     | text      | Academic program           |
| year_level  | text      | Current year level         |
| email       | text      | Student email address      |
| created_at  | timestamp | Record creation time       |

See `schema.sql` for the exact table creation script.

## Setup Instructions
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL Editor in your Supabase project and run `schema.sql`.
3. Go to **Project Settings > API** and copy your **Project URL** and **anon public key**.
4. Open `script.js` and paste those values into `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
5. Open `index.html` in a browser (or deploy — see below) to run the app.

## Deployment
This app is static (no build step), so it can be deployed with:
- **GitHub Pages:** Settings > Pages > Deploy from branch (`main`, root folder).
- **Netlify / Vercel:** Drag-and-drop the project folder or connect the GitHub repo.

## Developer
Kiimoy — BS Information Technology / Computing, Agusan del Sur State University (ADSSU)
