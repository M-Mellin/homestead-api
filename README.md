# HomeStead API
 
RESTful API backend
 
Built with **Node.js**, **Express**, and **MongoDB**.
 
---

## Table of Contents
 
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Running with Docker](#running-with-docker)
  - [Development](#development)
  - [Production](#production)
- [CI/CD](#cicd)
- [Architecture](#architecture)
- [Authentication](#authentication)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)

---
 
## Prerequisites
 


---
 
## Environment Variables
 
Create a `.env` file in the project root based on the template below:
 
```env

```
 
---

## Running with Docker
 
The project uses three Compose files:
 
| File | Purpose |
|------|---------|
| `docker-compose.yml` | Base config — shared services and environment |
| `docker-compose.development.yml` | Development overrides — bind mounts, live reload |
| `docker-compose.production.yml` | Production overrides — image, secrets, restart policy |
 
### Development
 
Mounts the local source directory into the container for live reload:
 
```bash
docker compose -f docker-compose.yml -f docker-compose.development.yml up
```
 
### Production
 
Pulls a pre-built image from the registry and mounts secrets from the host:
 
```bash
# Secrets are expected at ~/secrets/ on the host:
# ~/secrets/serviceAccountKey.json
# ~/secrets/private-key.pem
# ~/secrets/public-key.pem
 
docker compose -f docker-compose.yml -f docker-compose.production.yml pull
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --remove-orphans
```
 
MongoDB runs with authentication enabled, binds only to localhost (`127.0.0.1:27017`), and persists data in a named Docker volume (`mongo_data`).
 
---

## CI/CD

 
---
 
## Architecture
 
```

```
 
### Key Design Decisions
 
- **Decision** — Description.

---
 
## Authentication

 
---
 
## API Reference
 
All endpoints are prefixed with `/api/v1`.
 
---

 
## Error Handling
 
---
 
## Author
 
**Mattias Mellin**\
<mattias.mellin@gmail.com>\
[GitHub](https://github.com/M-Mellin) · [LinkedIn](https://www.linkedin.com/in/mattias-mellin-22a283267/)