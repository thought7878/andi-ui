import { useEffect, useState } from "react";

/**
 * value变化，就清除上一次的timer，再更新这次的。
 * value变化的间隔时间 < timeout，就会清除上一次的timer，就不会更新上一次的debouncedValue
 *
 */
function useDebounce(value: any, timeout: number = 300) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	//
	useEffect(() => {
		let timer = window.setTimeout(() => {
			setDebouncedValue(value);
		}, timeout);
		//
		return () => {
			clearTimeout(timer);
		};
	}, [value, timeout]);

	//
	return debouncedValue;
}

export default useDebounce;
