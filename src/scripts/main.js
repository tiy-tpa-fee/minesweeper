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
    },
    defaults: {
      mines: 0,
      state: 'new'
    },

    check: function (x,y) {
      

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

  var GameView = Backbone.View.extend({
    template: _.template($('#gameTemplate').html()),

    events: {
      'click td': 'checkCell'

    },

    checkCell: function (event) {
      var $td = $(event.target);
      var x = $td.data('x');
      var y = $td.data('y');
      this.model.check(x,y);

    },

    render: function () {
      var gameTemplate = this.template(this.model.toJSON());
      this.$el.html(gameTemplate);
      var $table = $('table.game', this.$el);
      _.each(this.model.get('board'), function (row, y) {
        var $tr = $('<tr>');
        _.each(row, function (col, x) {
          var $td = $('<td>');
          $td.data('x', x);
          $td.data('y', y);
          switch (col) {
            case ' ':
              $td.addClass('unrevealed');
              break;
            case '_':
              $td.addClass('revealed');
              break;
            case 'F':
              $td.addClass('flagged');
              break;
            case '*':
              $td.addClass('mine');
              break;
            default:
             $td.text(col);

          }

          $tr.append($td);
        })
       $table.append($tr);
      });
      return this.el;
    },
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.model.fetch();
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
      var game = new Game({id: gameId});
      var gameView = new GameView({model: game});
      $('main').html(gameView.render());
    },

    initialize: function() {
      Backbone.history.start();
    }
  });

  // Initializers_________________________________
  //______________________________________________

  var router = new Router();

});
