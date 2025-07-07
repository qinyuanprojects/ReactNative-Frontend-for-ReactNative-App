import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {useState} from 'react'
import { useUser } from '@clerk/clerk-expo'
import { useRouter} from 'expo-router'
import {API_URL} from "../../constants/api";
import {styles} from "@/assets/styles/create.styles";

//4)
import { useTheme } from '../../hooks/colourContext';

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

const CreateScreen = () => {
    const { user } = useUser();
    const router = useRouter();

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [isIncome, setIsIncome] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    //4)
    const { theme } = useTheme();
  
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

    //Background();

    const handleCreate = async () =>
    {
        // console.log("due to the posting of ....")
        // console.log("trim", !title.trim());
        // console.log("title===", title==="")
        // console.log("!amount",!amount)
        // console.log("parseFloat(amount) <= 0", parseFloat(amount) <= 0)
        // console.log("isNaN(parseFloat(amount))", isNaN(parseFloat(amount)))

        //validations first
        if (!title.trim() || title==="") 
        {
            return Alert.alert("Error", "Please enter a transaction title!")
        }
        if(!amount || isNaN(parseFloat(amount)))
        {
            return Alert.alert("Error", "Please enter a proper amount!")
        }
        if(parseFloat(amount) <= 0)
        {
            return Alert.alert("Error", "Don't need to add the \"-\" or \"+\" sign, choose either \"Expenses\" for deductions or \"Income\" for additions.")
        }
        if(!selectedCategory.trim() || selectedCategory==="" || selectedCategory=== undefined || selectedCategory=== null)
        {
            return Alert.alert("Error", "Please select a category!")
        }
        
        try 
        {
          setIsLoading(true)

          //Format the amount (-ve for expenses, +ve for income)
          const formattedAmount = isIncome ?
          Math.abs(parseFloat(amount)) :
          -Math.abs(parseFloat(amount))

          //Post method in React Native Front End!!!
          const response = await fetch(`${API_URL}/register`, 
          {
              method: "POST",
              headers:{
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(
              {
                  "User Id": user.id,
                  Title: title,
                  Amount: formattedAmount,
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
              throw new Error(errorData.error || "failed to create Transaction!")
          }

          Alert.alert("Success", "Transaction created successfully!");
          setIsSaved(true)
          console.log(isSaved)
          //router.back();
        }
        catch (error)
        {
            Alert.alert("Error", error.message || "Failed to create transaction")
            console.error("Error creating transaction", error);
        }
        finally
        {
          setIsLoading(false)
        }
        
    }

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>

        {/* Header */}
        <View style={[styles.header, {borderBottomColor: theme.border}]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22}/>
          </TouchableOpacity>

          <Text style={[styles.headerTitle, {color: theme.text}]}>New Transaction</Text>

          {/* either 1st one or 2nd style if isLoading is true! */}
          <TouchableOpacity style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]} 
          
          onPress={handleCreate} disabled={isLoading}>
            <Text style={[styles.typeButtonText, {color: theme.text}]}>{isLoading ? "Saving..." : "Save"}</Text>
            {!isLoading && <Ionicons name="checkmark" size={18} color={isSaved ?  "black" : theme.background}/>}
          </TouchableOpacity>

        </View>

        <View style={[styles.card, {backgroundColor: theme.card}]}>

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
              placeholder='0.00'
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
              placeholder='Transaction Title'
              placeholderTextColor={theme.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Title & Grid for icons*/}
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            <Ionicons name="pricetag-outline" 
              size={16} 
              color={theme.text} /> Categories
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

        {/* loading icon for this page */}
        {isLoading && (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={theme.primary}/>
            </View> 
        )}
    </View>
  )
}

export default CreateScreen