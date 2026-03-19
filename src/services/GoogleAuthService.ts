/**
 * Google OAuth Authentication Service
 * Handles Google Sign-In token verification and user authentication
 * Credentials are loaded from environment variables (.env)
 */

const GOOGLE_CONFIG = {
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  project_id: "erp-490705",
  client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string,
  token_uri: "https://oauth2.googleapis.com/token",
};

interface GoogleTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
}

/**
 * Decode JWT token without verification (client-side)
 * For production, verify on backend
 */
export const decodeGoogleToken = (token: string): GoogleTokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode Google token:', error);
    return null;
  }
};

/**
 * Verify Google token with Google's servers (backend recommended)
 */
export const verifyGoogleToken = async (token: string): Promise<GoogleTokenPayload | null> => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/tokeninfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `id_token=${token}`,
    });
    if (!response.ok) throw new Error('Token verification failed');
    const data = await response.json();
    if (data.aud !== GOOGLE_CONFIG.client_id) throw new Error('Token audience mismatch');
    return data as GoogleTokenPayload;
  } catch (error) {
    console.error('Google token verification error:', error);
    return null;
  }
};

export const getUserRoleFromEmail = (email: string): 'super_admin' | 'admin' => {
  return email.toLowerCase().includes('superadmin') ? 'super_admin' : 'admin';
};

export const handleGoogleSignInResponse = async (response: any) => {
  if (!response.credential) throw new Error('No credential in response');
  const payload = decodeGoogleToken(response.credential);
  if (!payload) throw new Error('Failed to decode token');
  return {
    token: response.credential,
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      givenName: payload.given_name,
      familyName: payload.family_name,
    },
    role: getUserRoleFromEmail(payload.email),
  };
};

export default {
  decodeGoogleToken,
  verifyGoogleToken,
  getUserRoleFromEmail,
  handleGoogleSignInResponse,
  GOOGLE_CONFIG,
};
