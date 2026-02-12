# How to Run the Project

Follow these steps to start the application with the new features.

## 1. Start the Backend Services
You will need two terminal windows for the backend.

**Terminal 1: User Service** (Port 8081)
```bash
cd Backend/user-service
./mvnw spring-boot:run
```
*(On Windows Command Prompt, use `mvnw` instead of `./mvnw`)*

**Terminal 2: API Gateway** (Port 8080)
```bash
cd Backend/api-gateway
./mvnw spring-boot:run
```

## 2. Start the Frontend
**Terminal 3: React Client** (Port 3000/5173)
```bash
cd Frontend/client
npm run dev
```

## 3. essential: Database Setup (Admin User)
To use the new **Admin Dashboard**, you need an admin user.
Since you cannot register directly as an admin, follow these steps:

1.  Open your browser and go to `http://localhost:5173/register` (or your frontend URL).
2.  Register a new user with:
    -   **Name**: Admin
    -   **Email**: `admin@cdac.in`
    -   **Password**: `Admin@123`
3.  Open your Database Management Tool (like Workbench or DBeaver).
4.  Run this SQL command to promote the user:
    ```sql
    UPDATE users SET role = 'ADMIN' WHERE email = 'admin@cdac.in';
    ```

## 4. Verify Functionality
-   **Login**: Go to `/login` and sign in as `admin@cdac.in`.
-   **Dashboard**: You should be redirected to `/` or navigate to `/admin-dashboard`.
-   **Profile**: Check your profile page at `/profile`.
