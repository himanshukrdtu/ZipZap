import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'cars', 
      format: async (req, file) => 'png',  
      allowedFormats: ['jpg', 'png', 'jpeg'],  
      public_id: (req, file) => file.originalname.split('.')[0],  
    },
  });

const upload = multer({ storage });

export default upload;
