[![Deploy to Firebase Hosting on merge](https://github.com/vaismav/end-to-end-firebase-template/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=main)](https://github.com/vaismav/end-to-end-firebase-template/actions/workflows/firebase-hosting-merge.yml)

[![Main - Firebase function deploy](https://github.com/vaismav/end-to-end-firebase-template/actions/workflows/functions-deploy.yml/badge.svg)](https://github.com/vaismav/end-to-end-firebase-template/actions/workflows/functions-deploy.yml)

[![CI tests](https://github.com/vaismav/end-to-end-firebase-template/actions/workflows/test.yml/badge.svg)](https://github.com/vaismav/end-to-end-firebase-template/actions/workflows/test.yml)

# HybridBank Avishai Vasiman

I've used node 14 with reactJS for the client and Firebase Cloud Services.

the user authentication system, db, serverless functions are implemented through Firebase.

dashboard and transfer actions require authentication, while the deposit page is merely to simulate a deposit to account(probably triggered from the legacy system)

the legacy system API is implemented using firebase cloud functions as well

### Quick Demo

you can run the simulator locally or check the site [here](https://avishaivaisman-hybridbank.web.app)

pages index:

- [Login & new account: https://avishaivaisman-hybridbank.web.app/login](https://avishaivaisman-hybridbank.web.app/login)
- [Dashboard: https://avishaivaisman-hybridbank.web.app/home](https://avishaivaisman-hybridbank.web.app/home)
- [Transfer: https://avishaivaisman-hybridbank.web.app/transfer](https://avishaivaisman-hybridbank.web.app/transfer)
- [Deposit: https://avishaivaisman-hybridbank.web.app/deposit](https://avishaivaisman-hybridbank.web.app/deposit)

## Running the client and server locally

### Requirements

- Firebase CLI (installation guid can be found [here](https://firebase.google.com/docs/cli))

- Node 14

- NPM

After cloning the repo, use the following commands

### `npm start`

will run the Client locally.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run serve`

Launch the Firebase Emulator to imitate the server

To simulate the legacy system, change the boolean value at the `localhost` constant to `true` [here](functions/src/legacySystem.ts)
