export function shuffle(arr) {
	let tmp, current, index = arr.length;
	if (index) {
		while(--index) {
			current = Math.floor(Math.random() * (index + 1));
			tmp = arr[current];
			arr[current] = arr[index];
			arr[index] = tmp;
		}
	}
	return arr;
}

export function pick(arr, total) {
	let tmp, picked = [];
	if (total) {
		while(total--) {
			tmp = Math.floor(Math.random() * arr.length);
			picked.push(arr[tmp]);
			arr.splice(tmp, 1);
			arr = shuffle(arr);
		}
	}
	return picked;
}