import { useContext } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Image, Text, IconButton, Stack } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { UsersContext } from "./UsersContext";

//reusable Comment component that renders an individual comment.

export const Comment = ({ comment, deleteComment }) => {
  // Accessing currentUser and allUsers from the UsersContext
  const { currentUser, allUsers } = useContext(UsersContext);
  const imageSrc =
    allUsers.find((user) => user.id === comment.commentedBy)?.image || "";
  const commentedByCurrentUser = comment.commentedBy === currentUser?.id;
  const styling = {
    p: 4,
    borderRadius: 8,
    border: "1px solid",
    borderColor: commentedByCurrentUser ? "green.300" : "blue.300",
    backgroundColor: commentedByCurrentUser ? "green.50" : "blue.50",
  };

  return (
    <Flex
      {...styling}
      justify={"space-between"}
      w={"100%"}
      gap={4}
      className="comment"
    >
      <Box flex="1">
        <Text>{comment.comment}</Text>
      </Box>
      <Stack spacing={2} align="center">
        {commentedByCurrentUser && (
          <IconButton
            icon={<AiOutlineDelete />}
            size="sm"
            onClick={() => deleteComment(comment.id)}
            aria-label="Delete"
            colorScheme="red"
          />
        )}
        <Image
          src={imageSrc}
          borderRadius={"full"}
          boxSize="30px"
          className={commentedByCurrentUser ? "current-user" : ""}
        />
      </Stack>
    </Flex>
  );
};

Comment.propTypes = {
  comment: PropTypes.exact({
    comment: PropTypes.string.isRequired,
    commentedBy: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};
