import {
  BodyFilterProps,
  IFilterInvoices,
} from "../../../../../domain/layers/invoice/usecases/filter-Invoices";
import { MethodPostProps } from "../../../../../domain/layers/invoice/usecases/post-invoices";
import { FormatDataInvoice } from "./format-data-invoice/formatDataInvoice";
import { PostInvoice } from "./post-invoices/postInvoice";

type MainProps = {
  url: string;
  bodyFilter: BodyFilterProps;
  methodPost: MethodPostProps;
};

export class MainFilterInvoices implements IFilterInvoices {
  private readonly url: string;
  private readonly bodyFilter: BodyFilterProps;
  private readonly methodPost: MethodPostProps;

  constructor({ url, bodyFilter, methodPost }: MainProps) {
    this.url = url;
    this.bodyFilter = bodyFilter;
    this.methodPost = methodPost;
  }

  postInvoice = new PostInvoice();
  formatDataInvoice = new FormatDataInvoice();

  async getInvoices() {
    try {
      const response = await this.postInvoice.post({
        methodPost: this.methodPost,
        url: this.url,
        bodyFilter: this.bodyFilter,
      });

      if (response.status !== 200) {
        return {
          data: [],
          status: 400,
          error: response.error,
        };
      }

      const FormatDataInvoice = this.formatDataInvoice.execute(response.data);

      const dataFormat = FormatDataInvoice;

      return {
        data: dataFormat,
        status: response.status,
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        status: 500,
        error: null,
      };
    }
  }
}
