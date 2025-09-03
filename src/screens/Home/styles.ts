import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    padding: 16,
    backgroundColor: "#1e293b",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#7c3aed",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  modeToggle: {
    flexDirection: "row",
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 4,
  },
  modeButton: {
    padding: 8,
    borderRadius: 6,
  },
  modeButtonActive: {
    backgroundColor: "#7c3aed",
  },
  budgetContainer: {
    // Estilos para o container do orçamento
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listsContainer: {
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  listCardActive: {
    borderColor: "#7c3aed",
  },
  listCardContent: {
    // Estilos para o conteúdo do card
  },
  listCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  listName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  listDetails: {
    color: "#94a3b8",
    fontSize: 14,
  },
  newListForm: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    marginBottom: 12,
  },
  newListActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    color: "#94a3b8",
    padding: 8,
  },
  createButton: {
    color: "#7c3aed",
    fontWeight: "600",
    padding: 8,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
