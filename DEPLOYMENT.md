# Deployment

## Local development

```bash
npm ci
npm test
npm run build
```

The frontend calls the same-origin `/api` path. In production, the bundled Nginx
container proxies that path to the internal Isaura backend container.

## Production

Pushing to `main` triggers the **Deploy Isaura Frontend** GitHub Actions workflow.
The VPS deployment exposes the frontend on port `8080`; the backend and database
remain private on the Docker network.
