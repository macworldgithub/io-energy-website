import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  boxShadow: "none",
  "&:before": { display: "none" },
  "&:last-child": { borderBottom: 0 },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2.5, 0),
  minHeight: 72,
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.palette.text.secondary,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 0, 4, 0),
}));

export default function FAQ({ id, question, answer, expanded, setExpanded }) {
  const open = expanded === id;

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded ? id : "");
  };

  return (
    <Accordion expanded={open} onChange={handleChange}>
      <AccordionSummary
        expandIcon={open ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1.05rem", md: "1.15rem" },
            fontWeight: open ? 600 : 500,
            color: open ? "primary.main" : "text.primary",
            pr: 3,
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
          }}
        >
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

FAQ.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  expanded: PropTypes.string.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
