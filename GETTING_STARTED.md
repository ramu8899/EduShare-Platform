# 🚀 Getting Started in 5 Minutes

## Step 1: Install Node.js
Download and install from [nodejs.org](https://nodejs.org/) if not already installed.

Verify:
```bash
node --version
npm --version
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Set Up Cloudinary
1. Go to [cloudinary.com/users/register/free](https://cloudinary.com/users/register/free) and create a free account
2. Go to your [Dashboard](https://cloudinary.com/console)
3. Copy your **Cloud Name**, **API Key**, and **API Secret**

## Step 4: Create `.env` File
Create a file named `.env` in the root folder with:

```env
PORT=5000
CLOUDINARY_CLOUD_NAME=paste_your_cloud_name
CLOUDINARY_API_KEY=paste_your_api_key
CLOUDINARY_API_SECRET=paste_your_api_secret
```

**Tip:** You can copy `tat .env.example` as a template!

## Step 5: Start the Server
```bash
npm start
```

You should see: `Server running on port 5000`

## Step 6: Open in Browser
Go to: **http://localhost:5000**

---

## 🎯 First Steps

1. **Sign Up** - Create an account
2. **Upload a Resource** - Go to the upload section
3. **Share** - Download and test the resource

## 📖 For More Details
See [README.md](README.md) for full documentation.

## ⚡ Development Mode
Want auto-restart when you make changes?
```bash
npm run dev
```

---

**Need help?** Check the Troubleshooting section in [README.md](README.md)
