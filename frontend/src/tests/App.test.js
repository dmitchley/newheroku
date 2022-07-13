import { data, url } from "../App";
import App from "../App";
import renderer from "react-test-renderer";

// comparing the data and url and if its is equal the api is working.
test("Test API", async () => {
  await data;
  expect(data).toEqual(url);
});

// snapshot of app.js
test("Favourites component", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
