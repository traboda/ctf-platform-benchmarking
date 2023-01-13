const navigate = async (page, url) => {
    await page.goto(url);
    await page.waitForSelector("body");
}

module.exports = navigate;