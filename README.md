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

I did not complete the UI as I've already spent enough time on this project thus far. 
The UI would be a simple addition with a handful of components and some communication with the API gateway.

In lieu of the UI, I added an easily runnable script that seeds tasks: `create_tasks.sh` and `create_tasks.ts`

Thanks for reading. Cool challenge.