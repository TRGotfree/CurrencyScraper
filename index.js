const sitesMetaDataDirectory = process.env.PATH_TO_SITE_DATA;
const logger = require("./logger/winston_logger").logger;
const InMemoryRepository = require("./repository/inMemoryRepository");
const FileRepository = require("./repository/fileRepository");
const DataBaseRepository = require("./repository/dataBaseRepository");
const SiteDataProvider = require("./core/siteDataProvider");
const Scrapper = require("./core/scrapper");

const inMemoryRepository = new InMemoryRepository();
//const fileRepository = new FileRepository();
//const dataBaseRepository = new DataBaseRepository();
const siteDataProvider = new SiteDataProvider(sitesMetaDataDirectory);
const scrapper = new Scrapper();

const runScrapper = async () => {
    try {

        const sitesData = await siteDataProvider.getAllSitesData();
        sitesData.forEach(async data => {
            const scrappedData = await scrapper.scrap(data);
            inMemoryRepository.save(data.name, scrappedData);
        });

    } catch (error) {
        logger.error(error);
    }
};

runScrapper();