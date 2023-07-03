
const dataMethods = ["body", "query", "params"];

export const validation = (schema) => {
    return (req, res, next) => {
        const validationErrors = [];
        dataMethods.map((key) => {
            if (schema[key]) {
                const result = schema[key].validate(req[key]);
                if (result?.error) {
                    validationErrors.push(result);
                }
            }
        });
        if (validationErrors.length) {
            return res.json({Error:"validation Error" , validationErrors});
        }
        return next();
    };
};
