# Environment Configuration Guide

This guide explains how to set up environment variables for the CrowmanCloud web application.

## Quick Setup

1. Copy the environment template:
   ```bash
   cp env.template .env.local
   ```

2. Edit `.env.local` with your actual values
3. Restart your development server

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Base URL of your application | `https://crowmancloud.com` |
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `https://api.crowmancloud.com` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID | `123456789-abc.apps.googleusercontent.com` |

### Optional Variables

| Variable | Description | Required For |
|----------|-------------|--------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics tracking | Analytics |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity tracking | User behavior analytics |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console | SEO verification |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster | SEO verification |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster | SEO verification |

## Configuration by Environment

### Development
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_TELEMETRY_DISABLED=1
```

### Production
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_client_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Service Setup Instructions

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy the Client ID to `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

### Google Analytics Setup
1. Create a GA4 property at [Google Analytics](https://analytics.google.com/)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add to `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Microsoft Clarity Setup
1. Sign up at [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project
3. Copy the Project ID to `NEXT_PUBLIC_CLARITY_PROJECT_ID`

### Search Engine Verification
- **Google**: Get verification code from [Search Console](https://search.google.com/search-console/)
- **Bing**: Get verification code from [Bing Webmaster Tools](https://www.bing.com/webmasters/)
- **Yandex**: Get verification code from [Yandex Webmaster](https://webmaster.yandex.com/)

## File Structure

```
├── .env.local          # Your local environment (gitignored)
├── .env.example        # Example file (if created)
├── env.template        # Template with all variables
└── netlify.toml        # Production environment settings
```

## Security Notes

- Never commit `.env*` files to version control
- Use different values for development and production
- Rotate API keys regularly
- Use environment-specific Google OAuth clients

## Troubleshooting

### Common Issues

1. **API calls failing**: Check `NEXT_PUBLIC_API_URL` is correct
2. **Google OAuth not working**: Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and authorized origins
3. **Analytics not tracking**: Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` format (G-XXXXXXXXXX)
4. **SEO verification failing**: Check verification codes are correct

### Debug Mode

Add these variables for debugging:
```env
NEXT_PUBLIC_DEBUG=true
NODE_ENV=development
```

## Environment Validation

The application validates required environment variables at runtime:
- Missing `NEXT_PUBLIC_API_URL` will show console warnings
- Invalid Google Client ID will prevent OAuth login
- Missing analytics IDs will disable tracking (gracefully)
