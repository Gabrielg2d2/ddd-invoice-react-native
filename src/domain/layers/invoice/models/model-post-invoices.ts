import { ModelDataInvoice } from "./model-data-invoices";

export type ModelPostInvoice = {
  data: ModelDataInvoice[];
  status: number;
  error?: any;
};
