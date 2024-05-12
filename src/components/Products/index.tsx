import React from "react";
import { Product } from "../../types";
import { List, Card, Button } from "antd";
import "./Products.css";
interface Props {
  products: Product[];
  addToCart: (product: Product) => void;
}

const Products: React.FC<Props> = ({ products, addToCart }) => {
  return (
    <div className="products">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={products}
        renderItem={(item) => (
          <List.Item className="product-card">
            <Card>
              <img
                className="thumbnail"
                src={item.thumbnail}
                alt={item.title}
              />
              <h3>{item.title}</h3>
              <p>Price: £{item.price.toFixed(2)}</p>
              <Button onClick={() => addToCart(item)}>Add to Cart</Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Products;
