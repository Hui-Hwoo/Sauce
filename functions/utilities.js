const authorizeUser = async (authorizationHeader, firebaseAuth) => {
    if (!authorizationHeader) {
        // eslint-disable-next-line no-throw-literal
        throw "no authorization!";
    }
    const token = authorizationHeader.split(" ")[1];
    try {
        const decodedToken = await firebaseAuth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        throw error;
    }
};

const validateRecipePostPut = (newSauce) => {
    let missingFields = "";

    if (!newSauce) {
        missingFields += "sauce";
        return missingFields;
    }

    if (!newSauce.title) {
        missingFields += "title, ";
    }

    if (!newSauce.description) {
        missingFields += "description, ";
    }

    if (!newSauce.state) {
        missingFields += "state, ";
    }

    if(newSauce.salty === 0 && newSauce.hot === 0 && newSauce.sweet === 0 && newSauce.sour ===0){
        missingFields += "taste, ";
    }

    if (newSauce.isPublished !== true && newSauce.isPublished !== false) {
        missingFields += "isPublished, ";
    }

    if (!newSauce.publishDate) {
        missingFields += "publishDate, ";
    }

    if (!newSauce.imageUrl) {
        missingFields += "imageUrl, ";
    }

    if(!newSauce.creator) {
        missingFields += "creator Info";
    }

    return missingFields;
};

const sanitizeRecipePostPut = (newSauce) => {
    const sauce = {};

    sauce.title = newSauce.title;
    sauce.description = newSauce.description;
    sauce.state = newSauce.state;
    sauce.salty = newSauce.salty;
    sauce.hot = newSauce.hot;
    sauce.sweet = newSauce.sweet;
    sauce.sour = newSauce.sour;
    sauce.publishDate = new Date(newSauce.publishDate * 1000);
    sauce.isPublished = newSauce.isPublished;
    sauce.ingredients = newSauce.ingredients;
    sauce.imageUrl = newSauce.imageUrl;
    sauce.creator = newSauce.creator;

    return sauce;
};

module.exports = {
    authorizeUser,
    validateRecipePostPut,
    sanitizeRecipePostPut,
};
