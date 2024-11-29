export interface User {
  id: string;
  address: string;
  membershipLevel: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
  registeredAt: string;
  lastLoginAt: string;
}