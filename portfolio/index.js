const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio__img');
const portfolioAllBtns = document.querySelector('.portfolio__buttons');
let eventBtn;
portfolioAllBtns.addEventListener('click', (event) => {
    changeImage(event)
})

function changeImage(event) {
    console.log('work img1')
    if (event.target.classList.contains('portfolio-btn')) {
        const season = event.target.dataset.season;
        eventBtn = event.target;
        changeClassActive(season);
        portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/${season}/${index + 1}.jpg`
            console.log(season)
        })
    }
}

function changeClassActive(season) {
    const btnClick = eventBtn;
    console.log(btnClick)
    portfolioBtn.forEach(btn => {
        btn.classList.remove('button_white');
        btn.classList.add('button_dark');
    })

    portfolioBtn.forEach(btn => {
        if (btn.dataset.season === season) {
            if (btnClick.classList.contains('button_dark')) {
                btn.classList.remove('button_dark');
                btn.classList.add('button_white')
            } else {
                btn.classList.add('button_white');
            }
        }
    })
}

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    seasons.forEach(season => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
        }
    })
}

preloadImages();


console.log ("Смена изображений в секции portfolio +25\n "
)