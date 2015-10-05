import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
// import Router from './routers'; //filepath for routers directly next to main

$(() => {

  //______________________________________________

  const API_ROOT = 'https://minesweeper-api.herokuapp.com/';

  // Models_______________________________________
  //______________________________________________

  var Game = Backbone.Model.extend({
    urlRoot: function() {
      return API_ROOT + 'games';

    }


  });

  // Collections__________________________________
  //______________________________________________


  // Views________________________________________
  //______________________________________________

  var IndexView = Backbone.View.extend({
    template: $('#indexTemplate').text(),

    events: {
      // 'event selector': 'nameOfcallback'
      // similar to: $('selector').on('event', nameOfCallback);

      'click form.newGame button': 'createGame'
    },

    createGame: function (event) {
      var diff = event.target.value;
      var game = new Game({difficulty: diff});
      game.save().then(function() {
        Backbone.history.navigate(`/game/${game.get('id')}`, true);
      });


    },

    render: function() {
      this.$el.html(this.template);
      return this.el;   // 'this' is the JS IndexView instantiation
                        // 'el' is the html, or DOM, representation
    }
  });

      //var indexTemplate = this.template(this.model.toJSON());

  // Routers______________________________________
  //______________________________________________

  const Router = Backbone.Router.extend({
    routes: {
      '': 'showIndex',
      'game/:id': 'showGame'
    },

    showIndex: function() {
      var indexView = new IndexView();  //indexView is identical to "this" within IndexView declaration
      $('main').html(indexView.render());
    },

    showGame: function(gameId) {
      console.log(gameId);
    },

    initialize: function() {
      Backbone.history.start();
    }
  });

  // Initializers_________________________________
  //______________________________________________

  var router = new Router();

});
