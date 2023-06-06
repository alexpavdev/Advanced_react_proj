import React, { useContext } from "react";
import {
  Heading,
  Button,
  Text,
  Image,
  Flex,
  Stack,
  ButtonGroup,
  Grid,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { UsersContext } from "../components/UsersContext";
import { CommentsSection } from "../components/CommentSections";
import { EventFormModal } from "../modals/EventFormModal";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";

 
 //The loader function fetches event data from the server based on the eventId parameter
export const loader = async ({ params }) => {
  const response = await fetch(
    `http://localhost:3000/events?id=${params.eventId}`
  );
  const event = (await response.json())[0];
  return event;
};

 
//EventPage component
//hooks-useDisclosure, useNavigate, useToast,useContext, useLoaderData, and useOutletContext 
//for managing state, navigation, displaying messages, and accessing context and loader data.
//We render the event details, including the event title, image, categories, description, start and end times, and the user who created the event.
//2 functions used -> submitEdittedForm (eventDetails) - current event gets edited with "Patch" Request
//                  ->  deleteEvent () - Deletes currentEvent with "Delete" request
export const EventPage = () => {
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser, allUsers } = useContext(UsersContext);
  const {
    id,
    title,
    description,
    image,
    location,
    categoryIds,
    startTime,
    endTime,
    createdBy: createdById,
    comments = [],
  } = useLoaderData();
  const { getCategoryNameFromId } = useOutletContext();
  const formData = {
    title,
    description,
    categoryIds,
    location,
    startTime,
    endTime,
  };
  const submitEdittedEvent = async (eventDetails) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(eventDetails),
      });
      if (response.ok) {
        onCloseForm();
        toast({
          title: "Event edited",
          description: `Event "${eventDetails.title}" has been edited.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate(`/event/${id}`);
      } else {
        toast({
          title: "Error",
          description: `Sorry. Something went wrong. Please try again later.`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err) {
      throw Error(err.message);
    }
  };
  const deleteEvent = async () => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Event deleted",
        description: `Event "${title}" has been deleted.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: `Sorry. Something went wrong. Please try again later.`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    navigate("/");
  };
  const createdByUser = allUsers.find((user) => user.id === createdById);
 
  const [startTimeFormated, endTimeFormated] = [startTime, endTime].map(
    (time) => new Date(time).toLocaleString("en-GB").slice(0, -3)
  );
  const createdByCurrentUser = createdById === currentUser?.id;
  return (
    <>
     <Grid p={30} gap={10} templateColumns={["1fr", null, "1fr 2fr"]}>
        <Stack gap={4}>
          <Heading fontWeight={600} fontSize="4xl">
            {title}
          </Heading>
          <Image src={image} w={"500px"} objectFit="cover" borderRadius={5} />
          <Flex gap={2} alignItems="center">
            {categoryIds.map((id) => {
              const name = getCategoryNameFromId(id);
              return (
                <Text
                  color={"teal.500"}
                  key={id}
                  fontSize={"lg"}
                  fontWeight={500}
                >
                  {name}
                </Text>
              );
            })}
          </Flex>
          <Heading fontWeight={500} fontSize="xl">
            What?
          </Heading>
          <Text>{description}</Text>
          <Heading fontWeight={500} fontSize="xl">
            When?
          </Heading>
          <Text>
            {startTimeFormated} - {endTimeFormated}
          </Text>
          <Heading fontWeight={500} fontSize="xl">
            Created By
          </Heading>
          <Flex align={"center"} gap={2}>
            <Text fontWeight={500}>
              {createdByUser ? createdByUser.name : "...loading"}
            </Text>
            <Image
              src={createdByUser ? createdByUser.image : ""}
              boxSize={"50px"}
              borderRadius={"50%"}
              className={createdByCurrentUser ? "current-user" : ""}
            />
          </Flex>
          {createdByCurrentUser && (
            <ButtonGroup>
              <Button
                colorScheme="green"
                variant="outline"
                fontWeight={500}
                w={100}
                onClick={onOpenForm}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                fontWeight={500}
                w={100}
                onClick={onOpenConfirmDelete}
              >
                Delete
              </Button>
            </ButtonGroup>
          )}
          {!createdByCurrentUser && (
            <Text color="purple.500">
              Only the user that created the event can edit and delete the event.
            </Text>
          )}
        </Stack>
        <CommentsSection commentsFromServer={comments} eventId={id} />
      </Grid>
      <EventFormModal
        isOpen={isOpenForm}
        onClose={onCloseForm}
        formData={formData}
        onSubmit={submitEdittedEvent}
        id={id}
        submitButtonText={"Save"}
      />
      <ConfirmDeleteModal
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        deleteEvent={deleteEvent}
      />
    </>
  );
};