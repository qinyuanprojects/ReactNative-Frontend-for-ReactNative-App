import { useUser } from '@clerk/clerk-expo'
import { useRouter} from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native'
import { useTransactions } from '../../hooks/useTransaction'
import { useEffect, useState, useCallback} from 'react'
import { Background } from '../../hooks/background'
import {styles} from "@/assets/styles/home.styles";
import {Ionicons} from "@expo/vector-icons"
import { BalanceCard } from '../../components/BalanceCard'
import {TransactionItem} from '../../components/TransactionItem'
import PageLoader from '@/components/PageLoader'
import { SignOutButton } from '@/components/SignOutButton'
import {NoTransactionFound}  from '../../components/NoTransactionFound'
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../hooks/colourContext';

export default function Page() 
{
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false)
  const {transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id);
  const { theme } = useTheme();

  const handleDelete = (id) => {
    Alert.alert
        (
          "Delete Transaction","Are you sure you want to delete this transaction?",
          [
            {
              text:"Cancel",style:"cancel" 
            },
            {
              text:"Delete",style:"destructive", onPress: ()=> deleteTransaction(id)
            }
          ]
        );
  }
  const handleAdd = () =>
  {
    router.push("/create")
  }
  const handleSettings = () =>
  {
    router.push("/settings")
  }

  Background();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () =>
  {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      //Do something when the screen is focused
      onRefresh()

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  if (isLoading && !refreshing) return <PageLoader/>;

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>

      {/*Contains userid, add button, logout button, total balance,
      income, expenses and "recent transactions" title*/}
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>

          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image 
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style ={[styles.welcomeText, {color: theme.textLight}]}>Welcome,</Text>
              <Text style ={[styles.usernameText, {color: theme.text}]}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* LEFT */}

          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.addButton, {backgroundColor: theme.primary}]} onPress={handleAdd}>
              <Ionicons name="add-circle" size={20} color="white"/>
              <Text style={[styles.addButtonText, {color: theme.white}]}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
          {/* RIGHT */}
        </View>


        {/* Balance & Income & Expenses region */}
        <BalanceCard summary = {summary}/>
        {/* Balance & Income & Expenses region */}


        <View style={styles.transactionsHeaderContainer}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>Recent Transactions</Text>
          

          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.settingsButton, {backgroundColor: theme.primary}]} onPress={handleSettings}>
              <Text style={[styles.settingsButtonText, {color: theme.white}]}>Settings</Text>
              <Ionicons name="settings-outline" size={20} color="white"/>
            </TouchableOpacity>
          </View>
        </View>

      </View>     

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions.transactions}
        renderItem={({item}) => 
        (
          <TransactionItem item = {item} onDelete={handleDelete}/>
        )}
        ListEmptyComponent={NoTransactionFound(handleAdd, {theme})}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />

    </View>
  );

  // return (
  //   <View>
  //     <SignedIn>
  //       <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
  //       <Text>Income: {summary.incomeResult}</Text>
  //       <Text>Balance: {summary.balanceResult}</Text>
  //       <Text>Expenses: {summary.expensesResult}</Text>
  //       <SignOutButton />
  //     </SignedIn>
  //     <SignedOut>
  //       <Link href="/(auth)/sign-in">
  //         <Text>Sign in</Text>
  //       </Link>
  //       <Link href="/(auth)/sign-up">
  //         <Text>Sign up</Text>
  //       </Link>
  //     </SignedOut>
  //   </View>
  // )
}