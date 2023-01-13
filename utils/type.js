const type = async (page, id, text) => {
    await page.waitForSelector(id)
    let element = await page.$(id)
    await element.click();
    await element.type(text);
}

module.exports = type;