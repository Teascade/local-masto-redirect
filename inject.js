
async function localInstanceInjection() {
    const hostname = location.hostname;
    console.log(browser.storage.sync.get("localInstanceURL"));
    const localInstanceURL = (await browser.storage.sync.get("localInstanceURL"))
        .localInstanceURL || 'mastodon.social';
    const masto = (document.getElementById('mastodon') ||
        document.getElementById('mastodon-svg-logo')) != null
    const pleroma = document.body.children?.[0]?.innerHTML?.includes('Pleroma');
    /** @type {string | null} */
    const misskey = document.querySelector('meta[name=application-name]')
        ?.content?.toLowerCase()?.endsWith('key');
    if ((misskey || masto || pleroma) && location.host != localInstanceURL) {
        browser.runtime.sendMessage('confirmed')

        const div = document.createElement('div')
        div.classList = 'detailed-status__button'

        const button = document.createElement('button')
        button.id = 'outside-instance-move-button'
        button.classList = 'icon-button';
        button.title = `Open in ${localInstanceURL}`;
        button.style = 'font-size: 18px;';
        button.textContent = `Open in ${localInstanceURL}`
        button.onclick = () => {
            const btn = document.getElementById('outside-instance-move-button');
            btn.disabled = true;
            btn.title = `Moving to ${localInstanceURL}, please wait!`
            btn.textContent = `Moving to ${localInstanceURL}, please wait!`;
            btn.onclick = null;
            browser.runtime.sendMessage('move')
        }

        div.appendChild(button)
        document.body.prepend(div)
    }
}

localInstanceInjection();