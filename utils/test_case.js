const puppeteer = require("puppeteer");

const test_case = async (func, iterations = 1) => {
    const headless = process.argv.includes('--headless');
    const browser = await puppeteer.launch({
        headless,
        defaultViewport: null,
        args: ['--start-maximized']
    })
    const start = new Date().getTime();
    const iteration_durations = [];
    for (let i = 0; i < iterations; i++) {
        const iteration_start = new Date().getTime();
        const page = await browser.newPage();
        await func(page, browser);
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await page.close();
        const iteration_duration = new Date().getTime() - iteration_start;
        iteration_durations.push(iteration_duration);
        console.log(`Iteration ${i + 1} took ${iteration_duration/1000}s`);
    }
    const duration = new Date().getTime() - start;
    console.log(`Total duration for ${iterations} iterations: ${duration/1000}s`);
    console.log(`Duration per iteration (gross): ${(duration / iterations)/1000}ms`);
    console.log(`Duration per iteration (avg): ${(iteration_durations.reduce((a, b) => a + b, 0) / iterations)/1000}s`);
    await browser.close();
}

module.exports = test_case;