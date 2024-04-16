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
      variant="default"
      w={50}
      p={3}
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
    >
      {computedColorScheme === "light" ? (
        <IconMoon stroke={2} />
      ) : (
        <IconSun stroke={2} />
      )}
    </Button>
  );
};

export default ColorScheme;
