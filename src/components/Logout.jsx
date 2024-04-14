import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        size="sm"
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
