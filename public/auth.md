# Auth.md & Agent Registration Metadata

Welcome to Little Wise Kids. This document describes the registration and authentication workflow for AI Agents.

## Agent Registration

AI agents can register and obtain OAuth 2.0 client credentials or token metadata to access protected resources and discovery endpoints.

### 1. Authorization Server Metadata
- **Authorization Server**: `/.well-known/oauth-authorization-server`
- **Protected Resource**: `/.well-known/oauth-protected-resource`
- **Supported Identity Types**: `x509`, `jwt`
- **Supported Credential Types**: `client_credentials`, `bearer`

### 2. Registration Endpoint & Flow
To request agent access credentials:
1. Submit a registration request containing your agent's identity claim (`jwt` or `x509` certificate) to our registration endpoint:
   `https://littlewisekids.co.uk/oauth/register`
2. Include requested scopes (`read`).
3. Upon validation, an agent `client_id` and token will be returned.

### 3. Revocation & Claim Management
- **Token Revocation URL**: `https://littlewisekids.co.uk/oauth/revoke`
- **Claim Verification URL**: `https://littlewisekids.co.uk/oauth/claim`

