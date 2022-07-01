export class RequestStore {
  static instance: RequestStore;
  event: any;
  context: any;
  callback: any;

  private constructor(event, context, callback) {
    Object.assign(this, { event, context, callback });
  }

  static getInstance(event=null, context=null, callback=null) {
    if (!this.instance) {
      this.instance = new RequestStore(event, context, callback);
    }
    return this.instance;
  }

  
}
