import { Layout, Badge } from "antd";
import "./Header.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Header: AntdHeader } = Layout;
interface Props {
  cartLength: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ cartLength, setShowCart }: Props) => (
  <AntdHeader className="header">
    <h3 className="logo">Shopping Cart</h3>
    <Badge count={cartLength}>
      <ShoppingCartOutlined
        onClick={() => setShowCart((prevShowCart) => !prevShowCart)}
        className="cart-icon"
      />
    </Badge>
  </AntdHeader>
);

export default Header;
