import React from "react";
import App from "./App";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/* Components */
import Square from "./components/Square";
import Game from "./components/Game";

Enzyme.configure({ adapter: new Adapter() });

describe("Square", () => {
  it("should render children inside a square tag", () => {
    const wrapper = shallow(<Square value="X"></Square>);
    const square = wrapper.find("button");
    expect(square).toHaveLength(1);
    expect(square.text()).toEqual("X");
  });

  it("should render children inside a square tag", () => {
    const wrapper = shallow(<Square value="O"></Square>);
    const square = wrapper.find("button");
    expect(square).toHaveLength(1);
    expect(square.text()).toEqual("O");
  });
});
