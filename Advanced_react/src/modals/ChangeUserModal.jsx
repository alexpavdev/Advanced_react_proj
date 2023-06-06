import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  VStack,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";

//a modal component that displays a list of users and allows the selection of a user to change the current user.
//if a user is clicked, the setCurrentUser function is called to update the current user, and the modal is closed.
export const ChangeUserModal = ({
  isOpen,
  onClose,
  allUsers,
  currentUser,
  setCurrentUser,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="none" size="full">
      <ModalOverlay />
      <ModalContent bg="#170826F5">
        <ModalCloseButton color="white" />
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          <VStack spacing={10}>
            <Heading color="white" textAlign="center" fontWeight={200}>
              Select User
            </Heading>
            <Flex flexWrap="wrap" justifyContent="center">
              {allUsers.map((user) => {
                const isCurrentUser = user.id === currentUser.id;
                return (
                  <Flex
                    key={user.id}
                    flexDirection="column"
                    alignItems="center"
                    gap={4}
                  >
                    <Heading size="sml" fontWeight={100} color="white">
                      {user.name}
                    </Heading>
                    <Box
                      className={isCurrentUser ? "current-user" : ""}
                      borderRadius="full"
                      boxSize="150px"
                      overflow="hidden"
                      _hover={{
                        transform: "translateY(-10px)",
                        opacity: "0.4",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCurrentUser(user);
                        onClose();
                      }}
                    >
                      <Image
                        src={user.image}
                        alt={user.name}
                        boxSize="100%"
                        objectFit="cover"
                      />
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ChangeUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  currentUser: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  setCurrentUser: PropTypes.func.isRequired,
};
