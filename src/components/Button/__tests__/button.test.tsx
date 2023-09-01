import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Button from "../button";

describe("Button", () => {
	test("render correctly", () => {
		render(<Button text="button" />);
		expect(screen.getByText("button")).toBeInTheDocument();
	});

	test("Check Button Disabled", () => {
		render(<Button text="Disabled Button" disabled />);
		expect(
			screen.getByRole("button", { name: "Disabled Button" })
		).toBeDisabled();
	});
});
