import { render, RenderResult, screen } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
	defaultIndex: "0",
	onSelect: jest.fn(),
	className: "test",
};
const testVerticalProps: MenuProps = {
	defaultIndex: "0",
	direction: "vertical",
};

const menuGenerater = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>active</MenuItem>
			<MenuItem>abc</MenuItem>
			<MenuItem disabled>disabled</MenuItem>
		</Menu>
	);
};

let wrapper: RenderResult,
	menuElement: HTMLElement | null,
	activeElement: HTMLElement | null,
	disabledElement: HTMLElement | null;
describe("test Menu and MenuItem component", () => {
	wrapper = render(menuGenerater(testProps));
	beforeEach(() => {
		// menuElement = wrapper.getByTestId("test-menu");
		menuElement = screen.queryByTestId("test-menu-id");
		activeElement = screen.queryByTestId("active");
		disabledElement = screen.queryByTestId("disabled");
	});
	it("should render correct Menu and MenuItem based on default props", () => {
		expect(menuElement).toBeInTheDocument();
		expect(menuElement).toHaveClass("aui-menu test");
		// expect(menuElement?.getElementsByTagName("li")?.length).toEqual(3);
	});
	it("click items should change active and call the right callback", () => {
		//TODO
	});
	it("", () => {
		//TODO
	});
});
