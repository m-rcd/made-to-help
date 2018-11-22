# MADE to Help

[Motivation](#motivation) | [Build status](#build-status) | [Technologies](#technologies) | [User Stories](#user-stories) | [Running the App](#running-the-app) | [Running tests](#running-tests)  | [Contributing](#contributing) | [Leaning documentation](#documentation) | [MADE Engineers](#engineers)


**MADE to Help** is a mobile app that helps find you the best, and most accessible, routes for those who need  help navigating the city.

<p align="center">
![Logo](./assets/images/MADEtoHelp!.JPG)
</p>

##  <a name="motivation">**Motivation**</a>


The card wall is [here](https://trello.com/b/2cdiYIh2/made-to-help)
## Build Status
[![link](https://img.shields.io/badge/trello-board-green.svg)](https://trello.com/b/2cdiYIh2/made-to-help)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Build Status](https://travis-ci.org/m-rcd/made-to-help.svg?branch=master)](https://travis-ci.org/m-rcd/made-to-help)


##  <a name="technologies">**Technologies**</a>


[React Native](https://facebook.github.io/react-native/)

[Expo](https://expo.io/)

[Jest](https://github.com/facebook/jest)

[Enzyme](https://github.com/airbnb/enzyme)

[Mocha](https://github.com/mochajs/mocha)


##  <a name="user-stories">**User stories**</a>

```
As a User
So that I can see where I am
I want to open the app and see my location
```
```
As a User
So that I can plan my journey
I want to enter a start and end destination
```
```
As a User
So that I can warn others about a broken lift or absence of a ramp
I want to be able to send an alert
```
```
As a User
So that I am aware of reports
I want to see potential blockers on my journey
```

##  <a name="running-the-app">**Running the app**</a>


- Clone this repository:

```
 $ git clone https://github.com/m-rcd/made-to-help
 $ cd made-to-help
 ```

- Install dependencies:

```
$ yarn install
```

- Download `expo` app on your phone

- Run the app:

```
$ expo start
```
- Iphone: scan the QR code with the camera and open expo.

- Android: scan the QR code from expo app.

##  <a name="running-tests">**Running tests**</a>

- To run unit tests:

```
$ yarn test
```

- To run feature tests:

```
$ expo start
$ yarn feature-tests
```

- To check coverage:

```
$ yarn coverage
```



##  <a name="contributing">**Contributing**</a>

Pull Requests are always welcome.

When you edit the code, please run `yarn test` to check all the tests pass. Also run `yarn lint` to formatting of your code before you git commit.

Ensure the PR description clearly describes the problem and solution. It should include the relevant issue number, if applicable.


## <a name="documentation">**Learning documentation**</a>


https://github.com/m-rcd/made-to-help/wiki



## <a name="engineers">**MADE Engineers**</a>

[Emma Albury][1]

[Darcie Walsh][2]

[Marianne Rachid][3]

[Alex Kharouk][4]

[1]: https://github.com/emmaalbury
[2]: https://github.com/darciew
[3]: https://github.com/m-rcd
[4]: https://github.com/kharouk
