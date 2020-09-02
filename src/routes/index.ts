import express from 'express';
import seriesController from '../controllers/seriesController';
import notFound from './notFound';

const router = express.Router({ mergeParams: true });

router.get('/topEpisodes/:seriesId', seriesController.getTopVotedEpisodes);
router.get('/analytics/popularSeries', seriesController.getPopularSeries);

router.get('/*', notFound);

export default router;