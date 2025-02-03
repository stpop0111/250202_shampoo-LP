document.addEventListener("DOMContentLoaded", () => {
    new ScrollMeAnimate;
    new ScrollTextAnimate;
    new OpeningAnimate;
    new FadeInAnimate;
});

// 「SCROLL ME」が無限に回転する
class ScrollMeAnimate{
    constructor(){
        this.scrollMe = document.querySelector(".hero_scrollMe");
        this.animate();
    }
    animate(){
        const infiniteRotationTL = gsap.timeline({
            repeat: -1,
        });

        infiniteRotationTL
        .to(this.scrollMe,{
            rotation: 360,
            duration: 30,
            ease: 'none'
        })
    };
}

// keywardが無限にスクロールする
class ScrollTextAnimate{
    constructor(){
        this.scrollText = document.querySelector(".keyword");
        this.animate();
    }
    animate(){
        const infiniteScrollTL = gsap.timeline({
            repeat:-1,
        });
        // TODO:スクロールに合わせて移動するように変更する。
        infiniteScrollTL
        .to(this.scrollText,{
            x:'-100%',
            duration: 75,
            ease: 'none'
        })
    }
}