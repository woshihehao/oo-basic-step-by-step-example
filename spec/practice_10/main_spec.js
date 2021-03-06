"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var Person = require("../../src/practice_10/person.js");
var Student = require("../../src/practice_10/student.js");
var Teacher = require("../../src/practice_10/teacher.js");
var Class = require("../../src/practice_10/class.js");

describe("Person", function(){
    it("should have field name and age", function(){
        var person = new Person(1, "Tom", 21);
        expect(person.name).to.equal("Tom");
        expect(person.age).to.equal(21);

    });

    it("should have a method introduce, introduce person with name and age", function(){
        var person = new Person(1, "Tom", 21);

        var introduce = person.introduce();

        expect(introduce).to.equal("My name is Tom. I am 21 years old.");

    });

    describe("Student", function(){
        var klass;

        before(function(){
            klass = new Class(2);
        });

        it("should have field name, age and class number", function(){
            var student = new Student(1, "Tom", 21, klass);
            expect(student.name).to.equal("Tom");
            expect(student.age).to.equal(21);
            expect(student.klass).to.equal(klass);
        });

        describe("#introduce", function(){
            it("should overwrite Person introduce, introduce with name, age and class number", function(){
                var student = new Student(1, "Tom", 21, klass);
                var introduce = student.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am at Class 2.");
            });

            it("should print Leader role, given student is leader", function(){
                var klass = new Class(2);
                var student = new Student(1, "Tom", 21, klass);

                klass.assignLeader(student);
                var introduce = student.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Student. I am Leader of Class 2.");            
            });

        });


    });

    describe("Teacher", function(){
        var klass;

        before(function(){
            klass = new Class(2);
        });

        it("should have field name, age and class number", function(){
            var teacher = new Teacher(1, "Tom", 21, klass);
            expect(teacher.name).to.equal("Tom");
            expect(teacher.age).to.equal(21);
            expect(teacher.klass).to.equal(klass);
        });

        describe("#introduce", function(){
            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have class", function(){
                var teacher = new Teacher(1, "Tom", 21, klass);
                var introduce = teacher.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach Class 2.");

            });

            it("should overwrite Person introduce, introduce with name, age and class number, given teacher have no class", function(){
                var teacher = new Teacher(1, "Tom", 21);
                var introduce = teacher.introduce();

                expect(introduce).to.equal("My name is Tom. I am 21 years old. I am a Teacher. I teach No Class.");

            });
        });


    });
});

describe("Class", function(){
    it("should have class number", function(){
        var klass = new Class(2);
        expect(klass.number).to.equal(2);
    });

    it("should get display name with number", function(){
        var klass = new Class(2);
        expect(klass.getDisplayName()).to.equal("Class 2");
    });
    
    describe("#assignLeader", function(){
        it("should assign student as Leader, given student is class member", function(){
            var klass = new Class(2);
            var student = new Student(1, "Jerry", 21, klass);

            klass.assignLeader(student);
            expect(klass.leader).to.equal(student);
         });

        it("should not assign student as Leader, given student is not class member", function(){
            var klass = new Class(2);
            var otherKlass = new Class(3);
            var student = new Student(1, "Jerry", 21, otherKlass);

            klass.assignLeader(student);

            expect(klass.leader).not.equal(student);
        });

        it("should not assign student as Leader, given student is not class member", function(){
            var klass = new Class(2);
            var otherKlass = new Class(3);
            var student = new Student(1, "Jerry", 21, otherKlass);

            var spy = sinon.spy(console, "log");

            klass.assignLeader(student);

            expect(klass.leader).not.equal(student);

            //expect(console.log.getCall(0).args[0]).to.equal("It is not one of us."); //assert style 2.
            expect(spy.calledWith("It is not one of us.")).to.be.ok;
        });
        
    });
    
    describe("#appendMemeber", function(){
        it("should change student's klass attribute", function(){
            var klass = new Class(2);
            var otherKlass = new Class(3);
            
            var student = new Student(1, "Jerry", 21, otherKlass);

            expect(student.klass).to.equal(otherKlass);

            klass.appendMember(student);
            
            expect(student.klass).to.equal(klass);
        });
    });
});