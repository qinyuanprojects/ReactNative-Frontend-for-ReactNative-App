import { View} from 'react-native'
import {FontAwesome } from '@expo/vector-icons';
import {styles} from "@/assets/styles/settings.styles";

export const ThemeButton = ({Color}) => {

  return (
            <View style={[styles.colourBackground, {backgroundColor: Color.background}]}>

                <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                  <FontAwesome name="square" style={styles.themeColourBorder} size={25} color={Color.primary}/>
                  <FontAwesome name="square" style={styles.themeColourBorder} size={25} color={Color.text}/>
                </View>
                <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                  <FontAwesome name="square" style={styles.themeColourBorder} size={25} color={Color.border}/>
                  <FontAwesome name="square" style={styles.themeColourBorder} size={25} color={Color.textLight}/>
                </View>
            </View>
         )
}