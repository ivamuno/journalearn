export class MockHelper {
  public static async delay(ms: number = 3000): Promise<void> {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
