

# 🏠 Home Chores Marketplace — MVP Implementation Plan

## Phase 1: Foundation & Authentication
- Set up Lovable Cloud with Supabase backend (database, auth, storage)
- Create the role selection screen — "Continue as User" or "Continue as Worker"
- Build **User registration** form (name, email, password)
- Build **Worker registration** form with all fields: personal info, job type dropdown, experience years, pricing, and file uploads (diploma, CV, certificates) using Supabase Storage
- Role-based redirect after signup/login (User → Discovery Page, Worker → Dashboard)

## Phase 2: Design System & Layout
- Apply the blue/white/red color palette with minimalist, card-based design
- Rounded corners, soft shadows, clean typography
- Add smooth page transitions, hover micro-interactions, and skeleton loaders
- Responsive layout for desktop and mobile

## Phase 3: User Dashboard — Worker Discovery
- Top navigation bar with user info and logout
- **Filters sidebar**: Name (A→Z), Rating (1–5★), Job Type (Plumber, Electrician, Decorator, Pharmacist), Price (Low→High)
- **Worker cards grid** showing: name, job type, rating, price, experience label
- Instant filter updates with animated results
- Placeholder "View Profile" and "Contact/Book" buttons
- Seed mock worker data for demo/testing purposes

## Phase 4: Worker Dashboard
- **Profile Overview** section: name, job type, current rating (read-only), active price
- **Pricing Management**: edit price per hour/job
- **Credentials & Trust**: upload/replace certificates, CV, diplomas with file preview
- Clean dashboard layout with section cards

## Phase 5: Database & Security
- Database tables: `profiles`, `user_roles`, `workers` (with job_type, experience, price, rating), file references in Supabase Storage
- Row-Level Security policies so workers can only edit their own data
- Proper role management using a separate `user_roles` table
- Storage buckets for worker documents (certificates, CVs, diplomas)

