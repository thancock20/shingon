import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function (methodName, ClassName) {
  Meteor.methods({
    [`${methodName}.create`](toInsert) {
      check(toInsert, Object);

      const instance = new ClassName();
      instance.create(toInsert);
    },

    [`${methodName}.edit`](Id, updates) {
      check(Id, String);
      check(updates, Object);

      const instance = ClassName.findOne(Id);
      instance.edit(updates);
    },

    [`${methodName}.delete`](Id) {
      check(Id, String);

      const instance = ClassName.findOne(Id);
      instance.remove();
    }
  });
}
