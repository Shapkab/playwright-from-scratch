import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { env } from '@config/env';

export class AppApi {
  constructor(private readonly request: APIRequestContext) {}

  async getHealth(): Promise<APIResponse> {
    const response = await this.request.get(env.healthEndpoint);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async getCurrentUser(): Promise<APIResponse> {
    const response = await this.request.get(env.profileEndpoint);
    expect(response.ok()).toBeTruthy();
    return response;
  }
}
