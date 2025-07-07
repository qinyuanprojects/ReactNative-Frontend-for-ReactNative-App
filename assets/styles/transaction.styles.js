import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: "center",
    //borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 5,
    //position: 'absolute', // Position the icon absolutely
    left: 0,

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    //color: COLORS.text,
    textAlign: 'center', // Center the text
    flex: 1, // Allow text to take up available space
    paddingRight: 25
  },
  card: {
    //backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    //color: COLORS.text,
    //textAlign: 'center', // Center the text
    flex: 1, // Allow text to take up available space
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    //borderColor: COLORS.border,
  },
  typeIcon: {
    marginRight: 8,
  },
  typeButtonText: {
    //color: COLORS.text,
    fontSize: 16,
    fontWeight: "500",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    //borderBottomColor: COLORS.border,
    paddingBottom: 16,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: "bold",
    //color: COLORS.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    //color: COLORS.text,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    //borderColor: COLORS.border,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    //backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
    //color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    //color: COLORS.text,
    marginBottom: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: COLORS.border,
    // backgroundColor: COLORS.white,
  },
  categoryButtonActive: {
    // backgroundColor: COLORS.primary,
    // borderColor: COLORS.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    //color: COLORS.text,
    fontSize: 14,
  },
  update: {
    paddingHorizontal: 16,
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  updateButton:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 75,
    borderWidth: 1,
  },
  updateButtonText: {
    //color: COLORS.text,
    fontSize: 20,
    fontWeight: "500",
    padding: 5,
  },
})