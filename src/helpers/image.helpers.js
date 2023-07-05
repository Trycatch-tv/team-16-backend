import * as fs from 'fs';
export const createUploadsFolder = () => {
    fs.access(`./uploads`, (err) => {
        if (err) {
            fs.mkdir(`./uploads`, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                } else {
                    console.log(`The folder uploads was created successfully.`);
                }
            });
        } else {
            console.log('Uploads folder already exists.');
        }
    });
}
export const checkFolderCreate = (folder) => {
    fs.access(`./uploads/${folder}`, (err) => {
        if (err) {
            // Crear la carpeta si no existe
            fs.mkdir(`./uploads/${folder}`, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                } else {
                    console.log(`The folder ${folder} was created successfully.`);
                }
            });
        } else {
            console.log(`${folder} folder already exists in upload directory`);
        }
    });
}

export const deleteImageStorage = (folder, name) => {
    fs.stat(`./uploads/${folder}/${name}`, (err) => {
        if (!err) {
            fs.unlink(`./uploads/${folder}/${name}`, (err) => {
                if (err) console.log("There is no image to delete");
            });
        }
    });
}