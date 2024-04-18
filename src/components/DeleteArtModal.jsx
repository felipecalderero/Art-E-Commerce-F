import { Button, Text } from "@mantine/core";

const DeleteArtModal = ({ canDeleteArt, deleteArt, deleteArtModal }) => {
  return (
    <>
      <Text>
        {canDeleteArt
          ? "Are you sure you want to delete this item?"
          : "You can not delete this art. People have added to the cart"}
      </Text>
      <Button
        fullWidth
        mt="xl"
        variant="outline"
        color="light-dark(black, orange)"
        onClick={canDeleteArt ? deleteArt : deleteArtModal}
      >
        {canDeleteArt ? "Delete" : "Ok"}
      </Button>
    </>
  );
};

export default DeleteArtModal;
