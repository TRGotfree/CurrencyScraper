const fs = require("fs");
const promisify = require("util").promisify;
const fileReader = promisify(fs.readFile);
const directoryReader = promisify(fs.readdir);
let dataDirectoryPath = "";

class SiteDataProvider {

    constructor(sitesDataDirectoryPath) {
        dataDirectoryPath = sitesDataDirectoryPath;
    }

    async getAllSitesData() {
        try {

            const files = await directoryReader(dataDirectoryPath);
            if (!files)
                throw new Error(`Files with sites data in certain directory ${dataDirectoryPath} not found!`);

            const sitesData = [];

            files.forEach(async file => {
                const fileData = await fileReader(file);
                sitesData.push(JSON.parse(fileData));
            });

            return sitesData;

        } catch (error) {
            throw error;
        }
    }

    async getSiteData(siteName) {
        try {

            const fileData = await fileReader(`${__dirname}\\..\\${siteName}.json`);

            if (!fileData)
                throw new Error(`SiteData from file: ${siteName} is not readed!`);

            return JSON.parse(fileData);

        } catch (error) {
            throw error;
        }
    }

}