import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BasicServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    new WebApp(this, "web-app")
  }
}

export interface WebAppProps {
  environment?: string;
}

export class WebApp extends Construct {
  constructor(scope: Construct, id: string, props: WebAppProps = {}) {
    super(scope, id);
    const getFunction = new NodejsFunction(this, "get-function", {
      memorySize: 128, //128-10240 MB
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, `/../src/my-lambda/get.ts`),
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
      },
    })
  }
}