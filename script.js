class MenuController {
    constructor(menuButtonSelector, menuSelector, activeClass = 'active', bodyClass = 'menu-open') {
        this.menuButton = document.querySelector(menuButtonSelector);
        this.menu = document.querySelector(menuSelector);
        this.activeClass = activeClass;
        this.bodyClass = bodyClass;
        this.isOpen = false;
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        document.body.appendChild(this.overlay);
        this.closeButton = this.menu.querySelector('.close-button');
        
        if (this.menuButton && this.menu) {
            this.init();
        }
    }

    init() {
        this.menuButton.addEventListener('click', (e) => this.toggleMenu(e));
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // メニュー内のリンクがクリックされたときの処理を追加
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                this.closeMenu();
                // ページ内リンクの場合のみスムーズスクロール
                if (link.getAttribute('href').startsWith('#')) {
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        event.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // 通常のページ遷移の場合は少し遅延させてアニメーションを見せる
                    event.preventDefault();
                    setTimeout(() => {
                        window.location.href = link.getAttribute('href');
                    }, 300); // メニューが閉じるアニメーションの時間に合わせる
                }
            });
        });

        // 閉じるボタンのイベントリスナーを追加
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeMenu();
            });
        }
    }

    toggleMenu(e) {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle(this.activeClass);
        this.menuButton.classList.toggle(this.activeClass);
        this.overlay.classList.toggle(this.activeClass);
        document.body.classList.toggle(this.bodyClass);
    }

    handleOutsideClick(e) {
        if (this.isOpen && !this.menu.contains(e.target) && e.target !== this.menuButton) {
            this.closeMenu();
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.closeMenu();
        }
    }

    closeMenu() {
        this.isOpen = false;
        this.menu.classList.remove(this.activeClass);
        this.menuButton.classList.remove(this.activeClass);
        this.overlay.classList.remove(this.activeClass);
        document.body.classList.remove(this.bodyClass);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // メニューコントローラーの初期化
    const menuController = new MenuController('.menu-button', '.sidebar');

    // セクションのホバーエフェクト
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        });

        section.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });

    // 現在のページをアクティブに
    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar a').forEach(link => {   
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });

    // ホバーエフェクト
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.transition = 'all 0.3s ease';
        });

        link.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0)';
        });
    });

    // クリックしたリンクをアクティブに
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
