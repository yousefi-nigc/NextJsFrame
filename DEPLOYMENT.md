# GasTop Production Deployment Guide

This guide provides step-by-step instructions for deploying GasTop to production.

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database (or use the included Docker Compose setup)
- Domain name with DNS configured (for production)
- SSL certificate (recommended: Let's Encrypt)

## Quick Start

### 1. Environment Setup

Create a `.env` file in the project root:

```bash
# Database Configuration
DATABASE_URL=postgresql://gastop:your-secure-password@postgres:5432/gastop?schema=public
POSTGRES_USER=gastop
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=gastop
POSTGRES_PORT=5432

# Application URLs (update with your domain)
BETTER_AUTH_URL=https://your-domain.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.com

# Security (generate a secure random string)
BETTER_AUTH_SECRET=your-32-plus-character-secret-key-here

# Application Port
APP_PORT=3000
```

**Generate a secure secret:**
```bash
openssl rand -hex 32
```

### 2. Build and Deploy

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Check status
docker-compose ps
```

### 3. Verify Deployment

- Application: `http://your-domain.com:3000` (or your configured port)
- Check logs for any errors: `docker-compose logs app`
- Verify database connection in logs

## Production Checklist

### Security
- [ ] Strong `BETTER_AUTH_SECRET` (32+ characters)
- [ ] Strong database password
- [ ] HTTPS enabled (use reverse proxy like nginx)
- [ ] Environment variables not committed to git
- [ ] Database access restricted to application servers
- [ ] Regular security updates

### Configuration
- [ ] All environment variables set correctly
- [ ] Database migrations completed
- [ ] Domain names configured correctly
- [ ] SSL certificates installed
- [ ] Firewall rules configured

### Monitoring
- [ ] Application logs monitored
- [ ] Database backups configured
- [ ] Health checks working
- [ ] Error tracking set up (optional)

## Reverse Proxy Setup (Nginx)

Example Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Management

### Run Migrations

```bash
# Inside the container
docker-compose exec app prisma migrate deploy

# Or manually
docker-compose exec app sh -c "prisma migrate deploy"
```

### Database Backups

```bash
# Backup
docker-compose exec postgres pg_dump -U gastop gastop > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
docker-compose exec -T postgres psql -U gastop gastop < backup_file.sql
```

## Troubleshooting

### Application won't start
1. Check logs: `docker-compose logs app`
2. Verify environment variables are set
3. Check database connection
4. Verify Prisma migrations completed

### Database connection errors
1. Verify `DATABASE_URL` is correct
2. Check PostgreSQL is running: `docker-compose ps postgres`
3. Check database logs: `docker-compose logs postgres`
4. Verify network connectivity

### Migration errors
1. Check Prisma schema is up to date
2. Verify database permissions
3. Check migration files exist in `prisma/migrations`

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Run migrations if needed
docker-compose exec app prisma migrate deploy
```

## Scaling

For production scaling, consider:
- Using a managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
- Running multiple app instances behind a load balancer
- Using container orchestration (Kubernetes, Docker Swarm)
- Implementing Redis for session storage (if needed)

## Support

For issues or questions:
1. Check application logs: `docker-compose logs -f`
2. Review error messages in the application
3. Check database connectivity
4. Verify all environment variables are set correctly

