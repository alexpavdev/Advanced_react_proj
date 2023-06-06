import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Stack,
  Textarea,
  Button,
  Text,
  Divider,
} from "@chakra-ui/react";
import { UsersContext } from "./UsersContext";
import { Comment } from "./Comment";

export const CommentsSection = ({ commentsFromServer, eventId }) => {
  const [comments, setComments] = useState(commentsFromServer);
  const { currentUser } = useContext(UsersContext);

  useEffect(() => {
    const updateComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({
              comments: comments,
            }),
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    updateComments();
  }, [comments, eventId]);

  const addComment = (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value;
    const newComment = {
      id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 0,
      comment: commentText,
      commentedBy: currentUser.id,
    };
    setComments([...comments, newComment]);
    e.target.comment.value = "";
  };

  const deleteComment = (id) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  };

  return (
    <Box>
      <Heading fontWeight={100} textAlign="center" fontSize="3xl" mb={8}>
        Comments
      </Heading>

      <Stack spacing={4}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))}

        <Divider />

        <form onSubmit={addComment}>
          <Textarea
            placeholder="Write your comment:"
            resize="none"
            name="comment"
            mb={4}
          />
          <Button type="submit">Add</Button>
        </form>
      </Stack>
    </Box>
  );
};

CommentsSection.propTypes = {
  commentsFromServer: PropTypes.array.isRequired,
  eventId: PropTypes.number.isRequired,
};
