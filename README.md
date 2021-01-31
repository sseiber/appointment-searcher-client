# LoopBox local client

## Dependencies
  * Node
  * NPM
  * Docker

## Install
  * This repository depends on the [LoopBox-Local-Service](https://github.com/sseiber/LoopBox-Local-Service) repository as a peer
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
  *this build is copied to the peer project LoopBox-Local-Service as `client_dist`*
