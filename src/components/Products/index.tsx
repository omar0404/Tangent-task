import React from "react";
import { Product } from "../../types";
import { List, Card, Button, Skeleton } from "antd";
import "./Products.css";
interface Props {
  products: Array<Product & { loading?: boolean }>;
  addToCart: (product: Product) => void;
  loading: boolean;
  onLoadMore: () => void;
}
const LOADING_ITEM = {
  loading: true,
  title: "",
  price: 0,
  thumbnail: "",
  id: "",
};
const LOADING_ITEMS = [LOADING_ITEM, LOADING_ITEM, LOADING_ITEM];
const Products: React.FC<Props> = ({
  loading,
  onLoadMore,
  products,
  addToCart,
}) => {
  return (
    <div className="products">
      <List
        loadMore={
          !loading && (
            <div className="loading-button">
              <Button onClick={onLoadMore}>loading more</Button>
            </div>
          )
        }
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={
          loading && products.length
            ? products.concat(LOADING_ITEMS)
            : loading
            ? LOADING_ITEMS
            : products
        }
        renderItem={(item) => (
          <List.Item className="product-card">
            <Card>
              <Skeleton loading={item.loading}>
                <img
                  className="thumbnail"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
                <p>Price: £{item.price.toFixed(2)}</p>
                <Button
                  data-testid={`add-to-cart-product-${item.id}`}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </Skeleton>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Products;
