LIGNX
Transforming Enterprise Goal Management with AI & Analytics
















Overview

ALIGNX is an AI-powered enterprise performance management platform designed to streamline employee goal tracking, managerial approvals, and organizational analytics through intelligent dashboards and real-time insights.

The platform enables:

Employees to create and manage quarterly goals
Managers to approve/reject submissions
Admins to monitor organization-wide analytics
AI-driven insights for smarter decision-making

ALIGNX transforms traditional performance tracking into a centralized, scalable, and enterprise-grade system.

Table of Contents
Overview
Features
Employee Module
Manager Dashboard
Admin Analytics Dashboard
AI Insights Engine
Tech Stack
System Workflow
Project Structure
Role-Based Access
Responsive Design
Problem Statement
Innovation Highlights
Installation & Setup
Deployment
Future Enhancements
Testing
Modules
Contributing
Acknowledgements
License
Features
Employee Module

Employees can:

Create quarterly goals
Define:
Goal Title
Description
Target
Weightage
Unit of Measurement
Validate total weightage
Submit goals for approval
Access responsive mobile-friendly forms
Why it matters

Helps employees align personal goals with organizational objectives efficiently.

Manager Dashboard

Managers can:

Review employee submissions
Approve / Reject goals
Access AI-powered insights
Filter and search employees
Export reports
Monitor department performance
Track approval workflows
Why it matters

Managers can make faster, data-driven decisions with centralized visibility.

Admin Analytics Dashboard

Admins can:

Monitor organization-wide analytics
View performance metrics
Analyze department trends
Track approval statistics
Monitor employee productivity
Access enterprise insights
Why it matters

Provides leadership-level visibility into organizational performance and risks.

AI Insights Engine

ALIGNX includes an intelligent insights engine capable of generating:

High pending approval alerts
Department performance analysis
Employee target achievement tracking
Risk identification
Performance trend monitoring
Smart managerial recommendations
Tech Stack
Layer	Technologies
Frontend	Next.js 16, React, TypeScript, Tailwind CSS
Backend	Next.js API Routes, Prisma ORM
Database	Supabase PostgreSQL
Deployment	Vercel
Charts & Analytics	Recharts
System Workflow
Employee Goal Submission
        ↓
Supabase PostgreSQL Database
        ↓
Manager Approval Dashboard
        ↓
Admin Analytics Dashboard
        ↓
AI Insights & Reports
Project Structure
src/
│
├── app/
│   ├── login/
│   ├── employee/
│   ├── manager/
│   ├── admin/
│   └── api/
│
├── lib/
│   └── prisma.ts
│
├── prisma/
│   └── schema.prisma
│
└── components/
Role-Based Access
Role	Responsibilities
Employee	Create and submit goals
Manager	Review and approve/reject goals
Admin	Monitor analytics and organizational insights
Responsive Design

ALIGNX is optimized for:

Desktop Devices
Tablets
Mobile Devices

The platform uses responsive layouts and scalable UI components for seamless cross-device usability.

Problem Statement

Organizations often struggle with:

Manual goal tracking
Delayed approvals
Lack of centralized analytics
Poor visibility into employee performance
Inefficient reporting systems

ALIGNX solves these challenges through intelligent automation and enterprise-grade dashboards.

Innovation Highlights
AI-powered insights engine
Enterprise dashboard architecture
Real-time analytics visualization
Role-based workflow system
Scalable backend architecture
Modern UI/UX principles
Responsive enterprise design
Installation & Setup
1. Clone Repository
git clone https://github.com/Garidepallisahithi/alignx.git
2. Navigate to Project
cd alignx
3. Install Dependencies
npm install
4. Configure Environment Variables

Create a .env file:

DATABASE_URL=your_supabase_database_url
5. Generate Prisma Client
npx prisma generate
6. Push Database Schema
npx prisma db push
7. Run Development Server
npm run dev
Deployment

ALIGNX is deployed using:

Vercel
Supabase PostgreSQL
Future Enhancements
AI recommendation engine
KPI forecasting
Email notifications
Team collaboration features
Performance prediction models
Testing

The application has been tested for:

Goal submission workflow
Dashboard rendering
Database integration
Responsive UI behavior
API communication
Role-based navigation
Modules
Employee Goal Sheet
Goal creation and submission
Manager Dashboard
Goal approvals and AI insights
Admin Dashboard
Analytics and organizational reporting
Contributing

Contributions are welcome.

To contribute:

Fork the repository
Create a feature branch
Commit your changes
Push the branch
Open a Pull Request
Acknowledgements
Next.js
React
Prisma
Supabase
Vercel
Tailwind CSS
Recharts
License

This project is developed for educational and hackathon demonstration purposes.

ALIGNX
Enterprise Goal Management & Performance Intelligence Platform
