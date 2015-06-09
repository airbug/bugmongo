/*
 * Copyright (c) 2014 airbug Inc. All rights reserved.
 *
 * All software, both binary and source contained in this work is the exclusive property
 * of airbug Inc. Modification, decompilation, disassembly, or any other means of discovering
 * the source code of this software is prohibited. This work is protected under the United
 * States copyright law and other international copyright treaties and conventions.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmongo.DummyMongooseModel')

//@Require('Class')
//@Require('Obj')
//@Require('TypeUtil')
//@Require('UuidGenerator')
//@Require('bugmongo.DummyCreateQuery')
//@Require('bugmongo.DummyFindByIdAndRemoveQuery')
//@Require('bugmongo.DummyFindByIdAndUpdateQuery')
//@Require('bugmongo.DummyFindByIdQuery')
//@Require('bugmongo.DummyFindOneAndUpdateQuery')
//@Require('bugmongo.DummyFindOneQuery')
//@Require('bugmongo.DummyFindQuery')
//@Require('bugmongo.DummyRemoveQuery')
//@Require('bugmongo.DummyWhereQuery')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // Bugpack Modules
    //-------------------------------------------------------------------------------

    var Class                           = bugpack.require('Class');
    var Obj                             = bugpack.require('Obj');
    var TypeUtil                        = bugpack.require('TypeUtil');
    var UuidGenerator                   = bugpack.require('UuidGenerator');
    var DummyCreateQuery                = bugpack.require('bugmongo.DummyCreateQuery');
    var DummyFindByIdAndRemoveQuery     = bugpack.require('bugmongo.DummyFindByIdAndRemoveQuery');
    var DummyFindByIdAndUpdateQuery     = bugpack.require('bugmongo.DummyFindByIdAndUpdateQuery');
    var DummyFindByIdQuery              = bugpack.require('bugmongo.DummyFindByIdQuery');
    var DummyFindOneAndUpdateQuery      = bugpack.require('bugmongo.DummyFindOneAndUpdateQuery');
    var DummyFindOneQuery               = bugpack.require('bugmongo.DummyFindOneQuery');
    var DummyFindQuery                  = bugpack.require('bugmongo.DummyFindQuery');
    var DummyRemoveQuery                = bugpack.require('bugmongo.DummyRemoveQuery');
    var DummyWhereQuery                 = bugpack.require('bugmongo.DummyWhereQuery');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var DummyMongooseModel = Class.extend(Obj, {

        _name: "bugmongo.DummyMongooseModel",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {DummyMongooseSchema} mongooseSchema
         * @param {string} modelName
         */
        _constructor: function(mongooseSchema, modelName) {

            this._super();


            //-------------------------------------------------------------------------------
            // Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {DummyMongoose}
             */
            this.dummyMongoose  = null;

            /**
             * @private
             * @type {string}
             */
            this.modelName      = modelName;

            /**
             * @type {DummyMongooseSchema}
             */
            this.schema         = mongooseSchema
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @return {Object}
         */
        getCollection: function() {
            return this.dummyMongoose.getCollection(this.modelName.toLowerCase());
        },


        //-------------------------------------------------------------------------------
        // Mongoose Methods
        //-------------------------------------------------------------------------------

        $where: function() {
            throw new Error("DummyMongoose Not Implemented");
        },
        aggregate: function() {
            throw new Error("DummyMongoose Not Implemented");
        },
        count: function() {
            throw new Error("DummyMongoose Not Implemented");
        },

        /**
         * @param {Object} createObject
         * @param {function(Error, Object)} callback
         */
        create: function(createObject, callback) {
            var query = new DummyCreateQuery(this, createObject);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        },

        distinct: function() {
            throw new Error("DummyMongoose Not Implemented");
        },
        ensureIndexes: function(callback) {
            callback();
        },

        /**
         * @param {Object} queryParams
         * @param {function(Error, Object)} callback
         * @return {DummyFindQuery}
         */
        find: function(queryParams, callback) {
            var query = new DummyFindQuery(this, queryParams);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        },

        /**
         * @param {string} id
         * @param {function(Error, Object)} callback
         * @return {DummyFindByIdQuery}
         */
        findById: function(id, callback) {
            var query = new DummyFindByIdQuery(this, id);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        },

        /**
         *
         * @param {string} id
         * @param {function(Error)} callback
         * @return {DummyFindByIdAndRemoveQuery}
         */
        findByIdAndRemove: function(id, callback) {
            var query = new DummyFindByIdAndRemoveQuery(this, id);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        },

        /**
         * @param {string} id
         * @param {Object} updateObject
         * @param {function(Error, Object)} callback
         * @return {DummyFindByIdAndUpdateQuery}
         */
        findByIdAndUpdate: function(id, updateObject, callback) {
            var query = new DummyFindByIdAndUpdateQuery(this, id, updateObject);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        },

        /**
         * @param {Object} queryParams
         * @param {function(Error, Object)} callback
         * @return {DummyFindOneQuery}
         */
        findOne: function(queryParams, callback) {
            var query = new DummyFindOneQuery(this, queryParams);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }

        },

        findOneAndRemove: function() {
            throw new Error("DummyMongoose Not Implemented");
        },

        /**
         * @param {Object} queryParams
         * @param {Object} updateObject
         * @param {(Object | function(Error, Object=))} queryOptions
         * @param {function(Error, Object=)=} callback
         * @return {DummyFindOneAndUpdateQuery}
         */
        findOneAndUpdate: function(queryParams, updateObject, queryOptions, callback) {
            if (TypeUtil.isFunction(queryOptions)) {
                callback = queryOptions;
                queryOptions = {};
            }
            var query = new DummyFindOneAndUpdateQuery(this, queryParams, updateObject, queryOptions);
            if (callback) {
                return query.exec(callback);
            } else {
                return query;
            }
        },
        mapReduce: function() {
            throw new Error("DummyMongoose Not Implemented");
        },
        populate: function() {
            throw new Error("DummyMongoose Not Implemented");
        },

        /**
         * @param {Object} queryParams
         * @param {function(Error, Object)} callback
         * @return {DummyRemoveQuery}
         */
        remove: function(queryParams, callback) {
            var query = new DummyRemoveQuery(this, queryParams);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        },
        update: function() {
            throw new Error("DummyMongoose Not Implemented");
        },
        where: function(queryParams, callback) {
            var query = new DummyWhereQuery(this, queryParams);
            if (callback) {
                query.exec(callback);
            } else {
                return query;
            }
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmongo.DummyMongooseModel', DummyMongooseModel);
});
