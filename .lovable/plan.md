

# ScholarCore — Student Registration Portal

A high-density, production-quality Student Information System built with React + Tailwind, using localStorage for persistence. Inspired by Stripe's dashboard aesthetics.

## Pages & Navigation

### Sidebar Navigation
- Fixed left sidebar with ScholarCore branding
- Nav items: Dashboard, Students, Register

### 1. Dashboard
- **Stat cards**: Total Students, Active Students, Departments count
- **Department distribution**: Horizontal bar chart with percentages
- **Recent registrations**: Last 5 students with photo, name, ID, status badge
- **Status breakdown**: Visual pie/donut chart (Active/Inactive/Suspended)

### 2. Student Directory (List View)
- **Toolbar**: Live search (by name/ID), course filter, year filter, sort dropdown (Name, ID, Date), CSV export button, print button
- **Data table**: Photo, Name, ID, Course/Year, Email, Status badge, Actions (view/edit/delete)
- **Bulk actions**: Checkbox selection with bulk delete
- **Pagination**: 10 per page with page controls and total count badge
- **Empty state**: Illustration + message when no results

### 3. Register / Edit Student
- **Full form**: Name, Email (validated), Phone (validated), DOB (with auto age calc), Gender, Course, Year, Address, Status, Photo upload with preview
- **Validation**: Required fields, email format, phone format, duplicate ID/email checks, real-time inline errors
- **Submit**: Loading spinner animation, then toast notification
- **Edit mode**: Same form pre-filled, accessed via edit button in table

### 4. Student Profile (Modal/Slide-over)
- Click student row → full profile card overlay
- All details in clean layout with large photo, contact info, academic info, status

## Data & Persistence
- localStorage with 5 preloaded dummy students
- Auto-generated IDs: `STU-2024-001` format
- Data survives refresh

## UI Details
- ScholarCore design system: cool slate bg, white glass cards, blue-600 primary, layered shadows
- Color-coded status badges (green/red/amber)
- Tabular-nums for IDs and dates
- Toast notifications (slide-up, dark theme)
- Smooth transitions and hover reveals
- Fully responsive (mobile + desktop)

