import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = (props) => (
  <MuiAccordionSummary
    expandIcon={props.open ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
    {...props}
  />
);
AccordionSummary.propTypes = {
  open: PropTypes.bool,
};

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

FAQ.propTypes = {
  id: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
  expanded: PropTypes.string,
  setExpanded: PropTypes.func,
};

export default function FAQ({ id, question, answer, expanded, setExpanded }) {
  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded ? id : "");
  };

  return (
    <Accordion expanded={expanded === id} onChange={handleChange}>
      <AccordionSummary open={expanded === id}>
        <Typography
          variant="h6"
          fontSize={{ xs: "0.9rem", md: "1rem" }}
          sx={{ pr: 2 }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
