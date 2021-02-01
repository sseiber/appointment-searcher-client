#  Appointment Searcher Client

## Dependencies
  * Node
  * NPM
  * Docker

## Install
  * This repository depends on the [Appointment Searcher Service](https://github.com/sseiber/Appointment-Searcher-Service) repository as a peer
  * Clone this repository
  * npm i
  * npm build

## Development
  * **test:**  
  `npm run test`  

  * **lint:**  
  `npm run tslint`  

  * **build a new version:**  
  `npm version [major|minor|patch] [--force]`  
  *this build is copied to the peer project Appointment-Searcher-Service as `client_dist`*
