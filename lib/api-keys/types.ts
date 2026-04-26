export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  secret: string;
  createdAt: string;
  lastUsedAt?: string;
}
