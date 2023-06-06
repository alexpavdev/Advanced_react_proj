import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { Checkbox, Flex, Text, VStack } from "@chakra-ui/react";

//Categories receives the setFilteredCategories prop, which is a function used to update the filtered categories based on user selection.
export const Categories = ({ setFilteredCategories }) => {
  const { categoryOptions } = useOutletContext();

// Handling the checkbox change event
  const handleChange = (e, category) => {
    if (e.target.checked) {
      setFilteredCategories((prevState) => prevState.concat(category.id));
    } else {
      setFilteredCategories((prevState) =>
        prevState.filter((item) => item != category.id)
      );
    }
  };

  return (
    <VStack align="start" spacing={4}>
      <Text fontWeight="bold" fontSize="xl">
        Filter Categories
      </Text>
      <Flex direction="column" gap={2}>
        {categoryOptions.map((category) => (
          <Checkbox
            key={category.id}
            onChange={(e) => handleChange(e, category)}
            fontWeight={400}
          >
            {category.name}
          </Checkbox>
        ))}
      </Flex>
    </VStack>
  );
};

Categories.propTypes = {
  setFilteredCategories: PropTypes.func.isRequired,
};
