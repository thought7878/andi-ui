import classNames from "classnames";
import React, {
	ChangeEvent,
	KeyboardEvent,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import Input, { InputProps } from "../Input";
import Spinner from "../Spinner";

// import "./index.css";

//
export interface DataSourceObject {
	value: string; //suggestion string
}
export type DataSourceType<T = {}> = Partial<T & DataSourceObject>;

//
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
	/**Set input style with class name */
	inputClass?: string;
	/**Set input style with style */
	inputStyle?: React.CSSProperties;
	/**Set spinner style with class name */
	spinnerClass?: string;
	/**Set spinner style with style */
	spinnerStyle?: React.CSSProperties;
	/**Set spinner color */
	spinnerColor?: string;
	/**Set item style with class name */
	itemClass?: string;
	/**
	 * Set item highlight color.
	 * Note: Due to the use of Tailwind, when not effective, please generate the corresponding static Tailwind class.
	 * e.g. #22c55e-->bg-[#22c55e]
	 * */
	highlightColor?: string;
	/**
	 * fetch data function
	 * @param keyword : search string
	 * @returns DataSourceType[] : Synchronous data
	 * @returns Promise<DataSourceType[]> : Asynchronous data
	 */
	fetchSuggestions: (
		keyword: string
	) => DataSourceType[] | Promise<DataSourceType[]>;
	/**
	 * Selected Item function
	 * @param item :selected item object
	 * @returns void
	 */
	onSelect?: (item: DataSourceType) => void;
	// TODO: unfinished 事例
	/**
	 * Custom Item display data
	 * @param item : render item
	 * @returns React Element
	 */
	renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * AutoComplete component
 *
 * ```js
 * // import like this
 * import { AutoComplete } from 'aui'
 * ```
 *
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
	const {
		fetchSuggestions,
		onSelect,
		inputClass,
		inputStyle,
		spinnerClass,
		spinnerStyle,
		spinnerColor,
		itemClass,
		highlightColor,
		value,
		renderOption,

		...otherProps
	} = props;
	//
	const [inputValue, setInputValue] = useState(value);
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const debouncedInputValue = useDebounce(inputValue, 500);
	let shouldSearch = useRef(false);
	const autoCompleteRef = useRef<HTMLDivElement>(null);

	// 鼠标点击组件之外，关闭suggestion list
	useClickOutside(autoCompleteRef, (event: MouseEvent) => {
		setSuggestions([]);
		setHighlightIndex(-1);
	});

	//获取suggestions
	useEffect(() => {
		if (debouncedInputValue && shouldSearch.current) {
			setSuggestions([]);
			const results = fetchSuggestions(debouncedInputValue as string);
			if (results instanceof Promise) {
				setIsLoading(true);
				results.then((data) => {
					setIsLoading(false);
					setSuggestions(data);
				});
			} else {
				setSuggestions(results);
			}
		}
		//TODO: 放在这里合适吗？
		setHighlightIndex(-1);
	}, [debouncedInputValue, fetchSuggestions]);

	//
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		setInputValue(value);
		shouldSearch.current = true;
	};

	//
	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		switch (e.code) {
			case "ArrowDown":
				if (highlightIndex < suggestions.length - 1) {
					setHighlightIndex(highlightIndex + 1);
				}
				break;
			case "ArrowUp":
				if (highlightIndex > 0) {
					setHighlightIndex(highlightIndex - 1);
				}
				break;
			case "Enter":
			case "NumpadEnter":
				if (suggestions[highlightIndex]) {
					handleClick(suggestions[highlightIndex]);
				}
				// setHighlightIndex(-1);
				break;
			case "Escape":
				setSuggestions([]);
				break;
			default:
				break;
		}
	}

	//
	function handleClick(suggestion: DataSourceType) {
		setInputValue(suggestion.value);
		setSuggestions([]);
		shouldSearch.current = false;
		if (onSelect) {
			onSelect(suggestion);
		}
	}

	// render li option
	function _renderOption(item: DataSourceType) {
		return renderOption ? renderOption(item) : item.value;
	}
	// render suggestions
	function renderSuggestions() {
		let lis = suggestions.map((suggestion, index) => {
			// classes
			let suggestionClasses = classNames(
				"suggestion-item",
				{
					"suggestion-item-active": index === highlightIndex,
					// highlightColor has value,hover is highlightColor
					// TODO: 动态的，tailwind不会生成
					["hover:!bg-[" + highlightColor + "]"]: highlightColor,
					["bg-[" + highlightColor + "]"]:
						highlightColor && index === highlightIndex,
				},

				itemClass
			);

			//
			return (
				<li
					key={index}
					className={suggestionClasses}
					// style={{
					// 	// highlightColor has value&&highlightIndex,backgroundColor is highlightColor
					// 	backgroundColor:
					// 		highlightColor && index === highlightIndex
					// 			? highlightColor
					// 			: undefined,
					// }}
					onClick={() => {
						handleClick(suggestion);
					}}
				>
					{_renderOption(suggestion)}
				</li>
			);
		});
		return (
			<ul className="suggestion-list absolute left-0 z-[100] w-full list-none whitespace-nowrap rounded-lg border border-solid border-gray-200 bg-white pl-0 shadow-lg">
				{lis}
			</ul>
		);
	}
	//
	function renderLoadingIcon() {
		const classes = classNames("text-primary text-[2rem]", spinnerClass);
		return (
			<div className="suggstions-loading-icon absolute left-0 z-[99] flex min-h-[75px] w-full justify-center ">
				<Spinner
					className={classes}
					color={spinnerColor}
					style={spinnerStyle}
				/>
			</div>
		);
	}

	//
	return (
		<div className="relative" ref={autoCompleteRef}>
			<Input
				className={inputClass}
				style={inputStyle}
				value={inputValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...otherProps}
			/>
			<CSSTransition
				in={isLoading}
				timeout={200}
				classNames="aui-show-hide"
				unmountOnExit
			>
				{renderLoadingIcon}
			</CSSTransition>
			<CSSTransition
				in={suggestions.length > 0}
				timeout={200}
				classNames="aui-show-hide"
				unmountOnExit
			>
				{renderSuggestions}
			</CSSTransition>
		</div>
	);
};

AutoComplete.defaultProps = {
	value: "",
	// spinnerColor: "#3b82f6",
	// spinnerStyle: { color: "#3b82f6", fontSize: "2rem" },
};

export default AutoComplete;
