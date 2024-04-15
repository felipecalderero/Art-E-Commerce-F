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
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import classes from "../styles/Header.module.css";
import logoImg from "../assets/images/logo.png";
import userImg from "../assets/images/user.png";
import cartImg from "../assets/images/cart.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ColorScheme from "./ColorScheme";
import Logout from "./Logout";

const tabs = ["Arts", "Artists"];

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);
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
      onClick={toggle}
      className={classes.link}
    >
      <Text value={tab}>{tab}</Text>
    </Link>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Avatar src={logoImg} alt={"App Logo"} radius="xl" size={40} />

          <Popover
            width={width}
            offset={30}
            opened={opened}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => toggle}
            onOpen={() => toggle}
            withinPortal
          >
            <Popover.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: opened,
                })}
              ></UnstyledButton>
            </Popover.Target>
            <Popover.Dropdown> {dropDownItems} </Popover.Dropdown>
          </Popover>
          <Container size="md">
            <Tabs
              color="orange"
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
            <Avatar
              src={cartImg}
              alt="Cart"
              radius="xs"
              size={30}
              className={classes.avatar}
            />
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
  );
};

export default Header;
