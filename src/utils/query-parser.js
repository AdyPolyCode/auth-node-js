const { BadRequest } = require('../errors');

const baseOptions = {
    limit: 4,
    page: 1,
    sort: {
        createdAt: 'desc',
    },
};

const types = {
    limit: 'number',
    page: 'number',
    filter: 'string',
    sort: 'string',
};

function validateQuery(queryOptions) {
    Object.keys(queryOptions).forEach((key) => {
        if (!types[key]) {
            throw new BadRequest(`Invalid search value - "${key}"`);
        }
    });
}

function convertQueryValues(queryOptions) {
    validateQuery(queryOptions);

    const options = {};

    Object.keys(queryOptions).forEach((key) => {
        if (!isNaN(queryOptions[key])) {
            options[key] = Math.abs(queryOptions[key]);
        } else {
            options[key] = queryOptions[key];
        }
    });

    return options;
}

module.exports = function queryParser(queryOptions) {
    const { limit, page, filter, sort } = convertQueryValues(queryOptions);

    const options = {
        take: limit || baseOptions.limit,
        page: page || baseOptions.page,
        skip: ((page || baseOptions.page) - 1) * (limit || baseOptions.limit),
        orderBy: baseOptions.sort,
    };

    if (filter) {
        let filters = filter.split(',');

        filters = filters.map((item) => {
            const [key, value] = item.split(':');

            return { [key]: value };
        });

        options.where = Object.assign({}, ...filters);
    }

    if (sort) {
        let sorters = sort.split(',');

        sorters = sorters.map((item) => {
            const [key, value] = item.split(':');

            return { [key]: value };
        });

        options.orderBy = Object.assign({}, ...sorters);
    }

    return options;
};
