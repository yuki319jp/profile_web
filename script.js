// アニメーション用の要素を取得する想定
const element = document.querySelector('.animated-element');

// アニメーションの設定
let start = null;
const duration = 2000; // 2秒間
const startPosition = 0;
const distance = 300;
const startScale = 1;
const endScale = 1.5;
const startRotate = 0;
const endRotate = 360;

function animate(currentTime) {
    if (!start) start = currentTime;
    const progress = (currentTime - start) / duration;

    if (progress < 1) {
        // イージング関数を使用してスムーズな動き
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentPosition = startPosition + (distance * easeProgress);
        const currentScale = startScale + ((endScale - startScale) * easeProgress);
        const currentRotate = startRotate + ((endRotate - startRotate) * easeProgress);
        
        // 要素を移動、拡大、回転
        element.style.transform = `
            translateX(${currentPosition}px)
            scale(${currentScale})
            rotate(${currentRotate}deg)
        `;
        
        requestAnimationFrame(animate);
    }
}

// アニメーション開始
requestAnimationFrame(animate);
