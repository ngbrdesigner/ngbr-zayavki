import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        // Заданный акцентный красный для обоих режимов
        main: "#E11837",
      },
      secondary: {
        // Нейтральный серый без синих оттенков
        main: mode === "light" ? "#616161" : "#757575",
      },
      background: {
        // Чистый белый для светлого, тёмный графит для темного
        default: mode === "light" ? "#ffffff" : "#121212",
        paper: mode === "light" ? "#f5f5f5" : "#0a0a0aff",
      },
      text: {
        // Тёмный для светлого режима, светлый для темного
        primary: mode === "light" ? "#212121" : "#e0e0e0",
        // Нейтральный серый для менее контрастных текстов
        secondary: mode === "light" ? "#424242" : "#bdbdbd",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: "uppercase", // Строгий стиль кнопок
        fontWeight: 600,
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "medium", // Средний размер для солидности
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: { height: 8 }, // Массивный слайдер
          thumb: { width: 24, height: 24 }, // Увеличенный ползунок
        },
      },
    },
  });
