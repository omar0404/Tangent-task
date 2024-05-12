import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import api from "./utils/api";

jest.mock("./utils/api");

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
describe("Products Component", () => {
  test("should render correct products", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, thumbnail: "product1.jpg" },
      { id: 2, title: "Product 2", price: 150, thumbnail: "product2.jpg" },
      { id: 3, title: "Product 3", price: 200, thumbnail: "product3.jpg" },
    ];

    const mockData = { data: { products: mockProducts } };
    (api.get as jest.Mock).mockResolvedValueOnce(mockData);

    render(<App />);

    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });
  test("should add product to cart successfully", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 100, thumbnail: "product1.jpg" },
      { id: 2, title: "Product 2", price: 150, thumbnail: "product2.jpg" },
      { id: 3, title: "Product 3", price: 200, thumbnail: "product3.jpg" },
    ];

    const mockData = { data: { products: mockProducts } };
    (api.get as jest.Mock).mockResolvedValueOnce(mockData);

    render(<App />);

    const addToCart = await screen.findByTestId("add-to-cart-product-2");
    fireEvent.click(addToCart);

    const cartIcon = await screen.findByTestId("cart-icon");
    fireEvent.click(cartIcon);

    const productInCart = await screen.findByText("Product 2", {
      selector: `[data-testid=product-2]`,
    });
    expect(productInCart).toBeInTheDocument();
  });
});
