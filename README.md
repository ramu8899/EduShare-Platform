# CampusSaathi - Academic Resource Sharing Platform

A web application for sharing academic resources such as notes, tutorials, and reference materials. Users can upload, categorize, search, and rate resources within the campus community.

## 📋 Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [User Flow](#user-flow)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- 📤 **Upload Resources** - Upload academic materials with categorization by subject and topic
- 🔍 **Smart Search** - Find resources by title, subject, or topic
- ⭐ **Rating System** - Rate resources and view rankings based on ratings and usage
- 🔐 **User Authentication** - Secure login with email and password (8+ characters minimum)
- 📊 **Usage Tracking** - Track downloads and resource popularity
- ☁️ **Cloud Storage** - Reliable file hosting on Cloudinary

## 📚 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **File Storage**: Cloudinary CDN
- **Data Storage**: Local JSON files
- **Authentication**: bcryptjs (password hashing)

## 🔧 Prerequisites

Before you start, make sure you have the following installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Git** (optional, for cloning)
4. **A Cloudinary Account** (free tier works) - [Sign up here](https://cloudinary.com/users/register/free)

To check if Node.js is installed, run:
```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Extract the Project
Extract the zip file to your desired location:
```bash
unzip CampusSaathi.zip
cd CampusSaathi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with the following content:
```
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**For Cloudinary credentials:**
1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy your **Cloud Name**, **API Key**, and **API Secret**
3. Paste them into the `.env` file

### 4. Start the Server
```bash
npm start
```

The server will start on **http://localhost:5000**

### 5. Open in Browser
Open your web browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
CampusSaathi/
├── public/                 # Frontend files (HTML, CSS, JS)
│   ├── index.html         # Main HTML page
│   ├── app.js             # Frontend JavaScript logic
│   └── styles.css         # Styling
├── routes/                # API routes
│   ├── resources.js       # Resource endpoints
│   └── users.js           # User endpoints
├── models/                # Data models
│   └── Resource.js        # Resource data model
├── data/                  # JSON data storage
│   ├── resources.json     # Resource metadata
│   └── users.json         # User accounts
├── uploads/               # Temporary upload folder
├── server.js              # Main server file
├── package.json           # Dependencies
└── .env                   # Configuration (keep secret!)
```

## ⚙️ Configuration

### `.env` File Example

```env
# Server Port
PORT=5000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**⚠️ Important**: Never commit `.env` to version control. It contains sensitive credentials.

## 🏃 Running the Project

### Development Mode (with auto-reload)
```bash
npm run dev
```
This uses `nodemon` to automatically restart the server when files change.

### Production Mode
```bash
npm start
```

### Accessing the Application
- **Frontend**: http://localhost:5000/
- **API Base**: http://localhost:5000/api

## 🔌 API Endpoints

### Resources
- `GET /api/resources` - Get all resources
  - Query params: `?search=keyword&subject=Math&topic=Calculus`
- `POST /api/resources` - Upload a new resource (requires authentication)
- `GET /api/resources/:id` - Get a specific resource
- `POST /api/resources/:id/rate` - Rate a resource

### Users
- `POST /api/users/signup` - Create a new account
- `POST /api/users/login` - Login to account
- `POST /api/users/logout` - Logout

## 👥 User Flow

1. **First Time?** Create an account by signing up with email and password
2. **Login** with your credentials (minimum 8 characters for password)
3. **Upload** academic resources by filling in:
   - Resource title
   - Subject area
   - Topic
   - Description
   - File attachment
4. **Search & Browse** - Find resources shared by others
5. **Rate & Download** - Rate useful resources and download them
6. **Track Usage** - See your resource's download count

### Access Levels
- **Public**: Anyone can view and download resources without login
- **Upload**: Must be logged in to upload new resources
- **Delete**: Only the uploader can delete their own resources

## 🐛 Troubleshooting

### "Cannot find module" Error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

### Port Already in Use
Change the PORT in `.env`:
```env
PORT=5001  # Or any available port
```

### Cloudinary Errors
- Verify your credentials are correct in `.env`
- Check that your Cloudinary account is active
- Test the credentials in the Cloudinary dashboard

### "Cannot POST /api/resources"
- Make sure the server is running
- Check that you're using the correct API endpoint
- Verify you're sending the correct data format

### Database/JSON Files Not Found
The app will automatically create `data/resources.json` and `data/users.json` on first run.

## 📞 Support

If you encounter issues:
1. Check this troubleshooting section
2. Verify all prerequisites are installed
3. Review the `.env` configuration
4. Check browser console (F12) for frontend errors
5. Check terminal for backend errors

## 📝 Notes

- User data (passwords are hashed) is stored locally in `data/users.json`
- Resource files are hosted on Cloudinary for reliability
- The application uses session-based authentication
- Make sure to never share your `.env` file publicly

---

Happy resource sharing! 🎓
- `PUT /api/resources/:id/rate` - Rate a resource
- `GET /api/resources/:id/download` - Download a resource