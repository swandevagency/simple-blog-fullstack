const fileSize = (error) => {
    if (error.code == 'LIMIT_FILE_SIZE') {
        error.message = 'File Size is too large. Allowed file size is 1MB';
        error.success = false;
    }
    return res.status(500).json(error);
}

const fileExist = (req) => {
    if (!req.file) {
        res.status(500);
        res.json('file not found');
    }
}

module.exports = {
    fileSize,
    fileExist
}