import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/images");
    },
    filename: function (req, file, cb) {
        const generateRandomId = uuid();
        const fileName = file.originalname
            .toLowerCase()
            .split(' ')
            .join('-');
        cb(null, `${generateRandomId}-${fileName}`)
    }
});

const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/svg"];

export const uploadImage = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("image extensions not allowed, allowed extensions is .jpg, .jpeg, .png, .svg"));
        }
    }
});

