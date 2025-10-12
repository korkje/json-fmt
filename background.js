const DEFAULTS = { enabled: true, space: 2 };

const buildMenu = async () => {
    const settings = await chrome.storage.sync.get(DEFAULTS);
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
        checked: settings.enabled,
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
        id: "json-fmt.space.2",
        title: `2 spaces`,
        type: "radio",
        checked: settings.space === 2,
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.space.4",
        title: `4 spaces`,
        type: "radio",
        checked: settings.space === 4,
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        parentId: parent,
        id: "json-fmt.space.tab",
        title: `Tabs`,
        type: "radio",
        checked: settings.space === "\t",
        contexts: ["all"],
    });
};

chrome.runtime.onInstalled.addListener(buildMenu);

chrome.storage.onChanged.addListener(changes => {
    if (Object.keys(changes).some(key => key in DEFAULTS)) {
        buildMenu();
    }
});

chrome.contextMenus.onClicked.addListener(async info => {
    const settings = await chrome.storage.sync.get(DEFAULTS);

    switch (info.menuItemId) {
        case "json-fmt.enabled":
            await chrome.storage.sync.set({ enabled: !settings.enabled });
            break;

        case "json-fmt.space.2":
            await chrome.storage.sync.set({ space: 2 });
            break;

        case "json-fmt.space.4":
            await chrome.storage.sync.set({ space: 4 });
            break;

        case "json-fmt.space.tab":
            await chrome.storage.sync.set({ space: "\t" });
            break;
    }
});
