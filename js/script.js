document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    new ScrollMeAnimate;
    new ScrollTextAnimate;
    new NavigationAnimate;
    // new OpeningAnimate;
    new TextFadeInAnimate;
});
class NavigationAnimate{
    constructor(){
        this.navigation = document.querySelector(".nav-wrapper");
        //初期化設定
        gsap.set(this.navigation, {
            autoAlpha: 0, //透過&非選択
            y: '-100%', //初期位置を隠す
            filter:'blur(20px)'
        })
        this.animate();
    }
    
    animate(){
        gsap.to(this.navigation,{
            scrollTrigger:{
                start:'top top', //ドキュメントの一番上
                end: 'max', //ドキュメント全体
                //スクロールされる度に処理する内容
                onUpdate:({direction, scroll}) => {
                    // direction: 向き
                    // scroll: スクロールした位置
                    const currentScroll = scroll();
                    if(direction === -1){
                        gsap.to(this.navigation,{
                            autoAlpha:1,
                            y:0,
                            filter:'blur(0px)',
                            ease:'power2,out',
                            duration:0.5,
                        });
                    } else if (direction ===1 && currentScroll > 100){
                        gsap.to(this.navigation,{
                            autoAlpha:0,
                            y:'-100%',
                            filter:'blur(20px)',
                            ease:'power2,In',
                            duration:0.5,
                        });
                    }
                }
            }
        });
    }
}

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
        infiniteScrollTL
        .to(this.scrollText,{
            x:'-100%',
            duration: 75,
            ease: 'none'
        })
    }
}

class TextFadeInAnimate{
    constructor(){
        this.text = document.querySelectorAll('.message-text');
        //メッセージの分離
        this.text.forEach(text => {
            text.innerHTML = [...text.textContent]
            .map(char => `<span class="char">${char}</span>`).join('');
        });

        gsap.set('.char',{
            autoAlpha: 0,
            scale: 1.2,
            filter: 'blur(20px)',
        });
        gsap.set(this.text,{
        })
        this.init();
    }

    init(){
        this.setupFadeInText();
    }

    // TODO:スクロールに合わせて順番に出てくる
    setupFadeInText(){
            const FadeInTL = gsap.timeline({
                scrollTrigger: {
                    trigger: '.message-wrapper',
                    start: 'top center',
                }
            });
            FadeInTL
            .to('.char',{
                scale: 1.0,
                filter: 'blur(0px)',
                autoAlpha: 1,
                duration: 1,
            })
    }
}