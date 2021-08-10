# SignupApp

## [Install react-native for both iOS and android environment](https://reactnative.dev/docs/environment-setup)

## How to set up and build the app locally? 

>### Install package && pods 
```
git clone https://github.com/juncoding/SignupApp
cd SignupApp
npm install
cd ios && pod install && cd ..
```

>### Run ios 
```
npm run ios
```
>### Run android
```
npm run android
```
## How to set up the backend server to be run locally? 

>### [Using docker (recommend)](https://docs.docker.com/engine/install/) 
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
