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
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

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
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    /* ===== COUNTER ANIMATION ===== */
    document.addEventListener('DOMContentLoaded', function () {

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

        // Trigger when counter section is visible
        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) startCounters();
                });
            }, { threshold: 0.3 });

            observer.observe(counterSection);
        }

        /* ===== TESTIMONIAL CAROUSEL ===== */
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
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

        document.getElementById('nextBtn')?.addEventListener('click', () => { next(); resetAuto(); });
        document.getElementById('prevBtn')?.addEventListener('click', () => { prev(); resetAuto(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goTo(parseInt(dot.dataset.index));
                resetAuto();
            });
        });

        startAuto();

        /* ===== BACK TO TOP ===== */
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop?.classList.add('visible');
            } else {
                backToTop?.classList.remove('visible');
            }
        });

        backToTop?.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
        // Check when counter section comes into view
        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 }); // Triggers when 30% of section is visible

            observer.observe(counterSection);
        }
    });
    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
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

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

// Privacy page code
const toggler = document.getElementById('navbarToggler');
const collapse = document.getElementById('navbarCollapse');

if (toggler) {
    toggler.addEventListener('click', function () {
        collapse.classList.toggle('show');
    });
}
// Mobile Menu Toggle
const toggler = document.getElementById('navbarToggler');
const collapse = document.getElementById('navbarCollapse');
if (toggler) {
    toggler.addEventListener('click', function () {
        collapse.classList.toggle('show');
    });
}

// feedback Page JavaScript
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('feedbackForm');
    const toast = document.getElementById('toastMessage');

    // Star Rating - Reset on form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get values
        const name = document.getElementById('fb-name').value.trim();
        const email = document.getElementById('fb-email').value.trim();
        const flavor = document.getElementById('fb-flavor').value;
        const rating = document.querySelector('input[name="rating"]:checked');
        const comments = document.getElementById('fb-comments').value.trim();

        // Validation
        if (!name || !email || !flavor || !rating || !comments) {
            showToast('Please fill all required fields!', 'error');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showToast('Please enter a valid email address!', 'error');
            return;
        }

        // Create feedback object
        const feedback = {
            id: 'FB' + Date.now(),
            name: name,
            email: email,
            flavor: flavor,
            rating: parseInt(rating.value),
            comments: comments,
            date: new Date().toLocaleString()
        };

        // Save to localStorage
        let feedbacks = JSON.parse(localStorage.getItem('iceCreamFeedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('iceCreamFeedbacks', JSON.stringify(feedbacks));

        // Show success toast
        showToast(`Thank you ${name}! Your feedback has been received. 🍦`, 'success');

        // Reset form
        form.reset();

        // Uncheck stars
        document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
    });

    // Toast Function
    function showToast(message, type = 'success') {
        const icon = toast.querySelector('i');
        const text = toast.querySelector('span');

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

});

