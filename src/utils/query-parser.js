const baseOptions = {
    limit: 4,
    page: 1,
    sort: {
        createdAt: 'desc',
    },
};

module.exports = function queryParser(queryOptions) {
    const { limit, page, filter, sort } = queryOptions;

    const options = {
        take: Number(limit) || baseOptions.limit,
        page: Number(page) || baseOptions.page,
        skip:
            ((Number(page) || baseOptions.page) - 1) *
            (Number(limit) || baseOptions.limit),
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
