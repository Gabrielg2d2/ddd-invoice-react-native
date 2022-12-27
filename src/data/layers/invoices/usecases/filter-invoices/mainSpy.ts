import {
  BodyFilterProps,
  IFilterInvoices,
} from "../../../../../domain/layers/invoice/usecases/filter-Invoices";
import { MethodPostProps } from "../../../../../domain/layers/invoice/usecases/post-invoices";
import { FormatDataInvoiceSpy } from "./format-data-invoice/formatDataInvoiceSpy";
import { PostInvoiceSpy } from "./post-invoices/postInvoiceSpy";

type MainProps = {
  url: string;
  bodyFilter: BodyFilterProps;
  methodPost: MethodPostProps;
};

export class MainFilterInvoicesSpy implements IFilterInvoices {
  private readonly url: string;
  private readonly bodyFilter: BodyFilterProps;
  private readonly methodPost: MethodPostProps;

  constructor({ url, bodyFilter, methodPost }: MainProps) {
    this.url = url;
    this.bodyFilter = bodyFilter;
    this.methodPost = methodPost;
  }

  postInvoice = new PostInvoiceSpy();
  formatDataInvoice = new FormatDataInvoiceSpy();

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
