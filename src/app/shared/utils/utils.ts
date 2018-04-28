import { IRequestPayload } from '../interfaces/payload/request-payload.interface';

export class Utils {

  static prepareOpenhomePayload(action: string, payload: any) {

    const requestPayload: IRequestPayload = {
      action: action,
      payload: payload
    };

    return requestPayload;
  }
}
