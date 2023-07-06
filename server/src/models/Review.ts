import mongoose, { Model } from 'mongoose';
import { Review } from '../entities/reviewEntity';
import userModel from './User';
import logger from '../config/logger';
import { User } from '../entities/userEntity';
import advertModel from './Advert';
import { Advert } from '../entities/advertEntity';

const Types = mongoose.Schema.Types;

interface ReviewModel extends Model<Review> {
  getAverageRating(revieweeId: string): Promise<[number, number]>;
}

const reviewSchema = new mongoose.Schema<Review>({
  rating: {
    type: Types.Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5,
  },
  description: {
    type: Types.String,
    required: [false, 'Please add a description'],
  },
  createdAt: {
    type: Types.Date,
    required: [true, 'Please add a creation date'],
    default: Date.now,
  },
  reviewer: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewedAdvert: {
    type: Types.ObjectId,
    ref: 'Advert',
    required: true,
  },
});

// Prevent user from submitting more than one review per bootcamp
reviewSchema.index({ reviewedAdvert: 1, reviewer: 1 }, { unique: true });

// Static method to get avg rating and save

reviewSchema.static(
  'getAverageRating',
  async function (revieweeId: string): Promise<[number, number]> {
    logger.debug('getAverageRating');

    const obj = await this.aggregate([
      {
        $lookup: {
          from: 'adverts',
          localField: 'reviewedAdvert',
          foreignField: '_id',
          as: 'reviewedAdvert',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$reviewedAdvert', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'reviewedAdvert.store',
          foreignField: '_id',
          as: 'reviewee',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$reviewee', 0] }, '$$ROOT'],
          },
        },
      },
      {
        $group: {
          _id: '$reviewee._id',
          averageRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
      {
        $match: { _id: revieweeId },
      },
    ]);
    return [obj[0].averageRating, obj[0].count];
  },
);

// Call getAverageCost after save
reviewSchema.pre('save', async function () {
  logger.debug('post save');
  const advert = (await advertModel.findById(this.reviewedAdvert)) as Advert;
  logger.debug('reviewedAdvert: ' + this.reviewedAdvert);
  logger.debug('store: ' + advert.store);
  logger.debug('store.id: ' + advert.store);
  const prevRating = await reviewModel.getAverageRating(
    advert.store as unknown as string,
  );
  const newRating =
    (prevRating[0] * prevRating[1] + this.rating) / (prevRating[1] + 1);
  await userModel.findByIdAndUpdate(advert.store, {
    rating: newRating,
  });
});

// Call getAverageCost before remove
reviewSchema.pre('findOneAndDelete', async function () {
  const update = this.getUpdate() as Review;

  try {
    if (update.rating) {
      const advert = (await advertModel.findById(
        update.reviewedAdvert,
      )) as Advert;
      logger.debug('post findOneAndDelete');
      logger.debug('reviewedAdvert: ' + update.reviewedAdvert);
      logger.debug('store: ' + update.reviewedAdvert.store);
      logger.debug('store.id: ' + advert.store.id);
      const prevRating = await reviewModel.getAverageRating(
        advert.store as unknown as string,
      );
      const newRating =
        (prevRating[0] * prevRating[1] + update.rating) / (prevRating[1] + 1);
      await userModel.findByIdAndUpdate(advert.store, {
        rating: newRating,
      });
    }
  } catch (err) {
    logger.error('Reverting update because of error: ' + err);
    this.setUpdate({});
  }
});

const reviewModel = mongoose.model<Review, ReviewModel>(
  'Review',
  reviewSchema,
  'reviews',
);
export default reviewModel;