//faqs page js
// ===== COMPLETE FAQ DATA (100+ QUESTIONS) =====
const faqData = [
    // ===== GENERAL (8) =====
    { category: "general", question: "What is iCREAM Parlor?", answer: "iCREAM Parlor is a premium ice cream shop founded by Mr. 'A' in 1950. We're famous for our exceptional taste, quality ingredients, and traditional recipes that have been perfected over decades." },
    { category: "general", question: "What makes your ice cream special?", answer: "Our ice cream is made with the freshest, premium ingredients including organic milk and cream. We use traditional recipes passed down since 1950, and each flavor is handcrafted in small batches to ensure the highest quality and taste." },
    { category: "general", question: "Do you offer dairy-free or vegan options?", answer: "Yes! We offer several dairy-free options including Mango, Strawberry, and Black Currant sorbets. We're also developing coconut-based and almond milk ice creams. Check our gallery for vegan-friendly flavors." },
    { category: "general", question: "What are your business hours?", answer: "We're open 7 days a week: <br><strong>Monday - Thursday:</strong> 10:00 AM - 10:00 PM<br><strong>Friday - Sunday:</strong> 9:00 AM - 11:00 PM" },
    { category: "general", question: "Where are your branches located?", answer: "We have multiple branches across the city. Visit our Contact Us page for complete addresses, phone numbers, and Google Maps locations." },
    { category: "general", question: "How can I contact customer support?", answer: "You can contact us via:<br> Email: support@icream.com<br> Phone: +1-800-ICREAM<br> Contact Us form on our website<br> Visit any of our branches" },
    { category: "general", question: "Can I visit the shop in person?", answer: "Absolutely! We welcome all customers at our physical branches. Visit us to taste our fresh ice cream and experience our warm hospitality." },
    { category: "general", question: "Is there a minimum order requirement?", answer: "No, there's no minimum order requirement. You can order as little or as much as you like." },

    // ===== MEMBERSHIP (10) =====
    { category: "membership", question: "How do I become a registered member?", answer: "Registering is easy! Click on the Register button, fill in your details, and complete the payment:<br><strong>Monthly Membership:</strong> $15<br><strong>Yearly Membership:</strong> $150<br>Once registered, you'll get access to all premium features." },
    { category: "membership", question: "What are the benefits of becoming a registered member?", answer: "Registered members get exclusive access to:<br> Complete recipe library with step-by-step instructions for all 20+ flavors<br> High-quality images for each recipe<br> Ability to submit your own recipes for the contest<br> Special discounts on recipe books (10% off)<br> Participation certificates for contest winners<br> Priority customer support<br> Order history tracking<br> Early access to new flavors" },
    { category: "membership", question: "Can I register without making a payment?", answer: "No, registration requires payment as per the membership plans. This helps us maintain the quality of our services and recipe content." },
    { category: "membership", question: "What payment methods do you accept for registration?", answer: "We accept all major Credit Cards (Visa, Mastercard, American Express) and Debit Cards. All transactions are secured with 256-bit encryption." },
    { category: "membership", question: "Can I cancel my membership anytime?", answer: "Yes, you can cancel anytime:<br><strong>Monthly members:</strong> Cancellation takes effect at the end of the current month<br><strong>Yearly members:</strong> Pro-rata refund for remaining months" },
    { category: "membership", question: "Is my payment information secure?", answer: "Absolutely! We use industry-standard SSL encryption and secure payment gateways. Your credit/debit card information is never stored on our servers and is processed through trusted payment partners." },
    { category: "membership", question: "Can I upgrade from monthly to yearly membership?", answer: "Yes! You can upgrade anytime. The remaining amount of your monthly membership will be adjusted towards the yearly plan." },
    { category: "membership", question: "What happens if my membership expires?", answer: "You'll lose access to premium content (full recipes, contest submissions, etc.). You can renew your membership anytime to regain access." },
    { category: "membership", question: "How do I reset my password?", answer: "Click on 'Forgot Password' on the login page. You'll receive a password reset link on your registered email." },
    { category: "membership", question: "Can I have multiple accounts?", answer: "We recommend having only one account per person. Multiple accounts may be flagged for review." },

    // ===== RECIPES (8) =====
    { category: "recipes", question: "How many recipes are available on the website?", answer: "We currently have 20+ signature flavors in our gallery:<br>Vanilla, Chocolate, Chocolate Chip, Strawberry, Mango, Coffee, Black Currant, Cherry, Butterscotch, Walnut, Vanilla & Strawberry (Two in One), Pistachio, Banana, Banana Chocolate Chip, Chocolate Almond, Chocolate Truffle, Kiwi Fruit, Pineapple, Fruit and Nut, Cashew Caramel Crunch" },
    { category: "recipes", question: "Can unregistered users see the recipes?", answer: "Unregistered users can see:<br> Flavor names<br> Ingredients list (preview)<br> Flavor images<br>However, the complete step-by-step procedure and secret techniques are <strong>locked</strong> and available ONLY to registered members." },
    { category: "recipes", question: "What information is included in each recipe?", answer: "Each recipe includes:<br> Flavor name<br> High-quality image<br> Complete ingredients list with measurements<br> Step-by-step procedure<br> Preparation time<br> Serving size<br> Tips and tricks<br> Storage instructions" },
    { category: "recipes", question: "How are recipes updated?", answer: "Our admin team regularly:<br> Adds new flavors<br> Updates existing recipes<br> Improves recipes based on customer feedback<br> Adds seasonal specials" },
    { category: "recipes", question: "Can I get the recipe in PDF format?", answer: "Yes! Registered members can download a PDF version of any recipe from their dashboard. The PDF includes full instructions, ingredient measurements, and helpful tips." },
    { category: "recipes", question: "Who adds the recipes to the website?", answer: "All recipes are added by the <strong>Admin</strong> through the Admin Login panel. Admin also updates recipe details and manages the gallery." },
    { category: "recipes", question: "Are there images for each flavor?", answer: "Yes! Each flavor has a high-quality professional image added by the admin. Images are visible to both registered and unregistered users." },
    { category: "recipes", question: "Can I suggest a new flavor?", answer: "Yes! Registered members can submit their own recipe ideas through the 'Add New Recipe' feature. Your suggestion could become a contest winner!" },

    // ===== BOOKS & ORDERS (10) =====
    { category: "orders", question: "What recipe books are available for purchase?", answer: "Mr. 'A' has written various recipe books for desserts and ice cream. These include:<br> 'The Art of Ice Cream Making'<br> '50 Classic Dessert Recipes'<br> 'Seasonal Ice Cream Creations'<br> 'Healthy Ice Cream Alternatives'<br> 'Gourmet Dessert Collection'" },
    { category: "orders", question: "Can both registered and unregistered users order books?", answer: "Yes! Both registered and unregistered users can order recipe books. However, registered members get a 10% discount on all books." },
    { category: "orders", question: "How do I order a recipe book?", answer: "1. Visit the 'Books' page<br>2. Browse available books with images and descriptions<br>3. Click 'Buy Now' on your selected book<br>4. Fill in your details: Name, Email, Contact, Delivery Address<br>5. Cost is automatically calculated<br>6. Select payment option (Credit/Debit Card)<br>7. Complete payment with proper validation<br>8. Submit your order" },
    { category: "orders", question: "What payment methods do you accept for books?", answer: "We accept:<br> Credit Cards (Visa, Mastercard, American Express)<br> Debit Cards<br>All payments are processed through secure gateways with proper validation." },
    { category: "orders", question: "How much does shipping cost?", answer: "Shipping costs vary based on location:<br> Local delivery: $5<br> National shipping: $10<br> International shipping: $25<br>Free shipping on orders over $100." },
    { category: "orders", question: "How long does shipping take?", answer: " Order processing: 2-3 business days<br> Domestic shipping: 3-5 business days<br> International shipping: 7-14 business days" },
    { category: "orders", question: "Can I track my order?", answer: "Yes! Registered members can track their order status in the Order History section. Status updates include:<br> Processing (order received)<br> Shipped (order dispatched)<br> Completed (delivered)" },
    { category: "orders", question: "Will I receive a confirmation after ordering?", answer: "Yes! After completing your transaction:<br> You'll see a success message on screen<br> You'll receive a confirmation email with order details<br> You'll get order tracking information" },
    { category: "orders", question: "Can I return a book?", answer: "Yes, you can return books within 7 days of delivery if they're in perfect condition. Shipping costs are non-refundable." },
    { category: "orders", question: "Are e-books available?", answer: "Currently, we only offer physical books. However, registered members can download PDF versions of individual recipes." },

    // ===== CONTEST (11) =====
    { category: "contest", question: "What is the recipe contest?", answer: "The recipe contest allows registered users to submit their own ice cream or dessert recipes. Admin reviews all submissions and selects the best ones. Winners receive prize money and certificates." },
    { category: "contest", question: "Who can participate in the contest?", answer: "Only <strong>registered members</strong> can participate. Unregistered users cannot submit recipes." },
    { category: "contest", question: "How do I submit my recipe for the contest?", answer: "1. Log in to your registered account<br>2. Go to 'Add New Recipe' page<br>3. Fill in: Recipe name, Ingredients with measurements, Step-by-step procedure, Preparation time<br>4. Upload recipe images<br>5. Submit the form<br>6. Admin will review your submission" },
    { category: "contest", question: "What is the prize for winning?", answer: "Winners receive:<br> Cash prize (amount decided by admin)<br> Official participation certificate from Mr. 'A'<br> Name displayed on Home Page under 'Top Recipe Column'<br> Recognition across all branches" },
    { category: "contest", question: "How many winners are selected?", answer: "There's no fixed number. Admin selects the best recipes based on quality, creativity, and uniqueness." },
    { category: "contest", question: "How is the winner decided?", answer: "Admin reviews all submissions based on:<br> Creativity and uniqueness<br> Taste potential<br> Quality of ingredients<br> Clear instructions<br> Presentation" },
    { category: "contest", question: "When is the winner announced?", answer: "Winners are announced monthly. All registered members are notified via email." },
    { category: "contest", question: "Can I submit multiple recipes?", answer: "Yes! You can submit as many recipes as you like. Each recipe is judged independently." },
    { category: "contest", question: "What happens if my recipe is selected?", answer: "Your recipe will be:<br> Added to the website gallery<br> Featured in the 'Top Recipe Column'<br> You'll receive prize money and certificate<br> You'll be credited as the recipe creator" },
    { category: "contest", question: "Can I submit a recipe that I found online?", answer: "No. All submissions must be original recipes created by you. Plagiarism will result in disqualification." },
    { category: "contest", question: "Do I keep the rights to my recipe?", answer: "You retain ownership rights. However, by submitting, you allow us to feature your recipe on our website with proper credit." },

    // ===== PAYMENT (7) =====
    { category: "payment", question: "What payment methods are accepted?", answer: "We accept:<br> Credit Cards (Visa, Mastercard, American Express)<br> Debit Cards<br>All transactions are processed securely." },
    { category: "payment", question: "Is my payment information secure?", answer: "Yes! We use:<br> SSL encryption (256-bit)<br> Secure payment gateways<br> PCI compliant systems<br> Your card details are never stored" },
    { category: "payment", question: "Will I get a receipt for my payment?", answer: "Yes! You'll receive:<br> On-screen confirmation<br> Email receipt<br> Transaction ID<br> Invoice in your account dashboard" },
    { category: "payment", question: "What if my payment fails?", answer: "If payment fails:<br>1. Check your card details<br>2. Ensure sufficient balance<br>3. Try again<br>4. Contact your bank<br>5. Contact our support team if issue persists" },
    { category: "payment", question: "Are there any hidden charges?", answer: "No. All prices are transparent. You only pay:<br> Membership fees (Monthly: $15 / Yearly: $150)<br> Book prices (as shown on website)<br> Shipping charges (if applicable)" },
    { category: "payment", question: "Can I get a refund?", answer: "Refunds are available for:<br> Membership cancellation (pro-rata)<br> Defective/damaged books<br> Failed transactions<br>Contact support for refund requests." },
    { category: "payment", question: "Do you offer discounts?", answer: "Yes! We offer:<br> 10% discount for registered members on books<br> Seasonal promotions<br> Bulk order discounts<br> Special offers during festivals" },

    // ===== FEEDBACK (6) =====
    { category: "feedback", question: "Can I give feedback on the website?", answer: "Yes! Both registered and unregistered users can submit feedback through our Feedback Form. We value your input!" },
    { category: "feedback", question: "What can I provide feedback about?", answer: "You can provide feedback about:<br> Website experience<br> Product quality<br> Customer service<br> Recipe quality<br> Suggestion for improvements<br> Any other concerns" },
    { category: "feedback", question: "How do I contact support?", answer: "You can reach us via:<br> Contact Us form on website<br> Email: support@icream.com<br> Phone: +1-800-ICREAM<br> Visit any branch" },
    { category: "feedback", question: "How quickly will I get a response?", answer: "We aim to respond within:<br> 24 hours for emails<br> 1-2 business days for feedback<br> Immediate for phone calls (during business hours)" },
    { category: "feedback", question: "Is my feedback confidential?", answer: "Yes! Your feedback is kept confidential. We use it only to improve our products and services." },
    { category: "feedback", question: "Can I give feedback anonymously?", answer: "Yes! Unregistered users can submit feedback without logging in. Registered users can choose to remain anonymous." },

    // ===== TECHNICAL (8) =====
    { category: "technical", question: "What browsers are supported?", answer: "We support:<br> Google Chrome (latest)<br> Mozilla Firefox (latest)<br> Safari (latest)<br> Microsoft Edge (latest)<br> Opera (latest)" },
    { category: "technical", question: "Is the website mobile-friendly?", answer: "Yes! Our website is fully responsive and works on all devices including:<br> Desktop computers<br> Laptops<br> Tablets<br> Smartphones" },
    { category: "technical", question: "What if I forget my password?", answer: "Click on 'Forgot Password' on the login page. You'll receive a password reset link on your registered email." },
    { category: "technical", question: "Why am I not receiving emails from the website?", answer: "Please check:<br> Your spam/junk folder<br> Your email settings<br> That you entered the correct email address<br> Contact support if issue persists" },
    { category: "technical", question: "Is my personal data secure?", answer: "Yes! We follow strict data protection policies. Your information is never shared with third parties without your consent." },
    { category: "technical", question: "How do I update my profile information?", answer: "Log in and go to 'My Account' or 'Dashboard' section. You can update your name, email, password, and other details." },
    { category: "technical", question: "Can I delete my account?", answer: "Yes! Contact our support team to request account deletion. Your data will be removed as per our privacy policy." },
    { category: "technical", question: "How do I enable cookies?", answer: "Cookies are required for:<br> User login<br> Cart functionality<br> User preferences<br>Enable cookies in your browser settings for the best experience." },

    // ===== ADMIN (5) =====
    { category: "admin", question: "Who manages the website content?", answer: "The <strong>Admin</strong> manages all content through the Admin Panel including:<br> Adding/updating recipes<br> Managing registered users<br> Processing book orders<br> Reviewing feedback<br> Managing recipe contest<br> Updating gallery images" },
    { category: "admin", question: "How does the Admin access the panel?", answer: "Admin has a separate login page. Only authorized admin users can access the panel." },
    { category: "admin", question: "What can the Admin do?", answer: "Admin can:<br> Add/update/delete recipes with images<br> View registered users list<br> Check payment details<br> View book orders<br> Update order status (Processed, Shipped, Completed)<br> View and manage feedback<br> Review recipe submissions<br> Select contest winners<br> Update website content" },
    { category: "admin", question: "Can Admin see user payments?", answer: "Yes! Admin can see:<br> Registration payments<br> Membership renewals<br> Book order payments<br> User transaction history" },
    { category: "admin", question: "What is the order management process?", answer: "Admin follows this process:<br>1. Receive order notification<br>2. Process the order<br>3. Update status to 'Processed'<br>4. Ship the order<br>5. Update status to 'Shipped'<br>6. Mark as 'Completed' once delivered" },

    // ===== FLAVORS (6) =====
    { category: "flavors", question: "What's the most popular flavor?", answer: "Vanilla and Chocolate are our classic bestsellers. Butterscotch and Pistachio are also customer favorites." },
    { category: "flavors", question: "Do you have seasonal flavors?", answer: "Yes! We introduce seasonal flavors like:<br> Summer: Mango, Pineapple, Kiwi<br> Winter: Chocolate Truffle, Coffee, Butterscotch<br> Spring: Strawberry, Cherry<br> Fall: Walnut, Fruit and Nut" },
    { category: "flavors", question: "What's the 'Two in One' flavor?", answer: "Our Vanilla & Strawberry (Two in One) combines both flavors in one scoop - perfect for those who can't decide!" },
    { category: "flavors", question: "Are there nut-free options?", answer: "Yes! We have several nut-free options including Vanilla, Chocolate, Strawberry, Mango, Black Currant, Cherry, and Kiwi Fruit." },
    { category: "flavors", question: "Can I customize my own flavor?", answer: "Registered members can submit their custom recipe ideas through the 'Add New Recipe' feature. If selected, it becomes a part of our collection!" },
    { category: "flavors", question: "How are the flavors created?", answer: "Each flavor is created by our expert team using:<br> Premium quality ingredients<br> Traditional methods<br> Innovative techniques<br> Mr. A's secret family recipes" },

    // ===== DELIVERY (5) =====
    { category: "delivery", question: "Do you deliver internationally?", answer: "Yes! We ship books worldwide. International shipping takes 7-14 business days." },
    { category: "delivery", question: "Can I pick up my order from the shop?", answer: "Yes! You can choose 'In-Store Pickup' during checkout and collect your order from any branch." },
    { category: "delivery", question: "How do I know my order is confirmed?", answer: "You'll receive:<br> Order confirmation on screen<br> Confirmation email<br> Order ID for tracking" },
    { category: "delivery", question: "What if I receive a damaged book?", answer: "Contact our support team within 48 hours of receiving the package. We'll arrange a replacement or refund." },
    { category: "delivery", question: "Can I change my delivery address after ordering?", answer: "Yes! Contact our support team immediately with your order ID and new address. Changes can be made before the order is shipped." },

    // ===== MISCELLANEOUS (16) =====
    { category: "misc", question: "Do you offer gift cards?", answer: "Yes! Gift cards are available for any amount. They make perfect gifts for ice cream lovers." },
    { category: "misc", question: "Can I book the shop for private events?", answer: "Yes! Contact us for private event bookings. We can cater ice cream for:<br> Birthday parties<br> Corporate events<br> Weddings<br> Private gatherings" },
    { category: "misc", question: "Do you offer catering services?", answer: "Yes! We provide catering for events. Contact us for menu options and pricing." },
    { category: "misc", question: "How do I stay updated about new flavors?", answer: "Subscribe to our newsletter or follow us on social media for regular updates." },
    { category: "misc", question: "Do you have loyalty programs?", answer: "Yes! Registered members get loyalty points for every purchase that can be redeemed later." },
    { category: "misc", question: "Is the ice cream halal/vegetarian certified?", answer: "Yes! Our ice creams are made with halal and vegetarian-friendly ingredients." },
    { category: "misc", question: "Do you use artificial flavors or colors?", answer: "No! We use only natural flavors and colors from real ingredients." },
    { category: "misc", question: "What makes your ice cream different from others?", answer: "Our differences:<br> Since 1950 family recipes<br> Premium organic ingredients<br> Small batch production<br> Mr. A's secret techniques<br> Exceptional quality control" },
    { category: "misc", question: "Can I get a tour of the shop?", answer: "Yes! We welcome visitors. Contact us to schedule a tour of our kitchen and learn about our ice cream making process." },
    { category: "misc", question: "Do you offer free samples?", answer: "Yes! Visitors can taste free samples at our branches before purchasing." },
    { category: "misc", question: "How long can ice cream be stored?", answer: "Our ice cream stays fresh for:<br> 1 month in freezer for best taste<br> 2 months maximum<br> Always store at -18°C" },
    { category: "misc", question: "Do you ship ice cream too?", answer: "Currently, we only ship recipe books and merchandise. Ice cream is available for in-store purchase only." },
    { category: "misc", question: "What should I do if I find an error on the website?", answer: "Please report it through our Feedback Form or contact our support team. We'll fix it promptly." },
    { category: "misc", question: "How can I become a partner?", answer: "Contact our business development team for partnership inquiries." },
    { category: "misc", question: "Is there a mobile app available?", answer: "Not yet, but our website is fully optimized for mobile devices. We plan to launch a mobile app soon." },
    { category: "misc", question: "What's the best way to stay connected with iCREAM?", answer: "Follow us on:<br> Facebook: @iCREAMparlor<br> Instagram: @iCREAM_icecream<br> Twitter: @iCREAMshop<br> Newsletter: Subscribe on our website" }
];

