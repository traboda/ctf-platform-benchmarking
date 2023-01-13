const {test_case, type, navigate} = require("../utils");
const faker = require('@faker-js/faker').faker;
const baseURL = require('./config.json').baseURL;


const CTFdTest = async (iterations) => {
    await test_case(async (page,) => {
        await navigate(page, `${baseURL}/register`);
        await type(page, `#name`, faker.name.firstName());
        await type(page, `#email`, faker.internet.email());
        await type(page, `#password`, faker.internet.password());
        await page.click(`#_submit`);
        // await page.waitForNavigation();

        await navigate(page, `${baseURL}/teams/new`);
        await type(page, `#name`, faker.name.firstName());
        await type(page, `#password`, faker.internet.password());
        await page.click(`#_submit`);
        await page.waitForNavigation();

        await page.waitForSelector(`#challenge-window`);

        await page.waitForSelector('button[value="5"]');
        await page.click('button[value="5"]');
        await page.waitForSelector(`#challenge-input`);
        await page.waitForSelector(`#challenge-submit`);
        // await type(page, `#challenge-input`, faker.lorem.word());
        // await page.click(`#challenge-submit`);

        await navigate(page, `${baseURL}/logout`);
        await page.waitForSelector(`body`);

    }, iterations);
}

module.exports = CTFdTest;