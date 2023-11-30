import express, { Router } from 'express';
import openaiController from '../controllers/openaiController';

const openaiRouter: Router = express.Router();

openaiRouter.get('/', openaiController.getJobs, openaiController.getMatches);

export default openaiRouter;