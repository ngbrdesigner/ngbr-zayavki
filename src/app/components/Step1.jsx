"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, TextField, InputAdornment, Slider } from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import PlaceIcon from "@mui/icons-material/Place";
import StraightenIcon from "@mui/icons-material/Straighten";
import ScaleIcon from "@mui/icons-material/Scale";

const SliderField = React.memo(
  ({
    label,
    Icon,
    unit,
    min,
    max,
    step,
    value,
    onChangeCommitted,
    inputRef,
    onKeyDown,
  }) => {
    const [localValue, setLocalValue] = useState(() =>
      value !== undefined && value !== null ? String(value) : "0"
    );

    useEffect(() => {
      setLocalValue(
        value !== undefined && value !== null ? String(value) : "0"
      );
    }, [value]);

    // Обработка изменения текстового поля — сохраняем строку, чтобы не терять разделитель при вводе
    // Поддерживаем и точку, и запятую в качестве десятичного разделителя
    const handleInputChange = (e) => {
      let val = e.target.value;
      // Убираем всё кроме цифр, точки и запятой
      val = val.replace(/[^0-9.,]/g, "");
      val = val.replace(",", ".");
      setLocalValue(val);
    };

    // Сохранение значения при потере фокуса
    const handleBlur = () => {
      // Нормализуем запятую в точку перед конвертацией
      const normalized = String(localValue).replace(",", ".");
      const numVal = Number(normalized) || 0;
      onChangeCommitted(numVal);
      // Сохраняем обратно строковое представление нормализованного значения
      setLocalValue(String(normalized));
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
          inputRef={inputRef}
          onKeyDown={onKeyDown}
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
          onChange={(e, val) => setLocalValue(String(val))}
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

const TextFieldLocal = React.memo(
  ({ label, Icon, unit, value, onChange, inputRef, onKeyDown }) => {
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
        inputRef={inputRef}
        onKeyDown={onKeyDown}
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
  }
);

export default function Step1({ formData, onChange, handleNext }) {
  const fieldsRefs = React.useRef([]);

  const handleChange = useCallback(
    (field) => (val) => onChange(field)({ target: { value: val } }),
    [onChange]
  );

  const handleEnterFocus = (index) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = fieldsRefs.current[index + 1];

      if (next) {
        next.focus();
      } else {
        e.target.blur(); // ← Убираем фокус
        handleNext();
      }
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <TextFieldLocal
        label="Наименование груза *"
        Icon={UnarchiveIcon}
        value={formData.cargoName}
        onChange={handleChange("cargoName")}
        inputRef={(el) => (fieldsRefs.current[0] = el)}
        onKeyDown={handleEnterFocus(0)}
      />
      <TextFieldLocal
        label="Место погрузки *"
        Icon={PlaceIcon}
        value={formData.loadPlace}
        onChange={handleChange("loadPlace")}
        inputRef={(el) => (fieldsRefs.current[1] = el)}
        onKeyDown={handleEnterFocus(1)}
      />
      <TextFieldLocal
        label="Место выгрузки *"
        Icon={PlaceIcon}
        value={formData.unloadPlace}
        onChange={handleChange("unloadPlace")}
        inputRef={(el) => (fieldsRefs.current[2] = el)}
        onKeyDown={handleEnterFocus(2)}
      />

      <SliderField
        label="Длина, м"
        Icon={StraightenIcon}
        unit="м"
        min={0}
        max={100}
        step={0.1}
        value={formData.length}
        onChangeCommitted={handleChange("length")}
        type="number"
        inputRef={(el) => (fieldsRefs.current[3] = el)}
        onKeyDown={handleEnterFocus(3)}
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
        inputRef={(el) => (fieldsRefs.current[4] = el)}
        onKeyDown={handleEnterFocus(4)}
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
        inputRef={(el) => (fieldsRefs.current[5] = el)}
        onKeyDown={handleEnterFocus(5)}
      />
      <SliderField
        label="Масса, т"
        Icon={ScaleIcon}
        unit="т"
        min={0}
        max={300}
        step={0.5}
        value={formData.weight}
        onChangeCommitted={handleChange("weight")}
        type="number"
        inputRef={(el) => (fieldsRefs.current[6] = el)}
        onKeyDown={handleEnterFocus(6)}
      />
    </Box>
  );
}
