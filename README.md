# SignupApp - [Demo Video](https://www.youtube.com/watch?v=5EknDYhex5I)

>### Features
```
* Use Redux store
* Photo library permission check & request (iOS)
* Basic validation - check empty value
* Upload image to backend server
```

## [How to install react-native for both iOS and android environment](https://reactnative.dev/docs/environment-setup)

## How to set up and build the app locally? 

>### Install packages && pods 
```
git clone https://github.com/juncoding/SignupApp
cd SignupApp
npm install
npm run pod
```

>### Run ios 
```
npm run ios
```
>### Run android - launch simulator from android studio first (via AVD Manager)
```
adb reverse tcp:3000 tcp:3000
npm run android
```
## How to set up the backend server to be run locally? 

>### [Use docker (recommend)](https://docs.docker.com/engine/install/) 
```
docker run -p 3000:3000 zj1o27/rn-demo-server
```

>### Build by yourself 
```
git clone https://github.com/juncoding/SignupAppServer
cd SignupAppServer
npm install
npm run
```
