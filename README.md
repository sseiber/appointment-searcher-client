# Appointment Searcher Client
This project was built to help me schedule a COVID-19 vaccine appointment for my 88 year old mother. The scheduling service I was using was a 3rd party generic scheduling system and it was up to me to sit in front of the computer and press the refresh button hoping an open appointment slot would appear. Even if I was lucky enough to find an open appointment slot I had to be the first one to click the button, fill out the form, and submit it before someone else somewhere did the same thing. It was super frustrating!

Sitting in front of your computer pressing the refresh button is a classic mundane repetitive task that needed to be optimized with the help of a computer. This project is simple. It queries the appointment service web page and then looks for an open appointment slot. It does this over and over until you tell it to stop. If it finds an open appointment slot on the web page it notifies you with a sound. That's it. There is nothing nefarious or "back door" about this. It is exactly as if you were pressing the refresh button yourself.

## Architecture
This project is the web client part of the [Appointment Searcher Service project](https://github.com/sseiber/appointment-searcher-service). Please be sure to read the README in that project.

This project will build the webpack bundles for the React web client in the `./client_dist` directory.

## Dependencies
* VS Code - you really should be using this
* Node (v14+) - the language
* Typescript - because I think type safety is necessary
* React - web client
* Mobx - opinionated - could be React context/hooks but I'm already used to Mobx observables
* Webpack - pretty standard (and web-dev-server for testing stand alone)
* Docker - if you want to build/run the Docker container

## Install
```
git clone https://github.com/sseiber/appointment-searcher-client

cd appointment-searcher-client

npm i
```

## Run
To build the bundles run the build script:
```
npm run build
```

To start the local web-dev-server and run the app locally:
```
npm start
```

## Conclusion
I hope you find this tool useful to help yourself and help you help others who are less technically inclined to access the appointment services in order to received their COVID vaccinations.

Stay safe, mask up, and stay healthy!
