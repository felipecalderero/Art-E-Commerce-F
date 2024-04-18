import {
  Button,
  Image,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";

const AddEditModal = ({ isNewArt, artDetail, addUpdateArt }) => {
  const [title, setTitle] = useState(artDetail.title);
  const [description, setDescription] = useState(artDetail.description);
  const [category, setCategory] = useState(artDetail.category);
  const [size, setSize] = useState(artDetail.size);
  const [date, setDate] = useState(artDetail.date);
  const [price, setPrice] = useState(artDetail.price);
  const [artImage, setArtImage] = useState(artDetail.image);

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    size: "",
    price: "",
    artImage: "",
    year: "",
    image: "",
  });

  // Function to validate email format
  const isValidSize = (size) => {
    const sizeRegex = /^\d+\s*x\s*\d+$/i;
    return sizeRegex.test(size);
  };

  // Function to validate year format
  const isValidYear = (year) => {
    const yearRegex = /^\d{4}$/;
    return yearRegex.test(year);
  };

  // Function to validate link format
  const isValidLink = (link) => {
    const linkRegex = /http[s]?:\/\/[^\s/$.?#].[^\s]*/;
    return linkRegex.test(link);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    let validationErrors = {};
    if (!title) validationErrors.title = "Title is required";
    if (!category) validationErrors.category = "Category is required";
    if (!size) validationErrors.size = "Size is required";
    else if (!isValidSize(size)) validationErrors.size = "Invalid size format";

    if (!price) validationErrors.price = "Price is required";
    if (!artImage) validationErrors.artImage = "Art image is required";
    else if (!isValidLink(artImage)) validationErrors.image = "Invalid URL";

    if (date.length && !isValidYear(date))
      validationErrors.year = "Enter valid year";

    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length > 0) return;

    // Create payload
    const payload = {
      title,
      description,
      category,
      size,
      date,
      price: parseInt(price),
      image: artImage,
      userId: artDetail.userId,
      inCart: artDetail.inCart,
    };
    console.log("check me", payload);
    addUpdateArt(payload);
  };
  return (
    <Stack gap={15}>
      <TextInput
        label="Title"
        placeholder="Title"
        required
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        error={errors.title}
      />
      <Textarea
        label="Discription"
        placeholder="Write about your art..."
        value={description}
        rows={4}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />
      <TextInput
        label="Category"
        placeholder="Category"
        required
        value={category}
        onChange={(event) => setCategory(event.currentTarget.value)}
        error={errors.category}
      />
      <TextInput
        label="Size"
        placeholder="80 X 80"
        required
        value={size}
        onChange={(event) => setSize(event.currentTarget.value)}
        error={errors.size}
      />
      <TextInput
        label="Year"
        placeholder="Year"
        value={date}
        onChange={(event) => setDate(event.currentTarget.value)}
        error={errors.year}
      />
      <NumberInput
        label="Price (in Euro)"
        placeholder="Price"
        required
        value={price}
        allowNegative={false}
        min={0}
        onChange={setPrice}
        error={errors.price}
      />
      <TextInput
        label="Image"
        placeholder="Your art URL"
        required
        value={artImage}
        onChange={(event) => setArtImage(event.currentTarget.value)}
        error={errors.image}
      />

      <Image
        radius="sm"
        src={artImage}
        h="25rem"
        mt="xl"
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />

      <Button
        fullWidth
        mt="xl"
        onClick={handleSubmit}
        variant="outline"
        color="light-dark(black, orange)"
      >
        {isNewArt ? "Add Art" : "Update Art"}
      </Button>
    </Stack>
  );
};

export default AddEditModal;
