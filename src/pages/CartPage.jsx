import Cart from "../components/Cart";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

const CartPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        offset={0}
        opened={opened}
        onClose={close}
        position="right"
        size="xl"
      >
        <Cart />
      </Drawer>
      <Button onClick={open}>Open Drawer</Button>
    </>
  );
};

export default CartPage;
