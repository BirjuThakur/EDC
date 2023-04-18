const mongoose = require("mongoose");
const validator = require("validator");

//stage one schema 
const ApplicantCategorySchema = new mongoose.Schema({
    organization_id: {
      type: Number,
      required: true,
    },
    applicant: {
      type: String,
      required: true,
    },
  });

const OrganizationSchema = new mongoose.Schema({
    organization_id: {
      type: Number,
      required: true
    },
    organizationName: {
      type: String,
      required: true
    },
    applicant_category: {
        type: [ApplicantCategorySchema],
        required: true,
      },
    application_id: {
      type: Number,
      required: true
    }
  });

  const ApplyingFormSchema = new mongoose.Schema({
    application_id: {
      type: Number,
      required: true
    },
    applying_for: {
      type: String,
      required: true
    },
    organization: {
      type: [OrganizationSchema],
      required: true
    }
  });

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [3, "minimun 3 letters required"],
        maxLength: [20, "more than 20 letters not allowed"],
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is invalid")
            }
        },
        lowercase: true
    },
    address:{
        type: String,
        required: true,
    },
    ApplyingForm: {
        type: [ApplyingFormSchema],
        required: true
    },
    applicant_enrollment_number:{
        type:Number,
        required:true
    },
    names_of_team_members:{
        type:String,
        required:true
    },
    title_of_startup:{
        type:String,
        required:true
    },
    explain_solution:{
        type:String,
        required:true
    },
    currentStage: {
        type: String,
        enum: ['idea', 'prototype stage', 'startup stage'], // Allowed values for dropdown
        required: true
      }
})



// creating collections

const Appicatnts = new mongoose.model("Appicatnts",applicationSchema);

module.exports= Appicatnts;