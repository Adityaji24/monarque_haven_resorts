const svgContainers = document.querySelectorAll(".svg-container");
const rubbElements = document.querySelectorAll("#rubb");
const slidePage = document.getElementById("slide-page");
const slideImage = document.getElementById("slide-image");
const menuItems = document.getElementById("menu-items");
const closeBtn = document.getElementById("close-btn");
const navButtons = document.querySelectorAll(".nav-btn");
let cartCount = 0;
const cartCountElement = document.getElementById("cart-count");

// Rubber band effect
svgContainers.forEach(svg => {
    const rubberLines = svg.querySelectorAll(".rubber-line");
    svg.addEventListener("mousemove", (e) => {
        const rect = svg.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        rubberLines.forEach((rubberLine) => {
            let baseY = 25;
            let startX = 60;
            let endX = rect.width - 60;
            let centerX = rect.width / 2;
            let moveX = (mouseX - centerX) * 0.5;
            let moveY = (mouseY - baseY) * 0.5;
            let newControlX = centerX + moveX;
            let newControlY = baseY + moveY;
            newControlX = Math.max(0, Math.min(newControlX, rect.width));
            newControlY = Math.max(0, Math.min(newControlY, rect.height));
            rubberLine.setAttribute("d", `M ${startX} ${baseY} C ${newControlX} ${newControlY}, ${newControlX} ${newControlY}, ${endX} ${baseY}`);
        });
    });
    svg.addEventListener("mouseleave", () => {
        rubberLines.forEach((rubberLine) => {
            let baseY = 25;
            const rect = svg.getBoundingClientRect();
            let startX = 60;
            let endX = rect.width - 60;
            let centerX = rect.width / 2;
            gsap.to(rubberLine, {
                attr: { d: `M ${startX} ${baseY} C ${centerX} ${baseY}, ${centerX} ${baseY}, ${endX} ${baseY}` },
                duration: 0.6,
                ease: "elastic.out(1, 0径3)"
            });
        });
    });
});

