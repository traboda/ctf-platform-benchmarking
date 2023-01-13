const {test_case, type, navigate} = require("../utils");
const faker = require('@faker-js/faker').faker;
const baseURL = require('./config.json').baseURL;

const ArenaTest = async (iterations) => {
    await test_case(async (page,) => {
        await navigate(page, `${baseURL}/register/`)
        await page.waitForSelector(`#auth-section-wrapper`);
        const formID = 'basic-registration-form'
        await page.waitForSelector(`#${formID}`);
        await type(page, `#${formID} input[aria-label="Name"]`, faker.name.firstName());
        await type(page, `#${formID} input[aria-label="E-mail"]`, faker.internet.email());
        await type(page, `#${formID} input[aria-label="Password"]`, faker.internet.password());
        await page.click(`button[type="submit"]`);

        await page.waitForSelector(`#team-registration-type-picker`);
        await page.click(`#team-registration-type-picker > div > div > div > div:nth-child(1) > span > button`);

        // await page.waitForSelector(`#registration-profile-form-section`);
        // await type(page, `#registration-profile-form input[aria-label="School / College Name"]`, faker.address.street());
        // await page.click(`#registration-profile-form button[type="submit"]`);
        await type(page, `#signup-team-creator-form input[aria-label="Team Name"]`, faker.name.firstName());
        await page.click(`#signup-team-creator-form button[type="submit"]`);
        await page.waitForNavigation();
        await page.waitForSelector(`#dashboard-my-progress-card`);

        await navigate(page, `${baseURL}/challenges/`);
        await page.waitForSelector(`#__next > div > div:nth-child(2) > main > div > div > div.md\\:w-3\\/4.p-1 > div:nth-child(2) > div:nth-child(1)`);
        await page.click(`#__next > div > div:nth-child(2) > main > div > div > div.md\\:w-3\\/4.p-1 > div:nth-child(2) > div:nth-child(1) > a`);
        await page.waitForNavigation();
        // await page.type(`form input`, "flag{test_flag}");
        // await page.click(`form button`);

    }, iterations)
};

module.exports = ArenaTest;