import { ModelPostInvoice } from "../models/model-post-invoices";
import { BodyFilterProps } from "./filter-Invoices";

export type PostProps = {
  url: string;
  bodyFilter: BodyFilterProps;
};

export type MethodPostProps = ({
  url,
  bodyFilter,
}: PostProps) => Promise<ModelPostInvoice>;

export type ExecuteProps = {
  url: string;
  bodyFilter: BodyFilterProps;
  methodPost: MethodPostProps;
};

export interface IPostInvoices {
  post: ({
    url,
    bodyFilter,
    methodPost,
  }: ExecuteProps) => Promise<ModelPostInvoice>;
}
