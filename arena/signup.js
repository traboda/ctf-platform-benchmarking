const {test_case, type} = require("../utils");
const faker = require('@faker-js/faker').faker;
const baseURL = require('./config.json').baseURL;

(async () => {
    await test_case(async (page,) => {
        await page.goto(`${baseURL}/register/`);
        await page.waitForSelector("body");
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
        page.waitForNavigation();
        await page.waitForSelector(`#dashboard-my-progress-card`);
    }, 5);
})();