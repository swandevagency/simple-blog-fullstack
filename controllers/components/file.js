const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '_' + file.originalname);
    }
});
const imageFileFilter = (req, file, cb) => {
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png, gif image files are allowed.'
        }, false);
    }
};
const uploadImage = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 }, fileFilter: imageFileFilter }).single('image')

module.exports={
    uploadImage,
    unlinkAsync
}