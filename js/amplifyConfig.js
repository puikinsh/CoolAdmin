import { Amplify } from "aws-amplify";
import {generateClient } from "aws-amplify/api";
import backendConfig from "../src/amplifyconfiguration.json"

Amplify.configure(backendConfig)
export const client = generateClient()

