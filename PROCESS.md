1) Project Structure for Scheduler 

```
mkdir src
cd src
mkdir scheduler
cd scheduler
npm init -y
npm install express pg typescript ts-node-dev @types/express cron redis @types/redis
npx tsc --init
```

2) Configure TS for Scheduler

3) Services / Executor Project Structure

API Gateway, Executor

```
mkdir services
cd services
mkdir api executor
cd api
touch index.ts
cd ../executor
touch index.ts
cd ../../
touch database.ts
touch app.ts
```