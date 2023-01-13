const {test_case, type} = require("../utils");
const faker = require('@faker-js/faker').faker;
const baseURL = require('./config.json').baseURL;

(async () => {
    await test_case(async (page,) => {
        await page.goto(`${baseURL}/register`);
        await page.waitForSelector("body");
        await type(page, `#name`, faker.name.firstName());
        await type(page, `#email`, faker.internet.email());
        await type(page, `#password`, faker.internet.password());
        await page.click(`#_submit`);
        await page.waitForNavigation();
        await page.waitForSelector("body");
        await page.goto(`${baseURL}/teams/new`);
        await page.waitForSelector("body");
        await type(page, `#name`, faker.name.firstName());
        await type(page, `#password`, faker.internet.password());
        await page.click(`#_submit`);
        await page.waitForNavigation();

        await page.waitForSelector(`#challenge-window`);
    }, 5);
})();