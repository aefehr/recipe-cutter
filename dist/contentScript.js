const recipeSelectors=[".recipe-callout",".tasty-recipes",".easyrecipe",".innerrecipe",".recipe-summary.wide",".wprm-recipe-container",".recipe-content",".simple-recipe-pro",".mv-recipe-card",'div[itemtype="http://schema.org/Recipe"]','div[itemtype="https://schema.org/Recipe"]',"div.recipediv",".wprm-recipe-instruction-text",".directions > li > ol > li",".direction-list > li",".mntl-sc-block-group--OL > li > p",".InstructionListWrapper-dcpygI","#structured-project__steps_1-0","#mod-recipe-method-1",".grouped-list",".field-instructionstext",".cooked-recipe-directions",".tasty-recipes-instructions-body > ol > li",".recipe-instructions > div > ol",".mntl-recipe-steps > div > ol",".recipe-directions__item",".tasty-recipes-instructions > div > ol > li",".recipe-instruction > ol > li",".preparation_step__nzZHP",".recipe-directions > li",".mv-create-instructions > ol > li",".Recipe__instructionStepContent > span > p"],ingredientSelectors=[".Wrapper-dxnTBC",".mntl-structured-ingredients__list-item",".wprm-recipe-ingredient",".ingredient-lists > li > p","#structured-ingredients_1-0",".o-Ingredients__m-Body",".ingredient-list > li",".recipe__ingredients",".Recipe__ingredient",".field-ingredientstext",".cooked-recipe-ingredients",".tasty-recipes-ingredients-body > ul > li",".recipe-ingredients__list",".recipe-ingredients > ul > li",".tasty-recipes-ingredients > div > ul > li",".recipe-ingredient > ul > li",".ingredients_ingredients__FLjsC > ul > li",".recipe-ingredients > li",".mv-create-ingredients > ul > li"];chrome.runtime.onMessage.addListener(((e,i,t)=>{if("getRecipeDetails"===e.action){const e=e=>{const i=[];return e.forEach((e=>{document.querySelectorAll(e).forEach((e=>{i.push(e.textContent.trim())}))})),i};t({ingredients:e(ingredientSelectors),directions:e(recipeSelectors)})}}));