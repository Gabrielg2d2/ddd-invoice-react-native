import { ModelPostInvoice } from "../../../../../../domain/layers/invoice/models/model-post-invoices";
import {
  IPostInvoices,
  ExecuteProps,
} from "../../../../../../domain/layers/invoice/usecases/post-invoices";

export class PostInvoiceSpy implements IPostInvoices {
  async post({
    url,
    bodyFilter,
    methodPost,
  }: ExecuteProps): Promise<ModelPostInvoice> {
    const response = await methodPost({ url, bodyFilter });

    if (response.status !== 200) {
      return {
        data: [],
        status: response.status,
        error: response.error,
      };
    }

    return {
      data: response.data,
      status: response.status,
      error: null,
    };
  }
}
