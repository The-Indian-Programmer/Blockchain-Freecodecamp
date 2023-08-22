export function isEmpty(obj) {
	if (obj === "") return true;
	if (obj === 0) return true;
	if (obj === "0") return true;
	if (obj == null) return true;
	if (obj === false) return true;
	if (typeof obj === "object") {
		if (Object.keys(obj).length === 0) return true;
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) return false;
		}
	}
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;
	if (typeof (obj) == "undefined") return true;
	if (typeof obj !== "object") return true;
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return false
}


export function isWalletConnected(userData) {
	let isConnected = false;
    if (isEmpty(userData.address) && isEmpty(userData.isConnected)) {
        isConnected = false;
    } else {
        isConnected = true;
    }
	return isConnected;
}