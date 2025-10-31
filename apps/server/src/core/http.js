export const success = (data, message = 'Success') => ({
  success: true,
  message,
  data,
});

export const error = (message = 'Error', statusCode = 500) => ({
  success: false,
  message,
  statusCode,
});

export const paginated = (data, page, limit, total) => ({
  success: true,
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});
