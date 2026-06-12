<div align="center">
  <h1><img src="https://gocart-gs.vercel.app/favicon.ico" width="20" height="20" alt="GoCart Favicon">
   GoCart - Production DevOps Manual & Guide</h1>
  <p>
    An open-source multi-vendor e-commerce platform built with Next.js, Tailwind CSS, Redux Toolkit, and Prisma.
  </p>
  <p>
    <a href="./LICENSE.md"><img src="https://img.shields.io/github/license/GreatStackDev/goCart?style=for-the-badge" alt="License"></a>
    <a href="https://github.com/GreatStackDev/goCart/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome"></a>
    <a href="https://github.com/GreatStackDev/goCart/issues"><img src="https://img.shields.io/github/issues/GreatStackDev/goCart?style=for-the-badge" alt="GitHub issues"></a>
  </p>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technology Stack](#%EF%B8%8F-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Local Setup](#-installation--local-setup)
- [🔑 Environment Variables](#-environment-variables)
- [🐳 Docker Setup & Command Handbook](#-docker-setup--command-handbook)
- [🤖 GitHub Actions Workflows](#-github-actions-workflows)
- [🔐 GitHub Secrets Setup Guide](#-github-secrets-setup-guide)
- [🔍 Running Tests & Linting](#-running-tests--linting)
- [⚠️ Troubleshooting Guide](#%EF%B8%8F-troubleshooting-guide)
- [🤝 Contributing Guidelines](#-contributing-guidelines)
- [📘 DevOps & CI/CD Comprehensive Guide](#-devops--cicd-comprehensive-guide)
  - [How GitHub Actions Works Internally](#how-github-actions-works-internally)
  - [Workflow Triggers on Push to Main/Master](#workflow-triggers-on-push-to-mainmaster)
  - [How Runners Execute Jobs](#how-runners-execute-jobs)
  - [How Docker Integrates with GitHub Actions](#how-docker-integrates-with-github-actions)
  - [CI/CD Pipelines in Real-World Industry Projects](#cicd-pipelines-in-real-world-industry-projects)
  - [How to Troubleshoot Failed Workflows and Docker Builds](#how-to-troubleshoot-failed-workflows-and-docker-builds)

---

## ✨ Features

- **Multi-Vendor Architecture:** Allows multiple vendors to register, manage products, and sell on a single platform.
- **Customer-Facing Storefront:** Responsive user interface for customers to browse and purchase products.
- **Vendor Dashboards:** Dedicated analytics and product management tools for vendors.
- **Admin Panel:** Platform administration panel to manage vendors, approve stores, and review orders.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (React 19, App Router)
- **Styling:** Tailwind CSS v4 with PostCSS
- **State Management:** Redux Toolkit (`@reduxjs/toolkit` and `react-redux`)
- **Database & ORM:** PostgreSQL and Prisma ORM
- **Routing & Rendering:** Next.js Standalone Node Server

---

## 📁 Project Structure

```text
gocart/
├── .github/workflows/          # GitHub Actions CI/CD workflows
│   └── cicd.yml                # Unified CI/CD pipeline
├── app/                        # Next.js App Router folders
├── assets/                     # Application assets and dummy data
├── components/                 # Shared React components
├── lib/                        # Redux store, slices, and utility functions
│   └── store.test.js           # Vitest unit test for store validation
├── prisma/                     # Database schemas and configurations
│   └── schema.prisma           # Prisma PostgreSQL schema
├── Dockerfile                  # Multi-stage production Docker configuration
├── .dockerignore               # Files ignored by Docker build context
├── docker-compose.yml          # Local Postgres & Web stack orchestration
├── package.json                # Project dependencies and script scripts
└── README.md                   # Complete DevOps manual & project instructions
```

---

## 🚀 Installation & Local Setup

### Prerequisites
- **Node.js**: `18.17.0` or higher (LTS `20+` recommended)
- **Database**: PostgreSQL database (if running database queries)

### Setup Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the local development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the root of the project:

```env
# Application Settings
NEXT_PUBLIC_CURRENCY_SYMBOL = '$'
PORT = 3000

# Database Connections (Optional/Prisma)
DATABASE_URL = "postgresql://gocart_user:gocart_password@localhost:5432/gocart_db?schema=public"
DIRECT_URL = "postgresql://gocart_user:gocart_password@localhost:5432/gocart_db?schema=public"
```

---

## 🐳 Docker Setup & Command Handbook

Our production Docker build is structured as a **multi-stage build** defined in the [Dockerfile](file:///d:/github/gocart/Dockerfile). This optimizes speed, limits dependencies, and reduces the output image size down to **~150MB** by using Next.js standalone features.

### Command Reference

#### 1. Build the Docker Image
Builds the Next.js production image locally:
```bash
docker build -t gocart-app:latest .
```

#### 2. Run Container
Runs the image on port 3000:
```bash
docker run -d -p 3000:3000 --name gocart-web gocart-app:latest
```

#### 3. Stop Container
```bash
docker stop gocart-web
```

#### 4. Restart Container
```bash
docker restart gocart-web
```

#### 5. Remove Container
```bash
docker rm gocart-web
```

#### 6. Remove Image
```bash
docker rmi gocart-app:latest
```

#### 7. View Logs
View active console output from the web container:
```bash
docker logs -f gocart-web
```

#### 8. Execute Commands Inside Container
Open a shell inside the running container to debug:
```bash
docker exec -it gocart-web sh
```

#### 9. Docker Volume Management
Create, inspect, and remove persistent volumes (used by PostgreSQL):
```bash
docker volume create postgres_data
docker volume ls
docker volume inspect postgres_data
docker volume rm postgres_data
```

#### 10. Docker Network Management
Create and inspect bridges networks:
```bash
docker network create gocart-net
docker network ls
docker network inspect gocart-net
```

#### 11. Run Multi-Service Compose Stack (Web + DB)
Starts the entire stack in the background:
```bash
docker compose up -d
```
Stops and tears down all services, networks, and volumes:
```bash
docker compose down -v
```

#### 12. Push Image to Docker Hub
Authenticate and upload the image:
```bash
docker login -u <username>
docker tag gocart-app:latest <username>/gocart:latest
docker push <username>/gocart:latest
```

#### 13. Pull Image from Docker Hub
```bash
docker pull <username>/gocart:latest
```

---

## 🤖 GitHub Actions CI/CD Pipeline (`cicd.yml`)

We have redesigned and consolidated the 8 separate workflow files into a single enterprise-grade, unified pipeline located at [.github/workflows/cicd.yml](file:///d:/github/gocart/.github/workflows/cicd.yml). This enables a single connected graph in the GitHub Actions UI with strict dependency chaining, concurrency controls, environment support, cache optimizations, and automated job summaries.

### 📊 Pipeline Architecture

```text
┌─────────────────┐
│    1. Build     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     2. Lint     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     3. Test     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Security Scan│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 5. Docker Build │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 6. Docker Push  │ ◄── [Runs only on Push & workflow_dispatch]
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   7. Release    │ ◄── [Runs only on Push]
└─────────────────┘
```

### ⚙️ Pipeline Jobs & Dependency Breakdown

1. **🏗️ Build**: Checks out code, setups Node.js 20, caches npm packages, installs dependencies, compiles the Next.js app, and uploads the `.next/` build output to shared workspace artifacts.
2. **🔍 Lint** (*Needs: Build*): Performs static analysis to enforce code quality using ESLint (`npm run lint`).
3. **🧪 Test** (*Needs: Lint*): Runs automated Vitest unit tests, generates reports, and uploads them.
4. **🔒 Security Scan** (*Needs: Test*): Scans npm packages for vulnerabilities (`npm audit`) and runs an active scanner looking for hardcoded keys/secrets. Uploads the security report.
5. **🐳 Docker Build** (*Needs: Security Scan*): Sets up Docker Buildx/QEMU, builds the Dockerfile locally using GitHub Actions layer cache, and validates image integrity.
6. **🚀 Docker Push** (*Needs: Docker Build*): Runs on main/master branches or manual dispatch. Logs into Docker Hub and pushes the image tagged with `:latest` and the commit SHA (`:${{ github.sha }}`).
7. **🏷️ Release** (*Needs: Docker Push*): Runs on push merges to main/master. Automatically generates a version tag (`vYYYY.MM.DD-sha`), creates it on Git, and publishes a GitHub Release with auto-generated release notes.

---

## 🔐 GitHub Secrets Setup Guide

To enable Docker Hub push, configure the following secrets in your GitHub repository (**Settings > Secrets and variables > Actions > New repository secret**):

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `DOCKER_USERNAME` | Your Docker Hub Username | `myusername` |
| `DOCKER_PASSWORD` | Your Docker Hub Personal Access Token (PAT) | `dckr_pat_xxxx` |

---

## 🔍 Running Tests & Linting

### Unit Testing
We use **Vitest** for running unit tests:
```bash
# Run tests once (for CI pipeline)
npm run test

# Run tests in watch mode
npm run test:watch
```

### Linting
To check code format and ESLint rules:
```bash
npm run lint
```

---

## ⚠️ Troubleshooting Guide

### Docker Build Failures
* **Error**: `Prisma Client could not find its engine...`
  * **Solution**: Ensure that `npx prisma generate` is executed during the builder phase in the Dockerfile if your code imports the Prisma Client.
* **Error**: `JavaScript heap out of memory` during Next.js builds.
  * **Solution**: Next.js builds can be memory-intensive. Increase memory allocations in the Dockerfile using `ENV NODE_OPTIONS="--max-old-space-size=4096"`.
* **Error**: Compose failing with `port already in use`.
  * **Solution**: A service is running on port 3000 or 5432 locally. Terminate it using `kill -9 $(lsof -t -i:3000)` or change host port mapping in `docker-compose.yml` to `"3001:3000"`.

### GitHub Actions Failures
* **Error**: `Process completed with exit code 1` on Docker Push step.
  * **Solution**: Check if your `DOCKER_USERNAME` or `DOCKER_PASSWORD` is expired or incorrect.
* **Error**: SSH Connection Timeout.
  * **Solution**: Ensure the server firewall permits port 22 access from GitHub IP addresses or whitelist GitHub Actions CIDR blocks, or verify `SSH_HOST` is reachable.

---

## 🤝 Contributing Guidelines 

1. Fork the repository and create your feature branch: `git checkout -b feature/my-cool-feature`.
2. Commit your changes: `git commit -m "feat: add super feature"`.
3. Verify formatting and unit tests: `npm run lint` and `npm run test`.
4. Push to the branch: `git push origin feature/my-cool-feature`.
5. Open a Pull Request targeting `master` or `main`.

---

## 📘 DevOps & CI/CD Comprehensive Guide

### How GitHub Actions Works Internally

GitHub Actions is an event-driven automation platform that runs on standard virtualized hardware (or self-hosted machines). 
* **Events**: Any activity in your repository (like a `push`, `pull_request`, `issue creation`, or `release`) creates a payload containing git metadata.
* **Workflows**: When an event occurs, GitHub searches the `.github/workflows/` directory for YAML configurations that have matching `on:` conditions.
* **Jobs & Steps**: A workflow is made of one or more **Jobs** that execute in parallel by default. Each job runs inside a freshly provisioned Virtual Machine (runner). Jobs contain **Steps** which run sequentially.

### Workflow Triggers on Push to Main/Master

When you configure `on: push: branches: [ main, master ]`, the GitHub trigger system listens to Git hooks pushed to GitHub's remote repositories.
1. The developer pushes commits using `git push origin main`.
2. GitHub's webhook dispatcher intercepts the push hook, parses the branch name, and matches it with the workflows directory.
3. If matches are found, GitHub creates a **Workflow Run**, schedules jobs, and queues them for execution on the orchestrator.

### How Runners Execute Jobs

GitHub hosts runners on Windows, Ubuntu, and macOS environments. When a job is queued:
1. GitHub provisions a secure, ephemeral Virtual Machine (VM) running in Microsoft Azure.
2. The VM starts and downloads an agent application called the **GitHub Actions Runner**.
3. The runner agent connects back to GitHub's orchestrator over HTTPS, claiming the queued job.
4. The runner executes steps: checking out code via git, installing compilers/Node runtimes, running shell scripts, and executing pre-packaged node scripts (called "Actions" from the GitHub Marketplace).
5. Upon job completion or failure, logs and artifacts are uploaded, and the VM is **destroyed** to prevent credentials and data leaks.

### How Docker Integrates with GitHub Actions

Docker integration is fundamental to modern CI/CD:
* **Consistent Environments**: Instead of installing dependencies directly on the runner VM, we can build a Docker image. The Docker image acts as a single packaging format containing the runtime, configuration, and app code.
* **Service Containers**: GitHub Actions allows running sidecar containers during a job (e.g. spinning up a Redis or Postgres database container alongside unit tests).
* **Docker Buildx & Actions**: Official Docker Actions (`docker/setup-buildx-action`, `docker/login-action`, `docker/build-push-action`) initialize Docker Engine's BuildKit on the runner. This handles concurrent layer caching, multi-platform builds (x86/ARM), and direct transfers to registries like Docker Hub or GitHub Packages.

### CI/CD Pipelines in Real-World Industry Projects

In enterprise environments, pipelines are structured in stages:
1. **Lint / Commit Message Checks**: Validates formatting and ensures commits follow standards.
2. **Static Application Security Testing (SAST)**: Analyzes source code for secret leaks and vulnerabilities.
3. **Unit & Integration Testing**: Tests features in isolation.
4. **Artifact Compilation**: Docker images are built, tagged with semantic versioning/commits, and pushed to a Secure Private Registry.
5. **Deployment Gate**: Manual approvals (via environment protection rules) ensure developers sign off on production releases.
6. **CD Execution**: Continuous Deployment tools (like ArgoCD or Kubernetes operators) pull the image and perform rolling updates with health probes.

### How to Troubleshoot Failed Workflows and Docker Builds

1. **Read Build Logs**: Expand failing steps in GitHub Actions. Look for compiler outputs, syntax errors, or dependency conflicts.
2. **Debug Locally**: Always attempt to run the command locally first (e.g. `npm run build` or `docker build .`) to isolate if the problem is in the code or the runner configuration.
3. **Check Runner Resources**: Large compiles can hit CPU or memory limits on free runners (2 vCPUs and 7GB of RAM). Optimizing builds (like Next.js standalone outputs) is vital.
4. **Inspect Layers**: If a Docker build fails, check which step (layer) it failed on. Check file paths, environment variables, and ensure cache mounts are configured.
