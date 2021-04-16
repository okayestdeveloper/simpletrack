import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("should render a thing", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      <Router history={history}>
        <App></App>
      </Router>
    );
    expect(getByText("App goes here")).toBeInTheDocument();
  });
});
