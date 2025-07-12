import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter} from 'expo-router'
import {useState} from 'react'
import { useUser } from '@clerk/clerk-expo'
import { useLocalSearchParams } from 'expo-router';
import {styles} from "@/assets/styles/transaction.styles";
import { useTheme } from '../../hooks/colourContext';
import {API_URL} from "../../constants/api";

const Transaction = () => {

  const CATEGORIES =
  [
    {id: "food", name: "Food & Drinks", icon:"fast-food"},
    {id: "shopping", name: "Shopping", icon:"cart"},
    {id: "transportation", name: "Transportation", icon:"car"},
    {id: "entertainment", name: "Entertainment", icon:"film"},
    {id: "bills", name: "Bills", icon:"receipt"},
    {id: "other", name: "Other", icon:"ellipsis-horizontal"},
    {id: "income", name: "Income", icon:"cash"},
  ];

  const item = useLocalSearchParams()
  const router = useRouter();
  const { theme } = useTheme();

  const [title, setTitle] = useState(item.title)
  const initialTitle = item.title

  const [amount, setAmount] = useState(Number.parseFloat(item.amount).toFixed(2))
  const initialAmount = Number.parseFloat(item.amount).toFixed(2)

  const [selectedCategory, setSelectedCategory] = useState(item.category)
  const initialCategory = item.category

  const [isLoading, setIsLoading] = useState(false)
  const [isIncome, setIsIncome] = useState(item.category === 'Income')
  //const [isChanged, setIsChanged] = useState(false)

  const conditionToIsIncomeSelected = (category) =>
  {
      return (category.name === "Income" && isIncome)
  }
  const ifCategoryNameIsIncome = (category) =>
  {
      if(category.name === "Income")
      {
          setIsIncome(true)
      }
      else
      {
          setIsIncome(false)
      }
  }

  const amountBasedOnIsIncome = (amount) =>
  {
    if (isIncome)
    {
      return Math.abs(amount)
    }
    else
    {
      return -Math.abs(amount)
    }
  }
  

  const handleUpdate = async () =>{

    if (!title.trim() || title==="") 
    {
      return Alert.alert("Error", "Please enter a transaction title!")
    }
    if(!amount || isNaN(parseFloat(amount)))
    {
      return Alert.alert("Error", "Please enter a proper amount!")
    }
    if (title === initialTitle && amount === initialAmount && selectedCategory === initialCategory)
    {
      return Alert.alert("Error", "No changes in any fields detected!")
    }

    // console.log("id:", item.id);
    // console.log("user_id:", item.user_id)
    // console.log("title:", title)
    // console.log("initialTitle:", initialTitle)
    // console.log("amount:", parseFloat(amount))
    // console.log("initialAmount:", initialAmount)
    // console.log("selectedCategory:", selectedCategory)
    // console.log("initialCategory:", initialCategory)

    try
    {
      setIsLoading(true)

      const response = await fetch(`${API_URL}/update`, 
      {
          method: "PUT",
          headers:{
              "Content-Type": "application/json",
          },
          body: JSON.stringify(
          {
            Id: item.id,
            "User Id": item.user_id,
            Title: title,
            Amount: amountBasedOnIsIncome(parseFloat(amount)),
            Category: selectedCategory
          }
          )
      },
      )

      if (response.status === 429)
      {
          return Alert.alert("Too Many Actions!", "You can only do 10 actions per minute!");
      }

      if(!response.ok)
      {
          const errorData = await response.json();
          throw new Error(errorData.error || "failed to update Transaction!")
      }

      Alert.alert("Success", "Transaction updated successfully!");
    }
    catch(error)
    {
      Alert.alert("Error", error.message || "Failed to update transaction")
      console.error("Error updating transaction", error);
    }
    finally
    {
      setIsLoading(false)
    }

  }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>

      <View style={[styles.header, {borderBottomColor: theme.border}]}>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22}/>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, {color: theme.text}]}>Transaction: {item.title}</Text>

      </View>

      <View style={[styles.card, {backgroundColor: theme.card}]}>

        <View style={styles.typeSelector}>
          <Text style={[styles.title, {color: theme.text}]}>Update transaction here...</Text>
        </View>

        {/* Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton,{borderColor: theme.border}, !isIncome && {backgroundColor: theme.primary,
                borderColor: theme.primary,}]}
            onPress={() => {setIsIncome(false), setSelectedCategory("")}}>

            <Ionicons name="arrow-down-circle" size={22} color={isIncome ?  theme.expense : theme.white} style={styles.typeIcon}/>
            <Text style={[styles.typeButtonText, {color: theme.text}, !isIncome && {color: theme.white}]}>Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, {borderColor: theme.border}, isIncome && {backgroundColor: theme.primary,
                borderColor: theme.primary,}]}
            onPress={() => {setIsIncome(true), setSelectedCategory("Income")}}>

            <Ionicons name="arrow-up-circle" size={22} color={!isIncome ?  theme.income : theme.white} style={styles.typeIcon}/>
            <Text style={[styles.typeButtonText, {color: theme.text}, isIncome && {color: theme.white}]}>Income</Text>
          </TouchableOpacity>
        </View>

        {/* Amount Container */}
        <View style={[styles.amountContainer, {borderBottomColor: theme.border}]}>
          <Text style={[styles.currencySymbol, {color: theme.text}]}>$</Text>
          <TextInput
            style={[styles.amountInput, {color: theme.text}]}
            placeholder='Type new amount here'
            placeholderTextColor={theme.textLight}
            value={amount}
            onChangeText={setAmount}

            //changes the keyboard to numeric
            keyboardType="numeric"
          />
        </View>

        {/* INPUT Container */}
        <View style={[styles.inputContainer, {borderColor: theme.border, backgroundColor: theme.white}]}>
          <Ionicons name="create-outline"
          size={22}
          color={theme.textLight}
          style={styles.inputIcon}
          />
          <TextInput
            style={[styles.input, {color: theme.text}]}
            placeholder='Type new title here'
            placeholderTextColor={theme.textLight}
            value={title}
            //defaultValue = {item.title}
            onChangeText={setTitle}
          />
        </View>

        {/* Title & Grid for icons*/}
        <Text style={[styles.sectionTitle, {color: theme.text}]}>
          <Ionicons name="pricetag-outline"
            size={16}
            color={theme.text}/> Categories
        </Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map(category => (

          <TouchableOpacity
          key={category.id}
          style={[
              styles.categoryButton, {borderColor: theme.border, backgroundColor: theme.white},
              (selectedCategory === category.name || conditionToIsIncomeSelected(category)) && {backgroundColor: theme.primary,borderColor: theme.primary}
          ]}
          onPress=
          {() => {setSelectedCategory(category.name), ifCategoryNameIsIncome(category)}}>

          <Ionicons name={category.icon}
          size={22}
          color={(selectedCategory === category.name || conditionToIsIncomeSelected(category)) ?  theme.white : theme.text}
          style={styles.categoryIcon}/>

          <Text
          style={[styles.categoryButtonText, {color: theme.text,},
          (selectedCategory === category.name || conditionToIsIncomeSelected(category)) && {color: theme.white}]}
          >
            {category.name}
          </Text>
          </TouchableOpacity>

          ))}
        </View>

      </View>

      <View style={styles.update}>
        <TouchableOpacity
          style={[styles.updateButton,{borderColor: theme.border, backgroundColor: theme.primary}, 
                  isLoading && {backgroundColor: theme.white, borderColor: theme.white,}]}
          onPress={() => {handleUpdate()}}>

          <AntDesign name="save" size={30} color={isLoading ? theme.primary : theme.white} style={styles.typeIcon}/>
          <Text style={[styles.updateButtonText, {color: theme.white}, isLoading && {color: theme.primary}]}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* loading icon for this page */}
      {isLoading && (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color={theme.primary}/>
          </View>
      )}
    </View>
  )
}

export default Transaction