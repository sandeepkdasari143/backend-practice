exports.asyncHandler = (controllerFunction) => async(req, res) => {
    try {
        await controllerFunction(req,res);
        } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        }
    }
