# QA-Projects

Third project of the QA course. This project is about creating a note taking app using Svelte, Sveltekit, TailwindCSS and Prisma.  
It also uses MySQL as the database.  

## How to set it up

First you need to have a MySQL instance running, then you need to create a database with any name you want.  
Also you need to have installed Node.js.  
After that you need to modify the .env file with the database credentials, its recommended to use a root user for this.

```bash
DATABASE_URL="mysql://root:eco_map@localhost:3306/qa_proyects"
```

It follows the next pattern:

```bash
DATABASE_URL="mysql://user:password@host:port/database"
```

Then you need to install the dependencies with the following command if you are using npm:

```bash
npm install
```

After that you need to run the migrations with the following command:

```bash
npx prisma migrate dev
```

Then you can run the project with the following command:

```bash
npm run dev
```

Finally, you open [localhost:5173](http://localhost:5173) in your browser and you will see the app running.
