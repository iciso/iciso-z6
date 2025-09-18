# ICISO Volunteer Matching Platform

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rafiques-projects-6025b9a4/v0-volunteer-matching-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/oDsSaLYlrQO)

## 🕌 About ICISO

The Islamic Center for Islamic Studies and Outreach (ICISO) volunteer matching platform connects Muslim volunteers with meaningful opportunities to serve the community. This platform facilitates matching volunteers with organizations across various Islamic focus areas including Quranic Studies, Dawah, Islamic Education, and Islamophobia awareness.

## 🚀 Features

- **Guided Search**: Step-by-step opportunity discovery by location, focus area, and duration
- **Organization Profiles**: Detailed information about Islamic organizations and their missions  
- **Application Management**: Comprehensive system to track and manage volunteer applications
- **Admin Dashboard**: Real-time monitoring of applications and organizational insights
- **Multi-Region Support**: Opportunities across Americas and MENA regions

## 📊 Application Management System

### Admin Dashboard
Access the admin dashboard at: `http://localhost:3000/admin`

Features:
- Real-time application statistics
- Filter by status, name, organization, or focus area
- Detailed application cards with all submitted information
- Export functionality for reports

### Command Line Tools

View applications in terminal:
\`\`\`bash
npm run view-applications
\`\`\`

Export applications to CSV:
\`\`\`bash
npm run export-applications
\`\`\`

### Data Storage
- Applications stored in `data/applications.json`
- Automatic backup and export capabilities
- All applications logged with timestamps and unique IDs
- Contact: icisoi.club@gmail.com

## 🛠 Development

### Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# View applications
npm run view-applications

# Export applications
npm run export-applications
\`\`\`

### Project Structure

\`\`\`
├── app/
│   ├── admin/           # Admin dashboard
│   ├── api/applications/ # Application API endpoints
│   └── page.tsx         # Main platform page
├── components/
│   ├── ui/              # Reusable UI components
│   ├── guided-search.tsx # Step-by-step search
│   ├── organization-card.tsx # Organization display
│   └── calendar-selection.tsx # Date selection
├── data/
│   └── applications.json # Application database
├── scripts/
│   ├── view-applications.js # CLI application viewer
│   └── export-applications.js # CSV export tool
└── lib/
    └── data.ts          # Organization and opportunity data
\`\`\`

## 🌐 Deployment

Your project is live at:
**[https://vercel.com/rafiques-projects-6025b9a4/v0-volunteer-matching-app](https://vercel.com/rafiques-projects-6025b9a4/v0-volunteer-matching-app)**

Continue building your app on:
**[https://v0.app/chat/projects/oDsSaLYlrQO](https://v0.app/chat/projects/oDsSaLYlrQO)**

## 📧 Contact

All applications are automatically logged and can be exported for review. For technical support or application management, contact: icisoi.club@gmail.com

---

*Alhamdulillah for the opportunity to serve the Muslim community through technology.*

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
