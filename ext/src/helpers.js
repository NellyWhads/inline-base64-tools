function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    } catch (_) {
        return false;
    }
};

function isURL(str) {
    try {
        new URL(str)
        return true;
    } catch (_) {
        return false;
    }
};

function decodeBase64Recursively(str) {
    if (isBase64(atob(str))) {
        return decodeBase64Recursively(atob(str));
    }
    return atob(str);
};