(function ($) {
    "use strict";

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Back to top button (jQuery version)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Service and team carousel
    $(".service-carousel, .team-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Testimonials carousel (owlCarousel)
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);

// ===== DOMContentLoaded: Vanilla JS for various pages =====
document.addEventListener('DOMContentLoaded', function () {

    // ---- COUNTER ANIMATION ----
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;

    function startCounters() {
        if (animated) return;
        animated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.floor(current).toLocaleString();
                    setTimeout(updateCounter, 25);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        });
    }

    // Trigger counter when section is visible (only once)
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(counterSection);
    }

    // ---- TESTIMONIAL CAROUSEL (vanilla version) ----
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length) {
        let current = 0;
        let autoTimer = null;

        function goTo(index) {
            slides[current].classList.remove('active');
            slides[current].classList.add('exit');
            dots[current].classList.remove('active');

            setTimeout(() => {
                slides[current].classList.remove('exit');
                current = (index + slides.length) % slides.length;
                slides[current].classList.add('active');
                dots[current].classList.add('active');
            }, 200);
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAuto() {
            autoTimer = setInterval(next, 4000);
        }

        function resetAuto() {
            clearInterval(autoTimer);
            startAuto();
        }

        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { next(); resetAuto(); });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goTo(parseInt(dot.dataset.index));
                resetAuto();
            });
        });

        startAuto();
    }

    // ---- BACK TO TOP (vanilla version) ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- MOBILE MENU TOGGLE (Privacy page) ----
    const toggler = document.getElementById('navbarToggler');
    const collapse = document.getElementById('navbarCollapse');
    if (toggler && collapse) {
        toggler.addEventListener('click', function () {
            collapse.classList.toggle('show');
        });
    }

    // ---- FEEDBACK PAGE ----
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        const toast = document.getElementById('toastMessage');

        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('fb-name').value.trim();
            const email = document.getElementById('fb-email').value.trim();
            const flavor = document.getElementById('fb-flavor').value;
            const rating = document.querySelector('input[name="rating"]:checked');
            const comments = document.getElementById('fb-comments').value.trim();

            if (!name || !email || !flavor || !rating || !comments) {
                showToast('Please fill all required fields!', 'error');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showToast('Please enter a valid email address!', 'error');
                return;
            }

            const feedback = {
                id: 'FB' + Date.now(),
                name: name,
                email: email,
                flavor: flavor,
                rating: parseInt(rating.value),
                comments: comments,
                date: new Date().toLocaleString()
            };

            let feedbacks = JSON.parse(localStorage.getItem('iceCreamFeedbacks') || '[]');
            feedbacks.push(feedback);
            localStorage.setItem('iceCreamFeedbacks', JSON.stringify(feedbacks));

            showToast(`Thank you ${name}! Your feedback has been received. 🍦`, 'success');
            feedbackForm.reset();
            document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
        });

        // Toast Function
        function showToast(message, type = 'success') {
            if (!toast) return;
            const icon = toast.querySelector('i');
            const text = toast.querySelector('span');
            if (!icon || !text) return;

            if (type === 'error') {
                icon.className = 'fas fa-exclamation-circle';
                toast.style.background = 'linear-gradient(135deg, #dc3545, #e74c5e)';
                toast.style.boxShadow = '0 10px 30px rgba(220, 53, 69, 0.3)';
            } else {
                icon.className = 'fas fa-check-circle';
                toast.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                toast.style.boxShadow = '0 10px 30px rgba(40, 167, 69, 0.3)';
            }

            text.textContent = message;
            toast.classList.add('show');

            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        }

        // Star Rating Hover Effect Enhancement
        document.querySelectorAll('.star-rating-box label').forEach(label => {
            label.addEventListener('mouseenter', function () {
                const allLabels = this.parentElement.querySelectorAll('label');
                const currentIndex = Array.from(allLabels).indexOf(this);
                allLabels.forEach((l, i) => {
                    if (i >= currentIndex) {
                        l.style.color = '#F195B2';
                        l.style.transform = 'scale(1.08)';
                    }
                });
            });

            label.addEventListener('mouseleave', function () {
                const allLabels = this.parentElement.querySelectorAll('label');
                const checked = this.parentElement.querySelector('input:checked');
                allLabels.forEach((l) => {
                    if (!checked) {
                        l.style.color = '#ddd';
                    } else {
                        const checkedIndex = Array.from(allLabels).indexOf(
                            checked.nextElementSibling
                        );
                        if (Array.from(allLabels).indexOf(l) >= checkedIndex) {
                            l.style.color = '#F195B2';
                        } else {
                            l.style.color = '#ddd';
                        }
                    }
                    l.style.transform = 'scale(1)';
                });
            });
        });
    }

    // ---- FAQ PAGE ----
    const faqContainer = document.getElementById('faqContainer');
    const categoryFilters = document.getElementById('categoryFilters');
    if (faqContainer && categoryFilters) {
        // FAQ Data (unchanged)
        const faqData = [ /* ... full faqData array as provided ... */];
        const categories = { /* ... full categories object as provided ... */ };

        // Render functions (unchanged)
        function renderCategories() {
            let html = '<button class="faq-category-btn active" data-category="all" onclick="filterFAQ(\'all\', this)"><i class="fas fa-border-all"></i> All Questions <span class="count-badge">' + faqData.length + '</span></button>';

            const categoryCounts = {};
            faqData.forEach(function (item) {
                categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
            });

            Object.keys(categories).forEach(function (key) {
                const count = categoryCounts[key] || 0;
                if (count > 0) {
                    html += '<button class="faq-category-btn" data-category="' + key + '" onclick="filterFAQ(\'' + key + '\', this)"><i class="fas ' + categories[key].icon + '"></i> ' + categories[key].label + ' <span class="count-badge">' + count + '</span></button>';
                }
            });

            categoryFilters.innerHTML = html;
        }

        function renderFAQ(category) {
            category = category || 'all';
            const filtered = category === 'all' ? faqData : faqData.filter(function (item) { return item.category === category; });

            let html = '';
            filtered.forEach(function (item, index) {
                const globalIndex = faqData.indexOf(item) + 1;
                html += '<div class="faq-item" data-category="' + item.category + '">' +
                    '<div class="faq-question" onclick="toggleFAQ(this)">' +
                    '<h5>' +
                    '<span class="q-number">' + globalIndex + '</span>' +
                    item.question +
                    '</h5>' +
                    '<span class="faq-toggle"><i class="fas fa-chevron-down"></i></span>' +
                    '</div>' +
                    '<div class="faq-answer">' +
                    item.answer +
                    '</div>' +
                    '</div>';
            });

            faqContainer.innerHTML = html;
        }

        function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const toggleIcon = element.querySelector('.faq-toggle i');

            const allAnswers = document.querySelectorAll('.faq-answer');
            const allQuestions = document.querySelectorAll('.faq-question');

            allAnswers.forEach(function (ans) {
                if (ans !== answer) {
                    ans.classList.remove('open');
                    ans.previousElementSibling.querySelector('.faq-toggle i').className = 'fas fa-chevron-down';
                    ans.previousElementSibling.classList.remove('active');
                }
            });

            answer.classList.toggle('open');
            element.classList.toggle('active');

            if (answer.classList.contains('open')) {
                toggleIcon.className = 'fas fa-chevron-up';
            } else {
                toggleIcon.className = 'fas fa-chevron-down';
            }
        }

        window.filterFAQ = function (category, button) {
            document.querySelectorAll('.faq-category-btn').forEach(function (btn) { btn.classList.remove('active'); });
            button.classList.add('active');
            renderFAQ(category);
        };

        window.toggleFAQ = toggleFAQ;

        // Search FAQ
        const searchInput = document.getElementById('faqSearchInput');
        if (searchInput) {
            searchInput.addEventListener('keyup', function () {
                const filter = this.value.toLowerCase().trim();
                const items = document.querySelectorAll('.faq-item');

                if (filter === '') {
                    items.forEach(function (item) { item.style.display = 'block'; });
                    return;
                }

                items.forEach(function (item) {
                    const question = item.querySelector('.faq-question h5').textContent.toLowerCase();
                    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                    item.style.display = (question.includes(filter) || answer.includes(filter)) ? 'block' : 'none';
                });
            });
        }

        renderCategories();
        renderFAQ('all');

        // Open first FAQ by default
        setTimeout(function () {
            const firstQuestion = document.querySelector('.faq-question');
            if (firstQuestion) {
                toggleFAQ(firstQuestion);
            }
        }, 200);
    }

    // ---- BOOK ORDER PAGE ----
    const booksGrid = document.getElementById('booksGrid');
    if (booksGrid) {
        // Book data (unchanged)
        const booksData = [ /* ... full booksData array ... */];

        function renderBooks() {
            let html = "";
            booksData.forEach((book) => {
                const savePercent = book.oldPrice ? Math.round((1 - book.price / book.oldPrice) * 100) : 0;
                const stars = "★".repeat(Math.floor(book.rating)) + "☆".repeat(5 - Math.floor(book.rating));

                html += `
                    <div class="book-card">
                        <div class="book-image">
                            <img src="${book.image}" alt="${book.title}" loading="lazy">
                            <span class="book-badge ${book.badge}">${book.badgeText}</span>
                        </div>
                        <div class="book-body">
                            <h3 class="book-title">${book.title}</h3>
                            <div class="book-author"><i class="fas fa-user-edit"></i> by ${book.author}</div>
                            <div class="book-rating">
                                <span class="stars">${stars}</span>
                                <span class="count">(${book.reviews} reviews)</span>
                            </div>
                            <p class="book-desc">${book.desc}</p>
                            <div class="book-footer">
                                <div class="book-price">
                                    <span class="current">$${book.price.toFixed(2)}</span>
                                    ${book.oldPrice ? `<span class="old">$${book.oldPrice.toFixed(2)}</span>` : ""}
                                    ${savePercent > 0 ? `<span class="save">Save ${savePercent}%</span>` : ""}
                                </div>
                                <button class="btn-buy" onclick="openModal(${book.id})">
                                    <i class="fas fa-shopping-bag"></i> Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            booksGrid.innerHTML = html;
        }

        let selectedBook = null;

        window.openModal = function (bookId) {
            selectedBook = booksData.find((b) => b.id === bookId);
            if (!selectedBook) return;

            const modal = document.getElementById('orderModal');
            if (!modal) return;
            document.getElementById("modalBookTitle").textContent = selectedBook.title;
            document.getElementById("orderTotal").textContent = `$${selectedBook.price.toFixed(2)}`;
            modal.classList.add("active");
            document.body.style.overflow = "hidden";

            document.getElementById("orderForm").reset();
            document.getElementById("cardDetails").style.display = "none";
        };

        window.closeModal = function () {
            const modal = document.getElementById('orderModal');
            if (modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        };

        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = document.getElementById("fullName").value.trim();
                const email = document.getElementById("email").value.trim();
                const phone = document.getElementById("phone").value.trim();
                const address = document.getElementById("address").value.trim();
                const payment = document.getElementById("paymentMethod").value;

                if (!name || !email || !phone || !address || !payment) {
                    showToast("Please fill in all required fields", true);
                    return;
                }

                if (!email.includes("@") || !email.includes(".")) {
                    showToast("Please enter a valid email address", true);
                    return;
                }

                const btn = document.querySelector(".btn-submit-order");
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check-circle"></i> Complete Order';
                    btn.disabled = false;

                    showToast(`✅ Order placed successfully! Your book "${selectedBook.title}" will be shipped soon.`);
                    closeModal();
                    orderForm.reset();
                    document.getElementById("cardDetails").style.display = "none";
                }, 2000);
            });
        }

        function showToast(message, isError = false) {
            const toast = document.getElementById("toast");
            if (!toast) return;
            const text = document.getElementById("toastText");
            if (!text) return;

            text.textContent = message;
            toast.className = "toast-message";
            if (isError) toast.classList.add("error");

            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 4000);
        }

        // Modal close on background click / escape
        const orderModal = document.getElementById('orderModal');
        if (orderModal) {
            orderModal.addEventListener('click', function (e) {
                if (e.target === this) closeModal();
            });
        }
        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") closeModal();
        });

        // Payment method toggle
        const paymentMethod = document.getElementById('paymentMethod');
        if (paymentMethod) {
            paymentMethod.addEventListener('change', function () {
                const cardDetails = document.getElementById('cardDetails');
                if (cardDetails) {
                    cardDetails.style.display = this.value ? 'block' : 'none';
                }
            });
        }

        renderBooks();
        console.log("📚 iCREAM Book Store Loaded Successfully!");
        console.log("💡 Registered members get 10% off on all books!");
    }

}); // end DOMContentLoaded