'use strict';

angular.module('angularjsTutorial')
  .constant('firebaseUrl', 'https://ak-angularjstutorial.firebaseio.com/');

angular.module('angularjsTutorial')
  .factory('TodoService', ['$window', '$log', '$q', '$http', 'firebaseUrl', function ($window, $log, $q, $http, firebaseUrl) {
    $log.log('TodoService instantiated');


    var todos;

    // Need to append '.json' to make Firebase return JSON instead of an HTML page
    // https://www.firebase.com/docs/rest/api/
    var firebaseTodosUrl = firebaseUrl + 'todos';

    return {
      getTodos : function(){
        var deferred = $q.defer();

        // https://www.firebase.com/docs/rest/api/
        $http.get(firebaseTodosUrl + '.json')
        .success(function(data, status){
          $log.log('getTodos success', data);
          // Right now, data is an object. Keys are the $id
          todos = Object.keys(data).map(function(key){
            var todo = data[key];
            todo.$id = key;
            return todo;
          });

          deferred.resolve(todos);
        })
        .error(function(data, status){
          $log.log('getTodos error', data);
          deferred.reject(data);
        });

        return deferred.promise;
      },

      addTodo : function(options){
        var deferred = $q.defer();

        var newTodo = {
          title : options.title,
          completed : false
        };

        // POST to add a child to a path and get an auto-generated key
        // https://www.firebase.com/docs/rest/guide/saving-data.html#section-post
        $http.post(firebaseTodosUrl + '.json', newTodo)
        .success(function(data, status){
          $log.log('addTodo success', data);
          // success response provides the key of the new object at 'name'
          newTodo.$id = data.name;
          todos.push(newTodo);
          deferred.resolve(newTodo);
        })
        .error(function(data, status){
          $log.log('addTodo error', data);
          deferred.reject(data);
        });

        return deferred.promise;
      },

      removeTodo : function(todo){
        var deferred = $q.defer();

        todos.$remove(todo).then(function(todoRef){
          $log.log('resolving removeTodo promise');
          deferred.resolve(todoRef);
        })
        .catch(function(err){
          $log.log('error removing todo', err);
          $log.log('rejecting removeTodo promise');
          deferred.reject(err);
        });

        return deferred.promise;
      },

      saveTodo : function(todo){
        var deferred = $q.defer();

        todos.$save(todo).then(function(todoRef){
          $log.log('resolving saveTodo promise');
          deferred.resolve(todoRef);
        })
        .catch(function(err){
          $log.log('error saving todo', err);
          $log.log('rejecting saveTodo promise');
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  }]);
