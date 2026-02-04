import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Invoice } from "../../types";
import { formatAmount, formatDate } from "../../utils/formatters";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    flexDirection: "column",
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
  },
  headerLeft: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  companyInfo: {
    fontSize: 9,
    color: "#000000",
    marginBottom: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 9,
    color: "#000000",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 6,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoBox: {
    width: "48%",
  },
  infoLabel: {
    fontSize: 8,
    color: "#000000",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 10,
    color: "#000000",
    fontWeight: "bold",
  },
  table: {
    marginTop: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#000000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#000000",
    padding: 8,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  tableCell: {
    fontSize: 9,
    color: "#000000",
  },
  col1: { width: "50%" },
  col2: { width: "25%" },
  col3: { width: "25%", textAlign: "right" },
  totalsSection: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 9,
    color: "#000000",
  },
  totalValue: {
    fontSize: 9,
    color: "#000000",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%",
    paddingVertical: 6,
    borderTopWidth: 2,
    borderTopColor: "#000000",
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  grandTotalValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 8,
  },
  statusText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#000000",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#000000",
    fontSize: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#000000",
  },
  footerText: {
    marginBottom: 2,
  },
});

const Template = ({ data }: { data: Invoice }) => {
  const isPaid = data.estado === "PAID";
  const currentDate = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>Mi Empresa S.A.</Text>
            <Text style={styles.companyInfo}>Calle Principal #123</Text>
            <Text style={styles.companyInfo}>Ciudad, País</Text>
            <Text style={styles.companyInfo}>Tel: +57 (1) 234-5678</Text>
            <Text style={styles.companyInfo}>info@miempresa.com</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>FACTURA</Text>
            <Text style={styles.invoiceNumber}>No. {data.id}</Text>
            <Text style={styles.invoiceNumber}>Fecha: {currentDate}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>ID Cliente</Text>
              <Text style={styles.infoValue}>{data.customerId}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Período de Facturación</Text>
              <Text style={styles.infoValue}>{data.periodo}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalle de la Factura</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.col1]}>
                Descripción
              </Text>
              <Text style={[styles.tableHeaderText, styles.col2]}>
                Fecha Emisión
              </Text>
              <Text style={[styles.tableHeaderText, styles.col3]}>Monto</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>
                {data.servicio}
              </Text>
              <Text style={[styles.tableCell, styles.col2]}>
                {formatDate(data.fechaEmision)}
              </Text>
              <Text style={[styles.tableCell, styles.col3]}>
                {formatAmount(data.monto)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatAmount(data.monto)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IVA (0%):</Text>
            <Text style={styles.totalValue}>$0</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>TOTAL:</Text>
            <Text style={styles.grandTotalValue}>
              {formatAmount(data.monto)}
            </Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {isPaid ? "PAGADO" : "PENDIENTE"}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Gracias por su preferencia</Text>
          <Text style={styles.footerText}>
            www.miempresa.com | +57 (1) 234-5678
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Template;
