import {
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ColorScheme = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Button
      size="sm"
      variant="default"
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
    >
      {computedColorScheme === "light" ? (
        <IconMoon stroke={1.5} />
      ) : (
        <IconSun stroke={1.5} />
      )}
    </Button>
  );
};

export default ColorScheme;
