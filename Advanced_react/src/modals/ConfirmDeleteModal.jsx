import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";


//ConfirmDeleteModal component is defined as a functional component that takes in three props: isOpen, onClose, and deleteEvent.
//Event handlers are attached to the delete and cancel buttons to trigger the corresponding actions.

export const ConfirmDeleteModal = ({ isOpen, onClose, deleteEvent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="fade" isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
      <ModalContent color="white" bg="gray.800">
        <ModalHeader bg="red.500" borderBottomWidth="1px" borderColor="red.600" py={4}>
          Confirm Delete
        </ModalHeader>
        <ModalCloseButton color="white" _hover={{ color: "red.200" }} />
        <ModalBody>
          <Text>Are you sure? This action cannot be undone.</Text>
        </ModalBody>
        <ButtonGroup justifyContent="flex-end" p={4}>
          <Button colorScheme="red" variant="ghost" onClick={deleteEvent}>
            Delete
          </Button>
          <Button colorScheme="gray" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};
