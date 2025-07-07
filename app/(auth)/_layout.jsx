import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded)
  {
    return null //this if for a better user experience
  }

  if (isSignedIn) 
  {
    return <Redirect href={'/'} />
  }

  return (
      <Stack screenOptions={{headerShown: false}}/>
  )
}