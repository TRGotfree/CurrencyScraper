const pathToFile = process.env.PATH_TO_FILE_REPO;
const fs = require("fs");
const promisify = require("util").promisify;
const fileWriter = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const fileReader = promisify(fs.readFile);
const deleteFile = promisify(fs.unlink);

class FileRepository {

    async save(key, value) {
        try {
            const fileName = `${key}.json`;
            const pathToFileRepo = `${pathToFile}/${fileName}`;

            const dataToSave = { value, date: new Date().toLocaleDateString() };
            await appendFile(pathToFileRepo, JSON.stringify(dataToSave), "utf8");
        } catch (error) {
            throw error;
        }
    }

    async get(key) {
        try {

            const fileName = `${key}.json`;
            const pathToFileRepo = `${pathToFile}/${fileName}`;

            await fileReader(pathToFileRepo, "utf8");

        } catch (error) {
            throw error;
        }
    }

    async delete(key) {
        try {
            const fileName = `${key}.json`;
            const pathToFileRepo = `${pathToFile}/${fileName}`;

            await deleteFile(pathToFileRepo);

        } catch (error) {
            throw error;
        }
    }

    async update(key, value) {
        try {

            const fileName = `${key}.json`;
            const pathToFileRepo = `${pathToFile}/${fileName}`;

            await fileWriter(pathToFileRepo, JSON.stringify({ value, date: new Date().toLocaleDateString() }), "utf8");

        } catch (error) {
            throw error;
        }
    }
}

module.exports = FileRepository;