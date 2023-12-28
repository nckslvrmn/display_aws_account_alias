function printAlias(menu) {
    alias = JSON.parse(document.head.querySelector("[name=awsc-session-data]").content).accountAlias;
    menu.innerHTML = `${menu.innerText}&nbsp;&nbsp<STRONG>${alias}</STRONG>`;
}

// shamelessly stolen from https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function run() {
    const elem = await waitForElm('[data-testid="awsc-nav-account-menu-button"]');
    printAlias(elem);
}
run();
