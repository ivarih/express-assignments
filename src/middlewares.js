import multer from 'multer';
import sharp from 'sharp';

const upload = multer({ dest: 'uploads/' });

const createThumbnail = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }

    const thumbnailPath = `${req.file.path}_thumb.png`;

    try {
        await sharp(req.file.path)
            .resize(160, 160)
            .png()
            .toFile(thumbnailPath);
        next();
    } catch (err) {
        console.error('Error creating thumbnail:', err);
        next(err);
    }
};

export { upload, createThumbnail };

