//1)
import { createContext, useContext, useState, useEffect } from 'react';
import {THEMES} from "@/constants/colors.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

//Save User Settings
const saveSettings = async (theme) => {
  try {
    const jsonValue = JSON.stringify(theme);
    await AsyncStorage.setItem('@user_settings', jsonValue);
  } catch (e) {
    // saving error
    console.error("Failed to save settings", e);
  }
};
//Load User Settings
const loadSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_settings');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error("Failed to load settings", e);
  }
};

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(THEMES.coffee);

    //Use the Functions for Caches
    const fetchSettings = async () => {
      const userSettings = await loadSettings();
      if (userSettings) {
        setTheme(userSettings);
      }
    };
    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        saveSettings(newTheme);
    };
    useEffect(() => {
    fetchSettings();
    }, []);
    //Use the Functions for Caches

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);