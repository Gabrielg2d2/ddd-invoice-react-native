import { ModelPostInvoice } from "../../../../../domain/layers/invoice/models/model-post-invoices";
import { PostProps } from "../../../../../domain/layers/invoice/usecases/post-invoices";

/**
 * Fetch method using Json-Server to do a get instead of a post,
 *  as it is a local fake api
 * @param url
 * @param bodyFilter
 * @returns object with data, status and error
 * 
 * @example { 
 *    data,
      status: 200,
      error: null
    }
 *
 */
export async function methodPost({
  url,
  bodyFilter,
}: PostProps): Promise<ModelPostInvoice> {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return {
      data,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log("error: ", JSON.stringify(error));
    // console.log("bodyFilter: ", bodyFilter);

    return {
      data: [],
      status: 500,
      error,
    };
  }
}
