# StayEase - Vacation Rental Platform

StayEase is a full-stack web application built with Node.js, Express, MongoDB, and EJS templating. It's a vacation rental platform where users can browse, create, and manage property listings, as well as leave reviews.

#### Demo Availabel on: https://stayease-9sga.onrender.com/

## 🏗️ Project Architecture

### Core Technologies
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with local strategy
- **Template Engine**: EJS (Embedded JavaScript)
- **File Upload**: Multer for image handling
- **Validation**: Joi for data validation
- **Styling**: Bootstrap 5 with custom CSS

### Project Structure
```
StayEase/
├── app.js                 # Main server file
├── routes/               # Route definitions
│   ├── listing.js        # Property listing routes
│   ├── review.js         # Review routes
│   └── user.js           # User authentication routes
├── controllers/          # Business logic
│   ├── listings.js       # Listing CRUD operations
│   ├── reviews.js        # Review management
│   └── users.js          # User authentication logic
├── models/               # Database schemas
│   ├── listing.js        # Property listing model
│   ├── review.js         # Review model
│   └── user.js           # User model
├── middleware.js         # Custom middleware functions
├── schema.js             # Joi validation schemas
├── utils/                # Utility functions
│   ├── ExpressError.js   # Custom error class
│   └── wrapAsync.js      # Async error wrapper
├── views/                # EJS templates
├── public/               # Static assets
├── uploads/              # Uploaded images
└── init/                 # Database initialization
    ├── index.js          # Database connection and setup
    └── data.js           # Initial sample data for listings
```

## 🚀 Features

### User Management
- User registration and login with Passport.js
- Session management with MongoDB store
- Password hashing and authentication
- User authorization for protected routes

### Property Listings
- Create, read, update, and delete property listings
- Image upload functionality with Multer
- Property details including title, description, price, location
- Owner-based authorization (only owners can edit/delete their listings)

### Review System
- Star rating system (1-5 stars)
- Comment-based reviews
- User authorization (only logged-in users can post reviews)
- Review deletion (only review authors can delete their reviews)

### Security Features
- Input validation using Joi schemas
- XSS protection through proper data sanitization
- CSRF protection through proper form handling
- Secure session management

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Atlas Connection String
ATLAS_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name?retryWrites=true&w=majority

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Session Secret
SECRET=your_session_secret_key

# Node Environment
NODE_ENV=development
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StayEase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` file with your configuration
   - Add your MongoDB Atlas connection string
   - Configure Cloudinary credentials (optional)

4. **Initialize the database** (optional)
   ```bash
   node init/index.js
   ```
   This will populate your database with sample listing data from `init/data.js`

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## 📊 API Endpoints

### Authentication Routes
- `GET /signup` - Display signup form
- `POST /signup` - Create new user account
- `GET /login` - Display login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listing Routes
- `GET /listings` - Display all listings
- `GET /listings/new` - Display new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - Display specific listing
- `GET /listings/:id/edit` - Display edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Review Routes
- `POST /listings/:id/reviews` - Create new review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🔧 Key Components

### Database Models

**User Model** (`models/user.js`)
- Email (unique, required)
- Username (handled by Passport-Local-Mongoose)
- Password (hashed automatically)

**Listing Model** (`models/listing.js`)
- Title, description, price, location, country
- Image (URL and filename)
- Owner reference (User)
- Reviews array (Review references)
- Cascade delete for reviews when listing is deleted

**Review Model** (`models/review.js`)
- Comment and rating (1-5 stars)
- Author reference (User)
- Creation timestamp

### Middleware Functions

**Authentication & Authorization**
- `isLoggedIn` - Check if user is authenticated
- `isOwner` - Verify listing ownership
- `isReviewAuthor` - Verify review ownership

**Validation**
- `validateListing` - Validate listing data with Joi
- `validateReview` - Validate review data with Joi

**Utility**
- `saveRedirectUrl` - Save original URL for post-login redirect
- `wrapAsync` - Error handling wrapper for async functions

### Error Handling
- Custom `ExpressError` class for structured error responses
- Global error handler with development/production modes
- Flash messages for user feedback
- Proper HTTP status codes

## 🎨 Frontend Features

### Responsive Design
- Bootstrap 5 framework for responsive layouts
- Mobile-first approach
- Custom CSS for enhanced styling

### Interactive Elements
- Star rating system with JavaScript
- Dynamic form validation
- Flash message notifications
- Modal dialogs for confirmations

### User Experience
- Intuitive navigation
- Clean and modern UI
- Loading states and feedback
- Responsive image handling

## 🔒 Security Considerations

### Data Validation
- Server-side validation with Joi schemas
- Input sanitization
- File type and size restrictions

### Authentication
- Secure password hashing
- Session-based authentication
- Protected route middleware

### File Upload Security
- File type validation
- File size limits
- Secure file storage

## 🚀 Deployment

### Production Considerations
- Set `NODE_ENV=production`
- Use environment variables for sensitive data
- Enable HTTPS in production
- Configure proper CORS settings
- Set up proper logging

### Recommended Hosting
- **Backend**: Heroku, Railway, or DigitalOcean
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary or AWS S3
- **Frontend**: Same as backend (monolithic app)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Aryan Neupane**
- GitHub: [@aryanneupane](https://github.com/aryanneupane)

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MongoDB team for the robust database solution
- Bootstrap team for the responsive CSS framework
- Passport.js team for authentication solutions

---

**StayEase** - Making vacation rentals simple and accessible! 🏠✨
