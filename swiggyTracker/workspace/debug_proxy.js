import fs from 'fs';

const targetUrl = 'https://www.swiggy.com/restaurants/mcdonalds-gandhi-bazaar-road-basavanagudi-bangalore-561';
const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl);

console.log("Fetching from proxy:", proxyUrl);

try {
    const response = await fetch(proxyUrl);
    const json = await response.json();

    if (json.contents) {
        const html = json.contents;
        console.log("HTML Length:", html.length);

        // Check for INITIAL_STATE
        // Swiggy might use window.__INITIAL_STATE__ or similar
        const match = html.match(/window\.___INITIAL_STATE__\s*=/);
        console.log("Found INITIAL_STATE?", !!match);

        fs.writeFileSync('proxy_response.html', html);
        console.log("Saved response to proxy_response.html");

        // Check for "Location Unserviceable" or other errors
        if (html.includes("Location Unserviceable")) {
            console.log("WARNING: Page contains 'Location Unserviceable'");
        }

        console.log("Start of HTML:", html.substring(0, 500));
    } else {
        console.log("No contents in proxy response");
    }
} catch (error) {
    console.error("Fetch failed:", error);
}