// ===== CATEGORIES WITH COUNTS =====
const categories = {
    general: { label: "General", icon: "fa-home" },
    membership: { label: "Membership", icon: "fa-user-plus" },
    recipes: { label: "Recipes", icon: "fa-utensils" },
    orders: { label: "Books & Orders", icon: "fa-book" },
    contest: { label: "Recipe Contest", icon: "fa-trophy" },
    payment: { label: "Payment", icon: "fa-credit-card" },
    feedback: { label: "Feedback", icon: "fa-comment" },
    technical: { label: "Technical", icon: "fa-cogs" },
    admin: { label: "Admin Panel", icon: "fa-user-cog" },
    flavors: { label: "Flavors", icon: "fa-ice-cream" },
    delivery: { label: "Delivery", icon: "fa-truck" },
    misc: { label: "Miscellaneous", icon: "fa-ellipsis-h" }
};

// ===== RENDER CATEGORY FILTERS =====
function renderCategories() {
    const container = document.getElementById('categoryFilters');
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

    container.innerHTML = html;
}

// ===== RENDER FAQ =====
function renderFAQ(category) {
    category = category || 'all';
    const container = document.getElementById('faqContainer');
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

    container.innerHTML = html;
}

// ===== TOGGLE FAQ =====
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggleIcon = element.querySelector('.faq-toggle i');

    // Close all other answers
    const allAnswers = document.querySelectorAll('.faq-answer');
    const allQuestions = document.querySelectorAll('.faq-question');

    allAnswers.forEach(function (ans) {
        if (ans !== answer) {
            ans.classList.remove('open');
            ans.previousElementSibling.querySelector('.faq-toggle i').className = 'fas fa-chevron-down';
            ans.previousElementSibling.classList.remove('active');
        }
    });

    // Toggle current answer
    answer.classList.toggle('open');
    element.classList.toggle('active');

    if (answer.classList.contains('open')) {
        toggleIcon.className = 'fas fa-chevron-up';
    } else {
        toggleIcon.className = 'fas fa-chevron-down';
    }
}

