import { useState, useEffect } from "react";

function getStorageValue<T>(key: string, defaultValue: T): T {
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem(key);
		return saved ? (JSON.parse(saved) as T) : defaultValue;
	}
	return defaultValue;
}

export const useLocalStorage = <T,>(
	key: string,
	defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		return getStorageValue<T>(key, defaultValue);
	});

	useEffect(() => {
		if (value !== undefined && value !== null) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.removeItem(key);
		}
	}, [key, value]);

	return [value, setValue];
};
