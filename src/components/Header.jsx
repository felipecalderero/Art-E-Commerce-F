import cx from "clsx";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Tabs,
  Burger,
  Popover,
  Tooltip,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { FaCartShopping } from "react-icons/fa6";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import classes from "../styles/Header.module.css";
import logoImg from "../assets/images/artmarketlogo.png";
import userImg from "../assets/images/user.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ColorScheme from "./ColorScheme";
import Logout from "./Logout";
import Cart from "./Cart";

const tabs = ["Arts", "Artists"];

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [burgerOpened, burger] = useDisclosure(false);
  const [cartDrawerOpened, cartDrawer] = useDisclosure(false);

  const { width } = useViewportSize();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user")).userName);
  }, []);

  const tabItems = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const dropDownItems = tabs.map((tab) => (
    <Link
      key={tab}
      to={`/${tab.toLocaleLowerCase()}`}
      onClick={burger.toggle}
      className={classes.link}
    >
      <Text value={tab}>{tab}</Text>
    </Link>
  ));

  // Function to navigate to Cart page with the user ID
  const handleCartClick = () => {
    cartDrawer.open();
    // navigate(`/cart/${JSON.parse(localStorage.getItem("user")).userId}`);
  };

  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection} size="xl">
          <Group justify="space-between">
            <Burger
              color={"#ffebb2"}
              opened={burgerOpened}
              onClick={burger.toggle}
              hiddenFrom="xs"
              size="sm"
            />
            <Avatar src={logoImg} alt={"App Logo"} radius="xs" size={60} />

            <Popover
              width={width}
              offset={30}
              opened={burgerOpened}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => burger.toggle}
              onOpen={() => burger.toggle}
              withinPortal
            >
              <Popover.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: burgerOpened,
                  })}
                ></UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown> {dropDownItems} </Popover.Dropdown>
            </Popover>
            <Container size="md">
              <Tabs
                color="#ffebb2"
                defaultValue="Arts"
                visibleFrom="xs"
                onChange={(value) => navigate(`/${value.toLowerCase()}`)}
                classNames={{
                  root: classes.tabs,
                  list: classes.tabsList,
                  tab: classes.tab,
                }}
              >
                <Tabs.List>{tabItems}</Tabs.List>
              </Tabs>
            </Container>
            <Group gap={{ base: "sm", sm: "md", lg: "lg" }}>
              <FaCartShopping onClick={handleCartClick} />
              <Tooltip label={username}>
                <Avatar
                  src={userImg}
                  alt={username}
                  radius="xl"
                  size={30}
                  className={classes.avatar}
                />
              </Tooltip>
              <ColorScheme />
              <Logout />
            </Group>
          </Group>
        </Container>
      </div>
      <Drawer
        offset={0}
        opened={cartDrawerOpened}
        onClose={cartDrawer.close}
        position="right"
        size="lg"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Cart closeDrawer={cartDrawer.close} />
      </Drawer>
    </>
  );
};

export default Header;
