import { DataFormatFormatted } from "../../domain/layers/invoice/usecases/format-data-invoices";
import { useHome } from "./hook/Home/useHome";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

export function PageHome() {
  const { invoices } = useHome();

  const DATA = invoices.map((invoice: DataFormatFormatted) => ({
    id: invoice.id,
    invoice_number: invoice.invoice_number,
    invoice_date_formatted: invoice.invoice_date_formatted,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.id}</Text>
            <Text>{item.invoice_number}</Text>
            <Text>{item.invoice_date_formatted}</Text>
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    gap: 10,
  },
});
