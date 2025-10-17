"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, TextField, InputAdornment, Slider } from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import PlaceIcon from "@mui/icons-material/Place";
import StraightenIcon from "@mui/icons-material/Straighten";
import ScaleIcon from "@mui/icons-material/Scale";

const SliderField = React.memo(
  ({ label, Icon, unit, min, max, step, value, onChangeCommitted }) => {
    const [localValue, setLocalValue] = useState(value || 0);

    useEffect(() => {
      setLocalValue(value || 0);
    }, [value]);

    // Обработка изменения текстового поля
    const handleInputChange = (e) => {
      let val = e.target.value;
      // Убираем все кроме цифр и точки
      val = val.replace(/[^0-9.]/g, "");
      const numVal = val === "" ? 0 : Number(val);
      setLocalValue(numVal);
    };

    // Сохранение значения при потере фокуса
    const handleBlur = () => {
      const numVal = Number(localValue) || 0;
      onChangeCommitted(numVal);
    };

    return (
      <Box sx={{ mt: 2, mb: 2, width: "100%" }}>
        <TextField
          label={label}
          size="small"
          type="text"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          fullWidth
          slotProps={{
            input: {
              startAdornment: Icon && (
                <InputAdornment position="start">
                  <Icon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: unit && (
                <InputAdornment position="end">{unit}</InputAdornment>
              ),
            },
          }}
        />
        <Slider
          value={Number(localValue) || 0}
          onChange={(e, val) => setLocalValue(val)}
          onChangeCommitted={(e, val) => onChangeCommitted(val)}
          min={min}
          max={max}
          step={step}
          valueLabelDisplay="auto"
          sx={{ mt: 1 }}
        />
      </Box>
    );
  }
);

const TextFieldLocal = React.memo(({ label, Icon, unit, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => onChange(localValue)}
      slotProps={{
        input: {
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: unit && (
            <InputAdornment position="end">{unit}</InputAdornment>
          ),
        },
      }}
    />
  );
});

export default function Step1({ formData, onChange }) {
  const handleChange = useCallback(
    (field) => (val) => onChange(field)({ target: { value: val } }),
    [onChange]
  );

  return (
    <Box sx={{ px: 2 }}>
      <TextFieldLocal
        label="Наименование груза"
        Icon={UnarchiveIcon}
        value={formData.cargoName}
        onChange={handleChange("cargoName")}
      />
      <TextFieldLocal
        label="Место погрузки"
        Icon={PlaceIcon}
        value={formData.loadPlace}
        onChange={handleChange("loadPlace")}
      />
      <TextFieldLocal
        label="Место выгрузки"
        Icon={PlaceIcon}
        value={formData.unloadPlace}
        onChange={handleChange("unloadPlace")}
      />

      <SliderField
        label="Длина, м"
        Icon={StraightenIcon}
        unit="м"
        min={0}
        max={50}
        step={0.1}
        value={formData.length}
        onChangeCommitted={handleChange("length")}
        type="number"
      />
      <SliderField
        label="Ширина, м"
        Icon={StraightenIcon}
        unit="м"
        min={0}
        max={10}
        step={0.1}
        value={formData.width}
        onChangeCommitted={handleChange("width")}
        type="number"
      />
      <SliderField
        label="Высота, м"
        Icon={StraightenIcon}
        unit="м"
        min={0}
        max={10}
        step={0.1}
        value={formData.height}
        onChangeCommitted={handleChange("height")}
        type="number"
      />
      <SliderField
        label="Масса, т"
        Icon={ScaleIcon}
        unit="т"
        min={0}
        max={100}
        step={0.5}
        value={formData.weight}
        onChangeCommitted={handleChange("weight")}
        type="number"
      />
    </Box>
  );
}
