"use client";

import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useTheme } from "@mui/material/styles";
import Script from "next/script";
import SuccessDialog from "./SuccessDialog";
import TopAlert from "./TopAlert";
const steps = ["Информация о грузе", "Контактные данные"];

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function StepperForm() {
  const [user, setUser] = useState(null);
  const theme = useTheme(); // получаем текущую тему
  const [activeStep, setActiveStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [formData, setFormData] = useState({
    cargoName: "",
    loadPlace: "",
    unloadPlace: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    personType: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    privacy: true,
  });

  const handleChange =
    (field, isCheckbox = false) =>
    (e) => {
      const value = isCheckbox ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = (message, severity = "error") => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  const handleSubmit = async () => {
    if (!formData.cargoName || !formData.loadPlace || !formData.unloadPlace) {
      showAlert("Заполните, пожалуйста, основные поля о грузе.");
      setActiveStep(0);
      return;
    }
    if (!formData.name || !formData.phone) {
      showAlert("Заполните контактные данные.");
      setActiveStep(1);
      return;
    }
    if (formData.personType === "legal" && !formData.company) {
      showAlert("Заполните наименование компании.");
      setActiveStep(1);
      return;
    }

    setSending(true);
    try {
      const payload = { ...formData, user };
      const resp = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        setSuccessOpen(true);
      } else {
        const err = await resp.json();
        showAlert("Ошибка: " + (err.message || JSON.stringify(err)));
      }
    } catch (e) {
      showAlert("Ошибка сети: " + e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Paper
      sx={{ p: 2, maxWidth: 720, mx: "auto", overflow: "hidden" }}
      elevation={3}
    >
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <img
          src={theme.palette.mode === "dark" ? "/logo-w.svg" : "/logo-b.svg"}
          alt="Логотип компании"
          style={{ height: 40 }}
        />
      </Box>
      <Typography variant="h5" fontWeight={500} align="center" sx={{ mb: 2 }}>
        Заявка на перевозку груза
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((s) => (
          <Step key={s}>
            <StepLabel>{s}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <AnimatePresence mode="wait">
        {activeStep === 0 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Step1
              formData={formData}
              onChange={handleChange}
              handleNext={handleNext}
            />
          </motion.div>
        )}
        {activeStep === 1 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Step2
              formData={formData}
              onChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <TopAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleCloseAlert}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Назад
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained">
            Далее
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" disabled={sending}>
            {sending ? "Отправка..." : "Отправить"}
          </Button>
        )}
      </Box>
      <SuccessDialog
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          // reset form and return to first step when user closes dialog
          setFormData({
            cargoName: "",
            loadPlace: "",
            unloadPlace: "",
            length: "",
            width: "",
            height: "",
            weight: "",
            name: "",
            company: "",
            email: "",
            phone: "",
            message: "",
            privacy: true,
          });
          setActiveStep(0);
        }}
      />
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Telegram WebApp script loaded");

          if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            console.log("tg.initDataUnsafe:", tg.initDataUnsafe);
            console.log("tg.initDataUnsafe.user:", tg.initDataUnsafe?.user);
            setUser(tg.initDataUnsafe?.user || null);
          } else {
            console.log("Telegram WebApp is still not available after load");
          }
        }}
      />
    </Paper>
  );
}
