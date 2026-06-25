(function () {
    // ----- recipe data (exactly the vanilla detail, plus extra) -----
    const recipeData = {
        vanilla: {
            id: 'vanilla',
            title: 'Madagascar Vanilla',
            badge: 'Free Access',
            prepTime: '25 mins',
            yield: '1 Quart',
            value: '$3.99 / scoop',
            summary: 'Learn how to make our timeless classic — delicately floral, impossibly creamy, and crafted with organic vanilla beans. Perfect for beginners!',
            image: 'https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?q=80&w=600&auto=format&fit=crop',
            ingredients: [
                '🥣 2 cups Heavy whipping cream',
                '🥛 1 cup Whole organic milk',
                '🍬 3/4 cup Granulated sugar',
                '🌱 1 Whole Madagascar vanilla bean (split & scraped)',
                '🧂 1/2 tsp Pure vanilla extract',
                '🥚 4 Large egg yolks'
            ],
            instructions: [
                '<strong>Heat Milk & Vanilla:</strong> In a medium saucepan, combine whole milk, sugar, and the scraped vanilla bean seeds along with the pod. Heat over medium until tiny bubbles form around the edges.',
                '<strong>Temper the Eggs:</strong> Whisk egg yolks in a bowl. Slowly pour 1/3 of the warm milk mixture into the yolks while whisking constantly to prevent cooking the eggs. Pour everything back into the saucepan.',
                '<strong>Thicken the Custard:</strong> Cook over low heat, stirring constantly, until the mixture thickens slightly and coats the back of a spoon. Do not let it boil!'
            ],
            lockedLines: [
                'Pour the mixture through a fine-mesh strainer into a clean bowl, then stir in the heavy cream and vanilla extract.',
                'Chill the mixture in the refrigerator for at least 4 hours before churning it in your ice cream maker.'
            ],
            lockTitle: 'Want to see the full churning & freezing steps?',
            lockDesc: 'Join our premium club today to view complete instructions, temperature guides, and secret chef variations.'
        },
        chocolate: {
            id: 'chocolate',
            title: 'Chocolate Fudge',
            badge: 'Premium',
            prepTime: '35 mins',
            yield: '1.5 Quart',
            value: '$4.50 / scoop',
            summary: 'Intense dark chocolate fudge ice cream with silky texture and rich cocoa notes. A chocolate lover’s dream.',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop',
            ingredients: [
                '🍫 1.5 cups Dutch-process cocoa',
                '🥛 2 cups Whole milk',
                '🥣 1.5 cups Heavy cream',
                '🍬 1 cup Granulated sugar',
                '🧂 1/4 tsp Salt',
                '🥚 5 Large egg yolks',
                '🍫 4 oz dark chocolate (melted)'
            ],
            instructions: [
                '<strong>Bloom cocoa:</strong> Whisk cocoa with 1/2 cup milk into a paste. Add remaining milk and cream, heat until steaming.',
                '<strong>Temper yolks:</strong> Whisk yolks with sugar. Slowly pour warm milk mixture into yolks while whisking. Return to pan.',
                '<strong>Cook:</strong> Stir over low heat until custard thickens. Add melted chocolate and salt. Strain.'
            ],
            lockedLines: [
                'Chill custard for 6 hours or overnight. Churn in ice cream maker until thick.',
                'Fold in chocolate fudge chunks during the last 5 minutes of churning.'
            ],
            lockTitle: 'Unlock the fudge swirl technique',
            lockDesc: 'Get the secret to perfect fudge ribbons and professional finish.'
        },
        strawberry: {
            id: 'strawberry',
            title: 'Strawberry Bliss',
            badge: 'Free Access',
            prepTime: '30 mins',
            yield: '1 Quart',
            value: '$3.50 / scoop',
            summary: 'Bright, fruity, and creamy. Made with real strawberries and a hint of lemon for balance.',
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop',
            ingredients: [
                '🍓 2 cups fresh strawberries (pureed)',
                '🥛 1 cup Whole milk',
                '🥣 1.5 cups Heavy cream',
                '🍬 3/4 cup Sugar',
                '🍋 1 tsp Lemon juice',
                '🥚 3 Large egg yolks'
            ],
            instructions: [
                '<strong>Puree berries:</strong> Blend strawberries with lemon juice until smooth. Set aside.',
                '<strong>Heat cream:</strong> Combine milk, cream, and half the sugar in a saucepan. Heat until bubbles form.',
                '<strong>Temper & cook:</strong> Whisk yolks with remaining sugar. Temper with warm milk, return to heat, stir until thick.'
            ],
            lockedLines: [
                'Stir in strawberry puree after straining the custard. Chill for 4 hours.',
                'Churn and add fresh strawberry chunks during the final minutes.'
            ],
            lockTitle: 'Get the full berry swirl method',
            lockDesc: 'Our premium version includes a strawberry ripple and extra tips.'
        },
        caramel: {
            id: 'caramel',
            title: 'Salted Caramel',
            badge: 'Premium',
            prepTime: '40 mins',
            yield: '1 Quart',
            value: '$4.25 / scoop',
            summary: 'Rich caramel ice cream with crunchy sea salt and a dulce de leche ribbon.',
            image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=600&auto=format&fit=crop',
            ingredients: [
                '🍬 1 cup Sugar (for caramel)',
                '🥛 1.5 cups Whole milk',
                '🥣 1.5 cups Heavy cream',
                '🧂 1 tsp Flaky sea salt',
                '🥚 4 Egg yolks',
                '🍯 1/2 cup Dulce de leche'
            ],
            instructions: [
                '<strong>Make caramel:</strong> Cook sugar in a dry pan until amber. Slowly whisk in warm cream (careful!).',
                '<strong>Combine:</strong> Add milk and salt to caramel mixture, heat until smooth.',
                '<strong>Temper yolks:</strong> Whisk yolks, slowly add warm caramel mixture, return to pan, cook until thickened.'
            ],
            lockedLines: [
                'Strain custard and chill for 6 hours. Churn until soft-serve consistency.',
                'Swirl in dulce de leche and extra sea salt before freezing.'
            ],
            lockTitle: 'Unlock the perfect salted caramel swirl',
            lockDesc: 'Learn the pro technique for glossy caramel and balanced salt.'
        }
    };

    const cardsGrid = document.getElementById('cardsGrid');
    const detailView = document.getElementById('detailView');
    const detailContent = document.getElementById('detailContent');
    const backBtn = document.getElementById('backToCards');

    // helper: render detail HTML from recipe object
    function renderDetail(recipeKey) {
        const recipe = recipeData[recipeKey];
        if (!recipe) return;

        // build ingredients list
        const ingredientsHtml = recipe.ingredients.map(item => `<li>${item}</li>`).join('');
        // build instructions (first 3 visible)
        const instructionsHtml = recipe.instructions.map(item => `<li>${item}</li>`).join('');
        // build blur lines
        const blurLinesHtml = recipe.lockedLines.map(line => `<div class="blur-text-line">${line}</div>`).join('');

        const html = `
          <div class="recipe-header-block">
            <div class="recipe-image-side">
              <img src="${recipe.image}" alt="${recipe.title}" class="recipe-main-img">
            </div>
            <div class="recipe-info-side">
              <span class="recipe-badge">${recipe.badge}</span>
              <h1 class="recipe-title">${recipe.title}</h1>
              <div class="recipe-meta">
                <span class="meta-item">⏱️ <strong>Prep Time:</strong> ${recipe.prepTime}</span>
                <span class="meta-item">🍦 <strong>Yield:</strong> ${recipe.yield}</span>
                <span class="meta-item">💵 <strong>Value:</strong> ${recipe.value}</span>
              </div>
              <p class="recipe-summary">${recipe.summary}</p>
            </div>
          </div>
          <div class="recipe-body-block">
            <div class="ingredients-col">
              <h3>Ingredients Needed</h3>
              <ul class="ingredients-list">${ingredientsHtml}</ul>
            </div>
            <div class="instructions-col">
              <h3>Step-by-Step Instructions</h3>
              <ol class="instructions-list">${instructionsHtml}</ol>
              <div class="locked-steps-preview">
                ${blurLinesHtml}
                <div class="recipe-lock-overlay">
                  <div class="lock-icon">🔒</div>
                  <h4>${recipe.lockTitle}</h4>
                  <p>${recipe.lockDesc}</p>
                  <button class="btn-unlock-recipe">Create Free Account</button>
                </div>
              </div>
            </div>
          </div>
        `;
        detailContent.innerHTML = html;
    }

    // show detail for a recipe
    function showDetail(recipeKey) {
        if (!recipeData[recipeKey]) return;
        cardsGrid.style.display = 'none';
        detailView.classList.add('active');
        renderDetail(recipeKey);
        // scroll to detail view
        detailView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // back to cards
    function showCards() {
        detailView.classList.remove('active');
        cardsGrid.style.display = 'grid';
        // scroll to cards
        cardsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // event listeners: all "View Details" buttons
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const recipeKey = this.getAttribute('data-recipe');
            if (recipeKey) showDetail(recipeKey);
        });
    });

    // back button
    backBtn.addEventListener('click', showCards);

    // (optional) clicking on card itself? we only use button.
    // but if user clicks on card img or card, we can also trigger? we keep button.
    // also "Create Free Account" button just alert for demo
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-unlock-recipe')) {
            alert('✨ (Demo) You would be redirected to registration. Enjoy the preview!');
        }
    });

    // ensure initial state: cards visible, detail hidden
    cardsGrid.style.display = 'grid';
    detailView.classList.remove('active');

    // if URL param ?recipe=vanilla for direct access? not needed, but nice.
    // we keep simple.
})();