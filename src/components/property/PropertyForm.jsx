import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import {
  Grid,
  Button,
  Stack,
  Box,
  Typography,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SolarPowerOutlinedIcon from "@mui/icons-material/SolarPowerOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import { AppDataContext } from "../data/AppDataContext";
import LocationForm from "./LocationForm";
import ContactDetailsForm from "./ContactDetailsForm";
import PlanForm from "./PlanForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import MoveInForm from "./MoveInForm";
import HardwareForm from "./HardwareForm";
import ConcessionCardForm from "./ConcessionCardForm";
import LifeSupportForm from "./LifeSupportForm";
import BillingForm from "./BillingForm";
import FormHeader from "../shared/FormHeader";

import MoveInDate from "./summary/MoveInDate";
import Concession from "./summary/Concession";
import LifeSupport from "./summary/LifeSupport";
import Hardware from "./summary/Hardware";
import ContactDetails from "./summary/ContactDetails";

import NMIvalidation from "../../util/NMIvalidator";
import { getSignupPlans } from "../../util/plans";
import PersistenceStateEnum from "../../constants/persistenceStateEnum";
import {
  addressValidationSchema,
  moveInValidationSchema,
  concessionValidationSchema,
  lifeSupportValidationSchema,
  contactValidationSchema,
  contactValidationSchemaWithID,
  businessDetailsValidationSchema,
  paymentValidationSchema,
} from "../../util/formValidation";

PropertyForm.propTypes = {
  property: PropTypes.object,
  contacts: PropTypes.array,
  primaryContact: PropTypes.object,
  title: PropTypes.string,
  actionLabel: PropTypes.string,
  handleUpdate: PropTypes.func,
  handleClose: PropTypes.func,
};

const defaultContact = (contacts, primaryContact) => {
  const title = primaryContact?.title || "";
  const given_name = primaryContact?.given_name || "";
  const family_name = primaryContact?.family_name || "";
  const email = primaryContact?.email || "";
  const phone_number = primaryContact?.phone_number || "";

  const existing = (contacts || []).find(
    (c) =>
      c.title === title &&
      c.given_name === given_name &&
      c.family_name === family_name,
  );

  if (existing) return existing;

  return {
    title,
    given_name,
    family_name,
    email,
    phone: phone_number || "",
    dob: null,
    idType: "",
    idNumber: "",
    idExpiry: null,
  };
};

export default function PropertyForm({
  property,
  contacts,
  primaryContact,
  title = "Add property",
  actionLabel = "Add",
  handleUpdate,
  handleClose,
}) {
  const { user, appData } = useContext(AppDataContext);
  const plan = appData?.plan || null;
  const address = appData?.address ? appData.address : null;

  const [item, setItem] = useState(
    property || {
      customerEmail: user?.email || "",
      connectionId: "",
      plan: plan || null,
      address: {
        address_identifier: address?.address_identifier || "",
        site_identifier: "",
        site_suburb: address?.site_suburb || "",
        site_state: address?.site_state || "",
        site_post_code: address?.site_post_code || "",
        site_street_no: address?.site_street_no || "",
        site_street_no_suffix: "",
        site_street_name: address?.site_street_name || "",
        site_street_suffix: address?.site_street_suffix || "",
        site_street_type_code: address?.site_street_type_code || "",
        site_unit_no: address?.site_unit_no || "",
        site_unit_type: address?.site_unit_type || "",
        site_floor_no: address?.site_floor_no || "",
        site_floor_type: address?.site_floor_type || "",
        site_lot_no: address?.site_lot_no || "",
        site_formatted_address: address?.site_formatted_address || "",
      },
      nmi: "",
      moveInFlag: "",
      moveInDate: null,
      hardwareFlags: {
        solar: "",
        battery: "",
        hot_water: "",
        heating: "",
        cooling: "",
        water_pump: "",
        swimming_pool: "",
        ev: "",
        smart_devices: "",
      },
      concession: {
        flag: "",
      },
      lifeSupportFlag: "",
      lifeSupportMachineType: "",
      lifeSupportNotes: "",
      confirmed: false,
      abn_number: "",
      business_name: "",
      contactDetails: defaultContact(contacts, primaryContact),
      secondaryContactDetails: {
        title: "",
        given_name: "",
        family_name: "",
        email: "",
        phone: "",
        dob: null,
      },
      payment: {
        method: "DIRECT",
        bsb: "",
        account: "",
        accountName: "",
        direct_debit_terms_accepted: null,
        direct_debit_consent_bundle: null,
      },
      persistenceState: PersistenceStateEnum.NEW,
      msats: null,
    },
  );

  const [validity, setValidity] = useState({
    location: false,
    contact: false,
    secondaryContact: false,
    moveIn: false,
    concession: false,
    lifeSupport: false,
    billing: false,
    business: false,
  });

  useEffect(
    () => {
      setValidity({
        location:
          item.msats !== null ||
          addressValidationSchema.isValidSync(item.address),
        moveIn: moveInValidationSchema.isValidSync({
          flag: item.moveInFlag,
          date: item.moveInDate,
        }),
        concession: concessionValidationSchema.isValidSync(item.concession),
        lifeSupport: lifeSupportValidationSchema.isValidSync({
          flag: item.lifeSupportFlag,
          machineType: item.lifeSupportMachineType,
          notes: item.lifeSupportNotes,
        }),
        contact: isHomePlan()
          ? contactValidationSchemaWithID.isValidSync(item.contactDetails)
          : contactValidationSchema.isValidSync(item.contactDetails),
        secondaryContact:
          isSecondaryContactEmpty() ||
          contactValidationSchema.isValidSync(item.secondaryContactDetails),
        business: businessDetailsValidationSchema.isValidSync({
          business_name: item.business_name,
          abn_number: item.abn_number,
        }),
        billing: paymentValidationSchema.isValidSync(item.payment),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item],
  );

  const [eligiblePlans, setEligiblePlans] = useState([]);

  useEffect(
    () => {
      if (!item.msats && !item.address) {
        setEligiblePlans([]);
      } else if (!item.msats && item.address) {
        getSignupPlans({
          postcode: item.address?.site_post_code || null,
        }).then((plans) => {
          setEligiblePlans(plans);
          if (plans.length === 1 && !item.plan) {
            setItem({
              ...item,
              plan: plans[0],
            });
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.address],
  );

  useEffect(
    () => {
      const updatePlans = (address, plans) => {
        setEligiblePlans(plans);
        if (plans.length === 1) {
          setItem({
            ...item,
            address: address,
            plan: plans[0],
          });
        } else {
          setItem({
            ...item,
            address: address,
            plan:
              item.plan &&
              plans.some((p) => p.price_plan_code === item.plan.price_plan_code)
                ? item.plan
                : null,
          });
        }
      };

      if (item.msats) {
        let address = {
          site_identifier: "",
          site_suburb: item.msats.address.site_suburb || "",
          site_state: item.msats.address.site_state || "",
          site_post_code: item.msats.address.site_post_code || "",
          site_street_no: item.msats.address.site_street_no || "",
          site_street_no_suffix: item.msats.address.site_street_no_suffix || "",
          site_street_name: item.msats.address.site_street_name || "",
          site_street_suffix: item.msats.address.site_street_suffix || "",
          site_street_type_code: item.msats.address.site_street_type_code || "",
          site_unit_no: item.msats.address.site_unit_no || "",
          site_unit_type: item.msats.address.site_unit_type || "",
          site_floor_no: item.msats.address.site_floor_no || "",
          site_floor_type: item.msats.address.site_floor_type || "",
          site_lot_no: item.msats.address.site_lot_no || "",
        };
        address.site_formatted_address = `${address.site_street_no} ${address.site_street_name} ${address.site_street_type_code}, ${address.site_suburb} ${address.site_state} ${address.site_post_code}`;

        if (item.msats?.tariffCode) {
          getSignupPlans({
            network_tariff_code: item.msats.tariffCode,
            postcode: item.msats.site_post_code || null,
          }).then((plans) => updatePlans(address, plans));
        } else {
          updatePlans(address, []);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.msats],
  );

  const [activeStep, setActiveStep] = useState(
    appData?.address ? 0 : plan ? 2 : address ? 1 : 0,
  );

  const [hardwareFormSeen, setHardwareFormSeen] = useState(!!property);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(maxStepEnabled(), prevActiveStep + 1),
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(maxStepEnabled(), prevActiveStep - 1),
    );
  };

  const handleStep = (step) => () => {
    if (step <= maxStepEnabled()) {
      setActiveStep(step);
    }
  };

  useEffect(
    () => {
      const element = document.querySelector(`#step-${activeStep}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }, 500);
      }
      if (activeStep === 3 && !hardwareFormSeen) {
        setHardwareFormSeen(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep],
  );

  const maxStepEnabled = () => {
    if (!validity.location) return 0;
    if (!isPlanComplete()) return 1;
    return 999;
  };

  const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundColor: "green",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
  }));

  function StepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <LocationOnOutlinedIcon />,
      2: <BoltOutlinedIcon />,
      3: <ChecklistOutlinedIcon />,
      4: <SolarPowerOutlinedIcon />,
      5: <PersonOutlineOutlinedIcon />,
      6: <AccountBalanceOutlinedIcon />,
    };

    return (
      <StepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </StepIconRoot>
    );
  }
  StepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  const handleNmiPublicMatch = (match) => {
    console.log(match);
    setItem((prev) => ({
      ...prev,
      connectionId: match.publicId, // carry to backend
      nmi: match.maskedNmi, // for display only
      msats: match,
      address: {
        ...prev.address,
        ...match.address,
        site_identifier: match.nmi,
      },
    }));
  };

  const handlePublicSelection = (match) => {
    handleNmiPublicMatch(match);
  };

  const handleAddressChange = (address) => {
    if (address) setItem((prev) => ({ ...prev, address }));
  };

  const handlePlanChange = (plan) => {
    setItem({ ...item, plan: plan });
  };

  const handleBusinessDetailsChange = (details) => {
    setItem({
      ...item,
      ...details,
    });
  };

  const handleMoveInChange = (data) => {
    setItem({ ...item, moveInFlag: data.flag, moveInDate: data.date });
  };

  const handleConcessionCardChange = (changes) => {
    setItem({
      ...item,
      concession: { ...item.concession, ...changes },
    });
  };

  const handleLifeSupportChange = (lifeSupport) => {
    setItem({
      ...item,
      lifeSupportFlag: lifeSupport.flag,
      lifeSupportMachineType: lifeSupport.machineType,
      lifeSupportNotes: lifeSupport.notes,
    });
  };

  const handleHardwareChange = (flags) => {
    setItem({
      ...item,
      hardwareFlags: { ...item.hardwareFlags, ...flags },
    });
  };

  const handleContactDetailsChange = (changes) => {
    const newItem = {
      ...item,
      contactDetails: { ...item.contactDetails, ...changes },
    };
    setItem(newItem);
  };

  const handleSecondaryContactDetailsChange = (changes) => {
    const newItem = {
      ...item,
      secondaryContactDetails: { ...item.secondaryContactDetails, ...changes },
    };
    setItem(newItem);
  };

  const handleBillingChange = (changes) => {
    const newItem = {
      ...item,
      payment: { ...item.payment, ...changes },
    };
    setItem(newItem);
  };

  const isNMIComplete = () => {
    return item.nmi && NMIvalidation(item.nmi) && item.msats != null;
  };

  const isPlanComplete = () => {
    return !!item.plan;
  };

  const isHomePlan = () => {
    return item.plan?.customer_type === "RESIDENTIAL";
  };

  const isBusinessPlan = () => {
    return item.plan?.customer_type === "BUSINESS";
  };

  const isSecondaryContactEmpty = () => {
    return (
      !item.secondaryContactDetails.title &&
      !item.secondaryContactDetails.given_name &&
      !item.secondaryContactDetails.family_name &&
      !item.secondaryContactDetails.email &&
      !item.secondaryContactDetails.phone &&
      !item.secondaryContactDetails.dob
    );
  };

  const hasSecondaryContact = () => {
    return !isSecondaryContactEmpty();
  };

  const [showSecondaryContact, setShowSecondaryContact] = useState(
    hasSecondaryContact(),
  );

  const toggleSecondaryContact = () => {
    if (showSecondaryContact) {
      setItem({
        ...item,
        secondaryContactDetails: {
          title: "",
          given_name: "",
          family_name: "",
          email: "",
          phone: "",
          dob: null,
        },
      });
    }
    setShowSecondaryContact(!showSecondaryContact);
  };

  const isFormValid = () => {
    return (
      validity.location &&
      isPlanComplete() &&
      areContactDetailsValid() &&
      areDetailsValid() &&
      validity.billing
    );
  };

  const areDetailsValid = () => {
    if (isHomePlan()) {
      return validity.moveIn && validity.concession && validity.lifeSupport;
    }
    return validity.moveIn;
  };

  const areContactDetailsValid = () => {
    return (
      validity.contact &&
      validity.secondaryContact &&
      item.contactDetails.email !== item.secondaryContactDetails.email &&
      (isHomePlan() || validity.business)
    );
  };

  const stepCompleted = (index) => {
    switch (index) {
      case 0:
        return validity.location;
      case 1:
        return isPlanComplete();
      case 2:
        return areDetailsValid();
      case 3:
        return hardwareFormSeen;
      case 4:
        return areContactDetailsValid();
      case 5:
        return validity.billing;
      default:
        return false;
    }
  };

  const step = ({ index, heading, subheading, content, final = false }) => {
    return (
      <Step
        key={index}
        id={`step-${index}`}
        sx={{
          mb: 2,
          borderBottom: final ? "none" : 1,
          borderColor: "subtle.dark",
        }}
      >
        <StepLabel
          StepIconComponent={StepIcon}
          StepIconProps={{ completed: stepCompleted(index) }}
          slotProps={{
            label: { sx: { mt: { xs: 1.3, sm: 0.6 }, ml: { xs: 1, sm: 4 } } },
          }}
          sx={{
            cursor: maxStepEnabled() < index ? "cursor" : "pointer",
            alignItems: "flex-start",
            mx: 2,
          }}
          onClick={handleStep(index)}
        >
          <FormHeader heading={heading} subheading={subheading} />
        </StepLabel>
        <StepContent
          sx={{
            ml: { xs: 2, sm: 5 },
            mr: { xs: 2, sm: 2 },
            pl: { xs: 1, sm: 3 },
            pr: { xs: 1, sm: 0 },
            pb: 4,
            border: "none",
          }}
        >
          <Stack
            direction="column"
            justifyContent="end"
            sx={{ ml: { xs: 0, sm: 5 }, position: "relative" }}
          >
            {content}
            <Box
              sx={{
                mt: 2,
              }}
            >
              <div>
                {!final && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={maxStepEnabled() <= index || !item.msats}
                    sx={{ mt: 1, mr: 2, px: 5 }}
                  >
                    Next
                  </Button>
                )}
                {index !== 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                )}
              </div>
            </Box>
          </Stack>
        </StepContent>
      </Step>
    );
  };

  return (
    <Stack
      spacing={0}
      alignItems="center"
      sx={{ position: "relative", height: 1, mt: 3 }}
    >
      <Stepper
        nonLinear
        connector={null}
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          mx: 2,
          maxWidth: "lg",
          width: 1,
        }}
      >
        {step({
          index: 0,
          heading: title,
          subheading: !validity.location ? null : (
            <>
              {isNMIComplete() && (
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: "primary.main",
                    fontSize: "1rem",
                  }}
                >
                  NMI: {item.nmi}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{ mt: 1, fontWeight: "bold", color: "primary.main" }}
              >
                {item.address.site_formatted_address}
              </Typography>
            </>
          ),
          content: (
            <LocationForm
              property={item}
              handleNmiPublicMatch={handleNmiPublicMatch}
              handlePublicSelection={handlePublicSelection}
              handleAddressChange={handleAddressChange}
              onCancel={handleClose}
            />
          ),
        })}

        {step({
          index: 1,
          heading: "Plan",
          subheading:
            activeStep === 1 ? (
              "Choose your plan"
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 1, fontWeight: "bold", color: "primary.main" }}
              >
                {item.plan?.short_display_name}
              </Typography>
            ),
          content: (
            <PlanForm
              plan={item.plan}
              eligiblePlans={eligiblePlans}
              handlePlanChange={handlePlanChange}
              msats={item.msats}
            />
          ),
        })}

        {step({
          index: 2,
          heading: "Details",
          subheading:
            activeStep === 2 ||
            !validity.moveIn ||
            (isHomePlan() &&
              (!validity.concession || !validity.lifeSupport)) ? (
              "We need to know a little more about the property"
            ) : (
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                <MoveInDate
                  connection={item}
                  dateFormat="ccc d LLL yyyy"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                />
                {isHomePlan() && (
                  <Concession
                    connection={item}
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  />
                )}
                {isHomePlan() && (
                  <LifeSupport
                    connection={item}
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  />
                )}
              </Stack>
            ),
          content: (
            <>
              <MoveInForm
                moveIn={{ flag: item.moveInFlag, date: item.moveInDate }}
                handleMoveInChange={handleMoveInChange}
              />
              {isHomePlan() && (
                <>
                  <ConcessionCardForm
                    address={item.address}
                    concessionCard={item.concession}
                    handleConcessionCardChange={handleConcessionCardChange}
                  />
                  <LifeSupportForm
                    lifeSupport={{
                      flag: item.lifeSupportFlag,
                      machineType: item.lifeSupportMachineType,
                      notes: item.lifeSupportNotes,
                    }}
                    handleLifeSupportChange={handleLifeSupportChange}
                  />
                </>
              )}
            </>
          ),
        })}

        {step({
          index: 3,
          heading: "Hardware",
          subheading:
            activeStep === 3 || !hardwareFormSeen ? (
              "We can help out with a range of hardware that can help you take advantage of our pricing, and drop your bills even lower."
            ) : (
              <Hardware
                connection={item}
                color="primary"
                sx={{ fontWeight: "bold" }}
              />
            ),
          content: (
            <HardwareForm
              hardwareFlags={item.hardwareFlags}
              handleHardwareChange={handleHardwareChange}
            />
          ),
        })}

        {step({
          index: 4,
          heading: "Contact Details",
          subheading:
            activeStep === 4 || !validity.contact ? (
              "Add contact details for this property"
            ) : (
              <Box sx={{ mt: 1 }}>
                <ContactDetails
                  connection={item}
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>
            ),
          content: (
            <>
              <FormControl sx={{ mt: 2 }} fullWidth>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ borderBottom: 1, borderColor: "subtle.dark" }}
                >
                  <Typography variant="h5">Primary Contact</Typography>
                </Stack>
                <ContactDetailsForm
                  idRequired={isHomePlan()}
                  details={item.contactDetails}
                  contacts={contacts}
                  excludeEmail={item.secondaryContactDetails.email}
                  handleDetailsChange={handleContactDetailsChange}
                  excludeExistingContacts
                  lockCoreDetails
                />
                {isBusinessPlan() && (
                  <BusinessDetailsForm
                    details={{
                      business_name: item.business_name,
                      abn_number: item.abn_number,
                    }}
                    handleBusinessDetailsChange={handleBusinessDetailsChange}
                  />
                )}
              </FormControl>
              <FormControl sx={{ mt: 2 }} fullWidth>
                <>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      borderBottom: showSecondaryContact ? 1 : null,
                      borderColor: showSecondaryContact ? "subtle.dark" : null,
                    }}
                  >
                    <Typography variant="h5">
                      Secondary Contact
                      <Button
                        variant="text"
                        color="secondary"
                        sx={{ ml: 2, my: 0.5, fontSize: "small" }}
                        onClick={toggleSecondaryContact}
                      >
                        {showSecondaryContact ? "Remove" : "Add"}
                      </Button>
                    </Typography>
                  </Stack>

                  {showSecondaryContact && (
                    <ContactDetailsForm
                      idRequired={false}
                      details={item.secondaryContactDetails}
                      contacts={contacts}
                      excludeEmail={item.contactDetails.email}
                      handleDetailsChange={handleSecondaryContactDetailsChange}
                    />
                  )}
                </>
              </FormControl>
            </>
          ),
        })}

        {step({
          index: 5,
          heading: "Billing",
          subheading:
            activeStep === 5 || !validity.billing ? (
              "Select payment method"
            ) : (
              <>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontWeight: "bold", color: "primary.main" }}
                >
                  {item.payment.method}
                </Typography>
                {item.payment.method === "Direct debit" && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        color: "primary.main",
                        fontSize: "1rem",
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        {`BSB: ${item.payment.bsb}`}
                      </span>
                      {`Account: ${item.payment.account}`}
                    </Typography>
                  </>
                )}
              </>
            ),
          final: true,
          content: (
            <BillingForm
              payment={item.payment}
              handleBillingChange={handleBillingChange}
            />
          ),
        })}
      </Stepper>

      <Grid
        item
        xs={12}
        sx={{
          position: "sticky",
          bottom: 0,
          width: 1,
          p: 2,
          bgcolor: "subtle.light",
          borderTop: 1,
          borderColor: "subtle.dark",
          zIndex: 10,
        }}
      >
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="outlined"
            sx={{ px: 4 }}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ px: 4 }}
            disabled={!isFormValid()}
            onClick={() => {
              handleUpdate(item);
              handleClose();
            }}
          >
            {actionLabel}
          </Button>
        </Stack>
      </Grid>
    </Stack>
  );
}
