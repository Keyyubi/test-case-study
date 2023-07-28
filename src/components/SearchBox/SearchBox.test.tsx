import { vi } from "vitest";
import { fireEvent, render, screen } from "../../test/test-utils";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
	const spy = vi.fn(); // jest.fn();
	const DefaultSearchBox = (
		<SearchBox options={[{ id: "1", title: "Title" }]} task="origin" placeholder="placeholder" onSelect={spy} />
	);

	it("should have placeholder", () => {
		render(DefaultSearchBox);

		expect(screen.queryByPlaceholderText("placeholder")).toBeInTheDocument();
	});

	it("should open dropdown menu", () => {
		render(DefaultSearchBox);

		const el = screen.getByPlaceholderText("placeholder");

		fireEvent.focus(el);

		expect(screen.getByTestId("menu")).toBeInTheDocument();
	});
});
