"use strict";

const defaultURL = 'mastodon.social';

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        localInstanceURL: document.getElementById("localInstanceURL").value
    });
}

async function restoreOptions() {
    let values = await browser.storage.sync.get("localInstanceURL");
    document.getElementById("localInstanceURL").value = values.localInstanceURL || defaultURL;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);