// ===== FILTER FAQ =====
function filterFAQ(category, button) {
    // Update active button
    document.querySelectorAll('.faq-category-btn').forEach(function (btn) { btn.classList.remove('active'); });
    button.classList.add('active');

    // Filter and render
    renderFAQ(category);
}

// ===== SEARCH FAQ =====
function searchFAQ() {
    const input = document.getElementById('faqSearchInput');
    const filter = input.value.toLowerCase().trim();
    const items = document.querySelectorAll('.faq-item');

    if (filter === '') {
        items.forEach(function (item) { item.style.display = 'block'; });
        return;
    }

    items.forEach(function (item) {
        const question = item.querySelector('.faq-question h5').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

        if (question.includes(filter) || answer.includes(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== INITIAL RENDER =====
renderCategories();
renderFAQ('all');

// Open first FAQ by default
setTimeout(function () {
    const firstQuestion = document.querySelector('.faq-question');
    if (firstQuestion) {
        toggleFAQ(firstQuestion);
    }
}, 200);

//bookorder page js
const booksData = [
    {
        id: 1,
        title: "The Art of Ice Cream Making",
        author: "Mr. A",
        price: 29.99,
        oldPrice: null,
        badge: "bestseller",
        badgeText: "⭐ Bestseller",
        rating: 4.8,
        reviews: 127,
        desc: "Master the art of creating perfect ice cream with Mr. A's secret techniques passed down since 1950.",
        image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=500&fit=crop"
    },
    {
        id: 2,
        title: "50 Classic Dessert Recipes",
        author: "Mr. A",
        price: 34.99,
        oldPrice: 44.99,
        badge: "discount",
        badgeText: "🎯 22% Off",
        rating: 4.6,
        reviews: 89,
        desc: "A timeless collection of 50 classic dessert recipes that have delighted families for generations.",
        image: "https://images.unsplash.com/photo-1587313344450-4a1a4fe4d6b1?w=400&h=500&fit=crop"
    },
    {
        id: 3,
        title: "Seasonal Ice Cream Creations",
        author: "Mr. A",
        price: 24.99,
        oldPrice: null,
        badge: "new",
        badgeText: "✨ New Release",
        rating: 4.9,
        reviews: 56,
        desc: "Discover 30+ seasonal recipes that capture the essence of each season — from summer berries to winter chocolate.",
        image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=500&fit=crop"
    },
    {
        id: 4,
        title: "Healthy Ice Cream Alternatives",
        author: "Mr. A",
        price: 27.99,
        oldPrice: 32.99,
        badge: "discount",
        badgeText: "💚 15% Off",
        rating: 4.4,
        reviews: 72,
        desc: "Guilt-free ice cream recipes using natural sweeteners, dairy alternatives, and superfoods.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=500&fit=crop"
    },
    {
        id: 5,
        title: "Gourmet Dessert Collection",
        author: "Mr. A",
        price: 39.99,
        oldPrice: null,
        badge: "bestseller",
        badgeText: "👑 Premium",
        rating: 4.7,
        reviews: 104,
        desc: "An exquisite collection of gourmet desserts — from tiramisu to crème brûlée — perfect for special occasions.",
        image: "https://images.unsplash.com/photo-1550617931-e17a7b70d0a2?w=400&h=500&fit=crop"
    }
];

function renderBooks() {
    const grid = document.getElementById("booksGrid");
    if (!grid) return;

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

    grid.innerHTML = html;
}

let selectedBook = null;

function openModal(bookId) {
    selectedBook = booksData.find((b) => b.id === bookId);
    if (!selectedBook) return;

    document.getElementById("modalBookTitle").textContent = selectedBook.title;
    document.getElementById("orderTotal").textContent = `$${selectedBook.price.toFixed(2)}`;
    document.getElementById("orderModal").classList.add("active");
    document.body.style.overflow = "hidden";

    document.getElementById("orderForm").reset();
    document.getElementById("cardDetails").style.display = "none";
}

function closeModal() {
    document.getElementById("orderModal").classList.remove("active");
    document.body.style.overflow = "";
}

function submitOrder(e) {
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
        document.getElementById("orderForm").reset();
        document.getElementById("cardDetails").style.display = "none";
    }, 2000);
}

function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    const text = document.getElementById("toastText");

    text.textContent = message;
    toast.className = "toast-message";
    if (isError) toast.classList.add("error");

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();

    const orderModal = document.getElementById("orderModal");
    const paymentMethod = document.getElementById("paymentMethod");

    if (orderModal) {
        orderModal.addEventListener("click", function (e) {
            if (e.target === this) closeModal();
        });
    }

    if (paymentMethod) {
        paymentMethod.addEventListener("change", function () {
            const cardDetails = document.getElementById("cardDetails");
            cardDetails.style.display = this.value ? "block" : "none";
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeModal();
    });
});

console.log("📚 iCREAM Book Store Loaded Successfully!");
console.log("💡 Registered members get 10% off on all books!");