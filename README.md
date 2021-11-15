# Angular CRM Demo App

> A reusable CRM starter project for real-world business based on Angular 9, Angular-Material 9.x.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.x. The goal of this project is to create reusable project for real-world business. To achieve this target, we need a solution which includes simple authentication process, restful API feature with token support and simple but elegant UI design.

#### Features

* This project is built on the top of AngularClass/Angular-Starter.
* The UI part of this project is comprehensively built on Angular Material.
* This project includes ng-charts.
* ~~To simulate real-world business, this starter project chooses Json-Server as fake Restful API. (You can simple replace it with your own API).~~
* ~~Fake API is just readonly fake service.~~



#### Live Demo
[Demo App](https://angular-app-demo.harryho.org): The demo is just a proof of concept. It doesn't have back-end API and all features of master branch.

#### Screenshots

![Screenshot1](screenshots/screenshot-1.JPG)

![Screenshot2](screenshots/screenshot-2.JPG)

![Screenshot3](screenshots/screenshot-3.JPG)

![Screenshot4](screenshots/screenshot-4.JPG)

## Build & Setup

```bash
# Clone project
git clone https://github.com/harryho/ng-crm.git


# Install Angular CLI
npm install -g @angular/cli

# prepare Json-Server as fake Restful API
cd ng-crm


# Install the packages with npm
npm install


# Start the app with npm
npm start
# Or use ng
ng serve 

# Test with npm
npm run test
# Or use ng
ng test


# build for production 
npm run build --prod=true

# run as production
install -g serve
serve dist

```
r run -d --publish 8080:80  --name nc2 nc-prd:2.0
