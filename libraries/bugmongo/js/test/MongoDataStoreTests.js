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

//@TestFile

//@Require('Class')
//@Require('bugmeta.BugMeta')
//@Require('bugmongo.DummyMongoose')
//@Require('bugmongo.MongoDataStore')
//@Require('bugunit.TestTag')
//@Require('bugyarn.BugYarn')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class           = bugpack.require('Class');
    var BugMeta         = bugpack.require('bugmeta.BugMeta');
    var DummyMongoose   = bugpack.require('bugmongo.DummyMongoose');
    var MongoDataStore  = bugpack.require('bugmongo.MongoDataStore');
    var TestTag         = bugpack.require('bugunit.TestTag');
    var BugYarn         = bugpack.require('bugyarn.BugYarn');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta         = BugMeta.context();
    var bugyarn         = BugYarn.context();
    var test            = TestTag.test;


    //-------------------------------------------------------------------------------
    // BugYarn
    //-------------------------------------------------------------------------------

    bugyarn.registerWinder("setupDummyMongoose", function(yarn) {
        yarn.wind({
            mongoose: new DummyMongoose()
        });
    });

    bugyarn.registerWinder("setupDummyMongoDataStore", function(yarn) {
        yarn.spin([
            "setupDummyMongoose",
            "setupTestLogger",
            "setupTestSchemaManager"
        ]);
        yarn.wind({
            mongoDataStore: new MongoDataStore(this.logger, this.schemaManager, this.mongoose)
        });
    });


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------


    var mongoDataStoreInstantiationTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            var yarn = bugyarn.yarn(this);
            yarn.spin([
                "setupDummyMongoose",
                "setupTestLogger",
                "setupTestSchemaManager"
            ]);
            this.testMongoDataStore = new MongoDataStore(this.logger, this.schemaManager, this.mongoose);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertTrue(Class.doesExtend(this.testMongoDataStore, MongoDataStore),
                "Assert instance of MongoDataStore");
            test.assertEqual(this.testMongoDataStore.getLogger(), this.logger,
                "Assert .logger was set correctly");
            test.assertEqual(this.testMongoDataStore.getSchemaManager(), this.schemaManager,
                "Assert .schemaManager was set correctly");
            test.assertEqual(this.testMongoDataStore.getMongoose(), this.mongoose,
                "Assert .mongoose was set correctly");
        }
    };

    var mongoDataStoreConfigureSchemaTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            var yarn = bugyarn.yarn(this);
            yarn.spin([
                "setupDummyMongoDataStore"
            ]);
            this.testEntityClass    = new Class();
            this.testEntityName     = "testEntityName";
            this.testEntityOptions  = {
                embedded: true
            };
            this.testEntitySchema   = yarn.weave("testEntitySchema", [this.testEntityClass, this.testEntityName, this.testEntityOptions]);
            this.testEntitySchema.addProperty(yarn.weave("testSchemaProperty", ["testPropertyName", "string", {}]))
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            this.mongoDataStore.configured = true;
            this.mongoDataStore.configureSchema(this.testEntitySchema);
            var mongooseModel   = this.mongoDataStore.getMongooseModelForName(this.testEntityName);
            var mongooseSchema  = mongooseModel.schema;
            var expectedSchemaObject = {
                testPropertyName: {
                    type: String
                }
            };
            test.assertEqual(JSON.stringify(mongooseSchema.schemaObject), JSON.stringify(expectedSchemaObject),
                "Assert configureSchema is returning expected result");
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(mongoDataStoreInstantiationTest).with(
        test().name("MongoDataStore - instantiation test")
    );

    bugmeta.tag(mongoDataStoreConfigureSchemaTest).with(
        test().name("MongoDataStore - #configureSchema test")
    );
});
