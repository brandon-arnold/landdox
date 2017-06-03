'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.scss';

angular.module('landdoxApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
  'validation.match', main, constants, util
])
  .config(routeConfig)
  .run(function($rootScope, $location) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['landdoxApp'], {
      strictDi: true
    });
  });
