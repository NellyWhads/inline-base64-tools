chrome.runtime.onInstalled.addListener(function () {
    const parentGroupID = chrome.contextMenus.create({ // Parent Group
        "id": "parentGroup",
        "title": chrome.i18n.getMessage("extensionName"),
        "contexts": ["selection"],
    });

    const decodeID = chrome.contextMenus.create({ // Base64 Decode Selection
        "id": "decodeBase64",
        "parentId": parentGroupID,
        "title": chrome.i18n.getMessage("decode"),
        "contexts": ["selection"],
    });

    const encodeID = chrome.contextMenus.create({ // Base64 Encode Selection
        "id": "encodeBase64",
        "parentId": parentGroupID,
        "title": chrome.i18n.getMessage("encode"),
        "contexts": ["selection"],
    });

    chrome.storage.local.get(["copyToClipboard", "decodeOnSelect"], function (result) {
        const copyID = chrome.contextMenus.create({ // Copy resulting string to clipboard
            "id": "copyToClipboard",
            "parentId": parentGroupID,
            "type": "checkbox",
            "checked": result.copyToClipboard,
            "title": chrome.i18n.getMessage("copyToClipboard"),
            "contexts": ["selection"],
        });

        const decodeOnSelectID = chrome.contextMenus.create({ // Copy resulting string to clipboard
            "id": "decodeOnSelect",
            "parentId": parentGroupID,
            "type": "checkbox",
            "checked": result.decodeOnSelect,
            "title": chrome.i18n.getMessage("decodeOnSelect"),
            "contexts": ["selection"],
        });
	});
});
