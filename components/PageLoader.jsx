import {View, ActivityIndicator} from "react-native";
import {styles} from "../assets/styles/home.styles";
import { useTheme } from '../hooks/colourContext';

const PageLoader = () => {

    const { theme } = useTheme();

    return (
        <View style = {[styles.loadingContainer, {backgroundColor: theme.background,}]}>
            <ActivityIndicator size = "large" color ={theme.primary}/>
        </View>
    );
};
export default PageLoader;