const Nightmare = require("nightmare");
const nightmare = Nightmare({show: false});
const cheerio = require("cheerio");
const SiteDataModel = require("../models/siteData");

class Scrapper {
    scrap(siteData) {
        return new Promise((resolve, reject) => {
            
            if (!siteData) {
                throw new Error("Input parameter \"siteData\" is required!");
            }

            try {

                if (!siteData.url)
                    throw new Error("\"url\" property of input object \"siteData\" is null or undefined!");

                if (!siteData.name)
                    throw new Error("\"name\" property of input object \"siteData\" is null or undefined!");

                if (!siteData.html_tags)
                    throw new Error("\"htmlTags\" property of input object \"siteData\" is null or undefined!");

                if (!siteData.waitForObject)
                    throw new Error("\"waitForObject\" property of input object \"siteData\" is null or undefined!");

                if (!siteData.evaluatedTag)
                    throw new Error("\"evaluatedTag\" property of input object \"siteData\" is null or undefined!");

                let response = nightmare.goto(siteData.url);
                if (siteData.typedInTextField)
                    response = response.type(siteData.typedInTextField.fieldTag, siteData.typedInTextField.typedText);

                if (siteData.clickedObject)
                    response = response.click(siteData.clickedObject);

                response.wait(siteData.waitForObject).evaluate((selector) => {
                    return document.querySelector(selector).innerHTML;
                }, siteData.evaluatedTag).end().then(res => {
                    //TO-DO: add parsing html
                    resolve(res);
                });

            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Scrapper;