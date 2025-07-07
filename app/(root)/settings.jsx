import { View, Text, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import {useState} from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter} from 'expo-router'
import {styles} from "@/assets/styles/settings.styles";
import { BalanceCard } from '../../components/BalanceCard'
import { ThemeButton} from '../../components/ThemeButton'
import {THEMES} from "@/constants/colors.js"

//3)
import { useTheme } from '../../hooks/colourContext';


const Settings = () => {

  const router = useRouter();
  const colorArray = [THEMES.ocean, THEMES.coffee, THEMES.forest, THEMES.purple]

  //3) & 4)
  const { toggleTheme, theme } = useTheme();

  const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
  });

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      {/* Header */}
        <View style={[styles.settingsHeader,{borderBottomColor: theme.border}]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22}/>
          </TouchableOpacity>
          <Text style={[styles.settingsTitle, {color: theme.text,}]}>Settings</Text>
        </View>

        <View style={styles. settingsContent}>
          <BalanceCard summary = {summary}/>
        </View>

        <View style={styles.settingsOptionsContainer}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>Theme Colours</Text>
        </View>
        
        <View style={styles.themeContent}>
        <TouchableOpacity style={[styles.themeButton, {backgroundColor: colorArray[0].primary}]} onPress={() => toggleTheme(colorArray[0])}>
          <Text style={[styles.themeButtonText, {color: colorArray[0].white}]}>Ocean</Text>
          <ThemeButton Color = {colorArray[0]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.themeButton, {backgroundColor: colorArray[1].primary}]} onPress={() => toggleTheme(colorArray[1])}>
          <Text style={[styles.themeButtonText, {color: colorArray[1].white}]}>Coffee</Text>
          <ThemeButton Color = {colorArray[1]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.themeButton, {backgroundColor: colorArray[2].primary}]} onPress={() => toggleTheme(colorArray[2])}>
          <Text style={[styles.themeButtonText, {color: colorArray[2].white}]}>Forest</Text>
          <ThemeButton Color = {colorArray[2]}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.themeButton, {backgroundColor: colorArray[3].primary}]} onPress={() => toggleTheme(colorArray[3])}>
          <Text style={[styles.themeButtonText, {color: colorArray[3].white}]}>Purple</Text>
          <ThemeButton Color = {colorArray[3]}/>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Settings