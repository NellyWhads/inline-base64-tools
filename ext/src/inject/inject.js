window.onload = function () {
	toggleDecodeOnSelect();
}

chrome.storage.onChanged.addListener(function () {
	toggleDecodeOnSelect();
})

function toggleDecodeOnSelect() {
	chrome.storage.local.get(["decodeOnSelect"], function (result) {
		if (result.decodeOnSelect) {
			$(window).bind("mouseup", decodeBase64Selection);
		}
		else {
			$(window).unbind("mouseup");
		}
	});
}

function modifySelection(range, str) {
	if (isURL(str)) {
		// Create link node
		var node = document.createElement('a');
		var linkText = document.createTextNode(str);
		node.appendChild(linkText);
		node.href = str;
		node.style.textDecoration = "underline"
	}
	else {
		// Create text node
		node = document.createTextNode(str);
	}

	// Replace inline
	range.deleteContents();
	range.insertNode(node);
}

function copyToClipboard(value) {
	// Only copy if the feature is enabled
	chrome.storage.local.get(["copyToClipboard"], function (result) {
		if (result.copyToClipboard) {
			// Seems mighty jank to me ... but it works
			var temp = document.createElement("textarea");
			temp.style.display = "none"; // To avoid visual noise
			document.body.appendChild(temp);
			temp.value = value;

			temp.select();
			document.execCommand("copy");

			temp.remove();
		}
	});
}

function decodeBase64Selection() {
	const selection = document.getSelection();
	const selectionString = selection.toString();
	var decodedString = ""

	if (selectionString && isBase64(selectionString)) {
		decodedString = decodeBase64Recursively(selectionString);

		console.debug("selection: " + selectionString);
		console.debug("decoded: " + decodedString);
		modifySelection(selection.getRangeAt(0), decodedString);
		copyToClipboard(decodedString);
	}
}

function encodeBase64Selection() {
	const selection = document.getSelection();
	const selectionString = selection.toString();

	if (selectionString) {
		encodedString = btoa(selectionString);
		
		console.debug("selection: " + selectionString);
		console.debug("encoded: " + encodedString);
		modifySelection(selection.getRangeAt(0), encodedString);
		copyToClipboard(encodedString);
	}

}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
	if (message.invoke === "decodeBase64Selection") {
		decodeBase64Selection();
	}
	else if (message.invoke === "encodeBase64Selection") {
		encodeBase64Selection();
	}
});