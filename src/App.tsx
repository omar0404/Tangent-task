import React, { useState, useEffect } from "react";
import { Product, CartItem } from "./types";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { getProducts } from "./api/products";
import Header from "./components/Header";
import { Flex, Layout } from "antd";
const { Footer, Content } = Layout;

const App: React.FC = () => {
  const [products, setProducts] = useState<
    Array<Product & { loading?: boolean }>
  >([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = (page = 0) => {
    setLoading(true);
    getProducts(page).then((res) => {
      setLoading(false);
      setProducts([...products, ...res.data?.products]);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id !== id) return item;
      if (item.quantity >= 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const onLoadMore = () => {
    setPage(page + 1);
    fetchProducts((page + 1) * 10);
  };
  return (
    <Flex gap="middle" wrap>
      <Layout>
        <Header
          {...{
            cartLength: cart.length,
            setShowCart,
          }}
        />
        <Content>
          <Products
            onLoadMore={onLoadMore}
            loading={loading}
            products={products}
            addToCart={addToCart}
          />
        </Content>
        <Footer>
          <p>© {new Date().getFullYear()} Shopping Cart</p>
        </Footer>
        <Cart
          {...{
            open: showCart,
            onClose: () => setShowCart(false),
            cart,
            increaseQuantity,
            decreaseQuantity,
            total: calculateTotal(),
          }}
        />
      </Layout>
    </Flex>
  );
};

export default App;
