import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, Alert } from 'react-native'
import {styles} from "@/assets/styles/home.styles";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/colourContext';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const { theme } = useTheme();

  const trySignOut = async () =>
  {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const handleSignOut = async () => 
  {
    Alert.alert
    (
      "Logout","Are you sure you want to logout?",
      [
        {
          text:"Cancel",style:"cancel" 
        },
        {
          text:"Logout",style:"destructive", onPress:trySignOut
        }
      ]
    );
  };

  return (
    <TouchableOpacity style={[styles.logoutButton, {backgroundColor: theme.card}]} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={22} color={theme.primary}/>
    </TouchableOpacity>
  )
}