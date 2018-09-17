const ImgurStorage = require('multer-storage-imgur');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif')
        cb(null, true);
    else
        cb(new Error("message: this is not image"), false)
};


const storage = ImgurStorage({ clientId: 'c70da3e66ae2bf6' });

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;