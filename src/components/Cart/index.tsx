import React from "react";
import { CartItem } from "../../types";
import { Drawer, Image, List } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./Cart.css";
interface Props {
  cart: CartItem[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  total: number;
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({
  onClose,
  open,
  cart,
  increaseQuantity,
  decreaseQuantity,
  total,
}) => {
  return (
    <Drawer
      width={640}
      placement="right"
      onClose={onClose}
      closable={true}
      open={open}
      title="Cart"
    >
      <List
        footer={<h2>Total: £{total.toFixed(2)}</h2>}
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <PlusOutlined onClick={() => increaseQuantity(item.id)} />,
              <MinusOutlined onClick={() => decreaseQuantity(item.id)} />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Image wrapperClassName="cart-thumbnail" src={item.thumbnail} />
              }
              title={<a data-testid={`product-${item.id}`}>{item.title}</a>}
              description={<p>Quantity: {item.quantity}</p>}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default Cart;
