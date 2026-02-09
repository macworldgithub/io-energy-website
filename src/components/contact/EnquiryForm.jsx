import PropTypes from "prop-types";

import { Grid, Button, TextField } from "@mui/material";

import { useFormik } from "formik";
import { enquiryValidationSchema } from "../../util/formValidation";

EnquiryForm.propTypes = {
  fields: PropTypes.array,
  mailto: PropTypes.string,
  subject: PropTypes.string,
  content: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default function EnquiryForm({
  fields = [],
  mailto = "hello@ioenergy.com.au",
  subject = "iO Energy website enquiry",
  content = "",
  buttonLabel = "Submit",
}) {
  let initialValues = {};

  if (fields.includes("name")) initialValues.name = "";
  if (fields.includes("email")) initialValues.email = "";
  if (fields.includes("phone")) initialValues.phone = "";
  if (fields.includes("postcode")) initialValues.postcode = "";
  if (fields.includes("message")) initialValues.message = "";

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: enquiryValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const submissionLink = () => {
    const values = [];
    if (formik.values.name != null)
      values.push(`Name: ${formik.values.name}%0A`);
    if (formik.values.email != null)
      values.push(`Email: ${formik.values.email}%0A`);
    if (formik.values.phone != null)
      values.push(`Phone: ${formik.values.phone}%0A`);
    if (formik.values.postcode != null)
      values.push(`Postcode: ${formik.values.postcode}%0A`);
    if (formik.values.message != null)
      values.push(`Message: ${formik.values.message}%0A`);

    return `mailto:${mailto}?subject=${subject}
&body=Hi iO Energy,%0A%0A
${content && content + "%0A%0A"}
${values.join("")}
`;
  };

  return (
    <Grid
      container
      spacing={1}
      justifyContent={"space-between"}
      sx={{ position: "relative", mt: 1, mb: 3 }}
    >
      {fields.includes("name") && (
        <Grid item xs={12} sx={{ mt: 1.5 }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            data-cy="contact-name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{ sx: { bgcolor: "white" } }}
          />
        </Grid>
      )}
      {fields.includes("email") && (
        <Grid item xs={12} sx={{ mt: 1.5 }}>
          <TextField
            id="email"
            data-cy="contact-email"
            name="email"
            label="Email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{ sx: { bgcolor: "white" } }}
          />
        </Grid>
      )}
      {fields.includes("phone") && (
        <Grid item xs={12} sx={{ mt: 1.5 }}>
          <TextField
            id="phone"
            data-cy="contact-phone-number"
            name="phone"
            label="Phone"
            fullWidth
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            InputProps={{ sx: { bgcolor: "white" } }}
          />
        </Grid>
      )}
      {fields.includes("postcode") && (
        <Grid item xs={12} sx={{ mt: 1.5 }}>
          <TextField
            id="postcode"
            data-cy="contact-postcode"
            name="postcode"
            label="Postcode"
            fullWidth
            value={formik.values.postcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.postcode && Boolean(formik.errors.postcode)}
            helperText={formik.touched.postcode && formik.errors.postcode}
            InputProps={{ sx: { bgcolor: "white" } }}
          />
        </Grid>
      )}
      {fields.includes("message") && (
        <Grid item xs={12} sx={{ mt: 1.5 }}>
          <TextField
            id="message"
            data-cy="contact-message"
            name="message"
            label="Message"
            multiline
            minRows={4}
            fullWidth
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            InputProps={{ sx: { bgcolor: "white" } }}
          />
        </Grid>
      )}
      <Grid item xs={12} sx={{ mt: 1.5 }}>
        <Button
          href={submissionLink()}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: "0.5rem" }}
          disabled={
            !formik.isValid ||
            Object.values(formik.values).every((value) => value === "")
          }
        >
          {buttonLabel}
        </Button>
      </Grid>
    </Grid>
  );
}
