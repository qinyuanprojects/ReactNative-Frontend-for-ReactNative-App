import { View, Text } from 'react-native'
import {styles} from "@/assets/styles/home.styles";

//3)
import { useTheme } from '../hooks/colourContext';

export const BalanceCard = ({summary}) =>
{
  const { theme } = useTheme();

  if (summary.message === "No transactions found for that user.")
  {
    summary.balanceResult = 0;
    summary.incomeResult = 0;
    summary.expensesResult = 0;
  }

    return (
        <View style={[styles.balanceCard, {backgroundColor: theme.card, shadowColor: theme.shadow}]}>
          {/* Top */}
          <Text style={[styles.balanceTitle, {color: theme.textLight}]}>Total Balance</Text>
          <Text style={[styles.balanceAmount, {color: theme.text}]}>${parseFloat(summary.balanceResult).toFixed(2) }</Text>
          {/* Top */}

          <View style={styles.balanceStats}>

            <View style={styles.balanceStatItem}>
              <Text style={[styles.balanceStatLabel, {color: theme.textLight}]}>Income</Text>
              <Text style={[styles.balanceStatAmount, {color:theme.income}]}>${parseFloat(summary.incomeResult).toFixed(2) }</Text>
            </View>

            <View style={[styles.balanceStatItem, styles.statDivider, {borderColor: theme.border}]}/>
            
            <View style={styles.balanceStatItem}>
              <Text style={[styles.balanceStatLabel, {color: theme.textLight}]}>Expenses</Text>
              <Text style={[styles.balanceStatAmount, {color:theme.expense}]}>${parseFloat(summary.expensesResult).toFixed(2) }</Text>
            </View>

          </View>

          {/* <View style={styles.balanceStats}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={[styles.balanceAmount, {color:COLORS.expense}]}>${parseFloat(summary.expensesResult).toFixed(2)}</Text>
          </View> */}
        </View>
    );
};