import {
  IFormatDataInvoice,
  DataFormat,
  DataFormatFormatted,
} from "../../../../../../domain/layers/invoice/usecases/format-data-invoices";

export class FormatDataInvoiceSpy implements IFormatDataInvoice {
  formatDataDefault(date: string) {
    if (!date) return "empty date";

    try {
      const dateFormatted = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(date));

      return dateFormatted;
    } catch (error) {
      return "invalid date";
    }
  }

  execute(data: DataFormat[]): DataFormatFormatted[] {
    const formaData = data.map((item) => {
      return {
        invoice_date_formatted: this.formatDataDefault(item.invoice_date),
        ...item,
      };
    });

    return formaData;
  }
}
