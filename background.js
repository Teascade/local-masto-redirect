
"use strict";

/**
 * @param {string} details 
 */
async function onMessage(message, details, asd) {
    if (message === 'confirmed')
        browser.pageAction.show(details.tab.id);
    if (message === 'move')
        move(details.tab);
}

async function move(tab) {
    const localInstanceURL = (await browser.storage.sync.get("localInstanceURL")).localInstanceURL
        || 'piipitin.fi';
    let status = {};
    try {
        let { statuses: [s] } = await (await fetch(`https://${localInstanceURL}/api/v2/search?q=${tab.url}&resolve=true&limit=5`)).json();
        status = s;
    } catch (e) {
        console.error('Failed to fetch data!');
        console.error(e);
        browser.pageAction.hide(tab.id)
        return;
    }
    const url = `https://${localInstanceURL}/web/statuses/${status.id}`;
    await browser.tabs.update({ url });
};

browser.pageAction.onClicked.addListener(async (tab) => {
    browser.pageAction.setPopup({ tabId: tab.id, popup: 'popup.html' });
    await browser.pageAction.openPopup();
    await move(tab);
})
browser.runtime.onMessage.addListener(onMessage);