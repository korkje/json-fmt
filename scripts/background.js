const DEFAULTS = { enabled: true, space: 2 };
const AREA = "local";

const buildMenu = async () => {
    const { enabled, space } = await chrome.storage[AREA].get(DEFAULTS);
    await chrome.contextMenus.removeAll();

    const parent = chrome.contextMenus.create({
        id: "json-fmt",
        title: "json-fmt",
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.enabled",
        title: "Format on load",
        type: "checkbox",
        checked: enabled,
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.separator",
        type: "separator",
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.2-spaces",
        title: "2 spaces",
        type: "radio",
        checked: space === 2,
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.4-spaces",
        title: "4 spaces",
        type: "radio",
        checked: space === 4,
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.tabs",
        title: "Tabs",
        type: "radio",
        checked: space === "\t",
        contexts: ["all"],
    });
};

chrome.runtime.onInstalled.addListener(buildMenu);
chrome.runtime.onStartup.addListener(buildMenu);

chrome.storage.onChanged.addListener(changes => {
    if (Object.keys(changes).some(key => key in DEFAULTS)) {
        buildMenu();
    }
});

chrome.contextMenus.onClicked.addListener(async info => {
    switch (info.menuItemId) {
        case "json-fmt.enabled":
            const { enabled } = await chrome.storage[AREA].get(DEFAULTS);
            await chrome.storage[AREA].set({ enabled: !enabled });
            break;

        case "json-fmt.2-spaces":
            await chrome.storage[AREA].set({ space: 2 });
            break;

        case "json-fmt.4-spaces":
            await chrome.storage[AREA].set({ space: 4 });
            break;

        case "json-fmt.tabs":
            await chrome.storage[AREA].set({ space: "\t" });
            break;
    }
});
