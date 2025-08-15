
---

## Components

### Backend (Laravel)
- **Controllers:** Handle page CRUD, analytics endpoints, and tracking
- **Policies:** Manage user access to resources
- **Models:** Eloquent ORM models for database interaction

### Frontend (Inertia.js + React)
- **Pages:**  
  - Dashboard (analytics charts)  
  - Page edit
- **Components:**  
  - `AnalyticsChart` (React-ApexCharts)  
  - `PageEdit`  
  - `FileUploader`

### Database
- **MySQL** with indexed analytics tables

---

## Data Flow
1. User requests a page via Inertia route
2. Laravel controller fetches data and inertia renders the page
4. For analytics, every page has its own analytics.
5. Laravel aggregates data and responds with chart-ready through inertia
6. React-ApexCharts renders graphs

---

## Security
- Laravel Sanctum for web auth with cookies
- CSRF protection for Inertia requests
- Authorization via Policies

---

## Performance
- Aggregated analytics cached for 5 minutes
- Indexed `page_views` for faster filtering
