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
import Cart from "./Cart";

const tabsList = ["Arts", "Artists"];
const userList = [
  {
    tab: "My Profile",
    link: `/users/${JSON.parse(localStorage.getItem("user"))?.userId}`,
  },
  {
    tab: "Logout",
    link: "/",
  },
];

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [burgerOpened, burger] = useDisclosure(false);
  const [userOpened, user] = useDisclosure(false);

  const [cartDrawerOpened, cartDrawer] = useDisclosure(false);

  const { width } = useViewportSize();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("user")).userName);
  }, []);

  const tabItems = tabsList.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const navDropDownItems = tabsList.map((tab) => (
    <Link
      key={tab}
      to={`/${tab.toLowerCase()}`}
      onClick={burger.toggle}
      className={classes.link}
    >
      <Text value={tab}>{tab}</Text>
    </Link>
  ));

  const userDropDownItems = userList.map((item) => (
    <Link
      key={item.tab}
      to={item.link}
      onClick={() => {
        if (item.tab === "Logout") {
          localStorage.removeItem("user");
        }
        user.toggle();
      }}
      className={classes.link}
    >
      <Text value={item.tab}>{item.tab}</Text>
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
              <Popover.Dropdown> {navDropDownItems} </Popover.Dropdown>
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
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                offset={10}
                opened={userOpened}
                transitionProps={{ transition: "pop-top-right" }}
                onClose={() => user.toggle}
                onOpen={() => user.toggle}
                withinPortal
              >
                <Popover.Target>
                  <Avatar
                    onMouseEnter={user.open}
                    src={userImg}
                    alt={username}
                    radius="xl"
                    size={30}
                    className={classes.avatar}
                    onClick={user.toggle}
                  />
                </Popover.Target>
                <Popover.Dropdown> {userDropDownItems} </Popover.Dropdown>
              </Popover>
              <ColorScheme />
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
