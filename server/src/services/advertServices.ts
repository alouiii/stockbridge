import advertModel from '../models/Advert';
import type { Advert, ProductCategory } from '../entities/advertEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

const serviceName = 'advertServices';

/**
 * Find an advert by id
 * @param id
 * @param populate determines if the result should be populated
 * @returns Promise containing the advert
 */
export const findAdvertById = async (id: string, populate = true) => {
  logger.debug(`${serviceName}: Finding advert with id: ${id}`);
  const advert = await populateResult(advertModel.findById(id), populate);

  if (!advert) {
    logger.error(`${serviceName}: Advert not found with id of ${id}`);
    throw new AppError('Advert not found', 'Advert not found', 404);
  }

  logger.debug(`${serviceName}: Returning advert ${advert}`);
  return advert;
};

/**
 * create an advert
 * @param advert
 * @returns Promise containing the advert
 */
export const createAdvert = async (advert: Advert) => {
  logger.debug(`${serviceName}: Creating advert ${advert.productname}`);
  return await advertModel.create(advert);
};

/**
 * Update an advert
 * @param id
 * @param advert
 * @returns Promise containing the updated advert
 */
export const updateAdvert = async (id: string, advert: Advert) => {
  logger.debug(`${serviceName}: Updating advert with id: ${id} with ${advert}`);
  return await advertModel.findByIdAndUpdate(id, advert, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete an advert
 * @param id
 * @returns Promise containing the deleted advert
 */
export const delAdvert = async (id: string) => {
  logger.debug(`${serviceName}: Deleting advert with id: ${id}`);
  return await advertModel.findByIdAndDelete(id);
};

/**
 * Find all adverts
 * @param populate determines if the result should be populated
 * @returns Promise containing all adverts
 */

export const findAllAdverts = async (
  page: number,
  limit: number,
  search?: string,
  sortBy?: string[],
  radius?: number,
  center?: number[],
  queryStr?: string,
) => {
  logger.debug(`${serviceName}: Finding all adverts with pagination`);
  logger.debug(`${serviceName}: Query string: ${queryStr}`);
  logger.debug(`${serviceName}: Sort string: ${sortBy}`);
  logger.debug(`${serviceName}: Page: ${page}`);
  logger.debug(`${serviceName}: Limit: ${limit}`);
  logger.debug(`${serviceName}: Search: ${search}`);

  let queryFilter = queryStr ? JSON.parse(queryStr) : {};

  if (queryFilter?.category && queryFilter?.category.$in) {
    queryFilter = {
      ...queryFilter,
      category: { $in: queryFilter.category.$in.split(',') },
    };
  }

  if (search) {
    queryFilter = {
      ...queryFilter,
      $text: { $search: search },
    };
  }

  if (radius) {
    queryFilter = {
      ...queryFilter,
      location: {
        $geoWithin: {
          $centerSphere: [center, radius / 6371],
        },
      },
    };
  }

  logger.debug(`${serviceName}: Query filter: ${JSON.stringify(queryFilter)}`);

  let query = advertModel.find(queryFilter);

  if (sortBy && sortBy?.length > 0) {
    let sortParams: [string, -1 | 1][] = [['prioritized', -1]];
    let isCreatedAtIncluded = false;

    for (const sortParam of sortBy) {
      let data: [string, -1 | 1];
      if (sortParam.startsWith('-')) {
        const key = sortParam.slice(1);
        isCreatedAtIncluded = key === 'createdAt';
        data = [key, -1];
      } else {
        data = [sortParam, 1];
      }
      sortParams.push(data);
    }
    if (!isCreatedAtIncluded) {
      sortParams.push(['createdAt', -1]);
    }
    sortParams.push(['_id', -1]);
    query = query.sort(sortParams);
  } else {
    logger.debug(`${serviceName}: No sort params, using default`);
    query = query.sort({
      prioritized: -1,
      createdAt: -1,
      _id: -1,
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await advertModel.countDocuments(queryFilter);

  query = query.skip(startIndex).limit(limit);

  const results = await query;

  const pagination: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  } = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
//  return await populateResult(advertModel.find(), populate);
  return { results, pagination, totalNumberOfPages: Math.ceil(total / limit) };
};

/**
 * Returns all adverts of the requested category
 * @param category
 * @param populate determines if the result should be populated
 * @returns Promise containing the deleted advert.
 */
export const getAdvertsByCategory = async (
  category: ProductCategory,
  populate = true,
) => {
  logger.debug(
    `${serviceName}: Requesting all adverts with category: ${category}`,
  );
  return await populateResult(
    advertModel.find({ category: category }),
    populate,
  );
};

/**
 * Returns popular categories
 *
 * @param limit - number of categories to return
 *
 * @returns Promise containing the most popular categories
 */

export const getPopularCategories = async (limit: number) => {
  logger.debug(`${serviceName}: Requesting most popular categories`);
  return advertModel.aggregate([
    { $match: { status: 'Ongoing' } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: limit },
  ]);
};

export const getPopularAdverts = async (limit: number) => {
  logger.debug(`${serviceName}: Requesting most popular adverts`);
  return advertModel.aggregate([
    { $match: { status: 'Ongoing' } },
    { $unwind: '$offers' },
    {
      $group: {
        _id: '$_id',
        size: { $sum: 1 },
      },
    },
    { $sort: { size: -1 } },
    { $limit: limit },
  ]);
};

/**
 * Populates the referenced elements in a document
 * @param queryResult The document to be populated
 * @param populate Determines if the result should be populated
 * @returns
 */
function populateResult(queryResult: any, populate: boolean) {
  return populate
    ? queryResult.populate(['reviews', 'store', 'offers'])
    : queryResult;
}
