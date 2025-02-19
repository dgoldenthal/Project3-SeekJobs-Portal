# Project3-SeekJobs-Portal

## Description

SeekJobs is a modern MERN stack job portal application that connects job seekers with employers. The platform provides an intuitive interface for job searching, application management, and recruitment processes. Built with a focus on user experience, SeekJobs offers features like real-time job listings, advanced search filters, and a streamlined application process.

[View Live Demo](https://project3-seekjobs-portal.onrender.com)

![SeekJobs Screenshot](screenshot.png)

## Features

### For Job Seekers
- Easy job search with filters (location, category, experience level)
- One-click job applications
- Profile and resume management
- Application tracking
- Real-time status updates

### For Recruiters
- Company profile management
- Job posting and management
- Applicant tracking system
- Resume access and review
- Application status management

## Technologies Used

### Frontend
- React.js
- TailwindCSS for styling
- React Router for navigation
- Axios for API requests
- React Toastify for notifications
- React Quill for rich text editing

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Multer for file upload handling

### DevOps & Deployment
- Render for hosting
- MongoDB Atlas for database
- GitHub Actions for CI/CD
- Environment variables for security

## Installation

1. Clone the repository
```bash
git clone https://github.com/dgoldenthal/Project3-SeekJobs-Portal.git
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

3. Create .env files

Backend (.env):
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```


4. Run the application
```bash
# Run backend
cd server
npm run start

# Run frontend
cd client
npm run dev
```

## Usage

### Job Seekers
1. Sign up/Login using email
2. Upload resume and complete profile
3. Search for jobs using filters
4. Apply to jobs with one click
5. Track application status

### Recruiters
1. Register company profile
2. Post job openings
3. Review applications
4. Manage job listings
5. Update application statuses

## API Endpoints

### Company Routes
- POST /api/company/register - Register company
- POST /api/company/login - Company login
- GET /api/company/company - Get company profile
- POST /api/company/post-job - Create job listing
- GET /api/company/applicants - View applications
- GET /api/company/list-jobs - List company jobs
- POST /api/company/change-status - Update application status
- POST /api/company/change-visiblity - Toggle job visibility

### Job Routes
- GET /api/jobs - List all jobs
- GET /api/jobs/:id - Get specific job

### User Routes
- GET /api/users/user - Get user profile
- POST /api/users/apply - Submit application
- GET /api/users/applications - View applications
- POST /api/users/update-resume - Update resume

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License

## Project Status

Active development - New features being added regularly

## Future Development

- Advanced search algorithms
- Email notifications
- In-app messaging system
- Analytics dashboard for companies
- Mobile application
- AI-powered job matching
- Resume builder

## Team Members

- [Dov Goldenthal](https://github.com/dgoldenthal/Project3-SeekJobs-Portal)

