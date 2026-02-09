import { useState } from "react";
import PropTypes from "prop-types";

import PropertyForm from "./PropertyForm";
import PropertyLabel from "./PropertyLabel";
import PropertySummary from "./summary/PropertySummary";
import DeletePropertyModal from "./DeletePropertyModal";
import {
  Stack,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersistenceStateEnum from "../../constants/persistenceStateEnum";
import { contactValidationSchema } from "../../util/formValidation";

PropertyList.propTypes = {
  connections: PropTypes.array,
  setConnections: PropTypes.func,
  primaryContact: PropTypes.object,
};

export default function PropertyList({
  connections,
  setConnections,
  primaryContact,
}) {
  const [expanded, setExpanded] = useState(false);
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteModalConnection, setDeleteModalConnection] = useState(null);
  const [contacts, setContacts] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setEditingProperty(null);
    setPropertyModalOpen(false);
  };

  // Local-only update of the connection list (no remote persistence yet)
  const updateConnection = async (connection) => {
    connection.persistenceState = PersistenceStateEnum.PERSISTED;

    const index = connections.findIndex((c) => {
      return c.connectionId === connection.connectionId;
    });

    let newConnections = [...(connections || [])];
    if (index !== -1) {
      newConnections.splice(index, 1, connection);
    } else {
      newConnections.push(connection);
    }
    setConnections(newConnections);
    updateContacts(newConnections);
  };

  const updateContacts = (connections) => {
    let updatedContacts = [];
    const valid = (contact) => {
      return contactValidationSchema.isValidSync(contact);
    };
    const known = (contact) => {
      return updatedContacts.some((c) => {
        return (
          c.title === contact.title &&
          c.given_name === contact.given_name &&
          c.family_name === contact.family_name
        );
      });
    };
    const check = (contact) => {
      if (valid(contact) && !known(contact)) {
        updatedContacts.push(contact);
      }
    };
    if (connections.length > 0) {
      connections.forEach((connection) => check(connection.contactDetails));
      // we check the secondary contact details after all the primary contacts
      // have been added to make sure we don't miss ID details for any of the
      // primary contacts
      connections.forEach((connection) =>
        check(connection.secondaryContactDetails),
      );
    }

    setContacts(updatedContacts);
  };

  const handleEditConnection = async (connection) => {
    setEditingProperty(connection);
    setPropertyModalOpen(true);
  };

  const handleDeleteConnection = async (connection) => {
    setDeleteModalConnection(connection);
  };

  const deleteConnection = async (connection) => {
    const newConnections = (connections || []).filter(
      (c) => c.connectionId !== connection.connectionId,
    );
    if (newConnections.length !== (connections || []).length) {
      setConnections(newConnections);
      updateContacts(newConnections);
    }
  };

  const handleDeleteModalClose = (connection) => {
    if (connection) deleteConnection(connection);
    setDeleteModalConnection(null);
  };

  const addButton = (
    <Stack direction="row" justifyContent="end" sx={{ mt: 3, mr: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        sx={{ pl: 3 }}
        onClick={() => {
          setEditingProperty(null);
          setPropertyModalOpen(true);
        }}
      >
        {connections != null && connections.length > 0 ? (
          <span>Add another property</span>
        ) : (
          <span>Add a property</span>
        )}
        <AddCircleOutlineOutlinedIcon fontSize="small" sx={{ ml: 1.5 }} />
      </Button>
      <Modal
        open={propertyModalOpen}
        sx={{
          width: { xs: "96vw", sm: "90vw" },
          height: { xs: "98vh", sm: "90vh" },
          overflow: "auto",
        }}
      >
        <Box
          sx={[
            {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              maxWidth: { xs: "90vw", sm: "80vh", md: "75vw" },
              boxSizing: "border-box",
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: "90vh",
              p: { xs: 2, sm: 4 },
              bgcolor: "background.paper",
              border: "2px solid #000",
              borderRadius: 4,
              boxShadow: 24,
            },
          ]}
        >
          <PropertyForm
            property={editingProperty}
            contacts={contacts}
            primaryContact={primaryContact}
            title={editingProperty ? "Update Property" : "Add Property"}
            actionLabel={editingProperty ? "Update" : "Add"}
            handleUpdate={updateConnection}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </Stack>
  );

  const connectionListing = (connection) => {
    return (
      <div
        key={
          connection.connectionId
            ? `connection-${connection.connectionId}`
            : "new-connection"
        }
      >
        <Accordion
          expanded={expanded === `connection-${connection.connectionId}`}
          onChange={handleChange(`connection-${connection.connectionId}`)}
          elevation={0}
          sx={{ border: 0, bgcolor: "white" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`connection-${connection.id}-header`}
          >
            <PropertyLabel connection={connection} />
          </AccordionSummary>
          <AccordionDetails>
            <PropertySummary
              connection={connection}
              handleEditConnection={handleEditConnection}
              handleDeleteConnection={handleDeleteConnection}
            />
          </AccordionDetails>
        </Accordion>
        <Divider />
      </div>
    );
  };

  const content = (
    <Stack justifyContent="end" sx={{ mt: 2 }} className="fadein">
      {!(connections && connections.length) ? (
        addButton
      ) : (
        <>
          <Card raised sx={{ mt: 3, borderRadius: 3, bgcolor: "white" }}>
            <CardContent>
              {connections.map((connection) => connectionListing(connection))}
              {addButton}
            </CardContent>
          </Card>
          {deleteModalConnection !== null && (
            <DeletePropertyModal
              connection={deleteModalConnection}
              handleClose={handleDeleteModalClose}
            />
          )}
        </>
      )}
    </Stack>
  );

  return content;
}
