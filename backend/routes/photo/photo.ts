import express from "express";
import auth, {RequestWithUser} from "../../middleware/auth";
import permit from "../../middleware/permit";
import {imagesUpload} from "../../multer";
import Photo from "../../models/Photo/Photo";

const photoRouter = express.Router();

photoRouter.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching photos' });
    }
});


photoRouter.get('/:id', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
            return;
        }
        res.json(photo);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching this photo' });
    }
});


photoRouter.post('/add', auth, imagesUpload.single('image'), async (req, res) => {
    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if (!user) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
    }

    try {
        const { title } = req.body;

        const newPhoto = new Photo({
            user: user._id,
            image: req.file ? '/images/' + req.file.filename : null,
            title,
        });

        await newPhoto.save();
        res.status(201).json({ message: 'Photo created successfully', photo: newPhoto });
    } catch (error) {
        res.status(500).json({ error: 'Error creating photo' });
    }
});


photoRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);
        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
            return;
        }
        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting photo' });
    }
});
export default photoRouter;
