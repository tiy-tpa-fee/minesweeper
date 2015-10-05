import Backbone from 'backbone';

const Router = Backbone.Router.extend({
  routes: {
    '': 'showIndex',
    'game/:id': 'showGame'
  },

  showIndex: function() {
    var indexView = new IndexView();
    $('main').html(indexView.render());
  },

  showGame: function() {

  },

  initialize: function() {
    Backbone.history.start();
  }
});

export default Router;
