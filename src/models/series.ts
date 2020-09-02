import mongoose, { Document, Model } from 'mongoose';

interface Series {
  id: number;
  seriesName: string;
  accessCount: number;
}

const SeriesSchema = new mongoose.Schema<Series>({
  id: { type: Number, index: true },
  seriesName: String,
  accessCount: Number
});

export const SeriesModel = mongoose.connection.model('Series', SeriesSchema);
