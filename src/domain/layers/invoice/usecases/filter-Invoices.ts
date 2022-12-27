import { ModelPostInvoice } from "../models/model-post-invoices";
import { IPostInvoices } from "./post-invoices";

export type BodyFilterProps = {
  name: string;
  numberInvoice: string;
  date: string;
};

export type FilterInvoicesProps = {
  url: string;
  bodyFilter: BodyFilterProps;
  methodPost: IPostInvoices;
};

export interface IFilterInvoices {
  getInvoices: ({
    url,
    bodyFilter,
    methodPost,
  }: FilterInvoicesProps) => Promise<ModelPostInvoice>;
}
