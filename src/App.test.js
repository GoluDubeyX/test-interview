import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders table with ID column", () => {
  render(<App />);
  const tableHeader = screen.getByText(/ID/i);  
  expect(tableHeader).toBeInTheDocument();
});
