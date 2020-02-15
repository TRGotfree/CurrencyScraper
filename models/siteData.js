class SiteData {
    constructor(name, url, htmlTags, 
        waitForObject, typedInTextField, 
        clickedObject, evaluatedTag) {
        this.name = name;
        this.url = url;
        this.htmlTags = htmlTags;
        this.waitForObject = waitForObject;
        this.typedInTextField = typedInTextField;
        this.clickedObject = clickedObject;
        this.evaluatedTag = evaluatedTag;
    }
}

module.exports = SiteData;