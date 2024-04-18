import { Anchor, Breadcrumbs, Container, Text } from "@mantine/core";
import { IconChevronsRight } from "@tabler/icons-react";
import { BreadcrumbContext } from "../context/breadcrumb.context";
import { useContext } from "react";
import classes from "../styles/AppBreadcrumbs.module.css";
function AppBreadcrumbs() {
  const { itemList } = useContext(BreadcrumbContext);
  const items = itemList.map((currentItem, index) => {
    if (currentItem.url) {
      return (
        <Anchor
          href={currentItem.url}
          key={index}
          underline="never"
          c="light-dark(#e6757d, #8644a2)"
        >
          {currentItem.title}
        </Anchor>
      );
    } else {
      return (
        <Text c="light-dark(#8644a2, #ffebb2 )" key={index}>
          {currentItem.title}
        </Text>
      );
    }
  });
  return (
    <Container size="xl" className={classes.container}>
      <Breadcrumbs
        separator={<IconChevronsRight color="light-dark(#e6757d, #8644a2)" />}
        separatorMargin="xs"
        mt="xs"
      >
        {items}
      </Breadcrumbs>
    </Container>
  );
}

export default AppBreadcrumbs;
