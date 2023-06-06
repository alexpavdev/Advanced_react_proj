import React, { useContext, useState } from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { SearchBar } from "../components/SearchBar";
import { Categories } from "../components/Categories";
import { EventCard } from "../components/EventCard";
import { EventFormModal } from "../modals/EventFormModal";

//loader function is used to retrieve events data from the server
export const loader = async () => {
  try {
    const response = await fetch(`http://localhost:3000/events`);
    if (!response.ok) {
      if (response.status === 404) {
        throw Error("Resource not found!");
      }
      throw Error("Server Error!");
    }
    return response.json();
  } catch (err) {
    throw Error(err.message);
  }
};

//useLoaderData hook is used to fetch the events data from the server. The result is stored in the eventsData variable.
//filteredEvents variable is derived by filtering the eventsData based on the searchTerm and filteredCategories
export const EventsPage = () => {
  const eventsData = useLoaderData() || [];
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  let filteredEvents = eventsData.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredCategories.length > 0) {
    filteredEvents = filteredEvents.filter((event) =>
      event.categoryIds.some((id) => filteredCategories.includes(id))
    );
  }
  const findNextHighestId = () => {
    let highest = 0;
    for (const { id } of eventsData) {
      if (id > highest) {
        highest = id;
      }
    }
    return highest + 1;
  };

  //submitNewEvent(eventDetails) - sends eventData to server with "Post" request.
  const submitNewEvent = async (eventDetails) => {
    if (!eventDetails.id) {
      eventDetails.id = findNextHighestId();
    }
    eventDetails.attendedBy = [];

    try {
      const response = await fetch(`http://localhost:3000/events/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(eventDetails),
      });
      if (response.ok) {
        toast({
          title: "Event added",
          description: `Event "${eventDetails.title}" has been added.`,
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
      onClose();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Grid templateColumns={["1px 1fr 1px", null, null, "80px 1fr 80px"]}>
        <Box className="side-bar" />
        <Stack align={"center"}>
          <Heading p={10} size={"3xl"} fontWeight={200}>
            Events
          </Heading>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Categories setFilteredCategories={setFilteredCategories} />
          <Grid
            templateColumns={[
              "repeat(1,1fr)",
              null,
              "repeat(2,1fr)",
              null,
              "repeat(3,1fr)",
              "repeat(4, 1fr)",
            ]}
            p={10}
            mx={"auto"}
            gap={10}
          >
            {filteredEvents.map((event) => {
              return (
                <Link
                  to={`event/${event.id}`}
                  key={event.id}
                  style={{
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  <EventCard event={event} />
                </Link>
              );
            })}
            <Center
              className="event-card new-card"
              onClick={onOpen}
              bg="#ccc"
              borderRadius="md"
              cursor="pointer"
              _hover={{
                bg: "#999",
              }}
            >
              <AiOutlinePlusSquare size={24} />
            </Center>
          </Grid>
        </Stack>
        <Box className="side-bar" />
      </Grid>
      <EventFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={submitNewEvent}
        submitButtonText={"Add Event"}
        modalStyles={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            border: "none",
            borderRadius: "md",
            padding: "2rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </>
  );
};