var models = require('../models');
var Page = models.Page;
var User = models.User;
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
var marked = require('marked');
var expect = require('chai').expect;
var chai = require('chai');
chai.use(require('chai-things'));
var should = chai.should();
var bluebird = require('bluebird');

describe('Page model', function () {

  beforeEach(function (done) {
    //Lets sync our database.
    User.sync({force: true})
      .then(function () {
        return Page.sync({force: true})
      })
      .then(function () {
        done();
      })
      .catch(done)
  })

  describe('Virtuals', function () {
    var page;
    console.log("hey inside virtuals");
    beforeEach(function () {
      console.log("before building the page");
      var newPage = {
      title : "Joe Codes",
      urlTitle: "Joe_Codes",
      content : "# My Title"
      }
      page = Page.build(newPage);
      console.log("our page is: ", page);
      result = '<h1 id="my-title">My Title</h1>\n';
    });
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
        expect(page.route).to.equal('/wiki/Joe_Codes');
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function () {
         expect(page.renderedContent).to.equal(result);
      });
    });
  });
  describe('Class methods', function () {
    beforeEach(function () {
      console.log("before building the page");
      var newPage1 = {
      title : "Joe Codes",
      urlTitle: "Joe_Codes",
      content : "# My Title",
      tags: ["javascript"]
      }
      var page1 = Page.create(newPage1)
          .catch(function(err){
            console.log("the error is: ", err);
      });
      var newPage2 = {
      title : "Joe Codes2",
      urlTitle: "Joe_Codes2",
      content : "# My Title2",
      tags: ["javascript"]
      }
      var page2 = Page.create(newPage2)
          .catch(function(err){
            console.log("the error is: ", err);
      });

      var newPage3 = {
      title : "Joe Codes3",
      urlTitle: "Joe_Codes3",
      content : "# My Title3",
      tags: ["java"]
      }
      var page3 = Page.create(newPage3)
          .catch(function(err){
            console.log("the error is: ", err);
      });
      console.log("our page is: ", page3);
    });
     describe('findByTag', function () {
       it('gets pages with the search tag', function(){
          Page.findByTag("javascript")
                          .then(function(result){
           console.log("the tag result from then: ", result);
           expect(result).to.have.length(2);
           expect(result[0].tags[0]).to.be.equal("javascript");
           expect(result[1].tags[0]).to.be.equal("javascript");
         });
         //console.log("the tag result is: ", result);

       });
       it('does not get pages without the search tag', function(){
         Page.findByTag("PHP")
          .then(function(result){
           //console.log("the tag result from then: ", result);
           expect(result).to.be.empty;
           //expect(result[0].tags[0]).to.be.equal("javascript");
          // expect(result[1].tags[0]).to.be.equal("javascript");
          }).catch(function(err){
            console.log("the erorr is:", err);
          });
       });
     });
   });

  // // describe('Instance methods', function () {
  //   describe('findSimilar', function () {
  //     it('never gets itself');
  //     it('gets other pages with any common tags');
  //     it('does not get other pages without any common tags');
  //   });
  // });

  // describe('Validations', function () {
  //   it('errors without title');
  //   it('errors without content');
  //   it('errors given an invalid status');
  // });

  // describe('Hooks', function () {
  //   it('it sets urlTitle based on title before validating');
  // });

});