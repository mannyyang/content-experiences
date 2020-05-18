# Content Experiences

**Tech Stack**

- Keystone.js as headless CMS (https://www.keystonejs.com/)
  - GraphQL as the backend (apollo used for client)
  - MongoDB as main database (https://cloud.mongodb.com/v2/5e8055bb8c48dd774eeb167a#clusters)
  - AWS S3 for file uploads (https://s3.console.aws.amazon.com/s3/buckets/content-experiences/?region=us-west-2&tab=overview)
- Next.js as React front-end (integrated as a keystonejs plugin)
  - Reactstrap as the component library. (https://reactstrap.github.io/)
    - Own component library/styleguide will be developed waaaayy later. Just extend available components for now.
  - No state management library used as of yet, just using the apollo cache for now.
    - MobX is desired when we need better global state management.

## Running the Project

Keystone.js uses `yarn` as its package manager.

1. Install with `yarn install`.
2. Run with `yarn dev`.
3. To support file uploads to AWS S3, you will need the .env file set up with the AWS access keys.

Once project is running, these links should be available: 

- ✔ Keystone instance is ready at http://localhost:4000 🚀
- 🔗 Keystone Admin UI:   http://localhost:4000/admin
- 🔗 GraphQL Playground:  http://localhost:4000/admin/graphiql
- 🔗 GraphQL API:         http://localhost:4000/admin/api

Currently, http://localhost:4000/flip-cards is where the main UI is. This will most likely change in the future.

## Project Structure

I try to follow Keystone.js's and Next.js's patterns as much as possible so it would be beneficial to understand those frameworks.

**High Level Structure**

```
project
│   .env              // environment variables
│   index.js          // main entry point for keystone.js
│
└───client            // client contains all the next.js (front-end files)
│   └───components    // shared components
│   └───lib           // shared utils
│   └───pages         // Next.js pages (each represents a route)
│   
└───lists             // Keystone.js models
└───custom-routes     // Express routes that aren't part of keystone or next.js
```

## Project Tasks

Roadmap and upcoming tasks are all logged in the `Projects` tab of this github repo. 
