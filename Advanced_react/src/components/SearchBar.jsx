import PropTypes from "prop-types";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

//SearchBar component to quickly find an event
export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box m={4}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<RiSearchLine color="gray.500" />}
        />
        <Input
          value={searchTerm}
          type="text"
          placeholder="Search events"
          variant="outline"
          size="lg"
          fontSize="1.6rem"
          onChange={handleChange}
        />
      </InputGroup>
    </Box>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

