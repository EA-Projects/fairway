window.addEventListener('load', function() {  
    // Fix navbar when scroll
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $('nav').addClass('scrolled');
        } 
        else {
            $('nav').removeClass('scrolled');
        }
    });

    // Slick slider for Resources
    if ($('.wrapper-phones').length) {
        $('.wrapper-phones').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '0',
            focusOnSelect: false,
            arrows: false,
            autoplay: false,
            pauseOnHover: true,
            draggable: true,
            infinite: false,
            dots: true,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: "unslick"
                }
            ]
        });
    }

    // Animations on parallax
    if (window.matchMedia('(min-width: 575px)').matches) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(".row-feature.is-left .inner-graphic img", {
            y: -40
            },
            {
            y: 60,
            ease: "none",
            scrollTrigger: {
                trigger: ".row-feature.is-left",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(".row-feature.is-right .inner-graphic img", {
            y: -40
            },
            {
            y: 60,
            ease: "none",
            scrollTrigger: {
                trigger: ".row-feature.is-right",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }

    //   Animations on fade in
    let animatedElements = new Set(); // Para evitar reanimaciones

    let observer = new IntersectionObserver((entries) => {
        // Filtrar los elementos que están entrando en vista y no han sido animados aún
        const toAnimate = entries
            .filter(entry => entry.isIntersecting && !animatedElements.has(entry.target))
            .map(entry => entry.target);

        if (toAnimate.length > 0) {
            gsap.to(toAnimate, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.3
            });

            // Marcar los elementos como animados y dejar de observarlos
            toAnimate.forEach(el => {
                animatedElements.add(el);
                observer.unobserve(el);
            });
        }
    }, {
        threshold: 0.3
    });

    document.querySelectorAll("[data-fade]").forEach((el) => {
        observer.observe(el);
    });

    if ($('#waitlist-form').length) {
        $(function () {
            const scriptURL =
                'https://script.google.com/macros/s/AKfycbw6qsHtlS2bQZQ87T5sA1PMy4IwNbdG_IKPRCVBYg-EumUPSq_yFU6NqXrZVOe_VXiE/exec';
            const form = document.getElementById('waitlist-form');
        
            form.addEventListener('submit', (e) => {
                $('#waitlist-form').addClass('disabled');
        
                // Sending status
                $('#waitlist-form').addClass('readonly');
                $('#waitlist-form input.button').val("Sending Information");
        
                e.preventDefault();
        
                // Crear FormData para incluir archivo y otros campos
                const formData = new FormData(form);
        
                fetch(scriptURL, { method: 'POST', body: formData })
                .then((response) => {
                    $('.success-form').addClass('visible');
                    $('#waitlist-form').addClass('readonly');
                    $('.wrapper-form').addClass('readonly');
                })
                .catch((error) => {
                    console.error('Error!', error.message);
                    $('.success-form').removeClass('visible');
                    $('#waitlist-form').removeClass('readonly');
                    $('.wrapper-form').removeClass('readonly');
                });
            });
        });
    }

});
