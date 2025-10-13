const DEFAULTS = { enabled: true, space: 2 };
const AREA = "local";

class JsonFmtError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = "JsonFmtError";
    }
}

if (
    document.contentType.includes("application/json") ||
    document.contentType.includes("text/json")
) {
    const pre = document.querySelector("pre");

    if (pre === null) {
        throw new JsonFmtError("No <pre> element found");
    }

    if (pre.textContent === "") {
        throw new JsonFmtError("Empty <pre> element");
    }

    let parsed;
    try {
        parsed = JSON.parse(pre.textContent);
    }
    catch (error) {
        throw new JsonFmtError(error);
    }

    chrome.storage[AREA].get(DEFAULTS).then(({ enabled, space }) => {
        const unformatted = pre.textContent;
        const formatted = JSON.stringify(parsed, null, space);

        let isFormatted = false;

        if (enabled) {
            pre.textContent = formatted;
            isFormatted = true;
        }

        document.addEventListener("keydown", event => {
            if (
                event.key === "f"
                && !event.shiftKey
                && !event.ctrlKey
                && !event.altKey
                && !event.metaKey
                && !event.repeat
            ) {
                pre.textContent = isFormatted ? unformatted : formatted;
                isFormatted = !isFormatted;
            }
        });
    });
}
