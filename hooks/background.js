import { useEffect } from 'react'
import {background_API_URL} from "../constants/api";


export function Background()
{
    useEffect(() => 
    {
        const interval = setInterval(() => {

            console.log("This will be called every 600 seconds")
            
            ping();
        
        }, 600000);}, []);
    
}

const ping = async () =>
{
    try 
    {
        const response = await fetch(background_API_URL);
                
        if (response.status === 200)
        {
            console.log("Cron job's fetch was successful!")
        }
    } 
    catch (error) 
    {
        console.error(error);
    }
}

            


