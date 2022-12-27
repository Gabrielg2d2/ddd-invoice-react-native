import { ModelDataInvoice } from "../models/model-data-invoices";

export type DataFormat = ModelDataInvoice;

export type DataFormatFormatted = ModelDataInvoice & {
  invoice_date_formatted: string;
};

export interface IFormatDataInvoice {
  formatDataDefault(date: string): string;

  execute(data: DataFormat[]): DataFormatFormatted[];
}
