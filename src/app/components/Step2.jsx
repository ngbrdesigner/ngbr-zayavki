"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import PrivacyDialog from "./PrivacyDialog";
import { RadioGroup, Radio } from "@mui/material";

const TextFieldLocal = React.memo(
  ({
    label,
    Icon,
    value,
    onChange,
    multiline,
    rows,
    validator,
    format,
    inputRef,
    onKeyDown,
  }) => {
    const [localValue, setLocalValue] = useState(value || "");
    const [error, setError] = useState(false);

    useEffect(() => {
      setLocalValue(value || "");
    }, [value]);

    const handleBlur = () => {
      let val = localValue;
      if (format) val = format(val);
      if (validator) setError(!validator(val));
      onChange(val);
      setLocalValue(val);
    };

    return (
      <TextField
        fullWidth
        margin="normal"
        label={label}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        error={error}
        helperText={error ? "Некорректное значение" : ""}
        multiline={multiline}
        rows={rows}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
        slotProps={{
          input: {
            startAdornment: Icon && (
              <InputAdornment position="start">
                <Icon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  }
);

const CheckboxLocal = React.memo(({ checked, onChange, label }) => {
  const [localChecked, setLocalChecked] = useState(Boolean(checked));

  useEffect(() => {
    setLocalChecked(Boolean(checked));
  }, [checked]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={localChecked}
          onChange={(e) => {
            setLocalChecked(e.target.checked);
            onChange(e.target.checked);
          }}
        />
      }
      label={label}
      sx={{ typography: { mt: 0.3, fontSize: "0.875rem", lineHeight: 1.2 } }}
    />
  );
});

export default function Step2({ formData, onChange, handleSubmit }) {
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const fieldsRef = React.useRef([]);

  const handleChange = (field) => (val) =>
    onChange(field)({ target: { value: val } });

  const handleEnterFocus = (index, isMultiline) => (e) => {
    if (e.key === "Enter") {
      if (isMultiline) return; // для сообщения Enter — новая строка

      e.preventDefault();
      const next = fieldsRef.current[index + 1];
      if (next) {
        next.focus();
      } else {
        e.target.blur();
        handleSubmit();
      }
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <RadioGroup
        value={formData.personType || "physical"}
        onChange={(e) =>
          onChange("personType")({ target: { value: e.target.value } })
        }
        sx={{ mb: 1 }}
      >
        <FormControlLabel
          value="physical"
          control={<Radio />}
          label="Физическое лицо"
        />
        <FormControlLabel
          value="legal"
          control={<Radio />}
          label="Юридическое лицо"
        />
      </RadioGroup>

      {formData.personType === "legal" && (
        <TextFieldLocal
          label="Название организации *"
          Icon={BusinessIcon}
          value={formData.company}
          onChange={handleChange("company")}
          inputRef={(el) => (fieldsRef.current[0] = el)}
          onKeyDown={handleEnterFocus(0, false)}
        />
      )}

      <TextFieldLocal
        label="Ваше имя *"
        Icon={PersonIcon}
        value={formData.name}
        onChange={handleChange("name")}
        inputRef={(el) => (fieldsRef.current[1] = el)}
        onKeyDown={handleEnterFocus(1, false)}
      />

      <TextFieldLocal
        label="Телефон *"
        Icon={PhoneIcon}
        type="tel"
        value={formData.phone}
        onChange={handleChange("phone")}
        inputRef={(el) => (fieldsRef.current[2] = el)}
        onKeyDown={handleEnterFocus(2, false)}
      />
      <TextFieldLocal
        label="E-mail"
        Icon={EmailIcon}
        value={formData.email}
        onChange={handleChange("email")}
        inputRef={(el) => (fieldsRef.current[3] = el)}
        onKeyDown={handleEnterFocus(3, false)}
      />

      <TextFieldLocal
        label="Сообщение"
        Icon={MessageIcon}
        value={formData.message}
        onChange={handleChange("message")}
        multiline
        rows={3}
        inputRef={(el) => (fieldsRef.current[4] = el)}
        onKeyDown={handleEnterFocus(4, true)}
      />

      <Box sx={{ mt: 1, mb: 3 }}>
        <Typography variant="body2">
          Нажимая кнопку «Отправить», вы соглашаетесь с{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            sx={{ p: 0, minWidth: 0 }}
            onClick={() => setOpenPrivacy(true)}
          >
            политикой конфиденциальности
          </span>{" "}
          и даёте согласие на обработку персональных данных.
        </Typography>
      </Box>

      <PrivacyDialog open={openPrivacy} onClose={() => setOpenPrivacy(false)} />
    </Box>
  );
}
