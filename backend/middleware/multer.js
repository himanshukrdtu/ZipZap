import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

 
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',                               
    allowedFormats: ['jpg', 'jpeg', 'png'],           
    format: async (req, file) => file.mimetype.split('/')[1],
    public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
  }
});

 
const upload = multer({ storage }).single('images');

export default upload;
