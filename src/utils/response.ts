export class Response {
  private statusCode = 200;
  private body: any;
  private headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  public setStatus(code: number): Response {
    this.statusCode = code;
    return this;
  }

  public setBody(body: any): Response {
    this.body = body;
    return this;
  }

  public build(): {
    statusCode: number;
    headers: Record<string, string>;
    body: string | undefined;
  } {
    return {
      statusCode: this.body ? this.statusCode : 204,
      headers: this.headers,
      body: this.body
        ? JSON.stringify({
            data: this.body,
          })
        : undefined,
    };
  }
}
