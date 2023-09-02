import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  apliqoAliceBlue,
  getDateFromObj,
  management,
  monthNames,
} from "../utils/utils";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: apliqoAliceBlue,
        },
      },
    },
  },
  palette: {
    primary: {
      main: apliqoAliceBlue,
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const style = {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#202E39",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const NewCardForm = ({ open, item, handleClose, postNewCard, updateCard }) => {
  const { id = null } = item;
  const [dateValue, setDateValue] = useState(new Date());
  const [formValues, setFormValues] = useState({});
  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleCheckboxChange = (event, checked) => {
    const { name } = event.target;
    if (!checked) {
      const copy = { ...formValues };
      delete copy[name];
      setFormValues(copy);
    } else {
      setFormValues({
        ...formValues,
        [name]: checked,
      });
    }
  };
  const handleDateChange = (value) => {
    let dateObj = new Date(value);

    let month = dateObj.getUTCMonth(); //months from 0-11
    let year = dateObj.getUTCFullYear();
    setFormValues({
      ...formValues,
      cardDate: monthNames[month] + " " + year,
      cardDateObj: {
        year,
        month: month + 1,
      },
    });
    setDateValue(dateObj);
  };

  const handleSubmit = () => {
    id ? updateCard(id, formValues) : postNewCard(formValues);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-new-title"
      aria-describedby="modal-new-description"
    >
      <ThemeProvider theme={theme}>
        <Fade timeout={500} in={open}>
          <Box sx={style}>
            <form style={{ width: "100%" }}>
              <FormControl sx={{ width: "inherit" }}>
                <FormLabel sx={{ color: apliqoAliceBlue, mt: 2 }}>
                  Card Title
                </FormLabel>
                <TextField
                  sx={{ input: { color: apliqoAliceBlue }, mt: 2 }}
                  color="primary"
                  label={"Title"}
                  defaultValue={item.cardSubtitle || "Title"}
                  name="cardSubtitle"
                  type="text"
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  required
                ></TextField>
                <TextField
                  sx={{ input: { color: apliqoAliceBlue }, mt: 2 }}
                  name="cardDetailedText"
                  label={"Detailed Text"}
                  defaultValue={item.cardDetailedText || ""}
                  type="text"
                  variant="outlined"
                  onChange={handleTextFieldChange}
                  required
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ input: { color: apliqoAliceBlue }, mt: 2 }}
                    value={
                      Object.keys(item).length
                        ? dayjs(getDateFromObj(item))
                        : dayjs(dateValue)
                    }
                    label={'"month" and "year"'}
                    views={["month", "year"]}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>

                <FormControlLabel
                  control={
                    <Checkbox name="major" onChange={handleCheckboxChange} />
                  }
                  label={management.MAJOR_CLIENT}
                />
                <FormControlLabel
                  control={
                    <Checkbox name="office" onChange={handleCheckboxChange} />
                  }
                  label={management.OFFICE}
                />
                <FormControlLabel
                  control={
                    <Checkbox name="product" onChange={handleCheckboxChange} />
                  }
                  label={management.PRODUCT}
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </ThemeProvider>
    </Modal>
  );
};

NewCardForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  postNewCard: PropTypes.func,
};

export default NewCardForm;
