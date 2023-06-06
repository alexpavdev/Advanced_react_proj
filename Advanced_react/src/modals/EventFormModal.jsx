import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";

//EventFormModal component is defined as a functional component that receives
// several props: isOpen, onClose, formData, onSubmit, and submitButtonText.
export const EventFormModal = ({
  isOpen,
  onClose,
  formData = {},
  onSubmit,
  submitButtonText,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="lg">
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent borderRadius="md" borderWidth="2px" borderColor="blue.500">
        <ModalHeader bg="blue.500" color="white" p={4} fontSize="xl">
          Event Details
        </ModalHeader>
        <ModalCloseButton color="blue.500" _hover={{ color: "blue.700" }} />
        <ModalBody px={6} py={4}>
          <EventForm
            formData={formData}
            onClose={onClose}
            onSubmit={onSubmit}
            submitButtonText={submitButtonText}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

EventFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.exact({
    title: PropTypes.string,
    description: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    id: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};
