import {useCallback, useState} from "react";
import {Alert} from "react-native"
import {API_URL} from "../constants/api";

export const useTransactions = (userId) =>
{
    const [transactions, setTransactions] = useState([]);

    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    const fetchTransactions = useCallback(async () => 
    {
        try 
        {
            const response = await fetch(`${API_URL}/fetch/${userId}`);

            if (response.status === 429)
            {
                return Alert.alert("Too Many Actions!", "You can only do 10 actions per minute!");
            }

            const data = await response.json();
            
            setTransactions(data);
        }
        catch (error)
        {
            console.error("Error fetching transactions:", error)
        }
    },[userId]);

    const fetchSummary = useCallback(async () => 
    {
        try 
        {
            const response = await fetch(`${API_URL}/fetch/summary/${userId}`);

            if (response.status === 429)
            {
                return Alert.alert("Too Many Actions!", "You can only do 10 actions per minute!");
            }

            const data = await response.json();

            setSummary(data);
        }
        catch (error)
        {
            console.error("Error fetching summary:", error)
        }
    },[userId]);

    const loadData = useCallback(async () => {

        if (!userId) return; 

        setIsLoading(true);
        try{
            //can be run in parallel
            await Promise.all([fetchTransactions(), fetchSummary()]);
        }
        catch (error)
        {
            console.error("Error loading data:", error)
        }
        finally{
            setIsLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);


    const deleteTransaction = async (id) => {

        setIsLoading(true);
        try
        {
            const response = await fetch(`${API_URL}/remove/${id}`, {method: "DELETE"})

            if(!response.ok)
            {
                throw new Error("Failed to delete transaction");
            } 

            //Refresh data after deletion
            loadData();
            Alert.alert("Success", "Transaction deleted successfully");
        }
        catch (error)
        {
            console.error("Error deleting transaction:", error);
            Alert.alert("Error", error.message);
        }
        finally{
            setIsLoading(false);
        }
    };

    // const updateTransaction = async () => {

    // };


    return {transactions, summary, isLoading, loadData, deleteTransaction};
};