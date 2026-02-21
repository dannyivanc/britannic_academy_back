const fixUrl = (url) => {
    if (!url) return url;

    // Normalize backslashes to forward slashes
    let normalized = url.replace(/\\/g, '/');

    // Replace localhost with URL_SERVER if set
    if (process.env.URL_SERVER) {
        normalized = normalized.replace(/http:\/\/localhost:3000/g, process.env.URL_SERVER);
    }

    return normalized;
};

const fixObjectUrls = (obj, fields) => {
    if (!obj) return obj;
    if (Array.isArray(obj)) {
        return obj.map(item => fixObjectUrls(item, fields));
    }

    // Handle both Sequelize instances and plain objects
    const newObj = { ...(obj.get ? obj.get({ plain: true }) : obj) };

    fields.forEach(field => {
        // Handle simple field
        if (typeof field === 'string') {
            if (newObj[field]) {
                newObj[field] = fixUrl(newObj[field]);
            }
        }
        // Handle nested array of objects (e.g., { field: 'palabras', fields: ['imagen_url'] })
        else if (typeof field === 'object' && field.field && field.fields) {
            if (newObj[field.field]) {
                newObj[field.field] = fixObjectUrls(newObj[field.field], field.fields);
            }
        }
    });

    return newObj;
};

module.exports = { fixUrl, fixObjectUrls };
