import React from "react";
import { cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import ListingPage from "../index";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-17-updated";
Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Employee List component page", () => {
  const renderedData = renderer.create(<ListingPage />).toJSON();

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListingPage />, div);
  });

  it("renders a snapshot", () => {
    expect(renderedData).toMatchSnapshot();
  });

  it("renders .container", () => {
    const wrapperContent = shallow(<ListingPage />);
    expect(wrapperContent.find(".container")).toHaveLength(1);
  });

  it("should render table", () => {
    const wrapperContent = shallow(<ListingPage />);
    expect(wrapperContent.find("table")).toHaveLength(1);
  });

  afterEach(() => {
    cleanup();
  });
});
