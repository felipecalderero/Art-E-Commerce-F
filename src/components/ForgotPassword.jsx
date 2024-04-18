import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../styles/ForgotPassword.module.css";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  return (
    <div className={classes.background}>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <br />
        <Text c="#e6757d" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper shadow="md" p={30} mt={30} radius="xl">
          <TextInput
            radius="xl"
            label="Your email"
            placeholder="me@mantine.dev"
            required
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Link to={"/"}>
                  <Box ml={5}>Back to the login page</Box>
                </Link>
              </Center>
            </Anchor>
            <Button radius="xl" color="#e6757d" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </Container>
    </div>
  );
}

export default ForgotPassword;
