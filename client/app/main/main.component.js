import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
  }

  allDataForStation(id) {
    window.location.href = `/api/sensors?stnid=${id}`;
  }
}

export default angular.module('landdoxApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
