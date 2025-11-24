# Academic Website

This repository contains source code of [academic website](https://jiaqi-zhang.space/) using Jekyll as a static website generator. Feel free to clone this code for your personal use!

**For more detailed information and the latest updates, please refer to the [original GitHub project](https://github.com/Jiaqi-zhang/Jiaqi-zhang.github.io).**


<!-- PREREQUISITES -->

## Prerequisites

* [Node.js](https://nodejs.org/en/download) (version 24.11.1)
* [Vite](https://cn.vite.dev/guide/) (version 7.2.4)


<!-- USAGE -->

## Usage


**1. Install dependencies and start the development server**


```
# Pull the Node.js Docker image:
docker pull node:24-alpine

# Create a Node.js container and start a Shell session:
docker run -it --rm --publish 5173:5173 -v your_project_dir:/home/node --entrypoint sh node:24-alpine

# Into the project directory
cd /home/node

# Install project dependencies
npm install

# Install Vite
npm install -D vite

# Start the development server
npm run dev

```

The index.html will be served on http://localhost:5173.



**2. Customize personal information**

When opening the code from an IDE, you should see a structure like this:

```
.
├── dist/            ⭐ Production build (recommended for direct use)
│   ├── index.html   → Open this file in browser to preview the website
│   ├── assets/      → Packaged CSS, JS and other resource files
│   └── ...
├── src/             📝 Source code directory (for development and modification)
│   ├── components/  → React components
│   ├── App.tsx      → Main application component
│   ├── Main.tsx     → Entry file
│   └── ...
├── package.json     📦 Project dependency configuration
├── README.md        📖 Project documentation
└── ...
```


**3. Deployment**

**3.1 Configure GitHub Pages**

```
Settings->Pages->Build and deployment
    ->Source: Deploy from a branch
    ->Branch: gh-pages / (root)
    ->Save
```

**3.2 Deploy to GitHub Pages**

```
apk add git
git config --global user.email "zhangjiaqi79@126.com"
git config --global user.name "Jiaqi-Zhang"

apk add openssh
ssh-keygen -t rsa -b 4096 -C "zhangjiaqi79@126.com"

git remote -v
git remote remove origin
git remote add origin git@github.com:Jiaqi-zhang/Jiaqi-zhang.github.io.git

git add .
git commit -m "Update Vite config and package.json for deployment"
git push origin main

npm run deploy
```
