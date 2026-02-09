import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  TextField,
  Stack,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";

import { userValidationSchema } from "../../util/formValidation";

SignupForm.propTypes = {
  handleUserDetailsUpdate: PropTypes.func,
  customerDetails: PropTypes.shape({
    title: PropTypes.string,
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    phone_number: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default function SignupForm({
  handleUserDetailsUpdate,
  customerDetails,
}) {
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: customerDetails?.title || "",
      given_name: customerDetails?.given_name || "",
      family_name: customerDetails?.family_name || "",
      email: customerDetails?.email || "",
      phone: customerDetails?.phone_number || "",
    },
    enableReinitialize: true,
    validationSchema: userValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        // normalise phone to +61 format
        let phone = (values.phone || "").replace(/\s/g, "");
        if (!phone.startsWith("+61") && phone.startsWith("0")) {
          phone = "+61" + phone.substring(1);
        }

        await handleUserDetailsUpdate?.({
          title: values.title,
          given_name: values.given_name,
          family_name: values.family_name,
          phone_number: phone,
          email: values.email,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const haveDetailsChanged = () => true;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit();
      }}
      name="signUpForm"
      id="SignUpForm"
    >
      <Stack>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={1}
          justifyContent={"space-between"}
          sx={{ my: 2 }}
        >
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <FormControl fullWidth>
              <InputLabel
                id="title-label"
                error={formik.touched.title && Boolean(formik.errors.title)}
              >
                Title
              </InputLabel>
              <Select
                id="title"
                name="title"
                data-cy="signup-title"
                value={formik.values.title}
                label="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                sx={{ bgcolor: "white" }}
              >
                <MenuItem value={"MR"}>Mr</MenuItem>
                <MenuItem value={"MRS"}>Mrs</MenuItem>
                <MenuItem value={"MS"}>Ms</MenuItem>
                <MenuItem value={"MISS"}>Miss</MenuItem>
                <MenuItem value={"DR"}>Dr</MenuItem>
              </Select>
              <FormHelperText
                hidden={!(formik.touched.title && Boolean(formik.errors.title))}
                error
              >
                {formik.errors.title}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5}>
            <TextField
              fullWidth
              id="given_name"
              name="given_name"
              label="First Name"
              data-cy="signup-first-name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.given_name}
              error={
                formik.touched.given_name && Boolean(formik.errors.given_name)
              }
              helperText={formik.touched.given_name && formik.errors.given_name}
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
              InputProps={{ sx: { bgcolor: "white" } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5}>
            <TextField
              fullWidth
              id="family_name"
              name="family_name"
              label="Surname"
              data-cy="signup-last-name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.family_name}
              error={
                formik.touched.family_name && Boolean(formik.errors.family_name)
              }
              helperText={
                formik.touched.family_name && formik.errors.family_name
              }
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
              InputProps={{ sx: { bgcolor: "white" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              data-cy="signup-email-number"
              name="email"
              label="Email Address"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
              InputProps={{ sx: { bgcolor: "white" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phone"
              data-cy="signup-phone-number"
              name="phone"
              label="Phone"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
              InputProps={{ sx: { bgcolor: "white" } }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            sx={{ my: 2, px: 4 }}
            type="submit"
            data-cy="signup-button"
            disabled={submitting || !haveDetailsChanged()}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
