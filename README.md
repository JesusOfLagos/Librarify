# Librarify

Librarify is a web application that allows users to create anonymous messages (memos) and share them with others without revealing their identity. Users can express themselves freely and honestly, making it ideal for sending feedback, sharing secrets, or leaving anonymous notes.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
<!-- 
## Demo

You can try out the live demo of Anony-Memo at [https://your-demo-url.com](https://your-demo-url.com). -->

## Features

- Create and post anonymous messages (memos).
- View and read anonymous messages without user identification.
- Real-time updates for new messages.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary (for image storage and management)
- JWT (JSON Web Tokens) for authentication
- Jest (for tests)
- Socket.IO (for real-time updates)
- WebRTC (for real-time video chats)

## Installation

To run Librarify locally, follow these steps:

## 1. Clone the repository:

```bash
git clone https://github.com/JesusOfLagos/Librarify.git
cd Librarify
```



## 2. Install the necessary dependencies:

```bash
npm install

```

## 3. Add your .env file:

```bash

MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key

```

## 4. Start The Server:

```bash
npm start

```


## 5. Test On Postman:

```bash
https://www.postman.com/crimson-meteor-951955/workspace/Librarify

```

-- Still working on the tests, you can ignore the test folder for now.
