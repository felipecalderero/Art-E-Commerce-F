import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        w={50}
        p={3}
        variant="default"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        <IconLogout />
      </Button>
    </>
  );
};

export default Logout;
