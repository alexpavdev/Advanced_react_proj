import { useState } from "react";
import { Form, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Input,
  Textarea,
  Button,
  Flex,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

// EventForm component receives several props: onClose, formData, onSubmit, and submitButtonText.
//The helper functions dateNow, defaultStartTime, and defaultEndTime are used to generate default values for the start and end time fields.
//Each form field is wrapped in a FormControl component from Chakra UI, which provides additional accessibility and styling features.

export const EventForm = ({
  onClose,
  formData,
  onSubmit,
  submitButtonText,
}) => {
  const { categoryOptions } = useOutletContext();

  const dateNow = (offsetHours = 0) => {
    let date = new Date();
    if (offsetHours != 0) {
      const milliseconds = date.getTime();
      date = new Date(milliseconds + offsetHours * 3600000);
    }
    const pad = (n) => `${n}`.padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth()) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  };

  const defaultStartTime = () => dateNow();
  const defaultEndTime = () => dateNow(2);

  const [title, setTitle] = useState(formData.title || "");
  const [description, setDescription] = useState(formData.description || "");
  const [categoryIds, setCategoryIds] = useState(formData.categoryIds || []);
  const [location, setLocation] = useState(formData.location || "");
  const [startTime, setStartTime] = useState(
    formData.startTime?.slice(0, 16) || defaultStartTime
  );
  const [endTime, setEndTime] = useState(
    formData.endTime?.slice(0, 16) || defaultEndTime
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      location,
      categoryIds,
      startTime,
      endTime,
    };
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <FormControl isRequired>
        <FormLabel fontWeight="bold" fontSize="xl">Title</FormLabel>
        <Input
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
  
      <FormControl isRequired>
        <FormLabel fontWeight="bold" fontSize="xl">Description</FormLabel>
        <Textarea
          name="description"
          placeholder="Enter description"
          resize="none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
  
      <FormControl>
        <FormLabel fontWeight="bold" fontSize="xl">Categories</FormLabel>
        <Flex gap={4}>
          {categoryOptions.map((category) => (
            <Checkbox
              key={category.id}
              value={category.id}
              name="categoryIds"
              isChecked={categoryIds.includes(category.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategoryIds((prevCategories) => [...prevCategories, category.id]);
                } else {
                  setCategoryIds((prevCategories) => prevCategories.filter((id) => id !== category.id));
                }
              }}
            >
              {category.name}
            </Checkbox>
          ))}
        </Flex>
      </FormControl>
  
      <FormControl isRequired>
        <FormLabel fontWeight="bold" fontSize="xl">Location</FormLabel>
        <Input
          name="location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </FormControl>
  
      <FormControl isRequired>
        <FormLabel fontWeight="bold" fontSize="xl">Start Time</FormLabel>
        <Input
          name="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormControl>
  
      <FormControl isRequired>
        <FormLabel fontWeight="bold" fontSize="xl">End Time</FormLabel>
        <Input
          name="endTime"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </FormControl>
  
      <Flex justify="space-between">
        <Button colorScheme="teal" size="lg" type="submit">
          {submitButtonText}
        </Button>
        <Button colorScheme="red" size="lg" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Form>
  );
};

EventForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.exact({
    title: PropTypes.string,
    description: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};
