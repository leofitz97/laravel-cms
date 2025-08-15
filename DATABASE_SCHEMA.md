# Database Schema

## ERD


## Tables

### users
| Column     | Type         | Description                 |
|------------|--------------|-----------------------------|
| id         | bigint PK    | User ID                     |
| name       | varchar(255) | Full name                   |
| email      | varchar(255) | Unique email                 |
| password   | varchar(255) | Hashed password             |
| role       | varchar(255) | user role (client, admin)   |
| slug       | varchar(255) | user slug                   |
| created_at | timestamp    | Creation timestamp          |

### pages
| Column        | Type         | Description                    |
|---------------|--------------|--------------------------------|
| id            | bigint PK    | Page ID                        |
| user_id       | bigint FK    | Owner                          |
| title         | varchar(255) | Page title                     |
| body          | text         | Page body html content         |
| is_published  | varchar(255) | Page Published                 |
| slug          | varchar(255) | Unique slug                    |
| theme         | varchar(255) | Theme identifier               |
| background_path | varchar(255) | Path to background image     |
| logo_path     | varchar(255) | Path to logo image             |
| theme         | varchar(255) | Page theme                     |
| created_at    | timestamp    | Creation timestamp             |
| publish_at    | timestamp    | publish timestamp             |

### page_views
| Column      | Type         | Description                   |
|-------------|--------------|-------------------------------|
| id          | bigint PK    | View ID                       |
| page_id     | bigint FK    | Linked page                   |
| visitor_id  | varchar(255) | Unique visitor identifier     |
| ip_address  | varchar(45)  | IP address                    |
| user_agent  | text         | Browser User-Agent            |
| referer     | text         | Referrer URL                  |
| created_at  | timestamp    | View timestamp                |

### pae revision
| Column      | Type         | Description                   |
|-------------|--------------|-------------------------------|
| id          | bigint PK    | View ID                       |
| client_id   | varchar(255) | Linked Client                 |
| revision_data   | json     | Page data tracking            |


---

## Indexes
- `pages.slug` (unique)
- `page_views.page_id, created_at` (composite index)
- `page_views.visitor_id` (for unique visitor counts)
