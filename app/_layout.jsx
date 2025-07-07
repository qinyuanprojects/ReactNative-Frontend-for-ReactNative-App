import { Slot } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import SafeScreen from "@/components/SafeScreen"
import { StatusBar } from "expo-status-bar";

//2)
import { ThemeProvider } from '../hooks/colourContext';

export default function RootLayout() 
{

  //2)
  return (
    <ClerkProvider tokenCache={tokenCache}>
    <ThemeProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark"/>
    </ThemeProvider>
    </ClerkProvider>
  );
}
