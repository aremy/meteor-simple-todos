import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js';

class TodosListCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        this.subscribe('tasks');
        this.hideCompleted = false;
        this.helpers({
            tasks() {
                const selector = {};

                // If hide completed is checked, filter tasks
                if (this.getReactively('hideCompleted')) {
                    selector.checked = {
                        $ne: true
                    };
                }
                // return Tasks.find({});
                // Show newest tasks at the top
                return Tasks.find(selector, {
                    sort: {
                        createdAt: -1
                    }
                });
            },

            incompleteCount() {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }).count();
            },
            currentUser() {
                return Meteor.user();
            }
        })
    }

    addTask(newTask) {
        // Insert a task into the collection
        /* Not available when "insecure" module is meteor-removed

        Tasks.insert({
            text: newTask,
            createdAt: new Date,
            owner: Meteor.userId(),
            username: Meteor.user().username
        });*/
        Meteor.call('tasks.insert', newTask);

        // Clear form
        this.newTask = '';
    }


    setChecked(task) {
        Meteor.call('tasks.setChecked', task._id, !task.checked);
        // Set the checked property to the opposite of its current value
        /* Not available when "insecure" module is meteor-removed
        Tasks.update(task._id, {
            $set: {
                checked: !task.checked
            },
        });*/
    }

    removeTask(task) {
        Meteor.call('tasks.remove', task._id);
        /* Not available when "insecure" module is meteor-removed
        Tasks.remove(task._id);
        */
    }

    setPrivate(task) {
        Meteor.call('tasks.setPrivate', task._id, !task.private);
    }
}

export default angular.module('todosList', [
    angularMeteor
])
    .component('todosList', {
        templateUrl: 'imports/components/todosList/todosList.html',
        //controller: TodosListCtrl
        controller: ['$scope', TodosListCtrl]
    });