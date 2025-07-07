import { Text, View, TouchableOpacity} from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import {styles} from "../assets/styles/home.styles.js";
//import { useTheme } from '../hooks/colourContext';

export const NoTransactionFound = (handleAdd, {theme}) =>
{
    //const { theme } = useTheme();

    const iconName = "receipt-outline"

    return (
    <View style ={[styles.emptyState, {backgroundColor: theme.card, shadowColor: theme.shadow}]}>
        <Ionicons name={iconName} size = {60} style={styles.emptyStateIcon} color={theme.primary}/>
        
        <Text style={[styles.emptyStateTitle, {color: theme.text}]}>No Transactions</Text>
        <Text style={[styles.emptyStateText, {color: theme.textLight}]}> You can start by adding transactions of your own...</Text>

        <TouchableOpacity style={[styles.emptyStateButton, {backgroundColor: theme.primary}]} onPress={handleAdd}>
            <Ionicons name="add-circle" size={20} color="white"/>   
            <Text style={[styles.emptyStateButtonText, {color: theme.white}]}>Add First Transaction</Text>     
        </TouchableOpacity>
    </View>
    )
};