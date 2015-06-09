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

//@Export('bugmongo.DummyFindOneQuery')

//@Require('Class')
//@Require('bugmongo.DummyMongoQuery')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // Bugpack Modules
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var DummyMongoQuery     = bugpack.require('bugmongo.DummyMongoQuery');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {DummyMongoQuery}
     */
    var DummyFindOneQuery = Class.extend(DummyMongoQuery, {

        _name: "bugmongo.DummyFindOneQuery",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {DummyMongooseModel} dummyMongooseModel
         * @param {string} queryParams
         */
        _constructor: function(dummyMongooseModel, queryParams) {

            this._super(dummyMongooseModel);


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {object}
             */
            this.queryParams     = queryParams;

            /**
             * @private
             * @type {boolean}
             */
            this.queryLean      = false;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {boolean} queryLean
         */
        lean: function(queryLean) {
            this.queryLean = queryLean;
            return this;
        },

        query: function() {
            return this.findOne(this.queryParams);
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmongo.DummyFindOneQuery', DummyFindOneQuery);
});
