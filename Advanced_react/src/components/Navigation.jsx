import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ChangeUserModal } from "../modals/ChangeUserModal";
import { UsersContext } from "./UsersContext";

// useContext hook is imported from React to access the context data.
// The Link component from React Router is imported to create links within the navigation.
export const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, setCurrentUser, allUsers } = useContext(UsersContext);

  return (
    <header>
      <Flex justify="space-between" align="center" p={4}>
        <Flex align="center" gap={2}>
          <BsPersonCircle
            size="2rem"
            className="icon-hover-grow"
            onClick={onOpen}
          />
          <Text fontSize="xl">Change User</Text>
        </Flex>
        <Flex align="center" gap={2}>
          <Text fontSize="xl">{currentUser?.name || "Guest"}</Text>
          <Link to="/">
            <AiOutlineHome size="1.8rem" className="icon-hover-grow" />
          </Link>
        </Flex>
      </Flex>

      <ChangeUserModal
        onClose={onClose}
        isOpen={isOpen}
        allUsers={allUsers}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </header>
  );
};
