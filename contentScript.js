/* global chrome */

const recipeSelectors = [
    '.wprm-recipe-instruction-text',            // damndelicious.net instructions
    '.directions > li > ol > li',               // delish.com instructions
    '.direction-list > li',                     // food.com instructions
    '.mntl-sc-block-group--OL > li > p',        // allrecipes.com instructions
    '.InstructionListWrapper-dcpygI',           // epicurious.com instructions
    '#structured-project__steps_1-0',           // simplyrecipes.com instructions
    '#mod-recipe-method-1',                     // foodnetwork.com instructions
    '.grouped-list',                            // bbcgoodfood.com instructions
    '.field-instructionstext',                  // countrycrock.com instructions
    '.cooked-recipe-directions',                // lifeandhealth.org instructions
    '.tasty-recipes-instructions-body > ol > li', // sallysbakingaddiction.com instructions
    '.recipe-instructions > div > ol',          // gordonramsay.com instructions
    '.mntl-recipe-steps > div > ol',            // southernliving.com instructions
    '.recipe-directions__item',                 // tasteofhome.com instructions
    '.recipe-summary.wide',                     // thepioneerwoman.com
    '.tasty-recipes-instructions > div > ol > li',
    '.recipe-instruction > ol > li',
    '.preparation_step__nzZHP',
    '.recipe-directions > li',
    '.mv-create-instructions > ol > li',
    '.Recipe__instructionStepContent > span > p',
    '.wprm-recipe-container',
    '.recipe-content',
    '.simple-recipe-pro',
    '.mv-recipe-card',
    'div[itemtype="http://schema.org/Recipe"]',
    'div[itemtype="https://schema.org/Recipe"]',
    'div.recipediv',
    '.recipe-callout',
    '.tasty-recipes',
    '.easyrecipe',
    '.innerrecipe'
];

const ingredientSelectors = [
    '.Wrapper-dxnTBC',                          // epicurious.com ingredients
    '.mntl-structured-ingredients__list-item',  // allrecipes.com, southernliving.com ingredients
    '.wprm-recipe-ingredient',                  // damndelicious.net ingredients
    '.ingredient-lists > li > p',               // delish.com ingredients
    '#structured-ingredients_1-0',              // simplyrecipes.com ingredients
    '.o-Ingredients__m-Body',                   // foodnetwork.com ingredients
    '.ingredient-list > li',                    // food.com ingredients
    '.recipe__ingredients',                     // bbcgoodfood.com ingredients
    '.Recipe__ingredient',
    '.field-ingredientstext',                   // countrycrock.com ingredients
    '.cooked-recipe-ingredients',               // lifeandhealth.org ingredients
    '.tasty-recipes-ingredients-body > ul > li', // sallysbakingaddiction.com ingredients
    '.recipe-ingredients__list',                // tasteofhome.com ingredients
    '.recipe-ingredients > ul > li',            // gordonramsay.com ingredients
    '.tasty-recipes-ingredients > div > ul > li', //acouplecooks.com
    '.recipe-ingredient > ul > li',
    '.ingredients_ingredients__FLjsC > ul > li',
    '.recipe-ingredients > li',
    '.mv-create-ingredients > ul > li'
];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRecipeDetails") {
        const extractSection = (selectors) => {
            const elements = [];
            selectors.forEach((selector) => {
                document.querySelectorAll(selector).forEach((element) => {
                    elements.push(element.textContent.trim());
                });
            });
            return elements;
        };

        const ingredients = extractSection(ingredientSelectors);
        const directions = extractSection(recipeSelectors);

        sendResponse({ ingredients, directions });
    }
});



  