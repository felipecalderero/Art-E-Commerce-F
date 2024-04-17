import { Button, Text } from "@mantine/core";

const DeleteArtModal = ({ canDelete, deleteArt, closeModal }) => {
  return (
    <>
      <Text>
        {canDelete
          ? "Are you sure you want to delete this item?"
          : "You can not delete this art. People have added to the cart"}
      </Text>
      <Button
        fullWidth
        mt="xl"
        variant="outline"
        color="light-dark(black, orange)"
        onClick={canDelete ? deleteArt : closeModal}
      >
        {canDelete ? "Delete" : "Ok"}
      </Button>
    </>
  );
};

export default DeleteArtModal;
