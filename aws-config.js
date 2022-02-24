// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
var aws_app_analytics = 'enable';
var aws_cognito_identity_pool_id = 'us-east-1:cbf1a9f5-b5a7-4747-b594-dde7581bb1d3';
var aws_cognito_region = 'us-east-1';
var aws_mobile_analytics_app_id = '2addb395d36049e68e4885136716c3bf';
var aws_mobile_analytics_app_region = 'us-east-1';
var aws_project_id = '991df13c-c8ce-4fe0-8707-650dd2dc05c1';
var aws_project_name = 'qnary_react';
var aws_project_region = 'us-east-1';
var aws_resource_name_prefix = 'qnaryreact-mobilehub-2051767775';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
  });
AWS.config.update({customUserAgent: 'MobileHub v0.1'});