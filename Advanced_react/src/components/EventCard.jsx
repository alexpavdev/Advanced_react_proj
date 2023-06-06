import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Text, Heading, Flex, Image } from "@chakra-ui/react";

//The EventCard component is defined as a functional component that takes an event object as a prop. 
//The necessary properties (title, description, categoryIds) are extracted from the event object.
export const EventCard = ({ event }) => {
  const maxParagraphLength = 80;
  const { getCategoryNameFromId } = useOutletContext();

  const { title, description, categoryIds } = event;
  const startTime = new Date(event.startTime)
    .toLocaleString("en-GB")
    .slice(0, -3);
  const endTime = new Date(event.endTime).toLocaleString("en-GB").slice(0, -3);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      m={4}
    >
      <Image
        src={event.image}
        fallbackSrc="https://www.pikpng.com/pngl/m/106-1069399_iam-add-group1-sorry-no-image-available-clipart.png"
        objectFit="cover"
        h={64}
      />
      <Heading size="lg" my={2}>
        {title}
      </Heading>
      <Text color="gray.600" my={2}>
        {description.length > maxParagraphLength
          ? description.slice(0, maxParagraphLength) + "..."
          : description}
      </Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap={2} flexWrap="wrap">
          {categoryIds.map((id) => {
            const name = getCategoryNameFromId(id);
            return (
              <Text
                key={id}
                color="teal.500"
                fontWeight="bold"
                fontSize="sm"
                mr={2}
              >
                {name}
              </Text>
            );
          })}
        </Flex>
        <Text fontSize="sm" color="gray.500">
          {startTime} - {endTime}
        </Text>
      </Flex>
    </Box>
  );
};

EventCard.propTypes = {
  event: PropTypes.exact({
    createdBy: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    attendedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
    location: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.exact({
        comment: PropTypes.string.isRequired,
        commentedBy: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};
