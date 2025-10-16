"use client";

import { ThemeProvider, CssBaseline, Typography } from "@mui/material";
import { getTheme } from "@/theme";
import React, { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [mode, setMode] = useState(null); // null пока не определено

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(darkQuery.matches ? "dark" : "light");

    const handler = (e) => setMode(e.matches ? "dark" : "light");
    darkQuery.addEventListener("change", handler);
    return () => darkQuery.removeEventListener("change", handler);
  }, []);

  // Пока не знаем тему — возвращаем null или loader
  if (!mode) {
    return (
      <html lang="ru">
        <body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              color: "#808080",
            }}
          >
            <Typography variant="h6">Загрузка...</Typography>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="ru">
      <head>
        <title>Заявки на перевозку</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
