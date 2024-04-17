import { useEffect, useContext } from "react";
import Cart from "../components/Cart";
import { BreadcrumbContext } from "../context/breadcrumb.context";

const CartPage = () => {
  const { setItemList } = useContext(BreadcrumbContext);
  useEffect(() => {
    setItemList([{ title: "Cart Details" }]);
  }, []);
  return <Cart />;
};

export default CartPage;
