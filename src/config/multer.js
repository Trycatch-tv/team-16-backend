import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    }
});

const maxSize = 1024 * 1024 * 5
const fileFilter = function (req, file, cb) {
    const allowedFileExtensions = ['.jpg', '.png', '.jpeg', '.JPG', '.PNG', '.JPEG'];

    const fileExtension = file.originalname.split('.').pop();
    if (allowedFileExtensions.includes('.' + fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Just allow images with extension (jpg, png, jpeg).'), false);
    }

};

export const fileSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
      res.send({"message:":"Maximum size limit 5MB"})
    } else {
      next()
    }
  }

const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: fileFilter
});


export default upload;