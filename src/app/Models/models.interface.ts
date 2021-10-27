export interface User {
  account?: string;
  country_code: string;
  created_at?: string;
  currency: string;
  dailing_code: string;
  email: string;
  email_verified_at?: string;
  expires_in: number;
  fcm_token?: string;
  first_name: string;
  id: number;
  last_name: string;
  mobile_phone: string;
  otp: string;
  photo?: string;
  status: string;
  token: string;
  token_type?: string;
  type?: string;
  updated_at?: string;
  user_id: string;
  web_token?: string;
  hasBusiness: boolean;
}
export interface SummaryData {
  monthlyTransactions: any;
  totalTransactionsAmount: number;
  totalTransactionsCount: number;
}

export interface UserSession {
  first_name: string;
  last_name: string,
  email: string;
  mobile_phone: string;
  user_id: string;
  photo: string;
  status: any;
  id: any;
  currency: string;
  country_code: string;
  hasBusiness: boolean;
}
export interface MerchantData {
  DOB: string;
  api_public_key_live: string;
  api_public_key_test: string;
  api_secret_key_live: string;
  api_secret_key_test: string;
  business_address: string;
  business_email: string;
  business_legal_name: string;
  business_logo: string;
  business_phone: string;
  charges: any;
  company_document_path: any;
  country: string;
  created_at: string;
  description: string;
  id: number;
  id_proof_path: string;
  id_type: string;
  industry: string;
  nationality: string;
  owner_address: string;
  owner_full_name: string;
  staff_size: string;
  status: string;
  trading_name: string | null;
  updated_at: string;
  user_id: string;
  website: string;
  callback_url: string;
}
