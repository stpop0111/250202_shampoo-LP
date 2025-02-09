document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    new ScrollMeAnimate;
    new ScrollTextAnimate;
    new NavigationAnimate;
    new OpeningAnimate;
    new TextFadeInAnimate;
});

class NavigationAnimate{
    constructor(){
        this.navigation = document.querySelector(".nav-wrapper");
        //初期化設定
        this.animate();
    }
    
    animate(){
        gsap.to(this.navigation,{
            scrollTrigger:{
                trigger: '.message-wrapper', // トリガーとなる要素
                start: 'top top', // message-wrapperのトップがビューポートのトップに来た時に開始
                end: 'max', // ドキュメント全体
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
        this.scrollText = document.querySelectorAll(".keyword");
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

// メッセージ部分にアニメーション
class TextFadeInAnimate {
    constructor(){
        this.container = document.querySelector('.message-wrapper');
        this.textContent = document.querySelector('.message-text-content');
        this.texts = document.querySelectorAll('.message-text');

        this.animate();
    }

    animate(){
        const contentHeight = this.textContent.getBoundingClientRect().height;
        const viewportHeight = this.container.offsetHeight;

        const textScrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: this.container, //messsage-wrapper
                pin: true,
                start: 'top top',
                scrub: 1,
                end: `+=${((contentHeight-viewportHeight) / viewportHeight * 100) + 100}%`, //表示領域に対してコンテンツの高さで計算してスクロールが必要な割合を出す
                onUpdate: (self)  => { //スクロールするたびに起こす処理
                    gsap.set(this.textContent,{
                        y: -(contentHeight - viewportHeight) * self.progress, //スクロールできる量 * 現在のスクロール量 = 動かす場所
                        force3D: true,
                    });
                    ScrollTrigger.update();
                },
            }
        });
    }
}

class OpeningAnimate{
    constructor(){
        this.tl = gsap.timeline();

        gsap.set('.mainvisual-img',{
            scale:0,
        })
        document.querySelector("body").style.overflow = "hidden"
        this.animate();
    }

    animate(){
        this.tl
        // ローディング画面を閉じる
        .to('.loading',{
            y:'-100%',
            filter: 'blur(20px)',
            duration: 1,
            ease:'power4.inOut',
            onComplete: () => {
                document.querySelector('.loading')?.remove();
            }
        })


        // 葉っぱと回転させる
        .to('.leaf01', {
            rotation: 45,
            transformOrigin: 'left top',
            duration: 1,
            ease: 'power2.inOut'
        },'-=0.8')
        .to('.leaf02', {
            rotation: -45,
            transformOrigin: 'right top',
            duration: 1,
            ease: 'power2.inOut'
        },'<')

        // 葉っぱを非表示にする
        .to('.animate-leaf',{
            autoAlpha: 0,
            duration: 1,
            onComplete: () => {
                document.querySelector('.animate-leaf')?.remove();
            }
        },'-=0.5')

        // 花が拡大登場
        .to('.mainvisual-img',{
            scale:1,
            duration: 1,
            transformOrigin: 'center bottom',
        },'<')

        // ナビゲーションバーが降りてくる
        .fromTo('.nav-wrapper',
            {
                y:'-100%',
            },
            {
                y:0,
                duration: 0.3,

                onComplete: () => {
                    document.querySelector("body").style.overflow = "auto"
                }
            },'-=0.2')
    }
}