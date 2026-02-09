# Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (or self-hosted MongoDB)
- Stripe account
- SMTP email service (Gmail, SendGrid, etc.)
- Hosting platform (Vercel, Railway, DigitalOcean, etc.)

## Backend Deployment

### Option 1: Railway

1. **Create New Project**
   ```bash
   railway login
   railway init
   ```

2. **Add MongoDB**
   - Add MongoDB plugin in Railway dashboard
   - Or use MongoDB Atlas connection string

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Option 2: Heroku

1. **Create New App**
   ```bash
   heroku create mens-clothing-api
   ```

2. **Add MongoDB**
   ```bash
   heroku addons:create mongolab
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set STRIPE_SECRET_KEY=your_stripe_key
   # ... set other variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Create New App**
   - Connect your GitHub repository
   - Select backend directory

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Run Command: `npm start`

3. **Add Environment Variables**
   - Add all required environment variables in dashboard

4. **Deploy**
   - Automatic deployment on git push

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables**
   - In Vercel dashboard, add:
   ```
   NEXT_PUBLIC_API_URL=your_backend_url
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Create netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Docker Deployment

### Using Docker Compose

1. **Set Environment Variables**
   Create `.env` file in root:
   ```env
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_key
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   # ... other variables
   ```

2. **Build and Run**
   ```bash
   docker-compose up -d
   ```

3. **Seed Database**
   ```bash
   docker-compose exec backend npm run seed
   ```

4. **View Logs**
   ```bash
   docker-compose logs -f
   ```

### Production Docker Deployment

1. **Build Images**
   ```bash
   docker build -t mens-store-backend ./backend
   docker build -t mens-store-frontend ./frontend
   ```

2. **Push to Registry**
   ```bash
   docker tag mens-store-backend your-registry/mens-store-backend
   docker push your-registry/mens-store-backend
   ```

3. **Deploy to Kubernetes/ECS/Docker Swarm**

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Sign up at mongodb.com/cloud/atlas
   - Create a free cluster

2. **Configure Network Access**
   - Add your IP address or allow all IPs (0.0.0.0/0)

3. **Create Database User**
   - Create user with read/write permissions

4. **Get Connection String**
   - Copy connection string
   - Replace password
   - Use in MONGODB_URI

### Seed Database

After deployment:
```bash
# If using Railway/Heroku
railway run npm run seed
heroku run npm run seed

# If using Docker
docker-compose exec backend npm run seed
```

## Post-Deployment

1. **Test API**
   ```bash
   curl https://your-api-url/api/products
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Test login/register
   - Test product browsing
   - Test cart functionality

3. **Monitor**
   - Set up error tracking (Sentry)
   - Monitor API performance
   - Check logs regularly

## SSL/HTTPS

### Vercel/Netlify
- Automatic SSL certificates

### Custom Domain
1. Add domain in hosting dashboard
2. Update DNS records
3. Wait for SSL certificate provisioning

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Rollback

### Vercel
```bash
vercel rollback
```

### Railway
- Use dashboard to rollback to previous deployment

### Docker
```bash
docker-compose down
git checkout previous-commit
docker-compose up -d
```

## Monitoring & Maintenance

1. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Set up alerts

2. **Error Tracking**
   - Integrate Sentry
   - Monitor error rates

3. **Performance**
   - Use New Relic or DataDog
   - Monitor response times

4. **Logs**
   - Centralize logs with Papertrail or Loggly
   - Set up alerts for errors

## Backup Strategy

1. **Database Backups**
   - MongoDB Atlas: Automatic backups
   - Self-hosted: Set up automated backups

2. **Code Backups**
   - GitHub repository
   - Regular commits

3. **Environment Variables**
   - Keep secure backup of all environment variables
   - Use secret management service (AWS Secrets Manager, etc.)

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check MongoDB connection string
   - Verify network access in MongoDB Atlas

2. **CORS Errors**
   - Update CORS configuration in backend
   - Add frontend URL to allowed origins

3. **Authentication Errors**
   - Verify JWT_SECRET is set
   - Check token expiration

4. **Payment Errors**
   - Verify Stripe keys
   - Check Stripe dashboard for webhooks

## Support

For deployment support:
- Email: devops@mensclothing.com
- Documentation: See README.md
- Issues: GitHub Issues
