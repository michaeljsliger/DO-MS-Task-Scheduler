# USAGE

From project root, run `npm install` and to launch the service use the below command
```
ts-node-esm ./src/app.ts
```

To run the script to seed the single events, in another cmd/process/bash/etc. run the following command
```
node create_tasks.ts
```

# Considerations

The choice to use a mock DB is specifically to keep
this project brief and portable. Any system designed
for real-world use would utilize a DB rather than caching to better scale.

# TODO

Mock DB queries x
Task Execution x

Extra Credit:
Task Cleanup x
Current scheduled tasks x
Edit task x
Delete task x