// Navigation buttons functionality
const categoryData = {
    'bar': {
        titles: ['MOCKTAILS', 'COCKTAILS', 'SHOTS', 'WINE'],
        items: [
            '[{"name": "Cucumber Emerald Mist ", "price": "7$", "image": "https://heybairtender.s3.amazonaws.com/recipes/emerald-spring-fizz.png"}, {"name": "French Riviera Breeze", "price": "8$", "image": "https://drinksworld.com/wp-content/uploads/French-Riviera-02-scaled.jpg"}, {"name": "ITALIAN BLOOD ORANGE SPRITZ", "price": "8€", "image": "https://prohibitionliquor.co/cdn/shop/articles/Blood_Orange_Spritz.jpg?v=1660200027"}, {"name": "AMALFI COAST COOLER", "price": "10$", "image": "https://www.thomas-henry.com/wp-content/uploads/2019/04/thomas-henry-amalfi-recipe-1024x1024.jpg"}]',

            '[{"name": "FRENCH 75", "price": "9.49$", "image": "https://www.saveur.com/uploads/2014/05/28/Classic-Sips-French-75-Saveur-Social-scaled.jpg?auto=webp"}, {"name": "NEGRONI", "price": "10$", "image": "https://ginsiders.com/wp-content/uploads/2023/07/Ginsiders-IG.png"}, {"name": "MIMOSA", "price": "8$", "image": "https://cdn3.foodviva.com/static-content/food-images/champagne-recipes/mimosa-cocktail-recipe/mimosa-cocktail-recipe.jpg"}, {"name": "GARIBALDI", "price": "9$", "image": "https://www.acouplecooks.com/wp-content/uploads/2020/10/Garibaldi-Cocktail-002.jpg"}]',
            '[{"name": "24 K GOLD TEQUILA SLAMMER ", "price": "15$", "image": "https://www.collectedfood.com/wp-content/uploads/2024/08/tequilaslammer-960x1060.webp"}, {"name": "LEMON DROP SHOT", "price": "10$", "image": "https://www.runningtothekitchen.com/wp-content/uploads/2024/10/lemon-drop-shot-8.jpg"}, {"name": "ABSINTHE FAIRY SHOT", "price": "8$", "image": "https://domesticfits.com/wp-content/uploads/2023/05/green-tea-shot-Ingredients-640x428.jpg"}, {"name": "FLAMING B52", "price": "12$", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZVXMBycPg_j9dSxf4ug2FZx6P9HkZWpAwkw&s"}]',

            '[{"name": "Château Margaux", "price": "20$", "image": "https://thebarshop.in/wp-content/uploads/2022/05/Burgundy-650-1.jpg"}, {"name": "CLOUDY BAY SAUVIGNON BLANC", "price": "10$", "image": "https://corkscrewcellars.com.au/wp-content/uploads/2017/10/Cloudy-Bay-Wine_result.webp"}, {"name": "OPUS ONE", "price": "12$", "image": "https://assets.ajio.com/medias/sys_master/root/20250217/Azdl/67b33d9b2960820c4989c979/-473Wx593H-410273383-multi-MODEL2.jpg"}, {"name": "MIRAVEL ROSE", "price": "6€", "image": "https://images.cdn.europe-west1.gcp.commercetools.com/0364f46d-c687-45d8-b3ca-40d495ca0044/444100055_lifestyle-Pcew_NAI.jpg"}]'
        ],
        images: [
            'https://heybairtender.s3.amazonaws.com/recipes/emerald-spring-fizz.png',
            'https://www.saveur.com/uploads/2014/05/28/Classic-Sips-French-75-Saveur-Social-scaled.jpg?auto=webp',
            'https://www.collectedfood.com/wp-content/uploads/2024/08/tequilaslammer-960x1060.webp',
            'https://thebarshop.in/wp-content/uploads/2022/05/Burgundy-650-1.jpg'
        ]
    },
   'restaurant': {
    titles: ['BREAKFAST', 'LUNCH', 'EVENING GOURMET', 'DINNER'],
    items: [
        '[{"name": "Truffle Scrambled Eggs on Brioche Toast ", "price": "15$", "image": "https://nevernothungry.com/wp-content/uploads/2019/07/Truffled-Scrambled-Eggs-4.jpg"}, {"name": "Ricotta Pancakes with Honeycomb", "price": "20$", "image": "https://assets.bonappetit.com/photos/57acdbebf1c801a1038bc83c/master/pass/ricotta-pancakes-with-honeycomb-candy-butter.jpg"}, {"name": "Chicken Mandi with Saffron Butter Rice ", "price": "18$", "image": "https://i0.wp.com/www.shanazrafiq.com/wp-content/uploads/2020/05/3-Zereshk-Polo-4.jpg?fit=1200%2C798&ssl=1"}, {"name":"Jackfruit Galouti Kebabs with Saffron Taftan & Mango Chutney Gel", "price": "14$", "image": "https://i.ytimg.com/vi/G6SLL-rD2iM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDNtkc9jek1mOyLGcKHBq1PLIiqOQ"}]',
        '[{"name": "Black Truffle & Parmesan Risotto", "price": "20$", "image": "https://handwrittenwines.com/wp-content/uploads/2022/02/Pinot-Noir-Black-Truffle-Risotto-Image_1000x650.jpg.webp"}, {"name": "Butter-Poached Lobster Moilee with Curry Leaf Foam", "price": "18$", "image": "https://girlcarnivore.com/wp-content/uploads/2022/12/Butter-poached-lobster-tails-4658.jpg"}, {"name": "Bajra and Avocado Thepla Tacos", "price": "10$", "image": "https://i.ytimg.com/vi/7uAmKDXvHQw/maxresdefault.jpg"}, {"name": "Dim Sum Platter with Truffle Edamame Filling", "price": "15$", "image": "https://c.ndtvimg.com/2024-04/asvbna18_sdef_625x300_29_April_24.jpg"}]',
        '[{"name": "Burrata & Tomato Consommé with Basil Oil & Caviar", "price": "25$", "image": "https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2019/07/burrata-recipe.jpg"}, {"name": "Morel Mushroom & Cardamom Kebab with Fennel Yogurt Foam", "price": "15$", "image": "https://www.awesomecuisine.com/wp-content/uploads/2012/04/Mushroom-Kebab.jpg"}, {"name": "Grilled Sea Bass with Romesco Sauce & Crispy Artichokes", "price": "11$", "image": "https://perfectlyprovence.co/wp-content/uploads/2019/11/chilean-sea-bass-romesco.jpeg"}, {"name": "Baba Ganoush", "price": "19$", "image": "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/03/Baba-Ganoush-main.jpg"}]',
        '[{"name": "24K Gold Burrata with Heirloom Tomato Carpaccio & Aged Balsamic", "price": "20$", "image": "https://xoxobella.com/wp-content/uploads/2022/07/heirloom_italian_burrata_caprese_salad-007.jpg"}, {"name": "Truffle Malai Kofta with Saffron Almond Curry", "price": "18$", "image": "https://carveyourcraving.com/wp-content/uploads/2021/09/Best-Malai-Kofta-recipe.jpg"}, {"name": "Smoked Tandoori Chicken with Roghani Naan", "price": "20$", "image": "https://img.freepik.com/premium-photo/tandoori-chicken-with-side-naan-bread-realistic_1114068-26916.jpg"}, {"name": "Porcini Mushroom & Wagyu Beef Osso Buco with Polenta Mousse", "price": "20$", "image": "https://www.finefoodspecialist.co.uk/media/recipe/osso-bucco-polenta-gremolata.jpg"}]',
    ],
    images: [
            'https://i0.wp.com/nevernothungry.com/wp-content/uploads/2019/07/Truffled-Scrambled-Eggs-6.jpg?resize=720%2C1080&ssl=1',
            'https://handwrittenwines.com/wp-content/uploads/2022/02/Pinot-Noir-Black-Truffle-Risotto-Image_1000x650.jpg.webp',
            'https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2019/07/burrata-recipe.jpg',
            'https://xoxobella.com/wp-content/uploads/2022/07/heirloom_italian_burrata_caprese_salad-007.jpg',
        ]
    },
    'cafe': {
        titles: ['ESPRESSO', 'LATTE', 'CAPPUCCINO', 'AMERICANO'],
        items: [
            '[{"name": "Black Ivory Espresso", "price": "5$", "image": "https://media.istockphoto.com/id/1456762006/photo/cup-of-coffee.jpg?s=612x612&w=0&k=20&c=glT-HlbxN5bVMz997vAlEdtpii7MWz5_f4SLHTbNqIs="}, {"name": "Kopi Luwak Espresso", "price": "7$", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKck8IdlRbZFjHWj75Ze_kqkGu_HFbHESgfw&s"}, {"name": " Nano Challa Ethiopian Espresso", "price": "7$", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA1s6y7zOF2_xARrIkmFwlpnt_Ph0w4d4kCw&s"}, {"name": "Blue Bottle – Hayes Valley Espresso", "price": "10$", "image": "https://myhealth-redcliffelabs.redcliffelabs.com/media/blogcard-images/None/0a99b9f4-d9a7-4f41-8988-591246fd1695.webp"}]',
            '[{"name": "Bourbon Brule Latte", "price": "7$", "image": "https://www.starbucksathome.com/ca/sites/default/files/styles/recipe_ingredient/public/2021-03/Bourbon%20Bru%CC%82le%CC%81%20Late_0.jpg?itok=oNf6YK31"}, {"name": "Caramel Latte", "price": "10$", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7xf-X569UOceLmxsFm289OLK2ks5GIeDuEg&s"}, {"name": "Mocha", "price": "8$", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEDYEVVpM7WKwXMCUdGrwCdcps3JTw7i5BWA&s"}, {"name": "Rose Almond Latte", "price": "8$", "image": "https://www.gimmesomeoven.com/wp-content/uploads/2023/09/Rose-Latte-4.jpg"}]',
            '[{"name": "Belgian cafe Cappucino", "price": "7$", "image": "https://pistachiopicks.com/wp-content/uploads/2020/01/2020_0118_112054005534812624814927385.jpg?w=683"}, {"name": "Sea Salt caramel Cappucino", "price": "9$", "image": "https://thelittlestcrumb.com/wp-content/uploads/salted-caramel-macchiato-6.jpg"}, {"name": "Lavender Dream Cappucino", "price": "10$", "image": "https://static.vecteezy.com/system/resources/previews/026/553/500/non_2x/honey-lavender-latte-in-a-white-cup-isolated-on-white-background-free-photo.jpg"}, {"name": "Tiramisu cream Cappucino", "price": "9$", "image": "https://freshbeanbakery.com/wp-content/uploads/2023/04/TL-Photo3-683x1024.jpg"}]',
            '[{"name": "Smoked Bourbon Americano", "price": "8$", "image": "https://stgeorgespirits.com/uploads/recipes/_600x600_crop_center-center_none/CT2I Four.jpg"}, {"name": "Caramel Americano", "price": "7$", "image": "https://i0.wp.com/misaexpress.in/wp-content/uploads/2023/06/79039.jpg?fit=451%2C451&ssl=1"}, {"name": "Iced Americano", "price": "10$", "image": "https://gardenoflifecanada.com/cdn/shop/articles/189A4678_1024x.jpg?v=1686073713"}, {"name": "Flavoured Americano", "price": "7$", "image": "https://dolo.com.au/cdn/shop/articles/522979505-shutterstock_1973536478.jpg?v=1690528484"}]'
        ],
        images: [
            'https://media.istockphoto.com/id/1456762006/photo/cup-of-coffee.jpg?s=612x612&w=0&k=20&c=glT-HlbxN5bVMz997vAlEdtpii7MWz5_f4SLHTbNqIs=',
            'https://www.starbucksathome.com/ca/sites/default/files/styles/recipe_ingredient/public/2021-03/Bourbon%20Bru%CC%82le%CC%81%20Late_0.jpg?itok=oNf6YK31',
            'https://pistachiopicks.com/wp-content/uploads/2020/01/2020_0118_112054005534812624814927385.jpg?w=683',
            'https://stgeorgespirits.com/uploads/recipes/_600x600_crop_center-center_none/CT2I8574.jpg'
        ]
    },
};

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        navButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const category = button.getAttribute("data-category");
        const data = categoryData[category];
        rubbElements.forEach((rubb, index) => {
            const titleElement = rubb.querySelector("h1:first-child");
            titleElement.textContent = data.titles[index];
            rubb.setAttribute("data-items", data.items[index]);
            rubb.setAttribute("data-image", data.images[index]);
        });
    });
});

