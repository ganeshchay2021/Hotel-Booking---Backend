

export async function getUserController(req, res) {

    try {
        const role = req.user.role;
        const recentSearchCities = req.user.recentSearchCities;
        res.json({
            success: true,
            role,
            recentSearchCities
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}


export async function storeRecentSearchCities(req, res) {

    try {

        const { recentSearchCity } = req.body;
        const user = req.user;

        if (user.recentSearchCities.length < 3) {
            user.recentSearchCities.push(recentSearchCity);
        } else {
            user.recentSearchCities.shift();
            user.recentSearchCities.push(recentSearchCity);
        }

        await user.save();

        res.json({
            success: true,
            message: "City Added"
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }

}