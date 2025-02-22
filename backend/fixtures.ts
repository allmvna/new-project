import mongoose from 'mongoose';
import config from "./config";
import User from "./models/User/User";
import {randomUUID} from "crypto";
import Photo from "./models/Photo/Photo";


const run = async () => {

    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('photos');
    } catch (e) {
        console.log("Collections does not exist, skipping drop...");
    }


    const [user, admin] = await User.create([
        {
            username: 'johndoe@gmail.com',
            password: '123',
            avatar: 'fixtures/user.jpg',
            role: 'user',
            token: randomUUID(),
            displayName: 'John Doe',
        },
        {
            username: 'admin@gmail.com',
            password: '456',
            avatar: 'fixtures/admin.jpg',
            role: 'admin',
            token: randomUUID(),
            displayName: 'Admin',
        },
    ]);


    const photos = await Photo.create([
        { user: user._id, title: 'Sunset View', photo: 'fixtures/sunset.jpg' },
        { user: user._id, title: 'Mountain Peak', photo: 'fixtures/mountain.webp' },
        { user: user._id, title: 'City Skyline', photo: 'fixtures/city.jpeg' },
        { user: user._id, title: 'Forest Path', photo: 'fixtures/forest-path.webp' },
        { user: user._id, title: 'Ocean Waves', photo: 'fixtures/ocean.jpg' },
        { user: admin._id, title: 'Desert Dunes', photo: 'fixtures/desert.jpg' },
        { user: admin._id, title: 'Northern Lights', photo: 'fixtures/northern.jpg' },
        { user: admin._id, title: 'Autumn Leaves', photo: 'fixtures/autumn-leaves.jpg' },
        { user: admin._id, title: 'Snowy Mountains', photo: 'fixtures/snowy-mountains.jpg' },
        { user: admin._id, title: 'Rainy Day', photo: 'fixtures/rainy-day.jpeg' },
    ]);

    console.log("Fixtures created successfully!");
    console.log("Users:", [user, admin]);
    console.log("Photos:", photos);

    await db.close();
};


run().catch(console.error);