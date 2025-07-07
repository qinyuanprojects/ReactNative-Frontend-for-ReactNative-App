import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
  {
    container: {
    flex: 1,
    //backgroundColor: COLORS.background
  },
    settingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    //color: COLORS.text,
    marginLeft: "125",
    marginTop: "3"
  },
  settingsHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    //borderBottomColor: COLORS.border,
  },
  settingsContent: {
    padding: 20,
    paddingBottom: 0,
  },
  settingsOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop:20,
    marginBottom: 5,
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "600",
    //color: COLORS.text,
    marginBottom: 0,
  },
  themeContent: {
    padding: 20,
    paddingBottom: 0,
  },
  themeButton: {
    //backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center', alignItems: 'center'
  },
  themeButtonText: {
    //color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    marginRight: 50
  },
  colourBackground: {
    //backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  themeColourBorder:{
    margin: 2
  }
})