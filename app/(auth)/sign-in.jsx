import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import {useState} from 'react'
import {styles} from "@/assets/styles/auth.styles"
import {Ionicons} from "@expo/vector-icons"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { useTheme } from '../../hooks/colourContext';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [error, setError] = useState('') 

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const { theme } = useTheme();

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {

      console.error(JSON.stringify(err, null, 2))

      if(err.errors?.[0]?.code==="form_password_incorrect")
      {
        setError("Password is incorrect. Please try again.");
      }
      else if(err.errors?.[0]?.code==="form_identifier_not_found")
      {
        setError("Account not found.");
      }
      else 
      {
        setError("An error occurred. Please try again.")
      }

    }
  }
  
  return (
    <KeyboardAwareScrollView
    style={{flex: 1}}
    contentContainerStyle={{ flexGrow: 1 }}
    enableAutomaticScroll = {true}
    enableOnAndroid = {true}>

      <View style={[styles.container, {backgroundColor: theme.background}]}>
              <Image source={require("../../assets/images/revenue-i3.png")} 
              style={styles.illustration}
              />

      <Text style={[styles.title, {color: theme.text}]}>Welcome Back!</Text>

      {/* triggers when there is an error */}
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name = "alert-circle" size={20} color={theme.expense}/>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name = "close" size={20} color={theme.textlight}/>
            </TouchableOpacity>
          </View>
        ) : null}

      <TextInput
          style={[styles.input, 
                {backgroundColor: theme.white, borderColor: theme.border, color: theme.text}, 
                error && {borderColor: theme.expense}]}
          autoCapitalize="none"
          value={emailAddress} 
          placeholderTextColor={theme.text}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />

      <TextInput
          style={[styles.input, 
                {backgroundColor: theme.white, borderColor: theme.border, color: theme.text}, 
                error && {borderColor: theme.expense}]}
          autoCapitalize="none"
          value={password}
          placeholderTextColor={theme.text}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      
      <TouchableOpacity onPress={onSignInPress} style={[styles.button, {backgroundColor: theme.primary}]}>
          <Text style={[styles.buttonText, {color: theme.white}]}>Continue</Text>
      </TouchableOpacity>

      <View style = {styles.footerContainer}>
          <Text style = {[styles.footerText, {color: theme.text}]}>Don&apos;t have an account?</Text>
      <Link href="/sign-up" asChild>
        <TouchableOpacity>
          <Text style={[styles.linkText, {color: theme.primary}]}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
      </View>

      </View>

    </KeyboardAwareScrollView>
  )
}