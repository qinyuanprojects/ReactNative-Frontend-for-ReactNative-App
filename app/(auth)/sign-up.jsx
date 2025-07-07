import {useState} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import {useRouter } from 'expo-router'
import {styles} from "@/assets/styles/auth.styles"
import {Ionicons} from "@expo/vector-icons"
import {Image} from "expo-image"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { useTheme } from '../../hooks/colourContext';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('') 
  const { theme } = useTheme();

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      
      console.error(JSON.stringify(err, null, 2))

      if(err.errors?.[0]?.code==="form_identifier_exists")
      {
        setError("Email already exists. Please try another.");
      }
      else if(err.errors?.[0]?.code==="form_password_length_too_short")
      {
        setError("Passwords must be 8 characters or more.");
      }
      else 
      {
        setError("An error occurred. Please try again.")
      }
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={[styles.verificationContainer, {backgroundColor: theme.background}]}>
        <Text style={[styles.verificationTitle, {color: theme.text}]}>Verify your email</Text>

        {/* triggers when there is an error */}
        {error ? (
          <View style={[styles.errorBox, {borderLeftColor: theme.expense}]}>
            <Ionicons name = "alert-circle" size={20} color={theme.expense}/>
            <Text style={[styles.errorText, {color: theme.text}]}>{"Something went wrong!"}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name = "close" size={20} color={theme.textlight}/>
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.verificationInput, {backgroundColor: theme.white, borderColor: theme.border, color: theme.text}, error && {borderColor: theme.expense}]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={[styles.button, {backgroundColor: theme.primary}]}>
          <Text style={[styles.buttonText, {color: theme.white}]}>Verify</Text>
        </TouchableOpacity>
      </View> 
    )
  }

  return (
    <KeyboardAwareScrollView
    style={{flex: 1}}
    contentContainerStyle={{ flexGrow: 1 }}
    enableAutomaticScroll = {true}
    enableOnAndroid = {true}
    >
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Image source={require("../../assets/images/revenue-i2.png")} 
        style={styles.illustration}
        />

        <Text style={[styles.title, {color: theme.text}]}>Create Account</Text>

        {/* triggers when there is an error */}
        {error ? (
          <View style={[styles.errorBox, {borderLeftColor: theme.expense}]}>
            <Ionicons name = "alert-circle" size={20} color={theme.expense}/>
            <Text style={[styles.errorText, {color: theme.text}]}>{error}</Text>
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

        <TouchableOpacity onPress={onSignUpPress} style={[styles.button, {backgroundColor: theme.primary}]}>
          <Text style={[styles.buttonText, {color: theme.white}]}>Sign Up</Text>
        </TouchableOpacity>

        <View style = {styles.footerContainer}>
          <Text style = {[styles.footerText,{color: theme.text}]}>Already have an account?</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.linkText, {color: theme.primary}]}>Sign In</Text>
        </TouchableOpacity>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}