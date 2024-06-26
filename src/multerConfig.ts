// multerConfig.ts

import multer from 'multer';
import path from 'path';

// Multer disk storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    // File renaming logic (if needed)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter for validating file types
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === 'application/pdf') {
    // Example: Only allow PDF files
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only PDF files are allowed'), false); // Reject the file
  }
};

// Initialize Multer with configured options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
