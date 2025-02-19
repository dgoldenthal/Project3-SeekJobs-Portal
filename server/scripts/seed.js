import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Sample Data
const users = [
    {
        _id: "user1",
        name: "John Smith",
        email: "john.smith@example.com",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        resume: "https://example.com/resumes/john-smith.pdf"
    },
    {
        _id: "user2",
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        resume: "https://example.com/resumes/emma-wilson.pdf"
    },
    {
        _id: "user3",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        resume: "https://example.com/resumes/michael-chen.pdf"
    },
    {
        _id: "user4",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        resume: "https://example.com/resumes/sarah-johnson.pdf"
    },
    {
        _id: "user5",
        name: "David Brown",
        email: "david.brown@example.com",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        resume: "https://example.com/resumes/david-brown.pdf"
    }
];

const companies = [
    {
        name: "Tech Innovators",
        email: "hr@techinnovators.com",
        image: "https://logo.clearbit.com/google.com",
        password: "password123"
    },
    {
        name: "Global Solutions",
        email: "hr@globalsolutions.com",
        image: "https://logo.clearbit.com/microsoft.com",
        password: "password123"
    },
    {
        name: "Data Dynamics",
        email: "hr@datadynamics.com",
        image: "https://logo.clearbit.com/amazon.com",
        password: "password123"
    },
    {
        name: "Cloud Systems",
        email: "hr@cloudsystems.com",
        image: "https://logo.clearbit.com/salesforce.com",
        password: "password123"
    },
    {
        name: "AI Solutions",
        email: "hr@aisolutions.com",
        image: "https://logo.clearbit.com/apple.com",
        password: "password123"
    }
];

const jobs = [
    {
        title: "Senior Software Engineer",
        description: `
            <p>We are seeking a talented Senior Software Engineer to join our growing team. This is an excellent opportunity for someone who is passionate about technology and innovation.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Design and implement scalable software solutions</li>
                <li>Lead technical architecture discussions</li>
                <li>Mentor junior developers</li>
                <li>Drive best practices and code quality</li>
            </ol>
        `,
        location: "London",
        category: "Programming",
        level: "Senior Level",
        salary: 120000,
    },
    {
        title: "Data Scientist",
        description: `
            <p>Join our data science team to solve complex problems using advanced analytics and machine learning.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Develop predictive models</li>
                <li>Analyze large datasets</li>
                <li>Create data visualization</li>
                <li>Collaborate with stakeholders</li>
            </ol>
        `,
        location: "Tel Aviv",
        category: "Data Science",
        level: "Intermediate Level",
        salary: 95000,
    },
    {
        title: "UX Designer",
        description: `
            <p>Create exceptional user experiences for our digital products.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Design user interfaces</li>
                <li>Conduct user research</li>
                <li>Create wireframes and prototypes</li>
                <li>Collaborate with developers</li>
            </ol>
        `,
        location: "Auckland",
        category: "Designing",
        level: "Intermediate Level",
        salary: 85000,
    },
    {
        title: "DevOps Engineer",
        description: `
            <p>Help us build and maintain our cloud infrastructure and deployment pipelines.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Manage cloud infrastructure</li>
                <li>Implement CI/CD pipelines</li>
                <li>Monitor system performance</li>
                <li>Ensure security compliance</li>
            </ol>
        `,
        location: "Washington",
        category: "Programming",
        level: "Senior Level",
        salary: 110000,
    },
    {
        title: "Product Manager",
        description: `
            <p>Lead product development and strategy for our core products.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Define product vision</li>
                <li>Manage product roadmap</li>
                <li>Work with stakeholders</li>
                <li>Analyze market trends</li>
            </ol>
        `,
        location: "Bangalore",
        category: "Management",
        level: "Senior Level",
        salary: 100000,
    },
    {
        title: "Cybersecurity Analyst",
        description: `
            <p>Protect our systems and data from security threats.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Monitor security systems</li>
                <li>Conduct security audits</li>
                <li>Implement security measures</li>
                <li>Respond to incidents</li>
            </ol>
        `,
        location: "New York",
        category: "Cybersecurity",
        level: "Intermediate Level",
        salary: 95000,
    },
    {
        title: "Full Stack Developer",
        description: `
            <p>Build and maintain web applications using modern technologies.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Develop frontend and backend features</li>
                <li>Optimize application performance</li>
                <li>Write clean, maintainable code</li>
                <li>Debug and fix issues</li>
            </ol>
        `,
        location: "Tel Aviv",
        category: "Programming",
        level: "Intermediate Level",
        salary: 88000,
    },
    {
        title: "AI Research Scientist",
        description: `
            <p>Research and develop cutting-edge AI solutions.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Conduct AI research</li>
                <li>Develop ML models</li>
                <li>Write research papers</li>
                <li>Present findings</li>
            </ol>
        `,
        location: "London",
        category: "Data Science",
        level: "Senior Level",
        salary: 130000,
    },
    {
        title: "Technical Project Manager",
        description: `
            <p>Lead technical projects and development teams.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Manage project timelines</li>
                <li>Coordinate team efforts</li>
                <li>Report project status</li>
                <li>Manage resources</li>
            </ol>
        `,
        location: "California",
        category: "Management",
        level: "Senior Level",
        salary: 115000,
    },
    {
        title: "Mobile App Developer",
        description: `
            <p>Create innovative mobile applications for iOS and Android.</p>
            <h2><strong>Key Responsibilities</strong></h2>
            <ol>
                <li>Develop mobile apps</li>
                <li>Implement UI/UX designs</li>
                <li>Optimize app performance</li>
                <li>Fix bugs and issues</li>
            </ol>
        `,
        location: "Auckland",
        category: "Programming",
        level: "Intermediate Level",
        salary: 90000,
    }
];

// Seeding function
const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});

        console.log('Cleared existing data');

        // Create users
        await User.insertMany(users);
        console.log('Users seeded');

        // Create companies with hashed passwords
        const hashedCompanies = await Promise.all(companies.map(async (company) => ({
            ...company,
            password: await bcrypt.hash(company.password, 10)
        })));

        const createdCompanies = await Company.insertMany(hashedCompanies);
        console.log('Companies seeded');

        // Create jobs
        const jobsWithCompanies = jobs.map((job, index) => ({
            ...job,
            companyId: createdCompanies[index % createdCompanies.length]._id,
            date: Date.now(),
            visible: true
        }));

        await Job.insertMany(jobsWithCompanies);
        console.log('Jobs seeded');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeding process
connectDB().then(() => {
    console.log('Starting database seeding...');
    seedDatabase();
});