rubbElements.forEach(rubb => {
    rubb.addEventListener("click", () => {
        const categoryImage = rubb.getAttribute("data-image");
        const items = JSON.parse(rubb.getAttribute("data-items"));
        
        slideImage.src = categoryImage;
        menuItems.innerHTML = "";

        items.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <div class="quantity-controls">
                    <span class="price">${item.price}</span>
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">0</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            `;
            
            // Quantity controls
            const minusBtn = li.querySelector(".minus");
            const plusBtn = li.querySelector(".plus");
            const quantitySpan = li.querySelector(".quantity");
            let quantity = 0;

            plusBtn.addEventListener("click", () => {
                quantity++;
                quantitySpan.textContent = quantity;
                minusBtn.disabled = false;
            });

            minusBtn.addEventListener("click", () => {
                if (quantity > 0) {
                    quantity--;
                    quantitySpan.textContent = quantity;
                    if (quantity === 0) {
                        minusBtn.disabled = true;
                    }
                }
            });

            // Initial state
            minusBtn.disabled = true;

            // Image hover effects
            li.addEventListener("mouseenter", () => {
                slideImage.style.opacity = 0;
                setTimeout(() => {
                    slideImage.src = item.image || categoryImage;
                    slideImage.style.opacity = 1;
                }, 150);
            });

            li.addEventListener("mouseleave", () => {
                slideImage.style.opacity = 0;
                setTimeout(() => {
                    slideImage.src = categoryImage;
                    slideImage.style.opacity = 1;
                }, 150);
            });

            menuItems.appendChild(li);
        });

        slidePage.classList.add("active");
    });
});
closeBtn.addEventListener("click", () => {
    slidePage.classList.remove("active");
});
document.querySelector('.nav-btn[data-category="bar"]').click(); // Changed from "meals" to "bar" since "meals" doesn't exist
  // 2. Hamburger Side Menu Toggle
    // -------------------------------
  
    const hamburger = document.getElementById("hamburger");
    const fullMenu = document.getElementById("full");
    const closeIcon = document.querySelector("#full h2 i");
  
    // Open side menu
    hamburger.addEventListener("click", () => {
      fullMenu.style.right = "0";
  
      // Animate menu items
      gsap.to("#amg h3", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
  
      gsap.to("#iconsss i", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out"
      });
  
      gsap.to("#amg button", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.out"
      });
    });
  
    // Close side menu
    closeIcon.addEventListener("click", () => {
      fullMenu.style.right = "-100%";
  
      // Reset animations (fade out instantly)
      gsap.set("#amg h3, #iconsss i, #amg button", {
        opacity: 0,
        y: 20
      });
    });
