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
          variant="gradient"
          gradient={{ from: "pink", to: "yellow" }}
        >
          {currentItem.title}
        </Anchor>
      );
    } else {
      return <Text key={index}>{currentItem.title}</Text>;
    }
  });
  return (
    <Container size="xl" className={classes.container}>
      <Breadcrumbs
        separator={<IconChevronsRight />}
        separatorMargin="xs"
        mt="xs"
      >
        {items}
      </Breadcrumbs>
    </Container>
  );
}

export default AppBreadcrumbs;
